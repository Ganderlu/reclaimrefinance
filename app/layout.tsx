import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReclaimRefinance | Financial Fraud Assistance & Recovery",
  description:
    "ReclaimRefinance helps individuals and businesses explore recovery options for cryptocurrency fraud, investment scams, payment fraud and other financial deception.",
  keywords: [
    "financial fraud recovery",
    "scam recovery",
    "cryptocurrency fraud",
    "investment scam",
    "fraud assistance",
    "ReclaimRefinance",
  ],
  openGraph: {
    title: "ReclaimRefinance | Recover • Reclaim • Move Forward",
    description:
      "Professional assistance for individuals and businesses affected by cryptocurrency fraud, investment scams, payment fraud and other financial deception.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-heading">
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
