import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { adminAuth, adminDb, adminConfigured } from "@/lib/firebase-admin";

export const ADMIN_SESSION_COOKIE = "rr_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

export interface AdminIdentity {
  uid: string;
  email: string;
  name: string;
  role: string;
}

function adminAllowlist(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminAllowlist().includes(email.toLowerCase());
}

async function resolveRole(uid: string): Promise<string> {
  if (!adminDb) return "";
  try {
    const snap = await adminDb.collection("admins").doc(uid).get();
    return snap.exists ? String(snap.data()?.role ?? "") : "";
  } catch {
    return "";
  }
}

export async function getAdminSession(): Promise<AdminIdentity | null> {
  // The session check verifies cookie expiry against the current time
  // (firebase-admin calls Date.now()), which cannot be baked into a prerendered
  // shell or a runtime prefetch pass. connection() stalls any prerender here so
  // the authenticated routes are always rendered per request.
  await connection();

  if (!adminConfigured || !adminAuth || !adminDb) return null;

  const store = await cookies();
  const cookie = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!cookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(cookie, true);
    const email = decoded.email ?? "";
    const role = await resolveRole(decoded.uid);
    if (role !== "admin" && !isAdminEmail(email)) return null;
    return {
      uid: decoded.uid,
      email,
      name: decoded.name || email.split("@")[0] || "Admin",
      role: role || "admin",
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminIdentity> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

type SessionResult = { ok: true } | { ok: false; error: string };

/**
 * Verifies a Firebase ID token, checks administrator authorization and, when
 * valid, issues an httpOnly session cookie. Must be called from a Server Action
 * or Route Handler (it writes a cookie).
 */
export async function createAdminSession(idToken: string): Promise<SessionResult> {
  if (!adminConfigured || !adminAuth || !adminDb) {
    return {
      ok: false,
      error:
        "Administrator sign-in is not configured on the server. Add the Firebase service account to continue.",
    };
  }

  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(idToken, true);
  } catch {
    return { ok: false, error: "We could not verify your sign-in. Please try again." };
  }

  const email = decoded.email ?? "";
  const role = await resolveRole(decoded.uid);
  if (role !== "admin" && !isAdminEmail(email)) {
    return { ok: false, error: "This account does not have administrator access." };
  }

  const expiresIn = ADMIN_SESSION_MAX_AGE * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return { ok: true };
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}
