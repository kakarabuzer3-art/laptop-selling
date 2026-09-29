import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { ProofMarquee } from "@/components/sections/ProofMarquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { ChassisSticky } from "@/components/sections/ChassisSticky";
import { DisplayHotspots } from "@/components/sections/DisplayHotspots";
import { PerformanceBench } from "@/components/sections/PerformanceBench";
import { Colorways } from "@/components/sections/Colorways";
import { VariantCompare } from "@/components/sections/VariantCompare";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { product, formatEUR } from "@/lib/content/product";

export const metadata: Metadata = {
  title: "NORDVÄRK N1 — Machined for focus",
  description:
    "A 14-inch 3K OLED laptop milled from a single aluminium billet. 1.09 kg, 22-hour battery, fanless silence, repairable for 10 years. From €1,499 incl. VAT.",
  alternates: { canonical: "/" },
  openGraph: { title: "NORDVÄRK N1 — Machined for focus", url: "/" },
};

/** Product rich result — price, availability and rating for SERP features. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.tagline,
  brand: { "@type": "Brand", name: "NORDVÄRK" },
  image: "/media/n1-hero.webp",
  offers: {
    "@type": "Offer",
    priceCurrency: product.currency,
    price: String(product.priceFromEUR),
    availability: "https://schema.org/InStock",
    url: "/product/n1",
    priceValidUntil: "2026-12-31",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: product.rating.value,
    reviewCount: product.rating.count,
  },
};

/**
 * Landing composition — blueprint §3 rhythm rule:
 * dense/dark and airy sections alternate, and no two consecutive sections
 * share a motion mechanic (marquee → line reveal → sticky → :target →
 * counters → radio crossfade → static cards → snap scroll → details → invert).
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ProofMarquee />
      <Manifesto />
      <ChassisSticky />
      <DisplayHotspots />
      <PerformanceBench />
      <Colorways />
      <VariantCompare />
      <ReviewsCarousel />
      <FaqAccordion />
      <FinalCta />
      <p className="sr-only">
        {`${product.name} from ${formatEUR(product.priceFromEUR)} including VAT. ${product.hero.lead}`}
      </p>
    </>
  );
}
