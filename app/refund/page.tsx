import SimplePage from "@/components/SimplePage";

export const metadata = { title: "Refund Policy | ReclaimRefinance" };

export default function RefundPage() {
  return (
    <SimplePage
      eyebrow="Legal"
      title="Refund Policy"
      description="Our refund policy is transparent and fair, in line with the nature of our assessment-based services."
    >
      <p>
        Fees are communicated clearly before any paid work begins. Where a fee
        has been paid for a defined service that is not delivered, refunds are
        assessed on a case-by-case basis.
      </p>
      <p>
        Because recovery outcomes cannot be guaranteed, the absence of a
        recovery result does not by itself entitle you to a refund for work
        performed. Please contact us with any billing questions.
      </p>
    </SimplePage>
  );
}
