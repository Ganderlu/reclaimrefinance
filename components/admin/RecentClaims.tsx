"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight, FileText, Inbox } from "lucide-react";
import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import { formatDateTime } from "@/lib/admin/format";
import type { AdminClaim } from "@/lib/admin/types";

function customerName(claim: AdminClaim) {
  const name = `${claim.personalInformation.firstName} ${claim.personalInformation.lastName}`.trim();
  return name || claim.personalInformation.email || "Unknown customer";
}

export default function RecentClaims({ claims }: { claims: AdminClaim[] }) {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section className="flex h-full flex-col rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-bold text-ink sm:text-lg">Recent Claims</h2>
          <p className="mt-0.5 text-[12.5px] text-muted">The five most recently submitted claims.</p>
        </div>
        <Link
          href="/admin/claims"
          className="group inline-flex items-center gap-1 text-[13px] font-semibold text-emerald transition hover:text-emerald-soft"
        >
          View All
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {claims.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No claims submitted yet"
          description="New customer submissions will appear here automatically as soon as they arrive."
        />
      ) : (
        <motion.ul variants={container} initial="hidden" animate="visible" className="flex-1">
          {claims.map((claim) => (
            <motion.li key={claim.id} variants={item}>
              <Link
                href={`/admin/claims/${claim.id}`}
                className="group flex items-center gap-4 border-b border-line/70 px-5 py-4 transition-colors last:border-0 hover:bg-sky-soft/70 sm:px-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-soft text-navy/60 ring-1 ring-line transition-colors group-hover:bg-white">
                  <FileText size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-bold text-ink">
                    {claim.referenceNumber}
                  </p>
                  <p className="truncate text-[12.5px] text-muted">{customerName(claim)}</p>
                </div>
                <div className="hidden shrink-0 sm:block">
                  <StatusBadge status={claim.status} />
                </div>
                <span className="hidden w-40 shrink-0 text-right text-[12.5px] text-muted md:block">
                  {formatDateTime(claim.createdAt)}
                </span>
                <ChevronRight
                  size={17}
                  className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-emerald"
                />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
