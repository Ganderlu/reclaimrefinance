"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  CATEGORY_LABELS,
  CLAIM_STATUSES,
  RANGE_OPTIONS,
} from "@/lib/admin/types";

export default function ClaimsFilters({
  search,
  status,
  category,
  range,
}: {
  search: string;
  status: string;
  category: string;
  range: string;
}) {
  const router = useRouter();
  const [term, setTerm] = useState(search);

  const push = (next: {
    search?: string;
    status?: string;
    category?: string;
    range?: string;
  }) => {
    const params = new URLSearchParams();
    const values = { search, status, category, range, ...next };
    if (values.search?.trim()) params.set("search", values.search.trim());
    if (values.status && values.status !== "all") params.set("status", values.status);
    if (values.category && values.category !== "all") params.set("category", values.category);
    if (values.range && values.range !== "7") params.set("range", values.range);
    const query = params.toString();
    router.push(query ? `/admin/claims?${query}` : "/admin/claims");
  };

  const hasFilters =
    Boolean(search.trim()) || status !== "all" || category !== "all" || range !== "7";

  return (
    <div className="rounded-3xl border border-line bg-white p-4 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-5">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          push({ search: term });
        }}
        className="flex flex-col gap-3"
      >
        <div className="relative flex-1">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search by reference, name, email or category…"
            aria-label="Search claims"
            className="w-full rounded-xl border border-line bg-sky-soft/70 py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <select
            value={status}
            onChange={(event) => push({ status: event.target.value })}
            aria-label="Filter by status"
            className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
          >
            <option value="all">All statuses</option>
            {CLAIM_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(event) => push({ category: event.target.value })}
            aria-label="Filter by fraud category"
            className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
          >
            <option value="all">All categories</option>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={range}
            onChange={(event) => push({ range: event.target.value })}
            aria-label="Filter by submission date"
            className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
          >
            {RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setTerm("");
            router.push("/admin/claims");
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
        >
          <SlidersHorizontal size={15} />
          Reset filters
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={() => push({ search: term })}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-3.5 py-2 text-[12.5px] font-semibold text-white transition hover:bg-navy-soft"
          >
            Apply search
          </button>
        )}
        {hasFilters && (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <X size={13} /> Filters active
          </span>
        )}
      </div>
    </div>
  );
}
