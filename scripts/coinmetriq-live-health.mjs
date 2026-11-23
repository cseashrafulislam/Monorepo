/* Public production verification; deliberately separate from static build and CI.
 * Checks the actual Cloudflare/custom-domain site, not compiled HTML only.
 * Run: COINMETRIQ_LIVE_BASE=https://coinmetriq.pages.dev node scripts/coinmetriq-live-health.mjs
 */
import fs from "node:fs";
const raw=process.env.COINMETRIQ_LIVE_BASE||"https://coinmetriq.pages.dev";
let base;
try{base=new URL(raw);}catch{throw Error("COINMETRIQ_LIVE_BASE must be a valid absolute HTTPS origin.");}
if(base.protocol!=="https:"||base.username||base.password||base.pathname!=="/"||base.search||base.hash)throw Error("Production URL must be a plain HTTPS origin without credentials.");
const host=base.origin;
const expectedSha=String(process.env.COINMETRIQ_EXPECTED_SHA||"").trim().toLowerCase();
if(expectedSha&&!/^[0-9a-f]{40}$/.test(expectedSha))throw Error("Expected SHA must be a full 40-digit Git commit SHA.");
const checks=[
 {route:"/",kind:"html",expect:"data-site=\"coinmetriq\""},
 {route:"/studio/",kind:"html",expect:"Crypto Research Studio"},
 {route:"/studio/trade-profit/",kind:"html",expect:"Crypto Trade Profit"},
 {route:"/portfolio/",kind:"html",expect:"Portfolio Workspace"},
 {route:"/portfolio/journal/",kind:"html",expect:"Trade Journal"},
 {route:"/portfolio/backups/",kind:"html",expect:"Encrypted Journal Backup"},
 {route:"/portfolio/token-emission/",kind:"html",expect:"Token Issuance"},
 {route:"/portfolio/risk-lab/",kind:"html",expect:"Historical Risk & Scenario Lab"},
 {route:"/portfolio/issuance-audit/",kind:"html",expect:"Bitcoin Consensus Issuance Audit"},
 {route:"/portfolio/licensed-data/",kind:"html",expect:"Licensed Market Data Reference Desk"},
 {route:"/articles/",kind:"html",expect:"Crypto Research Articles"},
 {route:"/articles/fifo-versus-weighted-average-crypto-cost-basis/",kind:"html",expect:"FIFO vs"},
 {route:"/topics/bitcoin-price/",kind:"html",expect:"Bitcoin price"},
 {route:"/topics/crypto-tax-concepts/",kind:"noindex",expect:"Digital-asset taxes"},
 {route:"/fun/",kind:"html",expect:"Crypto Chaos Lab"},
 {route:"/contact/",kind:"html",expect:"Contact, Feedback"},
 {route:"/editorial/",kind:"html",expect:"Editorial Standards"},
 {route:"/disclaimer/",kind:"html",expect:"Financial"},
 {route:"/help/",kind:"html",expect:"Tool User Guide"},
 {route:"/build-info.json",kind:"json",expect:'"site": "coinmetriq"'},
 {route:"/robots.txt",kind:"text",expect:"Sitemap:"},
 {route:"/sitemap.xml",kind:"xml",expect:host+"/topics/bitcoin-price/"},
 {route:"/assets/cm-portfolio.js",kind:"asset",expect:"setupJournal"},
 {route:"/assets/backup-core.mjs",kind:"asset",expect:"encryptJournal"},
 {route:"/assets/risk-core.mjs",kind:"asset",expect:"evaluateHistoricalRisk"},
 {route:"/assets/issuance-core.mjs",kind:"asset",expect:"bitcoinSubsidySats"},
 {route:"/assets/licensed-data-core.mjs",kind:"asset",expect:"validateLicensedCatalog"},
 {route:"/assets/fun-math.mjs",kind:"asset",expect:"miningCostStory"},
 {route:"/assets/cm-licensed-sources.json",kind:"asset",expect:'"sources": []'}
];
const result={checkedAt:new Date().toISOString(),base:host,checks:[],status:"failed"};
async function inspect(entry){
 const row={route:entry.route,ok:false,status:0,responseMs:0,error:null};
 const started=Date.now();
 try{
  const response=await fetch(host+entry.route,{method:"GET",redirect:"follow",headers:{"User-Agent":"CoinMetriq-LaunchMonitor/1.0 (public site health; no crawling of private data)","Accept":"text/html,application/xml,text/plain,*/*"},signal:AbortSignal.timeout(16000)});
  row.status=response.status;
  row.responseMs=Date.now()-started;
  if(!response.ok)throw Error("Unexpected HTTP "+response.status);
  if(new URL(response.url).origin!==host)throw Error("Redirected away from requested canonical host.");
  if(entry.kind==="html"||entry.kind==="noindex"){
   const ct=response.headers.get("content-type")||"";
   if(!ct.includes("text/html"))throw Error("Content type is not HTML.");
  }
  const content=await response.text();
  if(content.length>3_000_000)throw Error("Response HTML unexpectedly large.");
  if(!content.includes(entry.expect))throw Error("Expected content missing.");
  if(entry.kind==="json"){
   let release;
   try{release=JSON.parse(content);}catch{throw Error("Invalid public build provenance JSON.");}
   if(release.site!=="coinmetriq"||!/^[a-f0-9]{40}$/.test(release.commit)||release.platform!=="Cloudflare Pages")throw Error("Public site did not expose genuine Cloudflare production build metadata.");
   row.buildCommit=release.commit;
   if(expectedSha&&release.commit!==expectedSha)throw Error("Public production commit "+release.commit+" differs from successfully deployed Cloudflare check "+expectedSha+".");
  }
  if(entry.kind==="html"||entry.kind==="noindex"){
   if(!content.includes('href="'+host+entry.route+'"'))throw Error("Live canonical does not match the public host.");
   const tag=content.match(/<meta name="coinmetriq-build-commit" content="([a-f0-9]{40})">/);
   if(!tag)throw Error("No actual provider build commit published in page head.");
   if(expectedSha&&tag[1]!==expectedSha)throw Error("This HTML is not the checked release: "+tag[1]+".");
   if(entry.kind==="noindex"&&!content.includes('content="noindex,follow"'))throw Error("Unreviewed legal/tax page must stay noindex.");
   if(entry.kind==="html"&&!content.includes('content="index,follow"'))throw Error("Core public page is unexpectedly noindex.");
  }
  if(entry.kind==="xml"){
   if(!content.includes("<urlset")||!content.includes(host+"/portfolio/"))throw Error("Sitemap is missing key routes.");
   if(content.includes(host+"/topics/crypto-tax-concepts/"))throw Error("Sensitive tax page must not be in sitemap.");
  }
  row.ok=true;
 }catch(error){row.error=error.message||String(error);}
 return row;
}
// Small concurrency for free static hosting and reliable diagnostics.
for(let i=0;i<checks.length;i+=3){
 result.checks.push(...await Promise.all(checks.slice(i,i+3).map(inspect)));
}
result.status=result.checks.every(x=>x.ok)?"passed":"failed";
result.passed=result.checks.filter(x=>x.ok).length;
result.failed=result.checks.length-result.passed;
result.expectedSha=expectedSha||null;
result.liveBuildSha=result.checks.find(r=>r.route==="/build-info.json")?.buildCommit||null;
const dir="dist";fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(dir+"/coinmetriq-production-check.json",JSON.stringify(result,null,2)+"\n");
console.log("CoinMetriq live production verification:",JSON.stringify({base:host,total:result.checks.length,passed:result.passed,failed:result.failed,report:"dist/coinmetriq-production-check.json"},null,2));
if(result.failed){for(const row of result.checks.filter(x=>!x.ok))console.error(row.route+": "+row.error);process.exitCode=1;}
