import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import HowItWorksHero from "@/components/how-it-works/HowItWorksHero";
import HowItWorksSteps from "@/components/how-it-works/HowItWorksSteps";
import HowItWorksWhy from "@/components/how-it-works/HowItWorksWhy";
import HowItWorksPrepare from "@/components/how-it-works/HowItWorksPrepare";
import HowItWorksCta from "@/components/how-it-works/HowItWorksCta";

export const metadata: Metadata = {
  title: "How It Works | ReclaimRefinance – Our 5-Step Recovery Process",
  description:
    "Learn how ReclaimRefinance helps you through a clear, secure 5-step process: submit your claim, initial assessment, investigation, recovery action and case updates.",
  keywords: [
    "how it works",
    "fraud recovery process",
    "ReclaimRefinance process",
    "5-step recovery",
    "submit a claim",
    "financial fraud investigation",
  ],
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works | ReclaimRefinance – Recover • Reclaim • Move Forward",
    description:
      "A clear, secure and client-focused 5-step process to start your recovery journey with ReclaimRefinance.",
    type: "website",
    url: "/how-it-works",
    siteName: "ReclaimRefinance",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | ReclaimRefinance – Recover • Reclaim • Move Forward",
    description:
      "A clear, secure and client-focused 5-step process to start your recovery journey with ReclaimRefinance.",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar darkHero />
      <main>
        <HowItWorksHero />
        <HowItWorksSteps />
        <HowItWorksWhy />
        <HowItWorksPrepare />
        <HowItWorksCta />
      </main>
      <Footer />
    </>
  );
}
