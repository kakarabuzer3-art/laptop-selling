import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import type { LegalDoc } from "@/lib/content/legal";

/** Shared shell for the legal pack: breadcrumbs, hero, prose sections. */
export function LegalLayout({ doc, crumb, children }: { doc: LegalDoc; crumb: string; children?: ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal", href: "/legal/imprint/" }, { label: crumb }]} />
      <PageHero tight kicker="Legal" title={doc.title} lead={doc.intro}>
        <p className="caption mt-6">Last updated {doc.updated} · plain-language edition</p>
      </PageHero>
      <section className="container-x py-16 md:py-24">
        <div className="prose-nv max-w-[72ch]">
          {doc.sections.map((section) => (
            <section key={section.heading} aria-label={section.heading}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fog-50">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-[0.9375rem] leading-relaxed text-fog-300">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          {children}
        </div>
      </section>
    </>
  );
}
