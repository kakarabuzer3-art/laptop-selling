import Image from "next/image";
import { SectionHead } from "./SectionHead";
import {
  heroImage,
  frostImage,
  abyssImage,
} from "@/lib/content/media.generated";
import { colorways } from "@/lib/content/landing";

const IMAGES = {
  "cw-graphite": heroImage,
  "cw-frost": frostImage,
  "cw-abyss": abyssImage,
} as const;

/**
 * §10 — finish selector with ZERO JavaScript: native radio inputs drive the
 * crossfade and the swatch state through sibling selectors (ADR 0002).
 * Keyboard focus rings travel from the hidden input to its visible label.
 */
export function Colorways() {
  return (
    <section aria-labelledby="colorways-title" className="container-x py-24 md:py-32">
      <div id="colorways-title">
        <SectionHead
          index="05"
          kicker="Finishes"
          title="Three anodised truths."
          lead="No surcharge on any finish. Anodising, not paint — it will not shine, peel or fingerprint its way out of looking like what it is."
        />
      </div>

      <div className="cw mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          {colorways.map((cw, i) => (
            <input
              key={cw.id}
              type="radio"
              name="colorway"
              id={cw.id}
              defaultChecked={i === 0}
              className="sr-only"
              aria-label={`${cw.name} finish`}
            />
          ))}

          <div className="cw__stage relative aspect-4/3">
            {colorways.map((cw) => {
              const img = IMAGES[cw.id];
              return (
                <Image
                  key={cw.id}
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  blurDataURL={img.blurDataURL}
                  placeholder="blur"
                  data-cw={cw.id}
                  alt={`NORDVÄRK N1 in the ${cw.name} anodised finish`}
                  loading="lazy"
                  sizes="(min-width: 1024px) 54vw, 92vw"
                  className="cw__img absolute inset-0 h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none"
                />
              );
            })}
          </div>

          <div className="cw__swatches mt-6 flex flex-wrap gap-3">
            {colorways.map((cw) => (
              <label
                key={cw.id}
                htmlFor={cw.id}
                className="cw__swatch flex cursor-pointer items-center gap-3 border border-line px-4 py-3 transition-colors hover:border-fog-500"
              >
                <span
                  aria-hidden="true"
                  className="h-5 w-5 rounded-full border border-white/25"
                  style={{ background: cw.hex }}
                />
                <span className="text-sm text-fog-200">{cw.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-2">
          <p className="lead">
            Each finish is a Type-II sulphuric anodise, 20 µm deep, sealed in
            boiling deionised water. The colour is the oxide layer itself —
            scratch through it and you still find aluminium, not primer.
          </p>
          <p className="caption mt-6">
            Photographed once per finish · no renders · no colour grading
          </p>
        </div>
      </div>
    </section>
  );
}
