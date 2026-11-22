import {runPure} from "./tv-core.mjs";
import {processFile} from "./tv-files.mjs";
const by=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const smartError=err=>err instanceof Error?err.message:"The browser could not process that input.";
let previousUrl=null;
function resultText(output,text,name){
 const box=by("[data-output]"),pre=by("[data-result]"),copy=by("[data-copy]"),download=by("[data-download]");
 if(!box)return;
 box.dataset.state="success";pre.hidden=false;pre.textContent=text;copy.hidden=!text;
 if(output?.blob){downloadBlob(output.blob,output.name||"converted.bin");}
 else if(name&&text){const blob=new Blob([text],{type:/\.json$/.test(name)?"application/json":"text/plain;charset=utf-8"});downloadBlob(blob,name);}
 else{download.hidden=true;download.removeAttribute("href");}
}
function downloadBlob(blob,name){
 const download=by("[data-download]");
 if(previousUrl)URL.revokeObjectURL(previousUrl);
 previousUrl=URL.createObjectURL(blob);download.href=previousUrl;download.download=name;download.hidden=false;
 download.textContent="Download "+name+" ("+Math.max(.001,blob.size/1024/1024).toFixed(2)+" MB) ↧";
}
function fail(message){
 const box=by("[data-output]"),pre=by("[data-result]");if(!box)return;
 box.dataset.state="error";pre.hidden=false;pre.textContent=message;
 const copy=by("[data-copy]"),dl=by("[data-download]");if(copy)copy.hidden=true;if(dl){dl.hidden=true;dl.removeAttribute("href");}
}
function formValues(form){const out={};for(const f of form.querySelectorAll("[data-field]"))out[f.dataset.field]=f.value;return out;}
const fileFormats=new Set(["pdf","image","office","media","network"]);
async function safeRegex(input,fields){
 if(!window.Worker)throw Error("Regex testing requires Web Worker support.");
 const code='self.onmessage=e=>{try{const {input,pattern,flags}=e.data;const re=new RegExp(pattern,flags);const actual=re.global?re:new RegExp(re.source,re.flags+"g");const matches=[];for(const x of input.matchAll(actual)){matches.push("At "+x.index+": "+JSON.stringify(x[0]));if(matches.length===100)break;}self.postMessage({text:matches.length+" matches (up to 100):\\n"+matches.join("\\n")});}catch(err){self.postMessage({error:err.message});}}';
 const source=URL.createObjectURL(new Blob([code],{type:"text/javascript"}));
 const thread=new Worker(source);
 try{return await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{thread.terminate();reject(Error("Regex took too long. Try a simpler pattern."));},900);
  thread.onmessage=event=>{clearTimeout(timer);event.data.error?reject(Error(event.data.error)):resolve({text:event.data.text});};
  thread.onerror=()=>{clearTimeout(timer);reject(Error("Regex worker failed."));};
  thread.postMessage({input:String(input).slice(0,20000),pattern:String(fields.pattern||"").slice(0,200),flags:String(fields.flags||"g")});
 });}
 finally{thread.terminate();URL.revokeObjectURL(source);}
}

async function runTool(form,event){
 event.preventDefault();
 const op=form.dataset.op,mode=form.dataset.mode;const fields=formValues(form),input=form.querySelector("[data-input]")?.value||"";
 const fileInput=form.querySelector("[data-files]"),files=fileInput?.files||[];
 const button=form.querySelector(".tv-run"),original=button.textContent;
 button.disabled=true;button.textContent="Processing…";const start=performance.now();
 try{
  let output;
  if(fileFormats.has(mode)||op==="file-hash"||["qr","wifi-qr","qr-read"].includes(op))output=await processFile({op,mode,slug:op},files,fields,input);
  else output=op==="regex"?await safeRegex(input,fields):await runPure(op,input,fields);
  if(output.blob){resultText(output,"File ready: "+output.name+".\nProcessed locally in "+((performance.now()-start)/1000).toFixed(2)+" seconds.",output.name);}
  else resultText(output,output.text,output.filename||output.name);
 }catch(err){fail(smartError(err));}
 finally{button.disabled=false;button.textContent=original;}
}
const form=by("[data-tv-tool]");if(form)form.addEventListener("submit",ev=>runTool(form,ev));
const asof=by('input[data-field="asof"][type="date"]');if(asof){const today=new Date();asof.value=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);}
const fileInput=by("[data-files]");
if(fileInput)fileInput.addEventListener("change",()=>{
 const node=by("[data-selected]");if(node)node.textContent=[...fileInput.files].map(x=>x.name+" ("+(x.size/1024/1024).toFixed(2)+" MB)").join(" · ")||"No files selected";
});
const copyButton=by("[data-copy]");if(copyButton)copyButton.addEventListener("click",async()=>{
 const text=by("[data-result]")?.textContent||"";if(!text)return;
 try{await navigator.clipboard.writeText(text);copyButton.textContent="Copied ✓";}
 catch{copyButton.textContent="Clipboard blocked; select and copy text manually.";}
});
function filterTools(input){
 const cards=$$("[data-tool-card]"),query=input.value.trim().toLowerCase(),category=by("[data-category-filter].active")?.dataset.categoryFilter||"all";
 if(!cards.length){if(query)location.href="/tools/?q="+encodeURIComponent(query);return;}
 let count=0;for(const card of cards){const visible=card.dataset.search.includes(query)&&(category==="all"||card.dataset.category===category);card.hidden=!visible;if(visible)count++;}
 const total=by("[data-tool-count]");if(total)total.textContent=count+" tools found";
 const empty=by("[data-empty]");if(empty)empty.hidden=count!==0;
}
for(const search of $$("[data-tool-search]")){
 const cards=$$("[data-tool-card]");
 if(cards.length){search.addEventListener("input",()=>filterTools(search));const params=new URLSearchParams(location.search);if(params.has("q")){search.value=params.get("q").slice(0,150);filterTools(search);}else filterTools(search);}
 else{search.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();filterTools(search);}});}
}
for(const chip of $$("[data-category-filter]"))chip.addEventListener("click",()=>{$$("[data-category-filter]").forEach(x=>x.classList.remove("active"));chip.classList.add("active");const s=by("[data-tool-search]");if(s)filterTools(s);});
addEventListener("keydown",event=>{
 const search=by("[data-tool-search]");
 if(search&&event.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){event.preventDefault();search.focus();}
});
addEventListener("pagehide",()=>{if(previousUrl)URL.revokeObjectURL(previousUrl);});
