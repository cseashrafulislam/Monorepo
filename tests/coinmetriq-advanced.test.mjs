import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {parseOhlcvCsv} from "../sites/coinmetriq/market-core.mjs";
import {evaluateHistoricalRisk,bootstrapRiskScenarios,riskFromOhlcvCsv,SAMPLE_RISK_CSV} from "../sites/coinmetriq/risk-core.mjs";
import {BITCOIN_REFERENCE,bitcoinSubsidySats,bitcoinSubsidyAtHeight,bitcoinEraTable,totalTheoreticalScheduledBtc,validateIssuerProvenance} from "../sites/coinmetriq/issuance-core.mjs";
import {portfolioRoutes} from "../sites/coinmetriq/portfolio-pages.mjs";

test("Historical VaR, conditional tail loss, Sharpe/Sortino, drawdown and bootstrap are reproducible",()=>{
 const bars=parseOhlcvCsv(SAMPLE_RISK_CSV),risk=evaluateHistoricalRisk(bars,{riskFreeAnnual:2,confidence:95});
 assert.equal(bars.length,35);
 assert.equal(risk.count,34);
 assert.ok(risk.historicalVarPct>=0);
 assert.ok(risk.historicalExpectedShortfallPct>=risk.historicalVarPct-1e-6);
 assert.ok(risk.annualizedVolatilityPct>0);
 assert.ok(risk.maxDrawdownPct>0);
 assert.ok(Number.isFinite(risk.sharpe));
 assert.ok(Number.isFinite(risk.sortino));
 assert.equal(risk.curve.length,35);
 assert.deepEqual(riskFromOhlcvCsv(SAMPLE_RISK_CSV,{riskFreeAnnual:2}).returns,risk.returns);
 const first=bootstrapRiskScenarios(bars,{days:25,paths:250,seed:42});
 const second=bootstrapRiskScenarios(bars,{days:25,paths:250,seed:42});
 assert.deepEqual(first,second);
 assert.equal(first.samplePaths.length,3);
 assert.equal(first.samplePaths[0].points.length,26);
 assert.ok(first.p05<=first.p50&&first.p50<=first.p95);
 assert.ok(first.negativePercent>=0&&first.negativePercent<=100);
 assert.match(first.method,/not a forecast probability/i);
});

test("Risk lab rejects under-sampled, invalid probability, horizon and reproducibility seeds",()=>{
 const bars=parseOhlcvCsv(SAMPLE_RISK_CSV);
 assert.throws(()=>evaluateHistoricalRisk(bars.slice(0,10)),/11/);
 assert.throws(()=>evaluateHistoricalRisk(bars,{confidence:75}),/95% or 99%/);
 assert.throws(()=>evaluateHistoricalRisk(bars,{riskFreeAnnual:800}),/risk-free/);
 assert.throws(()=>bootstrapRiskScenarios(bars,{days:2}),/5–90/);
 assert.throws(()=>bootstrapRiskScenarios(bars,{paths:51}),/100–500/);
 assert.throws(()=>bootstrapRiskScenarios(bars,{seed:0}),/seed/i);
 const constant=Array.from({length:14},(_,i)=>({...bars[0],date:new Date(Date.UTC(2026,0,i+1)).toISOString().slice(0,10),close:100}));
 const flat=evaluateHistoricalRisk(constant);
 assert.equal(flat.sharpe,null);
 assert.equal(flat.sortino,null);
 assert.equal(flat.historicalVarPct,0);
});

test("Bitcoin Core scheduled subsidy uses precise satoshis and BIP42 eras",()=>{
 assert.equal(bitcoinSubsidySats(0),5_000_000_000n);
 assert.equal(bitcoinSubsidySats(209999),5_000_000_000n);
 assert.equal(bitcoinSubsidySats(210000),2_500_000_000n);
 assert.equal(bitcoinSubsidyAtHeight(840000).subsidyBtc,3.125);
 assert.equal(bitcoinSubsidyAtHeight(1050000).subsidyBtc,1.5625);
 assert.equal(bitcoinSubsidyAtHeight(840000).nextHalvingHeight,1050000);
 assert.equal(bitcoinSubsidySats(32*210000),1n);
 assert.equal(bitcoinSubsidySats(33*210000),0n);
 assert.equal(totalTheoreticalScheduledBtc(),20999999.9769);
 const rows=bitcoinEraTable({eras:6});
 assert.equal(rows.length,6);
 assert.equal(rows[1].maxNewBtc,5250000);
 assert.ok(rows[5].maxCumulativeBtc>20000000);
 assert.throws(()=>bitcoinSubsidySats(-1),/Block height/);
 assert.throws(()=>bitcoinEraTable({eras:34}),/2–33/);
 assert.ok(BITCOIN_REFERENCE.url.startsWith("https://github.com/bitcoin/bitcoin/"));
});

test("User issuer citations are checked but never falsely labeled independently verified",()=>{
 const data=validateIssuerProvenance({
  issuer:"Illustration Network",sourceTitle:"Published issuer vesting methodology",
  sourceUrl:"https://example.org/docs/token-schedule",sourceDate:"2026-01-15",
  licenseNote:"Source is publicly readable; separate content reuse rights must be checked."
 });
 assert.equal(data.issuer,"Illustration Network");
 assert.match(data.verification,/NOT independently authenticated/);
 assert.throws(()=>validateIssuerProvenance({...data,sourceUrl:"javascript:alert(1)"}),/HTTPS/);
 assert.throws(()=>validateIssuerProvenance({...data,sourceUrl:"https://name:pass@example.org/docs"}),/HTTPS/);
 assert.throws(()=>validateIssuerProvenance({...data,sourceDate:"2026-02-30"}),/date/i);
 assert.throws(()=>validateIssuerProvenance({...data,licenseNote:"none"}),/16–250/);
});

test("Advanced risk and protocol issuance pages are functional, indexable and bundled",()=>{
 const root="dist/coinmetriq",map=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
 const routes=portfolioRoutes();
 assert.equal(routes.length,14);
 for(const route of ["/portfolio/risk-lab/","/portfolio/issuance-audit/"]){
  assert.ok(routes.includes(route),route);
  assert.ok(map.includes("https://coinmetriq.pages.dev"+route),route);
  const html=fs.readFileSync(path.join(root,route,"index.html"),"utf8");
  assert.ok(html.includes('content="index,follow"'),route);
  assert.ok(html.includes("/assets/cm-portfolio.js"),route);
  assert.match(html,/<h1>/);
 }
 for(const file of ["risk-core.mjs","issuance-core.mjs"])assert.ok(fs.existsSync(path.join(root,"assets",file)));
 const issuance=fs.readFileSync(path.join(root,"portfolio/issuance-audit/index.html"),"utf8");
 assert.ok(issuance.includes("Bitcoin Core GetBlockSubsidy"));
 assert.ok(issuance.includes("BIP42"));
});
