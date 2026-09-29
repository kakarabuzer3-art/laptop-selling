"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type RevealProps = {
  as?: "div" | "section" | "li" | "span" | "figure" | "p";
  /** ms */
  delay?: number;
  /** px translate before reveal */
  y?: number;
  once?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * IntersectionObserver-driven reveal island (~0.6KB, zero React state).
 *
 * State lives on the DOM node (data-shown), not in React, which keeps the
 * island re-render-free and satisfies react-hooks/set-state-in-effect.
 *
 * Failure modes handled deliberately:
 * - SSR / no-JS: no data-shown attribute is emitted → CSS keeps it visible.
 * - Reduced motion or no IO support: armed straight to shown.
 * - The hidden state is applied in useLayoutEffect (pre-paint), so there is
 *   never a visible→hidden flash on hydration.
 */
export function Reveal({
  as = "div",
  delay = 0,
  y = 22,
  once = true,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      el.dataset.shown = "true";
      return;
    }

    el.dataset.shown = "false";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.shown = "true";
            if (once) io.disconnect();
          } else if (!once) {
            el.dataset.shown = "false";
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
