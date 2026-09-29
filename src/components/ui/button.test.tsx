import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Button } from "./Button";

describe("Button primitive", () => {
  it("renders an anchor when href is provided", () => {
    const html = renderToString(<Button href="/configure">Configure</Button>);
    expect(html).toContain("<a href=\"/configure\"");
    expect(html).not.toContain("<button");
  });

  it("renders a native button without href", () => {
    const html = renderToString(<Button>Save build</Button>);
    expect(html).toContain('type="button"');
  });

  it("reserves the signal colour for the signal variant only", () => {
    const signal = renderToString(<Button variant="signal">A</Button>);
    const outline = renderToString(<Button variant="outline">B</Button>);
    const ghost = renderToString(<Button variant="ghost">C</Button>);
    expect(signal).toContain("bg-signal");
    expect(signal).toContain("chamfer");
    expect(outline).not.toContain("bg-signal");
    expect(ghost).not.toContain("bg-signal");
  });

  it("explains itself when disabled (no dead-end controls)", () => {
    const html = renderToString(
      <Button disabled disabledReason="Select storage to continue">
        Add to basket
      </Button>,
    );
    expect(html).toContain("aria-disabled=\"true\"");
    expect(html).toContain("Select storage to continue");
    expect(html).toContain('role="note"');
  });

  it("keeps decorative icons out of the accessibility tree", () => {
    const html = renderToString(<Button arrow>Compare</Button>);
    expect(html).toContain('aria-hidden="true"');
  });

  it("mounts the thermal surface as a decorative, non-interactive canvas", () => {
    const html = renderToString(<Button>Reserve</Button>);
    expect(html).toContain('class="btn-thermal__canvas"');
    // Decorative: hidden from AT, and must never swallow the click.
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain("btn-thermal__canvas\" role=");
  });

  it("exposes the variant so the canvas can pick its blend mode", () => {
    expect(renderToString(<Button variant="signal">A</Button>)).toContain(
      'data-variant="signal"',
    );
    expect(renderToString(<Button variant="outline">A</Button>)).toContain(
      'data-variant="outline"',
    );
  });

  it("stays a real, focusable control — the effect is progressive enhancement", () => {
    const html = renderToString(<Button>Reserve</Button>);
    // Label text survives in the server HTML (no-JS clients and crawlers).
    expect(html).toContain("Reserve");
    expect(html).toContain("btn-thermal__label");
    // Focus ring lives on the unclipped wrapper, because the chamfer
    // clip-path would otherwise clip an outline drawn on the control itself.
    expect(html).toContain("focus-within:outline-signal");
  });

  it("marks a mid-request control as busy", () => {
    expect(renderToString(<Button busy>Reserving…</Button>)).toContain(
      'aria-busy="true"',
    );
    expect(renderToString(<Button>Save</Button>)).not.toContain("aria-busy");
  });
});
