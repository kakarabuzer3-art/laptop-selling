# ADR 0001 — Hero motion engine, media pipeline, build pipeline

Status: **Accepted** · Date: 2026-09-28
Rule honoured: *"Never change architecture without documenting why."*
Every deviation from `docs/00-architecture-blueprint.md` is recorded here with evidence.

---

## D1 — Zero animation dependencies for the hero (blueprint said GSAP + Lenis)

**Context.** Project rule: *avoid unnecessary dependencies*. The hero's motion needs are
(a) load-in choreography and (b) scroll-out parallax. Neither requires pinning or
scrubbed multi-layer timelines — those arrive with `ExplodedView` (§08) in Phase 3.

**Decision.** Load-in = pure CSS keyframes (line-mask rise, staggered fade-ups).
Scroll-out = CSS scroll-driven animations (`animation-timeline: view()`), wrapped in
`@supports (animation-timeline: view())`. The only JS motion code is two islands:
`Reveal` (IntersectionObserver, ~0.6 KB, zero React state) and `ScrollState`
(one IO + a dataset write).

**Why.** 0 KB of animation library on the critical path; LCP never waits on JS;
reduced-motion parity is a single media query; nothing to licence, patch or tree-shake.

**Cost / consequence.** Firefox versions without scroll-driven animations get the
static composition (graceful, content complete). No pinned/scrubbed set pieces yet.

**Revisit trigger.** When implementing `ExplodedView`/`BatteryTimeline` (§08/§09):
evaluate GSAP ScrollTrigger then; if adopted, keep it behind `next/dynamic` so the
hero critical path stays dependency-free.

## D2 — Generated media manifest instead of static binary imports

**Context.** `import img from "./x.webp"` broke unit-test module resolution and forced
build-time AVIF re-encoding of a 2048 px source, which OOM-killed the build on this
1 GB machine (evidence: build process killed at ~110 s; memory trace in §D3).

**Decision.** `scripts/optimize-images.mjs` (sharp) emits `public/media/*.webp` masters
plus `src/lib/content/media.generated.ts` (src, width, height, 8 px blurDataURL).
`next/image` still derives AVIF/WebP variants + srcset at runtime with 30-day caching.

**Why.** Tests stay hermetic; build memory drops sharply; dimensions/placeholders are
explicit and typed (zero CLS); the pipeline is reproducible via `npm run images:optimize`.

**Cost / consequence.** First request for a given image variant pays a one-off sharp
encode (measured 1.5 s cold for 1920 w AVIF, then cached). Mitigation: long cache TTL;
optional warm-up script can be added before launch if cold latency matters.

## D3 — webpack as the workspace default build; Turbopack kept as `build:turbo`

**Context.** This sandbox has **1 083 460 kB total RAM** (`/proc/meminfo`). Turbopack's
Rust worker exceeded it repeatedly and the kernel killed the build (three separate
runs, including with `--max-old-space-size=640`). Sampled trace during the webpack run:
peak process RSS ≈ 290 MB, MemAvailable never below ≈ 550 MB, `BUILD_EXIT=0`.

**Decision.** `"build": "next build --webpack"`, `"build:turbo": "next build"`.

**Why.** Reproducible verification in this environment is a project rule (PHASE 4).

**Cost / consequence.** webpack builds are slower than Turbopack on big apps; irrelevant
at this size. **CI/Vercel (≥4 GB) should run `build:turbo`.** Documented in README/report.

## D4 — Font payload trims (blueprint said Martian Mono + Clash 600/700)

**Decision.** Mono = system mono stack (captions/specs only, zero payload).
Clash Display ships weight 600 only (700 was never used → one fewer preload).
**Why.** Preload budget: 3 woff2 / 59.8 KB raw instead of 5 / ~90 KB.

## D5 — Caption colour `fog-500` → new token `fog-400` (#8b9299)

**Why.** Measured contrast on `ink-950`: fog-500 = **4.32:1** (fails WCAG AA for small
text); fog-400 = **6.2:1** (passes). Muted hierarchy preserved (fog-400 vs fog-50 17.4:1).

## D6 — Zod deferred (blueprint had build-time Zod parsing)

**Why.** With a single typed TS content module and unit tests asserting invariants,
Zod adds a dependency with no current consumer. **Revisit trigger:** the moment a CMS
or external content adapter appears — then the schema becomes the boundary contract.
