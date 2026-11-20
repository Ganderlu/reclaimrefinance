import type { Metadata } from "next";
import AdminLoginForm from "./AdminLoginForm";

// Reads the `next` query parameter, so this route blocks on the server.
export const instant = false;

export const metadata: Metadata = {
  title: "Administrator Sign In | ReclaimRefinance",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // Only allow same-origin admin destinations to avoid open redirects.
  const nextPath =
    typeof next === "string" && next.startsWith("/admin") && next !== "/admin/login"
      ? next
      : "/admin";

  return <AdminLoginForm nextPath={nextPath} />;
}
