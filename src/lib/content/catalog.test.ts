import { describe, expect, it } from "vitest";
import {
  normalizeConfig,
  priceFor,
  describeConfig,
  comparisonRows,
  defaultConfig,
  catalog,
} from "./catalog";

describe("Catalog invariants", () => {
  it("defaults to the entry model with first options", () => {
    expect(normalizeConfig({})).toEqual(defaultConfig);
  });

  it("clamps unknown models, options and finishes to safe values", () => {
    const config = normalizeConfig({
      model: "n1-ultra",
      mem: "mem-512",
      ssd: "ssd-9tb",
      fin: "cw-rose-gold",
    });
    expect(config).toEqual(defaultConfig);
  });

  it("clamps memory/storage that the chosen model cannot ship", () => {
    const config = normalizeConfig({ model: "n1", mem: "mem-64", ssd: "ssd-4tb" });
    expect(config.model).toBe("n1");
    expect(config.mem).toBe("mem-16");
    expect(config.ssd).toBe("ssd-512");
  });

  it("keeps valid shared option ids when switching model", () => {
    const config = normalizeConfig({ model: "n1-pro", mem: "mem-32", ssd: "ssd-2tb" });
    expect(config.mem).toBe("mem-32");
    expect(config.ssd).toBe("ssd-2tb");
  });

  it("prices configurations additively and VAT-inclusively", () => {
    expect(priceFor(defaultConfig)).toBe(1499);
    expect(
      priceFor(normalizeConfig({ model: "n1", mem: "mem-32", ssd: "ssd-1tb" })),
    ).toBe(1499 + 200 + 150);
    expect(priceFor(normalizeConfig({ model: "n1-studio" }))).toBe(2499);
  });

  it("describes a build in human order: model, memory, storage, finish", () => {
    expect(describeConfig(defaultConfig)).toEqual([
      "N1",
      "16 GB unified",
      "512 GB NVMe",
      "Graphite",
    ]);
  });

  it("exposes one comparison row set with a value per variant", () => {
    const rows = comparisonRows();
    expect(rows.length).toBeGreaterThanOrEqual(14);
    for (const row of rows) {
      expect(row.values).toHaveLength(catalog.length);
      for (const value of row.values) expect(value.length).toBeGreaterThan(0);
    }
  });

  it("marks exactly one variant as recommended", () => {
    expect(catalog.filter((v) => v.highlighted)).toHaveLength(1);
  });
});
