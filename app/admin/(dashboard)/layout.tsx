import type { Metadata } from "next";
import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import Skeleton, { SkeletonCard } from "@/components/admin/Skeleton";
import { requireAdmin } from "@/lib/admin/auth";
import { getNotifications } from "@/lib/admin/data";

// The admin area is gated by a request-time session check, so navigations into
// it are allowed to block on the server instead of producing an instant shell.
export const instant = false;

export const metadata: Metadata = {
  title: "Admin Panel | ReclaimRefinance",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The session read calls cookies() and request-time helpers (e.g. Date.now()
  // inside token verification), which cannot be part of the prerendered static
  // shell. Streaming it behind a Suspense boundary keeps the route valid while
  // Cache Components is enabled.
  return (
    <Suspense fallback={<AdminShellFallback />}>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </Suspense>
  );
}

async function AuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // The session check verifies token expiry against the current time
  // (firebase-admin calls Date.now()), so it must run per request rather than
  // inside the prerendered static shell. requireAdmin -> getAdminSession calls
  // connection() internally to opt this route out of prerendering.
  const session = await requireAdmin();
  const notifications = await getNotifications(25);
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <AdminShell
      admin={{ name: session.name, email: session.email, role: session.role }}
      unreadCount={unreadCount}
      notifications={notifications.slice(0, 6).map((item) => ({
        id: item.id,
        title: item.title,
        message: item.message,
        createdAt: item.createdAt,
        read: item.read,
      }))}
    >
      {children}
    </AdminShell>
  );
}

function AdminShellFallback() {
  return (
    <div className="flex min-h-screen bg-sky-soft">
      <div className="sticky top-0 hidden h-screen w-[236px] shrink-0 bg-gradient-to-b from-navy to-navy-soft lg:block" />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-xl">
          <div className="flex h-16 items-center px-4 sm:px-6">
            <Skeleton className="h-9 w-56 rounded-xl" />
          </div>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
            <div>
              <Skeleton className="h-8 w-64" />
              <Skeleton className="mt-3 h-4 w-80" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[0, 1, 2, 3].map((index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Skeleton className="h-72 rounded-3xl lg:col-span-2" />
              <Skeleton className="h-72 rounded-3xl" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
