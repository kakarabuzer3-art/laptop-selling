/**
 * Build-time image pipeline.
 *
 * Converts heavy PNG art-direction sources into lean WebP masters under
 * public/media/ and emits a typed manifest (dimensions + 8px blur
 * placeholder) so components never import binaries directly.
 *
 * Why a manifest instead of `import img from "./x.webp"`:
 *  - keeps unit tests free of binary module resolution,
 *  - removes build-time AVIF re-encoding of 2048px sources (this box OOMed),
 *  - next/image still serves AVIF/WebP variants + correct srcset at runtime.
 *
 * Usage: npm run images:optimize
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const JOBS = [
  {
    key: "heroImage",
    src: "src/media/source/n1-hero.png",
    out: "public/media/n1-hero.webp",
    width: 2048,
    quality: 82,
    altPath: "/media/n1-hero.webp",
  },
  {
    key: "detailImage",
    src: "src/media/source/n1-detail.png",
    out: "public/media/n1-detail.webp",
    width: 1400,
    quality: 82,
    altPath: "/media/n1-detail.webp",
  },
  {
    key: "frostImage",
    src: "src/media/source/n1-frost.png",
    out: "public/media/n1-frost.webp",
    width: 1600,
    quality: 82,
    altPath: "/media/n1-frost.webp",
  },
  {
    key: "abyssImage",
    src: "src/media/source/n1-abyss.png",
    out: "public/media/n1-abyss.webp",
    width: 1600,
    quality: 82,
    altPath: "/media/n1-abyss.webp",
  },
];

await mkdir("public/media", { recursive: true });

const entries = [];

for (const job of JOBS) {
  if (!existsSync(job.src)) {
    console.warn(`skip (missing source): ${job.src}`);
    continue;
  }
  const image = sharp(job.src).resize({ width: job.width, withoutEnlargement: true });
  const info = await image.webp({ quality: job.quality, effort: 6 }).toFile(job.out);

  const blur = await sharp(job.src)
    .resize({ width: 8 })
    .webp({ quality: 60 })
    .toBuffer();

  entries.push({
    key: job.key,
    src: job.altPath,
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  });

  console.log(
    `${job.out}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`,
  );
}

const manifest = `/**
 * GENERATED FILE — do not edit by hand.
 * Produced by scripts/optimize-images.mjs (npm run images:optimize).
 */
export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

${entries
  .map((e) => {
    const { key, ...asset } = e;
    return `export const ${key}: MediaAsset = ${JSON.stringify(asset, null, 2)};`;
  })
  .join("\n\n")}
`;

await writeFile("src/lib/content/media.generated.ts", manifest);
console.log("src/lib/content/media.generated.ts written");
