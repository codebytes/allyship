import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export function createPreviewServer() {
  const root = fileURLToPath(new URL("../build", import.meta.url));
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".pdf": "application/pdf", ".json": "application/json" };
  return createServer(async (request, response) => {
    let path;
    try {
      path = resolve(root, `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`);
    } catch {
      response.writeHead(400).end("Invalid URL");
      return;
    }
    if (path === root) path = resolve(root, "index.html");
    if (!path.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    try {
      const content = await readFile(path);
      response.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream" }).end(content);
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "EISDIR") response.writeHead(404).end("Not found");
      else {
        console.error(error);
        response.writeHead(500).end("Unable to read preview asset");
      }
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createPreviewServer();
  server.on("error", (error) => { console.error(error); process.exitCode = 1; });
  server.listen(Number(process.env.PORT || 4173), "127.0.0.1", () => {
    console.log(`Allyship preview: http://127.0.0.1:${server.address().port}`);
  });
}
