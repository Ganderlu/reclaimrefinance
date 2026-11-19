import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ClaimContent from "@/components/claim/ClaimContent";

export const metadata = {
  title: "Start a Claim | ReclaimRefinance",
  description:
    "Submit your financial fraud recovery claim with ReclaimRefinance. Secure, confidential, and reviewed by our specialist team.",
};

export default function ClaimPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar darkHero />
      <main className="flex-1">
        <ClaimContent />
      </main>
      <Footer />
    </>
  );
}
