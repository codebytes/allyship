<!-- Keep in sync with AGENTS.md at the repository root. -->

# Agent instructions: Starting an Allyship Journey

This repository holds the slides for Chris Ayers' talk **Starting an Allyship Journey**. The deck is published to <https://chris-ayers.com/allyship/>.

## Repository layout

- `slides/Slides.md`: the Marp deck. Images are in `slides/img/`, themes in `slides/themes/`.
- `slides/assets/`: data and scripted assets the deck loads.
  - `allyship.js`: slide motion, loaded by the deck. It animates only the active slide in the audience view, and stops in presenter view, print, hidden tabs, and under `prefers-reduced-motion`.
  - `*.json` + `*.svg` pairs: evidence charts. Each JSON file is the chart's data and source; the SVG is what the slide shows.
  - `*.mmd` + `*.svg` pairs: Mermaid diagrams, committed pre-rendered so the deck needs no Mermaid runtime.
  - `research-sources.json`: the sources behind the deck's statistics, with the date they were last reviewed.
- `scripts/build.mjs`: renders `build/index.html` and `build/Slides.pdf` with Marp CLI and copies `img/`, `themes/`, and `assets/` into `build/`.
- `scripts/render-evidence.mjs`: regenerates the bar-chart SVGs from their JSON files.
- `scripts/preview.mjs`: serves `build/` locally.
- `tests/slides.test.mjs`: checks chart values, provenance, and image credits against the data files, and drives the built deck in a browser to confirm next-only navigation and identical handouts.

## Build and test

Requires Node 22.20 or later. Marp CLI and Playwright are pinned in `package.json`.

```bash
npm ci
npm run build                      # build/index.html and build/Slides.pdf
npm run build:html                 # HTML only, faster
npm test                           # builds the HTML, then runs tests/slides.test.mjs
npm run preview                    # serve build/ locally
node scripts/render-evidence.mjs   # after editing a chart's JSON data
```

The build and tests use the browser in `CHROME_PATH` when it is set, otherwise Playwright's Chromium (`npx playwright install chromium`), otherwise Google Chrome on macOS.

`.github/workflows/marp-pages.yml` runs `npm ci`, `npm run build`, and `npm test`, then publishes `build/` to GitHub Pages. It sets `CHROME_PATH=/usr/bin/google-chrome` because the runner's packaged Chrome can export the PDF with its sandbox on; keep that rather than disabling the sandbox.

## Slides

- Write the deck in Markdown with [Marp](https://marp.app/). `build/` is generated output and is never edited or committed.
- Keep the frontmatter at the top of the deck (`marp: true`, `theme: custom-default`).
- Write speaker notes as HTML comments (`<!-- -->`).
- Prefer theme classes and CSS variables in `slides/themes/` over inline styles.
- Keep motion in `slides/assets/allyship.js` and the theme: finite effects, no motion under `prefers-reduced-motion`, and every slide complete in the PDF.

## Evidence and sources

- Every statistic on a slide comes from a data file in `slides/assets/` with its source. Change the data file, regenerate the SVG, and update `research-sources.json`; never edit a number only in the slide or the SVG.
- Keep exact values, units, dates, and denominators as the source states them. `npm test` checks this.
- Keep image credits on the slides that use them.
- Keep the talk's tone and the cited sources intact when editing; attribute any new statistics or quotes with a link in the readme's Resources section.

## Shared skills

Use the shared skills from [codebytes/skills](https://github.com/codebytes/skills) (for Copilot CLI: `copilot plugin install https://github.com/codebytes/skills`). Don't copy their instructions or scripts into this repository.

| Task                                                                          | Skill               |
| ----------------------------------------------------------------------------- | ------------------- |
| Write or revise slides, notes, order, or layouts                              | `marp-authoring`    |
| Charts, Mermaid diagrams, or other visuals                                    | `marp-visuals`      |
| Editable `.drawio.svg` diagrams (stored in `slides/img/`)                     | `drawio-diagrams`   |
| Check overflow, clipping, and HTML/PDF parity before presenting or publishing | `marp-slide-review` |

## Readme

- Keep the readme sections in this order: Slides, Recordings, Resources, Contact.
- When a new recording of the talk is published, add it at the top of `## Recordings` as `- [Event Year](https://www.youtube.com/watch?v=VIDEO_ID)`. When the video's title differs from the talk's, add an em dash and the recorded title after the event. Keep the list newest first.
- The talk also appears on <https://chris-ayers.com/speaking/> (source: `content/speaking.md` in [codebytes/codebytes.github.io](https://github.com/codebytes/codebytes.github.io)); new events and recordings belong there too.

## General

- Keep changes scoped to the request; don't reformat unrelated slides or code.
- Install packages from the public npm registry. `package-lock.json` must resolve to `registry.npmjs.org` so CI, Dependabot, and other machines can install it.
- Never commit secrets, keys, or connection strings.
