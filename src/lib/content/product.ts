/**
 * Single typed source of truth for hero/marketing copy.
 * Kept as a typed TS module (no runtime fetch, no CMS dependency) so the
 * server can inline everything into the HTML. When a CMS arrives, this file
 * becomes the adapter's output contract — components never change.
 */

export type HeroCta = {
  label: string;
  href: string;
  variant: "signal" | "outline";
  hint?: string;
};

export type HeroContent = {
  eyebrow: string;
  headlineLines: string[];
  accentLineIndex: number;
  lead: string;
  chips: string[];
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  trustItems: string[];
  scrollCueLabel: string;
  media: {
    alt: string;
    caption: string;
  };
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  priceFromEUR: number;
  currency: string;
  vatIncluded: boolean;
  availability: { status: "in-stock" | "lead-time"; leadTimeDays: [number, number] };
  rating: { value: number; count: number };
  hero: HeroContent;
};

export const product: Product = {
  slug: "n1",
  name: "NORDVÄRK N1",
  tagline: "The laptop that gets out of the way.",
  priceFromEUR: 1499,
  currency: "EUR",
  vatIncluded: true,
  availability: { status: "in-stock", leadTimeDays: [3, 5] },
  rating: { value: 4.8, count: 1284 },
  hero: {
    eyebrow: "Engineered in Malmö · Assembled in the EU · 1.09 kg",
    headlineLines: ["Machined", "for", "focus."],
    accentLineIndex: 2,
    lead:
      "A 14-inch OLED machine milled from a single billet of aluminium. No fan noise. No flex. No logos shouting at you — just 22 hours of battery and a keyboard worth writing on.",
    chips: ["14″ 3K OLED · 120 Hz", "22 h battery", "1.09 kg", "Repairable · 10-yr parts"],
    primaryCta: {
      label: "Configure your N1",
      href: "/configure/",
      variant: "signal",
      hint: "from €1,499 incl. VAT",
    },
    secondaryCta: { label: "Compare all three", href: "/compare/", variant: "outline" },
    trustItems: [
      "Free EU delivery",
      "14-day returns",
      "2-year legal guarantee",
      "Ships in 3–5 days",
    ],
    scrollCueLabel: "Scroll",
    media: {
      alt: "NORDVÄRK N1 laptop in graphite aluminium, open at a three-quarter angle on a dark studio background, screen showing a single thin lime line",
      caption: "N1 · Graphite · Anodised 6000-series aluminium",
    },
  },
};

/** Formats EUR the EU way: €1.499,00 style grouping with a narrow space. */
export function formatEUR(amount: number, locale = "en-IE"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
