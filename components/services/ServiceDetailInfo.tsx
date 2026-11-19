"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  Compass,
  FolderOpen,
  MessageSquare,
} from "lucide-react";
import Reveal from "../Reveal";

const items = [
  {
    icon: ClipboardCheck,
    title: "Initial Case Assessment",
    desc: "We review the information provided to understand the nature of the reported incident.",
  },
  {
    icon: FolderOpen,
    title: "Evidence Review",
    desc: "We help customers organize relevant transaction records and supporting documentation.",
  },
  {
    icon: Compass,
    title: "Recovery Options",
    desc: "We explain potentially available reporting, dispute and recovery channels based on the circumstances.",
  },
  {
    icon: MessageSquare,
    title: "Ongoing Communication",
    desc: "We provide clear updates and communicate requests for additional information.",
  },
];

export default function ServiceDetailInfo() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-sky-soft py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            More Than Just a Recovery Application
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-text">
            Here is what you receive when you use the ReclaimRefinance platform.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={i * 0.1} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group h-full rounded-3xl border border-slate-100 bg-white p-7 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald/15 to-navy/5 text-emerald ring-1 ring-emerald/15 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-snug text-navy">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-text">
                    {it.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
