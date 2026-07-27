/**
 * Railway-friendly static file server (zero deps, Node only).
 * Listens on process.env.PORT — required for public networking.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json",
  ".webmanifest": "application/manifest+json",
};

function safeJoin(root, reqPath) {
  const decoded = decodeURIComponent((reqPath || "/").split("?")[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const full = path.join(root, normalized);
  if (!full.startsWith(root)) return null;
  return full;
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];

  // Healthcheck for Railway / load balancers
  if (urlPath === "/health" || urlPath === "/healthz") {
    return send(res, 200, "ok", { "Content-Type": "text/plain; charset=utf-8" });
  }

  let filePath = safeJoin(ROOT, urlPath === "/" ? "/index.html" : urlPath);
  if (!filePath) return send(res, 403, "Forbidden");

  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) {
      // SPA-ish fallback: unknown paths → index.html (except asset-looking paths)
      if (path.extname(urlPath) === "") {
        filePath = path.join(ROOT, "index.html");
      } else {
        return send(res, 404, "Not Found", { "Content-Type": "text/plain; charset=utf-8" });
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    const isImmutable = ext === ".js" || ext === ".css" || ext === ".png" || ext === ".woff2";

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        return send(res, 500, "Server Error", { "Content-Type": "text/plain; charset=utf-8" });
      }
      send(res, 200, data, {
        "Content-Type": type,
        "Cache-Control": isImmutable ? "public, max-age=3600" : "no-cache",
      });
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`[api-hacking-notes] listening on http://${HOST}:${PORT}`);
});
