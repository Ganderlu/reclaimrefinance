"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck, CircleX, Clock, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CountUp from "./CountUp";

export type StatTone = "navy" | "emerald" | "amber" | "violet";

/**
 * Icons are referenced by a serialisable key rather than passed as component
 * references, because StatCard is a Client Component and component references
 * cannot cross the Server/Client boundary.
 */
export type StatIcon = "document" | "approved" | "review" | "rejected";

const ICONS: Record<StatIcon, LucideIcon> = {
  document: FileText,
  approved: CircleCheck,
  review: Clock,
  rejected: CircleX,
};

const TONES: Record<StatTone, string> = {
  navy: "bg-navy/10 text-navy ring-navy/10",
  emerald: "bg-emerald/12 text-emerald ring-emerald/20",
  amber: "bg-amber-100 text-amber-600 ring-amber-200",
  violet: "bg-violet-100 text-violet-600 ring-violet-200",
};

export default function StatCard({
  label,
  value,
  icon,
  tone,
  index = 0,
}: {
  label: string;
  value: number;
  icon: StatIcon;
  tone: StatTone;
  index?: number;
}) {
  const reduce = useReducedMotion();
  const Icon = ICONS[icon];

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduce ? undefined : { y: -5 }}
      className="group rounded-3xl border border-line bg-white p-6 shadow-[0_12px_34px_-22px_rgba(7,29,58,0.35)] transition-shadow duration-300 hover:shadow-[0_22px_48px_-24px_rgba(7,29,58,0.4)]"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${TONES[tone]}`}
      >
        <Icon size={21} />
      </span>
      <p className="mt-5 text-[30px] font-extrabold leading-none tracking-tight text-ink">
        <CountUp value={value} />
      </p>
      <p className="mt-2 text-[13px] font-semibold text-muted">{label}</p>
    </motion.div>
  );
}
