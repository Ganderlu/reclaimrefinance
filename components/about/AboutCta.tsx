"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import Reveal from "../Reveal";
import Logo from "../Logo";

export default function AboutCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-soft py-20 sm:py-24"
    >
      {/* animated gradient wash */}
      <div className="pointer-events-none absolute inset-0 opacity-30 animate-gradient bg-[linear-gradient(120deg,#08B99A,#071D3A,#21D6B5,#051528)]" />

      {/* digital network dot pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:26px_26px] opacity-60" />

      {/* glowing security graphics */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-emerald/20 blur-3xl animate-floaty" />
        <div className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-emerald-light/15 blur-3xl animate-floaty-slow" />
        <ShieldCheck
          size={120}
          strokeWidth={0.8}
          className="absolute right-[22%] top-8 hidden text-white/10 lg:block animate-floaty"
          aria-hidden="true"
        />
        <Lock
          size={72}
          strokeWidth={0.9}
          className="absolute left-[12%] bottom-8 hidden text-emerald-light/20 lg:block animate-floaty-slow"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            {/* LEFT */}
            <div className="text-white">
              <Logo light />
              <h2 className="mt-7 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px] text-balance">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-4 max-w-lg text-lg text-white/75">
                Let us help you explore your available recovery options today.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-light" />
                  Confidential handling
                </span>
                <span className="inline-flex items-center gap-2">
                  <Lock size={16} className="text-emerald-light" />
                  No obligation
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:justify-self-end">
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-block"
              >
                <Link
                  href="/claim"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald px-9 py-5 text-lg font-bold text-white shadow-emerald transition hover:bg-emerald-soft"
                >
                  Start a Claim
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/55 lg:block">
                <RefreshCw size={14} className="text-emerald-light lg:hidden" />
                Every case is assessed individually.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
