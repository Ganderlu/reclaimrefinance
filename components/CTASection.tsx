"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const globeImg = "/images/how-it-works/cta-globe.jpg";

export default function CTASection() {
  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy-soft to-navy-dark p-8 sm:p-12 lg:p-16">
            {/* animated gradient */}
            <div className="pointer-events-none absolute inset-0 opacity-30 animate-gradient bg-[linear-gradient(120deg,#08B99A,#0B2B50,#21D6B5,#071D3A)]" />
            {/* floating decor */}
            <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-emerald/20 blur-3xl animate-floaty" />
            <div className="pointer-events-none absolute right-20 bottom-0 h-52 w-52 rounded-full bg-emerald-light/15 blur-3xl animate-floaty-slow" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="text-white">
                <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-sm font-semibold text-emerald-light">
                  Get Started Today
                </span>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px] leading-[1.1] text-balance">
                  Ready to Take the Next Step?
                </h2>
                <p className="mt-4 max-w-lg text-lg text-white/75">
                  Start your claim today and let us explore your available
                  recovery options. Your first step could make all the
                  difference.
                </p>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8"
                >
                  <Link
                    href="/claim"
                    className="group inline-flex items-center gap-2 rounded-full bg-emerald px-8 py-4 text-base font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
                  >
                    Start a Claim
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>

                <p className="mt-5 text-sm text-white/60">
                  No obligation. Every case is assessed individually.
                </p>
              </div>

              {/* globe image */}
              <div className="relative hidden lg:block">
                <div className="absolute -inset-4 rounded-full bg-emerald/20 blur-2xl" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 shadow-[0_30px_70px_-20px_rgba(8,185,154,0.5)]"
                >
                  <Image
                    src={globeImg}
                    alt="Global view representing international financial recovery support"
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
