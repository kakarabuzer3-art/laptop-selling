import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Configurator } from "@/components/product/Configurator";
import { ComparisonMatrix } from "@/components/product/ComparisonMatrix";
import { SpecTable } from "@/components/product/SpecTable";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { normalizeConfig, comparisonRows, defaultConfig } from "@/lib/content/catalog";
import { imprint } from "@/lib/content/legal";

describe("Configure route — server-rendered contract", () => {
  const html = renderToString(
    <Configurator initial={defaultConfig} hadParams={false} />,
  );

  it("renders the live price for the default build, VAT included", () => {
    expect(html).toContain("€1,499");
    expect(html).toContain("incl. VAT");
    expect(html).toContain('aria-live="polite"');
  });

  it("renders four labelled fieldsets with real radio inputs", () => {
    expect(html.match(/<fieldset/g)).toHaveLength(4);
    expect(html.match(/<legend/g)).toHaveLength(4);
    expect(html).toContain('name="model"');
    expect(html).toContain('name="mem"');
    expect(html).toContain('name="ssd"');
    expect(html).toContain('name="fin"');
  });

  it("pre-selects the default build so shared URLs render truthfully", () => {
    expect(html).toContain('checked=""');
    expect(html).toContain("Reserve this build — €1,499");
  });

  it("shows the endowed-progress bar and auto-save copy", () => {
    // React SSR splits interpolated text with comment nodes, so assert on
    // the stable fragments: the 25% endowed width and the tail of the line.
    expect(html).toContain('style="width:25%"');
    expect(html).toContain("of 4 · progress saves automatically");
  });

  it("renders a different price server-side for a shared pro build", () => {
    const pro = normalizeConfig({ model: "n1-pro", mem: "mem-64", ssd: "ssd-2tb" });
    const proHtml = renderToString(<Configurator initial={pro} hadParams />);
    expect(proHtml).toContain("€2,549");
    expect(proHtml).toContain("64 GB unified");
  });
});

describe("Compare / product / legal route fragments", () => {
  it("renders the full matrix with a column per variant", () => {
    const html = renderToString(<ComparisonMatrix highlight="n1-pro" />);
    for (const row of comparisonRows()) expect(html).toContain(row.label);
    expect(html.match(/scope="col"/g)).toHaveLength(4);
    expect(html).toContain("matrix__hl");
    expect(html).toContain('role="region"');
  });

  it("renders spec tables as real tables with row scopes", () => {
    const html = renderToString(
      <SpecTable
        caption="test"
        rows={[
          { label: "Weight", value: "1.09 kg" },
          { label: "Battery", value: "72 Wh" },
        ]}
      />,
    );
    expect(html.match(/<th scope="row"/g)).toHaveLength(2);
    expect(html).toContain("1.09 kg");
  });

  it("renders the legal pack with one section per heading", () => {
    const html = renderToString(<LegalLayout doc={imprint} crumb="Imprint" />);
    expect(html.match(/<h2/g)).toHaveLength(imprint.sections.length);
    expect(html).toContain("CRO 674412");
    expect(html).toContain('aria-current="page"');
  });

  it("keeps subpage headers to a single h1 with breadcrumb context", () => {
    const crumbs = renderToString(
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />,
    );
    const hero = renderToString(<PageHero tight kicker="k" title="Compare" />);
    expect(crumbs).toContain('aria-label="Breadcrumb"');
    expect(hero.match(/<h1/g)).toHaveLength(1);
  });
});
