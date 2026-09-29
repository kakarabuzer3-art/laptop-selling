import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { SpecTable } from "@/components/product/SpecTable";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { catalog } from "@/lib/content/catalog";
import { formatEUR } from "@/lib/content/product";

export function generateStaticParams() {
  return catalog.map((variant) => ({ slug: variant.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const variant = catalog.find((v) => v.slug === slug);
  if (!variant) return {};
  return {
    title: `${variant.name} — ${variant.tagline}`,
    description: `${variant.specs.silicon.split("·")[0]?.trim()}, ${variant.specs.weight}, ${variant.specs.battery.split("·")[1]?.trim() ?? ""}. Full specification, warranty and repairability for the NORDVÄRK ${variant.name}. From ${formatEUR(variant.basePrice)} incl. VAT.`,
    alternates: { canonical: `/product/${variant.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = catalog.find((v) => v.slug === slug);
  if (!variant) notFound();

  const specRows = [
    { label: "Display", value: variant.specs.display },
    { label: "Silicon", value: variant.specs.silicon },
    { label: "Memory", value: variant.specs.memory },
    { label: "Storage", value: variant.specs.storage },
    { label: "Battery & charging", value: variant.specs.battery },
    { label: "Ports", value: variant.specs.ports },
    { label: "Wireless", value: variant.specs.wireless },
    { label: "Weight", value: variant.specs.weight },
    { label: "Dimensions", value: variant.specs.dimensions },
    { label: "Certified operating systems", value: variant.specs.os },
    { label: "Warranty & guarantee", value: variant.specs.warranty },
    { label: "In the box", value: variant.specs.inBox },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `NORDVÄRK ${variant.name}`,
    description: variant.tagline,
    brand: { "@type": "Brand", name: "NORDVÄRK" },
    image: "/media/n1-hero.webp",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: String(variant.basePrice),
      availability: "https://schema.org/InStock",
      url: `/product/${variant.slug}`,
    },
    additionalProperty: specRows.slice(0, 8).map((row) => ({
      "@type": "PropertyValue",
      name: row.label,
      value: row.value,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "/compare" },
      { "@type": "ListItem", position: 3, name: variant.name, item: `/product/${variant.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Laptops", href: "/compare/" },
          { label: variant.name },
        ]}
      />
      <PageHero
        tight
        kicker={`NORDVÄRK ${variant.name}`}
        title={variant.tagline}
        lead={`${variant.specs.silicon} · ${variant.specs.weight} · ${variant.specs.battery.split("·")[1]?.trim() ?? ""}`}
      >
        <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <Button
            href={`/configure/?model=${variant.slug}`}
            size="lg"
            hint={`from ${formatEUR(variant.basePrice)}`}
          >
            {`Configure ${variant.name}`}
          </Button>
          <Button href="/compare/" variant="outline" size="lg" arrow>
            Compare all three
          </Button>
        </div>
      </PageHero>

      <section className="container-x py-16 md:py-24" aria-labelledby="spec-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" id="spec-title">
            <SectionHead
              index="S1"
              kicker="Full specification"
              title="Everything, listed."
              lead="No asterisks, no 'up to' without a method. Where a number depends on conditions, the conditions are in the row."
            />
          </div>
          <Reveal className="lg:col-span-8">
            <SpecTable rows={specRows} caption={`Full technical specification of the NORDVÄRK ${variant.name}`} />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-ink-900 py-16 md:py-24" aria-label="Sustainability figures">
        <div className="container-x grid gap-10 sm:grid-cols-3">
          <Reveal>
            <p className="font-display text-4xl font-semibold text-fog-50">
              <Counter to={variant.sustainability.repairScore} decimals={1} />
              <span className="caption ml-2">/ 10 iFixit</span>
            </p>
            <p className="caption mt-3">Repairability score</p>
          </Reveal>
          <Reveal delay={90}>
            <p className="font-display text-4xl font-semibold text-fog-50">
              <Counter to={variant.sustainability.partsYears} />
              <span className="caption ml-2">years</span>
            </p>
            <p className="caption mt-3">Parts listed, priced & stocked</p>
          </Reveal>
          <Reveal delay={180}>
            <p className="font-display text-4xl font-semibold text-fog-50">
              <Counter to={variant.sustainability.co2eKg} />
              <span className="caption ml-2">kg CO₂e</span>
            </p>
            <p className="caption mt-3">Cradle-to-gate, audited 2026</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="lead max-w-[46ch]">
            {`The ${variant.name} ships from Malmö within 3–5 working days, duty-paid, with the driver that opens it in the box.`}
          </p>
          <Button href={`/configure/?model=${variant.slug}`} size="lg" arrow>
            {`Build yours — ${formatEUR(variant.basePrice)}`}
          </Button>
        </Reveal>
      </section>
    </>
  );
}
