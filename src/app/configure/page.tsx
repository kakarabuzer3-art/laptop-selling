import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ConfigureClient } from "./configure-client";

export const metadata: Metadata = {
  title: "Configure your N1 — price in real time",
  description:
    "Configure a NORDVÄRK N1: model, unified memory, socketed storage and anodised finish, priced live including VAT. Your build lives in the URL — share or bookmark it.",
  alternates: { canonical: "/configure" },
};

/**
 * Stays a server component (metadata + static shell are prerendered); the URL
 * state is resolved inside the client island so the route can be statically
 * exported.
 */
export default function ConfigurePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Configure" }]} />
      <PageHero
        tight
        kicker="Configurator"
        title="Four minutes to your machine."
        lead="Every choice is priced in real time, VAT included. Your build lives in the URL — share it, bookmark it, or come back and resume it."
      >
        <p className="caption mt-7">
          Step 1 of 4 · progress saves on this device · reservation holds price 72 h · no payment now
        </p>
      </PageHero>
      <section className="container-x py-16 md:py-24" aria-label="Configuration">
        <ConfigureClient />
      </section>
    </>
  );
}
