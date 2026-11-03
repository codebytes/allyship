# Starting an Allyship Journey

Explore allyship, privilege, unconscious bias, and covering, and how self-awareness can help you take action and start your own allyship journey.

## Slides

[View HTML slides](https://chris-ayers.com/allyship/) | [Download PDF](https://chris-ayers.com/allyship/Slides.pdf)

## Resources

- [Slide source](slides/Slides.md)
- [Guide to Allyship](https://guidetoallyship.com/)
- [TED Talk - "The Urgency of Intersectionality" by Kimberlé Crenshaw](https://www.ted.com/talks/kimberle_crenshaw_the_urgency_of_intersectionality)
- [TED Talk - "3 Ways to Be a Better Ally in the Workplace" by Melinda Briana Epler](https://www.ted.com/talks/melinda_briana_epler_3_ways_to_be_a_better_ally_in_the_workplace)
- [DiamondLobby - Diversity in Gaming (historical 2021 report)](https://diamondlobby.com/geeky-stuff/diversity-in-gaming/)
- [ESA - Essential Facts 2026 (U.S. players)](https://www.theesa.com/resources/essential-facts-about-the-us-video-game-industry/2026-data/)
- [Geena Davis Institute / Nielsen - Ready Players All (2025)](https://geenadavisinstitute.org/wp-content/uploads/2025/04/GDI-March-2025_Ready-Players-All_What-Do-Gamers-Have-to-Say-About-Character-Diversity.pdf)
- [LeanIn.Org and McKinsey - Women in the Workplace 2025](https://leanin.org/report/women-in-the-workplace/)
- [Deloitte - Disability Inclusion @ Work 2024](https://www.deloitte.com/global/en/issues/work/content/disability-inclusion-at-work.html)
- [Federal Reserve - SCF 2022 wealth comparisons](https://www.federalreserve.gov/econres/notes/feds-notes/greater-wealth-greater-uncertainty-changes-in-racial-inequality-in-the-survey-of-consumer-finances-20231018.html)
- [Federal Reserve - SHED 2025 financial resilience](https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-savings-investments.htm)
- [Williams Institute - LGBTQ workplace experiences (2024 report, 2023 survey)](https://williamsinstitute.law.ucla.edu/publications/lgbt-workplace-discrimination/)
- [USC Annenberg - Inequality in 1,900 Popular Films (2026 report)](https://assets.uscannenberg.org/aii/inequality1900films_080526.pdf)
- [WebAIM Million - 2026 accessibility findings](https://webaim.org/projects/million/)
- [Kline, Rose, Walters - Systemic Discrimination Among Large U.S. Employers](https://www.nber.org/papers/w29053)
- [Chang et al. - The Mixed Effects of Online Diversity Training](https://pmc.ncbi.nlm.nih.gov/articles/PMC6475398/)
- [Catalyst - Six Actions to Create Genuine DEI Policies](https://www.catalyst.org/insights/2024/genuine-inclusion-policies)
- [Right To Be - The 5Ds of Bystander Intervention](https://righttobe.org/guides/bystander-intervention-training/)
- [Disabled And Here - disability-led, openly licensed photography](https://affecttheverb.com/collection/)

## Next-only presentation

The expanded deck adapts the concepts and facilitation notes from Chris Ayers's
original `Allyship.pptx`: allyship, privilege, intersectionality, covering,
unconscious bias, the "One / Some / All" framework, and practical next steps.
Its visual approach follows [marp-demo](https://github.com/codebytes/marp-demo):
dark editorial layouts, native slide transitions, short entrance animations,
and a linear, next-only presentation sequence.

The five original ground rules lead the session immediately after the title,
before the speaker introduction. Two dedicated slides preserve open-minded
respect, active listening and understanding, personal expression, balanced
participation, and embracing discomfort, with full facilitation notes and an
explicit option to pass rather than disclose personal experiences.

Advance with Right Arrow, Space, Page Down, or a presentation remote. No buttons,
dropdowns, or mouse clicks are required to see any content. The historical gaming
breakdowns have separate slides; the wheel's four reflection lenses and all three
allyship scopes have visible examples. Each of the six fictional scenarios has a
question slide followed immediately by a debrief showing all three responses and
their tradeoffs. Pause for reflection or discussion, then advance normally.
The original gaming infographics, mirror photo, and START road image are retained.
The 64-slide deck uses nine newer data charts alongside the two historical charts,
three original teaching diagrams, financial-resilience visuals, and three
photographs plus an illustration from the disability-led Disabled And Here
collection. Evidence appears at relevant points in the story, not in a separate
statistics dump. The diagrams distinguish illustrative processes and practical
frameworks from measured research outcomes.
No audience responses are collected: there is no scoring, response storage,
analytics, or backend. Marp itself may use local storage to synchronize slide
navigation between windows. Motion respects reduced-motion
preferences and only runs on the active audience slide; decorative motion stops
after a short sequence.

The PDF, presenter previews, and JavaScript-disabled output contain the same
complete sequence, including both historical charts, all four wheel lenses,
and all eighteen scenario response explanations. No content depends on runtime
selection or a half-completed interaction. No external fonts or scripts are needed.

### Build and preview

Requires Node.js 22.20+ and Chrome/Chromium.

```sh
npm ci
# If no compatible browser is installed:
npx playwright install chromium
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`. Output is `build/index.html`, `build/Slides.pdf`,
and the local assets. Use `npm run build:html` to skip PDF export, `PORT` to
change the preview port, or `CHROME_PATH` to select a browser executable.
`npm test` builds HTML and checks slide fit, assets, complete next-only traversal,
scenario/debrief ordering, keyboard navigation, reduced motion, presenter mode,
and print/no-JavaScript parity. Set `REVIEW_DIR` to save a screenshot of each slide during that run.
GitHub Pages uses the same pinned build and checks before deploying.

### Data and provenance

**Historical characters.** The DiamondLobby gaming figures are historical,
not current industry estimates. DiamondLobby
studied 93 selected games released in 2017-2021, excluding games with only fully
customizable characters. Its gender analysis covers 810 preset characters; the
ethnic analysis covers a human/human-like subset whose size is not stated.
The combined "non-binary or undocumented gender" category must not be interpreted
as a non-binary representation rate, and "all other ethnicities" hides differences.
This is not a random sample, a player-demographic study, or a claim about causation.

**Current players.** ESA's *Essential Facts 2026* estimates 212.3 million U.S.
players aged 5-90 who play at least one hour per week, with an average age of 37.
Its player-gender breakdown is 53% male, 46% female, and 1% non-binary or prefer
not to say. YouGov surveyed 13,545 respondents in February 2026 and weighted the
results; the population estimate is not the sample size. These player figures
are **not** an update to DiamondLobby's character analysis or evidence of change
in character representation over time.

**Representation preferences.** Geena Davis Institute / Nielsen's *Ready Players
All* (March 2025) reports that 62% of U.S./U.K. gamer respondents agree they
are more likely to play a game if its playable characters are diverse; 9%
disagree. The remaining 29% neither agree nor disagree, calculated as
`100 - 62 - 9`. Fieldwork was June 10-15, 2024. The short report does not state
sample size or margin of error. This is stated preference, not a measured
sales effect, observed play, or a new census of character representation.

**Career opportunities.** *Women in the Workplace 2025* provides the sponsorship
and first-promotion comparisons. Its company pipeline data describe **2024**
personnel movements, not 2025 promotions. The promotion chart uses rates
normalized to men at 100; women overall overlaps the displayed racial/ethnic
subgroups. The separate employee survey reports that 31% of entry-level women
and 45% of entry-level men have a sponsor: a **14-percentage-point** gap.
The approximately 9,500 respondents are the overall survey, not the size of
either entry-level subgroup. Neither comparison establishes causation.

**Access.** Deloitte's *Disability Inclusion @ Work 2024* surveyed 10,000 employed
people across 20 countries who have disabilities, chronic health conditions,
or neurodivergence, including people reporting activity difficulties without
self-identifying. Six in ten reported missing a work event due to accessibility
challenges. This is a self-reported experience in that sample, not the share of
all workers or events, and not a 2026 estimate. The community photographs are
illustrative; the people pictured are not identified as survey participants.

Primary sources were checked on **November 3, 2026**. Full report links,
fieldwork dates, populations, caveats, metrics, and photo licensing are recorded in
[`slides/assets/research-sources.json`](slides/assets/research-sources.json).
New charts redraw published numbers; they do not copy report artwork or
publisher stock photography.

**Material privilege.** Federal Reserve SCF medians describe family net wealth in
**thousands of 2022 dollars**, not income, individual destiny, or current dollar
values. All five published groups are retained; broad categories hide substantial
within-group differences. The chart shows point estimates; source uncertainty
endpoints are preserved in metadata. SHED's 2025 fieldwork, published in 2026,
finds that 63% would use cash or its equivalent for a hypothetical $400 emergency,
while 12% could not pay by any means. These are **not complementary categories**:
the other 37% are not all unable to afford the expense.

**Intersectional experiences and covering.** The Williams Institute's 2024 report
uses a summer 2023 survey of 1,902 LGBTQ adults in the workforce. Past-year
discrimination rates were 15% for LGBTQ respondents of color versus 7% for White
LGBTQ respondents, and 22% for trans/nonbinary respondents versus 9% for cisgender
LGBQ respondents. Race and gender groups overlap; these are not intersection-specific
rates that can be added together. The 58% covering figure refers to the current
job, not every privacy choice. None establishes that disclosure causes discrimination.

**Screen presence and creative power.** USC Annenberg's August 2026 report
analyzes 100 top-performing U.S. theatrical films per year through **2025**.
Speaking characters and directors, writers, and composers have separate
denominators. Film-level absence counts (78 missing LGBTQ+ characters, 49 missing
disabled characters, and 81 missing disabled girls/women) overlap and must not
be summed. Counts do not measure depth, quality, agency, or stereotypes.

**Digital access.** WebAIM's February 2026 automated evaluation found detectable
WCAG failures on 95.9% of one million tested popular home pages. Error types
overlap; percentages describe pages, not errors or people. No automatically
detected errors does not establish accessibility or conformance.

**Evidence for action, with limits.** The 2022 Kline/Rose/Walters revision reports
a **2.1-percentage-point** employer-contact penalty for Black-associated names
in a randomized application experiment, not a 2.1% relative change or an effect
on job offers. The 2024 report card reanalyzes the underlying study, rather than
providing a new contemporary hiring rate. Chang et al.'s 2019 paper reports a
2017 training experiment at one organization: attitude and behavioral effects
varied. It does not show that all training succeeds or fails. Catalyst's six
organizational characteristics are observational associations with perceived
genuineness, not proven causal levers. Right To Be's 5Ds are practical options,
not an escalation sequence. Safety and consent take precedence, especially when
documenting an incident or involving others.

Chart specifications, accessible static SVGs, and source metadata are in
`slides/assets/`. To regenerate the SVGs with the `marp-visuals` skill:

```sh
node <marp-visuals>/scripts/chart-to-svg.mjs slides/assets/gaming-gender.json -o slides/assets/gaming-gender.svg
node <marp-visuals>/scripts/chart-to-svg.mjs slides/assets/gaming-ethnicity.json -o slides/assets/gaming-ethnicity.svg
node <marp-visuals>/scripts/chart-to-svg.mjs slides/assets/players-2026.json -o slides/assets/players-2026.svg
node <marp-visuals>/scripts/chart-to-svg.mjs slides/assets/representation-sentiment-2025.json -o slides/assets/representation-sentiment-2025.svg
node <marp-visuals>/scripts/chart-to-svg.mjs slides/assets/promotion-2025.json -o slides/assets/promotion-2025.svg
node <marp-visuals>/scripts/chart-to-svg.mjs slides/assets/sponsorship-2025.json -o slides/assets/sponsorship-2025.svg
# New comparisons use direct-label horizontal bars to preserve long group names:
node scripts/render-evidence.mjs
CHROME_PATH="/path/to/chrome" node <marp-visuals>/scripts/render-mermaid.mjs slides/assets/participation-cost.mmd -o slides/assets/participation-cost.svg
# Additional diagrams: bystander-options, genuine-inclusion (same pattern).
```

The original PowerPoint is not copied into this repository. Its concepts,
reflection prompts, and resource provenance are retained in the slide notes;
selected original images are preserved alongside the new layouts.
The original YouTube resource returned unavailable metadata during revision;
a verified Melinda Briana Epler TED talk replaces it in the visible resources,
with the old reference retained in notes. The new workplace scenarios are
fictional teaching examples, not measured outcomes or universal prescriptions.

### Image credits

The repository's MIT licence does not relicense third-party images.

- `gaming-*-original.png`: DiamondLobby, extracted unchanged from PowerPoint slide 11.
  [Original report and publisher's reuse terms](https://diamondlobby.com/geeky-stuff/diversity-in-gaming/).
- `wheel-of-power-privilege.png`: Sylvia Duckworth, adapted from the Canadian
  Council for Refugees (`ccrweb.ca`), extracted unchanged from slide 13.
  [Author's upload](https://www.flickr.com/photos/sylviaduckworth/50500299716/),
  [CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/).
  Preserve the artwork and attribution; noncommercial/no-derivatives restrictions
  apply. The reflection prompts are separate from the unchanged artwork.
- `reflection-mirror.jpeg`: original slide 18,
  [Pexels source](https://www.pexels.com/photo/oval-brown-wooden-framed-hanging-mirror-1528975/).
- `start-road.jpg`: original slide 19,
  [Pixabay source](https://pixabay.com/illustrations/road-start-beginning-intention-368719/).
- `disabled-and-here-conversation.jpg`: **Disabled And Here**, photograph by
  **Chona Kasinger**, [Outdoor group conversation](https://affecttheverb.com/gallery/disabledandhere/outdoorgroupconvo/),
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Displayed in full, unaltered.
- `disabled-and-here-booktalk.jpg`: **Disabled And Here**, photograph by
  **Gritchelle Fallesgon**, [Couch time book talk](https://affecttheverb.com/gallery/disabledandhere/booktalkoncouch/),
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Displayed in full, unaltered.
- `disabled-and-here-coffee.jpg`: **Disabled And Here**, photograph by
  **Tojo Andrianarivo**, [Disabled friends coffee chat](https://affecttheverb.com/gallery/disabledandhere/coffeechat/),
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Displayed in full, unaltered.
- `disabled-and-here-videocall.png`: **Dana Chan for Disabled And Here**,
  [On a video call](https://affecttheverb.com/gallery/disabledandhere/videocall/),
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Illustration displayed in full, unaltered.
  The collection's [usage guidance](https://affecttheverb.com/usage/) documents
  model releases and asks for thoughtful use. Do not infer the photographed
  people's employment, personal experiences, or feelings from the images.

## Contact

**Chris Ayers**, Principal Software Engineer

[Blog](https://chris-ayers.com/) | [GitHub](https://github.com/codebytes) | [LinkedIn](https://linkedin.com/in/chris-l-ayers/) | [Bluesky](https://bsky.app/profile/chris-ayers.com) | [Mastodon](https://hachyderm.io/@Chrisayers) | [Twitter](https://twitter.com/Chris_L_Ayers)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
