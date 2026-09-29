import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NavDrawer } from "@/components/layout/NavDrawer";
import { ScrollState } from "@/components/motion/ScrollState";

// Every entry must resolve to a real route or in-page anchor — the site is a
// static export, so a dead href is a 404 with no server to catch it.
const NAV = [
  { label: "N1", href: "/product/n1/" },
  { label: "Engineering", href: "/#chassis-title" },
  { label: "Compare", href: "/compare/" },
  { label: "Support", href: "/support/" },
];

/**
 * Fixed header, server-rendered. The only client code is <ScrollState />
 * (one IntersectionObserver) which flips html[data-scrolled]; the morph
 * itself is CSS. Mobile drawer is intentionally deferred to Phase 2
 * (blueprint §2) — mobile currently keeps wordmark + primary CTA only,
 * which is fully operable, rather than shipping a dead hamburger.
 */
export function SiteHeader() {
  return (
    <>
      <div id="scroll-sentinel" aria-hidden="true" className="h-px w-full" />
      <ScrollState />
      <header className="site-header">
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-fog-50"
            aria-label="NORDVÄRK — home"
          >
            NORDVÄRK<span className="text-signal">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fog-300 transition-colors hover:text-fog-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden sm:block">
            <Button href="/configure/" variant="signal" size="md">
              Configure yours
            </Button>
          </div>
          <NavDrawer links={NAV} />
        </div>
      </header>
    </>
  );
}
