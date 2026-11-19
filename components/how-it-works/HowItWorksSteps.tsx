"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowDown, CheckCircle2 } from "lucide-react";
import Reveal from "../Reveal";

const img = (prompt: string, size = "landscape_4_3") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=${size}`;

type Step = {
  num: number;
  title: string;
  desc: string;
  image?: string;
  icon?: typeof CheckCircle2;
  button: string;
  href: string;
};

const steps: Step[] = [
  {
    num: 1,
    title: "Submit Your Claim",
    desc: "Complete our secure online application with details about your financial loss and the incident.",
    image: img(
      "Close-up%20of%20a%20laptop%20screen%20displaying%20a%20secure%20online%20application%20form%20with%20form%20fields%2C%20clean%20modern%20UI%2C%20soft%20blue%20lighting%2C%20premium%20fintech%20photography",
    ),
    button: "Get Started",
    href: "/claim",
  },
  {
    num: 2,
    title: "Initial Assessment",
    desc: "We review your submitted information and supporting evidence to understand your situation.",
    image: img(
      "Financial%20documents%20and%20paperwork%20being%20reviewed%20with%20a%20magnifying%20glass%20on%20a%20wooden%20desk%2C%20professional%20office%20setting%2C%20soft%20natural%20light%2C%20premium%20corporate%20photography",
    ),
    button: "Learn More",
    href: "#process",
  },
  {
    num: 3,
    title: "Investigation",
    desc: "Our team reviews available evidence and examines the circumstances of your case.",
    image: img(
      "Professional%20investigation%20documents%2C%20digital%20records%20and%20a%20security%20shield%20icon%20on%20a%20desk%2C%20financial%20fraud%20investigation%20concept%2C%20premium%20corporate%20photography%2C%20blue%20tones",
    ),
    button: "Track Progress",
    href: "/login",
  },
  {
    num: 4,
    title: "Recovery Action",
    desc: "We explain available recovery options and pursue agreed next steps where appropriate.",
    image: img(
      "Professional%20business%20handshake%20between%20two%20people%20in%20business%20suits%2C%20representing%20cooperation%20and%20agreement%2C%20modern%20office%20background%2C%20premium%20corporate%20photography",
    ),
    button: "Stay Informed",
    href: "/login",
  },
  {
    num: 5,
    title: "Receive Updates",
    desc: "Receive clear updates about your case progress and any important developments.",
    icon: CheckCircle2,
    button: "View Your Case",
    href: "/login",
  },
];

export default function HowItWorksSteps() {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

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
    <section
      id="process"
      className="relative overflow-hidden bg-gradient-to-b from-sky-soft via-white to-white py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-emerald/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald/20 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            Our Process
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[44px] text-balance">
            Follow These 5 Simple Steps
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.num}
                variants={item}
                className="group relative"
              >
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]">
                  {/* numbered badge */}
                  <span className="absolute -top-4 left-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-emerald-light text-sm font-extrabold text-white shadow-emerald ring-4 ring-white">
                    {step.num}
                  </span>

                  {/* image / icon */}
                  <div className="mt-3 overflow-hidden rounded-xl bg-sky-soft">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={`${step.title} illustration`}
                        width={400}
                        height={260}
                        sizes="(max-width: 1024px) 50vw, 18vw"
                        className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-36 w-full items-center justify-center bg-gradient-to-br from-emerald/10 to-sky-soft">
                        {step.icon && (
                          <step.icon
                            size={72}
                            className="text-emerald drop-shadow-sm"
                            strokeWidth={1.6}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-text">
                    {step.desc}
                  </p>

                  <Link
                    href={step.href}
                    className="group/btn mt-5 inline-flex items-center gap-1.5 self-start rounded-full bg-sky-soft px-4 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
                  >
                    {step.button}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </Link>
                </div>

                {/* connecting arrow - desktop horizontal */}
                {i < steps.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    animate={
                      reduce
                        ? undefined
                        : { x: [0, 6, 0], opacity: [0.5, 1, 0.5] }
                    }
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 text-emerald lg:block"
                  >
                    <ArrowRight size={22} strokeWidth={2.5} />
                  </motion.span>
                )}

                {/* connecting arrow - mobile vertical */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-emerald/10 text-emerald lg:hidden"
                  >
                    <ArrowDown size={16} />
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-slate-text">
          Investigation and recovery assistance do not guarantee that funds will
          be recovered. Every case is assessed individually based on the
          available evidence and circumstances.
        </p>
      </div>
    </section>
  );
}
