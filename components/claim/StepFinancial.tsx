"use client";

import { AlertTriangle } from "lucide-react";
import { Field, Select, StepHeader } from "./fields";
import type { FinancialDetails, Currency, PaymentMethod } from "@/lib/claim-types";

const currencies: { value: Currency; label: string }[] = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "NGN", label: "NGN — Nigerian Naira" },
  { value: "CAD", label: "CAD — Canadian Dollar" },
  { value: "AUD", label: "AUD — Australian Dollar" },
  { value: "CHF", label: "CHF — Swiss Franc" },
  { value: "ZAR", label: "ZAR — South African Rand" },
  { value: "INR", label: "INR — Indian Rupee" },
  { value: "Other", label: "Other" },
];

const paymentMethods: { value: PaymentMethod; label: string }[] = [
  { value: "bank-transfer", label: "Bank Transfer" },
  { value: "cryptocurrency", label: "Cryptocurrency" },
  { value: "credit-card", label: "Credit / Debit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "mobile-money", label: "Mobile Money" },
  { value: "other", label: "Other" },
];

export default function StepFinancial({
  data,
  onChange,
  errors,
}: {
  data: FinancialDetails;
  onChange: (patch: Partial<FinancialDetails>) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <StepHeader
        title="Financial Loss Information"
        description="Provide details about the financial loss associated with the incident."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Estimated Amount Lost"
          name="amountLost"
          value={data.amountLost}
          onChange={(v) => onChange({ amountLost: v })}
          placeholder="0.00"
          required
          error={errors.amountLost}
        />
        <Select
          label="Currency"
          name="currency"
          value={data.currency}
          onChange={(v) => onChange({ currency: v as Currency })}
          options={currencies}
          required
          error={errors.currency}
        />
        <Select
          label="Payment Method"
          name="paymentMethod"
          value={data.paymentMethod}
          onChange={(v) => onChange({ paymentMethod: v as PaymentMethod })}
          options={paymentMethods}
          required
          error={errors.paymentMethod}
        />
        <Field
          label="Transaction Date"
          name="transactionDate"
          type="date"
          value={data.transactionDate}
          onChange={(v) => onChange({ transactionDate: v })}
          required
          error={errors.transactionDate}
        />
        <Field
          label="Transaction Reference (optional)"
          name="transactionReference"
          value={data.transactionReference}
          onChange={(v) => onChange({ transactionReference: v })}
          placeholder="Reference number if available"
        />
        <Field
          label="Recipient / destination details (optional)"
          name="recipientDetails"
          value={data.recipientDetails}
          onChange={(v) => onChange({ recipientDetails: v })}
          placeholder="Account name, wallet address, etc."
        />
        <div className="sm:col-span-2">
          <Field
            label="Financial Institution or Payment Provider"
            name="institution"
            value={data.institution}
            onChange={(v) => onChange({ institution: v })}
            placeholder="e.g. your bank or payment provider"
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-900">
          <strong>Privacy notice:</strong> Please never provide banking passwords,
          card PINs, CVVs, wallet private keys or recovery phrases. We only need
          the details above to assess your claim.
        </p>
      </div>
    </div>
  );
}
