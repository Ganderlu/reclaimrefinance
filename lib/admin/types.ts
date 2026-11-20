// Shared admin dashboard types and presentation metadata.
// This module is safe to import from both server and client components.

export type ClaimStatus = "Pending" | "Under Review" | "Approved" | "Rejected";

export const CLAIM_STATUSES: ClaimStatus[] = [
  "Pending",
  "Under Review",
  "Approved",
  "Rejected",
];

export interface ClaimDocument {
  name: string;
  size: number;
  type: string;
  category: string;
  publicId: string | null;
  secureUrl: string | null;
  resourceType: string | null;
  format: string | null;
}

export interface ClaimNote {
  author: string;
  text: string;
  createdAt: string;
}

export interface AdminClaim {
  id: string;
  referenceNumber: string;
  personalInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    preferredContact: string;
    referralSource: string;
  };
  scamDetails: {
    category: string;
    platformName: string;
    incidentDate: string;
    incidentLocation: string;
    incidentHappened: string;
    description: string;
  };
  financialDetails: {
    amountLost: string;
    currency: string;
    paymentMethod: string;
    transactionDate: string;
    transactionReference: string;
    recipientDetails: string;
    institution: string;
  };
  supportingDocuments: ClaimDocument[];
  status: ClaimStatus;
  assignedOfficer: string | null;
  notes: ClaimNote[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerRecord {
  email: string;
  name: string;
  country: string;
  phone: string;
  claimCount: number;
  totalValue: number;
  currency: string;
  firstSeen: string;
  lastSeen: string;
  status: "Registered" | "Active" | "Guest";
}

export interface DocumentRecord {
  id: string;
  claimId: string;
  claimReference: string;
  customerName: string;
  name: string;
  category: string;
  size: number;
  type: string;
  secureUrl: string | null;
  format: string | null;
  uploadedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "claim" | "support" | "system" | "user";
  read: boolean;
  link: string | null;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  target: string;
  targetType: string;
  createdAt: string;
}

export interface SupportRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "Open" | "Resolved";
  createdAt: string;
}

export interface PlatformSettings {
  companyName: string;
  supportEmail: string;
  contactPhone: string;
  defaultCurrency: string;
  notifyOnNewClaim: boolean;
  notifyOnStatusChange: boolean;
  weeklyDigest: boolean;
}

export const defaultPlatformSettings: PlatformSettings = {
  companyName: "ReclaimRefinance",
  supportEmail: "support@reclaimrefinance.com",
  contactPhone: "+1 (555) 000-0000",
  defaultCurrency: "USD",
  notifyOnNewClaim: true,
  notifyOnStatusChange: true,
  weeklyDigest: false,
};

export interface DashboardStats {
  total: number;
  approved: number;
  underReview: number;
  rejected: number;
  pending: number;
}

export const CATEGORY_LABELS: Record<string, string> = {
  crypto: "Cryptocurrency Fraud",
  investment: "Investment Fraud",
  "bank-transfer": "Bank Transfer Fraud",
  purchase: "Purchase & Invoice Fraud",
  romance: "Romance & Social Engineering",
  "account-takeover": "Account Takeover Fraud",
  wire: "International Wire Transfer Fraud",
  other: "Other Financial Scams",
};

export function categoryLabel(category: string | null | undefined): string {
  if (!category) return "Uncategorised";
  return CATEGORY_LABELS[category] ?? category;
}

export function normalizeStatus(raw: unknown): ClaimStatus {
  const value = String(raw ?? "").trim().toLowerCase();
  if (value === "approved") return "Approved";
  if (value === "rejected") return "Rejected";
  if (value === "under review" || value === "underreview") return "Under Review";
  return "Pending";
}

export const STATUS_META: Record<
  ClaimStatus,
  { badge: string; dot: string }
> = {
  Approved: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  "Under Review": {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  Pending: {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    dot: "bg-blue-500",
  },
  Rejected: {
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
    dot: "bg-rose-500",
  },
};

export const RANGE_OPTIONS = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
  { value: "365", label: "Last Year" },
] as const;

export type RangeValue = (typeof RANGE_OPTIONS)[number]["value"];

export function rangeToDays(range: string | undefined): number {
  const days = Number(range);
  return Number.isFinite(days) && days > 0 ? days : 7;
}
