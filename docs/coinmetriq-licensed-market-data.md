# CoinMetriq: license-gated public crypto quote adapter

**Default: no live provider enabled.** CoinMetriq is free for visitors, advertising-funded when approved, and requires no account. Free/demo API availability is not automatically permission to show that provider's prices to an ad-supported audience. The historical CSV import, user-entered price references, and Bitcoin Core consensus research still operate without any remote provider.

## Rights review before enabling data

Verify the specific API company's **written commercial ad-supported display AND redistribution permission** for the exact proposed use and domain. Inspect rate limits, attribution requirements, historical-data coverage, caching prohibitions, key handling, privacy/CORS requirements, and ability to terminate use. Keep the legally binding license/evidence outside the public repository if confidential; an allowed public supporting URL is for public license terms, not a replacement for a signed private contract. Do not place secret credentials in any static code or data file.

As of the November 2026 primary documentation:
- CoinGecko's free Demo API does not grant general commercial rights to a paid/ad-supported product. Their paid and redistribution rights are separate: https://support.coingecko.com/articles/1043089972-what-are-the-differences-between-commercial-and-custom-licenses
- Coinbase Exchange Market Data Terms restrict particular uses and derivative valuations: https://www.coinbase.com/legal/market_data
- Bitstamp directs organizations wishing to incorporate/redistribute exchange data commercially to obtain a commercial-use Data License Agreement: https://www.bitstamp.net/api/

**No such price provider is configured without actual rights confirmation.**

## Technical contract

The source-controlled \`sites/coinmetriq/licensed-sources.json\` is the only registry. A source may be added after verified permission. Accepted examples need this complete JSON shape:

\`\`\`json
{
  "id": "legally-cleared-source",
  "label": "Contracted Commercial Market Source",
  "symbol": "BTC-USD",
  "url": "https://api.approved-example-provider.com/coinmetriq-btc-usd.json",
  "licenseEvidenceUrl": "https://provider.example.com/legal/permission",
  "reviewedAt": "2026-11-23",
  "licenseValidUntil": "2026-12-31",
  "commercialDisplayAllowed": true,
  "redistributionAllowed": true,
  "ownerReviewedRights": true,
  "minRefreshSeconds": 120
}
\`\`\`

These addresses are **format examples only**, not real licensed endpoints. The returned public, CORS-available JSON must contain:

\`\`\`json
{"symbol":"BTC-USD","priceUSD":81000.25,"asOf":"2026-11-23T12:00:00Z"}
\`\`\`

The server-side source endpoint must be a controlled public HTTPS resource without API keys, query tokens or tracking credentials. The browser does not proxy, relay, cache, publish, or automatically run requests; it fetches an individually selected source only upon click, with a timeout and 30 KB response cap. The on-screen label includes source name, observation date, freshness and official license reference. The manual price input always works without it.

## Quality and safety gates

\`\`\`bash
npm run build:all
npm run test
npm run audit:license:coinmetriq
npm run audit:coinmetriq
npm run smoke:coinmetriq
\`\`\`

The CI guard refuses unapproved flags, duplicate IDs, expired source reviews, insecure/private hosts and query-string credentials. It does **not** independently certify that a linked license actually grants the rights asserted. Human review of the actual permission is essential. Do not populate live sources merely to turn a pending checkbox green.

A provider can be left absent indefinitely with no impact on any historical research feature. Visitors need not sign up or acquire an API key. No live-data quote is ever silently substituted for a sample price.
