"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";
import { Field, Select, Checkbox, StepHeader } from "./fields";
import { countries } from "@/lib/countries";
import type { PersonalInformation, ContactMethod } from "@/lib/claim-types";

const contactMethods: { value: ContactMethod; label: string; icon: typeof Mail }[] = [
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
];

export default function StepPersonal({
  data,
  onChange,
  errors,
}: {
  data: PersonalInformation;
  onChange: (patch: Partial<PersonalInformation>) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <StepHeader
        title="Personal Information"
        description="Let's start with your basic details."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={(v) => onChange({ firstName: v })}
          placeholder="Enter your first name"
          required
          error={errors.firstName}
          autoComplete="given-name"
        />
        <Field
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={(v) => onChange({ lastName: v })}
          placeholder="Enter your last name"
          required
          error={errors.lastName}
          autoComplete="family-name"
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          value={data.email}
          onChange={(v) => onChange({ email: v })}
          placeholder="you@example.com"
          required
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone Number"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={(v) => onChange({ phone: v })}
          placeholder="+1 555 000 0000"
          required
          error={errors.phone}
          autoComplete="tel"
        />
        <Select
          label="Country"
          name="country"
          value={data.country}
          onChange={(v) => onChange({ country: v })}
          options={countries.map((c) => ({ value: c, label: c }))}
          required
          error={errors.country}
        />
        <Field
          label="State / Region"
          name="state"
          value={data.state}
          onChange={(v) => onChange({ state: v })}
          placeholder="State or region"
          autoComplete="address-level1"
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-navy">
          Preferred Contact Method <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {contactMethods.map((m) => {
            const active = data.preferredContact === m.value;
            const Icon = m.icon;
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => onChange({ preferredContact: m.value })}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "border-emerald bg-emerald text-white shadow-emerald"
                    : "border-slate-200 bg-white text-slate-heading hover:border-emerald hover:text-emerald"
                }`}
              >
                <Icon size={16} /> {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <Field
          label="How did you hear about us?"
          name="referralSource"
          value={data.referralSource}
          onChange={(v) => onChange({ referralSource: v })}
          placeholder="Search engine, friend, social media, etc."
        />
      </div>

      <div className="mt-6">
        <Checkbox
          checked={data.confirmAccurate}
          onChange={(v) => onChange({ confirmAccurate: v })}
          label={
            <>
              I confirm that the information provided is accurate.
            </>
          }
          error={errors.confirmAccurate}
        />
      </div>
    </div>
  );
}
