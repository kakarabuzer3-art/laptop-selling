import { proofItems } from "@/lib/content/landing";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12"
    >
      {proofItems.map((item) => (
        <li key={item} className="caption flex items-center gap-12 whitespace-nowrap">
          {item}
          <span className="text-signal" aria-hidden="true">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );
}

/** §03 — infinite CSS marquee; pauses on hover; duplicate row hidden from AT. */
export function ProofMarquee() {
  return (
    <section
      aria-label="Awards, certifications and owner ratings"
      className="border-y border-line bg-ink-900 py-5"
    >
      <div className="marquee overflow-hidden">
        <div className="marquee__track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
