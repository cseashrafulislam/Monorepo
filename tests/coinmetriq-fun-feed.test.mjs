import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {miningCostStory,tokenUnlockStory} from "../sites/coinmetriq/fun-math.mjs";
import {validateLicensedSource,validateLicensedCatalog,parseLicensedQuote,fetchLicensedQuote,manualQuote} from "../sites/coinmetriq/licensed-data-core.mjs";
import {portfolioRoutes} from "../sites/coinmetriq/portfolio-pages.mjs";
const source={
 id:"licensed-demo-provider",label:"Example Official Commercial Quote License",symbol:"BTC-USD",
 url:"https://api.example.org/quote/btc-usd",licenseEvidenceUrl:"https://docs.example.org/coinmetriq-commercial-agreement",
 reviewedAt:"2026-11-01",licenseValidUntil:"2027-01-31",
 commercialDisplayAllowed:true,redistributionAllowed:true,ownerReviewedRights:true,minRefreshSeconds:120
};

test("Mining animated expense/revenue story is exact, monotone and describes the limits",()=>{
 const result=miningCostStory({watts:1200,hours:720,tariff:.12,revenue:140});
 assert.equal(result.totalKwh,864);
 assert.ok(Math.abs(result.expense-103.68)<1e-8);
 assert.ok(Math.abs(result.net-36.32)<1e-8);
 assert.equal(result.points.length,31);
 assert.equal(result.points[0].cost,0);
 assert.ok(Math.abs(result.points.at(-1).cost-103.68)<1e-8);
 assert.equal(result.points.at(-1).hours,720);
 assert.match(result.note,/no mining earnings are predicted/);
 assert.throws(()=>miningCostStory({watts:0,hours:720,tariff:.12,revenue:140}),/watts/);
 assert.throws(()=>miningCostStory({watts:1200,hours:0,tariff:.12,revenue:140}),/hours/);
});

test("Unlock story models equal hypothetical rounds and a fixed holder balance",()=>{
 const x=tokenUnlockStory({initial:10000000,unlockPerRound:2500000,rounds:6,holding:10000});
 assert.equal(x.points.length,7);
 assert.equal(x.finalSupply,25000000);
 assert.equal(x.unlockTotal,15000000);
 assert.ok(Math.abs(x.startSharePct-.1)<1e-10);
 assert.ok(Math.abs(x.endSharePct-.04)<1e-10);
 assert.ok(Math.abs(x.relativeDilutionPct-60)<1e-8);
 assert.ok(x.points.every((v,i,a)=>i===0||v.sharePct<=a[i-1].sharePct));
 assert.throws(()=>tokenUnlockStory({initial:1000,unlockPerRound:200,rounds:25,holding:50}),/rounds/);
 assert.throws(()=>tokenUnlockStory({initial:1000,unlockPerRound:200,rounds:4,holding:2000}),/exceed/);
});

test("Site has no unlicensed market provider enabled by default",()=>{
 const data=JSON.parse(fs.readFileSync("sites/coinmetriq/licensed-sources.json","utf8"));
 assert.deepEqual(data.sources,[]);
 assert.deepEqual(validateLicensedCatalog(data),[]);
 const published=JSON.parse(fs.readFileSync("dist/coinmetriq/assets/cm-licensed-sources.json","utf8"));
 assert.deepEqual(published.sources,[]);
 assert.equal(portfolioRoutes().length,15);
 const html=fs.readFileSync(path.join("dist/coinmetriq","portfolio","licensed-data","index.html"),"utf8");
 assert.ok(html.includes('data-cm-portfolio="licensed-data"'));
 assert.match(html,/Manual price and timestamp reference/);
 assert.match(html,/commercial display/i);
});

test("Real commercial provider catalog requires explicit evidence, future expiry and no exposed key",()=>{
 const v=validateLicensedSource(source,{today:"2026-11-23"});
 assert.equal(v.symbol,"BTC-USD");
 const catalog=validateLicensedCatalog({schemaVersion:1,sources:[source]},{today:"2026-11-23"});
 assert.equal(catalog.length,1);
 assert.throws(()=>validateLicensedSource({...source,redistributionAllowed:false},{today:"2026-11-23"}),/commercial/);
 assert.throws(()=>validateLicensedSource({...source,licenseValidUntil:"2026-01-01"},{today:"2026-11-23"}),/expired/);
 assert.throws(()=>validateLicensedSource({...source,url:"http://api.example.org/quote"},{today:"2026-11-23"}),/HTTPS/);
 assert.throws(()=>validateLicensedSource({...source,url:"https://127.0.0.1/private"},{today:"2026-11-23"}),/public HTTPS/);
 assert.throws(()=>validateLicensedSource({...source,url:"https://api.example.org/quote?key=SECRET"},{today:"2026-11-23"}),/query tokens/);
 assert.throws(()=>validateLicensedCatalog({schemaVersion:1,sources:[source,source]},{today:"2026-11-23"}),/Duplicate/);
});

test("Approved provider quotes are validated and stale/future observations cannot masquerade as fresh",async()=>{
 const valid=validateLicensedSource(source,{today:"2026-11-23"});
 const now=Date.parse("2026-11-23T12:00:00Z");
 const q={symbol:"BTC-USD",priceUSD:81000.25,asOf:"2026-11-23T11:59:00Z"};
 const parsed=parseLicensedQuote(q,valid,{now});
 assert.equal(parsed.priceUSD,81000.25);
 assert.equal(parsed.ageSeconds,60);
 assert.equal(parsed.stale,false);
 assert.equal(parseLicensedQuote({...q,asOf:"2026-11-22T12:00:00Z"},valid,{now}).stale,true);
 assert.throws(()=>parseLicensedQuote({...q,symbol:"DOGE-USD"},valid,{now}),/does not match/);
 assert.throws(()=>parseLicensedQuote({...q,priceUSD:"-5"},valid,{now}),/positive/);
 assert.throws(()=>parseLicensedQuote({...q,asOf:"2026-11-23T12:20:00Z"},valid,{now}),/future/);
 const fetched=await fetchLicensedQuote(valid,{now,fetchFn:async(url,opts)=>({
  ok:true,status:200,headers:{get:k=>"application/json"},text:async()=>JSON.stringify(q)
 })});
 assert.equal(fetched.symbol,"BTC-USD");
 assert.equal(fetched.ageSeconds,60);
 await assert.rejects(fetchLicensedQuote(valid,{now,fetchFn:async()=>({ok:false,status:403})}),/HTTP 403/);
});

test("Manual quote always works without a source and is never mislabeled live",()=>{
 const x=manualQuote({symbol:"BTC-USD",priceUSD:"65000.00",asOf:"2026-01-15T12:00:00Z"});
 assert.equal(x.priceUSD,65000);
 assert.equal(x.stale,true);
 assert.match(x.sourceName,/Manual user entry/);
 assert.equal(x.sourceUrl,"");
 assert.throws(()=>manualQuote({symbol:"BTC-USD",priceUSD:0,asOf:"2026-01-15T12:00:00Z"}),/positive/);
});
