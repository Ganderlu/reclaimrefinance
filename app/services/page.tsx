import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceCards from "@/components/services/ServiceCards";
import ServiceDetailInfo from "@/components/services/ServiceDetailInfo";
import ServiceProcess from "@/components/services/ServiceProcess";
import WhyChooseServices from "@/components/services/WhyChooseServices";
import RecoveryInfo from "@/components/services/RecoveryInfo";
import ServicesFaq from "@/components/services/ServicesFaq";
import ServicesCta from "@/components/services/ServicesCta";

export const metadata: Metadata = {
  title: "Our Services | ReclaimRefinance – Financial Fraud Recovery Assistance",
  description:
    "Explore ReclaimRefinance recovery services for cryptocurrency scams, investment fraud, bank transfer fraud, purchase and invoice fraud, romance scams, account takeover, wire fraud and other financial scams.",
  keywords: [
    "financial fraud recovery services",
    "cryptocurrency scam assistance",
    "investment fraud assistance",
    "bank transfer fraud",
    "wire fraud recovery",
    "ReclaimRefinance services",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | ReclaimRefinance – Recover • Reclaim • Move Forward",
    description:
      "Structured assistance for different forms of financial fraud and online scams. Explore our recovery services and start a confidential case assessment.",
    type: "website",
    url: "/services",
    siteName: "ReclaimRefinance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | ReclaimRefinance – Recover • Reclaim • Move Forward",
    description:
      "Explore ReclaimRefinance recovery services for cryptocurrency scams, investment fraud, bank transfer fraud, purchase fraud, romance scams and more.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar darkHero />
      <main>
        <ServicesHero />
        <ServiceCards />
        <ServiceDetailInfo />
        <ServiceProcess />
        <WhyChooseServices />
        <RecoveryInfo />
        <ServicesFaq />
        <ServicesCta />
      </main>
      <Footer />
    </>
  );
}
