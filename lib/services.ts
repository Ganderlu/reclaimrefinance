import type { ComponentType } from "react";
import {
  Bitcoin,
  Landmark,
  ShoppingBag,
  Heart,
  UserCog,
  Globe,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

export type ServiceCategory = {
  slug: string;
  title: string;
  short: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  image: string;
  topics: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "crypto",
    title: "Cryptocurrency Scam Assistance",
    short:
      "Assistance for individuals affected by cryptocurrency investment fraud, fraudulent exchanges, fake trading platforms and digital asset scams.",
    icon: Bitcoin,
    image: "/images/how-it-works/cta-globe.jpg",
    topics: [
      "Cryptocurrency investment fraud",
      "Fake crypto exchanges",
      "Wallet-related scams",
      "Fraudulent token projects",
      "Crypto transaction documentation",
    ],
  },
  {
    slug: "investment",
    title: "Investment Fraud Assistance",
    short:
      "Support for individuals affected by misleading investment opportunities and fraudulent trading operations.",
    icon: TrendingUp,
    image: "/images/how-it-works/why.jpg",
    topics: [
      "Fake investment platforms",
      "Ponzi and pyramid schemes",
      "Fake brokers",
      "Fraudulent trading services",
      "Investment-related financial deception",
    ],
  },
  {
    slug: "bank-transfer",
    title: "Bank Transfer Fraud",
    short:
      "Assistance documenting unauthorized bank transfers, impersonation fraud and suspicious payment instructions.",
    icon: Landmark,
    image: "/images/about/mission-building.jpg",
    topics: [
      "Unauthorized transfers",
      "Bank impersonation scams",
      "Fraudulent payment instructions",
      "Account-related payment fraud",
      "Transaction documentation",
    ],
  },
  {
    slug: "purchase",
    title: "Purchase and Invoice Fraud",
    short:
      "Assistance for individuals and businesses affected by fraudulent purchases, fake suppliers and undelivered products.",
    icon: ShoppingBag,
    image: "/images/how-it-works/hero.jpg",
    topics: [
      "Fake online stores",
      "Undelivered products",
      "Supplier impersonation",
      "Invoice manipulation",
      "Online purchase scams",
    ],
  },
  {
    slug: "romance",
    title: "Romance and Social Engineering Scams",
    short:
      "Assistance for individuals financially affected by deceptive online relationships, impersonation and manipulation.",
    icon: Heart,
    image: "/images/about/hero.jpg",
    topics: [
      "Romance-related financial fraud",
      "Fake online identities",
      "Social engineering",
      "Impersonation scams",
      "Deceptive financial requests",
    ],
  },
  {
    slug: "account-takeover",
    title: "Account Takeover Fraud",
    short:
      "Assistance documenting compromised accounts, unauthorized transactions and identity-related financial fraud.",
    icon: UserCog,
    image: "/images/how-it-works/cta-globe.jpg",
    topics: [
      "Compromised financial accounts",
      "Unauthorized account access",
      "Identity impersonation",
      "Suspicious account transactions",
      "Digital account fraud",
    ],
  },
  {
    slug: "wire",
    title: "Wire and International Payment Fraud",
    short:
      "Support for individuals and businesses affected by fraudulent international payments and cross-border transfer scams.",
    icon: Globe,
    image: "/images/about/journey.jpg",
    topics: [
      "International wire transfer fraud",
      "Remittance scams",
      "Cross-border payment fraud",
      "Business email compromise",
      "Fraudulent international transactions",
    ],
  },
  {
    slug: "other",
    title: "Other Financial Scams",
    short:
      "Not every scam fits into one category. We assess other documented forms of financial deception individually.",
    icon: ShieldAlert,
    image: "/images/how-it-works/why.jpg",
    topics: [
      "Online financial fraud",
      "Business-related scams",
      "Impersonation fraud",
      "Digital payment deception",
      "Other documented financial scams",
    ],
  },
];

export const serviceOptions = serviceCategories.map((s) => ({
  slug: s.slug,
  label: s.title,
}));
