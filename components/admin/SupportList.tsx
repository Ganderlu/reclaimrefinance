"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck, Headphones, LoaderCircle, Mail } from "lucide-react";
import EmptyState from "./EmptyState";
import { updateSupportStatus } from "@/lib/admin/actions";
import { formatDateTime } from "@/lib/admin/format";
import type { SupportRequest } from "@/lib/admin/types";

const STATUSES: SupportRequest["status"][] = ["New", "Open", "Resolved"];

const STATUS_STYLES: Record<SupportRequest["status"], string> = {
  New: "bg-blue-50 text-blue-700 ring-blue-200",
  Open: "bg-amber-50 text-amber-700 ring-amber-200",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function SupportList({ requests }: { requests: SupportRequest[] }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<"all" | SupportRequest["status"]>("all");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const visible = filter === "all" ? requests : requests.filter((item) => item.status === filter);

  const setStatus = (request: SupportRequest, status: SupportRequest["status"]) => {
    setPendingId(request.id);
    startTransition(async () => {
      await updateSupportStatus(request.id, status);
      setPendingId(null);
      router.refresh();
    });
  };

  return (
    <section className="rounded-3xl border border-line bg-white p-4 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-5">
      <div className="inline-flex flex-wrap rounded-xl border border-line bg-sky-soft/60 p-1">
        {(["all", ...STATUSES] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`relative rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold capitalize transition ${
              filter === value ? "text-white" : "text-muted hover:text-ink"
            }`}
          >
            {filter === value && (
              <motion.span
                layoutId="support-filter"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-lg bg-navy"
              />
            )}
            <span className="relative z-10">{value}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={Headphones}
          title="No support requests"
          description="Customer enquiries and support requests raised through the site will appear here."
        />
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {visible.map((request, index) => (
            <motion.li
              key={request.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.32,
                delay: reduce ? 0 : index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl border border-line bg-white p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-bold text-ink">{request.subject}</p>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                        STATUS_STYLES[request.status]
                      }`}
                    >
                      {request.status === "Resolved" && <CircleCheck size={12} />}
                      {request.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-muted">
                    {request.name} · {request.email} · {formatDateTime(request.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {request.email && (
                    <a
                      href={`mailto:${request.email}?subject=${encodeURIComponent(
                        `Re: ${request.subject}`,
                      )}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
                    >
                      <Mail size={14} /> Reply
                    </a>
                  )}
                  <div className="relative">
                    <select
                      value={request.status}
                      onChange={(event) =>
                        setStatus(request, event.target.value as SupportRequest["status"])
                      }
                      disabled={pendingId === request.id}
                      aria-label={`Update status for ${request.subject}`}
                      className="rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20 disabled:opacity-50"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {pendingId === request.id && (
                      <LoaderCircle
                        size={14}
                        className="animate-spin absolute right-8 top-1/2 -translate-y-1/2 text-muted"
                      />
                    )}
                  </div>
                </div>
              </div>

              {request.message && (
                <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-sky-soft/60 px-4 py-3 text-[13px] leading-relaxed text-ink/80">
                  {request.message}
                </p>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
