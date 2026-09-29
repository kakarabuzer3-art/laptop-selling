import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Hero } from "@/components/hero/Hero";
import { ProofMarquee } from "./ProofMarquee";
import { Manifesto } from "./Manifesto";
import { ChassisSticky } from "./ChassisSticky";
import { DisplayHotspots } from "./DisplayHotspots";
import { PerformanceBench } from "./PerformanceBench";
import { Colorways } from "./Colorways";
import { VariantCompare } from "./VariantCompare";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { FaqAccordion } from "./FaqAccordion";
import { FinalCta } from "./FinalCta";
import { ConsentBanner } from "@/components/commerce/ConsentBanner";
import { NavDrawer } from "@/components/layout/NavDrawer";
import { faqs, hotspots, reviews, variants, colorways } from "@/lib/content/landing";

const landing = [
  renderToString(<Hero />),
  renderToString(<ProofMarquee />),
  renderToString(<Manifesto />),
  renderToString(<ChassisSticky />),
  renderToString(<DisplayHotspots />),
  renderToString(<PerformanceBench />),
  renderToString(<Colorways />),
  renderToString(<VariantCompare />),
  renderToString(<ReviewsCarousel />),
  renderToString(<FaqAccordion />),
  renderToString(<FinalCta />),
].join("\n");

describe("Landing page — server-rendered contract", () => {
  it("keeps exactly one h1 and gives every section an h2", () => {
    expect(landing.match(/<h1/g)).toHaveLength(1);
    expect((landing.match(/<h2/g) ?? []).length).toBeGreaterThanOrEqual(9);
  });

  it("ships all narrative copy in the HTML (no JS required to read it)", () => {
    expect(landing).not.toContain("data-shown");
    expect(landing).toContain("Machined, not assembled.");
    expect(landing).toContain("Every surface, specified.");
    expect(landing).toContain("Numbers we publish.");
    expect(landing).toContain("Three anodised truths.");
  });

  it("hides the duplicated marquee row from assistive technology", () => {
    expect(landing.match(/aria-hidden="true"/g)?.length).toBeGreaterThan(2);
    expect(landing).toContain('aria-label="Awards, certifications and owner ratings"');
  });

  it("wires every hotspot marker to its spec card", () => {
    for (const spot of hotspots) {
      expect(landing).toContain(`href="#${spot.id}"`);
      expect(landing).toContain(`id="${spot.id}"`);
    }
  });

  it("renders the colorway selector as real labelled radio inputs", () => {
    for (const cw of colorways) {
      expect(landing).toContain(`id="${cw.id}"`);
      expect(landing).toContain(`for="${cw.id}"`);
      expect(landing).toContain(`data-cw="${cw.id}"`);
    }
    expect(landing.match(/name="colorway"/g)).toHaveLength(colorways.length);
    expect(landing.match(/type="radio"/g)?.length).toBeGreaterThanOrEqual(colorways.length);
  });

  it("offers exactly three variants with one centre-stage recommendation", () => {
    expect(landing.match(/Most chosen/g)).toHaveLength(1);
    for (const variant of variants) {
      expect(landing).toContain(`/configure/?model=${variant.slug}`);
    }
  });

  it("makes reviews a labelled, focusable scroll region with verified badges", () => {
    expect(landing).toContain('aria-label="Customer reviews — scroll horizontally to read all"');
    expect(landing.match(/verified purchase/g)).toHaveLength(reviews.length);
  });

  it("uses native details/summary for the FAQ (exclusive accordion)", () => {
    expect(landing.match(/<details name="faq"/g)).toHaveLength(faqs.length);
    expect(landing.match(/<summary/g)).toHaveLength(faqs.length);
  });

  it("closes with the same primary action wording as the hero (serial position)", () => {
    expect(landing.match(/Configure your N1/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it("renders no consent UI and a closed drawer without JavaScript", () => {
    expect(renderToString(<ConsentBanner />)).toBe("");
    const drawer = renderToString(<NavDrawer links={[{ label: "N1", href: "/product/n1" }]} />);
    expect(drawer).toContain('aria-expanded="false"');
    expect(drawer).toContain("hidden");
    expect(drawer).toContain('role="dialog"');
  });
});
