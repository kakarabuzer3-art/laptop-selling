import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { imprint } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Trader identity, registration and contact details for NORDVÄRK Technology Limited, as required by Irish company law and the EU E-Commerce Directive.",
  alternates: { canonical: "/legal/imprint" },
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return <LegalLayout doc={imprint} crumb="Imprint" />;
}
