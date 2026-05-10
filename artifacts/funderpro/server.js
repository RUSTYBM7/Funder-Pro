import express from "express";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const STATIC_ROOT = join(__dirname, "../../funderpro_clone/funderpro.com");

const app = express();

// Serve all locally-scraped static files
app.use(express.static(STATIC_ROOT, { index: false }));

// Webpack chunk stub — returned for any missing lazy-loaded JS chunk so the
// runtime resolves the promise without throwing a ChunkLoadError.
// The push call signals webpack that the chunk loaded (with no modules).
function webpackChunkStub(chunkId) {
  return `(self["webpackChunkfunderpro"]=self["webpackChunkfunderpro"]||[]).push([[${chunkId}],{}]);`;
}

// Proxy fallback for non-chunk assets (images, fonts, CSS…)
async function proxyFromOrigin(req, res) {
  const originUrl = `https://funderpro.com${req.path}`;
  try {
    const upstream = await fetch(originUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });
    if (!upstream.ok) return res.status(upstream.status).send("Not found");
    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const buffer = Buffer.from(await upstream.arrayBuffer());
    // Cache locally
    const localPath = join(STATIC_ROOT, req.path);
    try {
      mkdirSync(dirname(localPath), { recursive: true });
      writeFileSync(localPath, buffer);
    } catch (_) { /* non-fatal */ }
    res.setHeader("Content-Type", contentType);
    return res.send(buffer);
  } catch (err) {
    console.error("Proxy error for", req.path, err.message);
    return res.status(502).send("Proxy error");
  }
}

// Route all requests
app.get("*", async (req, res) => {
  const reqPath = req.path;

  // ── Webpack lazy chunk stub ──────────────────────────────────────────────
  // Matches paths like .../build/js/5461-ae4cb310f53471a2e555.js
  const chunkMatch = reqPath.match(/\/build\/js\/(\d+)-[a-f0-9]+\.js$/);
  if (chunkMatch) {
    // File already served by express.static above; reaching here means it's missing.
    const chunkId = chunkMatch[1];
    console.log(`Stubbing missing webpack chunk ${chunkId}`);
    res.setHeader("Content-Type", "application/javascript");
    return res.send(webpackChunkStub(chunkId));
  }

  // ── HTML page routing ────────────────────────────────────────────────────
  let urlPath = reqPath;
  if (!urlPath.endsWith("/")) urlPath += "/";

  const candidates = [
    join(STATIC_ROOT, urlPath, "index.html"),
    join(STATIC_ROOT, urlPath.replace(/\/$/, ".html")),
    join(STATIC_ROOT, urlPath.replace(/\/$/, "")),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return res.sendFile(candidate);
  }

  // ── Proxy missing static assets from funderpro.com ──────────────────────
  const isAsset = /\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|gif|ico|json|map)$/i.test(reqPath);
  if (isAsset) return proxyFromOrigin(req, res);

  // Fallback: homepage
  res.sendFile(join(STATIC_ROOT, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FunderPro clone → http://0.0.0.0:${PORT}  (static: ${STATIC_ROOT})`);
});
