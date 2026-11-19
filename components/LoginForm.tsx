"use client";

export default function LoginForm() {
  return (
    <form className="mt-6 grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-emerald px-8 py-3.5 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
      >
        Log In
      </button>
    </form>
  );
}
