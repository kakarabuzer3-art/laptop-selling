import type { CSSProperties } from "react";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";
import { benchmarks } from "@/lib/content/landing";

/** §07 — published measurements: count-up numerals + bars that grow on reveal. */
export function PerformanceBench() {
  return (
    <section aria-labelledby="bench-title" className="border-y border-line bg-ink-900 py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" id="bench-title">
          <SectionHead
            index="04"
            kicker="Measured, not marketed"
            title="Numbers we publish."
            lead="Every figure below comes from our own lab bench in Malmö. Methodology, raw data and failure rates live in the journal — including the numbers we are not proud of."
          />
        </div>

        <ul className="space-y-9 lg:col-span-8">
          {benchmarks.map((bench, i) => (
            <Reveal as="li" key={bench.label} delay={i * 80}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-sm font-medium text-fog-200">{bench.label}</h3>
                <p className="font-display text-3xl font-semibold tracking-tight text-fog-50">
                  <Counter
                    to={bench.value}
                    decimals={bench.value % 1 !== 0 ? 1 : 0}
                    suffix={bench.suffix}
                  />
                </p>
              </div>
              <div className="bar mt-3 h-px bg-line" aria-hidden="true">
                <span
                  className="bar__fill block h-px bg-signal"
                  style={{ "--w": `${bench.bar}%`, "--bd": `${i * 90}ms` } as CSSProperties}
                />
              </div>
              <p className="caption mt-2.5">{bench.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
