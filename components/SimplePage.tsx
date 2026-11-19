import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

type SimplePageProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function SimplePage({
  eyebrow,
  title,
  description,
  children,
}: SimplePageProps) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-gradient-to-b from-sky-soft to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-navy transition"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-[var(--shadow-card)]">
            {eyebrow && (
              <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl text-balance">
              {title}
            </h1>
            {description && (
              <p className="mt-4 text-lg text-slate-text">{description}</p>
            )}
            <div className="mt-6 text-slate-text leading-relaxed space-y-4">
              {children}
            </div>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
            >
              <Home size={16} /> Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
