"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FileCheck2, Search, ShieldCheck, MessageSquare, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    icon: FileCheck2,
    title: "Submit Your Claim",
    desc: "Complete our secure online application and share the details of your case.",
  },
  {
    num: "02",
    icon: Search,
    title: "We Investigate",
    desc: "Our team reviews your case and supporting evidence to understand what happened.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "We Take Action",
    desc: "We explain available recovery options and agreed next steps for your case.",
  },
  {
    num: "04",
    icon: MessageSquare,
    title: "You Get Updates",
    desc: "Receive clear updates about your case progress throughout the process.",
  },
];

const howImg = "/images/how-it-works/why.jpg";

export default function HowItWorks() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-navy py-20 text-white sm:py-28"
    >
      {/* decorative grid / glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald/15 blur-3xl animate-floaty-slow" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-light/10 blur-3xl animate-floaty" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold text-emerald-light">
            How It Works
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px] text-balance">
            A Clear, Transparent Recovery Process
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Four simple steps designed to keep you informed and supported from
            start to finish.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Steps */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.num}
                    variants={item}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-emerald/40 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald-light text-white shadow-emerald">
                        <Icon size={26} />
                      </span>
                      <span className="text-5xl font-extrabold text-white/10 transition-colors group-hover:text-emerald/30">
                        {s.num}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {s.desc}
                    </p>

                    {/* connecting arrow */}
                    {i < steps.length - 1 && (
                      <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-emerald/60 sm:block">
                        <ArrowRight size={22} />
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Image */}
          <Reveal delay={0.2} className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald/30 to-emerald-light/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)]">
                <Image
                  src={howImg}
                  alt="Laptop displaying a security shield symbol during a financial recovery investigation"
                  width={800}
                  height={700}
                  className="h-[420px] w-full object-cover sm:h-[480px]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>
              {/* floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald text-white">
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Secure Review</p>
                  <p className="text-xs text-white/70">Encrypted case handling</p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
