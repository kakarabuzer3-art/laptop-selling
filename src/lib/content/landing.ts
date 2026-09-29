/**
 * Typed content for the landing narrative sections (§03–§16).
 * Same contract rule as product.ts: components never fetch, never parse —
 * a future CMS adapter replaces this file only.
 */

export const proofItems = [
  "Red Dot Award 2026 — Product Design",
  "iFixit repairability 9.3 / 10",
  "EU Right-to-Repair compliant",
  "TÜV-certified fanless thermals",
  "4.8 / 5 from 1,284 verified owners",
  "Carbon-neutral assembly, Malmö",
  "10-year parts availability",
  "CE · EPEAT Gold · TCO 9",
];

export const manifesto = {
  lines: [
    "A laptop should be",
    "a tool, not a tenant.",
    "Yours to open.",
    "Yours to keep.",
  ],
  accentWord: "keep.",
  body:
    "Every screw on the N1 is a standard Torx. Every part is listed, priced and stocked for a decade. We publish our thermal data, our battery cycle curves and our failure rates — because trust is a specification too.",
};

export const chassisPanels = [
  {
    index: "01",
    title: "One billet, zero flex",
    body:
      "The unibody is milled from a single 6000-series aluminium billet over 41 minutes. Torsional rigidity measures 3.1× the class average — there is simply nothing to bend.",
    spec: "3.1× class rigidity · 0.4 mm wall",
  },
  {
    index: "02",
    title: "Fanless, by physics",
    body:
      "A vapour chamber bonded to the chassis spreads 28 W across the entire deck. Under sustained load the keyboard stays at skin temperature. Silence, measured at 0.0 dBA.",
    spec: "28 W sustained · 0.0 dBA",
  },
  {
    index: "03",
    title: "Openable in 90 seconds",
    body:
      "Eight standard Torx screws, no glue, no plectrum theatre. The battery, board and ports are modular — replaced with one screwdriver we ship in the box.",
    spec: "8 screws · 0 adhesive · 1 screwdriver",
  },
];

export const hotspots = [
  {
    id: "hs-1",
    x: "26%",
    y: "34%",
    label: "3K OLED, 120 Hz",
    detail:
      "14″ 3024×1964 tandem OLED, 120 Hz LTPO, 1,600 nits peak, calibrated to ΔE < 1 at the factory.",
  },
  {
    id: "hs-2",
    x: "47%",
    y: "72%",
    label: "1.5 mm key travel",
    detail:
      "Scissor mechanism with 1.5 mm travel and a 62 g actuation curve tuned over 14 prototypes.",
  },
  {
    id: "hs-3",
    x: "71%",
    y: "63%",
    label: "Glass haptic pad",
    detail:
      "Pressure-sensing haptic trackpad, 120 mm × 78 mm, with adjustable click emulation.",
  },
  {
    id: "hs-4",
    x: "12%",
    y: "66%",
    label: "Ports that last",
    detail:
      "2× TB4, HDMI 2.1, SD Express, 3.5 mm — all on socketed daughterboards, all replaceable.",
  },
];

export const benchmarks = [
  { label: "Sustained compile (linux kernel, allyesconfig)", value: 1.8, suffix: "×", note: "vs M3-class 14″ ultrabook", bar: 90 },
  { label: "Battery, real work (250 nit, Wi-Fi)", value: 22, suffix: " h", note: "IEC 62619 measured", bar: 96 },
  { label: "Charge 0→80 %", value: 38, suffix: " min", note: "100 W USB-C PD 3.1", bar: 74 },
  { label: "Fan noise under load", value: 0, suffix: " dBA", note: "there is no fan", bar: 4 },
];

export type ColorwayId = "cw-graphite" | "cw-frost" | "cw-abyss";

export const colorways: Array<{
  id: ColorwayId;
  name: string;
  hex: string;
}> = [
  { id: "cw-graphite", name: "Graphite", hex: "#2b2e31" },
  { id: "cw-frost", name: "Frost", hex: "#c9ccd1" },
  { id: "cw-abyss", name: "Abyss", hex: "#101826" },
];

export const variants = [
  {
    slug: "n1",
    name: "N1",
    price: 1499,
    tagline: "The everyday precision machine.",
    specs: ["16 GB unified memory", "512 GB NVMe", "14″ 3K OLED 120 Hz", "1.09 kg"],
    highlighted: false,
  },
  {
    slug: "n1-pro",
    name: "N1 Pro",
    price: 1899,
    tagline: "Sustained load, silent.",
    specs: ["32 GB unified memory", "1 TB NVMe", "14″ 3K OLED 120 Hz", "1.14 kg"],
    highlighted: true,
  },
  {
    slug: "n1-studio",
    name: "N1 Studio",
    price: 2499,
    tagline: "Colour-accurate, desktop-class.",
    specs: ["64 GB unified memory", "2 TB NVMe", "14″ 3K OLED, ΔE < 0.8", "1.19 kg"],
    highlighted: false,
  },
];

export const reviews = [
  {
    quote:
      "First laptop in fifteen years of engineering that I haven't wanted to open on day one — because it already opens, and every part inside has a part number.",
    name: "Aoife N.",
    role: "Staff engineer, Dublin",
    rating: 5,
  },
  {
    quote:
      "It compiles our monorepo faster than the desk workstation next to it, and the only thing I hear is the room.",
    name: "Marek K.",
    role: "Platform lead, Warsaw",
    rating: 5,
  },
  {
    quote:
      "Spilled coffee in month nine. Ordered the keyboard deck module on Tuesday, fitted it Thursday with the included driver. Still furious it was that easy.",
    name: "Lena S.",
    role: "Designer, Berlin",
    rating: 4,
  },
  {
    quote:
      "Bought it for the battery claim, kept it for the hinge. Two winters of trains between Malmö and Copenhagen: zero flex, zero creak.",
    name: "Jonas P.",
    role: "Consultant, Copenhagen",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "How repairable is the N1, really?",
    a: "iFixit scores it 9.3/10. Battery, keyboard deck, ports, board and display are modular, held by eight standard Torx screws with no adhesive. Every part is listed with a public price and stocked for 10 years from purchase.",
  },
  {
    q: "What does the 2-year EU legal guarantee cover?",
    a: "Everything EU Directive 2019/771 requires, without argument: defects present at delivery are remedied by repair, replacement or refund for 24 months — on top of our own 3-year NORDVÄRK warranty in all EU/EEA states.",
  },
  {
    q: "Can I return it if it isn't for me?",
    a: "Yes. 14 days from delivery, no reason needed, as EU distance-selling law provides. We include a prepaid return label in every EU shipment and refund within 5 working days of arrival.",
  },
  {
    q: "Does it run Linux properly?",
    a: "First-class. Ubuntu 26.04 and Fedora 43 are certified: suspend, haptics, colour profile and the haptic pad all work out of the box. Firmware updates ship via LVFS/fwupd.",
  },
  {
    q: "When does it ship to Ireland and the EU?",
    a: "Configured machines leave Malmö within 3–5 working days. Delivery is free and duty-paid across the EU/EEA; Irish orders typically arrive on day 4.",
  },
];

export const finalCta = {
  kicker: "Configured in Malmö, at your desk in days",
  title: ["Build the machine", "you'll keep."],
  body:
    "Four minutes to configure. Ten years of parts behind it. Free EU delivery and a 14-day return window, in writing.",
  primary: { label: "Configure your N1", href: "/configure/", hint: "from €1,499 incl. VAT" },
  secondary: { label: "Talk to an engineer", href: "/support/#contact-title" },
  trust: ["Free EU delivery", "14-day returns", "2-year legal guarantee", "10-year parts"],
};
