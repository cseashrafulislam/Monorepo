/* Actual headless-Chrome QA of CoinMetriq static Pages and JS.
 * Requires chrome/chromium, Node >=22; no Playwright or paid services.
 */
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import {spawn} from "node:child_process";
import {setTimeout as sleep} from "node:timers/promises";
const root=path.resolve("dist/coinmetriq");
const chrome=["/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"].find(fs.existsSync);
if(!chrome)throw Error("Headless Chrome is required for CoinMetriq browser QA.");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".mjs":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".svg":"image/svg+xml",".json":"application/json;charset=utf-8"};
const server=http.createServer((req,res)=>{
 try{
  const url=new URL(req.url,"http://127.0.0.1").pathname;
  const target=path.resolve(root,"."+decodeURIComponent(url)+(url.endsWith("/")?"index.html":""));
  if(!target.startsWith(root+path.sep)){res.writeHead(400).end("Outside site");return;}
  res.writeHead(200,{"Content-Type":mime[path.extname(target)]||"application/octet-stream","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
  res.end(fs.readFileSync(target));
 }catch{res.writeHead(404).end("Not found");}
});
await new Promise(done=>server.listen(0,"127.0.0.1",done));
const origin="http://127.0.0.1:"+server.address().port;
const profile=fs.mkdtempSync(path.join(os.tmpdir(),"coinmetriq-browser-"));
const proc=spawn(chrome,["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--remote-allow-origins=*","--remote-debugging-port=0","--user-data-dir="+profile,"about:blank"],{stdio:"ignore"});
let ws=null,seq=0,failed=null;
const pending=new Map(),browserErrors=[];
function send(method,params={}){
 const id=++seq;
 return new Promise((resolve,reject)=>{
  pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));
  setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error("Browser protocol timeout "+method));}},15000);
 });
}
async function evaluate(expression){
 const r=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
 if(r.exceptionDetails)throw Error("Browser JS failed: "+r.exceptionDetails.text+" "+JSON.stringify(r.exceptionDetails.exception?.description||""));
 return r.result?.value;
}
async function until(fn,limit=18000){
 const time=Date.now();while(Date.now()-time<limit){const found=await fn();if(found)return found;await sleep(130);}
 throw Error("Browser interaction timed out.");
}
async function open(route){
 await send("Page.navigate",{url:origin+route});
 await until(()=>evaluate('document.readyState==="complete"&&!!document.querySelector("[data-site=coinmetriq]")'));
}
async function action(route,script,selector,expected){
 await open(route);
 await evaluate(script);
 const state=await until(()=>evaluate('(()=>{const el=document.querySelector('+JSON.stringify(selector)+');return el?.dataset.state==="success"?JSON.stringify({state:"success",text:el.textContent}):el?.dataset.state==="error"?JSON.stringify({state:"error",text:el.textContent}):null})()'));
 const parsed=JSON.parse(state);
 if(parsed.state!=="success"||!parsed.text.includes(expected))throw Error(route+": unexpected UI result "+parsed.text.slice(0,400));
 console.log("PASS browser "+route+" "+expected);
}
try{
 await until(()=>fs.existsSync(path.join(profile,"DevToolsActivePort")));
 const port=fs.readFileSync(path.join(profile,"DevToolsActivePort"),"utf8").split("\n")[0];
 const listings=await (await fetch("http://127.0.0.1:"+port+"/json/list")).json();
 const target=listings.find(x=>x.type==="page");if(!target)throw Error("Chrome page target missing.");
 ws=new WebSocket(target.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 ws.onmessage=e=>{
  const msg=JSON.parse(e.data);
  if(msg.method==="Runtime.exceptionThrown")browserErrors.push(msg.params?.exceptionDetails?.exception?.description||"Unknown browser exception");
  if(msg.id&&pending.has(msg.id)){const item=pending.get(msg.id);pending.delete(msg.id);msg.error?item.reject(Error(msg.error.message)):item.resolve(msg.result);}
 };
 await send("Page.enable");await send("Runtime.enable");
 await action("/studio/trade-profit/","document.querySelector('[data-cm-tool]').requestSubmit()",".cm-extra-result","94.5000");
 await action("/studio/portfolio-stress-test/","document.querySelector('[data-cm-tool]').requestSubmit()",".cm-extra-result","-2,160.00");
 await open("/fun/");
 const games=await evaluate('document.querySelectorAll("form[data-cm-fun]").length');
 if(games!==10)throw Error("Expected 10 fun forms, got "+games);
 await evaluate('for(const f of document.querySelectorAll("form[data-cm-fun]"))f.requestSubmit()');
 const gameOk=await until(()=>evaluate('[...document.querySelectorAll("form[data-cm-fun]")].every(f=>f.querySelector(".cm-extra-result")?.dataset.state==="success")'));
 if(!gameOk)throw Error("At least one original mini game failed.");
 const funVisuals=await evaluate('document.querySelectorAll("form[data-cm-fun] svg.cm-fun-svg").length');
 const splitBar=await evaluate('!!document.querySelector("form[data-cm-fun=coin-split] .cm-fun-split")');
 const vocabulary=await evaluate('document.querySelector("form[data-cm-fun=emoji-decoder] .cm-extra-result strong")?.textContent');
 if(funVisuals<4||!splitBar||!vocabulary?.includes("3 / 3"))throw Error("Fun visual or three-term quiz missing.");
 console.log("PASS browser /fun/ 10/10 games");
 await action("/portfolio/journal/","document.querySelector('[data-cm-portfolio=journal]').requestSubmit()","[data-cm-portfolio-output]","3 validated trades");
 await action("/portfolio/cost-basis/","document.querySelector('[data-cm-portfolio=costbasis]').requestSubmit()","[data-cm-portfolio-output]","realized P&L");
 const chartCheck=await evaluate('!!document.querySelector(".cm-portfolio-heatmap meter")');
 if(!chartCheck)throw Error("Allocation heatmap missing.");
 await action("/portfolio/market-data/","document.querySelector('[data-cm-portfolio=market]').requestSubmit()","[data-cm-portfolio-output]","price change");
 const chart=await evaluate('!!document.querySelector("svg.cm-local-chart")');
 if(!chart)throw Error("Historical chart absent.");
 await action("/portfolio/backtest/","document.querySelector('[data-cm-backtest-sample]').click();document.querySelector('[data-cm-portfolio=backtest]').requestSubmit()","[data-cm-portfolio-output]","backtest return");
 await action("/portfolio/performance/","document.querySelector('[data-cm-portfolio=performance]').requestSubmit()","[data-cm-portfolio-output]","time-weighted return");
 const recovery=await evaluate('document.querySelectorAll(".cm-portfolio-rolling svg").length');
 if(recovery<1)throw Error("Performance drawdown and recovery chart was not generated.");
 await action("/portfolio/compare/","document.querySelector('[data-cm-portfolio=compare]').requestSubmit()","[data-cm-portfolio-output]","return correlation");
 const rolling=await evaluate('!!document.querySelector(".cm-portfolio-rolling svg")');
 if(!rolling)throw Error("Rolling correlation chart missing.");
 await action("/portfolio/network-fees/","document.querySelector('[data-cm-portfolio=fees]').requestSubmit()","[data-cm-portfolio-output]","700.000 satoshis");
 await action("/portfolio/token-emission/","document.querySelector(\'[data-cm-portfolio=emission]\').requestSubmit()","[data-cm-portfolio-output]","supply change");
 await open("/portfolio/backups/");
 const cryptoResult=await evaluate('(async()=>{const m=await import("/assets/backup-core.mjs");const rows=[{id:"Q1",date:"2026-01-01",asset:"BTC",side:"BUY",qty:.1,price:1000,fee:1,tag:"demo"}];const b=await m.encryptJournal(rows,"long test password 123");const restored=await m.decryptJournal(b,"long test password 123");let failed=false;try{await m.decryptJournal(b,"another long password 123")}catch{failed=true}return {rows:restored.length,wrongPasswordRejected:failed,cipher:b.cipher}})()');
 if(cryptoResult.rows!==1||!cryptoResult.wrongPasswordRejected||cryptoResult.cipher!=="AES-256-GCM")throw Error("Browser AES-GCM roundtrip invalid "+JSON.stringify(cryptoResult));
 console.log("PASS browser /portfolio/backups/ encrypted backup and rejection");
 await open("/articles/");
 const cats=await evaluate('document.querySelectorAll(".cm-guide-category").length');
 if(cats!==4)throw Error("Expected 4 article categories, got "+cats);
 await open("/articles/fifo-versus-weighted-average-crypto-cost-basis/");
 const article=await evaluate('document.querySelectorAll("script[type=\\"application/ld+json\\"]").length');
 if(!article)throw Error("Article schema missing");
 const faq=await evaluate('document.querySelectorAll("details.cm-guide-faq").length');
 if(faq<2)throw Error("Article FAQ accordion missing.");
 if(browserErrors.length)throw Error("Browser runtime exceptions: "+JSON.stringify(browserErrors.slice(0,6)));
 console.log("CoinMetriq browser smoke PASS — interactive calculator, 10 games, ledger, analytics, encryption, SEO");
}catch(error){failed=error;console.error("CoinMetriq browser QA FAILED:",error?.message);}
finally{
 try{ws?.close()}catch{}
 proc.kill("SIGTERM");
 await new Promise(done=>server.close(done));
 try{fs.rmSync(profile,{recursive:true,force:true})}catch{}
}
if(failed)process.exitCode=1;
