# PHASE 2 — Hero Implementation Plan (record)

Scope: homepage hero per `docs/00-architecture-blueprint.md` §3.1 + minimum viable shell.
Rules honoured: mobile-first · reusable components · no unnecessary deps · SSR pages · optimised images · a11y · document every architecture change (see `docs/adr/0001-…md`).

## Tasks & acceptance criteria

| # | Task | Acceptance criteria | Status |
|---|---|---|---|
| T1 | Scaffold Next 16 + TS strict + Tailwind v4, tokens in `globals.css` | `npm run build` green; tokens single-source | ✅ |
| T2 | Self-host display/body fonts (Clash Display 600, General Sans 400/500), system mono | ≤3 preloaded woff2, no CDN requests | ✅ |
| T3 | Content model `lib/content/product.ts` (typed, no fetch) | Hero renders from one typed source | ✅ |
| T4 | `Button` primitive (4 variants, disabled-with-reason, Link for internal) | Unit tests pass; signal colour isolated | ✅ |
| T5 | `Reveal` + `ScrollState` islands (<1 KB, IO-based, no React state) | No-JS renders visible; lint-clean | ✅ |
| T6 | Hero: line-mask type reveal, staggered fade-ups, CSS scroll-driven parallax (`@supports` guarded), single priority image | 1 h1; LCP image preloaded + fetchpriority=high; reduced-motion parity | ✅ |
| T7 | Header morph + footer + 404 + sitemap/robots + JSON-LD | Static prerender; smoke tests 200/404 correct | ✅ |
| T8 | Image pipeline: PNG → WebP master + generated typed manifest | 53 KB master; AVIF 25.7 KB @1920w at runtime | ✅ |
| T9 | Verification: lint, tsc, 12 unit tests, build, runtime smoke, contrast audit | All green (see `docs/02-phase-1-report.md`) | ✅ |

## Deferred on purpose (not forgotten)

Mobile nav drawer · sections §03–§16 · `/configure`, `/compare`, product pages · OG image generation · consent banner (P0 before EU launch) · light theme · Playwright e2e · Lighthouse CI (needs a browser; run in CI).
