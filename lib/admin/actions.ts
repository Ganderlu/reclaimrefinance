"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/admin/auth";
import { writeAuditLog } from "@/lib/admin/audit";
import {
  CLAIM_STATUSES,
  type ClaimStatus,
  type PlatformSettings,
} from "@/lib/admin/types";

export type ActionResult = { ok: true } | { ok: false; error: string };

function revalidateAdmin() {
  revalidatePath("/admin", "layout");
}

export async function updateClaimStatus(
  claimId: string,
  status: ClaimStatus,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!adminDb) return { ok: false, error: "Database is not configured." };
  if (!CLAIM_STATUSES.includes(status)) {
    return { ok: false, error: "Unknown claim status." };
  }

  try {
    const ref = adminDb.collection("claims").doc(claimId);
    const snap = await ref.get();
    if (!snap.exists) return { ok: false, error: "Claim not found." };

    await ref.update({ status, updatedAt: new Date().toISOString() });

    const reference = String(snap.data()?.referenceNumber ?? claimId);
    await writeAuditLog({
      actorId: admin.uid,
      actorEmail: admin.email,
      action: `Updated claim status to ${status}`,
      target: reference,
      targetType: "claim",
    });

    revalidateAdmin();
    revalidatePath(`/admin/claims/${claimId}`);
    return { ok: true };
  } catch (error) {
    console.error("updateClaimStatus failed:", error);
    return { ok: false, error: "Could not update the claim. Please try again." };
  }
}

export async function addClaimNote(claimId: string, note: string): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!adminDb) return { ok: false, error: "Database is not configured." };

  const text = note.trim();
  if (!text) return { ok: false, error: "Note cannot be empty." };
  if (text.length > 2000) return { ok: false, error: "Note is too long." };

  try {
    const ref = adminDb.collection("claims").doc(claimId);
    const snap = await ref.get();
    if (!snap.exists) return { ok: false, error: "Claim not found." };

    const existing = Array.isArray(snap.data()?.notes) ? snap.data()!.notes : [];
    const entry = {
      author: admin.name || admin.email,
      text,
      createdAt: new Date().toISOString(),
    };

    await ref.update({
      notes: [...existing, entry],
      updatedAt: entry.createdAt,
    });

    await writeAuditLog({
      actorId: admin.uid,
      actorEmail: admin.email,
      action: "Added an internal note",
      target: String(snap.data()?.referenceNumber ?? claimId),
      targetType: "claim",
    });

    revalidatePath(`/admin/claims/${claimId}`);
    return { ok: true };
  } catch (error) {
    console.error("addClaimNote failed:", error);
    return { ok: false, error: "Could not save the note. Please try again." };
  }
}

export async function markNotificationRead(
  notificationId: string,
  read = true,
): Promise<ActionResult> {
  await requireAdmin();
  if (!adminDb) return { ok: false, error: "Database is not configured." };
  try {
    await adminDb.collection("notifications").doc(notificationId).update({ read });
    revalidateAdmin();
    revalidatePath("/admin/notifications");
    return { ok: true };
  } catch (error) {
    console.error("markNotificationRead failed:", error);
    return { ok: false, error: "Could not update the notification." };
  }
}

export async function markAllNotificationsRead(): Promise<ActionResult> {
  await requireAdmin();
  if (!adminDb) return { ok: false, error: "Database is not configured." };
  try {
    const snap = await adminDb.collection("notifications").where("read", "==", false).get();
    if (snap.empty) return { ok: true };
    const batch = adminDb.batch();
    snap.docs.forEach((doc) => batch.update(doc.ref, { read: true }));
    await batch.commit();
    revalidateAdmin();
    revalidatePath("/admin/notifications");
    return { ok: true };
  } catch (error) {
    console.error("markAllNotificationsRead failed:", error);
    return { ok: false, error: "Could not update notifications." };
  }
}

export async function updateSupportStatus(
  requestId: string,
  status: "New" | "Open" | "Resolved",
): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!adminDb) return { ok: false, error: "Database is not configured." };
  try {
    await adminDb.collection("supportRequests").doc(requestId).update({ status });
    await writeAuditLog({
      actorId: admin.uid,
      actorEmail: admin.email,
      action: `Marked support request ${status}`,
      target: requestId,
      targetType: "support",
    });
    revalidatePath("/admin/support");
    return { ok: true };
  } catch (error) {
    console.error("updateSupportStatus failed:", error);
    return { ok: false, error: "Could not update the request." };
  }
}

export async function updatePlatformSettings(
  settings: PlatformSettings,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!adminDb) return { ok: false, error: "Database is not configured." };

  try {
    await adminDb.collection("settings").doc("platform").set(
      {
        companyName: String(settings.companyName ?? "").slice(0, 120),
        supportEmail: String(settings.supportEmail ?? "").slice(0, 160),
        contactPhone: String(settings.contactPhone ?? "").slice(0, 60),
        defaultCurrency: String(settings.defaultCurrency ?? "USD").slice(0, 8),
        notifyOnNewClaim: Boolean(settings.notifyOnNewClaim),
        notifyOnStatusChange: Boolean(settings.notifyOnStatusChange),
        weeklyDigest: Boolean(settings.weeklyDigest),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );

    await writeAuditLog({
      actorId: admin.uid,
      actorEmail: admin.email,
      action: "Updated platform settings",
      target: "settings/platform",
      targetType: "settings",
    });

    revalidatePath("/admin/settings");
    return { ok: true };
  } catch (error) {
    console.error("updatePlatformSettings failed:", error);
    return { ok: false, error: "Could not save settings. Please try again." };
  }
}
