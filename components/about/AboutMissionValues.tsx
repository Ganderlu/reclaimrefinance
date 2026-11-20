"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "../Reveal";

const buildingImg = "/images/about/mission-building.jpg";

const values = [
  "Integrity",
  "Professionalism",
  "Transparency",
  "Client-Centricity",
  "Security",
];

export default function AboutMissionValues() {
  return (
    <section id="mission" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-100">
          {/* 1 - Building image */}
          <Reveal className="lg:pr-8">
            <div className="relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-sky-soft shadow-[var(--shadow-card)]">
              <Image
                src={buildingImg}
                alt="Modern corporate office tower representing ReclaimRefinance international financial services"
                width={640}
                height={820}
                sizes="(max-width: 1024px) 90vw, 24vw"
                className="h-64 w-full object-cover sm:h-80 lg:h-full lg:min-h-[320px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald-light shadow-emerald">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="white"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <p className="text-sm font-bold leading-tight text-white">
                  ReclaimRefinance
                  <span className="block text-xs font-medium text-white/70">
                    International Recovery Assistance
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* 2 - Mission */}
          <Reveal delay={0.1} className="lg:px-8">
            <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald">
              Our Mission
            </span>
            <h2 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-navy text-balance lg:text-[26px]">
              To Restore Confidence and Rebuild Lives
            </h2>
            <p className="mt-4 leading-relaxed text-slate-text">
              We provide professional and transparent recovery assistance to help
              victims of financial fraud regain control of their finances and move
              forward with confidence.
            </p>
          </Reveal>

          {/* 3 - Vision */}
          <Reveal delay={0.2} className="lg:px-8">
            <span className="inline-flex items-center rounded-full border border-navy/10 bg-navy/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-soft">
              Our Vision
            </span>
            <h2 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-navy text-balance lg:text-[26px]">
              A Safer and More Secure Financial World
            </h2>
            <p className="mt-4 leading-relaxed text-slate-text">
              A world where individuals and businesses are better protected from
              financial fraud and supported in their time of need.
            </p>
          </Reveal>

          {/* 4 - Core values */}
          <Reveal delay={0.3} className="lg:pl-8">
            <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald">
              Our Core Values
            </span>
            <ul className="mt-5 space-y-3.5">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span className="text-base font-semibold text-slate-heading">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
