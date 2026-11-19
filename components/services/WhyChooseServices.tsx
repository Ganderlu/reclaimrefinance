"use client";

import { Check } from "lucide-react";
import Reveal from "../Reveal";

const features = [
  {
    title: "Professional Case Assessment",
    desc: "Every case is reviewed individually using the information provided.",
  },
  {
    title: "Transparent Service Fees",
    desc: "Fees are explained clearly before any work begins.",
  },
  {
    title: "Secure Information Handling",
    desc: "Your information and submitted documents are handled confidentially.",
  },
  {
    title: "Clear Communication",
    desc: "We explain each stage of the process in plain language.",
  },
  {
    title: "International Customer Support",
    desc: "Assistance for clients in supported countries worldwide.",
  },
  {
    title: "Individual Case Attention",
    desc: "Your case is given dedicated attention from start to finish.",
  },
];

export default function WhyChooseServices() {
  return (
    <section id="why-choose" className="relative bg-white py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            Why Choose ReclaimRefinance?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-text">
            Standards that guide every case we handle.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald/30 hover:shadow-[var(--shadow-card-hover)]">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald group-hover:text-white">
                  <Check size={19} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-base font-bold leading-snug text-navy">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-text">
                    {f.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
