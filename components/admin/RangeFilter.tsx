"use client";

import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { RANGE_OPTIONS } from "@/lib/admin/types";

export default function RangeFilter({
  range,
  basePath,
}: {
  range: string;
  basePath: string;
}) {
  const router = useRouter();

  return (
    <label className="relative flex items-center">
      <CalendarDays size={16} className="pointer-events-none absolute left-3.5 text-muted" />
      <select
        value={range}
        onChange={(event) =>
          router.push(
            event.target.value === "7" ? basePath : `${basePath}?range=${event.target.value}`,
          )
        }
        aria-label="Filter report by date range"
        className="appearance-none rounded-xl border border-line bg-white py-2.5 pl-10 pr-9 text-sm font-semibold text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      >
        {RANGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3.5 text-xs text-muted">▾</span>
    </label>
  );
}
