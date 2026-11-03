import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("../", import.meta.url));
const marp = fileURLToPath(import.meta.resolve("@marp-team/marp-cli/marp-cli.js"));
const systemChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = process.env.CHROME_PATH || (existsSync(chromium.executablePath()) ? chromium.executablePath() : existsSync(systemChrome) ? systemChrome : undefined);
mkdirSync(new URL("../build/", import.meta.url), { recursive: true });
for (const directory of ["img", "themes", "assets"]) {
  cpSync(new URL(`../slides/${directory}`, import.meta.url), new URL(`../build/${directory}`, import.meta.url), { recursive: true });
}

for (const [filename, options] of [
  ["index.html", ["--bespoke.osc=false"]],
  ...process.argv.includes("--html-only") ? [] : [["Slides.pdf", ["--pdf", "--pdf-outlines", "--allow-local-files"]]],
]) {
  const result = spawnSync(process.execPath, [
    marp, "--no-stdin", "--html", "--theme-set", "slides/themes",
    ...options, "-o", `build/${filename}`, "--", "slides/Slides.md",
  ], { cwd: root, stdio: "inherit", env: { ...process.env, ...(browser ? { CHROME_PATH: browser } : {}) } });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Marp export failed: ${filename} (exit ${result.status}, signal ${result.signal}).`);
}
