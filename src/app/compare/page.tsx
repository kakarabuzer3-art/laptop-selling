import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CompareMatrixClient } from "./compare-matrix-client";
import { catalog } from "@/lib/content/catalog";

export const metadata: Metadata = {
  title: "Compare N1, N1 Pro and N1 Studio",
  description:
    "Side-by-side specification matrix for the NORDVÄRK line: displays, silicon, memory, battery, weight, warranty, repairability and cradle-to-gate CO₂e — measured, not marketed.",
  alternates: { canonical: "/compare" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "NORDVÄRK laptop line-up",
  itemListElement: catalog.map((variant, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: `NORDVÄRK ${variant.name}`,
      url: `/product/${variant.slug}`,
      offers: {
        "@type": "Offer",
        price: String(variant.basePrice),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

/**
 * Stays a server component so metadata and the static shell are prerendered;
 * the `?model=` highlight is resolved in the client island below, which is what
 * allows this route to be statically exported.
 */
export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <PageHero
        tight
        kicker="The line-up, measured"
        title="Compare on what matters."
        lead="Fifteen rows that decide a decade of ownership. Everything here is measured in our Malmö lab; methodology and raw data are published in the journal."
      />
      <section className="container-x py-16 md:py-24">
        <CompareMatrixClient />
        <p className="caption mt-10">
          Tip: add <span className="text-fog-200">?model=n1-pro</span> to the URL to
          highlight a column — useful when sharing with a colleague who asks
          {" “"}what is the difference, really?{"”"}
        </p>
      </section>
    </>
  );
}
