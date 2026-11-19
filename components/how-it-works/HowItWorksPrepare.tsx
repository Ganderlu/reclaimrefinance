"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Receipt,
  MessageSquare,
  FileText,
  FolderOpen,
  ShieldAlert,
} from "lucide-react";
import Reveal from "../Reveal";

const prepCards = [
  {
    icon: Receipt,
    title: "Transaction Records",
    desc: "Keep relevant transaction receipts, payment confirmations and reference numbers.",
  },
  {
    icon: MessageSquare,
    title: "Communication Evidence",
    desc: "Preserve emails, messages and communications related to the incident.",
  },
  {
    icon: FileText,
    title: "Incident Details",
    desc: "Provide an accurate description of what happened and when it occurred.",
  },
  {
    icon: FolderOpen,
    title: "Supporting Documents",
    desc: "Prepare relevant documents that can help explain your reported financial loss.",
  },
];

export default function HowItWorksPrepare() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 26 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="prepare"
      className="relative overflow-hidden bg-gradient-to-b from-white to-sky-soft py-20 sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            Before You Submit
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl text-balance">
            Prepare for Your Recovery Assessment
          </h2>
          <p className="mt-4 text-lg text-slate-text">
            Having the right information ready helps our team review your case
            more efficiently.
          </p>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {prepCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={item}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald/15 to-sky-soft text-emerald transition group-hover:from-emerald group-hover:to-emerald-light group-hover:text-white">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-text">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* notice */}
        <Reveal delay={0.2} className="mx-auto mt-10 max-w-3xl">
          <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <ShieldAlert size={22} />
            </span>
            <div>
              <p className="text-sm font-bold text-amber-900">
                Important Security Notice
              </p>
              <p className="mt-1 text-sm leading-relaxed text-amber-800">
                Only submit documents relevant to your case. Never share your
                passwords, private keys or wallet recovery phrases with anyone.
                ReclaimRefinance will never request these details.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
