import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import {spawn} from "node:child_process";
import {setTimeout as wait} from "node:timers/promises";
const root=path.resolve("dist/worldorixa");
const chrome=["/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"].find(fs.existsSync);
if(!chrome)throw Error("Headless Chrome is required for country edition QA.");
const content={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".svg":"image/svg+xml"};
const server=http.createServer((req,res)=>{
 const relative=new URL(req.url,"http://localhost").pathname;
 const file=path.resolve(root,"."+relative+(relative.endsWith("/")?"index.html":""));
 if(!file.startsWith(root+path.sep)){res.writeHead(400).end();return;}
 try{res.writeHead(200,{"Content-Type":content[path.extname(file)]||"application/octet-stream"});res.end(fs.readFileSync(file));}
 catch{res.writeHead(404).end("Not found");}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const port=server.address().port,origin="http://127.0.0.1:"+port;
const profile=fs.mkdtempSync(path.join(os.tmpdir(),"worldorixa-edition-"));
const proc=spawn(chrome,["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--remote-allow-origins=*","--remote-debugging-port=0","--user-data-dir="+profile,"about:blank"],{stdio:"ignore"});
let ws=null,seq=0;const pending=new Map();
function send(method,params={}){
 const id=++seq;
 return new Promise((resolve,reject)=>{
  pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));
  setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error("Chrome timed out: "+method));}},12000);
 });
}
async function evalJs(expression){
 const result=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
 if(result.exceptionDetails)throw Error("Browser exception: "+result.exceptionDetails.text);
 return result.result?.value;
}
async function until(fn,timeout=15000){
 const began=Date.now();while(Date.now()-began<timeout){const value=await fn();if(value)return value;await wait(100);}
 throw Error("Browser did not reach expected state.");
}
async function go(pathname){
 await send("Page.navigate",{url:origin+pathname});
 await until(()=>evalJs('document.readyState==="complete"&&!!document.querySelector("[data-site=worldorixa]")'));
 await until(()=>evalJs('!!document.querySelector("#edition-country")'));
}
let failure=null;
try{
 await until(()=>fs.existsSync(path.join(profile,"DevToolsActivePort")));
 const targetPort=fs.readFileSync(path.join(profile,"DevToolsActivePort"),"utf8").split("\n")[0];
 const targets=await (await fetch("http://127.0.0.1:"+targetPort+"/json/list")).json();
 const page=targets.find(t=>t.type==="page");if(!page)throw Error("No Chrome page.");
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 ws.onmessage=e=>{const data=JSON.parse(e.data);if(data.id&&pending.has(data.id)){const p=pending.get(data.id);pending.delete(data.id);data.error?p.reject(Error(data.error.message)):p.resolve(data.result);}};
 await send("Page.enable");await send("Runtime.enable");
 await go("/");
 const choices=await evalJs('document.querySelectorAll("#edition-country option").length');
 if(choices!==11)throw Error("Expected Worldwide plus ten country options.");
 await evalJs('(()=>{const x=document.querySelector("#edition-country");x.value="BD";x.dispatchEvent(new Event("change",{bubbles:true}));})()');
 const selected=await evalJs('document.body.dataset.country');
 if(selected!=="BD")throw Error("Country change did not apply.");
 const visible=await evalJs('(()=>{const rows=[...document.querySelectorAll("[data-country-preview] [data-edition-story]")].filter(x=>!x.hidden);return {count:rows.length,other:rows.filter(x=>!x.dataset.editionStory.split(",").includes("BD")).length};})()');
 if(!visible.count||visible.other||visible.count>8)throw Error("Country homepage news filtering failed: "+JSON.stringify(visible));
 console.log("PASS: Bangladesh edition homepage shows "+visible.count+" Bangladesh headlines, no unrelated geography.");
 await go("/news/");
 const persisted=await evalJs('document.querySelector("#edition-country").value');
 const localNews=await evalJs('[...document.querySelectorAll("[data-edition-story]")].filter(x=>!x.hidden).every(x=>x.dataset.editionStory.split(",").includes("BD"))');
 if(persisted!=="BD"||!localNews)throw Error("Country choice not persisted or incorrect news filtering.");
 console.log("PASS: Bangladesh selection persists across page navigation and full News page.");
 await evalJs('(()=>{const x=document.querySelector("#edition-country");x.value="JP";x.dispatchEvent(new Event("change",{bubbles:true}));})()');
 const otherVisible=await evalJs('[...document.querySelectorAll("[data-edition-story]")].filter(x=>!x.hidden).every(x=>x.dataset.editionStory.split(",").includes("JP"))');
 if(!otherVisible)throw Error("Cross-country headlines appeared for Japan.");
 console.log("PASS: Switching to Japan excludes other countries.");
}catch(e){failure=e;console.error("Country browser QA failed:",e.message);}
finally{
 try{ws?.close();}catch{}
 proc.kill("SIGTERM");await new Promise(resolve=>server.close(resolve));
 try{fs.rmSync(profile,{recursive:true,force:true});}catch{}
}
if(failure)process.exitCode=1;
