import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";
import { faqs } from "@/lib/content/landing";

/**
 * §15 — native <details> accordion: zero JS, real semantics, exclusive open
 * via the `name` attribute where supported. Progressive disclosure by HTML.
 */
export function FaqAccordion() {
  return (
    <section
      aria-labelledby="faq-title"
      className="border-y border-line bg-ink-900 py-24 md:py-32"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" id="faq-title">
          <SectionHead
            index="08"
            kicker="Questions, answered straight"
            title="Before you ask."
            lead="The five questions our inbox actually receives, answered the way we would answer a friend."
          />
        </div>

        <div className="lg:col-span-8">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60}>
              <details name="faq" className="group border-t border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-medium text-fog-50 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-signal" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-signal transition-transform duration-300 group-open:scale-y-0 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-fog-300">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
          <Reveal className="border-t border-line pt-6">
            <p className="caption">
              Something else?{" "}
              <a
                href="/support/#contact-title"
                className="text-fog-200 underline underline-offset-4 hover:text-fog-50"
              >
                Talk to an engineer
              </a>{" "}
              — a human, in Malmö, within one working day.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
