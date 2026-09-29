# 90-Day SEO Strategy — NORDVÄRK (premium laptops, IE/EU market)

Prepared for: agency delivery · client profile: **advanced coder based in Ireland** (can self-implement technical work — this changes the economics of the whole plan)
Constraint: **limited budget** → zero-cash tool stack wherever possible, time spent only on high-impact work, everything ordered by expected impact per hour.
Site stack: Next.js 16 (SSR/SSG), TypeScript, Tailwind v4 — technical SEO is a strength we exploit, not a debt we repay.

> Honest expectation setting: SEO compounds. In 90 days we buy **indexation health,
> long-tail movement, local visibility and the assets that win months 4–9**.
> Head-term ("premium laptop") movement is a 6–12 month game; we position for it now.

---

## 1. Strategic reading of the situation

| Fact | Consequence for strategy |
|---|---|
| New domain, no authority | Compete on **specificity**, not breadth: repairability, EU assembly, fanless OLED, weight class. Own narrow intents first |
| Client is an advanced coder | Technical SEO, structured data, CWV, log analysis, even small open-source link-magnets are **in-house and free** — most agencies can't assume this |
| Limited budget | No paid tools beyond free tiers; no outsourced content mill; no paid links (also: violates guidelines); PR via engineering story instead of agency retainers |
| EU/Ireland market | GDPR-clean trust signals (Imprint, 2-yr guarantee, 14-day withdrawal) are **ranking-adjacent E-E-A-T signals** and conversion assets; hreflang ready for en-IE/en-GB/de-DE later |
| Product-led site (this build) | Rich results (Product, Offer, AggregateRating, FAQ) are quick SERP real-estate wins |

**Positioning sentence for all content:** *"The repairable, EU-assembled precision laptop for people who keep their machines for a decade."*
Every cluster below ladders to it.

---

## 2. Keyword targeting (clusters → URLs → priority)

Directional difficulty/volume only — validate free in week 1 with GSC impressions,
Google autocomplete/PAA, and Keyword Planner (free with any Ads account). Do not buy a tool yet.

| # | Cluster | Intent | Example queries | Target URL | P | Why |
|---|---|---|---|---|---|---|
| K1 | Brand + product | Navigational/comm. | `nordvark n1`, `nordvark laptop review` | `/`, `/product/n1` | P0 | Must own from day 1; cheap |
| K2 | Repairability / longevity | Comm. + info | `repairable laptop`, `laptop with replaceable battery`, `10 year laptop`, `repairability score laptop` | `/sustainability`, `/engineering` | P0 | Low-medium difficulty, high differentiation, rising EU regulatory interest |
| K3 | Spec-class commercial | Commercial | `1kg laptop`, `fanless laptop`, `oled laptop 14 inch`, `22 hour battery laptop` | `/product/n1`, `/compare` | P0 | Spec terms convert; competitors target "ultrabook" not the spec long-tail |
| K4 | Comparisons / alternatives | Commercial inv. | `n1 vs macbook air`, `framework alternative eu`, `macbook alternative linux` | `/compare`, journal posts | P1 | Highest intent-per-difficulty ratio available to a new site |
| K5 | EU buyer guidance | Informational | `laptop legal guarantee eu`, `14 day return online purchase eu`, `laptop warranty ireland` | journal + `/support` | P1 | Zero competition from brands; pure E-E-A-T; feeds FAQ rich results |
| K6 | Local (Ireland) | Local/comm. | `buy laptop online ireland`, `laptop repair dublin`, `premium laptop shop dublin/cork` | `/ie/` hub or GBP + `/support` | P1 | See §4 — depends on whether a physical/service presence exists |
| K7 | Developer-adjacent | Informational | `linux laptop 2026`, `laptop for programming battery`, `quiet laptop for office` | journal | P2 | The client's own tribe; natural links + community trust |
| K8 | Head terms | Commercial | `premium laptop`, `best laptop 2026` | `/` (implicit) | P2 | Do not target directly yet; let authority accrue |

**Rule:** one primary cluster per URL; canonicalise comparisons to `/compare` to avoid
keyword cannibalisation; journal posts always link up to their commercial parent.

---

## 3. Technical SEO (client-implemented — our cheapest lever)

Already shipped in this build (verify, don't rebuild): SSG/SSR HTML for all routes ·
semantic single-`h1` pages · metadata + canonical + OG · `sitemap.ts`/`robots.ts` ·
Product JSON-LD with Offer + AggregateRating · AVIF/WebP + intrinsic dimensions + blur
placeholders (zero CLS) · effective first-load JS 137.6 KB gzip · LCP image
`fetchpriority=high` + preload · no render-blocking third parties.

**Additions, in priority order:**

| P | Task | Purpose |
|---|---|---|
| P0 | GSC + GA4 + Bing WMT verified; sitemap submitted; URL inspection on `/` and product routes | Baseline + indexation control |
| P0 | Decide primary host & domain (www/non-www; `.ie` vs `.com` — see §4); 301 everything else; canonical consistent | Prevents signal split — the classic new-site killer |
| P0 | `Organization` + `WebSite` + `BreadcrumbList` JSON-LD site-wide; `FAQPage` on `/support` | Rich-result eligibility |
| P0 | Lighthouse CI in the pipeline with thresholds (perf ≥95, a11y ≥98, SEO ≥98) — code already budgets for it | Keeps CWV a ranking asset, not a regression risk |
| P1 | CrUX field monitoring (free, via GSC Core Web Vitals report) monthly | Field ≠ lab; Google ranks on field |
| P1 | Security/privacy headers (CSP-lite, `Permissions-Policy`, HSTS) | Trust + no mixed-content risk |
| P1 | Image SEO pass: descriptive filenames (done: `n1-hero.webp`), alt (done), plus `image` entries in sitemap when gallery lands | Image search is a real discovery channel for hardware |
| P2 | GSC coverage + log review at week 7 (Vercel logs are free): catch param URLs, faceted duplicates, soft-404s | Index hygiene before scale |
| P2 | hreflang scaffolding only when a second locale actually ships (`en-IE`/`en-GB`/`de-DE`) | Avoids fake-hreflang penalty-of-confusion |

---

## 4. Local SEO (Ireland)

Two scenarios — pick in week 1 with the client:

**A. Physical presence or service centre exists (showroom/repair bench):**
| P | Task | Purpose |
|---|---|---|
| P0 | Google Business Profile: correct category (`Computer repair service` / `Computer store`), services, photos of the bench, opening hours | Map-pack eligibility for K6 |
| P0 | NAP identical on site footer/contact + `LocalBusiness` schema with `areaServed` | Entity consistency |
| P1 | Core IE citations: Golden Pages, Bing Places, Apple Business Connect, Yelp IE, local chamber | Baseline local authority |
| P1 | Review engine: post-delivery email asking for a Google review (no incentives — guideline-safe) | Map-pack ranking + CTR |
| P2 | Local landing pages only where real: `/support/dublin` etc. — never doorway pages | Converts local intent honestly |

**B. Pure online/D2C from Ireland:**
| P0 | Skip GBP storefront; use `Organization` + `areaServed: IE/EU` schema instead | Accurate entity, no suspended-GBP risk |
| P1 | Target K6 informational-commercial hybrids ("buy laptop online ireland", "ireland laptop warranty rules") with `/ie` content + en-IE locale signals | Wins local-intent queries without a fake storefront |
| P1 | Irish press + community (see §6) carries the "Irish-based, EU-assembled" story → local links | Local authority via PR, not citations |

---

## 5. Content strategy (2 pieces/month — cadence that survives a small budget)

**Pillar:** *"The 10-Year Laptop"* — an honest, data-carrying guide to buying, keeping and repairing a laptop in the EU (K2+K5). Everything links to it; it links to `/product/*` and `/compare`.

**Cluster rotation (one commercial-supporting, one authority-building per month):**
1. Repairability score explained, with our own teardown data (link-magnet)
2. Fanless thermals: what 22 h battery really costs (benchmarks published)
3. EU legal guarantee & returns, in plain language (K5 — zero brand competition)
4. N1 vs MacBook Air M4 vs Framework — measured, not marketing (K4)
5. OLED burn-in in 2026: measured retention curve (K7/K3 — PR-able)
6. What 1.09 kg means for daily carry (K3)

**E-E-A-T mechanics:** named author pages with real bios (the client's engineering
credentials are the asset) · "how we test" methodology page · dated updates with
changelogs · cite primary sources (our measurements, EU legislation).

**Anti-patterns we refuse:** AI-sludge listicles, keyword-stuffed FAQs, comparison
pages without measurements. They don't rank post-HCU and they burn the brand.

---

## 6. Authority & links on a ~€0 cash budget

| P | Asset / action | Why it earns links |
|---|---|---|
| P1 | Open-source the benchmark harness on GitHub (client is a coder — hours, not euros) | Dev communities link to tools, not to marketing |
| P1 | Publish the thermal/battery dataset as CSV + write-up | Journalists & forums cite datasets |
| P1 | Pitch list: Silicon Republic, TheJournal tech, TU Dublin blogs, iFixit community, r/linuxlaptops, EU right-to-repair NGOs | Story = "Irish engineer builds repairable EU laptop" — genuinely newsworthy |
| P2 | Speak/sponsor Dublin JS / PyDublin / hardware meetups; `.ie` community links | Local authority + real relationships |
| P2 | Supplier & certification partner links (CE, TÜV, panel maker) with consent | Classic manufacturer link graph, free |
| — | **Never:** bought links, link farms, guest-post mills | Guidelines risk on a domain we're trying to grow |

---

## 7. Measurement (free stack)

GSC (impressions/clicks/position per cluster URL) · GA4 (engagement, assisted
conversions) · CrUX via GSC CWV report · Lighthouse CI diffs per PR · Looker Studio
one-pager for the client. Monthly ritual: 30 min reading GSC query deltas → feed next
month's content choice. **No paid rank tracker until revenue justifies it.**

**90-day success definition:** all P0 routes indexed & eligible for rich results ·
GSC impressions trending up week-over-week from week 4 · first page for ≥10 K2/K3/K5
long-tails by day 90 · GBP live (scenario A) or IE-intent pages ranking top-20 (B) ·
CWV "Good" on all core URLs in field data · ≥5 referring domains from §6 assets.

---

## 8. The 90-day plan, week by week

Effort = client hours + agency hours. P0 = do or the quarter is wasted.

| Week | Focus | Tasks (priority) | Purpose of the week | Effort |
|---|---|---|---|---|
| **1** | Instrument & decide | GSC/GA4/Bing setup + sitemap submit (P0) · domain/host decision + 301s (P0) · keyword validation pass on K1–K5 (P0) · CWV lab baseline (P0) | Nothing else is measurable or safe without this; locks the entity & host | 6h + 2h |
| **2** | On-page & schema depth | Organization/WebSite/Breadcrumb JSON-LD (P0) · title/meta template per page type from the keyword map (P0) · FAQPage on `/support` (P1) · internal-link map hero→product→compare→support (P1) | Make every shipped page maximally eligible & internally coherent | 5h + 3h |
| **3** | Local foundation | Scenario A/B decision (P0) · GBP or areaServed schema (P0) · NAP + citations batch (P1) · review-request email flow (P1) | Local visibility has the longest lead time — start now | 4h + 2h |
| **4** | Content engine on | Publish pillar "10-Year Laptop" (P0) · author + methodology pages (P1) · journal MDX pipeline live (P1) | First authority asset; everything later links to it | 8h + 2h |
| **5** | Comparison pages | `/compare` upgraded with measured table + ItemList schema (P1) · "N1 vs MacBook Air M4" post (P1) | Capture highest-intent low-difficulty queries | 6h + 2h |
| **6** | Link-magnet launch | Benchmark harness on GitHub + dataset post (P1) · pitch 6 outlets (P1) | Convert engineering work into referring domains | 6h + 3h |
| **7** | Hygiene & field data | GSC coverage + log review, fix anomalies (P1) · CrUX first read; fix regressions (P1) · CSP/headers (P2) | Protect index health before scaling content | 4h + 2h |
| **8** | Cadence + refresh | 2 cluster posts (K5, K3) (P1) · update pillar with new internal links + PAA-derived FAQs (P1) | Compounding: refresh signals + long-tail surface area | 6h + 2h |
| **9** | UX/CWV & CRO tie-in | Mobile nav + consent banner shipped (P0 for EU launch) · CWV field fixes (P1) · review velocity check (P2) | UX signals & legal trust feed both rankings and conversion | 5h + 2h |
| **10** | Local authority | Meetup talk/sponsorship (P2) · Irish press follow-up with dataset angle (P1) | Local + niche links without cash | 4h + 2h |
| **11** | Scale what works | Double down on top-3 GSC query clusters with supporting posts (P1) · merge/prune any thin draft (P2) | Allocate remaining hours to proven demand | 6h + 2h |
| **12** | SERP CTR pass | Rewrite titles/metas where impressions >1k & CTR <2% (P1) · sitelink-friendly nav labels (P2) | Same rankings, more clicks — cheapest growth left | 3h + 2h |
| **13** | Review & re-plan | Quarter report vs baseline (P0) · next-90 plan + budget call: first paid tool (rank tracker) yes/no (P0) | Close the loop; spend money only where evidence points | 3h + 3h |

**If the client only ever does five things:** week-1 instrumentation & domain decision ·
pillar post · comparison page · GitHub benchmark asset · review-request flow.
That's 80% of the expected 90-day return.

---

## 9. Budget shape (cash, per month)

| Item | € |
|---|---|
| Tools (GSC, GA4, Keyword Planner, Screaming Frog <500 URLs, Looker Studio) | 0 |
| Hosting/CDN/image edge (existing) | 0 |
| Optional from week 10: meetup sponsorship, PR distribution | 0–150 |
| **Total cash** | **≤ €150/mo** — the investment is client engineering time + agency editorial oversight |
