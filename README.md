# NORDVÄRK — N1 laptop storefront

Marketing site and product configurator for the NORDVÄRK N1, a fictional 14-inch
machined-aluminium laptop. Built with **Next.js 16 (App Router)**, React 19,
TypeScript and Tailwind CSS v4.

The site is a **static export** — `npm run build` writes real `.html` files to
`out/`, so it can be hosted on any static file server with no Node runtime.

## Quick start

```bash
npm install     # install dependencies
npm run dev     # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build → static HTML in `out/` |
| `npm start` | Serve the built `out/` folder locally |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest (SSR + content unit tests) |
| `npm run verify` | lint → typecheck → test → build → link check → contrast check |
| `npm run check:links` | Validates every internal link in the built HTML |
| `npm run check:contrast` | Asserts the palette meets WCAG AA (15 pairs) |
| `npm run images:optimize` | Regenerate WebP/AVIF from `src/media/source` |

## Project layout

```
src/
  app/            Routes (App Router). page.tsx is the landing page.
    configure/    Configurator + its client island
    compare/      Spec matrix + its client island
    legal/        Imprint, privacy, terms
    product/      Dynamic product pages ([slug])
  components/
    ui/           Button primitive (+ Thermal hover surface)
    hero/ sections/ product/ layout/ motion/ commerce/ legal/
  lib/
    content/      All copy and product data (typed, single source of truth)
    fonts.ts      Self-hosted font setup
  fonts/          WOFF2 subsets
  media/source/   Full-resolution source artwork
docs/
  adr/            Architecture decision records
  seo/            SEO strategy
scripts/          Build tooling: image pipeline, link checker, static server
public/media/     Optimised images served to the browser
```

## Notable implementation details

- **Static export.** `output: "export"` with `trailingSlash: true`. Routes that
  used `searchParams` were refactored into small client islands so they
  prerender; metadata routes use `force-static`.
- **URL-state configurator.** The build lives in the query string
  (`/configure/?model=n1-pro&mem=mem-64`), so configurations are shareable and
  bookmarkable. State resolves through the same `normalizeConfig` on server and
  client, so the rendered build always matches the URL.
- **Thermal button surface.** A canvas heat field blooms under the cursor on
  every `Button`. It is purely decorative and inert until hover, so the controls
  remain fully operable without JavaScript. See
  [`docs/adr/0002-zero-js-interactivity-and-consent-store.md`](docs/adr/0002-zero-js-interactivity-and-consent-store.md).
- **Accessibility.** Real `<button>`/`<a>` semantics, visible focus rings
  (painted outside the chamfer clip-path), skip link, `prefers-reduced-motion`
  support, and full keyboard operability.
- **Link integrity.** `npm run check:links` walks the built HTML and fails the
  build if any internal href, asset, or `#anchor` does not resolve.
- **Signal Lime accent (`#C6EF34`).** The neutral ramp is green-tinted rather
  than grey so the accent reads as one system instead of a neon bolt-on, and
  lime carries dark ink only (light-on-lime is 1.18:1 and fails AA). The palette
  is asserted by `npm run check:contrast`. See
  [`docs/adr/0004-signal-lime-accent.md`](docs/adr/0004-signal-lime-accent.md).

## Content

All product copy, specifications and pricing live in `src/lib/content/`. The
company, product and legal entities are fictional and the domain
(`nordvark.example`) is a placeholder — update `metadataBase` in
`src/app/layout.tsx` before deploying to a real domain.
