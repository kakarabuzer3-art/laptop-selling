"use client";

import { useLayoutEffect, useRef } from "react";

type CounterProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** ms */
  duration?: number;
  className?: string;
};

/**
 * Count-up numeral island (~0.7 KB).
 * SSR renders the FINAL value (no-JS clients and crawlers get the truth);
 * the client resets to zero pre-paint and counts on first intersection.
 * Reduced motion / no IO: final value, immediately, forever.
 */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1100,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (v: number) =>
      `${prefix}${v.toFixed(decimals)}${suffix}`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      el.textContent = format(to);
      return;
    }

    el.textContent = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(to * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, decimals, prefix, suffix, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {prefix}
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}
