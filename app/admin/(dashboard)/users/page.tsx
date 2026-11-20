import Link from "next/link";
import { Users } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import FadeIn from "@/components/admin/FadeIn";
import EmptyState from "@/components/admin/EmptyState";
import { getCustomers } from "@/lib/admin/data";
import { formatCurrency, formatDate, formatNumber } from "@/lib/admin/format";

// Customers are read per request behind the session check, so this segment is
// allowed to block on the server rather than produce an instant shell.
export const instant = false;

const ACCOUNT_STYLES: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Registered: "bg-blue-50 text-blue-700 ring-blue-200",
  Guest: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default async function AdminUsersPage() {
  const customers = await getCustomers();
  const totalClaims = customers.reduce((sum, item) => sum + item.claimCount, 0);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Users"
        description={`${formatNumber(customers.length)} customer${
          customers.length === 1 ? "" : "s"
        } associated with ${formatNumber(totalClaims)} claim${
          totalClaims === 1 ? "" : "s"
        }.`}
      />

      <FadeIn>
        <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
          {customers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No customers yet"
              description="Customers appear here as soon as a claim is submitted or an account is registered."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-sky-soft/60 text-[11.5px] font-bold uppercase tracking-wide text-muted">
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Country</th>
                    <th className="px-5 py-3.5">Claims</th>
                    <th className="px-5 py-3.5">Est. value</th>
                    <th className="px-5 py-3.5">Registered</th>
                    <th className="px-5 py-3.5">Last activity</th>
                    <th className="px-5 py-3.5">Account</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.email}
                      className="border-b border-line/70 transition-colors last:border-0 hover:bg-sky-soft/70"
                    >
                      <td className="px-5 py-4">
                        <p className="text-[13.5px] font-semibold text-ink">{customer.name}</p>
                        <p className="text-[12px] text-muted">{customer.email}</p>
                        {customer.phone && (
                          <p className="text-[12px] text-muted">{customer.phone}</p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {customer.country || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/claims?search=${encodeURIComponent(customer.email)}`}
                          className="text-[13px] font-semibold text-emerald transition hover:text-emerald-soft"
                        >
                          {formatNumber(customer.claimCount)} claim
                          {customer.claimCount === 1 ? "" : "s"}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-[13px] font-semibold text-ink">
                        {formatCurrency(customer.totalValue, customer.currency)}
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {formatDate(customer.firstSeen)}
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {formatDate(customer.lastSeen)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                            ACCOUNT_STYLES[customer.status] ?? ACCOUNT_STYLES.Guest
                          }`}
                        >
                          {customer.status}
                        </span>
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
