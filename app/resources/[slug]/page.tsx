import SimplePage from "@/components/SimplePage";

type PageProps = { params: Promise<{ slug: string }> };

const map: Record<string, { title: string; desc: string }> = {
  prevention: {
    title: "Fraud Prevention",
    desc: "Practical guidance to help you recognise and avoid common financial scams.",
  },
  guide: {
    title: "Recovery Guide",
    desc: "A step-by-step overview of what to do after you suspect you have been scammed.",
  },
  blog: {
    title: "Blog",
    desc: "Insights and updates on financial fraud trends and consumer protection.",
  },
};

export async function generateStaticParams() {
  return Object.keys(map).map((slug) => ({ slug }));
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const data = map[slug] ?? {
    title: "Resource",
    desc: "Educational content to help you protect yourself against financial fraud.",
  };

  return (
    <SimplePage eyebrow="Resource" title={data.title} description={data.desc}>
      <p>
        This section provides educational content to help you understand common
        fraud patterns and take proactive steps to protect your finances. For
        personalised assistance with a specific case, please start a claim.
      </p>
    </SimplePage>
  );
}
