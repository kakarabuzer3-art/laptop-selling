import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

type PageHeroProps = {
  kicker: string;
  title: string;
  lead?: string;
  /** use after a Breadcrumbs block (which owns the top spacing) */
  tight?: boolean;
  children?: ReactNode;
};

/** Reusable subpage header: caption kicker, one h1, optional lead + slot. */
export function PageHero({ kicker, title, lead, tight = false, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-ink-900">
      <div
        className={cn(
          "container-x",
          tight ? "pt-10 pb-16 md:pt-14 md:pb-20" : "pt-36 pb-16 md:pt-44 md:pb-20",
        )}
      >
        <Reveal>
          <p className="caption">
            <span className="text-signal">◆</span> {kicker}
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-fog-50">
            {title}
          </h1>
          {lead ? <p className="lead mt-6">{lead}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
