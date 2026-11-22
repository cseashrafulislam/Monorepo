# GlobalSites — 10 independent Cloudflare Pages sites

Ten launchable, independently built static sites in **one GitHub repository**. TechDailyNews is deliberately **not** part of this repo and must not be modified.

## Projects

| Site | Folder | Main focus |
| --- | --- | --- |
| CoinMetriq | `sites/coinmetriq/` | Crypto & Blockchain |
| EarthViora | `sites/earthviora/` | Earth, Climate & Space |
| SolarQentra | `sites/solarqentra/` | Solar, Energy & EV |
| TechOrvia | `sites/techorvia/` | AI, Technology & Digital Tools |
| MoneyAvora | `sites/moneyavora/` | Finance, Business & Trade |
| IndustryLuma | `sites/industryluma/` | Manufacturing, Agriculture & Recycling |
| WorldOrixa | `sites/worldorixa/` | World News, Politics & Culture |
| VitalOryx | `sites/vitaloryx/` | Health, Fitness & Wellness |
| EduNovira | `sites/edunovira/` | Education, Careers & Skills |
| LifeAlora | `sites/lifealora/` | Travel, Home & Lifestyle |

Each project contains its own `site.json`: branding, topics (planning taxonomy), target-country shortlist, and one live, accessible, browser-only calculator. Topic names are a **roadmap**, not 200 published thin/duplicate pages. The initial build creates a real home page, working tool, About, Privacy, 404, and SEO resources for each site.

## Build and test

Requirements: Node.js 20+; no third-party npm dependencies.

```bash
npm run check
npm run build -- --site=solarqentra
npm run build:all
```

Outputs: `dist/solarqentra/`, `dist/coinmetriq/`, etc. Each output is a self-contained static Cloudflare Pages deployment. The `dist` directory is generated and not committed.

## Cloudflare Pages — one Git repository, ten independent projects

Create ten **separate Cloudflare Pages Git-connected projects** using this same repository and branch `main`.

- **Root directory:** repository root (`/`, not the site folder)
- **Build command:** `npm run build -- --site=solarqentra` (replace ID for each project)
- **Build output directory:** `dist/solarqentra` (replace ID for each project)
- **Node.js version:** 22
- **Production branch:** `main`
- **Environment:** optional `PUBLIC_SITE_URL=https://your-confirmed-domain.example` for correct canonical URLs and sitemap. Each Pages project configures its own value.

Set **Build Watch Paths** per project: include its `sites/<id>/**` plus `packages/site-core/**`, `scripts/**`, `package.json`, `tests/**`. Configure paths in the Cloudflare dashboard; changes to shared files should rebuild all dependent sites.

Names in `sites/` are provisional apart from SolarQentra selected by the owner; Cloudflare `*.pages.dev` availability is **not** established by this repository. Confirm the actual URL before connecting AdSense, indexing or configuring `PUBLIC_SITE_URL`.

## Development standards

- No registration, APIs, invented live market/news data, fabricated local price lists, or unapproved ad scripts.
- Current calculators use visitor-entered values. No entered value is sent to a server.
- Country shortlists are editorial priorities, not published country-specific content. Add only verified, genuinely localized pages with sources and effective dates.
- Ads: integrate approved networks and direct sponsorship later, with country consent and accurate Privacy disclosures before enabling tracking.
- No automatic publishing of empty category pages. Extend each site's topics with actual original tools, evidence-backed content and real data licensing.
- Keep canonical URLs and privacy pages correct before public launch.

## Repository organization

```text
sites/<site-id>/site.json       # independent site configuration
packages/site-core/           # shared design & client calculators
scripts/build.mjs             # deterministic, one-site or all-site build
tests/site.test.mjs           # validation & formula regression tests
.github/workflows/ci.yml      # GitHub Actions tests/builds (not Cloudflare deployment)
```

**Deployment status:** GitHub commits and CI prepare the projects; Cloudflare Pages projects still must be created/connected in the Cloudflare account. GitHub Actions is validation-only.
