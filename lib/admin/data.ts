import "server-only";

import { adminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/admin/auth";
import {
  normalizeStatus,
  defaultPlatformSettings,
  type AdminClaim,
  type AuditLogItem,
  type ClaimDocument,
  type ClaimNote,
  type ClaimStatus,
  type CustomerRecord,
  type DashboardStats,
  type DocumentRecord,
  type NotificationItem,
  type PlatformSettings,
  type SupportRequest,
} from "@/lib/admin/types";

type Raw = Record<string, unknown>;

function str(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function toIso(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && value !== null && "toDate" in value) {
    try {
      const date = (value as { toDate: () => Date }).toDate();
      if (date instanceof Date) return date.toISOString();
    } catch {
      return "";
    }
  }
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
}

function mapDocument(raw: Raw): ClaimDocument {
  return {
    name: str(raw.name, "Document"),
    size: Number(raw.size) || 0,
    type: str(raw.type, "application/octet-stream"),
    category: str(raw.category, "Other"),
    publicId: raw.publicId ? str(raw.publicId) : null,
    secureUrl: raw.secureUrl ? str(raw.secureUrl) : null,
    resourceType: raw.resourceType ? str(raw.resourceType) : null,
    format: raw.format ? str(raw.format) : null,
  };
}

function mapNote(raw: Raw): ClaimNote {
  return {
    author: str(raw.author, "Administrator"),
    text: str(raw.text),
    createdAt: toIso(raw.createdAt),
  };
}

function mapClaim(id: string, data: Raw): AdminClaim {
  const personal = (data.personalInformation ?? {}) as Raw;
  const scam = (data.scamDetails ?? {}) as Raw;
  const financial = (data.financialDetails ?? {}) as Raw;
  const docs = Array.isArray(data.supportingDocuments) ? data.supportingDocuments : [];
  const notes = Array.isArray(data.notes) ? data.notes : [];
  const createdAt = toIso(data.createdAt);

  return {
    id,
    referenceNumber: str(data.referenceNumber) || `RR-${id.slice(0, 6).toUpperCase()}`,
    personalInformation: {
      firstName: str(personal.firstName),
      lastName: str(personal.lastName),
      email: str(personal.email),
      phone: str(personal.phone),
      country: str(personal.country),
      state: str(personal.state),
      preferredContact: str(personal.preferredContact, "email"),
      referralSource: str(personal.referralSource),
    },
    scamDetails: {
      category: str(scam.category),
      platformName: str(scam.platformName),
      incidentDate: str(scam.incidentDate),
      incidentLocation: str(scam.incidentLocation),
      incidentHappened: str(scam.incidentHappened),
      description: str(scam.description),
    },
    financialDetails: {
      amountLost: str(financial.amountLost),
      currency: str(financial.currency, "USD"),
      paymentMethod: str(financial.paymentMethod),
      transactionDate: str(financial.transactionDate),
      transactionReference: str(financial.transactionReference),
      recipientDetails: str(financial.recipientDetails),
      institution: str(financial.institution),
    },
    supportingDocuments: docs.map((doc) => mapDocument(doc as Raw)),
    status: normalizeStatus(data.status),
    assignedOfficer: data.assignedOfficer ? str(data.assignedOfficer) : null,
    notes: notes.map((note) => mapNote(note as Raw)),
    createdAt,
    updatedAt: toIso(data.updatedAt) || createdAt,
  };
}

async function loadClaims(limit = 500): Promise<AdminClaim[]> {
  if (!adminDb) return [];
  let docs: { id: string; data: () => Raw }[] = [];
  try {
    const snap = await adminDb
      .collection("claims")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    docs = snap.docs;
  } catch {
    const snap = await adminDb.collection("claims").limit(limit).get();
    docs = snap.docs;
  }
  return docs
    .map((doc) => mapClaim(doc.id, doc.data()))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

function withinRange(iso: string, days: number): boolean {
  if (!days || days <= 0) return true;
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return false;
  return time >= Date.now() - days * 86_400_000;
}

export async function getDashboardStats(rangeDays: number): Promise<DashboardStats> {
  await requireAdmin();
  const claims = (await loadClaims()).filter((claim) => withinRange(claim.createdAt, rangeDays));

  return {
    total: claims.length,
    approved: claims.filter((claim) => claim.status === "Approved").length,
    underReview: claims.filter((claim) => claim.status === "Under Review").length,
    rejected: claims.filter((claim) => claim.status === "Rejected").length,
    pending: claims.filter((claim) => claim.status === "Pending").length,
  };
}

export async function getRecentClaims(rangeDays: number, limit = 5): Promise<AdminClaim[]> {
  await requireAdmin();
  const claims = (await loadClaims()).filter((claim) => withinRange(claim.createdAt, rangeDays));
  return claims.slice(0, limit);
}

export interface ClaimFilters {
  search?: string;
  status?: ClaimStatus | "all";
  category?: string;
  days?: number;
}

export async function getClaims(filters: ClaimFilters = {}): Promise<AdminClaim[]> {
  await requireAdmin();
  const search = (filters.search ?? "").trim().toLowerCase();
  const status = filters.status ?? "all";
  const category = filters.category ?? "all";
  const days = filters.days ?? 0;

  return (await loadClaims()).filter((claim) => {
    if (status !== "all" && claim.status !== status) return false;
    if (category !== "all" && claim.scamDetails.category !== category) return false;
    if (!withinRange(claim.createdAt, days)) return false;
    if (!search) return true;
    const haystack = [
      claim.referenceNumber,
      claim.personalInformation.firstName,
      claim.personalInformation.lastName,
      claim.personalInformation.email,
      claim.scamDetails.category,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(search);
  });
}

export async function getClaimById(id: string): Promise<AdminClaim | null> {
  await requireAdmin();
  if (!adminDb) return null;
  const snap = await adminDb.collection("claims").doc(id).get();
  if (!snap.exists) return null;
  return mapClaim(snap.id, snap.data() as Raw);
}

export async function getCustomers(): Promise<CustomerRecord[]> {
  await requireAdmin();
  const claims = await loadClaims();
  const map = new Map<string, CustomerRecord>();

  if (adminDb) {
    try {
      const usersSnap = await adminDb.collection("users").limit(500).get();
      for (const doc of usersSnap.docs) {
        const data = doc.data() as Raw;
        const email = str(data.email).toLowerCase();
        if (!email) continue;
        map.set(email, {
          email,
          name: str(data.name) || str(data.displayName) || email,
          country: str(data.country),
          phone: str(data.phone),
          claimCount: 0,
          totalValue: 0,
          currency: "USD",
          firstSeen: toIso(data.createdAt),
          lastSeen: toIso(data.createdAt),
          status: "Registered",
        });
      }
    } catch {
      // `users` collection is optional; fall back to claims-derived customers.
    }
  }

  for (const claim of claims) {
    const email = claim.personalInformation.email.toLowerCase();
    if (!email) continue;
    const amount = Number(claim.financialDetails.amountLost) || 0;
    const fullName =
      `${claim.personalInformation.firstName} ${claim.personalInformation.lastName}`.trim();
    const existing = map.get(email);

    if (existing) {
      existing.claimCount += 1;
      existing.totalValue += amount;
      if (!existing.firstSeen || claim.createdAt < existing.firstSeen) existing.firstSeen = claim.createdAt;
      if (!existing.lastSeen || claim.createdAt > existing.lastSeen) existing.lastSeen = claim.createdAt;
      if (existing.status === "Registered") existing.status = "Active";
      if (!existing.country) existing.country = claim.personalInformation.country;
      if (!existing.phone) existing.phone = claim.personalInformation.phone;
      if (fullName && (!existing.name || existing.name === email)) existing.name = fullName;
    } else {
      map.set(email, {
        email,
        name: fullName || email,
        country: claim.personalInformation.country,
        phone: claim.personalInformation.phone,
        claimCount: 1,
        totalValue: amount,
        currency: claim.financialDetails.currency || "USD",
        firstSeen: claim.createdAt,
        lastSeen: claim.createdAt,
        status: "Guest",
      });
    }
  }

  return [...map.values()].sort(
    (a, b) => b.claimCount - a.claimCount || a.name.localeCompare(b.name),
  );
}

export async function getDocuments(): Promise<DocumentRecord[]> {
  await requireAdmin();
  const claims = await loadClaims();
  const records: DocumentRecord[] = [];

  for (const claim of claims) {
    const name =
      `${claim.personalInformation.firstName} ${claim.personalInformation.lastName}`.trim() ||
      claim.personalInformation.email;
    claim.supportingDocuments.forEach((doc, index) => {
      records.push({
        id: `${claim.id}-${index}`,
        claimId: claim.id,
        claimReference: claim.referenceNumber,
        customerName: name,
        name: doc.name,
        category: doc.category,
        size: doc.size,
        type: doc.type,
        secureUrl: doc.secureUrl,
        format: doc.format,
        uploadedAt: claim.createdAt,
      });
    });
  }

  return records.sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export async function getNotifications(limit = 50): Promise<NotificationItem[]> {
  await requireAdmin();
  if (!adminDb) return [];
  try {
    const snap = await adminDb
      .collection("notifications")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((doc) => {
      const data = doc.data() as Raw;
      return {
        id: doc.id,
        title: str(data.title, "Notification"),
        message: str(data.message),
        type: (str(data.type, "system") as NotificationItem["type"]) ?? "system",
        read: Boolean(data.read),
        link: data.link ? str(data.link) : null,
        createdAt: toIso(data.createdAt),
      };
    });
  } catch {
    return [];
  }
}

export async function getAuditLogs(limit = 100): Promise<AuditLogItem[]> {
  await requireAdmin();
  if (!adminDb) return [];
  try {
    const snap = await adminDb
      .collection("auditLogs")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((doc) => {
      const data = doc.data() as Raw;
      return {
        id: doc.id,
        actorId: str(data.actorId),
        actorEmail: str(data.actorEmail),
        action: str(data.action, "Action"),
        target: str(data.target),
        targetType: str(data.targetType, "record"),
        createdAt: toIso(data.createdAt),
      };
    });
  } catch {
    return [];
  }
}

export async function getSupportRequests(limit = 100): Promise<SupportRequest[]> {
  await requireAdmin();
  if (!adminDb) return [];
  try {
    const snap = await adminDb
      .collection("supportRequests")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((doc) => {
      const data = doc.data() as Raw;
      const status = str(data.status, "New");
      return {
        id: doc.id,
        name: str(data.name, "Unknown"),
        email: str(data.email),
        subject: str(data.subject, "Support enquiry"),
        message: str(data.message),
        status: (status === "Open" || status === "Resolved" ? status : "New") as SupportRequest["status"],
        createdAt: toIso(data.createdAt),
      };
    });
  } catch {
    return [];
  }
}

export async function getPlatformSettings(): Promise<PlatformSettings> {
  await requireAdmin();
  if (!adminDb) return defaultPlatformSettings;
  try {
    const snap = await adminDb.collection("settings").doc("platform").get();
    if (!snap.exists) return defaultPlatformSettings;
    const data = snap.data() as Raw;
    return {
      companyName: str(data.companyName, defaultPlatformSettings.companyName),
      supportEmail: str(data.supportEmail, defaultPlatformSettings.supportEmail),
      contactPhone: str(data.contactPhone, defaultPlatformSettings.contactPhone),
      defaultCurrency: str(data.defaultCurrency, defaultPlatformSettings.defaultCurrency),
      notifyOnNewClaim:
        data.notifyOnNewClaim === undefined
          ? defaultPlatformSettings.notifyOnNewClaim
          : Boolean(data.notifyOnNewClaim),
      notifyOnStatusChange:
        data.notifyOnStatusChange === undefined
          ? defaultPlatformSettings.notifyOnStatusChange
          : Boolean(data.notifyOnStatusChange),
      weeklyDigest:
        data.weeklyDigest === undefined
          ? defaultPlatformSettings.weeklyDigest
          : Boolean(data.weeklyDigest),
    };
  } catch {
    return defaultPlatformSettings;
  }
}

export interface AdminAccount {
  uid: string;
  email: string;
  role: string;
  createdAt: string;
}

export async function getAdmins(): Promise<AdminAccount[]> {
  await requireAdmin();
  if (!adminDb) return [];
  try {
    const snap = await adminDb.collection("admins").limit(50).get();
    return snap.docs.map((doc) => ({
      uid: doc.id,
      email: str((doc.data() as Raw).email),
      role: str((doc.data() as Raw).role, "admin"),
      createdAt: toIso((doc.data() as Raw).createdAt),
    }));
  } catch {
    return [];
  }
}
