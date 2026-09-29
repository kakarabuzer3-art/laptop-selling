export type LegalSection = { heading: string; paragraphs: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

export const imprint: LegalDoc = {
  title: "Imprint",
  updated: "2026-09-01",
  intro:
    "Information required under Irish company law and the EU E-Commerce Directive (2000/31/EC), as transposed by S.I. 68/2003.",
  sections: [
    {
      heading: "Trader",
      paragraphs: [
        "NORDVÄRK Technology Limited, 12 Granby Row, Dublin 1, D01 X8K4, Ireland.",
        "Registered in Dublin, CRO 674412. VAT IE3744912KH. Share capital €25,000.",
        "Manufacturing partner: NORDVÄRK AB, Registrgatan 4, 211 37 Malmö, Sweden (org. nr 559112-8841).",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Email: hello@nordvark.example · Phone: +353 1 912 0042 (Mon–Fri, 09:00–17:00 IST).",
        "Managing director: R. Lindqvist. Responsible for content: the same.",
      ],
    },
    {
      heading: "Disputes",
      paragraphs: [
        "We participate in the EU Online Dispute Resolution platform (ec.europa.eu/consumers/odr).",
        "Consumer complaints are answered in writing within 5 working days, in plain language.",
      ],
    },
  ],
};

export const privacy: LegalDoc = {
  title: "Privacy policy",
  updated: "2026-09-01",
  intro:
    "We process as little as a shop can. This policy is the whole policy — there is no partner-list appendix, because there are no partners receiving your data.",
  sections: [
    {
      heading: "Controller",
      paragraphs: [
        "NORDVÄRK Technology Limited, 12 Granby Row, Dublin 1, Ireland. DPO: dpo@nordvark.example.",
      ],
    },
    {
      heading: "What we process, and why",
      paragraphs: [
        "Order data (name, address, payment reference, configuration): Article 6(1)(b) GDPR, to fulfil your contract. Retained 7 years for tax law, then deleted.",
        "Support correspondence: Article 6(1)(f), legitimate interest in answering you. Retained 24 months.",
        "Analytics, only if you opt in via the consent banner: Article 6(1)(a). Aggregated, EU-hosted, no ad-tech, no cross-site tracking. Retained 13 months.",
        "Consent record itself: Article 7(1), to prove what you chose. Retained until you change it.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Strictly necessary: session and consent-storage entries only. No cookie is set for analytics or marketing before an affirmative opt-in, and 'Reject all' sets nothing beyond the consent record.",
        "You can change or withdraw consent at any time from the consent control in the footer; withdrawal is as easy as granting.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Access, rectification, erasure, restriction, portability, objection (Articles 15–21 GDPR), and complaint to the Irish Data Protection Commission (dpc.ie).",
        "Requests are answered within one month, free of charge, without requiring an account.",
      ],
    },
    {
      heading: "Transfers",
      paragraphs: [
        "No transfers outside the EEA. Hosting, mail and analytics all reside in EU regions; our subprocessor list is this paragraph: our host, our mail provider, our payments provider (PCI-DSS, EU region).",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of sale",
  updated: "2026-09-01",
  intro:
    "Plain-language terms for consumers in the EU/EEA. Where this summary and the law disagree, the law wins — and we will fix the summary.",
  sections: [
    {
      heading: "Prices and delivery",
      paragraphs: [
        "All prices include VAT at the rate of the delivery country. Delivery is free across the EU/EEA; configured machines dispatch from Malmö within 3–5 working days.",
      ],
    },
    {
      heading: "Right of withdrawal — 14 days",
      paragraphs: [
        "Under Directive 2011/83/EU you may withdraw within 14 days of delivery without giving any reason. We include a prepaid label in every EU shipment and refund within 5 working days of the machine arriving back, including original delivery cost.",
        "Engraved or customer-engraved units are exempt only where you explicitly confirmed the exemption at checkout, as the Directive requires.",
      ],
    },
    {
      heading: "Legal guarantee — 2 years",
      paragraphs: [
        "Under Directive (EU) 2019/771 every machine carries the 24-month legal guarantee: defects present at delivery are remedied by repair, replacement or refund, at our cost including shipping.",
        "On top of it, our commercial warranty runs 3 years and covers the battery at ≥80% capacity for 3 years or 1,000 cycles.",
      ],
    },
    {
      heading: "Repairs and parts",
      paragraphs: [
        "Spare parts remain listed, priced and available for 10 years from the last unit sold of each model, at published prices. Opening your machine with the included driver does not void any warranty.",
      ],
    },
    {
      heading: "Reservations",
      paragraphs: [
        "Online reservations hold a configuration and price for 72 hours and take no payment. They are not a contract until an order confirmation is issued.",
      ],
    },
  ],
};
