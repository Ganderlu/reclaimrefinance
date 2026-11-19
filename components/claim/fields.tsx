"use client";

import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
};

export function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-heading outline-none transition focus:ring-2 focus:ring-emerald/20 ${
          error ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-emerald"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

type SelectProps = FieldProps & { options: { value: string; label: string }[] };

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 text-slate-heading outline-none transition focus:ring-2 focus:ring-emerald/20 ${
          error ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-emerald"
        }`}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

type TextareaProps = FieldProps & { rows?: number; maxLength?: number };

export function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 5,
  maxLength,
}: TextareaProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-semibold text-navy">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {maxLength && (
          <span className="text-xs text-slate-text">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-heading outline-none transition focus:ring-2 focus:ring-emerald/20 ${
          error ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-emerald"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  error,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-heading">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-emerald focus:ring-emerald"
        />
        <span>{label}</span>
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function StepHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-navy">{title}</h2>
      <p className="mt-1.5 text-sm text-slate-text">{description}</p>
    </div>
  );
}
