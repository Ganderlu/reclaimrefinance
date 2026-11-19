"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Is recovery guaranteed?",
    a: "No. Recovery is never guaranteed. Each case is unique, and outcomes depend on many factors including the type of scam, the passage of time, available evidence, and the responsiveness of third parties such as banks, exchanges or platforms. We provide an honest assessment of your options before any work begins.",
  },
  {
    q: "How much does your service cost?",
    a: "Fees depend on the complexity of your case and are discussed transparently after an initial review. We aim to keep our pricing fair and clearly communicated. You will always know what to expect before committing to any paid service.",
  },
  {
    q: "How long does the process take?",
    a: "Timelines vary significantly. Some cases may show progress within weeks, while others involving cross-border payments or complex fraud networks can take months. We provide regular updates so you always know the status of your case.",
  },
  {
    q: "What types of scams do you investigate?",
    a: "We review a wide range of financial fraud including cryptocurrency scams, investment fraud, bank transfer fraud, purchase and invoice fraud, romance and social engineering scams, account takeover fraud, wire and international payment fraud, and other documented financial deception.",
  },
  {
    q: "What documents do I need?",
    a: "Helpful documents include transaction receipts, screenshots of communications, wallet addresses or account numbers, invoices, and any correspondence with the suspected fraudster. More evidence generally helps our team build a clearer picture of your case.",
  },
  {
    q: "Can I track my recovery case?",
    a: "Yes. Once your case is underway, you receive clear, regular updates about progress and next steps. We believe transparent communication is essential during what can be a stressful process.",
  },
  {
    q: "Is my personal information secure?",
    a: "We treat your personal information and submitted evidence as confidential and use appropriate security measures to protect it. We only share information where necessary to pursue your case and in line with our privacy policy.",
  },
  {
    q: "Do you accept international customers?",
    a: "Yes. We work with individuals and businesses internationally. Financial fraud often crosses borders, and our team is experienced in handling cases that involve multiple jurisdictions and payment systems.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-sky-soft py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            Frequently Asked Questions
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            Answers to Common Questions
          </h2>
          <p className="mt-4 text-lg text-slate-text">
            Clear, honest information about our process, fees and what to
            expect.
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <Accordion
                  expanded={isOpen}
                  onChange={() => setOpen(isOpen ? null : i)}
                  sx={{
                    borderRadius: "16px !important",
                    border: "1px solid #e8eef5",
                    background: "#ffffff",
                    boxShadow: "0 1px 2px rgba(7,29,58,0.04)",
                    transition: "all .25s ease",
                    "&.Mui-expanded": {
                      borderColor: "rgba(8,185,154,0.4)",
                      boxShadow: "0 10px 30px -12px rgba(7,29,58,0.12)",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 bg-emerald text-white"
                            : "bg-sky-soft text-emerald"
                        }`}
                      >
                        <Plus size={18} />
                      </span>
                    }
                    sx={{
                      padding: "6px 18px",
                      "& .MuiAccordionSummary-content": {
                        margin: "14px 0",
                      },
                      "& .MuiAccordionSummary-expandIconWrapper": {
                        color: "inherit",
                      },
                    }}
                  >
                    <h3 className="text-base font-bold text-navy sm:text-lg">
                      {f.q}
                    </h3>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "0 18px 20px" }}>
                    <p className="text-[15px] leading-relaxed text-slate-text">
                      {f.a}
                    </p>
                  </AccordionDetails>
                </Accordion>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
