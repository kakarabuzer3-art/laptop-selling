# NORDVÄRK — Premium Laptop Product Site
### Architecture & Page-Structure Blueprint (pre-code proposal)

> **Status:** proposal for review. No code written yet.
> **Working brand:** *NORDVÄRK* (placeholder — swappable in one token file).
> **Product line:** `N1` · `N1 Pro` · `N1 Studio` — EU-engineered aluminium laptops.
> **Design DNA:** European precision-hardware / agency-equipment aesthetic —
> Teenage Engineering (spec-first honesty) × Arc'teryx & Norrøna (material storytelling) ×
> Bang & Olufsen / Loewe (editorial dark monochrome) × Framework (repairability & configurator) ×
> Nothing (typographic identity). Restrained, engineered, expensive-feeling. Zero stock-emoji energy.

---

## 0. Decision summary (what I need from you)

| # | Decision | My recommendation |
|---|---|---|
| D1 | Brand/copy: fictional NORDVÄRK or your real brand + assets? | Fictional placeholder now, content modelled so real copy drops in |
| D2 | Scope: single landing page vs full multi-page site | Landing page first (P0), product + configurator next (P1) |
| D3 | Motion engine: GSAP+ScrollTrigger vs Motion (Framer) | **GSAP 3.15 + ScrollTrigger + SplitText** (free now) for scrub/pin choreography; Motion only if you prefer React-declarative |
| D4 | Content source: typed TS modules vs MDX vs headless CMS | Typed TS + Zod now, CMS adapter later (same interfaces) |
| D5 | Accent colour | ~~Signal Orange `#FF4D1C`~~ → **Signal Lime `#C6EF34`** (revised — see ADR 0004) |
| D6 | Type pairing | Clash Display + General Sans + Martian Mono (Fontshare, free) |
| D7 | Commerce: real checkout or simulated | Simulated CTA + stock/price logic now; Stripe later |

---

## 1. Design north star

**Six principles that gate every design decision:**

1. **The product is the hero, never the decoration.** Every section earns its place by revealing something about the machine.
2. **Precision reads as premium.** Hairlines (1px), tabular numerals, true alignment, generous negative space, no gratuitous gradients.
3. **One accent, one job.** `--signal` is used *only* on primary CTAs and active states. Nothing else may borrow it (Von Restorff isolation).
4. **Motion must be scrub-bound, not time-bound.** Signature moments are tied to scroll position, so the user *drives* the animation → perceived control, no waiting.
5. **Speed is a feature we advertise.** LCP < 1.2s is part of the brand promise ("instant, like the machine").
6. **European trust by default.** Impressum, GDPR consent, 2-yr legal guarantee, 14-day withdrawal, EUR incl. VAT, repairability score. This is a differentiator, not boilerplate.

### 1.1 Visual language

| Element | Direction |
|---|---|
| Colour | Dark-first "graphite studio". Light mode = warm paper, not pure white |
| Typography | Massive tight-tracked display (up to `12vw`), tiny uppercase mono captions, wide measure control |
| Imagery | Product-only, studio-lit, dark seamless background, one material macro per section |
| Shape language | **Chamfered corners** (mirroring the laptop's CNC corner radius), diagonal cuts, perforation dot-matrix, hairline crosshair ticks, thin arcs |
| Texture | 3% monochrome film grain overlay, subtle radial spotlight following pointer |
| Borders | `1px` `--line` at 40% opacity; no rounded card "bubbles" |
| Shadow | Layered radial-gradient contact shadows (cheap) instead of large blur radii (expensive) |

### 1.2 Type scale (fluid, `clamp()` — one source of truth in `tokens.css`)

```
display-hero   clamp(3.5rem, 11.5vw, 10.5rem)  lh .82  ls -.045em  w 600
display-lg     clamp(2.75rem,  7vw,   6rem)    lh .88  ls -.035em
display        clamp(2.25rem,  5vw,   4rem)    lh .95  ls -.03em
h2             clamp(1.75rem, 3.4vw, 2.75rem) lh 1.05 ls -.02em
h3             clamp(1.25rem,  2vw,   1.75rem) lh 1.2
lead           clamp(1.0625rem,1.4vw,1.375rem)lh 1.5
body           1rem / 1.65
caption        .75rem  ls .16em  uppercase  mono
spec           .8125rem  mono  font-variant-numeric: tabular-nums
```
Rule: **never more than 3 sizes on screen in one viewport** (cognitive load control).

### 1.3 Colour tokens

> **Revised.** The accent was originally Signal Orange `#FF4D1C`. It is now
> **Signal Lime `#C6EF34`**, supplied by the client. The neutrals were
> re-derived rather than left grey — see ADR 0004 for the reasoning and the
> measured contrast figures.

```
--ink-950 #06090A   page bg (dark)      --paper     #F2F6F0  page bg (light)
--ink-900 #0B0F10   raised surface      --fog-500   #5F6B60  muted text
--ink-800 #121718   panel               --fog-400   #7D8A7E  captions (AA)
--ink-700 #1B2122   hover panel         --fog-200   #C2CEC4  body text (dark)
--line    #262E30   hairline            --fog-50    #EEF3EC  headings
--signal  #C6EF34   CTA / active ONLY   --signal-ink #0D1405  text on signal
--signal-strong #D7FB55   hover fill    --cobalt    #3D5AFE   links, info, focus
--acid    #D8FF3E   reserved / energy
```
Contrast is asserted, not assumed: `npm run check:contrast` validates all 15
foreground/background pairs at AA (4.5:1 body, 3:1 large). Key figures —
`--signal-ink` on `--signal` = 14.11:1; `--fog-200` on `--ink-950` = 12.29:1.

**Lime is a surface colour, never a text colour on light.** It is high
luminance, so it only ever carries dark ink. Light-on-lime measures 1.18:1 and
fails AA at every size.


### 1.4 Motion tokens

```
dur-instant 120ms · fast 200ms · base 320ms · slow 520ms · cinematic 900ms
ease-out-expo     cubic-bezier(.16,1,.3,1)     ← default for reveals
ease-in-out-quint cubic-bezier(.83,0,.17,1)    ← scrubs & pins
ease-spring       stiffness 260 / damping 26   ← pointer reactions
scrub-smooth      0.6–1.2s smoothing on ScrollTrigger
stagger           60ms per line / 40ms per chip
```
**Only `transform` and `opacity` are animated.** No `top/left/width/height/filter/backdrop-filter` in scroll-linked timelines. `will-change` applied on enter, removed on complete.

---

## 2. Information architecture (sitemap)

```
/                      Landing — the signature piece                    P0
├─ /product/n1         Product deep page (3 variants, same template)    P1
├─ /product/n1-pro
├─ /product/n1-studio
├─ /configure          Configurator (URL-state driven, shareable)       P1
├─ /compare            Spec matrix + side-by-side                       P1
├─ /engineering        "How it's made" editorial + exploded view        P2
├─ /sustainability     Repairability, 10-yr parts, recycling, CO₂e      P2
├─ /support            Warranty, docs, downloads, contact               P2
├─ /journal/[slug]     MDX editorial (launch notes, teardowns)          P3
├─ /legal/imprint      Impressum (DE/EU requirement)                    P0
├─ /legal/privacy      GDPR                                             P0
├─ /legal/terms        Terms + 14-day right of withdrawal               P0
└─ /not-found          On-brand 404 (spec-sheet styled)                 P0
```

**Route model:** all product/legal pages statically generated (SSG) with `revalidate` for stock; `/configure` static shell + client islands; `sitemap.ts`, `robots.ts`, `manifest.ts` generated.

**Nav (desktop):** `Laptops ▾ · Engineering · Compare · Support` + locale + `Configure yours →` (signal).
**Nav (mobile):** wordmark + hamburger → full-screen drawer with staggered link reveal; primary CTA pinned at thumb height.

---

## 3. Landing page — section-by-section blueprint

Rhythm rule: alternate **dense/dark** and **airy** sections; no two consecutive sections share a motion mechanic.

| # | Section | Height | Core motion mechanic | Psychology lever | Priority |
|---|---|---|---|---|---|
| 01 | `SiteHeader` | fixed | morph on scroll (bg blur + height 88→64px), hide-on-down | Mere exposure / persistent escape hatch | P0 |
| 02 | `Hero` | 100svh | line-mask type reveal + scrub parallax + product scale-toward | Primacy, serial position, awe | P0 |
| 03 | `ProofMarquee` | 120px | infinite marquee, pauses on hover | Social proof, authority | P0 |
| 04 | `Manifesto` | 90vh | word-by-word opacity reveal on scrub | Framing, narrative transport | P0 |
| 05 | `ChassisSticky` | 300vh | pinned media + scrolling copy (sticky two-column) | Progressive disclosure | P0 |
| 06 | `DisplayHotspots` | 120vh | annotated hotspots on product image, staggered pop | Curiosity gap, interactivity | P0 |
| 07 | `PerformanceBench` | 100vh | count-up numerals + horizontal bars grow on enter | Anchoring, concrete numbers | P0 |
| 08 | `ExplodedView` | 250vh | **signature:** layers separate on scrub, labels draw in | Peak moment, Zeigarnik | P1 |
| 09 | `BatteryTimeline` | 140vh | horizontal scrub track, "a day on one charge" | Loss aversion (range anxiety solved) | P1 |
| 10 | `Colorways` | 100vh | swatch → image crossfade + price delta update | IKEA effect, ownership preview | P0 |
| 11 | `VariantCompare` | auto | tabs + staggered rows, middle card elevated | Hick's law (3 options), decoy/center-stage | P0 |
| 12 | `GalleryScatter` | 130vh | scattered editorial grid, parallax per-item, lightbox | Aesthetic-usability effect | P1 |
| 13 | `ReviewsCarousel` | auto | drag/swipe carousel + rating count-up | Social proof, specificity | P0 |
| 14 | `Sustainability` | 100vh | hairline diagram draw (stroke-dashoffset), counters | Values congruence (EU buyers) | P1 |
| 15 | `FaqAccordion` | auto | one-open accordion, animated height | Cognitive load reduction | P0 |
| 16 | `FinalCta` | 80vh | high-contrast inverted panel, chamfer wipe-in | Recency, goal completion | P0 |
| 17 | `SiteFooter` | auto | mega footer, newsletter, locale, legal | Trust closure | P0 |
| — | `StickyBuyBar` | fixed | appears after intent signal (past `VariantCompare`) | Fitts's law, friction removal | P0 |
| — | `ConsentBanner` | fixed | bottom sheet, granular, no dark pattern | GDPR + trust | P0 |
| — | `ScrollProgress` | 2px | hairline bar, signal fill | Orientation, completion | P0 |
| — | `CursorSpot` | — | pointer-follow radial spotlight (fine pointers only) | Perceived responsiveness | P2 |

### 3.1 Hero anatomy (the money shot)

```
┌──────────────────────────────────────────────────────────────┐
│  NORDVÄRK ⌁                    Laptops  Engineering  Compare │ ← header, 88px
│                                          [ Configure yours → ]│
│                                                              │
│   ┌ L6 · caption (mono, tracked)                             │
│   │  ENGINEERED IN MALMÖ · ASSEMBLED IN THE EU · 1.09 KG     │
│   │                                                          │
│   │  L5 · display-hero (4 lines, mask reveal, 60ms stagger)  │
│   │   MACHINED                                               │
│   │   FOR                                                    │
│   │   FOCUS.                                                 │
│   │                                                          │
│   │            ╔═══════════════════════════╗                  │
│   │            ║   PRODUCT IMAGE (LCP)     ║  ← parallax y    │
│   │            ║   open-lid 3/4 view       ║    + scale 1→1.06│
│   │            ╚═══════════════════════════╝    contact shadow│
│   │                                                          │
│   │  L3 · spec chips: [ 14" 3K OLED ] [ 22h ] [ 1.09kg ]     │
│   │  L2 · CTA row:  ( Configure your N1 )   Configure ▸ ────│← primary = signal
│   │                   Compare all three                      │← secondary = ghost
│   │  L1 · trust row: free EU delivery · 14-day return · 2-yr │
│   └                                                          │
│                                    scroll ────┐              │
└──────────────────────────────────────────────────────────────┘
   bg layer: ambient noise + slow radial glow (composited, no repaint)
```

**Layered structure & scroll behaviour (0 → 100vh of the hero):**
- `z0` ambient glow — opacity 1 → 0.4, `translateY` 0 → -8%
- `z1` display type — mask reveal on load; on scroll `translateY` 0 → -18%, opacity 1 → 0 (scrub 0–0.7)
- `z2` product image — `translateY` +6% → -10%, `scale` 1 → 1.06 (scrub 0–1), stays crisp: `transform` only
- `z3` spec chips — stagger in at 420ms; on scroll `translateY` 0 → -6%
- `z4` section boundary — chamfered `clip-path` wipe revealing the next section's paper background

**Headline directions (pick one):**
- **A (recommended):** `MACHINED / FOR / FOCUS.` — short, confident, industrial; leaves room for the product
- **B:** `1.09 KG / OF ABSOLUTE / INTENT.` — spec-as-drama, very European hardware
- **C:** `THE LAPTOP / THAT DISAPPEARS.` — benefit-led, softer

**LCP guard:** hero image is the single `priority` element, AVIF/WebP, `sizes="(max-width:768px) 100vw, 1400px"`, `fetchPriority="high"`, explicit `width/height`, blurred 20px placeholder via `next/image` `placeholder="blur"` (base64 ≤ 2KB). **No** animation library blocking it: GSAP loads via `next/dynamic` after first paint.

### 3.2 Signature moment — `ExplodedView` (§08)

Pinned container, 250vh of scroll. Six product layers (lid · display assembly · keyboard deck · mainboard · battery · base) translate apart along Y/Z as the user scrubs, while hairline callout lines draw in and mono labels fade up with spec data. Reverse-scrub is fully supported. On mobile: falls back to a **swipeable layer stack** (no pin) — same content, native gesture. On `prefers-reduced-motion`: static exploded still with all labels visible.

---

## 4. Component architecture

### 4.1 Guiding rule: **server-first, islands of interactivity**

`"use client"` appears only at leaf components. Never on `layout.tsx`, never on section wrappers. Each client island targets **< 8 KB gzipped**. Anything that doesn't need the browser is an RSC.

### 4.2 Directory tree

```
src/
├─ app/
│  ├─ layout.tsx                  RSC · fonts, metadata, ThemeProvider, providers shell
│  ├─ page.tsx                    RSC · composes landing sections in order
│  ├─ globals.css                 Tailwind v4 @import + @theme (tokens live here)
│  ├─ loading.tsx · not-found.tsx
│  ├─ product/[slug]/page.tsx     RSC + generateStaticParams + generateMetadata
│  ├─ configure/page.tsx
│  ├─ compare/page.tsx · engineering/ · sustainability/ · support/
│  ├─ journal/[slug]/page.tsx     MDX
│  ├─ legal/{imprint,privacy,terms}/page.tsx
│  ├─ sitemap.ts · robots.ts · manifest.ts · opengraph-image.tsx
│  └─ api/stock/route.ts          cached availability
├─ components/
│  ├─ layout/    SiteHeader*, NavDrawer*, SiteFooter, SkipLink, ScrollProgress*,
│  │             LocaleSwitcher*, StickyBuyBar*, ConsentBanner*
│  ├─ sections/  Hero*, ProofMarquee, Manifesto, ChassisSticky*, DisplayHotspots*,
│  │             PerformanceBench*, ExplodedView*, BatteryTimeline*, Colorways*,
│  │             VariantCompare*, GalleryScatter*, ReviewsCarousel*, Sustainability*,
│  │             FaqAccordion*, FinalCta, NewsletterBlock*
│  ├─ motion/    LenisProvider*, Reveal*, TextSplit*, StickyScroll*, Parallax*,
│  │             ScrollScrub*, Counter*, Marquee*, MagneticWrap*, TiltCard*,
│  │             CursorSpot*, hooks/{useReducedMotion, useScrollDirection, useInView,
│  │             useMediaQuery, useLockBodyScroll}
│  ├─ shapes/    ClipSection, ChamferedPanel, DiagonalRule, ArcDivider, Perforation,
│  │             NoiseOverlay, GridLines, RadialGlow, CornerTicks, SpecDial, BlobMask
│  ├─ ui/        Button*, IconButton*, Badge, Pill, Accordion*, Tabs*, Dialog*, Sheet*,
│  │             Tooltip*, Rating, Swatch*, SpecTable, ProgressSteps, Input, Select,
│  │             Toggle, Skeleton, Kbd
│  ├─ product/   ProductStage*, Hotspot*, SpecCard, VariantCard, PriceBlock, StockPill,
│  │             configurator/{Configurator*, ConfigStep*, OptionGroup*, SummaryPanel*},
│  │             ComparisonMatrix*, MediaLightbox*
│  └─ commerce/  BuyBar*, TrustRow, FinancingNote
├─ lib/
│  ├─ content/   products.ts · variants.ts · specs.ts · reviews.ts · faq.ts · journal.ts
│  ├─ schema/    product.ts (Zod) · config.ts (Zod) · review.ts
│  ├─ seo/       metadata.ts · jsonld.ts
│  ├─ utils/     cn.ts · format.ts (EUR/VAT/locale) · clamp.ts · lerp.ts
│  └─ hooks/     useIdlePrefetch.ts · useConfigUrl.ts (URL ⇄ config state)
├─ providers/   ThemeProvider* · MotionProvider* (Lenis + reduced-motion ctx) ·
│               ConsentProvider* · AnalyticsProvider* (lazy, post-consent)
├─ styles/      tokens.css · animations.css
├─ types/       product.d.ts · config.d.ts · motion.d.ts
└─ public/      products/{n1,n1-pro,n1-studio}/*.avif|webp · og/ · fonts/
                                              (* = client component)
```

### 4.3 Component contract table (core inventory)

| Component | Render | Props (simplified) | Deps | Notes |
|---|---|---|---|---|
| `Hero` | client | `product`, `headline`, `media` | GSAP, next/image | Owns the only LCP image; animation timeline in one `useLayoutEffect` with full cleanup |
| `Reveal` | client | `as`, `y`, `delay`, `once` | IntersectionObserver | Workhorse wrapper — used 40+ times, must stay < 1 KB |
| `TextSplit` | client | `text`, `mode: line\|word\|char`, `as` | GSAP SplitText | SSR-renders full text (SEO/a11y), splits after hydration only |
| `StickyScroll` | client | `panels`, `pinHeight` | ScrollTrigger | Reusable for §05, §09 |
| `ScrollScrub` | client | `from`, `to`, `scrub`, `start`, `end` | ScrollTrigger | Thin declarative wrapper; kills trigger on unmount |
| `Counter` | client | `to`, `suffix`, `duration`, `startOnView` | GSAP | `tabular-nums` to prevent layout shift |
| `Marquee` | client | `items`, `speed`, `direction` | CSS animation | Pure CSS `translateX`, `aria-hidden` duplicates |
| `MagneticWrap` | client | `strength`, `radius` | rAF + pointer | Fine pointers only; disabled on touch & reduced-motion |
| `Button` | **server** | `variant: signal\|ghost\|link\|quiet`, `size`, `as`, `href`, `magnetic?`, `loading?`, `iconSlot` | — | Zero JS unless `magnetic`; variants defined in §6 |
| `ChamferedPanel` | server | `corner`, `radius`, `tone`, `border` | CSS clip-path | Shape primitive; no JS |
| `ClipSection` | server | `shape: chamfer\|arc\|diagonal\|perforated`, `flip` | CSS | Section-to-section transitions |
| `NoiseOverlay` | server | `opacity`, `blend` | inline SVG turbulence data-URI | Fixed, `pointer-events:none`, `aria-hidden` |
| `SpecTable` | server | `rows`, `columns`, `highlight` | — | Fully static, sticky first column on scroll-x |
| `ComparisonMatrix` | client | `variants`, `featureIds` | — | Horizontal scroll on mobile, sticky header, diff highlighting |
| `Configurator` | client | `product`, `defaults` | URL state | No global store; state serialised to `?model=&ram=&ssd=&color=` |
| `ConsentBanner` | client | `categories` | ConsentProvider | Granular toggles, no pre-ticked boxes, `dialog` semantics |
| `StickyBuyBar` | client | `product`, `price`, `triggerSectionId` | IntersectionObserver | Slides up once; hides on user dismiss (respects choice) |

### 4.4 Data layer & flow

```
lib/content/*.ts  ──Zod parse (build time)──►  typed Product / Variant / Spec / Review
        │
        ▼
app/**/page.tsx (RSC)  ── serialisable props only ──►  sections ──► client islands
```
- **No client-side fetching for marketing content.** Everything ships as typed props → zero waterfalls, zero loading spinners above the fold.
- Product model (draft): `{ slug, name, tagline, priceEUR{amount,vatIncluded}, variants[], specs{display,cpu,ram[],storage[],battery,wheels{weightKg,thicknessMm}}, media{hero[],gallery[],exploded[]}, colorways[], availability{status,leadTimeDays}, sustainability{repairScore,partsYears,co2eKg}, certifications[] }`
- CMS swap later = replace `lib/content` with a `ContentAdapter` implementing the same interfaces. Sections never know the source.

### 4.5 Provider composition

```
<html>
 └ ThemeProvider (class strategy, localStorage + no-flash inline script ≤ 400B)
    └ ConsentProvider (GDPR categories; gates analytics)
       └ MotionProvider (dynamic import, ssr:false → Lenis + reduced-motion ctx)
          └ SiteHeader / <main> sections / SiteFooter
```
`MotionProvider` is **dynamically imported after first paint** so the hero HTML+LCP image are never blocked by animation JS. Before it mounts, all reveal components render their final (visible) state — no invisible-content flash, no SEO loss, no CLS.

---

## 5. Advanced shapes system

All shapes are pure CSS/SVG (zero JS, zero extra requests):

| Shape | Technique | Where |
|---|---|---|
| Chamfered panel | `clip-path: polygon(...)` with `--chamfer: 18px` | cards, CTAs, footer, hero product plinth |
| Diagonal section cut | `clip-path: polygon(0 0,100% 4vw,100% 100%,0 calc(100% - 4vw))` | section transitions §04→§05 |
| Arc divider | inline SVG `<path>` with `vector-effect="non-scaling-stroke"` | §14, §16 |
| Perforation dot-matrix | `radial-gradient` tiled `background-image` at 12px pitch | speaker/vent motifs, empty states |
| Hairline crosshair ticks | 1px pseudo-elements + `CornerTicks` component | every panel corner (engineering-drawing cue) |
| Grid lines | repeating-linear-gradient at 1/12 column pitch, 4% opacity | hero + manifesto bg |
| Film grain | inline SVG `feTurbulence` data-URI, `mix-blend-mode:overlay`, 3% | global fixed overlay |
| Radial spotlight | pointer-tracked `--mx/--my` custom props → `radial-gradient` | hero, final CTA (fine pointers) |
| Blob / liquid mask | `mask-image` + animated SVG path (SMIL-free, CSS `offset-path`) | gallery hover only — kept off critical path |
| Stroked display type | `-webkit-text-stroke: 1px` + transparent fill | §04 manifesto accent word |
| Spec dial | SVG circle + `stroke-dasharray` animated by Counter | §07 performance rings |

---

## 6. Buttons & CTA system — psychology-driven

### 6.1 Variant ladder (deliberate hierarchy)

| Variant | Look | Use | Frequency rule |
|---|---|---|---|
| `signal` | solid `--signal`, ink text, chamfered, magnetic | **One primary action per viewport** | ≤ 2 per page region |
| `outline` | 1px `--line`, text `--fog-200`, fills on hover | Secondary (Compare, Watch film) | unlimited |
| `ghost` | text + arrow, underline grows from left | Tertiary (Learn more) | unlimited |
| `quiet` | mono uppercase caption link | Legal, utility | nav/footer |

### 6.2 Button states (all specified, none improvised)

`default → hover` (spotlight follows cursor + 1.02 scale + arrow slides 4px) → `active` (0.98, 90ms) → `focus-visible` (2px `--cobalt` offset ring, never removed) → `loading` (inline spinner + label swap, `aria-busy`, disabled) → `disabled` (**always with a visible reason**: "Select storage to continue") → `success` (brief check morph, 900ms).
Touch: no hover-only affordances; 48px min target; `:active` uses `-webkit-tap-highlight-color: transparent` + custom press state.

### 6.3 Microcopy rules

- Benefit + specificity, never "Submit"/"Buy now": **`Configure your N1 — from €1,499`**
- First-person for high-intent: `Build mine`
- Risk reversal line **directly under** the primary CTA (not in the footer):
  `Free EU delivery · 14-day returns · 2-year legal guarantee · Repairable for 10 years`
- Live price updates announce via `aria-live="polite"` in the configurator.

### 6.4 Psychology → implementation map

| Principle | Implementation on this site |
|---|---|
| **Hick's law** | Exactly 3 variants; recommended one pre-tagged "Most chosen" |
| **Anchoring** | `N1 Studio` shown first in compare (high anchor), then "from €1,499" elsewhere |
| **Decoy / center-stage** | Middle tier visually elevated + `signal` border; extremes de-emphasised |
| **Von Restorff** | `--signal` exists nowhere except primary CTAs & active states |
| **Default effect** | Configurator pre-fills a sane config; user edits rather than builds from zero |
| **Endowed progress** | "Step 2 of 4" bar starts *filled* at 25% |
| **Goal gradient** | Summary panel stays sticky; completion accelerates near end |
| **Zeigarnik** | Unfinished config persists → `Resume your build` pill on return visits |
| **Social proof** | Marquee (press/awards), 4.8★ with count, verified-purchase badges, real names + roles + cities |
| **Authority** | Certifications row (CE, TÜV, EPEAT), "Engineered in Malmö", spec-sheet honesty |
| **Loss aversion** | Battery-day timeline; honest stock: "Ships in 3–5 days" — *no fake countdowns* |
| **Scarcity (ethical)** | Real allocation numbers from `api/stock`; never invented |
| **Fitts's law** | `StickyBuyBar` in the thumb zone after intent signal; large targets |
| **Peak–end rule** | `ExplodedView` = peak; `FinalCta` inverted panel + single line = strong end |
| **Serial position** | Hero and Final CTA carry the identical primary action & wording |
| **Progressive disclosure** | Accordion FAQ, "Full spec sheet" toggle, hotspot-driven display section |
| **Cognitive fluency** | Consistent 12-col grid, ≤3 type sizes/viewport, predictable spacing scale |
| **Autonomy / reactance** | Every hard CTA paired with a low-commitment exit ("Compare", "Read the teardown") |
| **IKEA effect** | Configurator lets users *make* their machine → higher valuation |
| **Values congruence** | Sustainability + repairability section before the final CTA (EU buyer priority) |

---

## 7. Performance strategy

### 7.1 Budgets (enforced in CI, fail the build)

| Metric | Target (mobile, Moto G4-class) | Hard ceiling |
|---|---|---|
| LCP | ≤ 1.2 s | 2.0 s |
| INP | ≤ 120 ms | 200 ms |
| CLS | ≤ 0.01 | 0.05 |
| TTFB | ≤ 200 ms | 600 ms |
| First-load JS `/` | ≤ 150 KB gzip | 200 KB |
| Total page weight | ≤ 1.6 MB | 2.5 MB |
| Scroll FPS | 60 (desktop) / 55+ (mobile) | no frame > 32 ms |
| Fonts | ≤ 2 families, ≤ 180 KB total, subset | — |

### 7.2 Tactics

1. **RSC-first** — sections are server components; only 12 client islands on the landing page.
2. **Animation code-splitting** — GSAP + ScrollTrigger + Lenis dynamically imported in `MotionProvider` (`ssr:false`), loaded *after* `window.load` or first idle callback. Hero HTML paints with zero animation JS.
3. **Below-fold laziness** — sections 06–16 mounted through `IntersectionObserver` gate (`rootMargin: 400px`); `content-visibility: auto` + `contain-intrinsic-size` on non-pinned sections.
4. **Images** — `next/image` AVIF > WebP, `sizes` per section, one `priority` LCP image, everything else `loading="lazy" decoding="async"`, blurred placeholders, `sharp` at build time, no oversized sources (max 2× largest breakpoint).
5. **Fonts** — `next/font/local`, variable axes only where used, `latin` subset, `size-adjust`/`ascent-override` metrics to kill FOUT shift, `font-display: swap`. Display font loaded `preload`, mono deferred.
6. **Scroll performance** — single Lenis rAF loop shared by all ScrollTriggers (`scrollerProxy`); `normalizeScroll` on touch; animations use `transform`/`opacity` only; `batch()` for grouped reveals; no layout reads inside timelines (`getBoundingClientRect` cached on enter).
7. **No third-party blocking** — analytics lazy + consent-gated; no chat widget, no heavy icon lib (inline SVG set).
8. **Caching** — SSG for all marketing routes, `revalidate: 300` for stock, immutable hashed assets, `Cache-Control` on images, prefetch on link hover (`useIdlePrefetch`).
9. **Bundle hygiene** — no moment/lodash whole-imports, `@next/bundle-analyzer` checked in PRs, tree-shakeable imports, `zod` only at build boundary where possible.
10. **Measure** — Lighthouse CI (perf ≥ 95, a11y ≥ 98, best-practices ≥ 95, SEO ≥ 98) + Playwright Web Vitals assertion on the landing page.

---

## 8. Responsive & adaptive strategy

**Breakpoints:** `360 / 640 / 768 / 1024 / 1280 / 1536 / 1920`. Fluid container: `max-w-[1600px]`, `px-[clamp(1rem,4vw,3.5rem)]`. Grid: 12-col desktop → 6-col tablet → 4-col mobile, `gap: clamp(1rem,2vw,2rem)`.

| Section | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero | 4-line display left, product right, overlap | Stacked, type above product | `svh` unit, 3-line type, product 78vw, CTAs full-width stacked |
| ChassisSticky | Pinned media left / scrolling copy right | Pinned media top, copy below | Unpinned: media then copy cards |
| ExplodedView | Scrub-separated 3D-ish layers | Reduced separation, same scrub | **Swipeable layer carousel** (pin disabled) |
| ComparisonMatrix | 3 columns + sticky header | 2-col with horizontal scroll | Card stack, swipe + "sticky variant name" chip |
| GalleryScatter | Scattered parallax grid | 2-col masonry | Single column, no parallax |
| Configurator | Two-pane (options / sticky summary) | Summary becomes sticky footer bar | Bottom-sheet summary, step-by-step |
| Nav | Horizontal + CTA | Horizontal, condensed | Full-screen drawer |

**Adaptive rules**
- `100svh`/`dvh` (never `vh`) to survive iOS Safari chrome.
- `@media (hover:none)` / `(pointer:coarse)` → disable magnetic buttons, cursor spotlight, hover-only reveals; enable swipe & larger targets (≥48px).
- `prefers-reduced-motion: reduce` → all scrub timelines replaced by static final states; crossfades become instant; Lenis disabled (native scroll); `Reveal` becomes a no-op pass-through.
- `prefers-contrast: more` → hairlines to 2px, grain removed, accent darkened.
- `prefers-color-scheme` + manual toggle, no-flash script, images have dark/light variants where needed.
- Container queries (`@container`) for cards reused in different column widths.
- Landscape phones: hero switches to a horizontal split, type never below `2.5rem`.
- `save-data` / `navigator.connection.effectiveType === '2g'` → serve smaller images, skip grain + spotlight, disable parallax.

---

## 9. Accessibility (WCAG 2.2 AA)

- Semantic landmarks, one `<h1>`, logical heading order per section, `SkipLink` first in DOM.
- Every interactive element keyboard-reachable with a visible `focus-visible` ring (`--cobalt`, 2px, 2px offset); focus trapped in drawer/dialog/lightbox with restore-on-close.
- Tabs / accordion / carousel / lightbox use proper ARIA patterns (`role=tablist`, `aria-selected`, `aria-expanded`, `aria-controls`, roving tabindex).
- Decorative motion + grain: `aria-hidden`, `pointer-events:none`. Marquee duplicates hidden from AT.
- Alt text strategy: hero & product images descriptive; texture/atmosphere images `alt=""`.
- Colour never the sole signal (icons/labels accompany status pills); contrast verified per token pair.
- Forms: visible labels, `aria-describedby` errors, no placeholder-as-label, `autocomplete`.
- Live regions: price/config changes, stock updates, form submission results.
- Motion: reduced-motion honoured globally through one `MotionProvider` context (single source of truth).
- Tested with axe-core (Playwright) + manual keyboard/ScreenReader pass; report shipped with the build.

---

## 10. SEO & metadata

- `generateMetadata` per route: title template `%s — NORDVÄRK`, description, canonical, OG/Twitter, `alternates.languages` for EU locales (en/de/fr/sv) with `hreflang`.
- Dynamic OG images (`opengraph-image.tsx` via `next/og`) per product, using the display font.
- JSON-LD: `Organization`, `Product` (+ `Offer`, `AggregateRating`, `brand`), `BreadcrumbList`, `FAQPage`, `ItemList` on `/compare`.
- `sitemap.ts` (with lastmod from content), `robots.ts`, `manifest.ts` (theme-colour per scheme, maskable icon).
- Server-rendered full copy for all sections (animations must never gate text — `TextSplit` renders real text in SSR).

---

## 11. Stack & tooling (versions verified today)

| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | Next.js (App Router, Turbopack) | **16.3.6** | RSC, streaming, `next/image`, static generation |
| UI runtime | React | **19.3.0** | Actions, `use()`, compiler-friendly |
| Language | TypeScript (strict) | 5.x | Safety across content ↔ components |
| Styling | Tailwind CSS | **4.3.3** | CSS-first `@theme`, faster builds, tiny output |
| Motion | GSAP + ScrollTrigger + SplitText | **3.15.0** | Scrub/pin choreography; **100% free incl. plugins** since the Webflow acquisition |
| Motion (alt) | Motion | 13.4.4 | If you prefer declarative React springs (D3) |
| Smooth scroll | Lenis | 1.3.26 | Single rAF loop, integrates with ScrollTrigger |
| Validation | Zod | 3.x | Content contracts at the boundary |
| Content | Typed TS modules (+ MDX for journal) | — | Zero runtime cost now, CMS later |
| Icons | Hand-picked inline SVG set | — | No icon-library payload |
| Lint/format | ESLint 9 (flat) + Prettier (+ Tailwind plugin) | — | Consistency |
| Tests | Vitest + Testing Library; Playwright (a11y, CWV, e2e) | — | Guard budgets |
| CI gates | Lighthouse CI, `@next/bundle-analyzer`, axe-core | — | Perf/a11y can't regress |
| Hosting | Vercel (or Node/`output:standalone` + CDN) | — | Edge caching, image optimisation |

---

## 12. Build plan

| Phase | Deliverable | Contents |
|---|---|---|
| **0 — Foundation** | Scaffold + design system | Next 16 + Tailwind 4 + TS strict, `tokens.css`, fonts, `Button`/panel/shape primitives, `Reveal`/`TextSplit`/`ScrollScrub` motion kit, `LenisProvider`, theme + reduced-motion, content model + Zod schemas |
| **1 — Hero & shell** | The first impression | `SiteHeader`, `Hero` (full animation choreography), `ScrollProgress`, `SiteFooter`, `ConsentBanner`, `StickyBuyBar` |
| **2 — Narrative sections** | §03–§07, §10, §11, §13, §15, §16 | Marquee, manifesto, sticky chassis, hotspots, performance counters, colorways, compare, reviews, FAQ, final CTA |
| **3 — Signature moments** | §08, §09, §12, §14 | Exploded view, battery timeline, gallery scatter, sustainability diagram |
| **4 — Product & configurator** | `/product/[slug]`, `/configure`, `/compare` | Stage, spec sheets, URL-state configurator, matrix, price/stock |
| **5 — Hardening** | Polish + gates | Responsive passes, a11y audit & fixes, Lighthouse CI, bundle trim, SEO/JSON-LD, legal pages, 404, README |

Each phase ends in a runnable, deployable state — you can review the hero after Phase 1 rather than waiting for everything.

---

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| ScrollTrigger pin/scrub jank on iOS Safari | Lenis `normalizeScroll`, `will-change` only while pinned, mobile fallbacks for pinned sections |
| GSAP + React StrictMode double-effect | All timelines created in `useLayoutEffect` with `ctx = gsap.context()` + `ctx.revert()` cleanup |
| Animation JS delaying LCP | Dynamic `MotionProvider`, pre-animation visible state, one `priority` image |
| FOUT/CLS from display font | `next/font/local` metrics override, `preload`, `size-adjust` |
| "Premium" turning into slow | Budgets in CI, hard ceilings, `save-data` degradation path |
| Content sprawl / hard-coded copy | Single typed content module + Zod; CMS adapter interface reserved |
| Over-animation → nausea/accessibility | One mechanic per section, reduced-motion parity, no auto-playing carousels < 5s |
| Fake scarcity hurting trust (EU/ASA rules) | Only real stock data, honest lead times, no countdown theatre |

---

## 14. What I'd like you to confirm

1. **Brand & assets** — proceed with fictional *NORDVÄRK* + AI-generated/studio-style product imagery, or do you have a real brand, photos, and copy?
2. **Scope for the first build** — landing page only (P0), or landing + product + configurator?
3. **Motion engine** — GSAP + ScrollTrigger + Lenis (my recommendation) or Motion (Framer)?
4. **Accent & type** — *(historical)* Signal Orange `#FF4D1C` + Clash Display/General Sans. **Resolved: the accent was later revised to Signal Lime `#C6EF34`** (ADR 0004); type pairing unchanged.

Answer those and I'll start on **Phase 0 + Phase 1** (tokens, motion kit, header, and the hero) so you have something real to look at immediately.
