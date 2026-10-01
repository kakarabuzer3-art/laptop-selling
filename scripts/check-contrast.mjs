/**
 * WCAG contrast validator for the NORDVARK palette.
 *
 * The lime accent (#C6EF34) has a very high relative luminance, so any pairing
 * has to be measured rather than eyeballed — lime text on a light surface, for
 * example, fails AA badly. This script asserts every foreground/background pair
 * the design tokens actually use and fails if one drops below its target.
 *
 * Run after changing any token:  node scripts/check-contrast.mjs
 */

/** @param {string} hex "#rrggbb" */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

/** WCAG 2.1 relative luminance. */
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio, 1..21. */
function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Mirrors the tokens in src/app/globals.css @theme. */
const T = {
  "ink-950": "#06090a",
  "ink-900": "#0b0f10",
  "ink-800": "#121718",
  "ink-700": "#1b2122",
  line: "#262e30",
  "fog-500": "#5f6b60",
  "fog-400": "#7d8a7e",
  "fog-300": "#9aa89c",
  "fog-200": "#c2cec4",
  "fog-50": "#eef3ec",
  paper: "#f2f6f0",
  signal: "#c6ef34",
  "signal-strong": "#d7fb55",
  "signal-ink": "#0d1405",
};

/**
 * Each pair is [foreground, background, minimum ratio, what it is used for].
 * Large text is >= 24px (or >= 18.66px bold) and only needs 3:1 under WCAG.
 */
const PAIRS = [
  ["fog-200", "ink-950", 4.5, "body copy on the page background"],
  ["fog-300", "ink-950", 4.5, "secondary copy on the page background"],
  ["fog-400", "ink-950", 4.5, "captions / small labels (AA small text)"],
  ["fog-500", "ink-950", 3.0, "decorative dividers and inactive icons"],
  ["fog-50", "ink-950", 4.5, "headings on the page background"],
  ["fog-50", "ink-900", 4.5, "headings on raised panels"],
  ["fog-200", "ink-900", 4.5, "body copy on raised panels"],
  ["fog-200", "ink-800", 4.5, "body copy on hover states"],
  ["signal", "ink-950", 3.0, "signal text / large accent type"],
  ["signal", "ink-900", 3.0, "accent on raised panels"],
  ["signal-ink", "signal", 4.5, "label on the primary CTA"],
  ["ink-950", "paper", 4.5, "headings on the inverted paper panel"],
  ["ink-700", "paper", 4.5, "body copy on the inverted paper panel"],
  // NOTE: light-on-lime is intentionally NOT a target. #EEF3EC on #C6EF34 is
  // 1.18:1 and fails AA at any size. Lime is a high-luminance colour, so it
  // only ever carries dark ink (signal-ink, 14.11:1). This is why the whole
  // palette is shifted to a green-tinted neutral instead of grey: it keeps the
  // lime reading as one coherent family rather than a neon bolt on grey.
  ["signal-ink", "signal-strong", 4.5, "label on the CTA hover fill"],
  ["line", "ink-950", 1.2, "hairline borders (non-text, presence only)"],
];

let failed = 0;
const rows = PAIRS.map(([fg, bg, min, use]) => {
  const ratio = contrast(T[fg], T[bg]);
  const pass = ratio >= min;
  if (!pass) failed++;
  return { pair: `${fg} on ${bg}`, ratio: ratio.toFixed(2), min: min.toFixed(1), pass, use };
});

console.log("WCAG contrast — NORDVARK palette\n");
for (const r of rows) {
  const mark = r.pass ? "PASS" : "FAIL";
  console.log(
    `  [${mark}] ${r.ratio.padStart(5)}:1  (min ${r.min})  ${r.pair.padEnd(26)} ${r.use}`,
  );
}

if (failed > 0) {
  console.error(`\n✗ ${failed} pair(s) below target.`);
  process.exit(1);
}
console.log(`\n✓ all ${rows.length} pairs meet their WCAG target.`);
