"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "../Reveal";
import { serviceCategories } from "@/lib/services";

export default function ServiceCards() {
  const reduce = useReducedMotion();

  return (
    <section
      id="recovery-services"
      className="relative bg-gradient-to-b from-white to-sky-soft py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            Recovery Services
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            Explore Our Recovery Services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-text">
            We provide structured assistance for different forms of financial
            fraud and online scams.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 4) * 0.08} className="h-full">
                <motion.article
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sky-soft">
                    <Image
                      src={service.image}
                      alt={`${service.title} — professional financial recovery assistance`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />
                    <span className="absolute bottom-3 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-emerald shadow-lg ring-1 ring-emerald/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={22} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold leading-snug text-navy">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-text">
                      {service.short}
                    </p>

                    <ul className="mt-4 space-y-1.5">
                      {service.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-2 text-[13px] leading-snug text-slate-text"
                        >
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-emerald transition hover:text-navy"
                      >
                        Learn More
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>
                      <Link
                        href={`/claim?service=${service.slug}`}
                        className="rounded-full bg-emerald/10 px-3.5 py-1.5 text-xs font-bold text-emerald transition hover:bg-emerald hover:text-white"
                      >
                        Start a Claim
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
