import { STATUS_META, type ClaimStatus } from "@/lib/admin/types";

export default function StatusBadge({ status }: { status: ClaimStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${meta.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}
