/**
 * Minimal zero-dependency static server for the exported site in ./out.
 *
 * `output: "export"` means there is no `next start` to fall back on, and the
 * pages use `trailingSlash: true`, so this resolves directory requests to their
 * index.html exactly as a static host would.
 *
 * Usage: node scripts/serve-static.mjs [port]
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.argv[2] ?? 3000);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

/** Map a request path to a real file, mirroring trailingSlash export output. */
async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  // Block traversal above the export root.
  const base = path.join(root, path.normalize(clean).replace(/^([/\\])+/, ""));
  if (!base.startsWith(root)) return null;

  for (const candidate of [
    path.join(base, "index.html"),
    `${base}.html`,
    base,
  ]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");

  if (!file) {
    const notFound = path.join(root, "404.html");
    const body = (await isFile(notFound)) ? await readFile(notFound) : "404 Not Found";
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(body);
    return;
  }

  const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const body = await readFile(file);
  res.writeHead(200, {
    "content-type": type,
    // Hashed assets under /_next/static are safe to cache hard.
    "cache-control": file.includes(`${path.sep}_next${path.sep}static${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  });
  res.end(body);
});

server.listen(port, () => {
  console.log(`Serving ./out at http://localhost:${port}`);
});
