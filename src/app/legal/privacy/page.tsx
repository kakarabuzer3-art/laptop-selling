import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { privacy } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What NORDVÄRK processes, why, for how long, and how to withdraw consent or exercise your GDPR rights. No partner lists, because there are no partners.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalLayout doc={privacy} crumb="Privacy" />;
}
