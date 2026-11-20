import { CircleCheck, ShieldCheck } from "lucide-react";
import { formatDateTime } from "@/lib/admin/format";
import type { SystemHealth } from "@/lib/admin/health";

export default function SystemStatusBar({ health }: { health: SystemHealth }) {
  const operational = health.database;
  const label = operational ? "All Systems Operational" : "Service Degradation Detected";
  const detail = operational
    ? "Claims database reachable"
    : "Claims database is unreachable";

  return (
    <section
      className={`flex flex-col gap-3 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
        operational
          ? "border-emerald/25 bg-emerald/[0.07]"
          : "border-amber-300/60 bg-amber-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            operational ? "bg-emerald/15 text-emerald" : "bg-amber-100 text-amber-600"
          }`}
        >
          {operational ? <ShieldCheck size={18} /> : <CircleCheck size={18} />}
        </span>
        <div>
          <p className="text-[13.5px] font-bold text-ink">
            System Status: {label}
          </p>
          <p className="text-[12px] text-muted">{detail}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-[12px] text-muted sm:items-end">
        <span>Last updated {formatDateTime(health.checkedAt)}</span>
        <span className="font-semibold text-ink/70">
          ReclaimRefinance Admin Panel v1.0.0
        </span>
      </div>
    </section>
  );
}
