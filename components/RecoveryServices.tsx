"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Bitcoin,
  TrendingUp,
  Landmark,
  ShoppingBag,
  Heart,
  UserCog,
  Globe,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";

type Service = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  href: string;
};

const services: Service[] = [
  {
    icon: Bitcoin,
    title: "Cryptocurrency Scam Assistance",
    desc: "Bitcoin, Ethereum, USDT, fraudulent exchanges and crypto investment scams.",
    href: "/services/crypto",
  },
  {
    icon: TrendingUp,
    title: "Investment Fraud",
    desc: "Fake brokers, Ponzi schemes and fraudulent trading platforms.",
    href: "/services/investment",
  },
  {
    icon: Landmark,
    title: "Bank Transfer Fraud",
    desc: "Unauthorized transfers, impersonation and fraudulent payment instructions.",
    href: "/services/bank-transfer",
  },
  {
    icon: ShoppingBag,
    title: "Purchase and Invoice Fraud",
    desc: "Fake online stores, undelivered goods and supplier scams.",
    href: "/services/purchase",
  },
  {
    icon: Heart,
    title: "Romance and Social Engineering Scams",
    desc: "Financial deception through fake relationships and impersonation.",
    href: "/services/romance",
  },
  {
    icon: UserCog,
    title: "Account Takeover Fraud",
    desc: "Compromised accounts, identity impersonation and unauthorized transactions.",
    href: "/services/account-takeover",
  },
  {
    icon: Globe,
    title: "Wire and International Payment Fraud",
    desc: "Cross-border payment and remittance scams.",
    href: "/services/wire",
  },
  {
    icon: ShieldAlert,
    title: "Other Financial Scams",
    desc: "Other documented financial fraud cases reviewed by our team.",
    href: "/services/other",
  },
];

export default function RecoveryServices() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      };

  const item: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section id="services" className="relative bg-sky-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            Our Recovery Services
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            We Help Recover Funds from All Types of Financial Scams
          </h2>
          <p className="mt-4 text-lg text-slate-text">
            From cryptocurrency fraud to investment and payment scams, our team
            reviews each case individually to explore available recovery
            options.
          </p>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={item}>
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 hover:border-emerald/30 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald transition-all duration-300 group-hover:bg-emerald group-hover:text-white group-hover:scale-110">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-text">
                    {s.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald">
                    Learn More
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <span className="absolute inset-x-6 bottom-0 h-[3px] scale-x-0 rounded-full bg-gradient-to-r from-emerald to-emerald-light transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
