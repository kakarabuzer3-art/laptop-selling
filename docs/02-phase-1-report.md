# PHASE 6 — Report: homepage hero (Phases 1–5 complete)

Date: 2026-09-28 · Stack: Next.js 16.3.6 · React 19.3 · TypeScript 5.9 (strict) · Tailwind CSS 4.3.3
Run it: `npm install` → `npm run images:optimize` → `npm run dev` (or `npm run build && npm start`)

---

## 1. What changed

Phase 1 found an empty repo (only the architecture blueprint), so this delivery is a
from-zero scaffold plus the hero, built to the blueprint with four documented
deviations (ADR 0001).

- **Design system**: Tailwind v4 CSS-first tokens (colour, fluid type scale, easings,
  breakpoints), chamfer/clip-path shape language, film-grain + 12-col grid ambience.
- **Hero**: server-rendered; line-mask headline reveal + staggered fade-ups (pure CSS);
  scroll-out parallax via CSS scroll-driven animations behind `@supports`
  (zero-JS progressive enhancement); single LCP image with preload + `fetchpriority=high`
  + blur placeholder; spec chips; variant-ladder CTAs with price specificity; trust row;
  scroll cue.
- **Shell**: fixed header with IO-driven morph (no scroll listener), skip link, footer,
  styled 404, sitemap/robots, Product JSON-LD, ~40-byte boot script for no-JS safety.
- **Islands**: exactly two, both tiny and state-free: `Reveal` (IO, ~0.6 KB) and
  `ScrollState` (IO + dataset write). Everything else is RSC.
- **Media pipeline**: sharp script emits WebP masters + a typed manifest; `next/image`
  serves AVIF/WebP variants at runtime (measured: 25.7 KB AVIF @1920w).
- **SEO strategy delivered**: `docs/seo/90-day-seo-strategy.md` (13-week, prioritized).

## 2. Files changed (created)

```
package.json · tsconfig.json · next.config.ts · postcss.config.mjs · eslint.config.mjs
vitest.config.ts · next-env.d.ts · .gitignore
scripts/optimize-images.mjs
src/app/{layout.tsx,page.tsx,globals.css,not-found.tsx,sitemap.ts,robots.ts}
src/lib/{fonts.ts,utils/cn.ts,content/product.ts,content/media.generated.ts}
src/components/ui/Button.tsx
src/components/motion/{Reveal.tsx,ScrollState.tsx}
src/components/hero/{Hero.tsx,HeroMedia.tsx,ScrollCue.tsx}
src/components/layout/{SiteHeader.tsx,SiteFooter.tsx}
src/test/{next-image-stub.tsx,next-link-stub.tsx,media-stub.ts}
src/components/hero/hero.ssr.test.tsx · src/components/ui/button.test.tsx
src/fonts/*.woff2 (3) · public/media/n1-hero.webp · src/media/source/n1-hero.png
docs/01-hero-implementation-plan.md · docs/adr/0001-….md · docs/seo/90-day-seo-strategy.md
```

## 3. Tests & checks performed

| Check | Result |
|---|---|
| `npm run lint` (ESLint 9 flat + eslint-config-next) | ✅ 0 errors, 0 warnings |
| `npm run typecheck` (`tsc --noEmit`, strict + noUncheckedIndexedAccess) | ✅ clean |
| `npm run test` (Vitest, SSR-contract tests) | ✅ 12/12 pass (7 hero SSR, 5 button) |
| `npm run build` (webpack pipeline — see ADR D3) | ✅ 4 static routes: `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml` |
| Runtime smoke (`next start`): `/`, sitemap, robots, styled 404, AVIF + WebP negotiation | ✅ 7/7 PASS |
| SSR contract: single `h1`, all copy in HTML, `data-shown` absent without JS, preload link emitted, `lang="en"`, JSON-LD present | ✅ verified in `.next/server/app/index.html` |
| WCAG contrast audit (computed) | ✅ after fix: caption 6.2:1, body 12.6:1, CTA ink-on-signal 6.0:1 |

## 4. Measured performance (this sandbox: 2 cores / 1 GB RAM)

| Metric | Value | Budget | |
|---|---|---|---|
| HTML document | 35.0 KB | — | ✅ |
| First-load JS, modern browsers (gzip) | **137.6 KB** (176.3 KB incl. `noModule` polyfills legacy browsers skip) | ≤150 KB | ✅ |
| — of which app-specific islands | ~6.5 KB | — | ✅ |
| CSS (gzip) | 6.3 KB | — | ✅ |
| Preloaded fonts (raw) | 59.8 KB / 3 files | ≤180 KB | ✅ |
| LCP image, 1920w AVIF | 25.7 KB (WebP fallback 20.2 KB @1080w) | — | ✅ |
| CLS risk | 0 (intrinsic dims + blur placeholder + font metrics) | ≤0.01 | ✅ by construction |

## 5. Remaining issues & next steps (honest list)

1. **Routes in nav/footer 404** until Phases 2–4 ship them (styled 404 handles it).
2. **Mobile nav drawer** deferred (blueprint Phase 2) — mobile currently has wordmark + CTA only; fully operable, but the IA is not reachable on small screens yet.
3. **Lighthouse/Playwright not run here** — no browser in this sandbox. Wire Lighthouse CI + axe in CI (thresholds already defined in blueprint §7).
4. **Cold image-encode latency** ~1.5 s on first request per variant (ADR D2); add a warm-up script or pre-generate key widths before launch if needed.
5. **GDPR consent banner** not yet built — P0 before any EU traffic (also an SEO-strategy week-9 item).
6. **OG image** (`opengraph-image.tsx`) not generated yet.
7. **Firefox without scroll-driven animations**: hero parallax absent by design (content unaffected). GSAP decision point arrives with `ExplodedView` (ADR D1).
8. Turbopack build OOMs **only in this 1 GB sandbox**; CI/Vercel should use `npm run build:turbo`.
