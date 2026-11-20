"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import Reveal from "../Reveal";

const bgImg = "/images/how-it-works/cta-globe.jpg";

export default function ServicesCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-navy-dark py-20 sm:py-24"
    >
      {/* background photograph */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={bgImg}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
      </div>

      {/* overlays + glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/95 via-navy-dark/90 to-navy-soft/85" />
      <div className="pointer-events-none absolute inset-0 opacity-25 animate-gradient bg-[linear-gradient(120deg,#08B99A,#071D3A,#21D6B5,#051528)]" />
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-emerald/25 blur-3xl animate-floaty" />
      <div className="pointer-events-none absolute right-10 bottom-0 h-72 w-72 rounded-full bg-emerald-light/15 blur-3xl animate-floaty-slow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold text-emerald-light">
            <ShieldCheck size={15} />
            Confidential Case Assessment
          </span>
          <h2 className="mt-6 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[46px] text-balance">
            Have You Experienced Financial Fraud?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Take the first step towards understanding your options. Submit your
            information for an individual case assessment.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href="/claim"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-8 py-4 text-base font-bold text-white shadow-emerald transition hover:bg-emerald-soft sm:w-auto"
              >
                Start Your Claim
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:border-emerald hover:text-emerald-light sm:w-auto"
            >
              Contact Our Team
            </Link>
          </div>

          <p className="mt-6 inline-flex items-center justify-center gap-2 text-sm text-white/55">
            <Lock size={14} className="text-emerald-light" />
            No obligation. Recovery is never guaranteed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
