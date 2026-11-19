import SimplePage from "@/components/SimplePage";

export const metadata = {
  title: "Security & Privacy | ReclaimRefinance",
  description: "How ReclaimRefinance protects your personal information.",
};

export default function SecurityPage() {
  return (
    <SimplePage
      eyebrow="Your Security"
      title="How We Protect Your Information"
      description="Your privacy and the security of your submitted evidence are fundamental to how we operate."
    >
      <p>
        We take your privacy seriously and use appropriate security measures to
        protect your personal information and submitted evidence. Access to case
        information is restricted to authorised personnel on a need-to-know
        basis.
      </p>
      <p>
        We employ industry-standard practices for data handling, secure
        transmission, and confidential case review. For full details, please
        review our Privacy Policy.
      </p>
    </SimplePage>
  );
}
