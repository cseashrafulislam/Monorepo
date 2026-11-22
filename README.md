# GlobalSites — Ten independent Cloudflare Pages brands

This single repository powers 10 independently deployed websites with 300 organized subcategories (30 per brand). TechDailyNews is deliberately NOT part of this project.

## The brands and their unique presentation

| Brand | Site directory | Visual language | Main subject |
| --- | --- | --- | --- |
| CoinMetriq | sites/coinmetriq | Dark research terminal | Crypto and blockchain |
| EarthViora | sites/earthviora | Green topographic atlas | Satellite, hazards, environment |
| SolarQentra | sites/solarqentra | Warm solar-energy studio | Solar, power, batteries, EV |
| TechOrvia | sites/techorvia | Code/developer laboratory | AI, security, software, creators |
| MoneyAvora | sites/moneyavora | Professional finance editorial | Finance, banking, global trade |
| IndustryLuma | sites/industryluma | Industrial operations console | Factory, agriculture, recycling |
| WorldOrixa | sites/worldorixa | Newspaper-inspired editorial | World news, sports, public data |
| VitalOryx | sites/vitaloryx | Calm wellness library | Health, exercise, care |
| EduNovira | sites/edunovira | Student campus notebook | Education and career |
| LifeAlora | sites/lifealora | Travel/lifestyle journal | Home, travel, property, pets |

Each site has a distinctive responsive homepage, topic-specific navigation, a category directory with five logical groups of six, 30 individually written introductory topic guides, a functioning calculator, and About/Privacy/404 pages.

IMPORTANT CONTENT STATUS: The 300 subcategory URLs currently contain concise, individually written overviews and practical guidance, NOT fully researched long-form articles, live data, or a working calculator for each category. They are intentionally marked noindex,follow until actual original material, references and editorial review are added. The indexable topic directory and real calculator remain in the sitemap. Do not switch 300 brief pages to index indiscriminately.

## Build and QA

Requires Node.js 20 or above; no third-party runtime dependencies.

- Build all and run tests: npm run check
- Build one site: npm run build -- --site=solarqentra
- Build all: npm run build:all

Per-site output directory: dist/[site-id] (generated, gitignored).
CI builds and tests all ten sites, validating 300 routes, designs, SEO and the ten calculators.

## Cloudflare Pages deployment

All ten Pages projects use GitHub cseashrafulislam/Monorepo and branch main.
For SolarQentra: root directory blank (repo root), build command npm run build -- --site=solarqentra, output directory dist/solarqentra, Node 22.
Replace solarqentra in the build command and output path for other brands.
Configure Build Watch Paths for the chosen sites/[site-id]/* plus shared packages/site-core/*, scripts/* and package.json.
The default canonical uses https://[site-id].pages.dev ; when changing domain, configure PUBLIC_SITE_URL per Cloudflare project before making it canonical.

## Data architecture

- sites/[site-id]/site.json: site identity, theme, target markets, one working tool.
- sites/[site-id]/topics.json: one authoritative 30-category catalog, grouped 5 × 6.
- scripts/build.mjs: SEO-aware static generator.
- packages/site-core/style.css: shared functional layout/accessibility CSS.
- packages/site-core/experience.css: ten materially different visual themes.
- packages/site-core/calculator.js: browser-only calculator engine.
- tests/site.test.mjs: regression checks.
- .github/workflows/ci.yml: automatic build validation.

## Quality, SEO, countries and ads

No login, fabricated live news/rates, tracking scripts or ads are included.
Country shortlists guide future verified localization; country-only doorway pages are NOT generated.
Site pages have canonical URLs, WebSite and breadcrumb structured data, unique headings, OG metadata, sitemaps and robots.txt.
An individual topic page is indexable ONLY when it explicitly has editorialReviewed=true and a non-empty sources array in its topics.json record. Publish substantial useful material and verified sources before enabling that flag.
Ads and analytics require accurate privacy disclosures and legally appropriate visitor consent controls before enabling tracking.

## TechOrvia independently built utility platform

TechOrvia uses its own `sites/techorvia/` renderer, CSS, browser processing code and extensible catalog. It does not share the marketing layout of other sites. Tool entries in `catalog.mjs` automatically produce `/tools/<slug>/` pages and `/categories/<slug>/` directory pages; no arbitrary category or tool count limit exists.

Files remain client-side. PDF, OCR, DOCX and QR tools require pinned third-party browser libraries downloaded on demand; cloud or network restrictions can block those libraries. `PDF to Word` / `Word to PDF` are explicitly text-only conversions, not full fidelity document layout conversion. TechOrvia is tools-first with no news-feed or news portal. WorldOrixa and the separately deployed TechDailyNews are the only news-oriented websites. Source headlines for WorldOrixa are refreshed by its dedicated GitHub Action.

Run `npm run check` to validate all sites and TechOrvia tools. GitHub CI deployment will verify static routes. The website does not claim that third-party CDN/browser functionality is exhaustively browser-tested or that unsupported AI models/remote scanners exist.

## Fixed product boundaries

- News-first: **WorldOrixa** (this monorepo) and **TechDailyNews** (separate repository).
- Tools-first: **CoinMetriq, EarthViora, SolarQentra, TechOrvia, MoneyAvora, IndustryLuma, VitalOryx, EduNovira, LifeAlora**.
- All ten monorepo properties offer Worldwide + 10 country choices; only WorldOrixa filters news. For tools-first sites, the selected country sets regional reference context; unsupported tax, labor, energy or education formulas are not silently altered.
- News paths previously published on tools-first sites redirect permanently to their main calculator. No site-wide cross-promotional network links are introduced.
