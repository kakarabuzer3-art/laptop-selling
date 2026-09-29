import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Emit real, standalone .html files into ./out instead of a Node server.
  // Every route below is prerendered at build time, so the site can be hosted
  // on any static file server (or opened straight from disk).
  output: "export",
  trailingSlash: true,
  images: {
    // Modern formats first; Next falls back for older clients automatically.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 82, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // The default optimiser is a server route, which a static export cannot
    // run. Source art is already pre-optimised to WebP by
    // `npm run images:optimize`, so files are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
