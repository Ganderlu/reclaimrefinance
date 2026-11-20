"use server";

import { clearAdminSession, createAdminSession } from "@/lib/admin/auth";

/** Verifies a Firebase ID token and issues an administrator session cookie. */
export async function signInAdmin(idToken: string) {
  return createAdminSession(idToken);
}

/** Clears the administrator session cookie. */
export async function signOutAdmin() {
  await clearAdminSession();
}
