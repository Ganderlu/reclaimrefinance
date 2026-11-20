"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Globe2, Star, Users } from "lucide-react";
import Reveal from "../Reveal";

const globeImg = "/images/about/journey.jpg";

/**
 * PLACEHOLDER FIGURES.
 * These values are editable development placeholders only. Replace them with
 * independently verified numbers supplied by ReclaimRefinance before publishing.
 * Do not treat these as real business statistics.
 */
const stats = [
  { icon: Users, label: "Happy Clients", value: 1500, suffix: "+" },
  { icon: Star, label: "Client Satisfaction", value: 97, suffix: "%" },
  { icon: Globe2, label: "Countries Served", value: 30, suffix: "+" },
  { icon: Award, label: "Years of Experience", value: 12, suffix: "" },
];

function CountUp({
  value,
  suffix,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutJourney() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-navy-dark py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-emerald/15 blur-3xl animate-floaty-slow" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-light/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
          {/* LEFT */}
          <Reveal className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold text-emerald-light">
              Our Journey
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px] leading-[1.1] text-balance">
              A Track Record of Trust and Impact
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Our commitment is to help people affected by financial fraud access
              clear information, professional assistance and practical recovery
              options.
            </p>
            <Link
              href="/#services"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-7 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
            >
              Explore Our Services
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          {/* RIGHT - stats + blended globe photograph */}
          <div className="relative">
            <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-[560px] w-[440px] -translate-y-1/2 opacity-40 [mask-image:linear-gradient(to_left,black,transparent)] lg:block">
              <Image
                src={globeImg}
                alt="Businessperson holding a globe representing international financial recovery assistance"
                fill
                sizes="440px"
                className="object-cover"
              />
            </div>

            <div className="relative grid gap-5 sm:grid-cols-2">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.label} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-emerald-light text-white shadow-emerald">
                        <Icon size={24} />
                      </span>
                      <p className="mt-5 text-4xl font-extrabold tracking-tight text-white">
                        <CountUp value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/70">
                        {s.label}
                      </p>
                      <span className="mt-3 inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-light">
                        Placeholder
                      </span>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>

            <p className="relative mt-6 text-xs leading-relaxed text-white/50">
              Figures shown are editable development placeholders and are not
              verified statistics. Real, independently verified numbers will be
              published only when supplied by ReclaimRefinance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
