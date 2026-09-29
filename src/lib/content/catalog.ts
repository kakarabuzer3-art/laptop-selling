import type { ColorwayId } from "./landing";

export type ModelSlug = "n1" | "n1-pro" | "n1-studio";

export type VariantCatalog = {
  slug: ModelSlug;
  name: string;
  tagline: string;
  basePrice: number;
  highlighted: boolean;
  specs: {
    display: string;
    silicon: string;
    memory: string;
    storage: string;
    battery: string;
    ports: string;
    wireless: string;
    weight: string;
    dimensions: string;
    os: string;
    warranty: string;
    inBox: string;
  };
  sustainability: { co2eKg: number; partsYears: number; repairScore: number };
};

export const catalog: VariantCatalog[] = [
  {
    slug: "n1",
    name: "N1",
    tagline: "The everyday precision machine.",
    basePrice: 1499,
    highlighted: false,
    specs: {
      display: "14.2″ 3K tandem OLED · 120 Hz LTPO · 600 nits SDR / 1,600 peak",
      silicon: "NV-1 · 8-core CPU (4P + 4E) · 40-core GPU",
      memory: "16 GB unified, 150 GB/s (configurable to 32 GB)",
      storage: "512 GB NVMe Gen4, socketed (configurable to 1 TB)",
      battery: "72 Wh · 22 h IEC 62619 · 100 W USB-C PD 3.1",
      ports: "2× Thunderbolt 4 · HDMI 2.1 · SD Express · 3.5 mm",
      wireless: "Wi-Fi 7 · Bluetooth 5.4",
      weight: "1.09 kg",
      dimensions: "312 × 221 × 13.9 mm",
      os: "Ubuntu 26.04 certified · Fedora 43 · Windows 11",
      warranty: "3-year NORDVÄRK + 2-year EU legal guarantee",
      inBox: "N1 · 100 W GaN PSU · Torx T5 driver · fibre sleeve",
    },
    sustainability: { co2eKg: 78, partsYears: 10, repairScore: 9.3 },
  },
  {
    slug: "n1-pro",
    name: "N1 Pro",
    tagline: "Sustained load, silent.",
    basePrice: 1899,
    highlighted: true,
    specs: {
      display: "14.2″ 3K tandem OLED · 120 Hz LTPO · 800 nits SDR / 1,600 peak",
      silicon: "NV-1 Pro · 10-core CPU (6P + 4E) · 52-core GPU",
      memory: "32 GB unified, 200 GB/s (configurable to 64 GB)",
      storage: "1 TB NVMe Gen4, socketed (configurable to 2 TB)",
      battery: "76 Wh · 20 h IEC 62619 · 140 W USB-C PD 3.1",
      ports: "2× Thunderbolt 4 · HDMI 2.1 · SD Express · 3.5 mm",
      wireless: "Wi-Fi 7 · Bluetooth 5.4",
      weight: "1.14 kg",
      dimensions: "312 × 221 × 14.4 mm",
      os: "Ubuntu 26.04 certified · Fedora 43 · Windows 11",
      warranty: "3-year NORDVÄRK + 2-year EU legal guarantee",
      inBox: "N1 Pro · 140 W GaN PSU · Torx T5 driver · fibre sleeve",
    },
    sustainability: { co2eKg: 84, partsYears: 10, repairScore: 9.3 },
  },
  {
    slug: "n1-studio",
    name: "N1 Studio",
    tagline: "Colour-accurate, desktop-class.",
    basePrice: 2499,
    highlighted: false,
    specs: {
      display: "14.2″ 3K tandem OLED · 120 Hz · ΔE < 0.8 · 10-bit calibrated",
      silicon: "NV-1 Studio · 12-core CPU (8P + 4E) · 60-core GPU",
      memory: "64 GB unified, 270 GB/s",
      storage: "2 TB NVMe Gen4, socketed (configurable to 4 TB)",
      battery: "76 Wh · 18 h IEC 62619 · 140 W USB-C PD 3.1",
      ports: "2× Thunderbolt 4 · HDMI 2.1 · SD Express · 3.5 mm",
      wireless: "Wi-Fi 7 · Bluetooth 5.4",
      weight: "1.19 kg",
      dimensions: "312 × 221 × 14.4 mm",
      os: "Ubuntu 26.04 certified · Fedora 43 · Windows 11",
      warranty: "3-year NORDVÄRK + 2-year EU legal guarantee",
      inBox: "N1 Studio · 140 W GaN PSU · Torx T5 driver · colour report · fibre sleeve",
    },
    sustainability: { co2eKg: 91, partsYears: 10, repairScore: 9.3 },
  },
];

export type PricedOption = { id: string; label: string; delta: number; hint?: string };

export type ConfigGroups = {
  memory: Record<ModelSlug, PricedOption[]>;
  storage: Record<ModelSlug, PricedOption[]>;
};

export const configGroups: ConfigGroups = {
  memory: {
    n1: [
      { id: "mem-16", label: "16 GB unified", delta: 0 },
      { id: "mem-32", label: "32 GB unified", delta: 200, hint: "recommended for containers & VMs" },
    ],
    "n1-pro": [
      { id: "mem-32", label: "32 GB unified", delta: 0 },
      { id: "mem-64", label: "64 GB unified", delta: 400, hint: "large local models, monorepos" },
    ],
    "n1-studio": [{ id: "mem-64", label: "64 GB unified", delta: 0 }],
  },
  storage: {
    n1: [
      { id: "ssd-512", label: "512 GB NVMe", delta: 0 },
      { id: "ssd-1tb", label: "1 TB NVMe", delta: 150 },
    ],
    "n1-pro": [
      { id: "ssd-1tb", label: "1 TB NVMe", delta: 0 },
      { id: "ssd-2tb", label: "2 TB NVMe", delta: 250 },
    ],
    "n1-studio": [
      { id: "ssd-2tb", label: "2 TB NVMe", delta: 0 },
      { id: "ssd-4tb", label: "4 TB NVMe", delta: 450, hint: "two socketed modules, RAID-free" },
    ],
  },
};

export const finishes: Array<{ id: ColorwayId; label: string; delta: number }> = [
  { id: "cw-graphite", label: "Graphite", delta: 0 },
  { id: "cw-frost", label: "Frost", delta: 0 },
  { id: "cw-abyss", label: "Abyss", delta: 0 },
];

export type Config = {
  model: ModelSlug;
  mem: string;
  ssd: string;
  fin: ColorwayId;
};

export const defaultConfig: Config = {
  model: "n1",
  mem: "mem-16",
  ssd: "ssd-512",
  fin: "cw-graphite",
};

export function isModelSlug(value: string | null | undefined): value is ModelSlug {
  return value === "n1" || value === "n1-pro" || value === "n1-studio";
}

export function isFinish(value: string | null | undefined): value is ColorwayId {
  return value === "cw-graphite" || value === "cw-frost" || value === "cw-abyss";
}

/**
 * Server- and client-safe normalisation: anything absent, unknown or
 * incompatible with the chosen model clamps to the first valid option.
 * Shared by the RSC (shareable URLs render correctly pre-hydration) and the
 * configurator island, so SSR and client can never disagree.
 */
export function normalizeConfig(raw: Partial<Record<keyof Config, string | null | undefined>>): Config {
  const model = isModelSlug(raw.model) ? raw.model : defaultConfig.model;
  const memList = configGroups.memory[model];
  const ssdList = configGroups.storage[model];
  const mem = memList.find((o) => o.id === raw.mem) ?? memList[0]!;
  const ssd = ssdList.find((o) => o.id === raw.ssd) ?? ssdList[0]!;
  const fin = isFinish(raw.fin) ? raw.fin : defaultConfig.fin;
  return { model, mem: mem.id, ssd: ssd.id, fin };
}

export function priceFor(config: Config): number {
  const variant = catalog.find((v) => v.slug === config.model)!;
  const mem = configGroups.memory[config.model].find((o) => o.id === config.mem);
  const ssd = configGroups.storage[config.model].find((o) => o.id === config.ssd);
  const fin = finishes.find((f) => f.id === config.fin);
  return variant.basePrice + (mem?.delta ?? 0) + (ssd?.delta ?? 0) + (fin?.delta ?? 0);
}

export function describeConfig(config: Config): string[] {
  const variant = catalog.find((v) => v.slug === config.model)!;
  const mem = configGroups.memory[config.model].find((o) => o.id === config.mem);
  const ssd = configGroups.storage[config.model].find((o) => o.id === config.ssd);
  const fin = finishes.find((f) => f.id === config.fin);
  return [variant.name, mem?.label ?? "", ssd?.label ?? "", fin?.label ?? ""].filter(Boolean);
}

/** Rows for the comparison matrix — single source for /compare and tests. */
export function comparisonRows(): Array<{ label: string; values: [string, string, string] }> {
  const pick = (fn: (v: VariantCatalog) => string): [string, string, string] => [
    fn(catalog[0]!),
    fn(catalog[1]!),
    fn(catalog[2]!),
  ];
  return [
    { label: "Price from (incl. VAT)", values: pick((v) => `€${v.basePrice.toLocaleString("en-IE")}`) },
    { label: "Display", values: pick((v) => v.specs.display) },
    { label: "Silicon", values: pick((v) => v.specs.silicon) },
    { label: "Memory", values: pick((v) => v.specs.memory) },
    { label: "Storage", values: pick((v) => v.specs.storage) },
    { label: "Battery", values: pick((v) => v.specs.battery) },
    { label: "Weight", values: pick((v) => v.specs.weight) },
    { label: "Dimensions", values: pick((v) => v.specs.dimensions) },
    { label: "Ports", values: pick((v) => v.specs.ports) },
    { label: "Wireless", values: pick((v) => v.specs.wireless) },
    { label: "Certified OS", values: pick((v) => v.specs.os) },
    { label: "Warranty", values: pick((v) => v.specs.warranty) },
    { label: "Repairability (iFixit)", values: pick((v) => `${v.sustainability.repairScore} / 10`) },
    { label: "Cradle-to-gate CO₂e", values: pick((v) => `${v.sustainability.co2eKg} kg`) },
    { label: "Parts availability", values: pick((v) => `${v.sustainability.partsYears} years`) },
  ];
}
