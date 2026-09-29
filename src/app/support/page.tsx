import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/lib/content/landing";

export const metadata: Metadata = {
  title: "Support, warranty & repairs",
  description:
    "3-year warranty plus the 2-year EU legal guarantee, 10-year parts availability, guided repairs with one screwdriver, and a human in Malmö within one working day.",
  alternates: { canonical: "/support" },
};

const REPAIR_STEPS = [
  "Power down and flip the machine onto the fibre sleeve.",
  "Remove eight Torx T5 screws with the driver in the box.",
  "The deck lifts free — no adhesive, no cables under tension.",
  "Battery, board, ports and display unplug by hand, each keyed differently.",
  "Refit in reverse. Warranty intact: opening the machine never voids it.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@type": "ContactPage",
      name: "NORDVÄRK Support",
      email: "support@nordvark.example",
      telephone: "+353-1-912-0042",
      areaServed: ["IE", "EU", "EEA"],
    },
  ],
};

export default function SupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Support" }]} />
      <PageHero
        tight
        kicker="Support"
        title="A human, within one working day."
        lead="No ticket labyrinth, no chatbot wearing a human's name. Engineers answer support mail in Malmö and Dublin, Monday to Friday."
      />

      <section className="container-x grid gap-10 py-16 md:grid-cols-3 md:py-24" aria-label="Warranty summary">
        {[
          { big: "3 yr", small: "NORDVÄRK warranty, battery included at ≥80% capacity" },
          { big: "+2 yr", small: "EU legal guarantee under Directive (EU) 2019/771" },
          { big: "10 yr", small: "parts listed, priced and stocked from last sale" },
        ].map((card, i) => (
          <Reveal key={card.big} delay={i * 80} className="border border-line bg-ink-900 p-7">
            <p className="font-display text-4xl font-semibold text-fog-50">{card.big}</p>
            <p className="caption mt-3">{card.small}</p>
          </Reveal>
        ))}
      </section>

      <section className="border-y border-line bg-ink-900 py-16 md:py-24" aria-labelledby="repair-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" id="repair-title">
            <SectionHead
              index="R1"
              kicker="Guided repairs"
              title="Ninety seconds to open. Ninety minutes to fix."
              lead="Every module has a printed part number and a public price. Guides ship as step-by-step pages and PDFs — no login, no gate."
            />
          </div>
          <Reveal className="lg:col-span-7">
            <ol className="space-y-4">
              {REPAIR_STEPS.map((step, i) => (
                <li key={step} className="flex gap-4 border-t border-line pt-4">
                  <span className="caption text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-fog-200 sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 md:grid-cols-2 md:py-24" aria-labelledby="contact-title">
        <div id="contact-title">
          <SectionHead
            index="R2"
            kicker="Contact"
            title="Talk to an engineer."
            lead="Include your serial (under the hinge, laser-etched) and we can see the build sheet before we answer."
          />
          <Reveal delay={100} className="mt-8 space-y-3">
            <p className="text-sm text-fog-200">
              <a href="mailto:support@nordvark.example" className="underline underline-offset-4 hover:text-fog-50">
                support@nordvark.example
              </a>
              {" · "}
              <a href="tel:+35319120042" className="underline underline-offset-4 hover:text-fog-50">
                +353 1 912 0042
              </a>
            </p>
            <p className="caption">Mon–Fri 09:00–17:00 IST/CET · 12 Granby Row, Dublin 1 · Registrgatan 4, Malmö</p>
          </Reveal>
        </div>
        <Reveal delay={160} className="border border-line bg-ink-900 p-7">
          <p className="caption">Documents & firmware</p>
          <ul className="mt-4 space-y-2.5">
            {[
              "Spec sheets & safety booklet (PDF, emailed on request)",
              "Firmware updates via LVFS / fwupd on Linux, NORDVÄRK Update elsewhere",
              "Service manuals for every module, no login",
              "Battery & cycle-health report per serial",
            ].map((doc) => (
              <li key={doc} className="flex gap-3 text-sm text-fog-200">
                <span className="text-signal" aria-hidden="true">
                  —
                </span>
                {doc}
              </li>
            ))}
          </ul>
          <p className="caption mt-5">
            Request any document by email — delivered within one working day, no form.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line bg-ink-900 py-16 md:py-24" aria-labelledby="support-faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" id="support-faq-title">
            <SectionHead index="R3" kicker="FAQ" title="The usual five." />
          </div>
          <div className="lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.q} name="support-faq" className="group border-t border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-medium text-fog-50 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-signal" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-signal transition-transform duration-300 group-open:scale-y-0 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-fog-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
