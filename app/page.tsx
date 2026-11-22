import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RecoveryServices from "@/components/RecoveryServices";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar darkHero showTopBar />
      <main>
        <HeroSection />
        <RecoveryServices />
        <HowItWorks />
        <WhyChooseUs />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
