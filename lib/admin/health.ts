import "server-only";

import { connection } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { cloudinaryConfigured } from "@/lib/cloudinary";

export interface SystemHealth {
  database: boolean;
  documentStorage: boolean;
  email: boolean;
  checkedAt: string;
}

/** Performs lightweight checks so the dashboard only reports real status. */
export async function getSystemHealth(): Promise<SystemHealth> {
  // The Firestore probe and the timestamp below are request-time values, so
  // opt this segment out of prerendering (Cache Components).
  await connection();

  let database = false;
  if (adminDb) {
    try {
      await adminDb.collection("counters").limit(1).get();
      database = true;
    } catch {
      database = false;
    }
  }

  return {
    database,
    documentStorage: cloudinaryConfigured,
    email: Boolean(process.env.RESEND_API_KEY),
    checkedAt: new Date().toISOString(),
  };
}
