import { ScrollText } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import FadeIn from "@/components/admin/FadeIn";
import EmptyState from "@/components/admin/EmptyState";
import { getAuditLogs } from "@/lib/admin/data";
import { formatDateTime, formatNumber } from "@/lib/admin/format";

// Audit logs are read per request behind the session check, so this segment is
// allowed to block on the server rather than produce an instant shell.
export const instant = false;

export default async function AdminAuditLogsPage() {
  const logs = await getAuditLogs(150);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Audit Logs"
        description={`${formatNumber(
          logs.length,
        )} most recent administrator action${logs.length === 1 ? "" : "s"}. Entries are append-only and never edited.`}
      />

      <FadeIn>
        <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
          {logs.length === 0 ? (
            <EmptyState
              icon={ScrollText}
              title="No activity recorded yet"
              description="Administrator actions such as status changes, notes and settings updates are recorded here."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-sky-soft/60 text-[11.5px] font-bold uppercase tracking-wide text-muted">
                    <th className="px-5 py-3.5">Action</th>
                    <th className="px-5 py-3.5">Affected record</th>
                    <th className="px-5 py-3.5">Administrator</th>
                    <th className="px-5 py-3.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-line/70 transition-colors last:border-0 hover:bg-sky-soft/70"
                    >
                      <td className="px-5 py-3.5 text-[13.5px] font-semibold text-ink">
                        {log.action}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] font-medium text-ink">{log.target || "—"}</p>
                        <p className="text-[11.5px] text-muted">{log.targetType}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] font-medium text-ink">
                          {log.actorEmail || "system"}
                        </p>
                        <p className="text-[11.5px] text-muted">{log.actorId || "—"}</p>
                      </td>
                      <td className="px-5 py-3.5 text-[12.5px] text-muted">
                        {formatDateTime(log.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </FadeIn>
    </div>
  );
}
