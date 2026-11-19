"use client";

import { useState } from "react";
import { serviceOptions } from "@/lib/services";

export default function ClaimForm({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const [scamType, setScamType] = useState(defaultService);

  return (
    <form className="mt-6 grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" placeholder="Your name" />
        <Field label="Email Address" name="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone Number" name="phone" type="tel" placeholder="+1 555 000 0000" />
        <Field label="Country" name="country" placeholder="Country of residence" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Type of Scam"
          name="type"
          value={scamType}
          onChange={setScamType}
        />
        <Field label="Approximate Amount" name="amount" placeholder="USD amount" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy">
          Case Details
        </label>
        <textarea
          name="details"
          rows={6}
          placeholder="Describe what happened, when, and any evidence you have"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-heading outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
        />
      </div>
      <p className="text-xs text-slate-text">
        By submitting this form you acknowledge that recovery is not guaranteed
        and every case is assessed individually. Your information is kept
        confidential.
      </p>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-emerald px-8 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
      >
        Submit Claim
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-heading outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-heading outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      >
        <option value="">Select a category</option>
        {serviceOptions.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
