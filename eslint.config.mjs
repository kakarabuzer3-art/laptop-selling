import next from "eslint-config-next";

/**
 * ESLint 9 flat config.
 * `eslint-config-next` ships a ready flat-config array; we extend it with
 * project-specific ignores and a couple of tightened rules.
 */
const config = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "src/fonts/**",
      "src/media/**",
    ],
  },
  {
    rules: {
      "@next/next/no-img-element": "error",
      "react/no-unescaped-entities": "error",
    },
  },
];

export default config;
