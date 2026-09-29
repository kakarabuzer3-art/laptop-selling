import type { MetadataRoute } from "next";

// Required by `output: "export"`: metadata routes are otherwise treated as
// dynamic and a static build has no server to render them on demand.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/product/n1",
    "/product/n1-pro",
    "/product/n1-studio",
    "/compare",
    "/configure",
    "/support",
    "/legal/imprint",
    "/legal/privacy",
    "/legal/terms",
  ];
  return routes.map((route) => ({
    url: `https://nordvark.example${route}`,
    lastModified: new Date("2026-09-28"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/product") ? 0.8 : 0.5,
  }));
}
