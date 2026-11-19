"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Plus } from "lucide-react";
import Reveal from "../Reveal";

const faqs = [
  {
    q: "What types of financial scams do you assist with?",
    a: "We assist with a wide range of documented financial fraud, including cryptocurrency scams, investment fraud, bank transfer fraud, purchase and invoice fraud, romance and social engineering scams, account takeover fraud, wire and international payment fraud, and other forms of financial deception.",
  },
  {
    q: "Can you help with cryptocurrency fraud?",
    a: "Yes. We review cases involving cryptocurrency investment fraud, fraudulent exchanges, wallet-related scams and other digital asset deception. Because blockchain transactions are complex, we focus on organising the available transaction information and explaining realistic options.",
  },
  {
    q: "Is successful recovery guaranteed?",
    a: "No. We never guarantee recovery. Outcomes depend on many factors, including the type of fraud, the passage of time, the available evidence and the responsiveness of banks, exchanges or platforms. We are always honest about what may realistically be possible.",
  },
  {
    q: "How do I submit a recovery claim?",
    a: "Use the Start a Claim button on this site to complete our secure application. Share as much detail as you can about what happened. Once submitted, our team reviews the information and contacts you about the next steps.",
  },
  {
    q: "What documents will I need?",
    a: "Helpful documents include transaction receipts, bank or exchange statements, screenshots of communications, invoices and any correspondence with the suspected fraudster. You do not need everything at once — we can advise on what is most useful for your case.",
  },
  {
    q: "How long does a case assessment take?",
    a: "Initial assessments begin once your submission has been reviewed. Timelines vary depending on the complexity of the case and the amount of information provided. We will tell you how long each stage is expected to take.",
  },
  {
    q: "Do you assist international customers?",
    a: "Yes. We support individuals and businesses in supported countries worldwide. Financial fraud frequently crosses borders, and we are experienced with cases involving multiple jurisdictions and payment systems.",
  },
  {
    q: "How are service fees calculated?",
    a: "Fees depend on the nature and complexity of your case. They are explained transparently before any work begins, and you will always know what to expect. There are no hidden charges.",
  },
  {
    q: "Can I monitor my case progress?",
    a: "Yes. We provide clear, regular updates about your case so you always understand where things stand and what happens next.",
  },
  {
    q: "How do you protect customer information?",
    a: "We treat your information and submitted documents as confidential and use appropriate security measures to protect them. Information is only shared where necessary to progress your case.",
  },
];

export default function ServicesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            Frequently Asked Questions
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            Answers to Common Questions
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-text">
            Clear, honest information about our services, process and what to
            expect.
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.03, 0.3)}>
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
                      "& .MuiAccordionSummary-content": { margin: "14px 0" },
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

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="rounded-2xl border border-slate-100 bg-sky-soft px-5 py-4 text-xs leading-relaxed text-slate-text">
            <strong className="text-navy">Important:</strong> ReclaimRefinance does
            not guarantee any recovery outcome. Every case is assessed
            individually and results depend on multiple factors.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
