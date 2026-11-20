"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { RANGE_OPTIONS } from "@/lib/admin/types";

export default function DashboardWelcome({ range }: { range: string }) {
  const reduce = useReducedMotion();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <motion.h1
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-extrabold tracking-tight text-ink sm:text-[30px]"
        >
          Welcome back, Admin!
        </motion.h1>
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1.5 text-sm leading-relaxed text-muted"
        >
          Here&apos;s what&apos;s happening with your ReclaimRefinance platform today.
        </motion.p>
      </div>

      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <label className="relative flex items-center">
          <CalendarDays
            size={16}
            className="pointer-events-none absolute left-3.5 text-muted"
          />
          <select
            value={range}
            onChange={(event) => router.push(`/admin?range=${event.target.value}`)}
            aria-label="Filter statistics by date range"
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
      </motion.div>
    </div>
  );
}
