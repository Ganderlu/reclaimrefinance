"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "../Reveal";
import Logo from "../Logo";

const globeImg =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Glowing%20digital%20globe%20with%20emerald%20and%20blue%20network%20connection%20lines%20representing%20global%20financial%20network%2C%20dark%20navy%20background%2C%20premium%20fintech%203D%20render%2C%20high%20detail&image_size=landscape_4_3";

export default function HowItWorksCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-soft py-20 sm:py-24"
    >
      {/* animated gradient wash */}
      <div className="pointer-events-none absolute inset-0 opacity-25 animate-gradient bg-[linear-gradient(120deg,#08B99A,#071D3A,#21D6B5,#051528)]" />

      {/* globe background */}
      <div className="pointer-events-none absolute inset-0 right-0 top-0 hidden h-full w-1/2 lg:block">
        <Image
          src={globeImg}
          alt=""
          aria-hidden="true"
          fill
          sizes="50vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-navy/40 to-navy" />
      </div>

      {/* glowing orbs + particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-emerald/20 blur-3xl animate-floaty" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-emerald-light/15 blur-3xl animate-floaty-slow" />
        <ShieldCheck
          size={120}
          strokeWidth={0.8}
          className="absolute right-[28%] top-10 hidden text-white/10 lg:block animate-floaty"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* LEFT */}
            <div className="text-white">
              <Logo light />
              <h2 className="mt-7 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px] text-balance">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-4 max-w-lg text-lg text-white/75">
                Start your claim today and let us help you explore your available
                recovery options.
              </p>
            </div>

            {/* RIGHT - button */}
            <div className="lg:justify-self-end">
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-block"
              >
                <Link
                  href="/claim"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald px-9 py-5 text-lg font-bold text-white shadow-emerald transition hover:bg-emerald-soft"
                >
                  Start a Claim
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
              <p className="mt-4 text-sm text-white/55 lg:block">
                Every case is assessed individually. Recovery is not guaranteed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
