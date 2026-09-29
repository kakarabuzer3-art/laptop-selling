"use client";

import { useEffect } from "react";

/**
 * Toggles html[data-scrolled] once the top sentinel leaves the viewport.
 * No scroll listener, no rAF loop — a single IntersectionObserver and a
 * dataset write. The visual morph itself lives in CSS (globals.css).
 */
export function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        root.dataset.scrolled = entry?.isIntersecting ? "false" : "true";
      },
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return null;
}
