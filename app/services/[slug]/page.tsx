import SimplePage from "@/components/SimplePage";

type PageProps = { params: Promise<{ slug: string }> };

const map: Record<string, { title: string; desc: string }> = {
  crypto: {
    title: "Cryptocurrency Scam Assistance",
    desc: "We review cases involving Bitcoin, Ethereum, USDT, fraudulent exchanges and crypto investment scams to explore available recovery options.",
  },
  investment: {
    title: "Investment Fraud",
    desc: "Assistance for victims of fake brokers, Ponzi schemes and fraudulent trading platforms.",
  },
  "bank-transfer": {
    title: "Bank Transfer Fraud",
    desc: "Support for unauthorised transfers, impersonation and fraudulent payment instructions.",
  },
  purchase: {
    title: "Purchase and Invoice Fraud",
    desc: "Help for fake online stores, undelivered goods and supplier scams.",
  },
  romance: {
    title: "Romance and Social Engineering Scams",
    desc: "Support for financial deception through fake relationships and impersonation.",
  },
  "account-takeover": {
    title: "Account Takeover Fraud",
    desc: "Assistance for compromised accounts, identity impersonation and unauthorised transactions.",
  },
  wire: {
    title: "Wire and International Payment Fraud",
    desc: "Help with cross-border payment and remittance scams.",
  },
  other: {
    title: "Other Financial Scams",
    desc: "Review of other documented financial fraud cases by our team.",
  },
};

export async function generateStaticParams() {
  return Object.keys(map).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const data = map[slug] ?? {
    title: "Recovery Service",
    desc: "We assess a wide range of financial fraud cases to explore your available recovery options.",
  };

  return (
    <SimplePage
      eyebrow="Recovery Service"
      title={data.title}
      description={data.desc}
    >
      <p>
        If you have been affected by this type of fraud, the first step is to
        submit your claim so our team can review the details of your case. Every
        case is assessed individually, and we will communicate clearly about the
        options available to you.
      </p>
    </SimplePage>
  );
}
