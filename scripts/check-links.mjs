/**
 * Internal link + asset checker for the static export in ./out.
 *
 * `output: "export"` ships plain files with no server, so a bad href or a
 * missing asset is a silent 404 in production. This walks every emitted .html
 * file and asserts that each internal href resolves to a real file/dir and that
 * each `id="..."` fragment target actually exists on the target page.
 *
 * Run after `npm run build`:  node scripts/check-links.mjs
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

/** Recursively collect every .html file under `dir`. */
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

/**
 * Strip query/fragment and percent-decode the path. Next emits dynamic-route
 * chunks with the literal bracket encoded (`%5Bslug%5D`), which is what is
 * actually on disk, so decoding is required before hitting the filesystem.
 */
function decodePath(urlPath) {
  const clean = urlPath.split("#")[0].split("?")[0];
  try {
    return decodeURIComponent(clean);
  } catch {
    return clean;
  }
}

/** Map an href's path portion to the file that would actually be served. */
async function resolves(urlPath) {
  const clean = decodePath(urlPath);
  if (clean === "" || clean === "/") return exists(path.join(root, "index.html"));
  const base = path.join(root, clean);
  if (await exists(base)) return true;
  // trailingSlash: true means /compare/ is served by compare/index.html
  if (await exists(path.join(base, "index.html"))) return true;
  return exists(`${base}.html`);
}

const files = await htmlFiles(root);
const idCache = new Map();
async function idsOf(file) {
  if (!idCache.has(file)) {
    const html = await readFile(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

/** Find the page file that serves a given path, for fragment checking. */
async function pageFor(urlPath) {
  const clean = decodePath(urlPath);
  if (clean === "" || clean === "/") return path.join(root, "index.html");
  const base = path.join(root, clean);
  for (const candidate of [path.join(base, "index.html"), `${base}.html`]) {
    if (await exists(candidate)) return candidate;
  }
  return null;
}

const problems = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const refs = [
    ...[...html.matchAll(/\shref="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrc="([^"]+)"/g)].map((m) => m[1]),
  ];

  for (const ref of refs) {
    // Skip external URLs, pure fragments, and non-navigational schemes.
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(ref)) continue;
    if (ref.startsWith("#")) {
      const ok = (await idsOf(file)).has(ref.slice(1));
      if (!ok) problems.push(`${path.relative(root, file)} -> ${ref} (missing id on same page)`);
      checked++;
      continue;
    }
    if (!ref.startsWith("/")) continue;

    checked++;
    if (!(await resolves(ref))) {
      problems.push(`${path.relative(root, file)} -> ${ref} (no such file)`);
      continue;
    }
    if (ref.includes("#")) {
      const target = await pageFor(ref);
      const [page, frag] = ref.split("#");
      if (target && !(await idsOf(target)).has(frag)) {
        problems.push(`${path.relative(root, file)} -> ${ref} (missing id on target page)`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`✗ ${problems.length} broken internal reference(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(`✓ ${checked} internal references across ${files.length} HTML files all resolve.`);
