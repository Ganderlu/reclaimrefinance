"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const heroImg = "/images/how-it-works/hero.jpg";

const decorativeLines = [
  "M0,90 C150,150 260,40 440,100",
  "M0,300 C180,360 280,240 460,310",
  "M0,500 C160,560 290,450 450,510",
];

export default function HeroSection() {
  const reduce = useReducedMotion();

  const headline = ["Protect. Recover.", "Reclaim Your", "Lost"];

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.15 },
        },
      };

  const word: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { y: "110%", opacity: 0 },
        visible: {
          y: "0%",
          opacity: 1,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy-dark pt-[164px] pb-20 text-white sm:pt-[180px] lg:pt-[196px] lg:pb-24"
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* LEFT */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-emerald-light"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-light opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-light" />
              </span>
              System Status: Active Monitoring
            </motion.div>

            <motion.h1
              variants={container}
              initial="hidden"
              animate="visible"
              className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance text-white sm:text-5xl lg:text-[56px]"
            >
              {headline.map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span variants={word} className="inline-block">
                    {w}{" "}
                    {i === headline.length - 1 && (
                      <span className="text-emerald-light">Assets</span>
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 text-lg leading-relaxed text-white/75"
            >
              Clinical-grade digital asset recovery using proprietary forensic
              methodologies. We restore access to secured environments with
              surgical precision and absolute transparency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/claim"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-7 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
              >
                Initialize Recovery Protocol
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-emerald hover:text-emerald-light"
              >
                Technical Security Audit
              </Link>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* glow */}
              <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-emerald/25 to-emerald-light/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.75)]">
                <Image
                  src={heroImg}
                  alt="Professional financial specialist reviewing a recovery case at a modern office desk"
                  width={900}
                  height={1000}
                  priority
                  className="h-[460px] w-full object-cover object-center sm:h-[520px] lg:h-[560px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* dark navy overlays for blending */}
                <div className="absolute inset-0 bg-gradient-to-tr from-navy/85 via-navy/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
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

                {/* handwritten note */}
                <motion.div
                  initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -3, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="absolute bottom-6 left-5 rotate-[-3deg] rounded-2xl border border-white/15 bg-navy/50 px-5 py-3 backdrop-blur-md shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)]"
                >
                  <p
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    You&apos;re not alone.
                  </p>
                  <p className="text-xs text-white/60">— ReclaimRefinance team</p>
                </motion.div>
              </div>

              {/* floating recovery rate card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute -bottom-5 -left-3 rounded-2xl border border-white/15 bg-white/95 p-4 shadow-[0_15px_35px_-12px_rgba(0,0,0,0.5)] sm:block"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/15 text-emerald">
                    <ShieldCheck size={22} />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/55">
                      Recovery Rate
                    </p>
                    <p className="text-xl font-extrabold text-navy">
                      99.4% <span className="text-emerald">Verified</span>
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
                  <div className="h-full w-[99.4%] rounded-full bg-emerald" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
