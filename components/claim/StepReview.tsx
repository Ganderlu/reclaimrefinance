"use client";

import { Pencil, CheckCircle2, ShieldCheck } from "lucide-react";
import { Checkbox, StepHeader } from "./fields";
import type { ClaimData, ScamCategory } from "@/lib/claim-types";

const categoryLabels: Record<ScamCategory, string> = {
  crypto: "Cryptocurrency Fraud",
  investment: "Investment Fraud",
  "bank-transfer": "Bank Transfer Fraud",
  purchase: "Purchase & Invoice Fraud",
  romance: "Romance & Social Engineering",
  "account-takeover": "Account Takeover Fraud",
  wire: "International Wire Transfer Fraud",
  other: "Other Financial Scams",
};

function ReviewBlock({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-emerald">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-emerald hover:bg-emerald/10"
        >
          <Pencil size={13} /> Edit
        </button>
      </div>
      <div className="space-y-1.5 text-sm text-slate-heading">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-text">{label}</span>
      <span className="text-right font-medium">{value || "—"}</span>
    </div>
  );
}

export default function StepReview({
  data,
  onEdit,
  onConsentChange,
  errors,
}: {
  data: ClaimData;
  onEdit: (step: number) => void;
  onConsentChange: (patch: Partial<ClaimData["consent"]>) => void;
  errors: Record<string, string>;
}) {
  const { personal, scam, financial, documents, consent } = data;

  return (
    <div>
      <StepHeader
        title="Review Your Claim"
        description="Please review the information below before submitting your application."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <ReviewBlock title="Personal Information" onEdit={() => onEdit(1)}>
          <Row label="Name" value={`${personal.firstName} ${personal.lastName}`.trim()} />
          <Row label="Email" value={personal.email} />
          <Row label="Phone" value={personal.phone} />
          <Row label="Country" value={personal.country} />
          <Row label="Preferred Contact" value={personal.preferredContact} />
        </ReviewBlock>

        <ReviewBlock title="Scam Details" onEdit={() => onEdit(2)}>
          <Row
            label="Category"
            value={scam.category ? categoryLabels[scam.category] : ""}
          />
          <Row label="Platform / Company" value={scam.platformName} />
          <Row label="Incident Date" value={scam.incidentDate} />
          {scam.description && (
            <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed">
              {scam.description}
            </p>
          )}
        </ReviewBlock>

        <ReviewBlock title="Financial Loss" onEdit={() => onEdit(3)}>
          <Row
            label="Amount"
            value={
              financial.amountLost
                ? `${financial.amountLost} ${financial.currency}`
                : ""
            }
          />
          <Row label="Payment Method" value={financial.paymentMethod} />
          <Row label="Transaction Date" value={financial.transactionDate} />
          <Row label="Institution" value={financial.institution} />
        </ReviewBlock>

        <ReviewBlock title="Supporting Documents" onEdit={() => onEdit(4)}>
          {documents.length === 0 ? (
            <p className="text-slate-text">No documents uploaded.</p>
          ) : (
            <ul className="space-y-1">
              {documents.map((d) => (
                <li key={d.name + d.size} className="flex items-center gap-2">
                  {d.status === "success" ? (
                    <CheckCircle2 size={14} className="text-emerald" />
                  ) : (
                    <ShieldCheck size={14} className="text-slate-400" />
                  )}
                  <span className="truncate">
                    {d.name}{" "}
                    <span className="text-xs text-slate-text">
                      ({(d.size / 1024).toFixed(0)} KB)
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ReviewBlock>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-sky-soft/40 p-5">
        <Checkbox
          checked={consent.accurate}
          onChange={(v) => onConsentChange({ accurate: v })}
          label={
            <>
              I confirm that the information provided is accurate to the best of
              my knowledge.
            </>
          }
          error={errors.accurate}
        />
        <Checkbox
          checked={consent.terms}
          onChange={(v) => onConsentChange({ terms: v })}
          label={
            <>
              I have read and agree to the{" "}
              <a href="/terms" className="text-emerald underline" target="_blank">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-emerald underline" target="_blank">
                Privacy Policy
              </a>
              .
            </>
          }
          error={errors.terms}
        />
        <Checkbox
          checked={consent.authorize}
          onChange={(v) => onConsentChange({ authorize: v })}
          label={
            <>
              I authorize ReclaimRefinance to review the information and
              supporting documents submitted for this assessment.
            </>
          }
          error={errors.authorize}
        />
      </div>

      <p className="mt-4 text-xs text-slate-text">
        <strong>Notice:</strong> Submitting a claim does not guarantee recovery of
        funds. Each case is assessed individually.
      </p>
    </div>
  );
}
