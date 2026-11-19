"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Lock, ShieldCheck, ArrowRight, Quote } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  "Professional Case Assessment",
  "Transparent and Fair Fees",
  "Secure and Confidential",
  "Clear Communication",
  "International Customer Support",
];

const testimonialImg =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80";

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT - Features */}
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
              Why Choose Us
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl text-balance">
              Why Choose ReclaimRefinance?
            </h2>
            <p className="mt-4 text-lg text-slate-text">
              We combine professional expertise with a supportive, transparent
              approach to help you navigate a difficult situation.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span className="text-base font-medium text-slate-heading">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* MIDDLE - Testimonial */}
          <Reveal delay={0.15}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-sky-soft to-white p-8 shadow-[var(--shadow-card)]">
              <Quote
                size={48}
                className="absolute top-6 right-6 text-emerald/15"
                aria-hidden="true"
              />
              <div className="flex items-center gap-4">
                <Image
                  src={testimonialImg}
                  alt="Sample customer portrait used for layout demonstration"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-white"
                />
                <div>
                  <p className="font-bold text-navy">Sample Customer</p>
                  <p className="text-sm text-slate-text">
                    Development sample content
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-1 text-amber-400" aria-label="Sample rating">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="mt-5 text-lg leading-relaxed text-slate-heading">
                &ldquo;This is clearly labelled sample testimonial content for
                layout demonstration. Verified testimonials will be published
                only with explicit customer permission.&rdquo;
              </p>

              <div className="mt-6 rounded-xl bg-white/70 p-4 text-xs leading-relaxed text-slate-text border border-slate-100">
                <strong className="text-navy">Note:</strong> Names, ratings and
                results shown are sample placeholders. We do not guarantee
                recovery outcomes.
              </div>
            </div>
          </Reveal>

          {/* RIGHT - Security card */}
          <Reveal delay={0.3}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-soft to-navy-dark p-8 text-white shadow-[0_30px_70px_-25px_rgba(7,29,58,0.6)]">
              {/* glowing lock imagery */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-emerald/20 blur-3xl animate-floaty-slow" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-light/10 blur-3xl" />

              <div className="relative">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald-light text-white shadow-emerald">
                  <Lock size={30} />
                </span>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Your Security Matters
                </h3>
                <p className="mt-3 text-white/75 leading-relaxed">
                  We take your privacy seriously and use appropriate security
                  measures to protect your personal information and submitted
                  evidence.
                </p>

                <ul className="mt-6 space-y-3">
                  {["Encrypted data handling", "Confidential case review", "Secure document submission"].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-sm text-white/85">
                      <ShieldCheck size={17} className="text-emerald-light" />
                      {t}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/security"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-emerald"
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
