"use client";

import { motion } from "framer-motion";
import { Check, Bitcoin, TrendingUp, Landmark, ShoppingBag, Heart, UserCog, Globe, ShieldAlert } from "lucide-react";
import { Field, Textarea, StepHeader } from "./fields";
import type { ScamDetails, ScamCategory } from "@/lib/claim-types";

const categories: { value: ScamCategory; label: string; icon: typeof Bitcoin }[] = [
  { value: "crypto", label: "Cryptocurrency Fraud", icon: Bitcoin },
  { value: "investment", label: "Investment Fraud", icon: TrendingUp },
  { value: "bank-transfer", label: "Bank Transfer Fraud", icon: Landmark },
  { value: "purchase", label: "Purchase & Invoice Fraud", icon: ShoppingBag },
  { value: "romance", label: "Romance & Social Engineering", icon: Heart },
  { value: "account-takeover", label: "Account Takeover Fraud", icon: UserCog },
  { value: "wire", label: "International Wire Transfer Fraud", icon: Globe },
  { value: "other", label: "Other Financial Scams", icon: ShieldAlert },
];

export default function StepScam({
  data,
  onChange,
  errors,
}: {
  data: ScamDetails;
  onChange: (patch: Partial<ScamDetails>) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <StepHeader
        title="Tell Us What Happened"
        description="Help us understand the circumstances surrounding the reported incident."
      />

      <div className="mb-6">
        <label className="mb-3 block text-sm font-semibold text-navy">
          Scam Category <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c, i) => {
            const active = data.category === c.value;
            const Icon = c.icon;
            return (
              <motion.button
                key={c.value}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                onClick={() => onChange({ category: c.value })}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                  active
                    ? "border-emerald bg-emerald/5 text-emerald shadow-[0_0_0_2px_rgba(8,185,154,0.25)]"
                    : "border-slate-200 bg-white text-slate-heading hover:border-emerald hover:text-emerald"
                }`}
              >
                {active && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald text-white">
                    <Check size={12} />
                  </span>
                )}
                <Icon size={26} className={active ? "text-emerald" : "text-slate-text"} />
                <span className="text-xs font-semibold leading-tight">{c.label}</span>
              </motion.button>
            );
          })}
        </div>
        {errors.category && <p className="mt-2 text-xs text-red-500">{errors.category}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name of platform, company or individual involved"
          name="platformName"
          value={data.platformName}
          onChange={(v) => onChange({ platformName: v })}
          placeholder="e.g. platform name or individual"
          required
          error={errors.platformName}
        />
        <Field
          label="Date the incident occurred"
          name="incidentDate"
          type="date"
          value={data.incidentDate}
          onChange={(v) => onChange({ incidentDate: v })}
          required
          error={errors.incidentDate}
        />
        <Field
          label="Where did the incident happen?"
          name="incidentLocation"
          value={data.incidentLocation}
          onChange={(v) => onChange({ incidentLocation: v })}
          placeholder="Country, platform, website..."
        />
        <Field
          label="How did the incident happen?"
          name="incidentHappened"
          value={data.incidentHappened}
          onChange={(v) => onChange({ incidentHappened: v })}
          placeholder="Briefly describe the method"
        />
      </div>

      <div className="mt-5">
        <Textarea
          label="Detailed description of the incident"
          name="description"
          value={data.description}
          onChange={(v) => onChange({ description: v })}
          placeholder="Describe what happened in detail..."
          rows={6}
          maxLength={2000}
          required
          error={errors.description}
        />
      </div>
    </div>
  );
}
