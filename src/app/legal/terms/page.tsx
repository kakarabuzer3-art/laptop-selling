import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { terms } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Terms of sale",
  description:
    "Plain-language consumer terms: VAT-inclusive prices, the 14-day right of withdrawal, the 2-year EU legal guarantee, 3-year warranty and 10-year parts availability.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalLayout doc={terms} crumb="Terms" />;
}
