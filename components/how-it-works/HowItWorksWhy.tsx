"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import Reveal from "../Reveal";

const whyImg =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20corporate%20photograph%20of%20a%20confident%20Caucasian%20businessman%20aged%2038%20wearing%20a%20navy%20business%20suit%20reviewing%20financial%20documents%20beside%20a%20laptop%20in%20a%20modern%20office%2C%20focused%20expression%2C%20soft%20natural%20daylight%2C%20premium%20financial%20services%20photography&image_size=landscape_4_3";

const features = [
  "Clear step-by-step guidance.",
  "Secure and confidential process.",
  "Regular updates on your case.",
];

export default function HowItWorksWhy() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="why-process"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT - photo */}
          <Reveal className="relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald/15 to-navy/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 shadow-[0_30px_70px_-25px_rgba(7,29,58,0.35)]">
                <Image
                  src={whyImg}
                  alt="Professional businessman in a navy suit reviewing financial documents beside a laptop in a modern office"
                  width={800}
                  height={620}
                  sizes="(max-width: 1024px) 90vw, 48vw"
                  className="h-[420px] w-full object-cover sm:h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>

          {/* RIGHT - content */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={item}
              className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald"
            >
              Why Our Process Stands Out
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[40px] text-balance"
            >
              Professional, Transparent and Secure
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 text-lg leading-relaxed text-slate-text"
            >
              We are committed to providing a trustworthy and transparent
              assistance process with your security and peace of mind at the
              centre.
            </motion.p>

            <motion.ul variants={item} className="mt-7 space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                    <CheckCircle2 size={18} />
                  </span>
                  <span className="text-base font-medium text-slate-heading">
                    {f}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* security info card */}
            <motion.div
              variants={item}
              className="mt-8 rounded-2xl border border-sky-soft bg-sky-soft/60 p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-4">
                <motion.span
                  animate={
                    reduce
                      ? undefined
                      : { scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }
                  }
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald-light text-white shadow-emerald"
                >
                  <ShieldCheck size={28} />
                </motion.span>
                <div>
                  <h3 className="text-lg font-bold text-navy">
                    Your Information is Safe With Us
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-text">
                    We use appropriate security measures to protect your
                    personal information and submitted documents.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
