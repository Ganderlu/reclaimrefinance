"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronRight, FileText, Inbox } from "lucide-react";
import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import { formatCurrency, formatDateTime } from "@/lib/admin/format";
import { categoryLabel, type AdminClaim } from "@/lib/admin/types";

function customerName(claim: AdminClaim) {
  const name =
    `${claim.personalInformation.firstName} ${claim.personalInformation.lastName}`.trim();
  return name || claim.personalInformation.email || "Unknown customer";
}

export default function ClaimsTable({ claims }: { claims: AdminClaim[] }) {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
      };

  if (claims.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
        <EmptyState
          icon={Inbox}
          title="No claims match these filters"
          description="Try widening the date range, clearing the search term, or selecting a different status."
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]"
    >
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-sky-soft/60 text-[11.5px] font-bold uppercase tracking-wide text-muted">
              <th className="px-5 py-3.5">Reference</th>
              <th className="px-5 py-3.5">Customer</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Est. loss</th>
              <th className="px-5 py-3.5">Submitted</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <motion.tr
                key={claim.id}
                variants={item}
                className="group border-b border-line/70 transition-colors last:border-0 hover:bg-sky-soft/70"
              >
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/claims/${claim.id}`}
                    className="text-[13.5px] font-bold text-ink transition group-hover:text-emerald"
                  >
                    {claim.referenceNumber}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <p className="text-[13.5px] font-semibold text-ink">{customerName(claim)}</p>
                  <p className="text-[12px] text-muted">{claim.personalInformation.email}</p>
                </td>
                <td className="px-5 py-4 text-[12.5px] text-muted">
                  {categoryLabel(claim.scamDetails.category)}
                </td>
                <td className="px-5 py-4 text-[13px] font-semibold text-ink">
                  {formatCurrency(claim.financialDetails.amountLost, claim.financialDetails.currency)}
                </td>
                <td className="px-5 py-4 text-[12.5px] text-muted">
                  {formatDateTime(claim.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={claim.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/claims/${claim.id}`}
                    aria-label={`Open ${claim.referenceNumber}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition group-hover:bg-white group-hover:text-emerald"
                  >
                    <ChevronRight size={17} />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="md:hidden">
        {claims.map((claim) => (
          <motion.li key={claim.id} variants={item} className="border-b border-line/70 last:border-0">
            <Link
              href={`/admin/claims/${claim.id}`}
              className="flex items-start gap-3.5 px-5 py-4 transition-colors active:bg-sky-soft/70"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-soft text-navy/60 ring-1 ring-line">
                <FileText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[13.5px] font-bold text-ink">
                    {claim.referenceNumber}
                  </p>
                  <StatusBadge status={claim.status} />
                </div>
                <p className="mt-1 truncate text-[12.5px] font-medium text-ink/80">
                  {customerName(claim)}
                </p>
                <p className="mt-0.5 truncate text-[12px] text-muted">
                  {categoryLabel(claim.scamDetails.category)} · {formatDateTime(claim.createdAt)}
                </p>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
