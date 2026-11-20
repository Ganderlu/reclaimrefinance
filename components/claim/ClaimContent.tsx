"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ClaimHero from "./ClaimHero";
import ClaimWizard from "./ClaimWizard";
import { serviceOptions } from "@/lib/services";
import {
  Send,
  Search,
  Bell,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const nextSteps = [
  {
    icon: Send,
    title: "Confirmation",
    desc: "You'll get an email with your claim reference.",
  },
  {
    icon: Search,
    title: "Review",
    desc: "Our team will review your information.",
  },
  {
    icon: Bell,
    title: "Updates",
    desc: "We'll keep you informed about progress.",
  },
  {
    icon: CheckCircle2,
    title: "Resolution",
    desc: "We'll work towards the best possible outcome.",
  },
];

function ClaimContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") ?? "";
  const defaultCategory =
    service && serviceOptions.some((s) => s.slug === service) ? service : "";

  return (
    <>
      <ClaimHero />
      <ClaimWizard defaultCategory={defaultCategory} />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-navy">
                What Happens Next?
              </h2>
              <p className="mt-3 text-slate-text">
                After you submit your claim, you&apos;ll receive a confirmation
                email and your case will be reviewed by our team.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {nextSteps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="relative">
                      <div className="rounded-2xl border border-slate-100 bg-sky-soft/40 p-5 text-center">
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                          <Icon size={20} />
                        </span>
                        <h3 className="mt-3 text-sm font-bold text-navy">
                          {s.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-text">{s.desc}</p>
                      </div>
                      {i < nextSteps.length - 1 && (
                        <ArrowRight
                          size={18}
                          className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-emerald/50 lg:block"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-[var(--shadow-card)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-it-works/cta-globe.jpg"
                  alt="Claim approved concept"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ClaimContentWithSuspense() {
  return (
    <Suspense fallback={null}>
      <ClaimContent />
    </Suspense>
  );
}
