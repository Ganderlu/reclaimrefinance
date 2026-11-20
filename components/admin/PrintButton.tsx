"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
    >
      <Printer size={16} />
      Print / Save as PDF
    </button>
  );
}
