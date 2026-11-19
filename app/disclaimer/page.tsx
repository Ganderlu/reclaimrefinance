import SimplePage from "@/components/SimplePage";

export const metadata = { title: "Disclaimer | ReclaimRefinance" };

export default function DisclaimerPage() {
  return (
    <SimplePage
      eyebrow="Legal"
      title="Disclaimer"
      description="Important information about the scope and limitations of ReclaimRefinance services."
    >
      <p>
        The information provided on this website is for general informational
        purposes only and does not constitute legal, financial or professional
        advice. Recovery of lost funds is never guaranteed.
      </p>
      <p>
        Every case is assessed individually, and outcomes depend on numerous
        factors including the type of fraud, elapsed time, available evidence
        and the cooperation of third parties. ReclaimRefinance does not guarantee
        any specific result.
      </p>
    </SimplePage>
  );
}
