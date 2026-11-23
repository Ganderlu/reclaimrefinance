"use client";

import { Mail } from "lucide-react";
import { Field, Select, Checkbox, StepHeader } from "./fields";
import { countries } from "@/lib/countries";
import type { PersonalInformation } from "@/lib/claim-types";

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
          Preferred Contact Method
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald bg-emerald px-4 py-3 text-sm font-semibold text-white shadow-emerald"
          >
            <Mail size={16} /> Email
          </div>
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
