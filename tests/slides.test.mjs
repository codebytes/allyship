import assert from "node:assert/strict";
import { once } from "node:events";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { chromium } from "playwright";
import { createPreviewServer } from "../scripts/preview.mjs";

const source = readFileSync(new URL("../slides/Slides.md", import.meta.url), "utf8");
const slideCount = source.split(/^---\s*$/m).length - 2;
const screenshotDirectory = process.env.REVIEW_DIR;
const systemChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const executablePath = process.env.CHROME_PATH || (!existsSync(chromium.executablePath()) && existsSync(systemChrome) ? systemChrome : undefined);

test("chart values and provenance match the historical source", () => {
  const load = (name) => JSON.parse(readFileSync(new URL(`../slides/assets/gaming-${name}.json`, import.meta.url)));
  assert.deepEqual(load("gender").series[0].values.map(({ value }) => value), [66.5, 27.7, 5.8]);
  assert.deepEqual(load("ethnicity").series[0].values.map(({ value }) => value), [61.2, 38.8]);
  assert.equal(load("source").games, 93);
  assert.equal(load("source").characters, 810);
  for (const name of ["gender", "ethnicity"]) {
    const svg = readFileSync(new URL(`../slides/assets/gaming-${name}.svg`, import.meta.url), "utf8");
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
    for (const { value } of load(name).series[0].values) assert.ok(svg.includes(`>${value}</text>`));
  }
});

test("updated visuals preserve verified measures, populations, and image credits", () => {
  const load = (name) => JSON.parse(readFileSync(new URL(`../slides/assets/${name}.json`, import.meta.url)));
  const research = load("research-sources");
  const esa = research.sources.find(({ id }) => id === "esa-2026");
  const sentiment = research.sources.find(({ id }) => id === "ready-players-all-2025");
  const workplace = research.sources.find(({ id }) => id === "women-at-work-2025");
  const access = research.sources.find(({ id }) => id === "disability-at-work-2024");
  const players = load("players-2026").series[0].values.map(({ value }) => value);
  assert.deepEqual(players, [esa.metrics.malePercent, esa.metrics.femalePercent, esa.metrics.nonBinaryOrPreferNotToSayPercent]);
  assert.equal(players.reduce((sum, value) => sum + value, 0), 100);
  assert.equal(esa.sample.players + esa.sample.adultNonPlayers, esa.sample.respondents);
  const preference = load("representation-sentiment-2025").series[0].values.map(({ value }) => value);
  assert.deepEqual(preference, [
    sentiment.metrics.diversePlayableCharactersAgreePercent,
    sentiment.metrics.diversePlayableCharactersNeitherPercent,
    sentiment.metrics.diversePlayableCharactersDisagreePercent,
  ]);
  assert.equal(preference.reduce((sum, value) => sum + value, 0), 100);
  assert.equal(sentiment.sample.respondents, null);
  assert.deepEqual(load("promotion-2025").series[0].values.map(({ value }) => value), Object.values(workplace.metrics.promotionIndex));
  assert.deepEqual(load("sponsorship-2025").series[0].values.map(({ value }) => value), [
    workplace.metrics.entryLevelWomenWithSponsorPercent,
    workplace.metrics.entryLevelMenWithSponsorPercent,
  ]);
  assert.equal(workplace.metrics.entryLevelMenWithSponsorPercent - workplace.metrics.entryLevelWomenWithSponsorPercent, 14);
  assert.equal(access.metrics.missedWorkEventDueToAccessPercent, 60);
  assert.match(source, /Calendar-year 2024 promotions/);
  assert.match(source, /not a before-and-after chart/);
  assert.match(source, /not 60% of all workers or events/);
  assert.equal((source.match(/<div class="access-dots"[^>]*>(.*?)<\/div>/)?.[1].match(/<i>/g) ?? []).length, 10);
  for (const name of ["players-2026", "representation-sentiment-2025", "promotion-2025", "sponsorship-2025"]) {
    const svg = readFileSync(new URL(`../slides/assets/${name}.svg`, import.meta.url), "utf8");
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
    for (const { value } of load(name).series[0].values) assert.ok(svg.includes(`>${value}</text>`));
    assert.ok(source.includes(`assets/${name}.svg`));
  }
  for (const image of research.images) {
    assert.equal(image.license, "CC BY 4.0");
    assert.ok(image.photographer || image.creator);
    assert.ok(existsSync(new URL(`../slides/${image.file}`, import.meta.url)));
    assert.ok(source.includes(image.source));
    assert.ok(source.includes(image.photographer || image.creator));
  }
});

test("broader evidence keeps exact values, units, dates, and distinct denominators", () => {
  const load = (name) => JSON.parse(readFileSync(new URL(`../slides/assets/${name}.json`, import.meta.url)));
  const research = load("research-sources");
  const entry = (id) => research.sources.find((source) => source.id === id);
  const wealth = entry("scf-2022");
  const films = entry("usc-films-2026");
  const lgbtq = entry("williams-workplace-2024");
  const web = entry("webaim-million-2026");
  const expectedCharts = {
    "wealth-2022": Object.values(wealth.metrics.medianNetWealthThousands2022Usd),
    "film-roles-2025": [films.metrics.womenOrGirlsSpeakingPercent, films.metrics.womenDirectorsPercent, films.metrics.womenWritersPercent, films.metrics.womenComposersPercent],
    "film-absence-2025": [films.metrics.filmsMissingLgbtqCharacters, films.metrics.filmsMissingDisabledCharacters, films.metrics.filmsMissingDisabledGirlsOrWomen],
    "lgbtq-workplace-2023": [lgbtq.metrics.pastYearDiscriminationPercent.whiteLgbtq, lgbtq.metrics.pastYearDiscriminationPercent.lgbtqOfColor],
    "web-access-2026": [web.metrics.lowContrastPercent, web.metrics.missingAltTextPercent, web.metrics.missingFormLabelsPercent],
  };
  assert.deepEqual(expectedCharts["wealth-2022"], [285.01, 44.89, 61.62, 536.02, 62.9]);
  assert.deepEqual(expectedCharts["film-roles-2025"], [33.6, 8.2, 24.4, 8.5]);
  assert.deepEqual(expectedCharts["film-absence-2025"], [78, 49, 81]);
  assert.deepEqual(Object.values(lgbtq.metrics.pastYearDiscriminationPercent), [7, 15, 9, 22]);
  assert.equal(lgbtq.metrics.coveringAtCurrentJobPercent, 58);
  assert.equal(web.metrics.detectedWcagFailurePercent, 95.9);
  for (const [name, values] of Object.entries(expectedCharts)) {
    assert.deepEqual(load(name).series[0].values.map(({ value }) => value), values);
    const svg = readFileSync(new URL(`../slides/assets/${name}.svg`, import.meta.url), "utf8");
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
    for (const value of values) assert.ok(svg.includes(`>${value}</text>`));
    assert.ok(source.includes(`assets/${name}.svg`));
  }
  const cash = entry("shed-2025");
  assert.deepEqual(Object.values(cash.metrics), [63, 12]);
  assert.equal(cash.sample.finalRespondents, 12934);
  assert.match(source, /not complementary groups/);
  assert.match(source, /not all unable to pay/);
  assert.match(source, /different role-specific denominator/);
  assert.match(source, /2017 intervention \/ published 2019/);
  assert.match(source, /Never publish documentation without consent/);
  assert.equal(entry("employer-experiment-2022").metrics.blackAssociatedNameContactPenaltyPercentagePoints, 2.1);
  assert.equal(entry("training-experiment-2019").sample.participants, 3016);
  assert.equal(entry("catalyst-genuine-inclusion-2024").sample.respondents, 2572);
  assert.equal(entry("right-to-be-5ds").options.length, 5);
  for (const name of ["participation-cost", "bystander-options", "genuine-inclusion"]) {
    const diagram = readFileSync(new URL(`../slides/assets/${name}.mmd`, import.meta.url), "utf8");
    const svg = readFileSync(new URL(`../slides/assets/${name}.svg`, import.meta.url), "utf8");
    assert.match(diagram, /accTitle:/);
    assert.match(diagram, /accDescr:/);
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
    assert.ok(source.includes(`assets/${name}.svg`));
  }
});

test("the complete deck works with next-only navigation and identical handouts", async (t) => {
  const server = createPreviewServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  let browser;
  t.after(async () => {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  });
  browser = await chromium.launch({ executablePath });
  const base = `http://127.0.0.1:${server.address().port}`;
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  const errors = [];
  const externalRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => { if (!response.ok()) errors.push(`${response.status()} ${response.url()}`); });
  page.on("request", (request) => { if (!request.url().startsWith(base) && !request.url().startsWith("data:")) externalRequests.push(request.url()); });
  await page.goto(base);
  await page.waitForSelector("svg.bespoke-marp-active");
  assert.equal(await page.locator("section.journey").count(), slideCount);
  const openingSections = await page.locator("section.journey").evaluateAll((sections) => sections.slice(1, 3).map((section) => section.textContent));
  assert.match(openingSections[0], /Open-Minded/);
  assert.match(openingSections[0], /Active Listening/);
  assert.match(openingSections[0], /PersonalExpression/);
  assert.match(openingSections[1], /Balanced Participation/);
  assert.match(openingSections[1], /Embrace Discomfort/);
  assert.match(openingSections[1], /Passing is welcome/);
  const expectedContent = await page.locator("section.journey").allTextContents();

  let navigation = 0;
  async function goTo(selector) {
    const index = await page.locator("section.journey").evaluateAll((sections, query) => sections.findIndex((section) => section.querySelector(query)), selector);
    assert.notEqual(index, -1, selector);
    await page.goto(`${base}/?example=${index}&navigation=${++navigation}#${index + 1}`);
    await page.waitForSelector(`svg.bespoke-marp-active ${selector}`);
    await page.waitForTimeout(600);
  }

  async function checkCompleteContent(targetPage) {
    assert.deepEqual(await targetPage.locator("section.journey").allTextContents(), expectedContent);
    assert.equal(await targetPage.locator("section.journey button, section.journey select, section.journey input, section.journey [hidden]").count(), 0);
    assert.equal(await targetPage.locator('img[src="assets/gaming-gender.svg"]').count(), 1);
    assert.equal(await targetPage.locator('img[src="assets/gaming-ethnicity.svg"]').count(), 1);
    assert.equal(await targetPage.locator("[data-scope-examples] article").count(), 3);
    const diagram = targetPage.locator(".wheel-figure img");
    assert.equal(await diagram.getAttribute("src"), "img/wheel-of-power-privilege.png");
    assert.equal(await diagram.evaluate((image) => getComputedStyle(image).objectFit), "contain");
    for (const lens of ["Whose fluency is assumed?", "What does access require?", "What stability is assumed?", "Whose belonging is presumed?"]) {
      assert.equal(await targetPage.getByRole("heading", { name: lens, exact: true, includeHidden: true }).count(), 1);
    }
    assert.equal(await targetPage.locator("[data-practice-question]").count(), 6);
    assert.equal(await targetPage.locator("[data-practice-response] article").count(), 18);
  }

  async function checkLayout(targetPage, label) {
    const issues = await targetPage.locator("section.journey").evaluateAll((sections) => sections.flatMap((section, index) => {
      const box = section.getBoundingClientRect();
      const scale = box.width / 1280;
      const footerTop = box.bottom - 42 * scale;
      return [...section.querySelectorAll("h1, h2, h3, p, article, figure, button, select, img, .orbit-label, .orbit-center")].flatMap((element) => {
        if (!element.checkVisibility()) return [];
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return [];
        const outside = rect.left < box.left - 2 || rect.right > box.right + 2 || rect.top < box.top - 2 || rect.bottom > footerTop + 2;
        const style = getComputedStyle(element);
        const clipped = (style.overflowX !== "visible" && element.scrollWidth > element.clientWidth + 2)
          || (style.overflowY !== "visible" && element.scrollHeight > element.clientHeight + 2);
        return outside || clipped ? [{ slide: index + 1, tag: element.tagName, text: element.textContent.slice(0, 70), outside, clipped }] : [];
      });
    }));
    assert.deepEqual(issues, [], label);
  }

  await t.test("new evidence charts retain their full labels inside the SVG", async () => {
    const charts = ["wealth-2022", "film-roles-2025", "film-absence-2025", "lgbtq-workplace-2023", "web-access-2026"];
    const assets = charts.map((name) => [name, readFileSync(new URL(`../slides/assets/${name}.svg`, import.meta.url), "utf8")]);
    const overflow = await page.evaluate(async (assets) => {
      await document.fonts.ready;
      const container = document.createElement("div");
      container.style.cssText = "position:fixed;left:-10000px;top:0";
      document.body.append(container);
      try {
        return assets.flatMap(([name, text]) => {
          container.innerHTML = text;
          const svg = container.querySelector("svg");
          const { width, height } = svg.viewBox.baseVal;
          return [...svg.querySelectorAll("text")].flatMap((element) => {
            const box = element.getBBox();
            return box.x < -1 || box.y < -1 || box.x + box.width > width + 1 || box.y + box.height > height + 1
              ? [{ name, text: element.textContent }] : [];
          });
        });
      } finally {
        container.remove();
      }
    }, assets);
    assert.deepEqual(overflow, [], "chart text must not be clipped inside an otherwise fitting image");
  });

  await t.test("all audience slides fit, load assets, and render", async () => {
    if (screenshotDirectory) mkdirSync(screenshotDirectory, { recursive: true });
    const issues = [];
    for (let index = 1; index <= slideCount; index++) {
      if (index > 1) await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(850);
      assert.equal(await page.locator("svg.bespoke-marp-active").count(), 1);
      const active = page.locator("svg.bespoke-marp-active");
      assert.equal(await active.locator("section").evaluate((section) => [...document.querySelectorAll("section.journey")].indexOf(section)), index - 1, `Next reaches slide ${index} without additional input`);
      const images = await active.locator("img").evaluateAll((elements) => elements.every((image) => image.complete && image.naturalWidth > 0));
      assert.ok(images, `slide ${index} images`);
      // Only the active slide has a meaningful screen geometry in Bespoke.
      const overflow = await active.locator("section").evaluate((section) => {
        const box = section.getBoundingClientRect();
        const scale = box.width / 1280;
        return [...section.querySelectorAll("h1,h2,h3,p,article,figure,button,select,img,.orbit-label,.orbit-center")].flatMap((element) => {
          if (!element.checkVisibility()) return [];
          const rect = element.getBoundingClientRect();
          if (!rect.width || !rect.height) return [];
          const style = getComputedStyle(element);
          return rect.left < box.left - 2 || rect.right > box.right + 2 || rect.top < box.top - 2 || rect.bottom > box.bottom - 42 * scale + 2
            || (style.overflowX !== "visible" && element.scrollWidth > element.clientWidth + 2)
            || (style.overflowY !== "visible" && element.scrollHeight > element.clientHeight + 2)
            ? [{ tag: element.tagName, text: element.textContent.slice(0, 80) }] : [];
        });
      });
      if (overflow.length) issues.push({ slide: index, overflow });
      if (screenshotDirectory) await page.screenshot({ path: join(screenshotDirectory, `slide-${String(index).padStart(2, "0")}.png`) });
    }
    assert.deepEqual(issues, [], "audience slide layouts");
  });

  await t.test("all chart, wheel and scope content is authored without controls", async () => {
    await checkCompleteContent(page);
    const slides = page.locator("section.journey");
    const gender = await slides.evaluateAll((sections) => sections.findIndex((section) => section.querySelector('img[src="assets/gaming-gender.svg"]')));
    const ethnicity = await slides.evaluateAll((sections) => sections.findIndex((section) => section.querySelector('img[src="assets/gaming-ethnicity.svg"]')));
    assert.equal(ethnicity, gender + 1, "Next reveals the second chart, not a chart selector");
    assert.match(expectedContent[ethnicity], /subset size unstated/);
    assert.match(await page.locator("[data-scope-examples]").textContent(), /agendas in advance/);
    assert.match(await page.locator("[data-scope-examples]").textContent(), /assign ownership/);
  });

  await t.test("each scenario advances directly to all three response explanations", async () => {
    for (const scenario of ["meeting", "hiring", "language", "access", "privacy", "cost"]) {
      await goTo(`[data-practice-question="${scenario}"]`);
      assert.equal(await page.locator(`svg.bespoke-marp-active [data-practice-question="${scenario}"] article:visible`).count(), 3);
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(600);
      const responses = page.locator(`svg.bespoke-marp-active [data-practice-response="${scenario}"]`);
      assert.equal(await responses.locator("article:visible").count(), 3, `${scenario} debrief is the very next slide`);
      for (const detail of await responses.locator("article p").allTextContents()) assert.ok(detail.length > 70);
      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(600);
      assert.equal(await page.locator(`svg.bespoke-marp-active [data-practice-question="${scenario}"]`).count(), 1, "Previous returns to the question");
    }
    const storedKeys = await page.evaluate(() => [...Object.keys(localStorage), ...Object.keys(sessionStorage)]);
    assert.ok(storedKeys.every((key) => key.startsWith("bespoke-marp-sync-")), "only Marp's built-in navigation synchronization may use storage");
    assert.deepEqual(externalRequests, []);
  });

  await t.test("Space and Page Down also advance without focusing any controls", async () => {
    for (const key of ["Space", "PageDown", "ArrowRight"]) {
      await goTo('[data-practice-question="access"]');
      await page.keyboard.press(key);
      await page.waitForTimeout(600);
      assert.equal(await page.locator('svg.bespoke-marp-active [data-practice-response="access"]').count(), 1, key);
    }
  });

  await t.test("print contains the same complete content with no hidden answers", async () => {
    await page.emulateMedia({ media: "print" });
    await checkCompleteContent(page);
    assert.equal(await page.locator("[data-practice-question]:visible").count(), 6);
    assert.equal(await page.locator("[data-practice-response] article:visible").count(), 18);
    await checkLayout(page, "print layout");
    if (screenshotDirectory) {
      for (const [name, selector] of [["print-chart", 'img[src="assets/gaming-ethnicity.svg"]'], ["print-practice", '[data-practice-response="language"]'], ["print-participation", '[data-practice-response="privacy"]']]) {
        await page.locator("section").filter({ has: page.locator(selector) }).screenshot({ path: join(screenshotDirectory, `${name}.png`) });
      }
    }
    await page.emulateMedia({ media: "screen" });
  });

  await t.test("presenter previews keep all content and reduced motion disables animation", async () => {
    await page.emulateMedia({ media: "screen" });
    await page.evaluate(() => { document.body.dataset.bespokeView = "presenter"; });
    await page.waitForFunction(() => document.querySelectorAll(".motion-active").length === 0);
    assert.equal(await page.locator(".motion-active").count(), 0);
    await checkCompleteContent(page);
    await page.evaluate(() => { document.body.dataset.bespokeView = ""; });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await page.waitForSelector("svg.bespoke-marp-active");
    await checkCompleteContent(page);
    assert.equal(await page.locator(".motion-active").count(), 0);
    assert.equal(await page.locator(".orbit-label").first().evaluate((element) => getComputedStyle(element).animationName), "none");
  });

  await t.test("JavaScript-disabled readers get the same complete sequence", async () => {
    const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 720 } });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(base);
    await staticPage.emulateMedia({ media: "print" });
    await checkCompleteContent(staticPage);
    assert.equal(await staticPage.locator("[data-practice-response] article:visible").count(), 18);
    await checkLayout(staticPage, "no-JavaScript handout");
    await staticContext.close();
  });
  assert.deepEqual(errors, [], "no runtime errors or broken asset requests");
});
