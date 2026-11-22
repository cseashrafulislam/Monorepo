import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import {spawn} from "node:child_process";
import {setTimeout as sleep} from "node:timers/promises";
const root=path.resolve("dist/techorvia");
const chrome=["/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"].find(fs.existsSync);
if(!chrome)throw Error("A headless Chrome/Chromium browser is required for UI QA.");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".mjs":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json;charset=utf-8",".svg":"image/svg+xml"};
const server=http.createServer((req,res)=>{
 try{const pathname=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);const target=path.resolve(root,"."+pathname+(pathname.endsWith("/")?"index.html":""));
 if(!target.startsWith(root+path.sep)&&target!==root)throw Error("Outside root.");
 let content;try{content=fs.readFileSync(target);}catch{res.writeHead(404);res.end("Not found");return;}
 res.writeHead(200,{"Content-Type":mime[path.extname(target)]||"application/octet-stream","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});res.end(content);
 }catch{res.writeHead(400);res.end("Bad request");}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const base="http://127.0.0.1:"+server.address().port;
const profile=fs.mkdtempSync(path.join(os.tmpdir(),"techorvia-smoke-"));
const processChrome=spawn(chrome,["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--remote-allow-origins=*","--remote-debugging-port=0","--user-data-dir="+profile,"about:blank"],{stdio:"ignore"});
let ws,failed=false;
const pending=new Map();let seq=0;
function send(method,params={}){
 const id=++seq;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(Error("Chrome protocol timeout: "+method));}},12000);});
}
const evalJs=async expression=>{
 const data=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
 if(data.exceptionDetails)throw Error("Browser JS: "+data.exceptionDetails.text);
 return data.result?.value;
};
const wait=async(fun,timeout=15000)=>{const start=Date.now();while(Date.now()-start<timeout){const result=await fun();if(result)return result;await sleep(160);}throw Error("Browser page/result timed out.");};
async function navigate(route){
 await send("Page.navigate",{url:base+route});
 await wait(async()=>await evalJs('document.readyState==="complete" && !!document.querySelector("[data-site=techorvia]")'));
}
async function test(route,expression,expectation,timeout=15000){
 await navigate(route);
 await evalJs(expression);
 const found=await wait(async()=>await evalJs('(()=>{const x=document.querySelector("[data-output]");return x?.dataset.state==="success"?JSON.stringify({text:document.querySelector("[data-result]")?.textContent,download:document.querySelector("[data-download]")?.download}):x?.dataset.state==="error"?"ERROR "+document.querySelector("[data-result]")?.textContent:null})()'),timeout);
 if(found.startsWith("ERROR "))throw Error(route+": "+found);
 const data=JSON.parse(found);
 if(!expectation(data))throw Error(route+": wrong browser result: "+found.slice(0,350));
 console.log("PASS browser: "+route+" "+data.text?.slice(0,50));
}
try{
 const marker=path.join(profile,"DevToolsActivePort");
 await wait(()=>fs.existsSync(marker),15000);
 const port=fs.readFileSync(marker,"utf8").split("\n")[0];
 const listing=await (await fetch("http://127.0.0.1:"+port+"/json/list")).json();
 const page=listing.find(x=>x.type==="page");
 if(!page)throw Error("No headless Chrome page target.");
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 ws.onmessage=event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const p=pending.get(message.id);pending.delete(message.id);message.error?p.reject(Error(message.error.message)):p.resolve(message.result);}};
 await send("Page.enable");await send("Runtime.enable");
 await test("/tools/word-counter/","document.querySelector('[data-input]').value='One two three four';document.querySelector('[data-tv-tool]').requestSubmit();",x=>x.text?.includes("4 words"));
 await test("/tools/overtime-calculator/","document.querySelector('[data-tv-tool]').requestSubmit();",x=>x.text?.includes("950"));
 await test("/tools/json-formatter/","document.querySelector('[data-input]').value='{\\\"x\\\":1}';document.querySelector('[data-tv-tool]').requestSubmit();",x=>x.text?.includes('"x": 1'));
 await test("/tools/text-to-word/","document.querySelector('[data-input]').value='Example Word file';document.querySelector('[data-tv-tool]').requestSubmit();",x=>x.download==="converted.docx");
 const docxBase64=await evalJs("(async()=>{const b=await(await fetch(document.querySelector('[data-download]').href)).arrayBuffer();let binary='';for(const n of new Uint8Array(b))binary+=String.fromCharCode(n);return btoa(binary);})()");
 if(docxBase64.length<200)throw Error("DOCX output unexpectedly small.");
 await test("/tools/image-compressor/","(async()=>{const c=document.createElement('canvas');c.width=80;c.height=40;c.getContext('2d').fillRect(0,0,80,40);const blob=await new Promise(r=>c.toBlob(r,'image/png'));const f=new File([blob],'test.png',{type:'image/png'});const dt=new DataTransfer();dt.items.add(f);document.querySelector('[data-files]').files=dt.files;document.querySelector('[data-tv-tool]').requestSubmit();})()",x=>x.download==="converted.webp");

 // Validate actual browser-side PDF and QR libraries, not only generated markup.
 const fakeImage="(async()=>{const c=document.createElement('canvas');c.width=64;c.height=48;c.getContext('2d').fillRect(0,0,64,48);const blob=await new Promise(r=>c.toBlob(r,'image/png'));const f=new File([blob],'sample.png',{type:'image/png'});const dt=new DataTransfer();dt.items.add(f);document.querySelector('[data-files]').files=dt.files;document.querySelector('[data-tv-tool]').requestSubmit();})()";
 await test("/tools/images-to-pdf/",fakeImage,x=>x.download==="images.pdf",45000);
 const pdfBase64=await evalJs("(async()=>{const b=await(await fetch(document.querySelector('[data-download]').href)).arrayBuffer();let binary='';for(const n of new Uint8Array(b))binary+=String.fromCharCode(n);return btoa(binary);})()");
 if(pdfBase64.length<100)throw Error("PDF output unexpectedly small.");
 await test("/tools/pdf-to-png/","(()=>{const bytes=Uint8Array.from(atob('"+pdfBase64+"'),c=>c.charCodeAt(0));const f=new File([bytes],'sample.pdf',{type:'application/pdf'});const dt=new DataTransfer();dt.items.add(f);document.querySelector('[data-files]').files=dt.files;document.querySelector('[data-tv-tool]').requestSubmit();})()",x=>x.download==="page-1.png",45000);
 await test("/tools/word-to-pdf/","(()=>{const bytes=Uint8Array.from(atob('"+docxBase64+"'),c=>c.charCodeAt(0));const f=new File([bytes],'sample.docx',{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});const dt=new DataTransfer();dt.items.add(f);document.querySelector('[data-files]').files=dt.files;document.querySelector('[data-tv-tool]').requestSubmit();})()",x=>x.download==="converted.pdf",45000);
 await test("/tools/image-to-text/","(async()=>{const c=document.createElement('canvas');c.width=900;c.height=160;const x=c.getContext('2d');x.fillStyle='#ffffff';x.fillRect(0,0,900,160);x.font='bold 85px Arial';x.fillStyle='#000000';x.fillText('HELLO WORLD',40,110);const blob=await new Promise(r=>c.toBlob(r,'image/png'));const dt=new DataTransfer();dt.items.add(new File([blob],'ocr.png',{type:'image/png'}));document.querySelector('[data-files]').files=dt.files;document.querySelector('[data-tv-tool]').requestSubmit();})()",x=>x.text?.toUpperCase().includes("HELLO"),90000);
 await test("/tools/qr-code-generator/","document.querySelector('[data-input]').value='https://example.com/';document.querySelector('[data-tv-tool]').requestSubmit();",x=>x.download==="qr-code.png",45000);
 await navigate("/tools/");
 const cards=await evalJs('document.querySelectorAll("[data-tool-card]").length');
 if(cards<100)throw Error("Catalog search lists too few tools.");
 const visible=await evalJs('(()=>{const el=document.querySelector("[data-tool-search]");el.value="overtime";el.dispatchEvent(new Event("input",{bubbles:true}));return [...document.querySelectorAll("[data-tool-card]")].filter(x=>!x.hidden).map(x=>x.textContent.trim());})()');
 if(!visible.some(x=>x.includes("Overtime")))throw Error("Tool finder filter failed.");
 console.log("PASS browser: searchable directory, "+cards+" tools");
}catch(err){failed=true;console.error("Browser QA failed:",err.message);}
finally{
 try{ws?.close();}catch{}
 processChrome.kill("SIGTERM");
 await new Promise(resolve=>server.close(resolve));
 try{fs.rmSync(profile,{recursive:true,force:true});}catch{}
}
if(failed)process.exitCode=1;
