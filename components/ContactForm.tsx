"use client";

export default function ContactForm() {
  return (
    <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
          placeholder="Your name"
        />
        <input
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
          placeholder="Email"
          type="email"
        />
      </div>
      <textarea
        rows={5}
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
        placeholder="Your message"
      />
      <button className="inline-flex items-center justify-center rounded-full bg-emerald px-8 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft">
        Send Message
      </button>
    </form>
  );
}
