import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";
import { variants } from "@/lib/content/landing";
import { formatEUR } from "@/lib/content/product";
import { cn } from "@/lib/utils/cn";

/**
 * §11 — the line-up. Exactly three options (Hick's law), centre stage on the
 * middle tier (decoy/centre-stage), price anchoring Studio → N1 elsewhere.
 */
export function VariantCompare() {
  return (
    <section
      aria-labelledby="variants-title"
      className="border-y border-line bg-ink-900 py-24 md:py-32"
    >
      <div className="container-x">
        <div id="variants-title">
          <SectionHead
            index="06"
            kicker="The line-up"
            title="Three machines. One chassis philosophy."
            lead="There is no bad option here — pick your load profile, not a marketing tier."
            align="center"
          />
        </div>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {variants.map((variant) => (
            <Reveal
              as="li"
              key={variant.slug}
              className={cn(
                "relative flex flex-col border border-line bg-ink-950 p-8",
                variant.highlighted && "border-signal lg:-my-5 lg:py-13",
              )}
            >
              {variant.highlighted ? (
                <p className="caption absolute -top-3 left-8 bg-signal px-2.5 py-1 text-signal-ink">
                  Most chosen
                </p>
              ) : null}
              <h3 className="font-display text-2xl font-semibold tracking-tight text-fog-50">
                {variant.name}
              </h3>
              <p className="mt-2 text-sm text-fog-300">{variant.tagline}</p>
              <p className="font-display mt-7 text-3xl font-semibold tracking-tight text-fog-50">
                {formatEUR(variant.price)}
                <span className="caption ml-2 font-normal">incl. VAT</span>
              </p>
              <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                {variant.specs.map((spec) => (
                  <li key={spec} className="flex gap-3 text-sm text-fog-200">
                    <span className="text-signal" aria-hidden="true">
                      —
                    </span>
                    {spec}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col items-stretch gap-3 pt-2">
                <Button
                  href={`/configure/?model=${variant.slug}`}
                  variant={variant.highlighted ? "signal" : "outline"}
                >
                  {`Configure ${variant.name}`}
                </Button>
                <Button href={`/product/${variant.slug}/`} variant="ghost" arrow>
                  Full specification
                </Button>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
