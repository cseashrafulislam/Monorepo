import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {parseCsv,parseTradesCsv,calculateCostBasis,calculateTwr,calculateXirr,SAMPLE_TRADES_CSV,exportTradesCsv,DEFAULT_TRADE_MAPPING,isoDay} from "../sites/coinmetriq/ledger-core.mjs";
import {parseOhlcvCsv,backtestSma,summarizeOhlcv,parsePairsCsv,analyzeCorrelation,comparePortfolios,recoveryStats} from "../sites/coinmetriq/market-core.mjs";
import {encryptJournal,decryptJournal} from "../sites/coinmetriq/backup-core.mjs";
import {portfolioRoutes} from "../sites/coinmetriq/portfolio-pages.mjs";
const root="dist/coinmetriq";
const page=r=>fs.readFileSync(path.join(root,r.slice(1),"index.html"),"utf8");
test("RFC 4180 CSV parser quotes, rejects malformed data and dangerous sizes",()=>{
 assert.deepEqual(parseCsv('name,note\nBTC,"a, ""quoted"" phrase"'),[["name","note"],["BTC",'a, "quoted" phrase']]);
 assert.deepEqual(parseCsv('a,b\r\n1,2\r\n'),[["a","b"],["1","2"]]);
 assert.throws(()=>parseCsv('a,b\n"x,y'),/Unclosed/);
 assert.throws(()=>parseCsv('x'.repeat(1500001)),/smaller/);
 assert.throws(()=>isoDay("2026-02-30"),/Invalid/);
});
test("Trade CSV import mapping, export reimport, strategy tags and safety",()=>{
 const original=parseTradesCsv(SAMPLE_TRADES_CSV);
 assert.equal(original.length,5);
 assert.equal(original[0].asset,"BTC");
 assert.equal(original[0].tag,"Long-term");
 const exported=exportTradesCsv(original);
 assert.match(exported,/date,asset,side,quantity,price,fee,tag,trade_id,note/);
 const copied=parseTradesCsv(exported);
 assert.deepEqual(copied.map(x=>x.id),original.map(x=>x.id));
 assert.deepEqual(copied.map(x=>x.qty),original.map(x=>x.qty));
 const other="when,ticker,action,units,rate,commission\n2026-02-02,btc,buy,1,100,0";
 const mapping={...DEFAULT_TRADE_MAPPING,date:"when",asset:"ticker",side:"action",qty:"units",price:"rate",fee:"commission"};
 assert.equal(parseTradesCsv(other,mapping)[0].asset,"BTC");
 assert.throws(()=>parseTradesCsv("date,asset,side,quantity,price\n2026-01-01,BTC,BUY,1,0"),/Invalid price/);
});
test("FIFO and weighted-average cost include fees and prevent short inventory",()=>{
 const t=parseTradesCsv(SAMPLE_TRADES_CSV),fifo=calculateCostBasis(t,"FIFO"),wac=calculateCostBasis(t,"WAC");
 assert.equal(fifo.assetCount,2);
 assert.ok(Math.abs(fifo.realized-494.8)<1e-6);
 assert.ok(Math.abs(wac.realized-419.75)<1e-6);
 assert.equal(fifo.fees,11);
 assert.ok(Math.abs(fifo.positions.find(x=>x.asset==="BTC").qty-.06)<1e-9);
 assert.throws(()=>calculateCostBasis(parseTradesCsv("date,asset,side,quantity,price\n2026-01-01,BTC,SELL,1,100")),/Cannot sell/);
 assert.throws(()=>calculateCostBasis(t,"LIFO"),/FIFO or WAC/);
});
test("Dated XIRR and end-of-period flow-adjusted TWR",()=>{
 const x=calculateXirr([{date:"2026-01-01",value:-1000},{date:"2027-01-01",value:1100}]);
 assert.ok(Math.abs(x-.1)<1e-8);
 const twr=calculateTwr([{date:"2026-01-01",value:1000,flow:0},{date:"2026-02-01",value:1150,flow:100},{date:"2026-03-01",value:1200,flow:0}]);
 assert.ok(Math.abs(twr.totalReturn-(1.05*1200/1150-1))<1e-9);
 assert.equal(twr.curve.length,3);
 assert.throws(()=>calculateXirr([{date:"2026-01-01",value:-1000},{date:"2027-01-01",value:2000},{date:"2028-01-01",value:-500}]),/multiple|Multiple/i);
 assert.throws(()=>calculateTwr([{date:"2026-01-01",value:1000,flow:100},{date:"2026-02-01",value:1050,flow:0}]),/Opening/);
});
test("OHLCV input validation and chart stats are deterministic",()=>{
 const raw="date,open,high,low,close,volume\n2026-01-01,10,12,9,11,100\n2026-01-02,11,14,11,13,150\n2026-01-03,13,15,12,14,200";
 const bars=parseOhlcvCsv(raw);assert.equal(bars.length,3);
 assert.equal(summarizeOhlcv(bars).high,15);
 assert.throws(()=>parseOhlcvCsv(raw.replace("10,12,9,11","10,10,9,11")),/high\/low/);
 assert.throws(()=>parseOhlcvCsv(raw.replace("2026-01-03","2026-01-02")),/increasing/);
});
test("SMA backtest signals computed at prior close and execute next open",()=>{
 const closes=[10,11,12,13,14,12,9,8,10,12];
 const bars=closes.map((close,i)=>({date:new Date(Date.UTC(2026,0,i+1)).toISOString().slice(0,10),open:i?closes[i-1]:close,high:Math.max(close,i?closes[i-1]:close)+1,low:Math.min(close,i?closes[i-1]:close)-1,close,volume:100}));
 const x=backtestSma(bars,{initial:1000,fast:2,slow:3,feePct:0.1});
 assert.equal(x.equity.length,closes.length);
 assert.equal(x.transactions[0].date,"2026-01-04");
 assert.ok(Number.isFinite(x.finalValue));
 assert.ok(x.totalFees>0);
 assert.throws(()=>backtestSma(bars,{fast:20,slow:5}),/fast < slow/);
});
test("Paired return correlation, comparability and recovery stats",()=>{
 const pair=parsePairsCsv("date,a,b\n2026-01-01,10,20\n2026-01-02,11,21\n2026-01-03,10,20\n2026-01-04,12,24\n2026-01-05,13,26");
 const a=analyzeCorrelation(pair,{window:3});assert.ok(a.correlation>0.9);
 assert.equal(a.rolling.length,4);
 const cmp=comparePortfolios([{date:"2026-01-01",value:100},{date:"2026-02-01",value:120}],[{date:"2026-01-01",value:200},{date:"2026-02-01",value:260}]);
 assert.equal(cmp.portfolioA.at(-1).value,120);
 assert.equal(cmp.portfolioB.at(-1).value,130);
 const recovery=recoveryStats([{date:"2026-01-01",value:100},{date:"2026-02-01",value:80},{date:"2026-03-01",value:110}]);
 assert.ok(Math.abs(recovery.maxDrawdown-.2)<1e-12);assert.equal(recovery.recoveredDate,"2026-03-01");
});
test("AES-GCM encrypted backup restores, rejects tampering and wrong password",async()=>{
 const trades=parseTradesCsv(SAMPLE_TRADES_CSV);
 const encoded=await encryptJournal(trades,"a long test passphrase 123");
 assert.equal(encoded.cipher,"AES-256-GCM");
 assert.ok(!JSON.stringify(encoded).includes("Long-term"));
 const restored=await decryptJournal(encoded,"a long test passphrase 123");
 assert.equal(restored.length,trades.length);
 await assert.rejects(decryptJournal(encoded,"an incorrect password 123"),/passphrase|corrupted/i);
 const broken={...encoded,payload:encoded.payload.slice(0,-4)+"AAAA"};
 await assert.rejects(decryptJournal(broken,"a long test passphrase 123"),/corrupted|invalid/i);
});
test("Eleven indexable working portfolio pages and original routes coexist",()=>{
 const routes=portfolioRoutes();assert.equal(routes.length,11);
 const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
 for(const route of routes){
  const html=page(route);
  assert.match(html,/<h1>/);
  assert.ok(html.includes('rel="canonical" href="https://coinmetriq.pages.dev'+route+'"'),route);
  assert.ok(sitemap.includes("https://coinmetriq.pages.dev"+route),route);
  assert.ok(html.includes('content="index,follow"'));
  assert.ok(html.includes("/assets/cm-portfolio.js"));
  assert.ok(html.includes("/assets/cm-portfolio.css"));
 }
 for(const file of ["ledger-core.mjs","market-core.mjs","backup-core.mjs","cm-portfolio.js","cm-portfolio.css"]){
  assert.ok(fs.existsSync(path.join(root,"assets",file)),file);
 }
 const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
 assert.ok(home.includes('href="/portfolio/"'));
 const old=page("/tools/token-market-cap/");
 assert.ok(old.includes("Token market cap"));
 const topic=page("/topics/crypto-glossary/");
 assert.ok(topic.includes('content="noindex,follow"'));
});
