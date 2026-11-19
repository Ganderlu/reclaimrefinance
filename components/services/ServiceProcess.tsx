"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";

const steps = [
  {
    num: "01",
    title: "Submit Your Claim",
    desc: "Tell us what happened through our secure application.",
  },
  {
    num: "02",
    title: "Initial Assessment",
    desc: "We review the submitted information and determine whether the case is within our service scope.",
  },
  {
    num: "03",
    title: "Evidence Review",
    desc: "We examine the available supporting documentation.",
  },
  {
    num: "04",
    title: "Recovery Options",
    desc: "We explain available next steps and any relevant reporting or dispute channels.",
  },
  {
    num: "05",
    title: "Case Updates",
    desc: "We communicate developments and provide updates about your case.",
  },
];

export default function ServiceProcess() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-navy-dark py-20 text-white sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-emerald/15 blur-3xl animate-floaty-slow" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-light/10 blur-3xl animate-floaty" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold text-emerald-light">
            Our Process
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px] text-balance">
            A Clear and Structured Process
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Five steps that keep you informed at every stage of your case.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block" />
          <motion.div
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-emerald via-emerald-light to-emerald/30 lg:block"
          />

          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
          >
            {steps.map((s, i) => (
              <motion.li key={s.num} variants={item} className="relative">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-emerald-light text-base font-extrabold text-white shadow-emerald ring-4 ring-navy-dark">
                  {s.num}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {s.desc}
                </p>

                {i < steps.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    animate={reduce ? undefined : { x: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-4 top-7 hidden text-emerald/70 lg:block"
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
