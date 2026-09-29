import { Reveal } from "@/components/motion/Reveal";
import { manifesto } from "@/lib/content/landing";

/** §04 — big-statement manifesto; staggered line reveals, stroked accent word. */
export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="container-x py-28 md:py-40">
      <h2 id="manifesto-title" className="sr-only">
        Our philosophy: repairable by design
      </h2>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {manifesto.lines.map((line, i) => {
            const isAccent = line.endsWith(manifesto.accentWord);
            return (
              <Reveal key={line} delay={i * 90} y={26}>
                <p className="font-display text-[clamp(2rem,6.2vw,4.6rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-fog-50">
                  {isAccent ? (
                    <>
                      {line.slice(0, -manifesto.accentWord.length)}
                      <span className="stroke-word">{manifesto.accentWord}</span>
                    </>
                  ) : (
                    line
                  )}
                </p>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={260} className="lg:col-span-4 lg:pt-3">
          <p className="lead">{manifesto.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
