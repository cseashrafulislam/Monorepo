# CoinMetriq production and monetization readiness — owner checklist

**Source features and Cloudflare public HTTP delivery are now separately verified; Google/Bing ownership, AdSense site approval and real earnings still require their own account-based evidence.** This checklist is the explicit external-account gate for Site 1. It does not authorize editing any of the other 13 site products.

## Production launch

- [x] GitHub confirms Cloudflare Pages `coinmetriq` deployment check `success` for main commit `ef6d15d26401f5b6ebfe55644393239e5b7741cd` on 23 November 2026. Evidence: [Cloudflare deployment check](https://github.com/cseashrafulislam/Monorepo/runs/137517914202) and [provider deployment details](https://dash.cloudflare.com/?to=/47b98852425880cb7ad646f190774464/pages/view/coinmetriq/9374eacf-d24e-451a-9d6a-f261e139e322). Public deployment and 21/21 independently fetched public HTTPS routes were subsequently verified using the real SHA. Evidence: [successful live run attempt 2](https://github.com/cseashrafulislam/Monorepo/actions/runs/45123584862) and [successful Cloudflare deploy for release SHA 3f814ba](https://github.com/cseashrafulislam/Monorepo/runs/137523813644).
- [ ] Verify the Cloudflare Pages dashboard still shows expected production branch `main`, build command `SITE=coinmetriq npm run build` (or equivalent selected-site build), output `dist/coinmetriq` and matching root. The GitHub check alone does not expose all build settings.
- [x] Confirm production base `https://coinmetriq.pages.dev/` via GitHub Actions' independent public HTTPS client: **21 endpoints/21 passed, zero HTTP/metadata failures, exact public build SHA matched the Cloudflare release check**, 23 November 2026. See [run](https://github.com/cseashrafulislam/Monorepo/actions/runs/45123584862). This is a production HTTP smoke test, not a guarantee that every visitor region/device or every future release is healthy.
- [x] Configure the automatic post-CI release workflow to match the exact successful Cloudflare GitHub App check to the released Git SHA, then test **21 real HTTPS endpoints** including public build metadata. Also retains manual and twice-weekly checks. Source workflow configured; the exact release was subsequently confirmed live via 21/21 checks. Source-aware future verification avoids false failure on docs-only commits and accommodates sequential Cloudflare Free builds.
- [x] Confirm a completed [CoinMetriq public production health run](https://github.com/cseashrafulislam/Monorepo/actions/runs/45123584862) verifies both the successful Cloudflare GitHub App deployment and all 21 public endpoints for commit `3f814ba453b723d21a0dd06b21b8984e7a1c4dd3`. This run originally failed while deployment was still queued; rerunning once the provider finished returned **success**.
- [ ] If a legitimate canonical custom domain is configured, add GitHub Actions repository variable `COINMETRIQ_LIVE_BASE=https://your-verified-domain.example`. Also set actual `PUBLIC_SITE_URL` in Cloudflare Pages environment and rebuild with matching canonical host, sitemap and robots. Do not point canonical to an unowned hostname.
- [ ] Check mobile width ~320px and low-memory Android devices for nav, calculator input, long CSV files, scrolling result tables, SVG rendering and browser file downloads.
- [ ] Check accessibility with keyboard-only operation, reduced-motion mode, screen-reader announcements, correct label associations, and color contrast. Headless Chrome automation is not full WCAG certification.
- [ ] Verify static Cloudflare quota and Pages build triggers when unrelated Monorepo sites are updated. Browser-side work must not send each visitor through a Worker API.

## Technical indexing and SEO

- [x] Build now supports owner-issued **HTML meta tag** verification (without inventing a token): set `COINMETRIQ_GOOGLE_SITE_VERIFICATION=<value only>` and/or `COINMETRIQ_BING_SITE_VERIFICATION=<value only>` in Cloudflare Pages production build environment. After redeployment, inspect the homepage `<head>` for the correct `google-site-verification` and `msvalidate.01` tags.
- [ ] Verify the exact **URL-prefix** property via the official Google Search Console/Bing Webmaster account. A Google **Domain property** generally requires DNS ownership proof and cannot be completed with only a website meta tag. Select the correct method for the property type.
- [ ] Submit actual live `/sitemap.xml` only after confirming canonical deployment. Submission does not guarantee Google or Bing indexing.
- [ ] Inspect real crawl reports, mobile UX, discoverability, snippets and URL inspection results for the newly expanded 27 original subject-specific guides; three law/tax/current-news research pages deliberately remain noindex pending additional expert and dated source review.
- [ ] Confirm official technical references are still accessible and relevant, fix verified 404/source changes, and review significant legal/security changes with appropriately qualified expertise.
- [ ] Only record measured impressions, clicks, CTR, verified AI citations and direct visits; no fabricated keyword volume or rankings.

## Google AdSense monetization — fail-closed setup

- [ ] Add the exact public host to the actual AdSense Sites list. Google documents that subdomains of platforms in the Public Suffix List are in an eligible **site-addition category**, and `pages.dev` appears in the current Public Suffix List; **that does not establish that this particular site has been added or approved**. A custom domain is optional unless required by the real account/site review outcome.
- [ ] Once you know your **actual AdSense publisher identifier** (format `pub-1234567890123456`), configure Cloudflare Pages build environment `COINMETRIQ_ADSENSE_PUBLISHER=pub-...actual digits...`. No publisher ID is stored in source.
- [ ] Rebuild. The build writes an `ads.txt` record and an AdSense site ownership meta tag only when a syntactically valid real ID is supplied. These support verification; they do not activate advertising.
- [ ] Submit for Google review in AdSense, observe its actual Sites page until the site is **Ready**, and validate `ads.txt` status. Do not assume approval from HTML tags alone.
- [ ] For visitors in the EEA, UK and Switzerland, configure a Google-certified CMP and comply with Google's EU User Consent Policy and applicable privacy requirements before serving ads.
- [ ] Add ad-serving code only after owner-confirmed approval, region/consent rules, publisher ID and ad unit details are known. Keep ad placements away from file upload, calculations, download/share controls, quiz choices and input fields. Avoid any reward-for-click mechanism.
- [ ] Update privacy disclosure to reflect actual advertising and any measurement cookies. Verify no legacy popunders/social-bar ads or competing scripts create accidental clicks or deceptive UX.
- [ ] Measure actual AdSense site RPM, valid impressions and revenue in the real authorized account. Ads, approvals and earnings cannot be simulated as completed.

Official background:
- https://support.google.com/adsense/answer/12131223
- https://support.google.com/adsense/answer/12171612
- https://support.google.com/adsense/answer/13554116

## Publication operations and maintenance

- [ ] Review source changes in the 27 evergreen topic guides and independently handle 3 legal/tax/news review-only guides. Source-citing a document is not a legal sign-off.
- [ ] Publish future work only after original technical examples, source license, editorial value, human review for sensitive claims, build and browser tests. Article catalog at `sites/coinmetriq/articles.json` gates draft versus published; do not run mass-automated daily AI posts.
- [ ] Monitor public health workflow evidence from GitHub Actions on its twice-weekly schedule; actual runs depend on repository Actions configuration.
- [ ] Revisit security patches, browser regressions, Cloudflare errors, real search evidence and monetization policy periodically.

**Live build provenance:** Cloudflare Pages provides `CF_PAGES_COMMIT_SHA` at build time. The site now emits `/build-info.json` and a `coinmetriq-build-commit` meta tag only for a genuine 40-character build SHA. Post-CI verification compares that value with the successful Cloudflare check rather than merely trusting that the route responded. A GitHub CI-only build gets a different provenance platform label; local builds do not invent a SHA.

**Closure rule:** CoinMetriq can be called **source implementation complete for tested features** when CI passes. It can be called **production operationally verified** only once real Cloudflare delivery, domain, Google/Bing/Search accounts and (if monetization is required) AdSense approval and consent are independently verified with account-based evidence. Do not check unknown results Done. Continue implementing only this site until the owner accepts any genuine external blocker.
