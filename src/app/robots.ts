import type { MetadataRoute } from "next";

// Required by `output: "export"`: metadata routes are otherwise treated as
// dynamic and a static build has no server to render them on demand.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://nordvark.example/sitemap.xml",
  };
}
