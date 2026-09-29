# ADR 0002 — Phase 2 interaction patterns: zero-JS interactivity first

Status: **Accepted** · Date: 2026-09-28
Companion to ADR 0001. Rule honoured: document every architecture change.

## D7 — Native HTML for interactive patterns wherever the platform suffices

**Context.** Phase 2 adds five interactive patterns: finish selection, spec
annotations, FAQ, reviews browsing, counters. The project rule is *avoid
unnecessary dependencies*; the blueprint's motion budget forbids animation JS
on the critical path.

**Decision.**

| Pattern | Mechanism | JS cost |
|---|---|---|
| Finish selector (§10) | native radio inputs + sibling-selector crossfade/focus rings | 0 B |
| Spec annotations (§06) | anchor markers + `:target` card highlight | 0 B |
| FAQ (§15) | `<details>/<summary>` with `name` for exclusivity | 0 B |
| Reviews (§13) | native scroll-snap scroller, focusable region | 0 B |
| Counters (§07) | `Counter` island (IO + rAF, SSR renders final value) | ~0.7 KB |
| Marquee (§03) | CSS keyframes, pause on hover/focus | 0 B |
| Sticky column (§05) | `position: sticky` | 0 B |

**Why.** Works without JS, without hydration, in every browser, for every

## D8 — Consent state via `useSyncExternalStore`, not effect-driven setState

**Context.** `react-hooks/set-state-in-effect` (React 19 lint) correctly flags
"read localStorage in effect → setState" as a cascading-render anti-pattern,
and naive SSR of a banner causes hydration mismatch + CLS.

**Decision.** `localStorage` is modelled as an external store:
`getServerSnapshot = decided(true)` (never render pre-hydration),
`getSnapshot = readDecided()`, subscribe to a local `nv:consent-changed` event.
Decisions dispatch both that event and a public `nv:consent` event carrying the
payload for future analytics loaders.

**Why.** Hydration-safe by construction, zero effects, lint-clean, and the
analytics integration point is an event contract rather than a bundled script.

## D9 — Detail macro derived from the hero source (sharp crop) instead of a new render

**Context.** The image-generation API returned HTTP 429 (rate limit) on three
consecutive attempts for the chassis macro while the rest of Phase 2 was ready.

**Decision.** `n1-detail` is derived deterministically: crop the machined
front-edge/port region of `n1-hero.png`, lanczos-upscale ×1.55, sharpen,
slight brightness lift — emitted through the same `images:optimize` pipeline.
Alt text and caption describe what the image actually shows (close view, not
"extreme macro").

**Why.** Keeps the pipeline reproducible and unblocks Phase 2 without fake
promises; 45 KB WebP master, 14.7 KB AVIF @1080w.

**Revisit trigger.** When the generation quota resets, a true macro render may
replace it — swap the source file and re-run `npm run images:optimize`; no
component changes (manifest-driven).

---

# ADR 0003 — Thermal hover surface on the button primitive

Status: **Accepted** · Date: 2026-09-28
Companion to ADR 0001/0002. Rule honoured: document every architecture change.

> **Supersedes part of D7.** D7 established "zero-JS interactivity first" for
> *content* patterns. This ADR records the one deliberate exception — a purely
> decorative hover affordance — and the constraints that keep it cheap and safe.
> All seven D7 patterns remain native HTML and untouched.

## D10 — One canvas heat-field island on `Button`, not per-call-site effects

**Context.** A hover-button reference set ("Hover Buttons — Part 5") supplied a
Thermal effect: a half-resolution heat field injected under the cursor,
diffused each frame, and mapped through an infrared palette. It is canvas + JS
by nature, which collides with D7 above and with the motion budget that forbids
animation JS on the critical path.

**Decision.** Port the Thermal effect into the `Button` primitive itself
(`src/components/ui/ThermalSurface.tsx`), applied to every control.

| Concern | Resolution |
|---|---|
| Where it lives | The primitive, so all call sites get it; no per-component wiring |
| Without JS | The control is still a real `<a>`/`<button>` with its label in the server HTML. The canvas is `aria-hidden` and `pointer-events: none`, so it cannot swallow a click. Purely additive. |
| Critical-path cost | The island is inert until hover/focus. No rAF, no canvas allocation, no `getContext` work happens on load. |
| Idle CPU | The reference ran an unconditional rAF loop per button, forever. With ~30 buttons that is significant. Here the loop is **gated**: it starts on `pointerenter`/`focus` and stops once total field energy falls below `IDLE_GATE`. Idle buttons cost zero. |
| Touch | No hover exists, so `pointerdown` blooms the field and retires it on a 1.4 s timer. Keyboard users get the same via `focus`/`blur`. |
| Reduced motion | `prefers-reduced-motion: reduce` skips the field entirely; the CSS hides the canvas and the scale. The control degrades to a plain button. |
| Memory | `ResizeObserver` is disconnected and listeners removed on unmount; the reference leaked the observer. |
| Label contrast | The reference put `mix-blend-mode: screen` on the *text*, which destroys contrast for a dark label on the orange CTA. Here the canvas composites behind the label, which keeps its own colour, with only a warm `text-shadow` when active. |

**Compositing.** `data-variant` on the control selects the blend mode: the
signal CTA uses `screen` so hot areas bloom toward yellow/white while the orange
identity survives; dark and transparent variants composite normally.

**Focus visibility.** The chamfer `clip-path` would clip an outline drawn on the
control, so the focus ring is painted on the control's unclipped wrapper via
`focus-within:outline-*`. This is a latent a11y issue the effect surfaced.

**Cost / consequence.** One client island (~4 KB gz) loads wherever a `Button`
renders, and buttons gain a canvas child — roughly 30 extra elements per page.
Accepted deliberately: the effect is the brand's primary interaction affordance
and the cost is bounded and idle-silent.

**Revisit trigger.** If Core Web Vitals regress (INP on mid-range mobile, or LCP
from the extra island), gate the surface behind an IntersectionObserver so
off-screen buttons never allocate a canvas.

## Scope note — which controls get it

Everything routed through `Button` (all CTAs, header, hero, compare matrix,
variant cards, product pages, final CTA, configurator reserve). Deliberately
**excluded**: the consent banner's Accept/Reject/Preferences buttons and the
mobile nav toggles. Those are small, legally-weighted, frequently repeated
controls where a decorative bloom would compete with the label and add nothing.
They keep plain native styling.

assistive technology; nothing to bundle, patch or polyfill; degrades to plain
HTML rather than to a broken widget.

**Cost / consequence.** `:target` moves the URL hash and scrolls to the card
(acceptable, arguably good); exclusive `<details name>` is ignored by older
browsers (multiple open panels — harmless); scroll-snap needs no polyfill on
supported targets (Safari 16.4+ per Tailwind v4 baseline).

**Revisit trigger.** If the configurator needs cross-section state (§Phase 4),
introduce URL-state then — not before.
