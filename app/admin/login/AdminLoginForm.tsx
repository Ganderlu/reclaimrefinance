"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  CircleExclamationPoint,
  LoaderCircle,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Logo from "@/components/Logo";
import { auth } from "@/lib/firebase";
import { signInAdmin } from "@/lib/admin/session-actions";

const highlights = [
  "Claim intake lands in the dashboard automatically.",
  "Review evidence and update statuses in one place.",
  "Every sensitive action is written to the audit log.",
];

function messageForCode(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network problem — check your connection and try again.";
    default:
      return "We could not sign you in. Please try again.";
  }
}

export default function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!auth) {
      setError("Sign-in is not configured. Add the Firebase client keys to continue.");
      return;
    }

    setPending(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await credential.user.getIdToken(true);
      const result = await signInAdmin(idToken);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch (thrown) {
      const code = (thrown as { code?: string })?.code ?? "";
      setError(messageForCode(code));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-sky-soft">
      <aside className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-soft lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-emerald/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-light/15 blur-3xl" />

        <div className="relative">
          <Logo light size={34} />
          <p className="mt-4 text-[13px] font-semibold tracking-[0.2em] text-emerald-light uppercase">
            Administrator Panel
          </p>
        </div>

        <div className="relative">
          <h1 className="max-w-md text-3xl font-extrabold leading-tight text-white">
            Manage recovery cases with clarity and confidence.
          </h1>
          <ul className="mt-6 flex flex-col gap-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-light" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[12px] text-white/45">
          ReclaimRefinance · Recover • Refinance • Move Forward
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <Logo size={32} />
          </div>

          <div className="rounded-3xl border border-line bg-white p-7 shadow-[0_24px_60px_-30px_rgba(7,29,58,0.35)] sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald/12 text-emerald ring-1 ring-emerald/20">
              <Lock size={20} />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
              Administrator sign in
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Sign in with your authorised administrator account to continue.
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-1.5 block text-[13px] font-semibold text-ink"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@reclaimrefinance.com"
                    className="w-full rounded-xl border border-line bg-sky-soft/70 py-3 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-1.5 block text-[13px] font-semibold text-ink"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-line bg-sky-soft/70 py-3 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-[13px] font-medium text-rose-700"
                  role="alert"
                >
                  <CircleExclamationPoint size={16} className="mt-0.5 shrink-0" />
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_34px_-18px_rgba(7,29,58,0.85)] transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-70"
              >
                {pending ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in to dashboard"
                )}
              </button>
            </form>

            <p className="mt-6 text-[12px] leading-relaxed text-muted">
              Administrator access is restricted to pre-authorised accounts. There is no
              public registration.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
