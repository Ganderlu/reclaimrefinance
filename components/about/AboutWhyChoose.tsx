"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Eye,
  Globe,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import Reveal from "../Reveal";

type Feature = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    icon: Compass,
    title: "Expert Guidance",
    desc: "Get professional assistance from experienced specialists.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Confidential",
    desc: "Your privacy and data are always protected.",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    desc: "No hidden fees or unfair practices.",
  },
  {
    icon: Globe,
    title: "International Support",
    desc: "Assistance for clients in supported countries worldwide.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Get help whenever you need it.",
  },
  {
    icon: ClipboardCheck,
    title: "Professional Case Assessment",
    desc: "Every case is assessed individually using its available evidence.",
  },
];

export default function AboutWhyChoose() {
  const reduce = useReducedMotion();

  return (
    <section id="why-choose" className="relative bg-sky-soft py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.6fr] lg:gap-14">
          {/* LEFT */}
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
              Why Choose ReclaimRefinance?
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl text-balance">
              Our Commitment to Your Recovery
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-text">
              We combine expertise, technology and a client-focused approach to
              deliver professional support throughout your recovery journey.
            </p>
            <Link
              href="/claim"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-7 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
            >
              Start Your Claim
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          {/* RIGHT - feature cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={reduce ? undefined : { y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald/15 to-navy/5 text-emerald ring-1 ring-emerald/15 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={26} />
                    </span>
                    <h3 className="mt-5 text-lg font-bold leading-snug text-navy">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-text">
                      {f.desc}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
