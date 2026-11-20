"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

const heroImg = "/images/how-it-works/hero.jpg";

const decorativeLines = [
  "M0,90 C150,150 260,40 440,100",
  "M0,300 C180,360 280,240 460,310",
  "M0,500 C160,560 290,450 450,510",
];

export default function HowItWorksHero() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 26 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy-dark pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-24"
    >
      {/* decorative grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald/15 blur-3xl animate-floaty-slow" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-emerald-light/10 blur-3xl animate-floaty" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold text-emerald-light"
            >
              How It Works
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[54px]"
            >
              A Simple 5-Step Process to{" "}
              <span className="text-emerald-light">Get Help</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg leading-relaxed text-white/75"
            >
              Our process is clear, secure and client-focused. Follow these
              simple steps to start your recovery journey with ReclaimRefinance.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/claim"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-7 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
              >
                Start Your Claim
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-emerald hover:text-emerald-light"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald/15 text-emerald-light">
                <ShieldCheck size={20} />
              </span>
              <p className="text-sm leading-relaxed text-white/70">
                Your security and privacy are our top priority.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-emerald/25 to-emerald-light/10 blur-2xl" />

            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.75)] lg:max-w-none">
              <Image
                src={heroImg}
                alt="Confident professional woman wearing glasses working on a laptop in a modern corporate office"
                width={900}
                height={1050}
                priority
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="h-[420px] w-full object-cover object-center sm:h-[500px] lg:h-[560px]"
              />

              {/* dark navy overlay on the left side + gradient transition */}
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/85 via-navy/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(8,185,154,0.22),transparent_60%)]" />

              {/* subtle cybersecurity grid */}
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />

              {/* glowing emerald decorative lines */}
              <svg
                aria-hidden="true"
                viewBox="0 0 460 560"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <g fill="none" stroke="#21D6B5" strokeWidth="1.4" opacity="0.55">
                  {decorativeLines.map((d, i) => (
                    <motion.path
                      key={d}
                      d={d}
                      strokeLinecap="round"
                      initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.55 }}
                      transition={{ duration: 1.6, delay: 0.5 + i * 0.25, ease: "easeInOut" }}
                    />
                  ))}
                </g>
              </svg>

              {/* handwritten decorative text */}
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, rotate: -10, scale: 0.9 }}
                animate={{ opacity: 1, rotate: -4, scale: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="absolute right-5 top-6 max-w-[12rem]"
              >
                <p
                  className="text-2xl font-semibold leading-tight text-white drop-shadow-md"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  It&apos;s easy to get started!
                </p>
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="mt-1 block h-1 w-16 origin-left rounded-full bg-emerald-light/80"
                  style={{ transform: "rotate(-3deg)" }}
                />
              </motion.div>

              {/* floating security badge */}
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy/50 px-4 py-3 backdrop-blur-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald-light text-white">
                  <Lock size={20} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Secure Process</p>
                  <p className="text-xs text-white/60">Confidential handling</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
