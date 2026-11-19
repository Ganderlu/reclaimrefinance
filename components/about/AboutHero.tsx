"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const heroImg =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20corporate%20photograph%20of%20a%20confident%20white%20businesswoman%20aged%2040%20with%20shoulder-length%20hair%20wearing%20glasses%20and%20a%20tailored%20navy%20blazer%2C%20seated%20in%20a%20modern%20executive%20office%20with%20floor-to-ceiling%20windows%2C%20soft%20natural%20daylight%2C%20subtle%20smile%20conveying%20trust%20and%20expertise%2C%20premium%20financial%20services%20corporate%20portrait%2C%20sharp%20focus%2C%20shallow%20depth%20of%20field&image_size=portrait_4_3";

export default function AboutHero() {
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
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-sky-soft via-white to-white pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-24"
    >
      {/* decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald/10 blur-3xl animate-floaty-slow" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-navy/5 blur-3xl animate-floaty" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald"
            >
              <Sparkles size={15} />
              About ReclaimRefinance
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-navy sm:text-5xl lg:text-[60px] text-balance"
            >
              About <span className="text-emerald">Us</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 text-xl font-bold tracking-tight text-navy sm:text-2xl"
            >
              Your Trusted Partner in Financial Recovery
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 text-lg leading-relaxed text-slate-text"
            >
              At ReclaimRefinance, we are committed to helping individuals and
              businesses explore options after scams, fraud and financial
              deception. With expertise, integrity and a client-first approach,
              we stand by you every step of the way.
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
                href="#mission"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-7 py-3.5 text-base font-semibold text-navy transition hover:border-emerald hover:text-emerald"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/70 p-4 backdrop-blur"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <CheckCircle2 size={20} />
              </span>
              <p className="text-sm leading-relaxed text-slate-text">
                <span className="font-semibold text-navy">
                  No guaranteed recovery.
                </span>{" "}
                Every case is assessed individually using its available evidence.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="relative">
            {/* animated emerald curved accent */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 620"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -left-8 top-4 hidden h-[calc(100%-2rem)] w-28 lg:block"
            >
              <defs>
                <linearGradient id="aboutCurve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#21D6B5" stopOpacity="0" />
                  <stop offset="35%" stopColor="#08B99A" />
                  <stop offset="100%" stopColor="#071D3A" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path
                d="M108,0 C18,150 18,470 108,620"
                fill="none"
                stroke="url(#aboutCurve)"
                strokeWidth={3}
                strokeLinecap="round"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* soft glow */}
              <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-emerald/25 to-navy/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white shadow-[0_35px_80px_-30px_rgba(7,29,58,0.45)]">
                <Image
                  src={heroImg}
                  alt="Confident professional financial recovery specialist wearing glasses in a modern executive office"
                  width={900}
                  height={1050}
                  priority
                  sizes="(max-width: 1024px) 90vw, 48vw"
                  className="h-[440px] w-full object-cover object-top sm:h-[520px] lg:h-[600px]"
                />
                {/* navy overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/25 via-transparent to-transparent" />

                {/* floating trust badge */}
                <motion.div
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute right-4 top-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Confidential
                  </p>
                  <p className="text-sm font-bold text-white">Case Handling</p>
                </motion.div>
              </div>

              {/* handwritten decorative text */}
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, rotate: -8, scale: 0.9 }}
                animate={{ opacity: 1, rotate: -3, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-6 -left-4 max-w-[15rem] rotate-[-3deg] rounded-2xl bg-white px-5 py-3.5 shadow-[0_18px_40px_-14px_rgba(7,29,58,0.35)] sm:-left-8"
              >
                <p
                  className="text-xl font-semibold leading-tight text-navy"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  Recover today. Move forward.
                </p>
                <span className="mt-1 block h-0.5 w-14 rounded-full bg-emerald/60" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
