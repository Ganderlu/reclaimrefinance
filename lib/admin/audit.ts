import "server-only";

import { adminDb } from "@/lib/firebase-admin";

export interface AuditEntry {
  actorId: string;
  actorEmail: string;
  action: string;
  target: string;
  targetType?: string;
}

/** Records an administrative action for the audit log. Never throws. */
export async function writeAuditLog(entry: AuditEntry): Promise<void> {
  if (!adminDb) return;
  try {
    await adminDb.collection("auditLogs").add({
      actorId: entry.actorId,
      actorEmail: entry.actorEmail,
      action: entry.action,
      target: entry.target,
      targetType: entry.targetType ?? "record",
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Audit log write failed:", error);
  }
}
