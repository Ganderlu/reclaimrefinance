"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck, Zap, Headphones, Lock } from "lucide-react";

const heroImg = "/images/about/hero.jpg";

const features = [
  { icon: ShieldCheck, label: "Secure & Confidential" },
  { icon: Zap, label: "Fast Assessment" },
  { icon: Headphones, label: "Dedicated Support" },
];

export default function ClaimHero() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy-dark pt-28 pb-12 text-white sm:pt-32 lg:pt-36 lg:pb-16">
      {/* grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald/15 blur-3xl animate-floaty-slow" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-light/10 blur-3xl animate-floaty" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold text-emerald-light"
            >
              <ShieldCheck size={15} /> Start a Claim
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl"
            >
              Begin Your{" "}
              <span className="text-emerald-light">Recovery Journey</span> Today
            </motion.h1>

            <motion.p variants={item} className="mt-5 text-lg leading-relaxed text-white/75">
              Complete our secure claim form and let us assess your case. Our
              team is here to help you every step of the way.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/15 text-emerald-light">
                    <f.icon size={16} />
                  </span>
                  <span className="font-medium">{f.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald/25 to-emerald-light/10 blur-2xl" />
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.25rem] border border-white/10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] lg:max-w-none">
              <Image
                src={heroImg}
                alt="Professional woman working on a laptop in a modern financial office"
                width={900}
                height={1050}
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="h-[360px] w-full object-cover object-center sm:h-[440px] lg:h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/80 via-navy/25 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(8,185,154,0.22),transparent_60%)]" />

              {/* shield decoration */}
              <motion.div
                initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald/80 to-emerald-light/60 text-white backdrop-blur-md"
              >
                <Lock size={28} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
