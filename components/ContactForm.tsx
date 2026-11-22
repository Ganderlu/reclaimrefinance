"use client";

import { useActionState } from "react";
import { CircleExclamationPoint, CircleCheck, LoaderCircle } from "lucide-react";
import { submitContactForm } from "@/app/contact/actions";

const inputClasses =
  "rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, null);

  return (
    <form action={formAction} className="mt-8 grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={inputClasses} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={inputClasses}
        />
      </div>
      <textarea
        name="message"
        rows={5}
        required
        minLength={10}
        placeholder="Your message"
        className={inputClasses}
      />

      {state && (
        <div
          role="status"
          className={`rounded-xl border px-3.5 py-3 text-[13px] font-medium ${
            state.ok
              ? "border-emerald/30 bg-emerald/10 text-emerald"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          <p className="flex items-start gap-2">
            {state.ok ? (
              <CircleCheck size={16} className="mt-0.5 shrink-0" />
            ) : (
              <CircleExclamationPoint size={16} className="mt-0.5 shrink-0" />
            )}
            {state.message}
          </p>
          {state.fallbackHref && (
            <a
              href={state.fallbackHref}
              className="mt-3 inline-flex items-center justify-center rounded-full border border-rose-300 bg-white px-4 py-2 font-semibold text-rose-700 transition hover:bg-rose-50"
            >
              Open email app with message
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-8 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
