import type { Metadata, Viewport } from "next";
import "./globals.css";
import { clashDisplay, generalSans } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ConsentBanner } from "@/components/commerce/ConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://nordvark.example"),
  title: {
    default: "NORDVÄRK N1 — Machined for focus",
    template: "%s — NORDVÄRK",
  },
  description:
    "The NORDVÄRK N1: a 1.09 kg, 14-inch 3K OLED laptop milled from a single aluminium billet. 22-hour battery, fanless silence, repairable for 10 years. Engineered in Malmö, assembled in the EU.",
  applicationName: "NORDVÄRK",
  authors: [{ name: "NORDVÄRK AB" }],
  keywords: [
    "premium laptop",
    "aluminium laptop",
    "OLED laptop",
    "repairable laptop",
    "EU assembled laptop",
  ],
  openGraph: {
    type: "website",
    siteName: "NORDVÄRK",
    locale: "en_IE",
    title: "NORDVÄRK N1 — Machined for focus",
    description:
      "1.09 kg of anodised aluminium, 22 hours of battery, 14-inch 3K OLED. The laptop that gets out of the way.",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090a",
  colorScheme: "dark",
};

/**
 * ~40 bytes, runs before first paint: flips html[data-js] so reveal-hidden
 * states can never apply to a no-JS client (crawlers included).
 */
const BOOT = "document.documentElement.dataset.js='1';";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${generalSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body className="noise">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-80 focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ConsentBanner />
      </body>
    </html>
  );
}
