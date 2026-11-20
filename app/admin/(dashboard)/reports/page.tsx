import Link from "next/link";
import { Download, FileSpreadsheet } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import FadeIn from "@/components/admin/FadeIn";
import PrintButton from "@/components/admin/PrintButton";
import RangeFilter from "@/components/admin/RangeFilter";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import { getClaims } from "@/lib/admin/data";
import { formatCurrency, formatNumber } from "@/lib/admin/format";
import {
  CATEGORY_LABELS,
  CLAIM_STATUSES,
  RANGE_OPTIONS,
  categoryLabel,
  rangeToDays,
} from "@/lib/admin/types";

// Report data is read per request behind the session check, so this segment is
// allowed to block on the server rather than produce an instant shell.
export const instant = false;

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range: rangeParam } = await searchParams;
  const range =
    RANGE_OPTIONS.find((option) => option.value === rangeParam)?.value ?? "365";
  const days = rangeToDays(range);
  const rangeLabel =
    RANGE_OPTIONS.find((option) => option.value === range)?.label ?? "Last Year";

  const claims = await getClaims({ days });

  const byStatus = CLAIM_STATUSES.map((status) => ({
    status,
    count: claims.filter((claim) => claim.status === status).length,
  }));

  // Totals are grouped per currency so figures from different currencies are
  // never presented as a single combined amount.
  const lossByCurrency = new Map<string, number>();
  for (const claim of claims) {
    const currency = claim.financialDetails.currency || "USD";
    const amount = Number(claim.financialDetails.amountLost) || 0;
    lossByCurrency.set(currency, (lossByCurrency.get(currency) ?? 0) + amount);
  }

  const byCategory = Object.entries(CATEGORY_LABELS)
    .map(([value, label]) => ({
      value,
      label,
      count: claims.filter((claim) => claim.scamDetails.category === value).length,
    }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  const uncategorised = claims.filter(
    (claim) => !CATEGORY_LABELS[claim.scamDetails.category],
  ).length;

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Reports"
        description={`Claim register summary for ${rangeLabel.toLowerCase()}. Export the underlying data as CSV or print this summary.`}
        actions={
          <>
            <RangeFilter range={range} basePath="/admin/reports" />
            <a
              href={`/admin/reports/export?days=${days}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-emerald-soft"
            >
              <Download size={16} />
              Export CSV
            </a>
            <PrintButton />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <FadeIn className="rounded-3xl border border-line bg-white p-6 shadow-[0_12px_34px_-22px_rgba(7,29,58,0.35)]">
          <p className="text-[12.5px] font-semibold text-muted">Total claims</p>
          <p className="mt-2 text-[30px] font-extrabold leading-none text-ink">
            {formatNumber(claims.length)}
          </p>
        </FadeIn>
        {byStatus.slice(0, 3).map((entry, index) => (
          <FadeIn
            key={entry.status}
            delay={0.06 * (index + 1)}
            className="rounded-3xl border border-line bg-white p-6 shadow-[0_12px_34px_-22px_rgba(7,29,58,0.35)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12.5px] font-semibold text-muted">{entry.status}</p>
              <StatusBadge status={entry.status} />
            </div>
            <p className="mt-3 text-[30px] font-extrabold leading-none text-ink">
              {formatNumber(entry.count)}
            </p>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FadeIn>
          <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
            <h2 className="text-base font-bold text-ink">Claims by status</h2>
            <p className="mt-0.5 text-[12.5px] text-muted">
              Distribution of every claim submitted in the selected period.
            </p>
            <table className="mt-5 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line text-[11.5px] font-bold uppercase tracking-wide text-muted">
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Claims</th>
                  <th className="py-2.5 text-right">Share</th>
                </tr>
              </thead>
              <tbody>
                {byStatus.map((entry) => (
                  <tr key={entry.status} className="border-b border-line/70 last:border-0">
                    <td className="py-3">
                      <StatusBadge status={entry.status} />
                    </td>
                    <td className="py-3 text-right text-[13.5px] font-bold text-ink">
                      {formatNumber(entry.count)}
                    </td>
                    <td className="py-3 text-right text-[13px] text-muted">
                      {claims.length === 0
                        ? "0%"
                        : `${Math.round((entry.count / claims.length) * 100)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </FadeIn>

        <FadeIn delay={0.08}>
          <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
            <h2 className="text-base font-bold text-ink">Estimated loss by currency</h2>
            <p className="mt-0.5 text-[12.5px] text-muted">
              Sum of customer-reported amounts, grouped per currency.
            </p>
            {lossByCurrency.size === 0 ? (
              <p className="mt-5 text-[13px] text-muted">No claim amounts recorded yet.</p>
            ) : (
              <ul className="mt-5 flex flex-col gap-3">
                {[...lossByCurrency.entries()]
                  .sort((a, b) => b[1] - a[1])
                  .map(([currency, total]) => (
                    <li
                      key={currency}
                      className="flex items-center justify-between rounded-2xl border border-line bg-sky-soft/50 px-4 py-3"
                    >
                      <span className="text-[13px] font-semibold text-ink">{currency}</span>
                      <span className="text-[15px] font-extrabold text-ink">
                        {formatCurrency(total, currency)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        </FadeIn>
      </div>

      <FadeIn delay={0.12}>
        <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
          <div className="border-b border-line px-5 py-4 sm:px-6">
            <h2 className="text-base font-bold text-ink">Claims by fraud category</h2>
            <p className="mt-0.5 text-[12.5px] text-muted">
              Volume of claims recorded for each fraud type.
            </p>
          </div>
          {byCategory.length === 0 && uncategorised === 0 ? (
            <EmptyState
              icon={FileSpreadsheet}
              title="No claims in this period"
              description="Choose a wider date range to include more claims in the report."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-sky-soft/60 text-[11.5px] font-bold uppercase tracking-wide text-muted">
                    <th className="px-5 py-3.5">Fraud category</th>
                    <th className="px-5 py-3.5 text-right">Claims</th>
                    <th className="px-5 py-3.5 text-right">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {byCategory.map((entry) => (
                    <tr key={entry.value} className="border-b border-line/70 last:border-0">
                      <td className="px-5 py-3.5 text-[13.5px] font-medium text-ink">
                        <Link
                          href={`/admin/claims?category=${entry.value}`}
                          className="transition hover:text-emerald"
                        >
                          {entry.label}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-right text-[13.5px] font-bold text-ink">
                        {formatNumber(entry.count)}
                      </td>
                      <td className="px-5 py-3.5 text-right text-[13px] text-muted">
                        {Math.round((entry.count / claims.length) * 100)}%
                      </td>
                    </tr>
                  ))}
                  {uncategorised > 0 && (
                    <tr>
                      <td className="px-5 py-3.5 text-[13.5px] font-medium text-ink">
                        {categoryLabel(null)}
                      </td>
                      <td className="px-5 py-3.5 text-right text-[13.5px] font-bold text-ink">
                        {formatNumber(uncategorised)}
                      </td>
                      <td className="px-5 py-3.5 text-right text-[13px] text-muted">
                        {Math.round((uncategorised / claims.length) * 100)}%
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </FadeIn>
    </div>
  );
}
