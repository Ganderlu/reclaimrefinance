import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "rr_admin_session";

/**
 * Optimistic protection for the admin area: redirects visitors without a
 * session cookie to the admin sign-in page. Full authorization is always
 * re-verified on the server (see `lib/admin/auth.ts`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const hasSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
