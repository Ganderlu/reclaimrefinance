"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  X,
  ShieldCheck,
  Mail,
  MessageCircle,
  Clock,
  FileCheck,
  Home,
  LayoutDashboard,
  Lock,
} from "lucide-react";
import StepPersonal from "./StepPersonal";
import StepScam from "./StepScam";
import StepFinancial from "./StepFinancial";
import StepDocuments from "./StepDocuments";
import StepReview from "./StepReview";
import { emptyClaim, type ClaimData } from "@/lib/claim-types";
import { submitClaim } from "@/app/claim/actions";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Scam Details" },
  { id: 3, title: "Financial Loss" },
  { id: 4, title: "Documents" },
  { id: 5, title: "Review & Submit" },
];

const infoItems = [
  "Secure and encrypted submission",
  "Transparent process",
  "Regular updates",
];

const helpItems = [
  { icon: Mail, label: "Email Us", value: "support@reclaimrefinance.com" },
  { icon: MessageCircle, label: "Live Chat", value: "Chat with our team" },
  { icon: Clock, label: "Business Hours", value: "Mon - Fri, 8am - 8pm (UTC)" },
];

export default function ClaimWizard({
  defaultCategory = "",
}: {
  defaultCategory?: string;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<ClaimData>(() => {
    const initial = { ...emptyClaim };
    if (defaultCategory) {
      initial.scam.category = defaultCategory as ClaimData["scam"]["category"];
    }
    return initial;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<{
    referenceNumber: string;
    createdAt: string;
    category: string;
  } | null>(null);

  const completedSteps = useMemo(() => {
    const max = step - 1;
    return steps.filter((s) => s.id <= max).map((s) => s.id);
  }, [step]);

  const progressPct = Math.round(((step - 1) / steps.length) * 100);

  // Persist draft locally
  useEffect(() => {
    try {
      localStorage.setItem("claimDraft", JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const updatePersonal = (patch: Partial<ClaimData["personal"]>) =>
    setData((d) => ({ ...d, personal: { ...d.personal, ...patch } }));
  const updateScam = (patch: Partial<ClaimData["scam"]>) =>
    setData((d) => ({ ...d, scam: { ...d.scam, ...patch } }));
  const updateFinancial = (patch: Partial<ClaimData["financial"]>) =>
    setData((d) => ({ ...d, financial: { ...d.financial, ...patch } }));
  const updateDocuments = (files: ClaimData["documents"]) =>
    setData((d) => ({ ...d, documents: files }));
  const updateConsent = (patch: Partial<ClaimData["consent"]>) =>
    setData((d) => ({ ...d, consent: { ...d.consent, ...patch } }));

  const validateStep = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 1) {
      const p = data.personal;
      if (!p.firstName.trim()) e.firstName = "First name is required";
      if (!p.lastName.trim()) e.lastName = "Last name is required";
      if (!p.email.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))
        e.email = "Enter a valid email";
      if (!p.phone.trim()) e.phone = "Phone number is required";
      if (!p.country) e.country = "Country is required";
      if (!p.confirmAccurate)
        e.confirmAccurate = "Please confirm the information is accurate";
    } else if (s === 2) {
      const sc = data.scam;
      if (!sc.category) e.category = "Please select a scam category";
      if (!sc.platformName.trim()) e.platformName = "This field is required";
      if (!sc.incidentDate) e.incidentDate = "Date is required";
      if (!sc.description.trim() || sc.description.length < 20)
        e.description = "Please provide at least 20 characters";
    } else if (s === 3) {
      const f = data.financial;
      if (!f.amountLost.trim()) e.amountLost = "Amount is required";
      else if (isNaN(Number(f.amountLost)) || Number(f.amountLost) <= 0)
        e.amountLost = "Enter a valid amount";
      if (!f.currency) e.currency = "Currency is required";
      if (!f.paymentMethod) e.paymentMethod = "Payment method is required";
      if (!f.transactionDate) e.transactionDate = "Transaction date is required";
    } else if (s === 4) {
      if (data.documents.length === 0)
        e.documents = "Please upload at least one supporting document";
    } else if (s === 5) {
      if (!data.consent.accurate) e.accurate = "Required";
      if (!data.consent.terms) e.terms = "Required";
      if (!data.consent.authorize) e.authorize = "Required";
    }
    return e;
  };

  const goNext = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStep((s) => Math.min(steps.length, s + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const goToStep = (target: number) => {
    if (target <= completedSteps.length + 1 || completedSteps.includes(target)) {
      setErrors({});
      setStep(target);
    }
  };

  const handleSubmit = async () => {
    const e = validateStep(5);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const payload: ClaimData = {
        ...data,
        documents: data.documents.map((d) => ({
          name: d.name,
          size: d.size,
          type: d.type,
          category: d.category,
          status: d.status,
          progress: d.progress,
          storagePath: d.storagePath,
          downloadUrl: d.downloadUrl,
        })),
      };
      const res = await submitClaim(payload);
      if (res.ok && res.data) {
        setResult({
          referenceNumber: res.data.referenceNumber,
          createdAt: res.data.createdAt,
          category: res.data.category,
        });
        try {
          localStorage.removeItem("claimDraft");
          sessionStorage.removeItem("claimDraftId");
        } catch {
          /* ignore */
        }
      } else if (!res.ok) {
        setSubmitError(res.error || "Failed to submit claim. Please try again.");
      } else {
        setSubmitError("Failed to submit claim. Please try again.");
      }
    } catch {
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return <SuccessScreen result={result} router={router} />;
  }

  return (
    <section className="relative bg-gradient-to-b from-sky-soft to-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-navy">
              Step {step} of {steps.length}
            </span>
            <span className="text-sm font-semibold text-emerald">{progressPct}% complete</span>
          </div>
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {steps.map((s, idx) => {
              const isCompleted = completedSteps.includes(s.id);
              const isActive = s.id === step;
              return (
                <div key={s.id} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => goToStep(s.id)}
                    className="flex flex-col items-center gap-2"
                    aria-label={`Step ${s.id}: ${s.title}`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                        isCompleted
                          ? "border-emerald bg-emerald text-white"
                          : isActive
                            ? "border-emerald bg-emerald text-white"
                            : "border-slate-300 bg-white text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check size={16} /> : s.id}
                    </span>
                    <span
                      className={`hidden text-xs font-semibold sm:block ${
                        isActive || isCompleted ? "text-navy" : "text-slate-400"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                  {idx < steps.length - 1 && (
                    <div className="mx-1 h-1 flex-1 overflow-hidden rounded-full bg-slate-200 sm:mx-2">
                      <div
                        className="h-full rounded-full bg-emerald transition-all duration-500"
                        style={{ width: isCompleted ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr_1fr]">
          {/* LEFT INFO */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-emerald/20 bg-gradient-to-br from-emerald/5 to-sky-soft p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
                  <FileCheck size={22} />
                </span>
                <h3 className="text-lg font-bold text-navy">Your Claim Information</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-text">
                Provide accurate information about your financial loss. This
                helps us review your case quickly and efficiently.
              </p>
              <ul className="mt-5 space-y-2.5">
                {infoItems.map((i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-heading">
                    <Check size={16} className="text-emerald" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-sm">
                  <ShieldCheck size={64} className="text-emerald" strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER FORM */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {step === 1 && (
                  <StepPersonal
                    data={data.personal}
                    onChange={updatePersonal}
                    errors={errors}
                  />
                )}
                {step === 2 && (
                  <StepScam data={data.scam} onChange={updateScam} errors={errors} />
                )}
                {step === 3 && (
                  <StepFinancial
                    data={data.financial}
                    onChange={updateFinancial}
                    errors={errors}
                  />
                )}
                {step === 4 && (
                  <StepDocuments
                    files={data.documents}
                    onChange={updateDocuments}
                    errors={errors}
                  />
                )}
                {step === 5 && (
                  <StepReview
                    data={data}
                    onEdit={(s) => goToStep(s)}
                    onConsentChange={updateConsent}
                    errors={errors}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {submitError && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {submitError}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={step === 1 ? () => router.push("/") : goBack}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-heading transition hover:border-slate-300 hover:bg-slate-50"
              >
                {step === 1 ? (
                  <>
                    <X size={16} /> Cancel
                  </>
                ) : (
                  <>
                    <ArrowLeft size={16} /> Back
                  </>
                )}
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-7 py-3 text-sm font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
                >
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-7 py-3 text-sm font-semibold text-white shadow-emerald transition hover:bg-emerald-soft disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit My Claim <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* RIGHT HELP */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
                    <HeadphonesIcon />
                  </span>
                  <h3 className="text-lg font-bold text-navy">Need Help?</h3>
                </div>
                <p className="mt-3 text-sm text-slate-text">
                  Our support team is ready to assist you.
                </p>
                <div className="mt-4 space-y-2">
                  {helpItems.map((h) => {
                    const Icon = h.icon;
                    return (
                      <div
                        key={h.label}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-sky-soft/40 p-3"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald">
                          <Icon size={17} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-navy">{h.label}</p>
                          <p className="truncate text-xs text-slate-text">{h.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-navy/10 bg-gradient-to-br from-navy to-navy-soft p-6 text-white">
                <h3 className="text-lg font-bold">Your Security Matters</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  We use advanced security measures to protect your personal
                  information.
                </p>
                <div className="mt-4 flex justify-end">
                  <Lock size={48} className="text-emerald-light/70" strokeWidth={1.2} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function SuccessScreen({
  result,
  router,
}: {
  result: { referenceNumber: string; createdAt: string; category: string };
  router: ReturnType<typeof useRouter>;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="bg-gradient-to-b from-sky-soft to-white py-16">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[var(--shadow-card)] sm:p-12"
        >
          <motion.div
            initial={reduce ? { scale: 1 } : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald/10"
          >
            <motion.div
              initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald text-white"
            >
              <Check size={36} strokeWidth={3} />
            </motion.div>
          </motion.div>

          <h2 className="mt-6 text-3xl font-extrabold text-navy">
            Your Claim Has Been Submitted!
          </h2>
          <p className="mt-3 text-slate-text">
            Thank you for submitting your information to ReclaimRefinance. Your
            application has been received for review.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl bg-sky-soft/50 p-5 text-left">
            <div className="flex justify-between">
              <span className="text-sm text-slate-text">Claim Reference</span>
              <span className="text-sm font-bold text-emerald">
                {result.referenceNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-text">Submission Date</span>
              <span className="text-sm font-semibold text-navy">
                {new Date(result.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-text">Scam Category</span>
              <span className="text-sm font-semibold text-navy">{result.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-text">Status</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-0.5 text-xs font-bold text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Submitted
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-heading hover:bg-slate-50"
            >
              <Home size={16} /> Return to Homepage
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-emerald hover:bg-emerald-soft"
            >
              <LayoutDashboard size={16} /> Go to My Dashboard
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-text">
            A confirmation email has been sent to your email address with your
            claim reference.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
