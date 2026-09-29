import type { CSSProperties } from "react";

export function ScrollCue({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="fade-up pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      style={{ "--d": "950ms" } as CSSProperties}
    >
      <span className="caption">{label}</span>
      <span className="scroll-cue__line" />
    </div>
  );
}
