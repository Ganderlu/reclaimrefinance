"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, CircleExclamationPoint, LoaderCircle, Save } from "lucide-react";
import { updatePlatformSettings } from "@/lib/admin/actions";
import type { PlatformSettings } from "@/lib/admin/types";

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "CHF"];

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition ${
        checked ? "border-emerald/40 bg-emerald/[0.06]" : "border-line bg-white hover:bg-sky-soft"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
          checked ? "bg-emerald" : "bg-slate-300"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span>
        <span className="block text-[13px] font-bold text-ink">{label}</span>
        <span className="mt-0.5 block text-[12px] leading-relaxed text-muted">{description}</span>
      </span>
    </button>
  );
}

export default function SettingsForm({ settings }: { settings: PlatformSettings }) {
  const router = useRouter();
  const [form, setForm] = useState<PlatformSettings>(settings);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startSave] = useTransition();

  const update = <K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSaved(false);
    startSave(async () => {
      const result = await updatePlatformSettings(form);
      if (result.ok) {
        setSaved(true);
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
        <h2 className="text-base font-bold text-ink">Platform settings</h2>
        <p className="mt-1 text-[12.5px] text-muted">
          These details are used across the customer-facing site and notifications.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-ink">Company name</span>
            <input
              value={form.companyName}
              onChange={(event) => update("companyName", event.target.value)}
              className="w-full rounded-xl border border-line bg-sky-soft/60 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-ink">Support email</span>
            <input
              type="email"
              value={form.supportEmail}
              onChange={(event) => update("supportEmail", event.target.value)}
              className="w-full rounded-xl border border-line bg-sky-soft/60 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-ink">Contact phone</span>
            <input
              value={form.contactPhone}
              onChange={(event) => update("contactPhone", event.target.value)}
              className="w-full rounded-xl border border-line bg-sky-soft/60 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-ink">
              Default report currency
            </span>
            <select
              value={form.defaultCurrency}
              onChange={(event) => update("defaultCurrency", event.target.value)}
              className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
        <h2 className="text-base font-bold text-ink">Notification preferences</h2>
        <p className="mt-1 text-[12.5px] text-muted">
          Choose which platform events should notify administrators.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <Toggle
            label="New claim submitted"
            description="Notify when a customer submits a new claim."
            checked={form.notifyOnNewClaim}
            onChange={(next) => update("notifyOnNewClaim", next)}
          />
          <Toggle
            label="Claim status changed"
            description="Notify when a claim is moved to a new status."
            checked={form.notifyOnStatusChange}
            onChange={(next) => update("notifyOnStatusChange", next)}
          />
          <Toggle
            label="Weekly summary digest"
            description="Send a weekly summary of claim activity."
            checked={form.weeklyDigest}
            onChange={(next) => update("weeklyDigest", next)}
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-soft disabled:opacity-60"
        >
          {pending ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
          Save settings
        </button>
        {saved && (
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-emerald">
            <CircleCheck size={15} /> Settings saved.
          </span>
        )}
        {error && (
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-rose-700">
            <CircleExclamationPoint size={15} /> {error}
          </span>
        )}
      </div>
    </form>
  );
}
