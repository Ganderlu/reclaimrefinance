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

const img = (prompt: string, size: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=${size}`;

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "crypto",
    title: "Cryptocurrency Scam Assistance",
    short:
      "Assistance for individuals affected by cryptocurrency investment fraud, fraudulent exchanges, fake trading platforms and digital asset scams.",
    icon: Bitcoin,
    image: img(
      "Cryptocurrency%20and%20blockchain%20financial%20technology%20concept%2C%20close-up%20of%20physical%20Bitcoin%20and%20Ethereum%20coins%20on%20a%20dark%20reflective%20surface%20with%20glowing%20digital%20network%20lines%2C%20premium%20fintech%20photography",
      "landscape_4_3",
    ),
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
    image: img(
      "Professional%20financial%20analyst%20in%20a%20suit%20reviewing%20investment%20performance%20charts%20on%20a%20large%20monitor%20in%20a%20modern%20office%2C%20realistic%20corporate%20photography",
      "landscape_4_3",
    ),
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
    image: img(
      "Modern%20banking%20environment%2C%20hands%20using%20a%20bank%20card%20at%20a%20payment%20terminal%20in%20a%20bright%20financial%20branch%2C%20realistic%20professional%20photography",
      "landscape_4_3",
    ),
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
    image: img(
      "E-commerce%20purchase%20concept%2C%20cardboard%20parcel%20boxes%20with%20an%20invoice%20document%20and%20a%20laptop%20showing%20an%20online%20store%20checkout%2C%20modern%20office%20desk%2C%20realistic%20photography",
      "landscape_4_3",
    ),
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
    image: img(
      "Adult%20professional%20using%20a%20smartphone%20while%20reviewing%20suspicious%20online%20chat%20messages%20on%20a%20laptop%20in%20a%20modern%20office%2C%20over-the-shoulder%20realistic%20photography",
      "landscape_4_3",
    ),
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
    image: img(
      "Cybersecurity%20analyst%20in%20a%20modern%20security%20operations%20centre%20monitoring%20screens%20with%20digital%20locks%20and%20network%20security%20dashboards%2C%20dark%20blue%20lighting%2C%20realistic%20corporate%20photography",
      "landscape_4_3",
    ),
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
    image: img(
      "International%20banking%20concept%2C%20global%20money%20transfer%2C%20world%20map%20with%20glowing%20financial%20connection%20lines%20over%20a%20modern%20bank%20interior%2C%20premium%20corporate%20photography",
      "landscape_4_3",
    ),
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
    image: img(
      "Financial%20forensic%20investigator%20examining%20printed%20documents%20and%20digital%20forensic%20data%20on%20a%20laptop%20in%20a%20modern%20office%2C%20realistic%20corporate%20photography",
      "landscape_4_3",
    ),
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
