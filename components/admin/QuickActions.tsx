"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FileSpreadsheet, FileText, Settings, Users, type LucideIcon } from "lucide-react";

type Action = { label: string; href: string; icon: LucideIcon };

const actions: Action[] = [
  { label: "View All Claims", href: "/admin/claims", icon: FileText },
  { label: "Manage Users", href: "/admin/users", icon: Users },
  { label: "Generate Report", href: "/admin/reports", icon: FileSpreadsheet },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];

export default function QuickActions() {
  const reduce = useReducedMotion();

  return (
    <section className="flex h-full flex-col rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
      <div className="border-b border-line px-5 py-4 sm:px-6">
        <h2 className="text-base font-bold text-ink sm:text-lg">Quick Actions</h2>
        <p className="mt-0.5 text-[12.5px] text-muted">Frequently used administrator tools.</p>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3 p-4 sm:p-5">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.href}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : 0.1 + index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={action.href}
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:shadow-[0_18px_36px_-20px_rgba(8,185,154,0.55)] active:translate-y-0"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald/12 text-emerald ring-1 ring-emerald/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} />
                </span>
                <span className="text-[13px] font-bold leading-snug text-ink">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
