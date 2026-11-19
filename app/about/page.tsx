import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AboutHero from "@/components/about/AboutHero";
import AboutMissionValues from "@/components/about/AboutMissionValues";
import AboutWhyChoose from "@/components/about/AboutWhyChoose";
import AboutJourney from "@/components/about/AboutJourney";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCta from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About Us | ReclaimRefinance – Trusted Financial Recovery Partner",
  description:
    "Learn about ReclaimRefinance, an international financial fraud assistance company. Our mission, vision and core values help individuals and businesses explore recovery options with integrity and transparency.",
  keywords: [
    "about ReclaimRefinance",
    "financial fraud assistance company",
    "fraud recovery specialists",
    "international recovery support",
    "ReclaimRefinance mission",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ReclaimRefinance | Recover • Reclaim • Move Forward",
    description:
      "Your trusted partner in financial recovery. Discover our mission, vision and the team committed to helping victims of financial fraud move forward.",
    type: "website",
    url: "/about",
    siteName: "ReclaimRefinance",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ReclaimRefinance | Recover • Reclaim • Move Forward",
    description:
      "Your trusted partner in financial recovery. Discover our mission, vision and the team committed to helping victims of financial fraud.",
  },
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <AboutHero />
        <AboutMissionValues />
        <AboutWhyChoose />
        <AboutJourney />
        <AboutTeam />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
