import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {tools,calculateStudio} from "../sites/coinmetriq/studio-core.mjs";
import {extraRoutes} from "../sites/coinmetriq/extra.mjs";
import {calculate} from "../packages/site-core/calculator.js";
const root="dist/coinmetriq";
const read=(route)=>fs.readFileSync(path.join(root,route,"index.html"),"utf8");

test("CoinMetriq ten unique private research calculators",()=>{
 assert.equal(tools.length,10);
 assert.equal(new Set(tools.map(x=>x.slug)).size,10);
 assert.ok(tools.every(t=>t.title&&t.short&&t.formula));
});
test("Crypto fees include both sides and handle small losing trades",()=>{
 const x=calculateStudio("trade-profit",{buy:100,sell:101,qty:5,buyFee:.5,sellFee:.5});
 assert.match(x.headline,/loss/);assert.ok(x.summary.some(a=>a[1].includes("502.50")));
 assert.throws(()=>calculateStudio("trade-profit",{buy:1,sell:1,qty:1,buyFee:101,sellFee:0}),/Fee percentages/);
});
test("Weighted entry and hypothetical DCA use quantities and contributions",()=>{
 const a=calculateStudio("average-entry",{fills:"100,2,1\n120,3,2\n90,1,0.5"});
 assert.match(a.headline,/108\.916/);assert.deepEqual(a.summary.find(x=>x[0]==="Total units")[1],"6.000000");
 const b=calculateStudio("dca-simulator",{purchases:"100,100\n80,100\n120,100\n90,150",finalPrice:115});
 assert.match(b.headline,/96\.25/);
 assert.throws(()=>calculateStudio("dca-simulator",{purchases:"0,100",finalPrice:5}),/price/);
});
test("Local portfolio allocation, loss and risk scenarios",()=>{
 const a=calculateStudio("portfolio-allocation",{holdings:"BTC,0.04,80000\nETH,1.2,3000\nSOL,15,140"});
 assert.match(a.headline,/8,900.00/);assert.equal(a.rows.length,3);
 assert.throws(()=>calculateStudio("portfolio-allocation",{holdings:"BTC,1,20\nbtc,2,22"}),/Duplicate/);
 const d=calculateStudio("drawdown",{series:"2026-01-01,1000\n2026-02-01,1400\n2026-03-01,980\n2026-04-01,1200"});
 assert.match(d.headline,/30.00%/);
 assert.throws(()=>calculateStudio("drawdown",{series:"2026-02-01,1000\n2026-01-01,900"}),/increasing order/);
 const r=calculateStudio("risk-position-size",{account:10000,riskPct:1,entry:100,stop:95});
 assert.match(r.headline,/20.000000 units/);
});
test("Staking, mining, impermanent loss, and dilution are finite and caveated",()=>{
 const a=calculateStudio("staking-apy",{principal:100,apr:8,periods:12,years:2});
 assert.match(a.headline,/hypothetical tokens/);
 const m=calculateStudio("mining-cost",{watts:1200,hours:720,tariff:.12,gross:140,other:15});
 assert.match(m.headline,/21.32/);
 const il=calculateStudio("impermanent-loss",{ratio:2});
 assert.match(il.headline,/-5\.719/);
 const dil=calculateStudio("token-unlock",{supply:1e7,unlock:2.5e6});
 assert.match(dil.headline,/20\.00%/);
 assert.throws(()=>calculateStudio("impermanent-loss",{ratio:0}),/ratio/);
});
test("No live API, no account gate and all CoinMetriq pages indexed deliberately",()=>{
 const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
 assert.match(home,/Research Studio/);
 assert.match(home,/Crypto Chaos Lab|Fun Lab/);
 for(const route of extraRoutes()){
  const html=read(route);
  assert.match(html,/<link rel="canonical"/);
  assert.match(html,/content="index,follow"/);
  assert.match(html,/\/assets\/cm-studio\.js/);
  assert.match(html,/\/assets\/cm-studio\.css/);
  assert.match(html,/<h1>/);
 }
 const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
 for(const route of extraRoutes())assert.ok(sitemap.includes("https://coinmetriq.pages.dev"+route),"Sitemap "+route);
 assert.ok(fs.existsSync(path.join(root,"assets","studio-core.mjs")));
 assert.ok(fs.existsSync(path.join(root,"assets","cm-studio.js")));
 assert.ok(fs.existsSync(path.join(root,"assets","cm-studio.css")));
 for(const id of ["earthviora","solarqentra","moneyavora"]){
  assert.ok(!fs.existsSync(path.join("dist",id,"studio","index.html")),"No cloned product "+id);
 }
});
test("Original market-cap calculator and topic pages preserved",()=>{
 assert.match(calculate("marketcap",{price:.25,supply:10000000}).headline,/2,500,000/);
 assert.ok(fs.existsSync(path.join(root,"tools","token-market-cap","index.html")));
 const sample=fs.readFileSync(path.join(root,"topics","crypto-glossary","index.html"),"utf8");
 assert.match(sample,/noindex,follow/);
});
