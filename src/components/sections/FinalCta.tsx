import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { finalCta } from "@/lib/content/landing";

/**
 * §16 — the peak-end close: inverted paper panel, one action, identical
 * wording to the hero CTA (serial-position effect), trust row repeated.
 */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-paper">
      <div className="container-x py-28 md:py-36">
        <Reveal className="text-center">
          <p className="caption text-ink-700/70">{finalCta.kicker}</p>
          <h2
            id="final-cta-title"
            className="font-display mt-6 text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-ink-950"
          >
            {finalCta.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-7 max-w-[52ch] text-lg leading-relaxed text-ink-700">
            {finalCta.body}
          </p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={finalCta.primary.href}
              size="lg"
              hint={finalCta.primary.hint}
            >
              {finalCta.primary.label}
            </Button>
            <Button
              href={finalCta.secondary.href}
              variant="outline"
              size="lg"
              arrow
              className="border-ink-950/25 text-ink-950 hover:border-ink-950 hover:text-ink-950"
            >
              {finalCta.secondary.label}
            </Button>
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {finalCta.trust.map((item) => (
              <li key={item} className="caption text-ink-700/70">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
