import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";
import { detailImage } from "@/lib/content/media.generated";
import { chassisPanels } from "@/lib/content/landing";

/**
 * §05 — sticky two-column: pinned material macro left, scrolling copy panels
 * right. Sticky is pure CSS (`position: sticky`), so there is no pin/scrub JS
 * and mobile simply stacks (blueprint §8 transformation table).
 */
export function ChassisSticky() {
  return (
    <section aria-labelledby="chassis-title" className="border-y border-line bg-ink-900">
      <div className="container-x grid gap-12 py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal className="relative">
            <Image
              src={detailImage.src}
              width={detailImage.width}
              height={detailImage.height}
              blurDataURL={detailImage.blurDataURL}
              placeholder="blur"
              alt="Close view of the N1 machined aluminium front edge, hinge and port array under a single rim light"
              loading="lazy"
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="chamfer h-auto w-full"
            />
            <p className="caption mt-4">6000-series billet · 41-minute mill · 0 adhesive</p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-16 lg:gap-20 lg:py-10">
          <div id="chassis-title">
            <SectionHead
              index="02"
              kicker="Chassis"
              title="Machined, not assembled."
              lead="Most laptops are stacks of compromises held together with glue. The N1 is one piece of metal that happens to contain a computer."
            />
          </div>
          {chassisPanels.map((panel) => (
            <Reveal key={panel.index} className="border-t border-line pt-8">
              <p className="caption text-signal">{panel.index}</p>
              <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-fog-50">
                {panel.title}
              </h3>
              <p className="mt-4 text-fog-300">{panel.body}</p>
              <p className="caption mt-5">{panel.spec}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
