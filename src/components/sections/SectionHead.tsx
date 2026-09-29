import { Reveal } from "@/components/motion/Reveal";

type SectionHeadProps = {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
};

/** Reusable editorial section header — one h2 per section, caption above. */
export function SectionHead({ index, kicker, title, lead, align = "left" }: SectionHeadProps) {
  return (
    <Reveal className={align === "center" ? "text-center" : undefined}>
      <p className="caption">
        <span className="text-signal">{index}</span> — {kicker}
      </p>
      <h2 className="font-display mt-4 text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-fog-50">
        {title}
      </h2>
      {lead ? (
        <p className={`lead mt-5 ${align === "center" ? "mx-auto" : ""}`}>{lead}</p>
      ) : null}
    </Reveal>
  );
}
