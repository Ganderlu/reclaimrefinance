"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";

/**
 * DEMONSTRATION CONTENT.
 * Names and photographs below are temporary sample placeholders for layout
 * purposes only. Replace with real staff members and their consented
 * photographs before publishing.
 */
const team = [
  {
    name: "Daniel Whitfield",
    role: "Head of Client Relations",
    img: "/images/about/team-1.jpg",
  },
  {
    name: "Sarah Bennett",
    role: "Senior Recovery Specialist",
    img: "/images/about/team-2.jpg",
  },
  {
    name: "Michael Reeves",
    role: "Financial Investigations Lead",
    img: "/images/about/team-3.jpg",
  },
  {
    name: "Claire Donovan",
    role: "Client Support Manager",
    img: "/images/about/team-4.jpg",
  },
];

export default function AboutTeam() {
  const reduce = useReducedMotion();

  return (
    <section id="team" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            Meet Our Team
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            A Team of Experts Committed to You
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-text">
            Our team of financial recovery professionals, investigators and
            customer support specialists are here to help.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.12}>
              <motion.article
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sky-soft">
                  <Image
                    src={m.img}
                    alt={`Demonstration team member portrait — ${m.role}`}
                    fill
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-soft backdrop-blur">
                    Sample
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold leading-snug text-navy sm:text-lg">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-emerald">
                    {m.role}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="rounded-2xl border border-slate-100 bg-sky-soft px-5 py-4 text-xs leading-relaxed text-slate-text">
            <strong className="text-navy">Note:</strong> Names and photographs
            shown are demonstration content for layout purposes only. Actual staff
            members and their consented photographs will be added before launch.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 text-center">
          <Link
            href="#team"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-card)] transition hover:bg-navy-soft"
          >
            Meet Our Team
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
