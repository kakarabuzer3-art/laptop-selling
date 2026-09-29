import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Hero } from "./Hero";
import { product } from "@/lib/content/product";

const html = renderToString(<Hero />);

describe("Hero — server-rendered output", () => {
  it("renders exactly one h1 containing every headline line", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    for (const line of product.hero.headlineLines) {
      expect(html).toContain(line);
    }
  });

  it("ships a single LCP image with real alt text and high fetch priority", () => {
    expect(html.match(/<img/g)).toHaveLength(1);
    expect(html).toContain("NORDVÄRK N1 laptop");
    // React 19 SSR hoists a preload link and serialises the attribute in
    // camelCase, so assert case-insensitively on both the link and the img.
    expect(html).toMatch(/fetchpriority="high"/i);
    expect(html).toContain('data-priority="true"');
    expect(html).toContain('<link rel="preload" as="image"');
  });

  it("exposes both CTAs with real destinations and price specificity", () => {
    expect(html).toContain('href="/configure/"');
    expect(html).toContain('href="/compare/"');
    expect(html).toContain("Configure your N1");
    expect(html).toContain("from €1,499 incl. VAT");
  });

  it("renders every spec chip and trust item in the HTML", () => {
    for (const chip of product.hero.chips) expect(html).toContain(chip);
    for (const item of product.hero.trustItems) expect(html).toContain(item);
  });

  it("never hides content from clients without JavaScript", () => {
    expect(html).not.toContain("data-shown");
    expect(html).not.toContain("display:none");
    expect(html).not.toContain('aria-hidden="true">Machined');
  });

  it("keeps decorative layers out of the accessibility tree", () => {
    expect(html).toContain('class="hero__bg absolute inset-0 -z-10" aria-hidden="true"');
    expect(html).toContain('aria-label="Key specifications"');
    expect(html).toContain('aria-label="Purchase assurances"');
  });

  it("labels the section and wires the heading reference", () => {
    expect(html).toContain('aria-labelledby="hero-title"');
    expect(html).toContain('id="hero-title"');
  });
});
