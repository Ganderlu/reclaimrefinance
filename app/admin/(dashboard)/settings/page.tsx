import { BadgeCheck, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import FadeIn from "@/components/admin/FadeIn";
import SettingsForm from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdmins, getPlatformSettings } from "@/lib/admin/data";
import { formatDate } from "@/lib/admin/format";

// Settings are read per request behind the session check, so this segment is
// allowed to block on the server rather than produce an instant shell.
export const instant = false;

const ROLE_STYLES: Record<string, string> = {
  admin: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  reviewer: "bg-blue-50 text-blue-700 ring-blue-200",
};

export default async function AdminSettingsPage() {
  const session = await requireAdmin();
  const [settings, admins] = await Promise.all([getPlatformSettings(), getAdmins()]);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <PageHeader
        title="Settings"
        description="Manage your administrator profile, platform preferences and authorised administrator accounts."
      />

      <FadeIn>
        <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-base font-bold text-white">
                <UserRound size={22} />
              </span>
              <div>
                <p className="text-[15px] font-bold text-ink">{session.name}</p>
                <p className="text-[12.5px] text-muted">{session.email}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-soft px-3 py-1.5 text-[12px] font-semibold text-muted ring-1 ring-inset ring-line">
              <KeyRound size={13} /> Session role: {session.role}
            </span>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
            Set your display name and password through your Firebase Authentication account. Your
            administrator identity is verified on the server for every request.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={0.06}>
        <SettingsForm settings={settings} />
      </FadeIn>

      <FadeIn delay={0.12}>
        <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
          <div className="border-b border-line px-5 py-4 sm:px-6">
            <h2 className="text-base font-bold text-ink">Administrator accounts</h2>
            <p className="mt-0.5 text-[12.5px] text-muted">
              Accounts recorded in the <code className="text-ink">admins</code> collection.
            </p>
          </div>

          {admins.length === 0 ? (
            <div className="px-5 py-8 sm:px-6">
              <p className="text-[13px] text-muted">
                No administrator records found. Access is currently granted through the{" "}
                <code className="text-ink">ADMIN_EMAILS</code> server environment variable.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-sky-soft/60 text-[11.5px] font-bold uppercase tracking-wide text-muted">
                    <th className="px-5 py-3.5">Administrator</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="px-5 py-3.5">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.uid} className="border-b border-line/70 last:border-0">
                      <td className="px-5 py-4">
                        <p className="text-[13.5px] font-semibold text-ink">
                          {admin.email || admin.uid}
                        </p>
                        <p className="text-[11.5px] text-muted">{admin.uid}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                            ROLE_STYLES[admin.role] ?? ROLE_STYLES.reviewer
                          }`}
                        >
                          <BadgeCheck size={13} /> {admin.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {admin.createdAt ? formatDate(admin.createdAt) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex items-start gap-3 border-t border-line bg-sky-soft/50 px-5 py-4 sm:px-6">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald" />
            <p className="text-[12.5px] leading-relaxed text-muted">
              Role and permission changes are provisioned server-side by updating the{" "}
              <code className="text-ink">admins</code> collection or the{" "}
              <code className="text-ink">ADMIN_EMAILS</code> allow-list. There is no public
              administrator registration, and sensitive actions are written to the audit log with
              the acting administrator&apos;s ID and timestamp.
            </p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
