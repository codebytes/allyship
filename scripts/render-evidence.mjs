import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const charts = ["wealth-2022", "film-roles-2025", "film-absence-2025", "lgbtq-workplace-2023", "web-access-2026"];
const escape = (text) => String(text).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
})[character]);

for (const name of charts) {
  const asset = fileURLToPath(new URL(`../slides/assets/${name}`, import.meta.url));
  const spec = JSON.parse(readFileSync(`${asset}.json`, "utf8"));
  const series = spec.series[0];
  if (spec.type !== "bar" || spec.series.length !== 1 || !series.values.length) throw new Error(`Unsupported chart: ${name}`);
  for (const point of series.values) {
    if (!point.label || typeof point.value !== "number" || !Number.isFinite(point.value) || point.value < 0) {
      throw new Error(`Invalid point in ${name}`);
    }
  }
  for (const color of [spec.background, spec.foreground, spec.grid, series.color]) {
    if (!/^#[0-9a-f]{6}$/i.test(color)) throw new Error(`Invalid color in ${name}`);
  }
  const { width, height } = spec;
  const largest = Math.max(...series.values.map(({ value }) => value));
  const step = largest <= 20 ? 5 : largest <= 50 ? 10 : largest <= 100 ? 20 : largest <= 500 ? 100 : 200;
  const maximum = Math.max(step, Math.ceil(largest / step) * step);
  const left = 285;
  const right = width - 80;
  const top = 105;
  const bottom = height - 80;
  const row = (bottom - top) / series.values.length;
  const x = (value) => left + (value / maximum) * (right - left);
  const elements = [];
  for (let tick = 0; tick <= maximum; tick += step) {
    elements.push(`<line x1="${x(tick)}" y1="${top}" x2="${x(tick)}" y2="${bottom}" stroke="${spec.grid}"/>`);
    elements.push(`<text x="${x(tick)}" y="${bottom + 28}" text-anchor="middle" font-size="18">${tick}</text>`);
  }
  for (const [index, { label, value }] of series.values.entries()) {
    const center = top + row * (index + 0.5);
    elements.push(`<text x="${left - 20}" y="${center + 8}" text-anchor="end" font-size="24">${escape(label)}</text>`);
    elements.push(`<rect x="${left}" y="${center - 14}" width="${x(value) - left}" height="28" rx="3" fill="${series.color}"/>`);
    elements.push(`<text x="${x(value) + 10}" y="${center + 8}" font-size="25" font-weight="700">${value}</text>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="chart-title chart-desc" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
<title id="chart-title">${escape(spec.title)}</title><desc id="chart-desc">${escape(spec.description)}</desc>
<rect width="${width}" height="${height}" fill="${spec.background}"/>
<g fill="${spec.foreground}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">
<text x="30" y="46" font-size="30" font-weight="700">${escape(spec.title)}</text>
<text x="30" y="78" font-size="18">${escape(series.name)}</text>
${elements.join("\n")}
<text x="${(left + right) / 2}" y="${height - 16}" text-anchor="middle" font-size="19">${escape(spec.yLabel)}</text>
</g></svg>\n`;
  writeFileSync(`${asset}.svg`, svg);
  console.log(`Rendered ${name}`);
}
