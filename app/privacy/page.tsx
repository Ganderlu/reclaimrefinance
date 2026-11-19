import SimplePage from "@/components/SimplePage";

export const metadata = { title: "Privacy Policy | ReclaimRefinance" };

export default function PrivacyPage() {
  return (
    <SimplePage
      eyebrow="Legal"
      title="Privacy Policy"
      description="This Privacy Policy describes how ReclaimRefinance collects, uses and protects your personal information."
    >
      <p>
        We collect information you provide when submitting a claim, contacting
        us or creating an account, including your name, contact details and
        case-related information. We use this information solely to assess and
        pursue your recovery options.
      </p>
      <p>
        We do not sell your personal data. We implement appropriate technical
        and organisational measures to protect your information. For any
        requests regarding your data, please contact us.
      </p>
    </SimplePage>
  );
}
