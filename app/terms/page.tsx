import SimplePage from "@/components/SimplePage";

export const metadata = { title: "Terms of Service | ReclaimRefinance" };

export default function TermsPage() {
  return (
    <SimplePage
      eyebrow="Legal"
      title="Terms of Service"
      description="These terms govern your use of the ReclaimRefinance website and services."
    >
      <p>
        By using our services, you agree to provide accurate and truthful
        information. ReclaimRefinance provides assistance in exploring recovery
        options and does not guarantee any specific outcome or recovery amount.
      </p>
      <p>
        Our services are provided on an &ldquo;as is&rdquo; basis. You
        acknowledge that recovery is not guaranteed and that results depend on
        many factors outside our control.
      </p>
    </SimplePage>
  );
}
