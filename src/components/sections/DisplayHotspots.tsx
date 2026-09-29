import type { CSSProperties } from "react";
import Image from "next/image";
import { SectionHead } from "./SectionHead";
import { heroImage } from "@/lib/content/media.generated";
import { hotspots } from "@/lib/content/landing";

/**
 * §06 — annotated product view with zero JavaScript:
 * numbered markers are anchors to their spec card; `:target` highlights the
 * card. Keyboard/AT users get the same information as a plain list.
 */
export function DisplayHotspots() {
  return (
    <section aria-labelledby="hotspots-title" className="container-x py-24 md:py-32">
      <div id="hotspots-title">
        <SectionHead
          index="03"
          kicker="Display & input"
          title="Every surface, specified."
          lead="Select a numbered marker to read exactly what it is and why it is there."
        />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative lg:col-span-7">
          <Image
            src={heroImage.src}
            width={heroImage.width}
            height={heroImage.height}
            blurDataURL={heroImage.blurDataURL}
            placeholder="blur"
            alt="The N1 open on a dark studio background with four numbered specification markers on display, keyboard, trackpad and ports"
            loading="lazy"
            sizes="(min-width: 1024px) 54vw, 92vw"
            className="h-auto w-full"
          />
          {hotspots.map((spot, i) => (
            <a
              key={spot.id}
              href={`#${spot.id}`}
              className="hotspot"
              style={{ "--x": spot.x, "--y": spot.y } as CSSProperties}
            >
              <span className="sr-only">{`Specification ${i + 1}: ${spot.label}`}</span>
              <span aria-hidden="true">{i + 1}</span>
            </a>
          ))}
        </div>

        <ul className="space-y-4 lg:col-span-5">
          {hotspots.map((spot, i) => (
            <li
              key={spot.id}
              id={spot.id}
              className="hotspot-card scroll-mt-28 border border-line bg-ink-900 p-5 transition-colors"
            >
              <p className="caption">
                <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                {" — "}
                {spot.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fog-300">{spot.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
