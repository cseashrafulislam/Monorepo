# CoinMetriq: source-first article publishing

CoinMetriq is a free, registration-free crypto educational research product. The article catalog lives at \`sites/coinmetriq/articles.json\`. The original three formula explainers are currently in the site renderer; ten additional source-backed articles live in the catalog. All new entries should use this catalog rather than editing HTML or manually copying pages.

## How to publish

1. Copy the object from \`sites/coinmetriq/article-template.json\` into the \`articles\` array of \`articles.json\`.
2. Keep \`status: "draft"\` while preparing examples, validating source rights, reviewing risk language and checking that the linked calculator actually works. Drafts are excluded from site HTML and sitemap.
3. Use a unique task-specific slug and title, at least four genuinely useful sections, an original reproducible example, truthful methodology, source URLs and relevant same-brand tool route. Avoid unsourced current exchange prices or laws.
4. When independently ready, set \`status: "published"\`, specify \`publishedAt\` in YYYY-MM-DD format (the actual date), and open a GitHub pull request.
5. CI runs a complete static build, Node tests, editorial article audit, SEO route/canonical/internal-link scan, and headless browser checks. Do not merge a failing check.
6. On successful merge Cloudflare Pages may build the site if its Git integration/Build Watch Paths are correctly configured. Verify real Cloudflare deployment URL separately. The GitHub build alone is not deployment evidence.
7. Once publishing is confirmed, submit updated sitemap under a verified Search Console/Bing property; crawl/indexing is independently decided by search engines.

## Guidelines

- Write for CoinMetriq audience: portfolio arithmetic, custody security, token issuance or protocol mechanics. Do not duplicate MoneyAvora loan content or TechDailyNews release headlines.
- Source references need legitimate commercial-use and appropriate permission to use in ad-funded content; a free data API is not automatically commercially licensed.
- Article and tool SEO are shipped with the page. Article structured data represents the real publisher; do not invent a human expert byline, reviews, ratings, quotes, market prices, test results or current data.
- Keep financial/investment content educational and evidence-based. Use current verified official sources for changing regulations and market facts; label fictional math and uncertainty.
- Do not automatically publish one post per day if independent quality checks are not complete. SitePilot or AI can prepare drafts but cannot waive source verification or rights checks.
- Protect existing 30 short topic pages with \`noindex,follow\` until original expanded evidence and review support indexing.
- Keep user uploads in their browser, never transmit transaction CSV or recovery phrases to a publishing API.
- No login, paywall or forced advertising, no click rewards, no purchased backlinks.
- Public \`pages.dev\` URLs may or may not be accepted in a particular AdSense account; approval and domain-ownership verification are external processes.

## Build and QA

\`\`\`bash
npm run build:all
npm run test
npm run audit:coinmetriq
npm run audit:content:coinmetriq
npm run smoke:coinmetriq
\`\`\`

Cloudflare Pages can be set to build only when CoinMetriq-specific files, the shared build system or relevant assets change; check the existing project configuration. Avoid daily artificial git commits solely to update sitemap lastmod or create empty articles.
