# PHASE 6 — Report: Phase 2 delivery (narrative sections + launch-critical items)

Date: 2026-09-28 · Preceded by `docs/02-phase-1-report.md` · Deviations: `docs/adr/0002-…md`
Run: `npm install` → `npm run images:optimize` → `npm run build && npm start`

---

## 1. What changed

**Launch-critical (was P0):**
- **Mobile nav drawer** — accessible island (~1.4 KB): focus trap, Esc, focus restore,
  body scroll lock, staggered link reveal. Mobile users can now reach the whole IA.
- **GDPR consent banner** — granular (necessary/analytics/marketing), nothing
  pre-ticked, Reject-all equal to Accept-all, localStorage + `nv:consent` event
  contract for future analytics. Hydration-safe via `useSyncExternalStore`;
  deliberately absent from SSR HTML.

**Landing sections shipped (§03–§07, §10, §11, §13, §15, §16):**
marquee · manifesto (stroked accent word) · sticky two-column chassis ·
zero-JS hotspot annotations (`:target`) · published benchmarks (counters + grow-bars) ·
zero-JS finish selector (radio-driven crossfade, 3 real finishes) · three-variant
line-up with centre-stage recommendation · scroll-snap review carousel ·
native `<details>` FAQ · inverted paper final CTA repeating the hero's exact action.

**Assets:** Frost + Abyss finishes generated against the hero reference (identical
composition); chassis detail derived via sharp crop after image-API rate limits
(ADR D9). All through the typed manifest pipeline.

## 2. Files changed

```
new  src/lib/content/landing.ts
new  src/components/motion/Counter.tsx
new  src/components/layout/NavDrawer.tsx
new  src/components/commerce/ConsentBanner.tsx
new  src/components/sections/{SectionHead,ProofMarquee,Manifesto,ChassisSticky,
     DisplayHotspots,PerformanceBench,Colorways,VariantCompare,ReviewsCarousel,
     FaqAccordion,FinalCta}.tsx
new  src/components/sections/landing.ssr.test.tsx
new  public/media/{n1-frost,n1-abyss,n1-detail}.webp · src/media/source/{n1-frost,n1-abyss,n1-detail}.png
new  src/lib/content/media.generated.ts (regenerated: 4 assets)
new  docs/adr/0002-…md · docs/03-phase-2-report.md
mod  src/app/{page.tsx,layout.tsx,globals.css} · src/components/layout/SiteHeader.tsx
mod  scripts/optimize-images.mjs (4 jobs, skip-missing) · src/test/next-image-stub.tsx
```

## 3. Tests & checks

| Check | Result |
|---|---|
| `npm run lint` | ✅ 0 errors 0 warnings |
| `npm run typecheck` (strict + noUncheckedIndexedAccess) | ✅ clean |
| `npm run test` | ✅ **22/22** (7 hero + 5 button + 10 landing-contract) |
| `npm run build` (webpack pipeline) | ✅ 4 static routes |
| Runtime smoke: `/` 200 (139.7 KB HTML), 10 section markers, 3 new images via optimizer (AVIF 26.2/26.6/14.7 KB) | ✅ (consent marker absent from SSR *by design*, unit-asserted) |
| Semantics: 1 h1, 13 h2, 5 lazy images, marquee duplicate `aria-hidden`, radios labelled, `details name="faq"` ×5 | ✅ |

## 4. Performance after Phase 2

| Metric | Value | Budget | |
|---|---|---|---|
| Effective first-load JS (gzip, modern browsers) | **140.5 KB** | ≤150 KB | ✅ (islands added ~3 KB) |
| CSS (gzip) | 8.5 KB | — | ✅ |
| HTML document | 139.7 KB raw (all narrative copy inline) | — | ✅ |
| Preloaded fonts | 3 files / 59.8 KB | ≤180 KB | ✅ |
| New imagery | 45–83 KB WebP masters → 14.7–26.6 KB AVIF @1080w, all `loading="lazy"` | — | ✅ |
| Below-fold images | 5 lazy + blur placeholders (no CLS) | — | ✅ |

## 5. Remaining (updated honest list)

1. **Routes**: `/configure`, `/compare`, `/product/*`, `/legal/*`, `/support` still 404 — Phase 4 + legal pack.
2. **Phase 3 set pieces**: ExplodedView, battery timeline, gallery scatter, sustainability diagram (GSAP decision point, ADR D1).
3. **OG image** (`opengraph-image.tsx`) still missing.
4. **CI gates**: Lighthouse CI + axe + Playwright (no browser in this sandbox).
5. **Image warm-up** for cold optimizer encodes (optional pre-launch).
6. **Light theme** tokens exist but unimplemented (not promised for launch).
7. Consent banner has no "change choices" footer control yet (event contract ready).
8. Turbopack remains CI-only (`build:turbo`) on this 1 GB sandbox (ADR D3).
