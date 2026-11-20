"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Building2, Clock3 } from "lucide-react";
import Reveal from "../Reveal";

const infoImg = "/images/about/hero.jpg";

const points = [
  {
    icon: Clock3,
    text: "Act promptly and preserve relevant transaction records.",
  },
  {
    icon: Building2,
    text: "Contact your bank, payment provider or relevant platform through official channels.",
  },
  {
    icon: AlertTriangle,
    text: "Report suspected fraud to the appropriate authorities in your jurisdiction.",
  },
];

export default function RecoveryInfo() {
  const reduce = useReducedMotion();

  return (
    <section id="recovery-options" className="relative bg-sky-soft py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT - photograph */}
          <Reveal>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald/20 to-navy/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_30px_70px_-25px_rgba(7,29,58,0.35)]">
                <Image
                  src={infoImg}
                  alt="Professional financial investigator reviewing case documents in a modern office"
                  width={900}
                  height={1000}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>

          {/* RIGHT - content */}
          <Reveal delay={0.15}>
            <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
              Recovery Information
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl text-balance">
              Understanding Your Recovery Options
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-text">
              Recovering funds after financial fraud can be complex. The
              available options depend on the payment method, transaction
              history, jurisdiction and the circumstances of the incident.
            </p>

            <ul className="mt-8 space-y-4">
              {points.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.text} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald shadow-[var(--shadow-card)]">
                      <Icon size={20} />
                    </span>
                    <span className="pt-1.5 text-base leading-relaxed text-slate-heading">
                      {p.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-9 inline-block"
            >
              <Link
                href="/claim"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald px-7 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
