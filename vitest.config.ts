import { defineConfig } from "vitest/config";
import path from "node:path";

const src = path.resolve(import.meta.dirname, "src");

export default defineConfig({
  // Match Next's SWC output: React 19 automatic JSX runtime in tests.
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: [
      { find: /^next\/image$/, replacement: path.join(src, "test/next-image-stub.tsx") },
      { find: /^next\/link$/, replacement: path.join(src, "test/next-link-stub.tsx") },
      { find: /^next\/navigation$/, replacement: path.join(src, "test/next-navigation-stub.ts") },
      { find: /^@\//, replacement: src + path.sep },
    ],
  },
});
