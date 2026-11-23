# 14 UNIQUE FREE PRODUCTS — ONE MASTER BACKLOG

**Account:** cseashrafulislam | **Date:** 2026-11-23 | **State:** planned features are UNCHECKED until code, QA and deployment proof exist.

> **চূড়ান্ত ব্যবসায়িক সিদ্ধান্ত:** ১৪টি স্বাধীন Website = ১৪টি UNIQUE Product। সব visitor-facing Tools, Advanced Workspaces এবং Useful Content ১০০% Free, Login ছাড়া। AdSense/নীতিসম্মত Ads মালিকের মূল আয়ের উৎস। কোনো paid tier, version, phase, MVP বা staged feature roadmap নেই। সব কাজ এই একই Master Checklist-এ থাকবে।

## LIVE IMPLEMENTATION EVIDENCE — SEQUENTIAL PRODUCT RULE

**Active product: CoinMetriq (Site 1 of 14).** Work remains strictly one-site-at-a-time. These entries record *verifiable code-level implementation*, not fabricated production site approval or site-wide completion.

### Implemented source code, merged into main (verified 2026-11-23)

- **19 new standalone on-device CoinMetriq research calculators** (in addition to the prior token-market-cap calculator): trade profit/fees, weighted average entry, manual DCA simulator, portfolio allocations, drawdown, position sizing, staking compound scenarios, mining electricity, AMM impermanent loss, token unlock dilution, portfolio target rebalancing, lump-sum/DCA comparison, realized daily volatility, slippage/fees, manual stablecoin peg deviation, trade expectancy, leverage shock, mining hardware ROI, simultaneous portfolio stress test. No exchange execution or live rates represented.
- **12 portfolio routes, centered at \`/portfolio/\`**: browser-only CSV Trade Journal with field-mapping, optional local session and unencrypted opt-in localStorage, edit/delete and safe CSV export, long-only FIFO and weighted-average fee-inclusive realized cost basis, asset allocation bars, XIRR and flow-adjusted TWR equity charts, OHLCV CSV browser charts and rolling volatility, no-look-ahead next-open SMA historical backtest, normalized portfolio comparisons, rolling Pearson correlation, wallet safety/phishing educational checklist, past Bitcoin halving subsidy timeline, offline network-fee/confirmation illustration, browser-side PBKDF2 AES-GCM encrypted backup/restore, and manual sourced token supply/unlock timeline. Some features share routes; the main landing page counts as one route.
- **10 original interactive crypto fun games** in \`/fun/\`, including fee and DCA arithmetic, HODL drawdown game, mathematical multiplier, portfolio concentration, mining power, token unlock, scam-warning, emoji vocabulary and playful preferences. Share/copy/save PNG is user-triggered; no wallet/API/login/forced ads.
- **11 original mathematical/educational articles** in \`/articles/\`: original examples, sources, transparent caveats, semantic Article JSON-LD, relevant existing working tool links. Eight live-draft-gated source-backed articles are maintained in \`sites/coinmetriq/articles.json\`; the original three arithmetic explainers remain in the original source renderer. Drafts cannot be published by simply appending a catalog entry.
- **Preserved** original \`/tools/token-market-cap/\`, home navigation, all 30 original CoinMetriq short topic URLs and their \`noindex,follow\` protections; no claimed live price feed and no new required visitor account.
- **Production-oriented QA in CI:** static build for all ten Monorepo sites, Node golden/calculation/security tests, editorial source quality, sitemap/robots/canonical/duplicate-title/structured-data/internal-link audit, actual headless Chrome CoinMetriq browser smoke, and existing TechOrvia/country browser smoke.

### GitHub evidence

- [PR #1 — initial 10 calculators, original articles and Fun Lab](https://github.com/cseashrafulislam/Monorepo/pull/1)
- [PR #2 — 5 additional source-free crypto analytics tools](https://github.com/cseashrafulislam/Monorepo/pull/2)
- [PR #3 — all 10 shareable fun games](https://github.com/cseashrafulislam/Monorepo/pull/3)
- [PR #4 — private portfolio desk, CSV ledger, FIFO/WAC, TWR/XIRR, OHLCV, backtest and encrypted backup](https://github.com/cseashrafulislam/Monorepo/pull/4)
- [PR #5 — eight original long-format source-backed educational articles](https://github.com/cseashrafulislam/Monorepo/pull/5)
- [PR #6 — additional scenario analysis, heatmap, rolling correlation and real browser/technical SEO QA](https://github.com/cseashrafulislam/Monorepo/pull/6)
- [PR #7 — independently publish-gated \`articles.json\` plus automated editorial validation](https://github.com/cseashrafulislam/Monorepo/pull/7)
- [PR #8 — dated supply/unlock and historical rolling volatility chart](https://github.com/cseashrafulislam/Monorepo/pull/8)
- [Last confirmed successful CI: main SHA \`47c8ab74034aed4aa2e27b153d4300260d4cd4a7\`](https://github.com/cseashrafulislam/Monorepo/actions/runs/45117836219). **33 Node tests passed, 0 failures; 0 technical SEO audit errors; content audit passed; Chromium browser smoke passed for the calculators, all 10 fun games, journal, cost basis, OHLCV, SMA backtest, returns, comparison, network fee, token emissions and AES-GCM backup; all other Monorepo browser smoke jobs passed**.

### Production gate — still UNVERIFIED, not "fully done"

- **Cloudflare Pages live deployment:** actual project build, public reachability, custom production hostname, SSR/cache state and live routes are unverified. The public web checker returned an access error for \`coinmetriq.pages.dev\`; this does *not* prove downtime. CI success proves generated site/build/browser tests, not Cloudflare production delivery.
- **Google Search Console & Bing Webmaster ownership:** the user's authorized property verification, sitemap submission, indexing/search queries, and AI-search citation measurement have not been confirmed.
- **AdSense/monetization:** publisher approval, exact eligible hostname (including \`pages.dev\` eligibility), required ad account IDs, ads.txt/consent and any actual revenue/RPM have not been confirmed. No fabricated ads, publisher IDs or claims of earnings.
- **Editorial:** the 30 short topic intro pages are still noindex pending substantive source-backed original editorial expansion. The added 11 articles are not a claim that all crypto topics or user instructions have been independently fact-checked by a human expert.
- **Quality boundaries:** live mobile/network performance, accessibility audit on actual low-end devices, actual commercial licensing of potential live price/API sources, historical legal/tax country rules, and account-gated analytics/ads checks remain distinct external verification items. Wallet safety checklists and cost basis calculations are educational and not personal security certifications or tax filings.
- **Remaining requested stretch scope:** fully editable arbitrary portfolio histories beyond supported long-only USD trades; generalized multiperiod cost basis/FX and off-exchange transfers; independent broad market data feeds with confirmed commercial-use licenses; automatic scheduled SitePilot content generation/publication; independent source review for all 30 legacy topics, and continuous real-visitor growth tracking. No invented completeness score.

**Source delivery is substantial and tested, but user-requested 100% production completeness is not demonstrated. Do not check every CM / ART / FUN / SEO / OPS task as complete solely because source code or build passes. Preserve the one-site gate and keep other 13 products unchanged until Site 1 is truly closed.**


## OPERATING RULE: PAGE SEO SHIPS WITH THE PAGE; REMAINING SITE WORK IS SEPARATE

**Owner clarification (2026-11-23):** Do page-level SEO **during the original creation/upgrade of that page**. A page is not functionally complete until it ships its unique search intent, correct canonical, index/noindex decision, accurate title/meta/H1, crawlable primary content, task-first UI, methodology/example, proper schema where appropriate, source/date/rights, internal links, mobile performance and accessibility. Do NOT create a separate future task called “do SEO for this finished page” merely to repeat the work.

Existing checklist IDs `SEO-*` and `GEO-*` are incorporated into the **Definition of Done for each corresponding page**, wherever they describe individual page content or HTML. Global tasks below remain distinct. A later correction to a page is only required when real Search Console data, errors, stale sources, broken URLs or better functionality justify it. Do not assume that “SEO added in HTML” guarantees search indexing, traffic, citations or ad approval.

### Tasks that remain after pages are built (one shared operations checklist, not a phase)

- [ ] **OPS-001** Verify exact deployed production host and canonical status for all 14 independent products, not README-only deployment claims.
- [ ] **OPS-002** Verify property ownership for each site in Google Search Console.
- [ ] **OPS-003** Verify property ownership for each site in Bing Webmaster Tools.
- [ ] **OPS-004** Submit site-specific sitemaps and inspect actual acceptance/crawl status.
- [ ] **OPS-005** Validate `robots.txt`, crawl rules, redirect chains and custom-domain versus `*.pages.dev` canonical consistency.
- [ ] **OPS-006** Inspect Google/Bing indexing coverage; remedy genuine “not indexed”, duplicate-canonical and crawler errors without mass-indexing thin topics.
- [ ] **OPS-007** Confirm representative live rendered HTML and browser behavior from both low-memory phone and desktop.
- [ ] **OPS-008** Set up privacy-compliant free site analytics and consent-respecting task-completion metrics.
- [ ] **OPS-009** Build a 14-site portfolio dashboard for indexed URLs, organic clicks, impressions, CTR, tool use, downtime, ad approval and actual revenue.
- [ ] **OPS-010** Verify AdSense site addition and approval status separately for all 14 hostnames; `*.pages.dev` eligibility must be checked in the real AdSense account rather than assumed.
- [ ] **OPS-011** Where a chosen hostname is ineligible for monetization, document the alternative (for example, legitimately owned custom domain) and update canonical/redirect/search properties consistently; domain purchase is NOT assumed free.
- [ ] **OPS-012** Complete Ads.txt, publisher verification, applicable Google-certified consent setup and policy-compliant ad positioning using genuine publisher IDs only.
- [ ] **OPS-013** Audit legacy Adsterra popunder/social-bar placements for accidental click risk and policy/experience conflicts before displaying AdSense.
- [ ] **OPS-014** Track actual AdSense/advertising page RPM and revenue by site; no speculative incomes are treated as measured.
- [ ] **OPS-015** Review Search Console query/impression/click reports and identify real query intent gaps per unique product.
- [ ] **OPS-016** Improve real low-CTR snippets and high-impression low-tool-completion user journeys, using evidence not arbitrary rewrites.
- [ ] **OPS-017** Publish original, accurate screen recordings/demos of actual tools for relevant YouTube and social audiences without automating spam.
- [ ] **OPS-018** Share useful original calculations, maps, reports and research in relevant communities when relevant and allowed; no link exchange or bought backlinks.
- [ ] **OPS-019** Make legitimate results naturally shareable with privacy-safe exports and accessible explanatory context, creating authentic citations.
- [ ] **OPS-020** Review Bing AI Performance citations and Google generative-AI visibility reports when available; distinguish citations from actual referral clicks.
- [ ] **OPS-021** Record source rights/licensing, new API quota use, last checked time, broken data feeds and safe fallback behaviors.
- [ ] **OPS-022** Monitor actual live errors, 404s, low-memory crashes, regressions, security vulnerabilities and map-tile/API failures.
- [ ] **OPS-023** Watch Cloudflare account-wide Pages build limits, Workers Free requests, D1 quotas and GitHub scheduled workflow allowances.
- [ ] **OPS-024** Run real mobile Web Vitals and test that ad load does not degrade LCP/INP/CLS or obstruct the tool.
- [ ] **OPS-025** Fix genuine source-staleness, broken external source links, incorrect official rules and factual updates; never fake freshness via mass lastmod changes.
- [ ] **OPS-026** Retain independent editorial review and corrections for consequential financial, health, veterinary, legal, disaster or political claims.
- [ ] **OPS-027** Maintain a repeat-use experience: local favorites, saved projects or work history where genuinely useful and privacy-safe, without registration.
- [ ] **OPS-028** Check that related-tools recommendations and on-site navigation lead to task success without excessive ad clicks or inter-site SEO networks.
- [ ] **OPS-029** Assess real traffic, task success and valid ad yield per property and invest maintenance where user demand exists without merging the 14 products.
- [ ] **OPS-030** Record public URLs, source commit, test evidence, Search Console proof (when permitted), ad-account status and actual results against checklist IDs; never check done for configuration alone.

**Separation of responsibility:** **Page build** = function + design + content + technical/on-page SEO + GEO-compatible trust elements + testing; **site operations** = search ownership/index monitoring, authentic discovery, webmaster insights, social/community distribution, ad verification, business measurement, performance and ongoing maintenance. They are in the same master backlog. There are no versions/phases.

## Product identity & exclusion matrix

| Product | Unique product | Main workflow | Must not duplicate |
|---|---|---|---|
| **CoinMetriq** | Crypto Research & Portfolio Intelligence | Portfolio CSV -> risk/cost/return analytics -> local report | No investment execution or generic finance EMI |
| **EarthViora** | Satellite and Geospatial Earth Intelligence | Select map location -> choose legal satellite layers -> compare dates -> map report | No farm bookkeeping or false future disaster forecasts |
| **SolarQentra** | Solar, Battery, Electricity and EV Energy Studio | Enter energy loads -> size system -> simulate generation/backup -> design report | No personal loans or unverified engineering certification |
| **TechOrvia** | Developer, API, JSON and AI-Engineering Utilities | Paste/upload code/data -> validate/transform/test -> export reproducible result | No PDF/image creative studio |
| **MoneyAvora** | Personal Finance and Business/Trade Economics Studio | Loan, savings, trade, cashflow -> alternative scenario simulations | No crypto trading or employee timecards |
| **IndustryLuma** | Agriculture, Animal, Poultry, Fish and Industrial Operations | Farm/factory operational inputs -> yield/cost/efficiency -> reports | No pet-owner routines or veterinary prescription |
| **WorldOrixa** | Global News, Countries, World Events and Sport Context | Publisher sources -> clustered event -> timeline -> original world context | No full article copying or generic tech release duplication |
| **VitalOryx** | Human Wellness and Fitness Education Studio | Health-related inputs -> educational non-diagnostic trends/habits | No veterinary tools or personalized diagnosis |
| **EduNovira** | Student Study, Exam and Career Success Workspace | Subjects/goals -> planner -> practice -> local progress | No institutional ERP or fabricated jobs |
| **LifeAlora** | Home, Construction, Travel and Pet Ownership Studio | Rooms/trips/pets -> visual plans/routines -> printable outputs | No production animal/farming operations |
| **TechDailyNews** | AI, Software, Security and Technology Release Intelligence | Official product releases + cited tech news -> changed facts and timelines | No general world events or generic developer tools |
| **BrowserPixel** | Professional Image Editor and Product Creative Studio | Images -> edit/layers/batch export -> downloadable assets | No PDF document manipulation suite |
| **FileSwiftTools** | PDF Editor, OCR and Document Workflow Workspace | PDFs -> page organizer/annotation/OCR/forms -> export | No standalone image design/photo filters |
| **ShiftCalcTools** | Workforce Time, Rosters and Payroll Estimate Studio | Shifts -> timecards -> editable pay policy -> gross payroll summaries | No financial loans or country labor-law guarantees |

**Existing ownership:** Monorepo hosts CoinMetriq through LifeAlora (10 sites); TechDailyNews is separate; BrowserPixel, FileSwiftTools and ShiftCalcTools are three further repositories. The 300 Monorepo topic records are content inventory, NOT 300 finished tools. All currently working 30+30+50 utility URLs must remain and be regression-tested.

**Unique-Product Rule:** share infrastructure/code only; no duplicate landing copy, UX patterns, user workflow, functionality targeting the same query, or interchangeable homepage. Necessary legacy overlap is preserved, but future advanced features have one clear canonical owner.

## Free technical & user contract

- Browser-first static pages (Cloudflare Pages), Web Workers/Canvas/WASM, local IndexedDB/OPFS and optional source-cached legal open data.
- No mandatory user account, password, subscription, payment or ad click; all advanced capabilities remain free.
- Any free API, map tile, ML model and package must permit **commercial ad-funded usage** and list an approved license/source before release.
- No fake real-time prices, unverified legal/health claims, fabricated news, fake AI results or prohibited copyrighted republishing.
- Degrade gracefully on weak mobile devices; heavy ML/OCR loads lazily and reports limitations, never auto-starts paid inference.
- Every site has its own navigation, homepage, interactive result, original explanation, sources/caveats, separate search queries and reserved nonintrusive ads.
- All current URLs and existing user-visible tool capabilities remain intact. SEO improvement may be additive but not a breaking deletion.

## SINGLE MASTER IMPLEMENTATION CHECKLIST

Sections indicate distinct product ownership, not versions, phases or chronology.

### Global requirements

- [ ] **GLOBAL-001** Cloudflare Pages inventory: inspect actual project linkage and status instead of assuming README equals deployed
- [ ] **GLOBAL-002** Keep 14 independent brands, canonical URLs and GitHub repositories
- [ ] **GLOBAL-003** Protect all legacy public URLs and functional behavior, with test fixtures before edits
- [ ] **GLOBAL-004** Capture all 300 Monorepo topic entries for distinct-value indexability audit
- [ ] **GLOBAL-005** Prevent new feature duplication across the 14 product categories
- [ ] **GLOBAL-006** Create genuine product-first homepage per unique user workflow
- [ ] **GLOBAL-007** Make every advanced feature free without login, subscription or paywall
- [ ] **GLOBAL-008** Implement browser-side private file processing wherever practical
- [ ] **GLOBAL-009** Use optional local save/import/export/reset with privacy notice
- [ ] **GLOBAL-010** Offer predictable memory/failure limits and progress/cancel for heavy operations
- [ ] **GLOBAL-011** Ban silently paid API requests, R2 dependency, fake paid-model AI and hidden billing
- [ ] **GLOBAL-012** Create commercial-license registry for every external API and data source
- [ ] **GLOBAL-013** Create separate model-weight/library/font/image license registry
- [ ] **GLOBAL-014** Require dataset timestamp, original link, method and attribution
- [ ] **GLOBAL-015** Provide meaningful manual-input/uploaded-CSV fallback when data feed is unavailable
- [ ] **GLOBAL-016** Prevent misleading live data and unsupported certainty
- [ ] **GLOBAL-017** Keep file contents local; sanitize SVG/PDF/ZIP and oversized inputs
- [ ] **GLOBAL-018** Protect application against XSS and insecure dependencies
- [ ] **GLOBAL-019** Keyboard, screen reader, visible focus and low-memory mobile QA
- [ ] **GLOBAL-020** Run core Web Vitals measurement on real deployed pages
- [ ] **GLOBAL-021** Avoid thin auto-generated SEO pages and repetitive country doorway pages
- [ ] **GLOBAL-022** Keep unrevised topic stubs noindex until substantial original value exists
- [ ] **GLOBAL-023** Unique title, descriptive meta, H1, canonical, sitemap and correct structured data
- [ ] **GLOBAL-024** No invented FAQ, ratings, author names, sources or usage testimonials
- [ ] **GLOBAL-025** Place actual useful tool interface ahead of generic SEO description
- [ ] **GLOBAL-026** Original worked example, limitations, supported formats and FAQ per tool
- [ ] **GLOBAL-027** Register Search Console and inspect real search-query intent per site
- [ ] **GLOBAL-028** Build per-site metrics of tool completions, errors and repeat use without storing uploaded data
- [ ] **GLOBAL-029** Track valid AdSense impressions, policy status, site RPM, revenue and consent state
- [ ] **GLOBAL-030** Use only authorized ads.txt publisher ID and verified domain settings
- [ ] **GLOBAL-031** No deceptive ad labels, click incentives, ads in result buttons or processing modal
- [ ] **GLOBAL-032** Disable/review existing intrusive popunder/social bars before AdSense
- [ ] **GLOBAL-033** Reserve ad space to avoid CLS and accidental clicks
- [ ] **GLOBAL-034** Meet GDPR/ePrivacy and Google certified consent requirements when applicable
- [ ] **GLOBAL-035** Separate news source metadata from copyrighted full article republishing
- [ ] **GLOBAL-036** News gets independently useful timelines/source comparison/official data context
- [ ] **GLOBAL-037** No fake health, veterinary, engineering, legal or investment advice
- [ ] **GLOBAL-038** Add graceful no-data/404 states and truthful freshness labels
- [ ] **GLOBAL-039** Use build-watch paths and per-site CI to avoid unnecessary Cloudflare builds
- [ ] **GLOBAL-040** Track Cloudflare Pages Free quota account-wide (currently 500 builds/month)
- [ ] **GLOBAL-041** Track Cloudflare Workers Free quota account-wide (currently 100k requests/day)
- [ ] **GLOBAL-042** Track D1 Free usage and daily enforced row limits where D1 is employed
- [ ] **GLOBAL-043** Do not assume free API means commercial-use license
- [ ] **GLOBAL-044** Make ad placements visible but secondary to utility and user success
- [ ] **GLOBAL-045** Run automated regression for each original browser/file/pay calculator
- [ ] **GLOBAL-046** Only mark checklist task done with file changes, tests, commit and live evidence
- [ ] **GLOBAL-047** Document URL, commit, QA fixtures, license data and completion proof per task
- [ ] **GLOBAL-048** Never call an unimplemented feature done merely because its page exists
- [ ] **GLOBAL-049** No phases, versions, premiums or artificial feature gating

### CoinMetriq — one unique product checklist

**User:** Portfolio researchers and crypto risk analysts. **Interface:** Research terminal, local portfolio table and historical risk chart. **Scope:** Crypto portfolios, on-chain concepts and strategy analysis only.

- [ ] **CM-001** Trade P&L including all transaction fees
- [ ] **CM-002** Average buy price and break-even sale
- [ ] **CM-003** DCA schedule and compounded scenario comparison
- [ ] **CM-004** Lump sum versus DCA
- [ ] **CM-005** Local transaction CSV import and field mapping
- [ ] **CM-006** FIFO and weighted-average cost-basis ledger
- [ ] **CM-007** Portfolio allocation and rebalance planner
- [ ] **CM-008** Portfolio historical equity curve
- [ ] **CM-009** Time-weighted return and XIRR
- [ ] **CM-010** Risk concentration heatmap
- [ ] **CM-011** Rolling volatility and correlation
- [ ] **CM-012** Drawdown and recovery chart
- [ ] **CM-013** Historical OHLCV CSV upload and charts
- [ ] **CM-014** Backtesting on user-supplied price CSV
- [ ] **CM-015** Trade journal and strategy tags
- [ ] **CM-016** Position size and stop loss risk budget
- [ ] **CM-017** Risk/reward and expectancy estimator
- [ ] **CM-018** Trading slippage and execution-cost model
- [ ] **CM-019** Hypothetical leverage liquidation scenario with warning
- [ ] **CM-020** Mining electricity/capex/ROI calculation
- [ ] **CM-021** Staking APR/APY and token reward projection
- [ ] **CM-022** Liquidity pool impermanent loss
- [ ] **CM-023** Token emission/unlock dilution visualizer from cited documents
- [ ] **CM-024** Stablecoin peg deviation from licensed data or CSV
- [ ] **CM-025** On-chain network fee and confirmation concept tool
- [ ] **CM-026** Wallet safety/approval risk educational checklist
- [ ] **CM-027** Phishing signal interactive checklist
- [ ] **CM-028** Bitcoin halving/supply verified timeline
- [ ] **CM-029** Portfolio price-shock stress test
- [ ] **CM-030** Multiple portfolio side-by-side comparison
- [ ] **CM-031** Local encrypted export and device backup
- [ ] **CM-032** Accurate delayed/stale data source labels
- [ ] **CM-033** Optional live data ONLY when commercial reuse is licensed
- [ ] **CM-034** CSV-only fallback fully usable without API
- [ ] **CM-035** Unique method guides for fees, risk, drawdown and tax-lot caveats

### EarthViora — one unique product checklist

**User:** Earth observation users and environmental monitoring researchers. **Interface:** Interactive atlas, time slider, dataset legend, side-by-side map. **Scope:** Geographic Earth data, not agricultural farm profit calculations.

- [ ] **EV-001** Interactive geospatial map and layer chooser
- [ ] **EV-002** Coordinate DMS and decimal conversion
- [ ] **EV-003** GPS CSV marker plot and validation
- [ ] **EV-004** Map polygon draw and area measurement
- [ ] **EV-005** Geodesic distance and buffer calculator
- [ ] **EV-006** GeoJSON/KML import and export
- [ ] **EV-007** Location bookmarks and local map projects
- [ ] **EV-008** NASA GIBS time-based imagery with credits
- [ ] **EV-009** Satellite before-after compare slider
- [ ] **EV-010** Layer opacity and synchronized zoom
- [ ] **EV-011** Historical NDVI vegetation layer with verified bands
- [ ] **EV-012** NDWI water layer and methodology
- [ ] **EV-013** Forest cover historical comparison
- [ ] **EV-014** Crop vegetation monitoring from satellite only
- [ ] **EV-015** Agricultural drought observations without prescribing crops
- [ ] **EV-016** Land-cover change mapped over time
- [ ] **EV-017** Urban growth comparison
- [ ] **EV-018** Riverbank and shoreline visual comparison
- [ ] **EV-019** Protected areas/biodiversity maps with source
- [ ] **EV-020** USGS earthquake feed map and filters
- [ ] **EV-021** NASA EONET event discovery
- [ ] **EV-022** Historical wildfire footprint explorer
- [ ] **EV-023** Historic flood extent viewer, no predictive emergency claim
- [ ] **EV-024** Cyclone/event data links to official sources
- [ ] **EV-025** Historical rainfall/temperature evidence when rights clear
- [ ] **EV-026** Air quality historical source viewer
- [ ] **EV-027** Soil moisture/groundwater time-series source explorer
- [ ] **EV-028** Sea-level and coastal observations
- [ ] **EV-029** Elevation/slope terrain explorer from licensed data
- [ ] **EV-030** Climate indicator comparison with dates
- [ ] **EV-031** Satellite tracking and sky events where valid ephemerides
- [ ] **EV-032** Map print/PDF with credits, resolution and timestamps
- [ ] **EV-033** Uncertainty legend and coverage/resolution indicators
- [ ] **EV-034** Data-offline truthful fallback to local GIS tools
- [ ] **EV-035** Map tiles commercial rights and use-limit audit

### SolarQentra — one unique product checklist

**User:** Home/SME energy planners and electric vehicle owners. **Interface:** Energy load wizard, system diagram and generation-payback charts. **Scope:** Electricity, batteries, solar, EV charging; no generic bank loans.

- [ ] **SQ-001** Appliance energy inventory and load profile
- [ ] **SQ-002** Solar array size in kWp
- [ ] **SQ-003** PVGIS sourced monthly yield when lawful
- [ ] **SQ-004** Solar generation annual forecast with losses
- [ ] **SQ-005** Panel quantity and roof-space planner
- [ ] **SQ-006** Tilt/azimuth sensitivity
- [ ] **SQ-007** Shading/dust loss sensitivity
- [ ] **SQ-008** Off-grid autonomy and storage design
- [ ] **SQ-009** Grid-tied import/export scenarios
- [ ] **SQ-010** Battery usable DoD and capacity
- [ ] **SQ-011** Lithium versus lead-acid cycles and lifetime
- [ ] **SQ-012** Inverter continuous/surge sizing
- [ ] **SQ-013** Charge-controller estimator
- [ ] **SQ-014** DC cable voltage-drop arithmetic and safety caveat
- [ ] **SQ-015** UPS backup runtime
- [ ] **SQ-016** Generator size and operating cost
- [ ] **SQ-017** Battery charging time
- [ ] **SQ-018** Battery degradation and replacement schedule
- [ ] **SQ-019** Home energy bill spreadsheet analyzer
- [ ] **SQ-020** Time-of-use tariff input calculator
- [ ] **SQ-021** Appliance efficiency comparison
- [ ] **SQ-022** Solar capex/maintenance/ROI and payback
- [ ] **SQ-023** Net present value sensitivity model
- [ ] **SQ-024** Hybrid grid-solar-battery energy dispatch
- [ ] **SQ-025** Grid outage operation scenario
- [ ] **SQ-026** EV charge kWh/time/cost
- [ ] **SQ-027** EV versus fuel running cost
- [ ] **SQ-028** E-bike expected range
- [ ] **SQ-029** EV home charging load estimation
- [ ] **SQ-030** Commercial energy audit form
- [ ] **SQ-031** Carbon savings with user-provided factor
- [ ] **SQ-032** Project quote comparison table
- [ ] **SQ-033** Printable engineering assumptions report
- [ ] **SQ-034** Official rules reference without fake legal guarantees
- [ ] **SQ-035** No dangerous installation instructions

### TechOrvia — one unique product checklist

**User:** Developers, technical teams, programming learners. **Interface:** Code/text split editor, validators and local snippets. **Scope:** Developer workbench; advanced PDF/image editors owned by other products.

- [ ] **TO-001** JSON formatter validator and minifier
- [ ] **TO-002** JSON tree and path inspection
- [ ] **TO-003** JSON schema validator and generator
- [ ] **TO-004** JSON Patch and difference tool
- [ ] **TO-005** YAML TOML XML CSV converters
- [ ] **TO-006** CSV column mapping and JSON conversion
- [ ] **TO-007** Regex tester with capture group visualization
- [ ] **TO-008** Code/text diff and merge
- [ ] **TO-009** SQL formatter with dialect disclaimer
- [ ] **TO-010** SQL query parameter placeholder tool
- [ ] **TO-011** OpenAPI file explorer and API schema compare
- [ ] **TO-012** Local API mock response builder
- [ ] **TO-013** HTTP request composer with CORS-aware explanation
- [ ] **TO-014** HTTP header/CSP configuration guide
- [ ] **TO-015** JWT decode and optional local signature verification
- [ ] **TO-016** Hash/HMAC/Base64/URL encode/decode
- [ ] **TO-017** UUID ULID and random identifier maker
- [ ] **TO-018** Unix timestamp and timezone converter
- [ ] **TO-019** Cron expression schedule viewer
- [ ] **TO-020** IP subnet and IPv6 calculators
- [ ] **TO-021** DNS record lookup from permitted source
- [ ] **TO-022** TLS certificate information explainer
- [ ] **TO-023** Security headers audit from user-provided data
- [ ] **TO-024** Password strength estimation without logging
- [ ] **TO-025** Front-end performance budget checker
- [ ] **TO-026** Accessibility source checklist
- [ ] **TO-027** AI token and model API price input calculator
- [ ] **TO-028** Prompt experiment compare worksheet, no fake AI
- [ ] **TO-029** AI agent workflow diagram tool
- [ ] **TO-030** GPU VRAM/local AI hardware calculator
- [ ] **TO-031** 3D printing material calculator
- [ ] **TO-032** IoT battery and sensor power estimator
- [ ] **TO-033** YouTube metadata planning and SEO checklist
- [ ] **TO-034** Video analytics CSV reader and retention charts
- [ ] **TO-035** Reusable local snippets and keyboard shortcuts
- [ ] **TO-036** No copy of PDF editing or visual image workflows

### MoneyAvora — one unique product checklist

**User:** Individuals, SMEs, importers and exporters. **Interface:** Finance scenario grids, amortization plots, cashflow forecasts, linked assumptions. **Scope:** Personal and trade finance; work hours/payroll belongs to ShiftCalcTools.

- [ ] **MA-001** Loan EMI and full amortization schedule
- [ ] **MA-002** Mortgage affordability scenario with user-defined costs
- [ ] **MA-003** Extra debt payment payoff planner
- [ ] **MA-004** Loan refinance and balance transfer comparison
- [ ] **MA-005** Fixed deposit effective annual interest
- [ ] **MA-006** Compound interest with recurring savings
- [ ] **MA-007** Savings goal required monthly contribution
- [ ] **MA-008** Emergency savings runway
- [ ] **MA-009** Household monthly budget and envelope tracker
- [ ] **MA-010** Household cashflow and net worth chart
- [ ] **MA-011** Credit card repayment and true interest cost
- [ ] **MA-012** Debt snowball and avalanche payoff comparison
- [ ] **MA-013** Debt-to-income ratio and credit utilization
- [ ] **MA-014** Rent versus buy financial scenario
- [ ] **MA-015** Retirement accumulation and drawdown
- [ ] **MA-016** Inflation adjustment and purchase-power curve
- [ ] **MA-017** Investment ROI CAGR and dividend reinvestment
- [ ] **MA-018** Insurance premium, deductible, coverage comparison inputs
- [ ] **MA-019** Foreign exchange converter with user rate/date
- [ ] **MA-020** Historical GDP, inflation and economic trends from licensed official datasets
- [ ] **MA-021** Small business margin, markup and break-even
- [ ] **MA-022** Cash conversion cycle and working capital
- [ ] **MA-023** SME income and expense forecasts
- [ ] **MA-024** Invoice discount, penalty and due date arithmetic
- [ ] **MA-025** Scenario analysis for inventory financing
- [ ] **MA-026** Import landed cost with freight, duties and insurance entered by user
- [ ] **MA-027** Export price and margin planner
- [ ] **MA-028** International freight dimensional weight
- [ ] **MA-029** Container size/volume loading arithmetic
- [ ] **MA-030** Incoterms trade cost/risk allocation explainer with sources
- [ ] **MA-031** HS code and customs official-reference navigator
- [ ] **MA-032** Shipment and transport quote comparison
- [ ] **MA-033** Business tax/VAT educational forms only with verified country rules
- [ ] **MA-034** Gold and savings investment scenario inputs
- [ ] **MA-035** Printable financial assumptions and cashflow forecast
- [ ] **MA-036** Local private scenario project export and import
- [ ] **MA-037** No bank rate, exchange rate or legal rule claimed live without licensed data

### IndustryLuma — one unique product checklist

**User:** Cattle, dairy, poultry, fish and crop farms; factory and recycling managers. **Interface:** Dedicated operational workspaces, per-batch record tables, production metrics and visual charts. **Scope:** Agricultural/factory production management, not personal dog/cat care.

- [ ] **IL-001** Farm acreage and land plot converter
- [ ] **IL-002** Crop seed rate and seed cost worksheet
- [ ] **IL-003** Crop spacing and plant population
- [ ] **IL-004** Crop fertilizer nutrient arithmetic based on user label inputs, not dosing advice
- [ ] **IL-005** Irrigation volume and pump runtime
- [ ] **IL-006** Crop yield and harvest weight calculations
- [ ] **IL-007** Crop seasonal farm cost and profit
- [ ] **IL-008** Crop calendar, sowing/harvest milestones
- [ ] **IL-009** Crop rotation and soil test record
- [ ] **IL-010** Agricultural equipment running-cost model
- [ ] **IL-011** Greenhouse sensor measurement history
- [ ] **IL-012** Dairy cattle size-based approximate body weight
- [ ] **IL-013** Cow age and lifecycle tracking
- [ ] **IL-014** Cow breeding/insemination and gestation calendar
- [ ] **IL-015** Calving interval and herd growth scenarios
- [ ] **IL-016** Animal pedigree/local herd family-tree display
- [ ] **IL-017** Dairy milk yield per animal/day/month
- [ ] **IL-018** Milk feed-to-output cost and profitability
- [ ] **IL-019** Dairy feed inventory and animal allocation
- [ ] **IL-020** Cow purchase/sale economic comparison
- [ ] **IL-021** Goat and sheep growth/feed cost
- [ ] **IL-022** Vet visit, vaccination and deworming record; no clinical recommendation
- [ ] **IL-023** Broiler flock feed conversion ratio
- [ ] **IL-024** Broiler growth/stocking/mortality log
- [ ] **IL-025** Layer egg production and cost per egg
- [ ] **IL-026** Poultry batch expenses and gross margin
- [ ] **IL-027** Hatchability and egg grading statistics
- [ ] **IL-028** Fish pond dimensions, area and volume
- [ ] **IL-029** Fish stocking density planning arithmetic
- [ ] **IL-030** Fish feed schedule records, FCR and cost
- [ ] **IL-031** Fish survival/mortality and growth curves
- [ ] **IL-032** Aquaculture water quality sensor observation log
- [ ] **IL-033** Fish harvest time/weight and profitability scenarios
- [ ] **IL-034** Factory overall equipment effectiveness OEE
- [ ] **IL-035** Takt time, cycle time and production capacity
- [ ] **IL-036** Production line efficiency and bottleneck simulation
- [ ] **IL-037** Factory downtime Pareto and reasons
- [ ] **IL-038** MTBF and MTTR maintenance measurements
- [ ] **IL-039** Machine maintenance task and downtime planner
- [ ] **IL-040** Factory unit costing and scrap/rejection rate
- [ ] **IL-041** Product raw material requirement and packaging estimator
- [ ] **IL-042** Cold-chain temperature and loss journal
- [ ] **IL-043** Food processing mass balance and yield
- [ ] **IL-044** ETP inlet/outlet flow balance and observation tracking
- [ ] **IL-045** ETP energy/chemical quantity ACCOUNTING only; no chemical dosing advice
- [ ] **IL-046** Plastic EPR packaging recovery mass tracker
- [ ] **IL-047** Plastic recycling input/output yield and waste
- [ ] **IL-048** E-waste type/category collection weight organizer
- [ ] **IL-049** Factory electricity per output unit and carbon assumptions
- [ ] **IL-050** Supply chain delivery/lead-time KPI chart
- [ ] **IL-051** CSV imports, browser project export and printable audit reports
- [ ] **IL-052** Medical, veterinary, pesticide and ETP compliance certification excluded

### WorldOrixa — one unique product checklist

**User:** General world news and event readers. **Interface:** Source-based editorial timeline, country map, verified event context. **Scope:** World affairs, policy, global data, sports and culture; never technology release news clone.

- [ ] **WO-001** Licensed RSS and official headline sources register
- [ ] **WO-002** Scheduled rights-checked news collection
- [ ] **WO-003** Headline URL/title deduplication
- [ ] **WO-004** Multi-source event clustering and event canonical URL
- [ ] **WO-005** Official event time versus publisher publication time
- [ ] **WO-006** Country news filtering and regional edition
- [ ] **WO-007** World events map with verified coordinates
- [ ] **WO-008** Chronological event timeline with source anchors
- [ ] **WO-009** Original short factual context with primary-source citations
- [ ] **WO-010** Direct publisher links, publisher credits and correction log
- [ ] **WO-011** International diplomacy and public policy official document index
- [ ] **WO-012** Neutral elections and policy timeline from official sources
- [ ] **WO-013** Country profile pages with sourced public data
- [ ] **WO-014** Country population, economics and demographics comparison
- [ ] **WO-015** World economic indicator data chart
- [ ] **WO-016** World time-zone comparison for events
- [ ] **WO-017** Country-by-country public holiday calendar from verified sources
- [ ] **WO-018** Historical events reference with source citations
- [ ] **WO-019** Major international event annual calendar
- [ ] **WO-020** International sports match/event date information when licensed
- [ ] **WO-021** Cricket historical tournament results from legal datasets
- [ ] **WO-022** Football historic competition explorer when licensed
- [ ] **WO-023** Tennis, basketball and motorsport archive metadata when licensed
- [ ] **WO-024** Olympic and athletics historically sourced data explorer
- [ ] **WO-025** World music, books and films cultural event guide
- [ ] **WO-026** Country festivals/traditions dates with citations
- [ ] **WO-027** Interactive historical timeline and original explainer maps
- [ ] **WO-028** Saved stories and local reading interests
- [ ] **WO-029** Search by event, date, country, source and category
- [ ] **WO-030** Article freshness indicator and stale sources alert
- [ ] **WO-031** Publisher thumbnail permission and safe fallback
- [ ] **WO-032** No republished entire copyrighted articles
- [ ] **WO-033** Source diversity and conflicts-of-claims disclosure
- [ ] **WO-034** No fabricated breaking badge or automated fake commentary
- [ ] **WO-035** Index only unique original sourced event pages
- [ ] **WO-036** Official-disaster alerts should link to responsible agencies and never promise risk prediction

### VitalOryx — one unique product checklist

**User:** Individuals looking for educational wellness and self-tracking. **Interface:** Calm accessible human wellbeing dashboard and habits calendar. **Scope:** Human fitness, sleep, stress, nutrition—not animal medicine or medical diagnosis.

- [ ] **VO-001** BMI calculator with interpretation limitations
- [ ] **VO-002** BMR calculator and displayed formula
- [ ] **VO-003** TDEE daily calorie range estimation
- [ ] **VO-004** Calorie budget scenario with nonprescriptive language
- [ ] **VO-005** Protein/macronutrient arithmetic with warnings
- [ ] **VO-006** Portion and food label comparison tool
- [ ] **VO-007** USDA or licensed food nutrition reference lookup
- [ ] **VO-008** Hydration and water habit log (not medical advice)
- [ ] **VO-009** Walking pace and distance calculator
- [ ] **VO-010** Running pace and target time calculator
- [ ] **VO-011** Heart rate training zone estimate educational tool
- [ ] **VO-012** Workout interval and rest timer
- [ ] **VO-013** Strength reps/sets/volume local tracker
- [ ] **VO-014** Weekly physical activity planner
- [ ] **VO-015** Running and walking mileage progress
- [ ] **VO-016** Mobility/stretching schedule checklist
- [ ] **VO-017** Fitness goal and weight trend visualization avoiding shame
- [ ] **VO-018** Daily wellness habit calendar
- [ ] **VO-019** Sleep schedule consistency tool
- [ ] **VO-020** Sleep debt estimation limitations
- [ ] **VO-021** Screen time and digital wellbeing planner
- [ ] **VO-022** Stress journaling and mindfulness breathing timer
- [ ] **VO-023** Home ergonomics checklist and stretch breaks
- [ ] **VO-024** Senior care visit and routine scheduler
- [ ] **VO-025** Caregiving task log with local export
- [ ] **VO-026** Medication appointment REMINDER record from clinician instructions only
- [ ] **VO-027** Menstrual period history log without pregnancy diagnosis
- [ ] **VO-028** Public health official guidance reference directory
- [ ] **VO-029** Preventive screening official information links
- [ ] **VO-030** Personal wellbeing CSV import/export with privacy
- [ ] **VO-031** Large-text and accessibility-first interface
- [ ] **VO-032** Privacy-preserving no-login health-related data storage
- [ ] **VO-033** Disclaimers on every health-sensitive calculator
- [ ] **VO-034** No symptom diagnosis, medical prescriptions or personalized treatment

### EduNovira — one unique product checklist

**User:** School/college/university students and independent jobseekers. **Interface:** Study planner, flashcards, practice quizzes, progress dashboard. **Scope:** Individual student success tools, no institutional ERP.

- [ ] **EN-001** Editable institutional GPA and CGPA scales
- [ ] **EN-002** Credit-weighted semester planning
- [ ] **EN-003** Required marks for grade target
- [ ] **EN-004** Attendance percentage and required additional attendance
- [ ] **EN-005** Exam countdown calendar
- [ ] **EN-006** Study time-block timetable maker
- [ ] **EN-007** Syllabus chapter completion progress
- [ ] **EN-008** Subject backlog planner
- [ ] **EN-009** Spaced repetition algorithm flashcards
- [ ] **EN-010** Vocabulary spaced repetition collections
- [ ] **EN-011** Local personal MCQ bank editor
- [ ] **EN-012** Timed quiz with review and explanations
- [ ] **EN-013** Rule-based study notes-to-quiz prompts without fake AI
- [ ] **EN-014** Math formula practice and unit arithmetic
- [ ] **EN-015** Science formula and unit conversion cards
- [ ] **EN-016** Pomodoro and focus timer
- [ ] **EN-017** Revision timeline based on exam dates
- [ ] **EN-018** Weak topics analytics from user practice
- [ ] **EN-019** Reading/comprehension progress planner
- [ ] **EN-020** Course/prerequisite path planning
- [ ] **EN-021** Academic writing outline assistant (templates only)
- [ ] **EN-022** Citation format builder with source verification
- [ ] **EN-023** Research literature matrix organizer
- [ ] **EN-024** Research paper discovery using licensed metadata and links
- [ ] **EN-025** Scholarship application checklist and official references
- [ ] **EN-026** University comparison decision matrix from sourced info
- [ ] **EN-027** Language-test progress tracker
- [ ] **EN-028** Career skills assessment worksheet
- [ ] **EN-029** Resume/CV structured composer and PDF export
- [ ] **EN-030** Interview practice question library and self-review
- [ ] **EN-031** Coding project/portfolio planning tracker
- [ ] **EN-032** Job and internship application tracker
- [ ] **EN-033** Official government job announcement link navigator with dates verified
- [ ] **EN-034** Local course/certificate progress log
- [ ] **EN-035** Offline flashcards and study exports
- [ ] **EN-036** Local backup and no account requirement
- [ ] **EN-037** No claims of verified jobs from headline-only aggregates


### LifeAlora — one unique product checklist

**User:** Homeowners, renters, travellers and companion-pet owners. **Interface:** Home design canvas, travel budget itinerary and pet care cards. **Scope:** Home/travel/pet-owner utility; NOT livestock commercial farm tools or human health advice.

- [ ] **LA-001** 2D room planner with movable furniture shapes
- [ ] **LA-002** Room/wall/ceiling area calculator
- [ ] **LA-003** Furniture size/door clearance checker
- [ ] **LA-004** Room paint amount and costs
- [ ] **LA-005** Floor tile/plank quantity estimator
- [ ] **LA-006** Wallpaper rolls and pattern-repeat estimator
- [ ] **LA-007** Concrete volume for home project planning
- [ ] **LA-008** Brick/block count and mortar estimate
- [ ] **LA-009** Roofing/ceiling materials estimator
- [ ] **LA-010** Fence/deck board length arithmetic
- [ ] **LA-011** Renovation itemized cost tracker
- [ ] **LA-012** Household appliance electricity cost planning
- [ ] **LA-013** House utility use log
- [ ] **LA-014** Property/rental recurring costs worksheet
- [ ] **LA-015** Home maintenance calendar
- [ ] **LA-016** Moving inventory/boxes and transport volume
- [ ] **LA-017** Moving abroad relocation budget planner
- [ ] **LA-018** Travel itinerary calendar and trip schedule
- [ ] **LA-019** Daily travel budget and group expense split
- [ ] **LA-020** Travel packing checklist builder
- [ ] **LA-021** Destination and visa official-document reference organizer
- [ ] **LA-022** Trip route export links without fake travel time
- [ ] **LA-023** Travel currency spending log from user-entered rates
- [ ] **LA-024** Travel insurance quote comparison from user input
- [ ] **LA-025** Dog/cat/other household pet profiles
- [ ] **LA-026** Pet age and milestone calendar with educational disclaimer
- [ ] **LA-027** Dog weight trend and growth history
- [ ] **LA-028** Cat weight trend and growth history
- [ ] **LA-029** Pet food monthly budget and label quantity recording
- [ ] **LA-030** Vet visit records and vaccinations based on vet's schedule
- [ ] **LA-031** Medication record from veterinary prescription, NO dosage advice
- [ ] **LA-032** Pet grooming and nail care reminder
- [ ] **LA-033** Dog walking/activity tracker
- [ ] **LA-034** Cat play enrichment scheduling
- [ ] **LA-035** Multiple pets feeding and expenses schedule
- [ ] **LA-036** Pet first-year adoption cost calculator
- [ ] **LA-037** Pet boarding and travel checklist
- [ ] **LA-038** Pet insurance quote comparison
- [ ] **LA-039** Lost-pet printable emergency profile
- [ ] **LA-040** Pet local record backup and restore
- [ ] **LA-041** Home, trip and pet outputs are visually different workspaces
- [ ] **LA-042** Pet content has official animal welfare references and zero clinical diagnosis

### TechDailyNews — one unique product checklist

**User:** Readers monitoring AI, software, startups, cyber threats and product releases. **Interface:** Tech newsroom plus official release-diff and security timeline. **Scope:** Technology intelligence, not geopolitical newsroom or JSON developer editor.

- [ ] **TD-001** Keep existing RSS/Atom 21-feed ingestion and refresh behavior
- [ ] **TD-002** Publisher per-feed rights and metadata permissions register
- [ ] **TD-003** Source health checks, delays and rate throttling
- [ ] **TD-004** RSS headline/time deduplication
- [ ] **TD-005** Same-company release and story clustering
- [ ] **TD-006** AI vendor model release tracker with official notes
- [ ] **TD-007** Documented new AI model features comparison
- [ ] **TD-008** AI version differences and change chronology
- [ ] **TD-009** Software version and release notes timeline
- [ ] **TD-010** Programming framework/runtime official releases
- [ ] **TD-011** Open-source GitHub project changelog index
- [ ] **TD-012** Operating system and browser security updates
- [ ] **TD-013** NIST NVD CVE explorer with source/updated date
- [ ] **TD-014** CVE patch/vendor advisory linking
- [ ] **TD-015** Security vulnerability status and severity cited correctly
- [ ] **TD-016** Tech outage and incident reporting source navigator, not false live status
- [ ] **TD-017** Startup funding announcement event clustering
- [ ] **TD-018** Technology acquisition and IPO announcement timeline
- [ ] **TD-019** Gadget product specification comparison only from sourced data
- [ ] **TD-020** Cloud service feature changes and roadmap announcements
- [ ] **TD-021** Robotics/semiconductor and electronics releases coverage
- [ ] **TD-022** Research paper discovery from authorized OpenAlex metadata
- [ ] **TD-023** Technology event and conference official calendar
- [ ] **TD-024** Software license change announcements
- [ ] **TD-025** Daily AI/software/security topical digests with source links
- [ ] **TD-026** Search by brand, vendor, tech keyword and date
- [ ] **TD-027** News source attribution with published versus fetched dates
- [ ] **TD-028** Story freshness badges based on real date
- [ ] **TD-029** Local saved stories and topic watchlist
- [ ] **TD-030** No copied full article text, unlicensed publisher images or fabricated reporting
- [ ] **TD-031** Rights-safe placeholder artwork
- [ ] **TD-032** News sitemap, category pages only if useful original content
- [ ] **TD-033** Tech product version explorer as a repeat-visit utility
- [ ] **TD-034** Automatic feed refresh with failure recovery and source audit
- [ ] **TD-035** Link each tech story to upstream official documents and original unique context
- [ ] **TD-036** No cross-posting general WorldOrixa politics, sports or cultures

### BrowserPixel — one unique product checklist

**User:** Image editors, creators, ecommerce sellers and designers. **Interface:** Canvas first, layer controls, batch output and before/after previews. **Scope:** Images only; advanced PDF document workspace belongs FileSwiftTools.

- [ ] **BP-001** Preserve all 30 original image utility URLs, calculations and exports
- [ ] **BP-002** Non-destructive layer-based image studio
- [ ] **BP-003** History undo/redo timeline
- [ ] **BP-004** Smart target file size compressor with quality estimate
- [ ] **BP-005** Before/after pixel and size comparison
- [ ] **BP-006** Color corrections brightness/exposure/contrast/saturation
- [ ] **BP-007** Tone curves and histogram with movable points
- [ ] **BP-008** White balance and color temperature
- [ ] **BP-009** Selective blur and privacy mosaic brushes
- [ ] **BP-010** Mask/selection with brush and eraser
- [ ] **BP-011** Perspective transform and photo deskew
- [ ] **BP-012** Image crop assistant with subject-aware heuristic
- [ ] **BP-013** On-device foreground/background remover when compatible
- [ ] **BP-014** Background color/gradient/custom background replacement
- [ ] **BP-015** Product photo white background and correct centering
- [ ] **BP-016** Ecommerce photo shadow and reflection generator
- [ ] **BP-017** Ecommerce batch image presets for marketplaces
- [ ] **BP-018** Brand kit: local palette, fonts, logo and layout presets
- [ ] **BP-019** Thumbnail design editor with text/shapes/layers
- [ ] **BP-020** Social graphic safe-zone overlay and editable presets
- [ ] **BP-021** Batch logo watermark with positioning
- [ ] **BP-022** Bulk conversion with original file names or rename templates
- [ ] **BP-023** Responsive image srcset generator
- [ ] **BP-024** Multiple export sizes and formats in ZIP
- [ ] **BP-025** AVIF support only when encoding/decoding available
- [ ] **BP-026** Print contact sheet and photo-grid collages
- [ ] **BP-027** Image overlays, blending and opacity
- [ ] **BP-028** Animated GIF frame extractor and creator
- [ ] **BP-029** Sprite sheet and multi-size favicon package
- [ ] **BP-030** Passport print sheet from sizes with government compliance caution
- [ ] **BP-031** Face/subject crop optional local model with device warnings
- [ ] **BP-032** Optional local image denoise and upscale, never paid API
- [ ] **BP-033** Image color palette and WCAG contrast inspection
- [ ] **BP-034** Clipboard paste and drag-drop upload
- [ ] **BP-035** Local design project save/import/export
- [ ] **BP-036** Large canvas memory guard and Web Worker progress
- [ ] **BP-037** SVG sanitization and file input validation
- [ ] **BP-038** EXIF orientation correction and metadata audit
- [ ] **BP-039** Keyboard and touch-friendly visual editor
- [ ] **BP-040** Clear per-tool examples, result preview, device support and no-upload privacy text

### FileSwiftTools — one unique product checklist

**User:** Office users, document workers, students and small businesses. **Interface:** Multi-PDF workspace with page thumbnails, comparison, annotations and export. **Scope:** PDF and file processing only; standalone photo editor belongs BrowserPixel.

- [ ] **FS-001** Preserve existing 30 PDF/file utility URLs and output compatibility
- [ ] **FS-002** Visual PDF thumbnail drag-and-drop page organizer
- [ ] **FS-003** Split and merge PDF with multi-file previews
- [ ] **FS-004** Custom page-range extractor and insert
- [ ] **FS-005** Interleave scanned front/back pages
- [ ] **FS-006** PDF booklet and N-up printing
- [ ] **FS-007** PDF form fields filler, with supported field caveats
- [ ] **FS-008** Supported PDF form creation interface
- [ ] **FS-009** Highlight, shapes, notes and annotations
- [ ] **FS-010** Header/footer and page-number templates
- [ ] **FS-011** Bates numbering by user pattern
- [ ] **FS-012** Crop/rotate/page size normalization preview
- [ ] **FS-013** PDF text compare two documents
- [ ] **FS-014** Visual PDF diff overlay across pages
- [ ] **FS-015** PDF font/image/metadata inspector
- [ ] **FS-016** OCR scanned PDF text extraction in browser
- [ ] **FS-017** Optional Bangla and English OCR models
- [ ] **FS-018** Searchable PDF text layer creation where validated
- [ ] **FS-019** Region-based OCR text selection and correction
- [ ] **FS-020** Scan deskew and contrast improvement
- [ ] **FS-021** Blank page and duplicate page identification
- [ ] **FS-022** PDF bookmarks/outline viewer and compatible editor
- [ ] **FS-023** PDF attachments list and safe extraction
- [ ] **FS-024** Extract text-based tables into CSV where possible
- [ ] **FS-025** Digital signature presence status; never falsely claim verified
- [ ] **FS-026** Draw/type/position visible signature, not cryptographic signature
- [ ] **FS-027** Password-protect/authorized unlock with vetted local library
- [ ] **FS-028** PDF redaction only when underlying content removal is verified
- [ ] **FS-029** File compression to user target size with achievable quality caveat
- [ ] **FS-030** Text-preserving compression option where supported
- [ ] **FS-031** ZIP archive inspect and path traversal protection
- [ ] **FS-032** SHA-256 file integrity checker
- [ ] **FS-033** Batch operations workflow editor, order/undo and progress
- [ ] **FS-034** Local PDF project history stored only on device
- [ ] **FS-035** Memory-aware large document operation and cancellation
- [ ] **FS-036** Document privacy/no-server upload explanations
- [ ] **FS-037** Warning signed PDFs may lose validity after modification
- [ ] **FS-038** PDF-to-Word fidelity not advertised without proven implementation
- [ ] **FS-039** Document outputs keyboard accessible, mobile-ready and downloadable

### ShiftCalcTools — one unique product checklist

**User:** Shift workers, freelancers, HR/payroll assistants and small employers. **Interface:** Shift calendar, time-entry grid, pay scenarios and printable rosters. **Scope:** Paid-work time and gross payroll estimates, not mortgages/financial investments.

- [ ] **SC-001** Preserve all existing 50 calculator URLs and formulas
- [ ] **SC-002** Drag-drop weekly/monthly shift schedule calendar
- [ ] **SC-003** Rotating schedule presets and custom cycles
- [ ] **SC-004** 24-hour coverage map for a team
- [ ] **SC-005** Employee availability inputs and time-off requests
- [ ] **SC-006** Shift overlap and schedule conflict detection
- [ ] **SC-007** User-configured minimum rest between shifts
- [ ] **SC-008** Weekend/night shift fairness distribution
- [ ] **SC-009** Time zone and daylight saving accurate shift length
- [ ] **SC-010** Multi-time-zone cross-location shift comparison
- [ ] **SC-011** Personal clock-in/out and time logs
- [ ] **SC-012** Missed punch and invalid entry warnings
- [ ] **SC-013** Timesheet CSV import with column mapping
- [ ] **SC-014** Timetable edit with break time adjustments
- [ ] **SC-015** Daily/weekly overtime threshold rule builder
- [ ] **SC-016** Overnight shift split by local date
- [ ] **SC-017** Premium stacking rules for holiday/night/weekend
- [ ] **SC-018** Multiple hourly rates and blended overtime
- [ ] **SC-019** Salary/gross paycheck scenarios with optional assumptions
- [ ] **SC-020** Planned versus actual worked hours reconciliation
- [ ] **SC-021** Payment date and pay period calendar
- [ ] **SC-022** Monthly/annual earning forecast from entered shifts
- [ ] **SC-023** PTO accrual and usage tracking across calendar
- [ ] **SC-024** Leave request conflict and balance simulation
- [ ] **SC-025** Shift swaps and coverage recalculation
- [ ] **SC-026** Freelancer client-wise billable hour tracker
- [ ] **SC-027** Tips sharing and commission tier scenarios
- [ ] **SC-028** Labor budget and worker allocation scenarios
- [ ] **SC-029** Staff requirement/coverage heatmap
- [ ] **SC-030** Shift load and work-rest pattern chart
- [ ] **SC-031** User-defined rounding rules and audit details
- [ ] **SC-032** Export timecards as CSV/printable PDF
- [ ] **SC-033** ICS calendar export to Google/Outlook apps
- [ ] **SC-034** Editable currency/units/locale presentation
- [ ] **SC-035** Local project export and cross-device import
- [ ] **SC-036** Work hours tests including overnight and DST edge cases
- [ ] **SC-037** No automatic tax or national labor law assumed without verified jurisdiction rules
- [ ] **SC-038** Mobile accessible calendar and payroll worksheet
- [ ] **SC-039** Related original guides for shift patterns, break and payroll methods


## PRESERVE ALL 110 EXISTING TOOL URLS — REGRESSION CHECKLIST

This inventory is generated from the repository files. Checked only after actual browser test, output fixture, error-path test, phone test and deployed compatibility. Do not remove/rename existing working tools simply to fit new brand boundaries.

### BrowserPixel — existing URLs (30)

- [ ] **BP-EXIST-001** Preserve /compress-image/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-002** Preserve /resize-image/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-003** Preserve /crop-image/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-004** Preserve /rotate-image/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-005** Preserve /flip-image/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-006** Preserve /bulk-image-compressor/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-007** Preserve /bulk-image-resizer/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-008** Preserve /reduce-image-quality/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-009** Preserve /image-dimensions-checker/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-010** Preserve /image-file-size-checker/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-011** Preserve /jpg-to-png/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-012** Preserve /png-to-jpg/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-013** Preserve /webp-to-jpg/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-014** Preserve /jpg-to-webp/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-015** Preserve /png-to-webp/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-016** Preserve /webp-to-png/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-017** Preserve /svg-to-png/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-018** Preserve /bmp-to-jpg/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-019** Preserve /image-to-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-020** Preserve /passport-photo-maker/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-021** Preserve /profile-picture-maker/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-022** Preserve /favicon-generator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-023** Preserve /thumbnail-maker/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-024** Preserve /watermark-image/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-025** Preserve /remove-image-metadata/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-026** Preserve /change-image-dpi/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-027** Preserve /aspect-ratio-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-028** Preserve /pixel-to-inch-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-029** Preserve /grayscale-image/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **BP-EXIST-030** Preserve /social-media-image-resizer/: verify working input, existing output, downloads, errors, keyboard, and mobile.

### FileSwiftTools — existing URLs (30)

- [ ] **FS-EXIST-001** Preserve /merge-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-002** Preserve /compress-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-003** Preserve /split-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-004** Preserve /pdf-to-jpg/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-005** Preserve /images-to-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-006** Preserve /remove-pdf-metadata/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-007** Preserve /rotate-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-008** Preserve /delete-pdf-pages/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-009** Preserve /extract-pdf-pages/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-010** Preserve /reorder-pdf-pages/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-011** Preserve /add-page-numbers/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-012** Preserve /add-watermark/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-013** Preserve /crop-pdf-pages/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-014** Preserve /flatten-pdf-forms/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-015** Preserve /grayscale-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-016** Preserve /pdf-to-png/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-017** Preserve /jpg-to-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-018** Preserve /png-to-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-019** Preserve /webp-to-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-020** Preserve /text-to-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-021** Preserve /markdown-to-pdf/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-022** Preserve /pdf-to-text/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-023** Preserve /pdf-page-counter/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-024** Preserve /pdf-page-size-checker/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-025** Preserve /pdf-file-size-checker/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-026** Preserve /view-pdf-metadata/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-027** Preserve /zip-file-creator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-028** Preserve /zip-file-extractor/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-029** Preserve /file-hash-generator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **FS-EXIST-030** Preserve /file-to-base64/: verify working input, existing output, downloads, errors, keyboard, and mobile.

### ShiftCalcTools — existing URLs (50)

- [ ] **SC-EXIST-001** Preserve /work-hours-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-002** Preserve /time-card-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-003** Preserve /break-time-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-004** Preserve /shift-length-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-005** Preserve /overnight-shift-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-006** Preserve /weekly-hours-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-007** Preserve /biweekly-hours-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-008** Preserve /monthly-work-hours-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-009** Preserve /annual-work-hours-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-010** Preserve /multiple-shift-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-011** Preserve /shift-overlap-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-012** Preserve /decimal-hours-converter/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-013** Preserve /hourly-to-salary-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-014** Preserve /salary-to-hourly-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-015** Preserve /daily-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-016** Preserve /weekly-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-017** Preserve /biweekly-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-018** Preserve /semi-monthly-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-019** Preserve /monthly-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-020** Preserve /paycheck-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-021** Preserve /salary-raise-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-022** Preserve /pay-cut-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-023** Preserve /unpaid-time-deduction-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-024** Preserve /bonus-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-025** Preserve /commission-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-026** Preserve /tip-income-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-027** Preserve /freelance-rate-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-028** Preserve /earnings-per-shift-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-029** Preserve /overtime-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-030** Preserve /double-time-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-031** Preserve /holiday-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-032** Preserve /weekend-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-033** Preserve /shift-differential-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-034** Preserve /night-shift-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-035** Preserve /blended-overtime-rate-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-036** Preserve /overtime-hours-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-037** Preserve /comp-time-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-038** Preserve /premium-pay-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-039** Preserve /pto-accrual-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-040** Preserve /pto-payout-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-041** Preserve /leave-balance-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-042** Preserve /vacation-days-to-hours-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-043** Preserve /work-experience-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-044** Preserve /notice-period-date-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-045** Preserve /mileage-reimbursement-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-046** Preserve /fuel-cost-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-047** Preserve /commute-cost-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-048** Preserve /cost-per-mile-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-049** Preserve /trip-cost-split-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.
- [ ] **SC-EXIST-050** Preserve /mileage-log-total-calculator/: verify working input, existing output, downloads, errors, keyboard, and mobile.

## MONOREPO EXISTING 300 TOPIC INDEXING/UTILITY AUDIT

Topic audit does NOT mean a topic is an already working advanced tool or deserves indexing. Check it only after distinct search intent, a useful interactive tool or substantial researched primary-source content, accurate claims, unique ownership and tested index/noindex status.

### CoinMetriq — 30 known topics

- [ ] **TOP-CM-01** Bitcoin Price (Markets & Prices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-02** Ethereum Markets (Markets & Prices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-03** Altcoin Research (Markets & Prices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-04** Stablecoins (Markets & Prices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-05** Market Heatmaps (Markets & Prices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-06** Crypto Market Capitalization (Markets & Prices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-07** Tokenomics (Tokens & Networks): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-08** Gas Fees (Tokens & Networks): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-09** Layer 2 Networks (Tokens & Networks): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-10** Blockchain Explorers (Tokens & Networks): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-11** Mining Economics (Tokens & Networks): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-12** Staking Basics (Tokens & Networks): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-13** Decentralized Finance (Participation & DeFi): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-14** Liquidity Pools (Participation & DeFi): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-15** Wallet Management (Participation & DeFi): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-16** Hardware Wallets (Participation & DeFi): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-17** Phishing & Scam Signals (Participation & DeFi): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-18** Smart Contract Risk (Participation & DeFi): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-19** Crypto Regulations (Risk & Security): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-20** Crypto Tax Concepts (Risk & Security): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-21** Portfolio Allocation (Risk & Security): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-22** Profit & Loss Calculator (Risk & Security): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-23** Volatility Analytics (Risk & Security): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-24** Market Sentiment (Risk & Security): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-25** On-chain Activity (Research & Utilities): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-26** Exchange Comparison (Research & Utilities): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-27** Cross-chain Bridges (Research & Utilities): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-28** Bitcoin Halving (Research & Utilities): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-29** Crypto Glossary (Research & Utilities): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-CM-30** Crypto News & Research (Research & Utilities): validate original value, unique canonical owner, sources and indexing choice.

### EarthViora — 30 known topics

- [ ] **TOP-EV-01** Global Weather (Weather & Hazards): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-02** Flood Risk (Weather & Hazards): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-03** Cyclones & Storms (Weather & Hazards): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-04** Earthquake Monitoring (Weather & Hazards): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-05** Wildfire Monitoring (Weather & Hazards): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-06** Heatwaves (Weather & Hazards): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-07** Satellite Imagery (Land & Satellite): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-08** Land-cover Change (Land & Satellite): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-09** River Erosion (Land & Satellite): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-10** Urban Expansion (Land & Satellite): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-11** Forest Monitoring (Land & Satellite): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-12** Crop Vegetation Indices (Land & Satellite): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-13** Agricultural Drought (Water & Air): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-14** Soil Moisture (Water & Air): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-15** Ground Motion (Water & Air): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-16** Water Quality (Water & Air): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-17** Groundwater Trends (Water & Air): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-18** Rainwater Harvesting (Water & Air): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-19** Ocean Conditions (Climate & Ecology): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-20** Sea-level Change (Climate & Ecology): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-21** Air Quality (Climate & Ecology): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-22** Climate Indicators (Climate & Ecology): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-23** Carbon Emissions (Climate & Ecology): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-24** Biodiversity Maps (Climate & Ecology): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-25** Protected Areas (Space & Research): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-26** Space Weather (Space & Research): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-27** Satellite Tracking (Space & Research): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-28** Astronomy Events (Space & Research): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-29** Environmental Data Sources (Space & Research): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EV-30** Disaster Preparedness (Space & Research): validate original value, unique canonical owner, sources and indexing choice.

### SolarQentra — 30 known topics

- [ ] **TOP-SQ-01** Solar Panel Sizing (Solar Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-02** Solar Production Calculator (Solar Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-03** Solar Installation Planning (Solar Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-04** Solar Return on Investment (Solar Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-05** Solar Inverter Sizing (Solar Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-06** Solar Panel Comparison (Solar Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-07** Residential Electricity Bills (Electricity & Backup): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-08** Electricity Tariffs (Electricity & Backup): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-09** Appliance Energy Costs (Electricity & Backup): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-10** Energy Saving Planner (Electricity & Backup): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-11** Battery Backup Calculator (Electricity & Backup): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-12** Lithium vs Lead-acid (Electricity & Backup): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-13** UPS Runtime (EV & Transport): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-14** Generator Sizing (EV & Transport): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-15** Commercial Energy Audit (EV & Transport): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-16** EV Charging Cost (EV & Transport): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-17** EV Range Estimator (EV & Transport): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-18** EV Battery Health (EV & Transport): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-19** EV vs Petrol Costs (Equipment & Ownership): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-20** Home Charger Installation (Equipment & Ownership): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-21** Public Charging Networks (Equipment & Ownership): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-22** E-bike Range (Equipment & Ownership): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-23** Vehicle Fuel Cost (Equipment & Ownership): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-24** Car Ownership Cost (Equipment & Ownership): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-25** Vehicle Maintenance (Market & Efficiency): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-26** Home Power Load (Market & Efficiency): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-27** Wind & Hybrid Energy (Market & Efficiency): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-28** Energy Storage Economics (Market & Efficiency): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-29** Grid & Net Metering (Market & Efficiency): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-SQ-30** Clean Energy Trends (Market & Efficiency): validate original value, unique canonical owner, sources and indexing choice.

### TechOrvia — 30 known topics

- [ ] **TOP-TO-01** AI Model Comparison (AI & Computation): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-02** AI API Cost Calculator (AI & Computation): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-03** Prompt Engineering (AI & Computation): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-04** AI Agents (AI & Computation): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-05** Local AI Hardware (AI & Computation): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-06** GPU Cloud Pricing (AI & Computation): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-07** AI Safety & Privacy (Software & Developer Tools): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-08** Open Source AI (Software & Developer Tools): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-09** Programming Tools (Software & Developer Tools): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-10** API Testing (Software & Developer Tools): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-11** JSON Tools (Software & Developer Tools): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-12** Regex & Text Utilities (Software & Developer Tools): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-13** PDF Utilities (Security & Web): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-14** Image Utilities (Security & Web): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-15** Domain & DNS (Security & Web): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-16** Cloud Hosting (Security & Web): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-17** Cybersecurity Basics (Security & Web): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-18** Password Security (Security & Web): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-19** Privacy Protection (Creator Studio): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-20** Website Performance (Creator Studio): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-21** YouTube SEO (Creator Studio): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-22** Video Creator Tools (Creator Studio): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-23** Thumbnail Planning (Creator Studio): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-24** Social Media Analytics (Creator Studio): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-25** Content Calendar (Robotics & Devices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-26** Robotics (Robotics & Devices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-27** Drones (Robotics & Devices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-28** IoT & Microcontrollers (Robotics & Devices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-29** 3D Printing (Robotics & Devices): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-TO-30** Technology News (Robotics & Devices): validate original value, unique canonical owner, sources and indexing choice.

### MoneyAvora — 30 known topics

- [ ] **TOP-MA-01** Loan EMI Calculator (Personal Finance): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-02** Savings Planner (Personal Finance): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-03** Fixed Deposits (Personal Finance): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-04** Banking Fees (Personal Finance): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-05** Credit Card Interest (Personal Finance): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-06** Personal Budget (Personal Finance): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-07** Stock Market Basics (Investing & Markets): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-08** Portfolio Diversification (Investing & Markets): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-09** Forex & Currency (Investing & Markets): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-10** Gold & Silver (Investing & Markets): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-11** Inflation Calculator (Investing & Markets): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-12** Insurance Planning (Investing & Markets): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-13** Business Break-even (Business Calculators): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-14** Profit Margin (Business Calculators): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-15** Cash Flow Forecasting (Business Calculators): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-16** Invoice & Tax Concepts (Business Calculators): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-17** Salary & Payroll (Business Calculators): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-18** Small Business KPIs (Business Calculators): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-19** Import Cost (Import & Export): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-20** Export Pricing (Import & Export): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-21** Freight Cost (Import & Export): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-22** Container Capacity (Import & Export): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-23** HS Codes (Import & Export): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-24** Customs Duties (Import & Export): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-25** International Shipping (Economic Intelligence): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-26** Trade Documents (Economic Intelligence): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-27** Global GDP (Economic Intelligence): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-28** Interest Rates (Economic Intelligence): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-29** Economic Indicators (Economic Intelligence): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-MA-30** Business News (Economic Intelligence): validate original value, unique canonical owner, sources and indexing choice.

### IndustryLuma — 30 known topics

- [ ] **TOP-IL-01** Factory OEE (Factory Operations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-02** Production Capacity (Factory Operations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-03** Manufacturing Cost (Factory Operations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-04** Downtime Tracking (Factory Operations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-05** Production Scheduling (Factory Operations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-06** Labor Productivity (Factory Operations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-07** Quality Control (Quality & Safety): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-08** Defect Rate (Quality & Safety): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-09** Industrial Safety (Quality & Safety): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-10** Machine Maintenance (Quality & Safety): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-11** ETP & Effluent (Quality & Safety): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-12** Industrial Water Use (Quality & Safety): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-13** Packaging Cost (Materials & Sustainability): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-14** Plastic Recycling (Materials & Sustainability): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-15** Extended Producer Responsibility (Materials & Sustainability): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-16** E-Waste Management (Materials & Sustainability): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-17** Scrap Materials (Materials & Sustainability): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-18** Carbon Footprint (Materials & Sustainability): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-19** Farming Operations (Agriculture & Food): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-20** Livestock Management (Agriculture & Food): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-21** Fisheries & Aquaculture (Agriculture & Food): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-22** Crop Yield (Agriculture & Food): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-23** Food Processing (Agriculture & Food): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-24** Cold Chain (Agriculture & Food): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-25** Agricultural Equipment (Automation & Analytics): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-26** Factory Automation (Automation & Analytics): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-27** Industrial Robotics (Automation & Analytics): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-28** Factory Energy (Automation & Analytics): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-29** Supply Chain KPIs (Automation & Analytics): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-IL-30** Industrial Data Analytics (Automation & Analytics): validate original value, unique canonical owner, sources and indexing choice.

### WorldOrixa — 30 known topics

- [ ] **TOP-WO-01** World Headlines (Global Affairs): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-02** United States News (Global Affairs): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-03** Europe & EU (Global Affairs): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-04** Asia Pacific (Global Affairs): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-05** Middle East (Global Affairs): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-06** Africa & Emerging Regions (Global Affairs): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-07** Global Politics (Government & Society): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-08** Elections & Voting (Government & Society): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-09** Government & Policy (Government & Society): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-10** International Law (Government & Society): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-11** Human Rights (Government & Society): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-12** Global Diplomacy (Government & Society): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-13** Country Profiles (World Data): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-14** Population Statistics (World Data): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-15** Economic Rankings (World Data): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-16** World Maps & Geography (World Data): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-17** Cricket (World Data): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-18** Football (World Data): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-19** Basketball (Sports): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-20** Tennis (Sports): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-21** Motorsport (Sports): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-22** Olympics & Athletics (Sports): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-23** Movies & TV (Sports): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-24** Music & Culture (Sports): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-25** Gaming & Esports (Culture & Events): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-26** Books & Arts (Culture & Events): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-27** Global Events (Culture & Events): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-28** Public Holidays (Culture & Events): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-29** Festivals & Traditions (Culture & Events): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-WO-30** World Data Explorer (Culture & Events): validate original value, unique canonical owner, sources and indexing choice.

### VitalOryx — 30 known topics

- [ ] **TOP-VO-01** Nutrition Basics (Nutrition & Physical Health): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-02** Calories & Energy (Nutrition & Physical Health): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-03** BMI Calculator (Nutrition & Physical Health): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-04** Protein Intake (Nutrition & Physical Health): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-05** Hydration (Nutrition & Physical Health): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-06** Food Labels (Nutrition & Physical Health): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-07** Walking & Cardio (Movement & Fitness): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-08** Strength Training (Movement & Fitness): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-09** Flexibility & Mobility (Movement & Fitness): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-10** Fitness Metrics (Movement & Fitness): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-11** Weight Management (Movement & Fitness): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-12** Workout Planning (Movement & Fitness): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-13** Sleep Basics (Mental Wellbeing): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-14** Stress Management (Mental Wellbeing): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-15** Mindfulness (Mental Wellbeing): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-16** Digital Wellbeing (Mental Wellbeing): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-17** Healthy Habits (Mental Wellbeing): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-18** Mental Health Literacy (Mental Wellbeing): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-19** Women's Health (Life Stages): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-20** Men's Health (Life Stages): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-21** Children's Health (Life Stages): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-22** Senior Wellness (Life Stages): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-23** Accessibility (Life Stages): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-24** Home Safety (Life Stages): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-25** Caregiving Basics (Public Health & Care): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-26** Public Health (Public Health & Care): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-27** Preventive Screening (Public Health & Care): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-28** Medical Research (Public Health & Care): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-29** Health Technology (Public Health & Care): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-VO-30** Wellness Recipes (Public Health & Care): validate original value, unique canonical owner, sources and indexing choice.

### EduNovira — 30 known topics

- [ ] **TOP-EN-01** School Learning (Learning Foundations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-02** Mathematics (Learning Foundations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-03** Science Learning (Learning Foundations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-04** English Learning (Learning Foundations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-05** Coding Fundamentals (Learning Foundations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-06** Digital Literacy (Learning Foundations): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-07** GPA Calculator (Academic Success): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-08** CGPA Planning (Academic Success): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-09** Exam Preparation (Academic Success): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-10** Study Planner (Academic Success): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-11** Academic Writing (Academic Success): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-12** Research Skills (Academic Success): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-13** Scholarships (Study Abroad & Credentials): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-14** Study Abroad (Study Abroad & Credentials): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-15** Universities & Courses (Study Abroad & Credentials): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-16** Online Courses (Study Abroad & Credentials): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-17** Professional Certifications (Study Abroad & Credentials): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-18** Language Tests (Study Abroad & Credentials): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-19** Government Jobs (Jobs & Careers): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-20** Private Sector Careers (Jobs & Careers): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-21** Remote Work (Jobs & Careers): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-22** Freelancing (Jobs & Careers): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-23** Internships (Jobs & Careers): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-24** Career Change (Jobs & Careers): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-25** Job Market Skills (Career Tools & Skills): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-26** CV Builder Guide (Career Tools & Skills): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-27** Interview Preparation (Career Tools & Skills): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-28** Portfolio Projects (Career Tools & Skills): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-29** Skill Assessment (Career Tools & Skills): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-EN-30** Career Learning Roadmap (Career Tools & Skills): validate original value, unique canonical owner, sources and indexing choice.

### LifeAlora — 30 known topics

- [ ] **TOP-LA-01** Travel Destinations (Travel Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-02** Travel Budget (Travel Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-03** Visa Information (Travel Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-04** Flights & Airports (Travel Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-05** Hotels & Stays (Travel Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-06** Local Transport (Travel Planning): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-07** Travel Insurance (Moving & Living): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-08** Travel Packing (Moving & Living): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-09** Country Guides (Moving & Living): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-10** Trip Itinerary (Moving & Living): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-11** Cost of Living (Moving & Living): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-12** Moving Abroad (Moving & Living): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-13** Real Estate Basics (Property & Construction): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-14** Rent vs Buy (Property & Construction): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-15** Mortgage Planning (Property & Construction): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-16** Construction Cost (Property & Construction): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-17** Building Materials (Property & Construction): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-18** Home Renovation (Property & Construction): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-19** Interior Design (Home & Everyday Life): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-20** Space Planning (Home & Everyday Life): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-21** Home Utilities (Home & Everyday Life): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-22** Home Maintenance (Home & Everyday Life): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-23** Kitchen & Appliances (Home & Everyday Life): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-24** Food & Restaurants (Home & Everyday Life): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-25** Everyday Calculators (Pets & Shopping): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-26** Pet Care Basics (Pets & Shopping): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-27** Dog Care (Pets & Shopping): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-28** Cat Care (Pets & Shopping): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-29** Pet Budget (Pets & Shopping): validate original value, unique canonical owner, sources and indexing choice.
- [ ] **TOP-LA-30** Consumer Buying Guides (Pets & Shopping): validate original value, unique canonical owner, sources and indexing choice.

## DATA SOURCE RIGHTS / ZERO-COST RULES

| Source | Products | Free-commercial rule |
|---|---|---|
| NASA GIBS / EONET | EarthViora | Attribute NASA, inspect image-level third-party permissions, measure freshness; never imply NASA endorsement |
| USGS earthquake feeds | EarthViora | Show event date and agency, no prediction claim |
| Copernicus Sentinel/CDSE | EarthViora | Check license, account and processing quotas; attribution |
| PVGIS European Commission/JRC | SolarQentra | Check official usage terms and credit data and assumptions |
| World Bank public indicators | MoneyAvora / WorldOrixa | Individual dataset license, timestamp and attribution |
| NIST NVD | TechDailyNews | CVE links, API key budget/rate limits, do not fake patched status |
| OpenAlex | EduNovira / TechDailyNews | Free daily budget, lawful metadata, links not copyrighted full text |
| USDA FoodData Central | VitalOryx | Commercial reuse/credits and API key handling checked |
| Publisher RSS/Atom feeds | WorldOrixa / TechDailyNews | Terms per source: snippet/headline access is not full article/image republication rights |
| MapLibre / Leaflet / OpenStreetMap tiles | EarthViora / LifeAlora | Open source rendering libraries do NOT mean limitless free map tile hosting; attribution and tile policy |
| Open-Meteo standard free hosted API | Weather-related products | Noncommercial only: NEVER use in ad-funded service absent appropriate license |
| CoinGecko Demo/free API | CoinMetriq | Do not presume ad-funded commercial license; rely on CSV/manual input unless lawful source approved |
| WASM, models, OCR packages | BrowserPixel / FileSwiftTools / TechOrvia | Separate model-weight, software, assets and language-pack commercial licenses are checked |

## AD-FIRST WITHOUT DESTROYING USER VALUE

- [ ] **ADS-001** One independent product design per site; ad revenue depends on real organic visits and useful tasks, not page inflation
- [ ] **ADS-002** AdSense account/site acceptance is external and must be verified; no guarantee of approval or income
- [ ] **ADS-003** AdSense ads only on eligible, substantial original content/real useful tools
- [ ] **ADS-004** Keep ad labels and positions separate from upload, calculate, download, map controls or editors
- [ ] **ADS-005** No required ad interaction, no aggressive popunder, no misleading link disguised as tool UI
- [ ] **ADS-006** Review existing Adsterra popunder/social-bar implementations for policy and UX conflicts
- [ ] **ADS-007** Use accurate privacy disclosure, consent and certified CMP where legally and contractually required
- [ ] **ADS-008** Use real publisher-authorized ads.txt; do not invent AdSense IDs
- [ ] **ADS-009** Reserve ad dimensions to avoid layout shift, test mobile accidental taps
- [ ] **ADS-010** Analytics track valid traffic, task completions, organic queries, page RPM and ads policy status
- [ ] **ADS-011** Each product gets independently written examples and original data-backed explanations, not repetitive filler
- [ ] **ADS-012** One site that grows organically may justify more maintenance, but all 14 remain on this single unified backlog
- [ ] **ADS-013** No duplicate cross-site keyword pages and no unnatural backlink network
- [ ] **ADS-014** News content uses direct source links, meaningful verification and context, not full copied publisher stories
- [ ] **ADS-015** Monitor ad performance with per-site measurement while protecting visitor local data

## DEFINITION OF DONE AND CONTINUATION CONTRACT

- [ ] **DONE-001** Feature executes correctly at actual deployed canonical public URL, not merely a README description
- [ ] **DONE-002** No visitor account, payment, subscription or required ad click
- [ ] **DONE-003** Existing tool functionality and URLs retained with regression fixtures
- [ ] **DONE-004** Outputs tested against known cases plus invalid, empty and low-memory mobile cases
- [ ] **DONE-005** Source/license documented for any remote public data, images, ML model or library
- [ ] **DONE-006** Original page-specific useful content and correct indexability choice
- [ ] **DONE-007** Actual accessible interface with keyboard/touch and safe error handling
- [ ] **DONE-008** No unsupported claims (real-time, medical, financial, legal, veterinary, engineering or breaking news)
- [ ] **DONE-009** No off-device private file upload by default; local data erase/export controls
- [ ] **DONE-010** Ads policy, consent, ads.txt and publisher approval independently checked before monetization
- [ ] **DONE-011** GitHub commit SHA and live deployed evidence recorded against checklist ID
- [ ] **DONE-012** Checklist can be checked ONLY after all evidence exists; no phase/version/status inflation

When continuing the work, read this exact Markdown file first. Identify unchecked task IDs, inspect the actual owner repository, preserve existing behavior, implement feature end-to-end and attach tests, source/rights notes, deploy proof and commit. One task list, zero phases/versions, fourteen unique products. Do not mark incomplete work as completed.

## VERIFIED POLICY / DOCUMENTATION REFERENCES

- Google Search spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google Publisher Policies: https://support.google.com/adsense/answer/10502938
- Google AdSense ad placement: https://support.google.com/adsense/answer/1346295
- Google AdSense program policy: https://support.google.com/adsense/answer/48182
- Cloudflare Pages quotas: https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Workers quotas: https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare D1 limits: https://developers.cloudflare.com/d1/platform/limits/
- Cloudflare D1 Free daily enforcement: https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/
- Open-Meteo pricing and terms: https://open-meteo.com/en/pricing
- CoinGecko API license: https://support.coingecko.com/articles/1043089972-what-are-the-differences-between-commercial-and-custom-licenses
- Copernicus source portal: https://dataspace.copernicus.eu/
- NASA GIBS: https://gibs.earthdata.nasa.gov/
- PVGIS: https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis_en
- USGS Earthquake feeds: https://earthquake.usgs.gov/earthquakes/feed/v1.0/
- NIST NVD: https://nvd.nist.gov/developers
- OpenAlex: https://openalex.org/


## SEO AND GEO ORGANIC TRAFFIC MASTER CHECKLIST

**Single backlog expansion, not a version/phase.** The 14 unique free product sites must earn legitimate traffic; being hosted does not prove indexing, visitors, AI citations, monetization approval or revenue. All tasks start unchecked.

### Existing audit findings

- Monorepo README confirms 300 short topic overviews held noindex,follow until substantive original content is created. Preserve those exclusions.
- BrowserPixel, FileSwiftTools and ShiftCalcTools homepage HTML was accessible to a public text fetch, but this is not end-to-end browser functionality or indexing verification.
- TechDailyNews README describes RSS ingestion and 8 pre-rendered topic hubs, but RSS metadata alone is not original reporting.
- Search tool could not retrieve CoinMetriq and TechDailyNews hostnames on this check. It does not establish downtime; verify actual Cloudflare deploy/crawl logs.
- Search Console verification and site-by-site impressions, SEO clicks, actual revenue and GEO citation status remain unverified.

### Technical SEO across all 14 products

- [ ] **SEO-GLOBAL-001** Verify canonical live production URL and domain for each site; repository README is not live proof
- [ ] **SEO-GLOBAL-002** Verify and record each of 14 website properties in Google Search Console
- [ ] **SEO-GLOBAL-003** Verify and record each of 14 website properties in Bing Webmaster Tools
- [ ] **SEO-GLOBAL-004** Validate robots.txt, crawlability and snippet eligibility for useful pages
- [ ] **SEO-GLOBAL-005** Generate correct public sitemap.xml including indexable canonical URLs only
- [ ] **SEO-GLOBAL-006** Update sitemap lastmod only for material content changes
- [ ] **SEO-GLOBAL-007** Keep 300 short Monorepo topic stubs noindex until genuinely useful and originally researched
- [ ] **SEO-GLOBAL-008** Audit redirects, www/pages.dev/custom domain canonical consistency
- [ ] **SEO-GLOBAL-009** Render useful content, titles, methods, links and examples as crawlable HTML
- [ ] **SEO-GLOBAL-010** Each tool gets a distinct search intent with one canonical landing page
- [ ] **SEO-GLOBAL-011** Unique title, H1, meta description, breadcrumb, actual working UI and examples
- [ ] **SEO-GLOBAL-012** Original real input/output demonstration, formula, units, error cases and method
- [ ] **SEO-GLOBAL-013** Use only accurately applicable structured data; never fake ratings or authors
- [ ] **SEO-GLOBAL-014** Publish source, license, data observation date and limitation where external data appears
- [ ] **SEO-GLOBAL-015** Check finance, veterinary, health, legal, safety and news sources with higher scrutiny
- [ ] **SEO-GLOBAL-016** Keep intuitive internal related-tool links within each unique brand
- [ ] **SEO-GLOBAL-017** Prevent unnatural reciprocal links across the portfolio of 14 sites
- [ ] **SEO-GLOBAL-018** Fix 404, accidental noindex and other crawl issues found from actual webmaster reports
- [ ] **SEO-GLOBAL-019** Optimize mobile layout, keyboard accessibility, load speed, CLS, LCP and INP
- [ ] **SEO-GLOBAL-020** Lazy load ML, PDF OCR, large map and image packages after main tool load
- [ ] **SEO-GLOBAL-021** Run real mobile browser QA for calculators, export, input and error states
- [ ] **SEO-GLOBAL-022** Add tool page and sitemap automated checks to repo CI
- [ ] **SEO-GLOBAL-023** Inspect actual SEO clicks/impressions/search CTR and index status, do not invent metrics
- [ ] **SEO-GLOBAL-024** Use accurate OpenGraph previews and owned or licensed images
- [ ] **SEO-GLOBAL-025** Create each product's original tutorial/demo assets with real working screenshots
- [ ] **SEO-GLOBAL-026** Never mass-publish low-value country/year/keyword variation pages
- [ ] **SEO-GLOBAL-027** New pages published only after distinct working task or substantive sourced answer exists
- [ ] **SEO-GLOBAL-028** Submit sitemap via webmaster tools; submission is not guaranteed indexing
- [ ] **SEO-GLOBAL-029** Optional Bing IndexNow on genuine page change; no fake new URL submission
- [ ] **SEO-GLOBAL-030** Review ad placements separately from process, input and download buttons
- [ ] **SEO-GLOBAL-031** Record per-site approved advertising, organic traffic, task completion and page RPM
- [ ] **SEO-GLOBAL-032** Update search content only after real improvement, not fake freshness changes

### GEO / AI search visibility across all 14

- [ ] **GEO-GLOBAL-001** Google AI Overviews/AI Mode require foundational SEO quality, not special GEO files or markup
- [ ] **GEO-GLOBAL-002** Do not treat llms.txt or GEO-only schema as a Google ranking requirement
- [ ] **GEO-GLOBAL-003** Create easy-to-understand original explanations and concise practical answers for humans
- [ ] **GEO-GLOBAL-004** Expose exact method, equation, assumptions and result ranges to aid trustworthy citations
- [ ] **GEO-GLOBAL-005** Show real source links, dates and provenance and never invent statistics
- [ ] **GEO-GLOBAL-006** Provide accessible text and tables alongside map/chart/canvas output
- [ ] **GEO-GLOBAL-007** Differentiate example/user-input data from observed up-to-date official data
- [ ] **GEO-GLOBAL-008** Use original source-backed event timeline and release change comparison for news
- [ ] **GEO-GLOBAL-009** Keep correction and source review policy visible for high-stakes topics
- [ ] **GEO-GLOBAL-010** Never fabricate AI citations, reviews, backlinks, author identity or popularity
- [ ] **GEO-GLOBAL-011** Track Bing Webmaster AI Performance citation pages and grounding queries when available
- [ ] **GEO-GLOBAL-012** Track Google generative search reports when account-accessible
- [ ] **GEO-GLOBAL-013** Measure AI citations separately from real referral visits and AdSense income
- [ ] **GEO-GLOBAL-014** No full copyrighted article copying or AI paraphrase mass content
- [ ] **GEO-GLOBAL-015** No paid GEO tricks, artificial link exchange or unsupported ranking guarantees

### Organic acquisition and compliant ad revenue tracking

- [ ] **GROWTH-GLOBAL-001** Track organic query impressions, clicks, CTR, indexed pages and tool completions per site
- [ ] **GROWTH-GLOBAL-002** Find high-impression and low-completion real pages and repair UX or content
- [ ] **GROWTH-GLOBAL-003** Post authentic video walkthroughs of real tool outputs where useful
- [ ] **GROWTH-GLOBAL-004** Create unique original comparisons and printable outputs that users may share
- [ ] **GROWTH-GLOBAL-005** Answer relevant community questions with genuine help without spam links
- [ ] **GROWTH-GLOBAL-006** Measure search -> task success -> return visitor -> eligible ads impression funnel
- [ ] **GROWTH-GLOBAL-007** Do not buy artificial traffic, encourage ad clicks or promise revenue
- [ ] **GROWTH-GLOBAL-008** Keep site-specific dashboards for changes, actual organic trends and policy reviews

### Unique search ownership by product

#### CoinMetriq

- [ ] **SEO-CM-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: crypto average buy price; DCA investment; crypto trading fees; drawdown simulator
- [ ] **SEO-CM-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-CM-003** Create original useful job-to-be-done tutorial: Original CSV portfolio and fee risk walkthrough
- [ ] **SEO-CM-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-CM-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-CM-006** Verify this product boundary: No MoneyAvora credit loans or generic news
- [ ] **SEO-CM-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-CM-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### EarthViora

- [ ] **SEO-EV-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: satellite before after map; land area; NDVI viewer; earthquake map
- [ ] **SEO-EV-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-EV-003** Create original useful job-to-be-done tutorial: Real dated satellite comparison with source, scale and image license
- [ ] **SEO-EV-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-EV-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-EV-006** Verify this product boundary: No IndustryLuma feed/production calculator
- [ ] **SEO-EV-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-EV-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### SolarQentra

- [ ] **SEO-SQ-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: solar size for home; battery backup hours; inverter size; solar yield
- [ ] **SEO-SQ-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-SQ-003** Create original useful job-to-be-done tutorial: Appliance load to solar panel and battery calculations with source
- [ ] **SEO-SQ-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-SQ-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-SQ-006** Verify this product boundary: No bank loan or unsupported electrical compliance
- [ ] **SEO-SQ-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-SQ-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### TechOrvia

- [ ] **SEO-TO-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: JSON schema validator; regex tester; cron generator; JWT verifier
- [ ] **SEO-TO-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-TO-003** Create original useful job-to-be-done tutorial: Reproducible code/test input-output examples and error cases
- [ ] **SEO-TO-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-TO-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-TO-006** Verify this product boundary: No PDF/image editor duplication
- [ ] **SEO-TO-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-TO-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### MoneyAvora

- [ ] **SEO-MA-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: loan amortization; debt payoff; landed import cost; compound interest
- [ ] **SEO-MA-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-MA-003** Create original useful job-to-be-done tutorial: Actual amortization and financial assumptions with clear examples
- [ ] **SEO-MA-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-MA-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-MA-006** Verify this product boundary: No ShiftCalc payroll and overtime
- [ ] **SEO-MA-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-MA-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### IndustryLuma

- [ ] **SEO-IL-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: poultry FCR; cow milk cost; fish feed; farm profit; factory OEE; ETP balance
- [ ] **SEO-IL-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-IL-003** Create original useful job-to-be-done tutorial: Distinct crop, dairy, poultry, fish and factory operational walkthroughs
- [ ] **SEO-IL-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-IL-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-IL-006** Verify this product boundary: No LifeAlora pet-care pages
- [ ] **SEO-IL-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-IL-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### WorldOrixa

- [ ] **SEO-WO-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: world news timeline; country data; global economic ranking; official elections
- [ ] **SEO-WO-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-WO-003** Create original useful job-to-be-done tutorial: Verified multi-source event chronology and public-data contextual comparisons
- [ ] **SEO-WO-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-WO-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-WO-006** Verify this product boundary: No TechDailyNews technology release duplicate
- [ ] **SEO-WO-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-WO-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### VitalOryx

- [ ] **SEO-VO-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: BMI calculator; walking pace; sleep planner; fitness schedule
- [ ] **SEO-VO-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-VO-003** Create original useful job-to-be-done tutorial: Evidence-based human wellness explanations and non-diagnostic examples
- [ ] **SEO-VO-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-VO-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-VO-006** Verify this product boundary: No clinical diagnosis or animal health
- [ ] **SEO-VO-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-VO-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### EduNovira

- [ ] **SEO-EN-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: CGPA planner; attendance calculator; exam revision timetable; flashcards
- [ ] **SEO-EN-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-EN-003** Create original useful job-to-be-done tutorial: Grade-scale examples and effective interactive study plans
- [ ] **SEO-EN-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-EN-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-EN-006** Verify this product boundary: No institutional ERP or invented vacancies
- [ ] **SEO-EN-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-EN-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### LifeAlora

- [ ] **SEO-LA-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: room paint cost; furniture layout; travel itinerary; pet expenses; cat care
- [ ] **SEO-LA-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-LA-003** Create original useful job-to-be-done tutorial: Illustrated room material and pet/travel project example
- [ ] **SEO-LA-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-LA-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-LA-006** Verify this product boundary: No industrial or farming animal calculations
- [ ] **SEO-LA-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-LA-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### TechDailyNews

- [ ] **SEO-TD-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: AI model releases; security patch timeline; CVE explorer; software change log
- [ ] **SEO-TD-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-TD-003** Create original useful job-to-be-done tutorial: Cited actual upstream release differences with corrected dates
- [ ] **SEO-TD-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-TD-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-TD-006** Verify this product boundary: No RSS-only mirrors or geopolitical general headlines
- [ ] **SEO-TD-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-TD-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### BrowserPixel

- [ ] **SEO-BP-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: compress image to 100KB; bulk image resize; background editor; ecommerce product image
- [ ] **SEO-BP-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-BP-003** Create original useful job-to-be-done tutorial: Before/after image sample with dimensions, output and safe comparison
- [ ] **SEO-BP-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-BP-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-BP-006** Verify this product boundary: No document-level PDF editor
- [ ] **SEO-BP-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-BP-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### FileSwiftTools

- [ ] **SEO-FS-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: merge PDF without upload; scanned OCR PDF; PDF compression; fill PDF forms
- [ ] **SEO-FS-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-FS-003** Create original useful job-to-be-done tutorial: Sample PDF output with preserved-vs-lost text comparison
- [ ] **SEO-FS-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-FS-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-FS-006** Verify this product boundary: No image retouch or fake guaranteed OCR fidelity
- [ ] **SEO-FS-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-FS-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

#### ShiftCalcTools

- [ ] **SEO-SC-001** Validate candidate query-intent clusters using real search data, no invented keyword volumes: overnight hours; shift schedule; overtime pay; PTO balance; timesheet
- [ ] **SEO-SC-002** Ensure only one canonical functional landing page per distinct tool or data task; protect previous working URLs
- [ ] **SEO-SC-003** Create original useful job-to-be-done tutorial: Overnight/break/DST examples and clear pay rule calculations
- [ ] **SEO-SC-004** Expose accurate method, real output, input units, evidence/last-checked date and limitations in crawlable HTML
- [ ] **SEO-SC-005** Build genuinely relevant in-product internal links without copying other brands' guides
- [ ] **SEO-SC-006** Verify this product boundary: No MoneyAvora loan/credit products
- [ ] **SEO-SC-007** Test metadata, indexability, crawl and mobile behavior on public canonical URL
- [ ] **SEO-SC-008** Measure search query clicks and real tool completion, plus actual ad account metrics separately

### Measurement definition and official policy sources

| Metric | Data source | Important distinction |
|---|---|---|
| Organic search impressions/clicks and CTR | Verified Search Console property | Traffic is not guaranteed by indexability |
| Indexing/coverage | Google Search Console and Bing Webmaster | Sitemap submission does not guarantee inclusion |
| AI Search citation counts | Bing AI Performance / available Google reports | Citation is not a referral visit or revenue |
| Successful tool processing | Anonymous privacy-respecting tool completion event | Not the same as pageview |
| RPM/ad revenue | Actual publisher advertising reports | Never estimate as a confirmed outcome |

- Google AI optimization (SEO remains fundamental, no special Google GEO file): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google accurate sitemap lastmod: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google structured data policy: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Bing IndexNow: https://www.bing.com/indexnow/getstarted
- Bing AI citation performance: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/

**Complete only after code/deployment, verifiable original content, crawl evidence and account-based SEO visibility when available. A planning checklist is not completed SEO implementation.**


## ARTICLE PUBLISHING ENGINE FOR ALL 14 UNIQUE PRODUCTS

**Owner intent:** Give every product a relevant article/publishing area in addition to its functioning free tools. Daily publication is optional only when quality and real original value can be maintained. Site-specific articles are not duplicate blog copies and do not replace useful tools. No versions or phases.

### Editorial ownership matrix — 14 independent article experiences

| Product | Editorial identity | Example topics | Required useful connection |
|---|---|---|---|
| **CoinMetriq** | Crypto explainers and portfolio research | DCA vs lump sum; transaction fees; slippage; average entry; risk metrics | Local portfolio/DCA/fees tools |
| **EarthViora** | Satellite/mapping interpretation with dataset evidence | NDVI reading; land change comparison; map scale; flood history | Satellite atlas/area measurement/map comparisons |
| **SolarQentra** | Energy engineering calculations and verified sources | Solar sizing worked example; battery DoD; backup hours; PV yield | Energy sizing studio and calculator |
| **TechOrvia** | Code-oriented tutorials with runnable input/output | JSON schema; regex captures; JWT verification; cron expression | Developer workbench |
| **MoneyAvora** | Personal/business/trade finance methods | Loan amortization; debt comparison; import costs; break-even | Financial planning calculators |
| **IndustryLuma** | Agro, dairy, livestock, poultry, fish, ETP and factory guidance | Poultry FCR; fish pond stocking; cow milk costs; OEE; EPR | Correct crop/animal/factory calculator |
| **WorldOrixa** | Original global event research, country data and source comparisons | Event chronology; elections official references; country indicators | Event explorer, sourced comparison |
| **VitalOryx** | Evidence-based human wellness explainers | Running pace; BMI limits; workout routines; sleep methods | Human wellness calculator/tracker |
| **EduNovira** | Learning and career practice with usable templates | CGPA method; revision plan; citation examples; skills | Student tools and offline flashcards |
| **LifeAlora** | Home, travel and companion pet owner guides | Paint calculation; 2D layout; dog/cat budget; packing | Room, travel and pet tools |
| **TechDailyNews** | Time-stamped original technology release/security context | Verified model changes; official software releases; CVE timelines | Release diff and security explorer |
| **BrowserPixel** | Creator and ecommerce image editing tutorials | Image size quality; AVIF/WebP; product backgrounds | Original before/after sample in image tools |
| **FileSwiftTools** | PDF/OCR/form/document examples | OCR pitfalls; preserving PDF text; form fields; real metadata | Sample PDF operation preview |
| **ShiftCalcTools** | Work-hour, shift and gross pay explained | Overnight break examples; rotating roster; paid vs unpaid | Work time and pay calculator |

### Automated article selection, creation, verification, publication and growth controls

- [ ] **ART-GLOBAL-001** Every brand owns its own editorial /articles/ or /guides/ (news brands use /news/ and /analysis/ or source-led /stories/); do not replicate a shared generic blog template
- [ ] **ART-GLOBAL-002** Publish only when the article adds demonstrable original user value; 'daily' is a scheduling target, not a quality waiver
- [ ] **ART-GLOBAL-003** Select topic from verified organic query intent, genuine user pain, actual tool functionality, or a real authoritative new fact
- [ ] **ART-GLOBAL-004** Prevent duplicate intent against existing tool pages: tool canonical remains the primary task page, article covers a different genuine question
- [ ] **ART-GLOBAL-005** Use stable distinct slugs without duplicate keyword aliases, clickbait, templated city/country/year rewrites
- [ ] **ART-GLOBAL-006** Attach article to exact same-brand functioning tool; where no tool exists, link a verified original dataset, factual comparison or practical interactive example
- [ ] **ART-GLOBAL-007** Each original article includes verified input/output example, table, tested calculation or materially new source-based analysis
- [ ] **ART-GLOBAL-008** AI may brainstorm, outline, draft and catch formatting issues; AI text never self-certifies factual correctness or commercial source rights
- [ ] **ART-GLOBAL-009** Workers AI must remain inside verified Free quota, with hard stop/fallback when capacity is exhausted; do not automatically switch to paid models
- [ ] **ART-GLOBAL-010** Use original published authoritative references with direct URLs and correct data/publication date
- [ ] **ART-GLOBAL-011** Never fabricate statistics, human testing, quotes, editors, author credentials, screenshots, AI citations, pageviews or keyword volume
- [ ] **ART-GLOBAL-012** Require stronger editorial review for medicine, veterinary treatment, law, personal finance/investments, disasters and politically sensitive updates
- [ ] **ART-GLOBAL-013** RSS/news content must add original corroborated context and never republish full copyrighted article text/images without permission
- [ ] **ART-GLOBAL-014** Articles about changing laws, tariffs, prices or technical specs get a verifiable review/expiry date and stale-data fallback
- [ ] **ART-GLOBAL-015** Draft -> source verification -> unique usefulness QA -> brand ownership QA -> citation/media rights -> user experience -> publish; low-quality draft stays unpublished/noindex
- [ ] **ART-GLOBAL-016** Article titles/meta/H1, canonical, robots decision, accessible semantic HTML and accurate schema are created with the article, not deferred SEO work
- [ ] **ART-GLOBAL-017** Article must include actual author/publisher responsibility and correction/report mechanism; do not invent expert bylines
- [ ] **ART-GLOBAL-018** Generate article sitemap when accepted and published; sitemap lastmod changes only on material update
- [ ] **ART-GLOBAL-019** Make a unique article search section per website with categories, search, recent articles, related tool and breadcrumb
- [ ] **ART-GLOBAL-020** News pages use correct original event date, publication date, last updated date; news sitemap rules apply to genuine news article URLs
- [ ] **ART-GLOBAL-021** Add article-specific demo images or reproducible chart when genuinely helpful, using original/licensed assets
- [ ] **ART-GLOBAL-022** Ads stay outside article TOC, formulas, input fields, copied code and tool results; reserve slots to avoid CLS
- [ ] **ART-GLOBAL-023** Don't create 'empty article' pages, thin AI summaries or auto-generated pages solely to earn AdSense inventory
- [ ] **ART-GLOBAL-024** Check actual live build/response after publish before declaring article complete
- [ ] **ART-GLOBAL-025** Measure organic impressions, engaged time, relevant tool click-through, task completion and valid ad impressions separately
- [ ] **ART-GLOBAL-026** Repair or consolidate overlapping weak older articles using source evidence and redirect/canonical carefully, never rewrite solely for fake freshness
- [ ] **ART-GLOBAL-027** Keep image/PDF/private file data off-server when examples involve user uploads; article previews use safe sample files
- [ ] **ART-GLOBAL-028** Use legitimate educational/industry community distribution only where relevant and permitted; no automated spam posting
- [ ] **ART-GLOBAL-029** Enforce one queue across 14 brands with independent product topic/quality rules, not 14 identical daily AI outputs
- [ ] **ART-GLOBAL-030** At 1 original post per site per day, 14 sites produce 420 posts in a 30-day month; maintain realistic source verification effort
- [ ] **ART-GLOBAL-031** Cloudflare Pages Free currently includes 500 builds/month account-wide; daily build per 14 sites = 420 builds/month, plus an existing TechDailyNews four-per-day refresh = 120 further builds/month -> at least 540 if all same account and every refresh triggers a build (other updates excluded)
- [ ] **ART-GLOBAL-032** Do not assume daily publishing requires daily Cloudflare deploy: schedule batches and avoid unnecessary news feed commits/builds; confirm current Pages build allowance
- [ ] **ART-GLOBAL-033** Only a completed, substantively useful article counts as published; holding drafts until ready is acceptable and safer than a forced daily release
- [ ] **ART-GLOBAL-034** User-facing articles remain completely free, without login, paywall, ad-click lock or mandatory sign up
- [ ] **ART-GLOBAL-035** Record repo, canonical URL, publish date, cited sources, content test evidence, indexing status and source review in same Master Checklist

### Per-product implementation requirements

#### CoinMetriq

- [ ] **ART-CM-001** Create site-specific original article listing and category navigation with different layout/voice for Crypto explainers and portfolio research.
- [ ] **ART-CM-002** Offer relevant original and researched content about: DCA vs lump sum; transaction fees; slippage; average entry; risk metrics.
- [ ] **ART-CM-003** Link each applicable article to the actual working Local portfolio/DCA/fees tools; preserve existing tool canonical/URL.
- [ ] **ART-CM-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-CM-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-CM-006** Track original article organic search performance and task completions separately from tool landing pages.

#### EarthViora

- [ ] **ART-EV-001** Create site-specific original article listing and category navigation with different layout/voice for Satellite/mapping interpretation with dataset evidence.
- [ ] **ART-EV-002** Offer relevant original and researched content about: NDVI reading; land change comparison; map scale; flood history.
- [ ] **ART-EV-003** Link each applicable article to the actual working Satellite atlas/area measurement/map comparisons; preserve existing tool canonical/URL.
- [ ] **ART-EV-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-EV-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-EV-006** Track original article organic search performance and task completions separately from tool landing pages.

#### SolarQentra

- [ ] **ART-SQ-001** Create site-specific original article listing and category navigation with different layout/voice for Energy engineering calculations and verified sources.
- [ ] **ART-SQ-002** Offer relevant original and researched content about: Solar sizing worked example; battery DoD; backup hours; PV yield.
- [ ] **ART-SQ-003** Link each applicable article to the actual working Energy sizing studio and calculator; preserve existing tool canonical/URL.
- [ ] **ART-SQ-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-SQ-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-SQ-006** Track original article organic search performance and task completions separately from tool landing pages.

#### TechOrvia

- [ ] **ART-TO-001** Create site-specific original article listing and category navigation with different layout/voice for Code-oriented tutorials with runnable input/output.
- [ ] **ART-TO-002** Offer relevant original and researched content about: JSON schema; regex captures; JWT verification; cron expression.
- [ ] **ART-TO-003** Link each applicable article to the actual working Developer workbench; preserve existing tool canonical/URL.
- [ ] **ART-TO-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-TO-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-TO-006** Track original article organic search performance and task completions separately from tool landing pages.

#### MoneyAvora

- [ ] **ART-MA-001** Create site-specific original article listing and category navigation with different layout/voice for Personal/business/trade finance methods.
- [ ] **ART-MA-002** Offer relevant original and researched content about: Loan amortization; debt comparison; import costs; break-even.
- [ ] **ART-MA-003** Link each applicable article to the actual working Financial planning calculators; preserve existing tool canonical/URL.
- [ ] **ART-MA-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-MA-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-MA-006** Track original article organic search performance and task completions separately from tool landing pages.

#### IndustryLuma

- [ ] **ART-IL-001** Create site-specific original article listing and category navigation with different layout/voice for Agro, dairy, livestock, poultry, fish, ETP and factory guidance.
- [ ] **ART-IL-002** Offer relevant original and researched content about: Poultry FCR; fish pond stocking; cow milk costs; OEE; EPR.
- [ ] **ART-IL-003** Link each applicable article to the actual working Correct crop/animal/factory calculator; preserve existing tool canonical/URL.
- [ ] **ART-IL-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-IL-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-IL-006** Track original article organic search performance and task completions separately from tool landing pages.

#### WorldOrixa

- [ ] **ART-WO-001** Create site-specific original article listing and category navigation with different layout/voice for Original global event research, country data and source comparisons.
- [ ] **ART-WO-002** Offer relevant original and researched content about: Event chronology; elections official references; country indicators.
- [ ] **ART-WO-003** Link each applicable article to the actual working Event explorer, sourced comparison; preserve existing tool canonical/URL.
- [ ] **ART-WO-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-WO-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-WO-006** Track original article organic search performance and task completions separately from tool landing pages.

#### VitalOryx

- [ ] **ART-VO-001** Create site-specific original article listing and category navigation with different layout/voice for Evidence-based human wellness explainers.
- [ ] **ART-VO-002** Offer relevant original and researched content about: Running pace; BMI limits; workout routines; sleep methods.
- [ ] **ART-VO-003** Link each applicable article to the actual working Human wellness calculator/tracker; preserve existing tool canonical/URL.
- [ ] **ART-VO-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-VO-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-VO-006** Track original article organic search performance and task completions separately from tool landing pages.

#### EduNovira

- [ ] **ART-EN-001** Create site-specific original article listing and category navigation with different layout/voice for Learning and career practice with usable templates.
- [ ] **ART-EN-002** Offer relevant original and researched content about: CGPA method; revision plan; citation examples; skills.
- [ ] **ART-EN-003** Link each applicable article to the actual working Student tools and offline flashcards; preserve existing tool canonical/URL.
- [ ] **ART-EN-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-EN-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-EN-006** Track original article organic search performance and task completions separately from tool landing pages.

#### LifeAlora

- [ ] **ART-LA-001** Create site-specific original article listing and category navigation with different layout/voice for Home, travel and companion pet owner guides.
- [ ] **ART-LA-002** Offer relevant original and researched content about: Paint calculation; 2D layout; dog/cat budget; packing.
- [ ] **ART-LA-003** Link each applicable article to the actual working Room, travel and pet tools; preserve existing tool canonical/URL.
- [ ] **ART-LA-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-LA-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-LA-006** Track original article organic search performance and task completions separately from tool landing pages.

#### TechDailyNews

- [ ] **ART-TD-001** Create site-specific original article listing and category navigation with different layout/voice for Time-stamped original technology release/security context.
- [ ] **ART-TD-002** Offer relevant original and researched content about: Verified model changes; official software releases; CVE timelines.
- [ ] **ART-TD-003** Link each applicable article to the actual working Release diff and security explorer; preserve existing tool canonical/URL.
- [ ] **ART-TD-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-TD-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-TD-006** Track original article organic search performance and task completions separately from tool landing pages.

#### BrowserPixel

- [ ] **ART-BP-001** Create site-specific original article listing and category navigation with different layout/voice for Creator and ecommerce image editing tutorials.
- [ ] **ART-BP-002** Offer relevant original and researched content about: Image size quality; AVIF/WebP; product backgrounds.
- [ ] **ART-BP-003** Link each applicable article to the actual working Original before/after sample in image tools; preserve existing tool canonical/URL.
- [ ] **ART-BP-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-BP-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-BP-006** Track original article organic search performance and task completions separately from tool landing pages.

#### FileSwiftTools

- [ ] **ART-FS-001** Create site-specific original article listing and category navigation with different layout/voice for PDF/OCR/form/document examples.
- [ ] **ART-FS-002** Offer relevant original and researched content about: OCR pitfalls; preserving PDF text; form fields; real metadata.
- [ ] **ART-FS-003** Link each applicable article to the actual working Sample PDF operation preview; preserve existing tool canonical/URL.
- [ ] **ART-FS-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-FS-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-FS-006** Track original article organic search performance and task completions separately from tool landing pages.

#### ShiftCalcTools

- [ ] **ART-SC-001** Create site-specific original article listing and category navigation with different layout/voice for Work-hour, shift and gross pay explained.
- [ ] **ART-SC-002** Offer relevant original and researched content about: Overnight break examples; rotating roster; paid vs unpaid.
- [ ] **ART-SC-003** Link each applicable article to the actual working Work time and pay calculator; preserve existing tool canonical/URL.
- [ ] **ART-SC-004** Make category/source/FAQ/example/schema and SEO/GEO suitability part of publication, not retrofitted later.
- [ ] **ART-SC-005** Apply domain-specific source rights, examples, accuracy and review requirements before article is indexable.
- [ ] **ART-SC-006** Track original article organic search performance and task completions separately from tool landing pages.

### Explicit business/safety policy

- Original helpful content matters more than post count. 14 low-value articles per day does not create an indexing or AdSense entitlement. Source verification and user experience remain necessary.
- AI-generated content is not categorically prohibited; creating many low-value pages mainly to manipulate ranking violates Google's scaled content abuse policy. See: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Helpful reliable people-first content and originality guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google news sitemap guideline: https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
- Cloudflare Pages free build limits (check current plan): https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Workers AI pricing and free quota: https://developers.cloudflare.com/workers-ai/platform/pricing/

**Definition of complete:** A category or post is done only when relevant genuinely useful article(s) are visible at a live canonical URL, sourced and rights-cleared, unique to the product, tested, appropriately indexed, ads safe, and linked to the relevant active user workflow; a placeholder blog link is not complete.


## FUN & SHARE LABS — 14 DISTINCT PRODUCTS

**Owner decision (2026-11-23):** Add ONE dedicated on-brand interactive fun section to EACH of the 14 free, independent products. The intended marketing mechanism is *genuine visitor delight + useful/shareable creative results*, not blog filler or manipulated social shares. Everything remains completely free with no registration or forced ads. These are OPEN tasks in the SAME existing master backlog; no phases or versions.

| Product | Unique fun-section name | User value |
|---|---|---|
| **CoinMetriq** | Crypto Chaos Lab | Playful crypto-risk literacy based on transparent math and hypothetical/sample data, not real investment predictions. |
| **EarthViora** | Planet Playground | Geography and Earth observation challenges with verifiable coordinates, imagery and source-aware explanations. |
| **SolarQentra** | Power Play Lab | Electricity and solar energy mini challenges linked to real calculations and stated engineering assumptions. |
| **TechOrvia** | Dev Arcade | Light-hearted developer puzzles that teach real parsing, APIs and computing rather than generating fake code reviews. |
| **MoneyAvora** | Money Challenge Room | Practical money literacy with entertaining scenarios that never mock debt hardship or imply financial guarantees. |
| **IndustryLuma** | Farm & Factory Fun | Playful educational farm and industrial mini-simulators; never animal clinical care, pesticide dosing or compliance approval. |
| **WorldOrixa** | World Trivia Arena | Fact-checked geographical, cultural and historical challenges, avoiding unverified political claims or fake news. |
| **VitalOryx** | Wellness Joy Lab | Nonclinical and nonjudgmental wellness mini games encouraging learning and habits without medical advice. |
| **EduNovira** | Study Fun Arcade | Small skill-building games linked to educational tools and honest progress, not fake exams or scores. |
| **LifeAlora** | Happy Life Playground | Home, travel and pet-owner humor that creates useful cards/checklists, not animal medicine or farm calculators. |
| **TechDailyNews** | Tech Trivia Pulse | News-adjacent quizzes and release-history games backed by dated official documentation, no fabricated headlines. |
| **BrowserPixel** | Creative Meme Playground | Local-only amusing image creativity tools and shareable output, not unauthorized copyright reuse or PDF editing. |
| **FileSwiftTools** | PDF Puzzle Lab | Useful document-handling puzzles based on user-owned or safe demo files, while retaining privacy. |
| **ShiftCalcTools** | Shift Life Arcade | Gentle scheduling and timekeeping puzzles that teach real hours math and respect worker wellbeing. |

### Shared interactive fun, privacy, social distribution and AdSense safety requirements

- [ ] **FUN-CORE-001** Each of 14 brands gets exactly one visible top-level themed section at /fun/ (or existing valid equivalent) with 10 distinct curated interactive concepts; no extra public brand or 15th site.
- [ ] **FUN-CORE-002** Use a unique section name, audience, illustration and design language per product; shared infrastructure is allowed but no cloned user experience.
- [ ] **FUN-CORE-003** Every mini tool produces an immediately meaningful, demonstrably correct, amusing or creative outcome; avoid random-sentence spam.
- [ ] **FUN-CORE-004** Provide original sample data/assets for first-time visitors so all games work without uploads or sign-in.
- [ ] **FUN-CORE-005** Provide Replay/Remix, Try Another, View Method, and contextual link to the relevant full working tool.
- [ ] **FUN-CORE-006** Native user-click Web Share API for link/text and optionally generated PNG where supported; no automatic posting or unsolicited social messages.
- [ ] **FUN-CORE-007** Provide Copy Link fallback and Download PNG/SVG/text card fallback for unsupported browsers; clipboard requires secure context/gesture.
- [ ] **FUN-CORE-008** Privacy-safe URL state may contain only benign short input selections; no sensitive payroll, finances, medical or pet/private information in URLs or query strings.
- [ ] **FUN-CORE-009** Use local Canvas/SVG to create shareable result card with unique branding, short understandable result, optional attribution, and optional user-approved image.
- [ ] **FUN-CORE-010** Where useful, generate a deterministic no-account shareable challenge code or encoded safe options; include reproducibility and size limits, no public database by default.
- [ ] **FUN-CORE-011** Optional open challenge or leaderboard only if secure privacy-safe verification possible on free resources; do not fabricate public scores, rankings or user counts.
- [ ] **FUN-CORE-012** Keep fun content free with no paywall, login, watch-an-ad-to-reveal, forced share or reward for ad-click.
- [ ] **FUN-CORE-013** Make share button explicitly user-triggered; do not force messenger or platform app link, ask for social permissions or upload contact lists.
- [ ] **FUN-CORE-014** Place ads outside game canvas, answer feedback, share/try-again buttons and download controls; prevent misclicks and layout shifts.
- [ ] **FUN-CORE-015** Provide accessibility alternatives: keyboard play, visible focus, reduced motion, screen-reader feedback and non-timed option for quiz activities.
- [ ] **FUN-CORE-016** Show clear simulation/entertainment labels on fictional results and jokes; no stock price prediction, legal guarantee, diagnosis, disaster warning or fabricated headline.
- [ ] **FUN-CORE-017** Do not shame or mock individuals, pets, workers, medical conditions, financial hardships or vulnerable groups.
- [ ] **FUN-CORE-018** Use only user-owned/appropriately licensed photos, emojis, icons, fonts and media; no copyrighted template/logo or unauthorized image imports.
- [ ] **FUN-CORE-019** Don't create mass-indexed result or personalized share URL variants; canonical fun tool page only, share-result state not crawl/index spam.
- [ ] **FUN-CORE-020** Only index pages with functional interactions and original useful instructions, not placeholder quiz or thin catchphrase landing pages.
- [ ] **FUN-CORE-021** Each mini tool gets SEO/GEO, canonical, schema where truly applicable, and tested outputs as part of creation.
- [ ] **FUN-CORE-022** Measure opt-in anonymous fun-start, completion, share-button use, successful native share where observable, shared-link landing and next real tool usage.
- [ ] **FUN-CORE-023** Share counts reflect measured events only; no fake '10k shares', artificial virality or inflated social proof.
- [ ] **FUN-CORE-024** Use UTM parameters only when appropriate, non-personal and compliant; never track copied user files or private question answers.
- [ ] **FUN-CORE-025** Use a light static-browser-first engine to avoid Workers requests for each visit; protect the account's shared Cloudflare Free quotas.
- [ ] **FUN-CORE-026** Use Workers AI only for clearly optional safe creative drafting where free-plan model and quota support it, with deterministic offline fallback.
- [ ] **FUN-CORE-027** System performance: on-device generation, small asset size, lazy-load photo editor/maps and handle low-memory mobiles gracefully.
- [ ] **FUN-CORE-028** Release an actually runnable demo before social promotion, with optional short clip and privacy-safe result card.
- [ ] **FUN-CORE-029** Keep mini game facts sourced when tied to history, medicine, climate, energy, finance, engineering, cybersecurity or law.
- [ ] **FUN-CORE-030** Respect separate product ownership: pet fun only LifeAlora, farm animal fun only IndustryLuma, image memes only BrowserPixel, PDF puzzles only FileSwiftTools.

### Site-owned original fun mini tools (not duplicate product apps)

#### CoinMetriq — Crypto Chaos Lab

**Purpose:** Playful crypto-risk literacy based on transparent math and hypothetical/sample data, not real investment predictions.

- [ ] **FUN-CM-001** Fee Goblin: see tiny transaction fees eat hypothetical profits across trading frequency
- [ ] **FUN-CM-002** DCA Time Machine: compare fictional buy schedules using user-imported price CSV
- [ ] **FUN-CM-003** HODL Rollercoaster: animated drawdown and recovery ride from dated user-entered values
- [ ] **FUN-CM-004** Moon Math vs Reality: humorous unrealistic return target deconstruction with calculator
- [ ] **FUN-CM-005** Portfolio Personality Card: fun risk-habit quiz explicitly not psychometric/investment advice
- [ ] **FUN-CM-006** What-if Coin Split: allocation bar game and concentration explanations
- [ ] **FUN-CM-007** Mining Electric Bill Monster: animated energy expense versus hypothetical revenue
- [ ] **FUN-CM-008** Token Unlock Surprise: visually demonstrate dilution from a fictional token schedule
- [ ] **FUN-CM-009** Scam Red Flag Bingo: identify common bogus promises and wallet security cues
- [ ] **FUN-CM-010** Crypto Terms Emoji Decoder: learn network, gas and liquidity vocabulary through playful quizzes
- [ ] **FUN-CM-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-CM-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-CM-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### EarthViora — Planet Playground

**Purpose:** Geography and Earth observation challenges with verifiable coordinates, imagery and source-aware explanations.

- [ ] **FUN-EV-001** Guess the Country Shape: outline-to-map geography challenge
- [ ] **FUN-EV-002** Satellite Spot the Difference: compare properly licensed imagery dates and explain actual visible change
- [ ] **FUN-EV-003** How Many Football Fields: convert drawn land area into familiar scales, with standardized reference
- [ ] **FUN-EV-004** Map Coordinate Treasure Hunt: find a marked location by latitude/longitude clues
- [ ] **FUN-EV-005** River Meander Puzzle: identify historical bend locations from cited map data
- [ ] **FUN-EV-006** Earth Layers Explorer: match terrain, vegetation, water and city layers to their actual use
- [ ] **FUN-EV-007** Land Cover Detective: classify visible features with an uncertainty/confusion note
- [ ] **FUN-EV-008** Satellite Orbit Trivia: identify pass/orbit facts from verified reference
- [ ] **FUN-EV-009** Continent Distance Guess: predict distance then reveal calculated geodesic result
- [ ] **FUN-EV-010** Earth Data Myth Buster: short quiz about map accuracy, dates and satellite resolution
- [ ] **FUN-EV-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-EV-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-EV-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### SolarQentra — Power Play Lab

**Purpose:** Electricity and solar energy mini challenges linked to real calculations and stated engineering assumptions.

- [ ] **FUN-SQ-001** Energy Vampire Hunt: spot high-consumption appliances in a sample home
- [ ] **FUN-SQ-002** Which Appliance Wins: calculate use costs in playful head-to-head comparison
- [ ] **FUN-SQ-003** Battery Backup Countdown: how long could user-selected loads run hypothetically
- [ ] **FUN-SQ-004** Solar Roof Puzzle: arrange sample panels on a fictional rooftop size grid
- [ ] **FUN-SQ-005** Cloudy Day Challenge: explore what lower sunshine does to monthly generation
- [ ] **FUN-SQ-006** Lights On Challenge: how many example LED bulbs run on a battery
- [ ] **FUN-SQ-007** EV Charging Race: compare charger powers and realistic energy/time assumptions
- [ ] **FUN-SQ-008** Off-grid Cabin Builder: choose loads, panels and storage within a sample budget
- [ ] **FUN-SQ-009** Solar Savings Myth Quiz: distinguish model assumptions from guaranteed savings
- [ ] **FUN-SQ-010** Home Power Quiz Card: explain watts, kWh, kW, peak demand and efficiency
- [ ] **FUN-SQ-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-SQ-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-SQ-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### TechOrvia — Dev Arcade

**Purpose:** Light-hearted developer puzzles that teach real parsing, APIs and computing rather than generating fake code reviews.

- [ ] **FUN-TO-001** Regex Escape Room: solve progressively harder realistic match puzzles
- [ ] **FUN-TO-002** JSON Detective: locate deliberately invalid syntax and repair a sample document
- [ ] **FUN-TO-003** HTTP Status Emoji Quiz: match status codes to actual meanings
- [ ] **FUN-TO-004** Cron Time Travel Puzzle: guess the next scheduled run with timezone explanation
- [ ] **FUN-TO-005** Bug Hunt: inspect tiny sample snippets and choose actual corrective diff
- [ ] **FUN-TO-006** JWT Myth Buster: decode harmless mock payloads and explain decode vs verify
- [ ] **FUN-TO-007** CSS Selector Showdown: identify matching selectors and specificity
- [ ] **FUN-TO-008** API Response Mystery: compare fictional JSON and find the breaking contract change
- [ ] **FUN-TO-009** Unix Timestamp Challenge: convert and predict dated timestamps
- [ ] **FUN-TO-010** Code Comment Fortune Cards: humorous opt-in prompts, not real executable code analysis
- [ ] **FUN-TO-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-TO-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-TO-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### MoneyAvora — Money Challenge Room

**Purpose:** Practical money literacy with entertaining scenarios that never mock debt hardship or imply financial guarantees.

- [ ] **FUN-MA-001** Coffee Budget Time Machine: repeated small spending over a hypothetical year
- [ ] **FUN-MA-002** Budget Leak Detective: identify overspending in a fictional expense sheet
- [ ] **FUN-MA-003** Debt Snowball Race: compare repayment orders from editable example assumptions
- [ ] **FUN-MA-004** Savings Goal Bingo: check off user-defined no-cost saving habits
- [ ] **FUN-MA-005** Inflation Time Travel: visualize same purchasing power with example inflation data
- [ ] **FUN-MA-006** Spend or Save Simulator: compare user-entered opportunity costs without advice
- [ ] **FUN-MA-007** Emergency Fund Builder: challenge to construct a monthly savings schedule
- [ ] **FUN-MA-008** Price Markup Guess: predict actual margin from sample shop costs
- [ ] **FUN-MA-009** Import Cost Surprise: uncover hidden freight/insurance line items
- [ ] **FUN-MA-010** Compounding Myth or Fact Quiz: distinguish APY, APR and contribution effects
- [ ] **FUN-MA-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-MA-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-MA-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### IndustryLuma — Farm & Factory Fun

**Purpose:** Playful educational farm and industrial mini-simulators; never animal clinical care, pesticide dosing or compliance approval.

- [ ] **FUN-IL-001** Guess the Cow Weight: compare rough body-measure estimate to guesses, with approximation disclaimer
- [ ] **FUN-IL-002** Milk Yield Challenge: predict total milk from an example herd day
- [ ] **FUN-IL-003** Feed Cost Detective: find an over-budget feed item in fictional dairy records
- [ ] **FUN-IL-004** Poultry FCR Puzzle: solve feed conversion from sample batch inputs
- [ ] **FUN-IL-005** Fish Pond Stocking Puzzle: explore illustrative stocking and pond volume arithmetic
- [ ] **FUN-IL-006** Crop Spacing Grid: place seedlings in a plot to learn density
- [ ] **FUN-IL-007** Factory Bottleneck Hunt: identify limiting workstation from sample cycle times
- [ ] **FUN-IL-008** OEE Score Challenge: compute availability, performance and quality components
- [ ] **FUN-IL-009** Waste Sorting Mini Quiz: categorize common packaging and process scraps
- [ ] **FUN-IL-010** ETP Water Balance Puzzle: locate missing volume in a hypothetical flow chart
- [ ] **FUN-IL-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-IL-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-IL-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### WorldOrixa — World Trivia Arena

**Purpose:** Fact-checked geographical, cultural and historical challenges, avoiding unverified political claims or fake news.

- [ ] **FUN-WO-001** Guess the Country on Map: clickable geography puzzle
- [ ] **FUN-WO-002** Flag Match Challenge: match flag to country with accurate ownership
- [ ] **FUN-WO-003** World Timezone Guess: predict local clock time in a chosen city
- [ ] **FUN-WO-004** Timeline Shuffle: order dated historical world events with references
- [ ] **FUN-WO-005** Capital City Match: choose capitals with source/region information
- [ ] **FUN-WO-006** Population Estimate Challenge: guess from labeled dated public statistical data
- [ ] **FUN-WO-007** Festival Match Quiz: match culture events to countries with cited factual background
- [ ] **FUN-WO-008** Sports History Quiz: only legally sourced historical verified outcomes
- [ ] **FUN-WO-009** Fact or Fiction News Check: learn to verify an actual claim via original sources
- [ ] **FUN-WO-010** Country Silhouette and Distance Quiz: guess neighboring country and map distance
- [ ] **FUN-WO-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-WO-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-WO-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### VitalOryx — Wellness Joy Lab

**Purpose:** Nonclinical and nonjudgmental wellness mini games encouraging learning and habits without medical advice.

- [ ] **FUN-VO-001** Desk Stretch Bingo: user-selected movement breaks with accessibility options
- [ ] **FUN-VO-002** Walking Pace Challenge: guess then calculate pace from hypothetical distance and time
- [ ] **FUN-VO-003** Hydration Habit Garden: celebrate self-chosen check-ins without prescribing intake
- [ ] **FUN-VO-004** Sleep Routine Builder: assemble a calming fictional bedtime plan
- [ ] **FUN-VO-005** Movement Break Spin: choose between safe low-effort stretch suggestions, skip freely
- [ ] **FUN-VO-006** Healthy Label Detective: interpret food labels using sample numbers
- [ ] **FUN-VO-007** Screen Break Quest: opt-in focus and break timer rewards
- [ ] **FUN-VO-008** Fitness Vocabulary Match: learn terms and measurement units
- [ ] **FUN-VO-009** Breathing Animation Garden: nonmedical timed calm visuals with opt-out
- [ ] **FUN-VO-010** Kind Habit Streak Cards: positive local check-ins without body shaming or clinical scoring
- [ ] **FUN-VO-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-VO-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-VO-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### EduNovira — Study Fun Arcade

**Purpose:** Small skill-building games linked to educational tools and honest progress, not fake exams or scores.

- [ ] **FUN-EN-001** Math Speed Round: optional timer with validated arithmetic answers
- [ ] **FUN-EN-002** GPA Target Puzzle: determine required grade from editable example weights
- [ ] **FUN-EN-003** Memory Match Cards: pair terms and user-created flashcards
- [ ] **FUN-EN-004** Vocabulary Word Challenge: spell and identify meaning from verified word lists
- [ ] **FUN-EN-005** Exam Planner Puzzle: rearrange tasks into available study slots
- [ ] **FUN-EN-006** Science Myth Quiz: sourced fact questions with explanation
- [ ] **FUN-EN-007** Coding Bug Mini Quiz: debug simple code snippets
- [ ] **FUN-EN-008** Geography Flash Challenge: country and place knowledge with source
- [ ] **FUN-EN-009** Pomodoro Study Quest: distraction-free focus timer with local accomplishments
- [ ] **FUN-EN-010** Career Skill Bingo: opt-in self-assessment prompts, not fake job recommendations
- [ ] **FUN-EN-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-EN-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-EN-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### LifeAlora — Happy Life Playground

**Purpose:** Home, travel and pet-owner humor that creates useful cards/checklists, not animal medicine or farm calculators.

- [ ] **FUN-LA-001** Pet Name Mixer: funny dog/cat names using user-chosen themes
- [ ] **FUN-LA-002** Dog or Cat Personality Fun Quiz: playful fictional result explicitly not behavior diagnosis
- [ ] **FUN-LA-003** Pet Budget Surprise: guess costs from owner-entered numbers and see breakdown
- [ ] **FUN-LA-004** Paw Adventure Card: create illustrated text-only pet adventure story card locally
- [ ] **FUN-LA-005** Room Makeover Shuffle: try harmless furniture arrangements on a sample 2D plan
- [ ] **FUN-LA-006** Paint Color Match: playful combinations with real accessibility/color contrast explanation
- [ ] **FUN-LA-007** Travel Packing Challenge: pack essentials for user-selected itinerary constraints
- [ ] **FUN-LA-008** Where Would You Travel Quiz: preference-based ideas without fabricated prices
- [ ] **FUN-LA-009** Moving Box Tetris-like Puzzle: fit rectangular fictional boxes in a storage layout (original design)
- [ ] **FUN-LA-010** Household Chore Bingo: turn opt-in room chores into playful checklists
- [ ] **FUN-LA-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-LA-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-LA-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### TechDailyNews — Tech Trivia Pulse

**Purpose:** News-adjacent quizzes and release-history games backed by dated official documentation, no fabricated headlines.

- [ ] **FUN-TD-001** Guess the Release Year: match historical software release to year from verified notes
- [ ] **FUN-TD-002** Release Notes Spot the Difference: compare two sourced version changelogs
- [ ] **FUN-TD-003** AI Terminology Emoji Quiz: match terms and sourced technical definitions
- [ ] **FUN-TD-004** CVE Facts Challenge: distinguish ID, severity, publication and patch state with cited sample
- [ ] **FUN-TD-005** Security Myth Buster: identify accurate general digital safety guidance
- [ ] **FUN-TD-006** Tech Acronym Speed Quiz: expand common technical abbreviations
- [ ] **FUN-TD-007** Open Source Milestone Timeline: order verified software events
- [ ] **FUN-TD-008** Vendor Product Feature Match: choose documented feature without promotional claims
- [ ] **FUN-TD-009** Tech Headline Credibility Check: pick primary source and distinguish speculation
- [ ] **FUN-TD-010** Weekly Tech Knowledge Card: share a verified finding with publication/source date
- [ ] **FUN-TD-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-TD-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-TD-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### BrowserPixel — Creative Meme Playground

**Purpose:** Local-only amusing image creativity tools and shareable output, not unauthorized copyright reuse or PDF editing.

- [ ] **FUN-BP-001** Meme Maker: overlay user-supplied image and text with templates
- [ ] **FUN-BP-002** Sticker Maker: cut out simple shape/transparent background and save PNG
- [ ] **FUN-BP-003** Emoji Mosaic Builder: approximate photo with emoji shapes locally
- [ ] **FUN-BP-004** Comic Strip Layout: panels, speech bubbles and captions
- [ ] **FUN-BP-005** Pixel Art Painter: retro grid drawing and palette
- [ ] **FUN-BP-006** Funny Photo Filters: adjustable sketch, duotone, posterize and cartoon style
- [ ] **FUN-BP-007** Reaction Image Caption Lab: original text and user-owned images
- [ ] **FUN-BP-008** Pop-art Grid Generator: repeat colorized panel composition
- [ ] **FUN-BP-009** Caption Guess Challenge: optional local image caption prompt card
- [ ] **FUN-BP-010** Avatar Frame and Badge Maker: original themed frames without identity or sensitive assumptions
- [ ] **FUN-BP-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-BP-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-BP-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### FileSwiftTools — PDF Puzzle Lab

**Purpose:** Useful document-handling puzzles based on user-owned or safe demo files, while retaining privacy.

- [ ] **FUN-FS-001** PDF Page Order Puzzle: drag scrambled demo pages into the correct sequence
- [ ] **FUN-FS-002** PDF Size Challenge: predict and measure output size with honest compression limits
- [ ] **FUN-FS-003** Rotate the Scan Game: fix orientation of sample document pages
- [ ] **FUN-FS-004** Find the Duplicate Page: compare demo PDF thumbnails and pick repeats
- [ ] **FUN-FS-005** PDF Trivia Challenge: test page size, searchable text and metadata understanding
- [ ] **FUN-FS-006** Blank Page Detective: identify blank or low-ink pages in a safe demo
- [ ] **FUN-FS-007** Form Field Finder: locate sample editable form fields
- [ ] **FUN-FS-008** Scanned or Searchable Quiz: reveal if sample PDFs contain text layers
- [ ] **FUN-FS-009** Document Version Spot the Difference: locate actual changes in demo pages
- [ ] **FUN-FS-010** PDF Bookmark Treasure Hunt: navigate sample outline/bookmarks to a targeted section
- [ ] **FUN-FS-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-FS-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-FS-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

#### ShiftCalcTools — Shift Life Arcade

**Purpose:** Gentle scheduling and timekeeping puzzles that teach real hours math and respect worker wellbeing.

- [ ] **FUN-SC-001** Night Owl vs Early Bird Fun Quiz: self-reported schedule preference only
- [ ] **FUN-SC-002** Shift Swap Puzzle: find conflict-free swap for sample worker roster
- [ ] **FUN-SC-003** Overtime Math Challenge: solve gross pay from user-entered hypothetical rates
- [ ] **FUN-SC-004** Break Time Bingo: understand paid versus unpaid break rules with editable settings
- [ ] **FUN-SC-005** Rotating Shift Pattern Puzzle: match recurring schedule patterns to days
- [ ] **FUN-SC-006** Shift Conflict Detective: spot overlapping assignments in sample calendars
- [ ] **FUN-SC-007** Guess the Work Hours: predict elapsed hours of overnight shifts
- [ ] **FUN-SC-008** Time Zone Challenge: match cross-border coworker shift times
- [ ] **FUN-SC-009** PTO Calendar Quest: use a fictional balance to plan breaks
- [ ] **FUN-SC-010** Paycheck Guess and Reveal: compare gross calculations without asserting tax law
- [ ] **FUN-SC-011** Implement one brand-specific /fun/ home with accurate preview, relevant links and original artwork, accessible on mobile.
- [ ] **FUN-SC-012** Generate user-triggered safe share card + copy link/download alternative; link meaningful next product utility without forcing a share.
- [ ] **FUN-SC-013** Regression-test sample inputs, joke/trivia accuracy, privacy controls, unique SEO intent and nonintrusive ad placement.

### Conversion funnel and measurable results

**Fun page discovered (search/social/direct) → mini tool completed → share initiated by user → genuine shared-link visitor → relevant full tool discovered → legitimate return visit → compliant ad impression.** Not every share becomes a referral and no traffic or AdSense earnings are guaranteed.

**No account free architecture:** Cloudflare Pages static HTML/CSS/JS, client-side SVG/Canvas/Web Share API, optional IndexedDB. External data/facts only after commercial-use rights review and cited freshness. A URL with embedded answer must never include sensitive personal/private inputs. No centralized public leaderboard necessary.

**User-share mechanism:** Native Share where user gesture/platform supports it; otherwise Copy Link, copy plain text, Save Result Image. Export the result itself, not just a generic advertisement for the site. Generated share cards disclose simulation status when appropriate.

**Ad & indexing protection:** ads never within game actions, result reveal, share or download controls. No rewards for clicking ads. Unique functional fun tools can be indexable, but millions of generated result URLs, copied jokes and stub pages must not be indexed.

**Relevant references:** Web Share API https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API ; Google scaled content abuse https://developers.google.com/search/docs/essentials/spam-policies ; Google ad placement https://support.google.com/adsense/answer/1346295 .

**Definition of done:** A branded fun section with genuinely working mini tools, sample inputs, accurate sources where needed, accessible controls, user-initiated share/copy/download, privacy safety, existing real-tool links, tested mobile performance and appropriate Google/AdSense compliance. No checkbox means complete merely because its idea appears here.
