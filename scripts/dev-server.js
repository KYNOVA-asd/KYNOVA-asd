const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 5173);
const root = process.cwd();

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

const resolveRequestPath = (url) => {
  const parsedUrl = new URL(url, `http://localhost:${port}`);
  const cleanPath =
    parsedUrl.pathname === "/" || parsedUrl.pathname.endsWith("/")
      ? `${parsedUrl.pathname}index.html`
      : parsedUrl.pathname;
  const resolvedPath = path.normalize(path.join(root, decodeURIComponent(cleanPath)));

  if (!resolvedPath.startsWith(root)) {
    return null;
  }

  return resolvedPath;
};

const server = http.createServer((request, response) => {
  const filePath = resolveRequestPath(request.url);

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const type = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": type });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`Portfolio listo en http://localhost:${port}`);
});
