import { Reveal } from "@/components/motion/Reveal";

// Static export: no server to resolve a missing route, so every href below
// points at a page that is actually built or an in-page anchor that exists.
const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Product",
    links: [
      { label: "N1", href: "/product/n1/" },
      { label: "N1 Pro", href: "/product/n1-pro/" },
      { label: "N1 Studio", href: "/product/n1-studio/" },
      { label: "Compare", href: "/compare/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Engineering", href: "/#chassis-title" },
      { label: "Sustainability", href: "/#manifesto-title" },
      { label: "Configure", href: "/configure/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Warranty & repairs", href: "/support/" },
      { label: "Returns", href: "/legal/terms/" },
      { label: "Contact", href: "/support/#contact-title" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Imprint", href: "/legal/imprint/" },
      { label: "Privacy", href: "/legal/privacy/" },
      { label: "Terms", href: "/legal/terms/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-900">
      <div className="container-x grid grid-cols-2 gap-10 py-16 md:grid-cols-6 md:py-20">
        <Reveal className="col-span-2">
          <p className="font-display text-2xl font-semibold text-fog-50">
            NORDVÄRK<span className="text-signal">.</span>
          </p>
          <p className="lead mt-4 max-w-[30ch] text-sm">
            Precision laptops, engineered in Malmö and assembled in the EU.
            Built to be repaired, not replaced.
          </p>
        </Reveal>

        {COLUMNS.map((col, i) => (
          <Reveal key={col.title} delay={80 + i * 60}>
            <h2 className="caption">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-fog-300 transition-colors hover:text-fog-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption">
            © 2026 NORDVÄRK AB · Malmö · Prices include VAT
          </p>
          <p className="caption">Engineered for the long run</p>
        </div>
      </div>
    </footer>
  );
}
