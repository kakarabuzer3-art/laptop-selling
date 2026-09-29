import localFont from "next/font/local";

/**
 * Self-hosted fonts, subset per weight at source (Fontshare static instances,
 * ~15-22KB each). No CDN request, no FOUT from third parties, cacheable
 * forever via Next's hashed /_next/static URLs.
 *
 * Metrics are overridden so the fallback stack occupies near-identical space
 * and a slow font load can never shift layout (CLS budget: 0.01).
 */
export const clashDisplay = localFont({
  src: [{ path: "../fonts/clash-display-600.woff2", weight: "600", style: "normal" }],
  variable: "--font-clash",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const generalSans = localFont({
  src: [
    { path: "../fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/general-sans-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-gsans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});
