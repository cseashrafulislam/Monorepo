# CoinMetriq production and monetization readiness — owner checklist

**Verified source features are not the same as a successful deployment, verified search ownership, AdSense site approval, or earnings.** This checklist is the explicit external-account gate for Site 1. It does not authorize editing any of the other 13 site products.

## Production launch

- [ ] Confirm the actual Cloudflare Pages project points to \`cseashrafulislam/Monorepo\`, correct branch and \`dist/coinmetriq\` output; check Pages build root and build command against the actual Cloudflare dashboard.
- [ ] Confirm public \`https://coinmetriq.pages.dev/\` or an owned custom domain is accessible without bot challenges, 5xx errors, Cloudflare Workers runtime errors or broken static assets. The public checker was unable to access the pages.dev URL during this session; this is **not independent evidence of downtime**.
- [ ] Run the **CoinMetriq public production health** GitHub Actions workflow, which checks 20 real HTTPS routes, core JS assets, canonical tags, sitemap inclusion, robots and explicit tax-page noindex.
- [ ] If a legitimate canonical custom domain is configured, add GitHub Actions repository variable \`COINMETRIQ_LIVE_BASE=https://your-verified-domain.example\`. Also set actual \`PUBLIC_SITE_URL\` in Cloudflare Pages environment and rebuild with matching canonical host, sitemap and robots. Do not point canonical to an unowned hostname.
- [ ] Check mobile width ~320px and low-memory Android devices for nav, calculator input, long CSV files, scrolling result tables, SVG rendering and browser file downloads.
- [ ] Check accessibility with keyboard-only operation, reduced-motion mode, screen-reader announcements, correct label associations, and color contrast. Headless Chrome automation is not full WCAG certification.
- [ ] Verify static Cloudflare quota and Pages build triggers when unrelated Monorepo sites are updated. Browser-side work must not send each visitor through a Worker API.

## Technical indexing and SEO

- [ ] Verify domain property in Google Search Console and corresponding Bing Webmaster property through their official owner workflows.
- [ ] Submit actual live \`/sitemap.xml\` only after confirming canonical deployment. Submission does not guarantee Google or Bing indexing.
- [ ] Inspect real crawl reports, mobile UX, discoverability, snippets and URL inspection results for the newly expanded 27 original subject-specific guides; three law/tax/current-news research pages deliberately remain noindex pending additional expert and dated source review.
- [ ] Confirm official technical references are still accessible and relevant, fix verified 404/source changes, and review significant legal/security changes with appropriately qualified expertise.
- [ ] Only record measured impressions, clicks, CTR, verified AI citations and direct visits; no fabricated keyword volume or rankings.

## Google AdSense monetization — fail-closed setup

- [ ] Check the exact domain/hostname is eligible for site addition in the real AdSense account; do not assume a \`pages.dev\` subdomain will be accepted.
- [ ] Once you know your **actual AdSense publisher identifier** (format \`pub-1234567890123456\`), configure Cloudflare Pages build environment \`COINMETRIQ_ADSENSE_PUBLISHER=pub-...actual digits...\`. No publisher ID is stored in source.
- [ ] Rebuild. The build writes an \`ads.txt\` record and an AdSense site ownership meta tag only when a syntactically valid real ID is supplied. These support verification; they do not activate advertising.
- [ ] Submit for Google review in AdSense, observe its actual Sites page until the site is **Ready**, and validate \`ads.txt\` status. Do not assume approval from HTML tags alone.
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
- [ ] Publish future work only after original technical examples, source license, editorial value, human review for sensitive claims, build and browser tests. Article catalog at \`sites/coinmetriq/articles.json\` gates draft versus published; do not run mass-automated daily AI posts.
- [ ] Monitor public health workflow evidence from GitHub Actions on its twice-weekly schedule; actual runs depend on repository Actions configuration.
- [ ] Revisit security patches, browser regressions, Cloudflare errors, real search evidence and monetization policy periodically.

**Closure rule:** CoinMetriq can be called **source implementation complete for tested features** when CI passes. It can be called **production operationally verified** only once real Cloudflare delivery, domain, Google/Bing/Search accounts and (if monetization is required) AdSense approval and consent are independently verified with account-based evidence. Do not check unknown results Done. Continue implementing only this site until the owner accepts any genuine external blocker.
