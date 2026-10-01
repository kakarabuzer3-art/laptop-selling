# ADR 0004 — Accent moved from Signal Orange to Signal Lime

Status: **Accepted** · Date: 2026-09-28
Companion to ADR 0001–0003. Rule honoured: document every architecture change.

## D11 — Re-derive the neutrals around the new accent; do not swap one hex

**Context.** D5 fixed Signal Orange `#FF4D1C` as the accent. The client supplied
a replacement brand colour, **Signal Lime `#C6EF34`** (RGB 198,255,52), and asked
for the black to be removed. The naive move — swap the three signal tokens, leave
everything else — was rejected, for two measured reasons.

**Decision.** Replace the accent *and* re-derive the neutral ramp as a
green-tinted family. All 15 foreground/background pairs are asserted by
`npm run check:contrast` (WCAG 2.1 relative luminance), wired into
`npm run verify`.

### Why not a straight swap

1. **Lime cannot carry light text.** `#EEF3EC` on `#C6EF34` measures **1.18:1**.
   The old orange (luminance ≈ 0.24) comfortably took near-white ink; the lime
   takes near-black at **14.11:1**. Any component assuming "accent fill ⇒ light
   label" would have silently failed AA. The palette inverts the accent's
   polarity: **lime is a surface, `signal-ink` is the type on it.**
2. **Grey beside lime reads dead.** Simultaneous contrast means a neutral
   adjacent to a chromatic colour is judged *by* that colour — and neutral grey
   next to a saturated lime is the classic "bolt-on neon" failure. Shifting the
   neutrals to hue ≈ 120° at very low chroma (`#06090A` → `#EEF3EC`) makes the
   accent read as part of one system. The "black" the client wanted removed is
   still near-black, but it is now a *green* black, not a dead one.

### Why lime is a good fit for this brand (psychology)

- **Yellow-green sits at the top of the arousal scale** alongside red/orange, so
  it retains the urgency the orange was chosen for — it does not read passive.
- **It carries the repairability/sustainability argument.** The product's whole
  pitch is repairable, 10-year parts, low CO₂e. Lime is the colour most
  associated with renewal and eco-efficiency; the old orange read industrial.
- **Distinctive in category.** Premium laptops cluster in silver/space-grey/blue.
  A saturated lime accent is ownable at a glance, which supports the
  "one accent, one job" Von Restorff rule in §1.2.

### Measured figures (all pass AA)

| Pair | Ratio | Target |
|---|---|---|
| `signal-ink` on `signal` (CTA label) | 14.11:1 | 4.5 |
| `fog-200` on `ink-950` (body) | 12.29:1 | 4.5 |
| `fog-400` on `ink-950` (captions) | 5.53:1 | 4.5 |
| `fog-50` on `ink-950` (headings) | 17.76:1 | 4.5 |
| `signal` on `ink-950` (accent type) | 15.03:1 | 3.0 |
| `ink-950` on `paper` (inverted panel) | 18.28:1 | 4.5 |

### Ripple effects handled

- **Hardcoded oranges** outside the token system: the hero ambient radial, the
  hotspot ping ring, and the compare-matrix highlight all carried literal
  `rgb(255 77 28 / …)`. Replaced with lime values — these would otherwise have
  stayed orange and clashed with every new token.
- **Thermal button field (D10).** Its ramp was a literal infrared
  purple→red→orange→white. Those mid-tones sit opposite lime on the colour wheel
  and made the control look broken mid-hover. Re-tuned through the lime family
  (deep forest → moss → signal lime → chartreuse → white-hot), keeping the ramp
  monotonic in luminance so it still reads as rising heat. Animation untouched.
- **`mix-blend-mode: screen` on the CTA** is now *required* rather than
  stylistic: the lime fill is near the top of the luminance range, so a normally
  composited field would erase the dark label.
- **Hero ambient glow** reduced to 9% alpha. A lime radial behind near-white
  display type raises local luminance and erodes heading contrast.

**Cost / consequence.** Lime on near-black is a high-contrast, high-energy
combination. If the accent is ever used for long-form body text, or for light
text on a lime surface, it fails — hence `check:contrast` guards it in CI.

**Revisit trigger.** If a light/lime full-bleed section is introduced, the
surface must carry `signal-ink`, and the pair should be added to
`scripts/check-contrast.mjs` before shipping.
