import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { HeroMedia } from "./HeroMedia";
import { ScrollCue } from "./ScrollCue";
import { product } from "@/lib/content/product";

/**
 * Landing hero — blueprint §3.1.
 * Server component: every word ships in the HTML. The load-in choreography is
 * pure CSS (line-mask rise + staggered fade-ups) and the scroll-out parallax
 * is a progressive-enhancement CSS scroll-driven animation (globals.css), so
 * there is zero animation JavaScript on the critical path.
 */
export function Hero() {
  const h = product.hero;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate min-h-svh overflow-hidden pt-28 lg:pt-24"
    >
      {/* ambient background layer — decorative only */}
      <div className="hero__bg absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-lines absolute inset-0" />
        {/* Accent bloom tinted to the lime signal. Kept low-alpha: at full
            strength a lime radial behind near-white type raises the local
            luminance and erodes the heading's contrast. */}
        <div className="absolute top-[16%] left-1/2 h-[55vh] w-[90vw] max-w-[70rem] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(198,239,52,0.09),transparent_70%)]" />
      </div>

      <div className="container-x relative grid min-h-[calc(100svh-7rem)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-10">
        <div className="hero__copy lg:col-span-6 xl:col-span-5">
          <p
            className="caption fade-up"
            style={{ "--d": "80ms" } as CSSProperties}
          >
            {h.eyebrow}
          </p>

          <h1 id="hero-title" className="display-hero mt-6">
            {h.headlineLines.map((line, i) => (
              <span className="line" key={line}>
                <span
                  style={{ "--i": i } as CSSProperties}
                  className={i === h.accentLineIndex ? "text-signal" : undefined}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="lead fade-up mt-7"
            style={{ "--d": "430ms" } as CSSProperties}
          >
            {h.lead}
          </p>

          <ul
            className="fade-up mt-8 flex flex-wrap gap-2"
            style={{ "--d": "540ms" } as CSSProperties}
            aria-label="Key specifications"
          >
            {h.chips.map((chip) => (
              <li
                key={chip}
                className="chamfer border border-line bg-ink-900/70 px-3.5 py-2 font-mono text-[0.7rem] tracking-[0.1em] text-fog-300 uppercase"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div
            className="fade-up mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            style={{ "--d": "650ms" } as CSSProperties}
          >
            <Button
              href={h.primaryCta.href}
              variant={h.primaryCta.variant}
              size="lg"
              hint={h.primaryCta.hint}
            >
              {h.primaryCta.label}
            </Button>
            <Button
              href={h.secondaryCta.href}
              variant={h.secondaryCta.variant}
              size="lg"
              arrow
            >
              {h.secondaryCta.label}
            </Button>
          </div>

          <ul
            className="fade-up mt-6 flex flex-wrap gap-x-5 gap-y-1.5"
            style={{ "--d": "760ms" } as CSSProperties}
            aria-label="Purchase assurances"
          >
            {h.trustItems.map((item) => (
              <li key={item} className="caption">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <HeroMedia />
        </div>
      </div>

      <ScrollCue label={h.scrollCueLabel} />
    </section>
  );
}
