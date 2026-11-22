import {calculateStudio} from "./studio-core.mjs";
/* Accessible client-only CoinMetriq calculators and mini games.
   Never stores or transmits user input. No remote API calls or auto sharing. */
const escapeCsv=(s)=>String(s).replace(/[\r\n]/g," ");
const fmt=(n,d=2)=>Number(n).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
function renderResult(box,data){
 box.replaceChildren();
 const headline=document.createElement("strong");headline.textContent=data.headline;box.append(headline);
 const detail=document.createElement("p");detail.textContent=data.detail;box.append(detail);
 if(data.summary?.length){
  const list=document.createElement("dl");list.className="cm-result-list";
  data.summary.forEach(([label,val])=>{
   const dt=document.createElement("dt");dt.textContent=label;
   const dd=document.createElement("dd");dd.textContent=val;list.append(dt,dd);
  });box.append(list);
 }
 if(data.rows?.length){
  const wrap=document.createElement("div");wrap.className="cm-table-scroll";
  const table=document.createElement("table"),caption=document.createElement("caption");caption.textContent="Calculated holdings";table.append(caption);
  const head=document.createElement("thead");head.innerHTML="<tr><th scope='col'>Asset</th><th scope='col'>Estimated value</th><th scope='col'>Share</th></tr>";table.append(head);
  const tbody=document.createElement("tbody");
  for(const cells of data.rows){const tr=document.createElement("tr");for(const cell of cells){const td=document.createElement("td");td.textContent=cell;tr.append(td);}tbody.append(tr);}table.append(tbody);wrap.append(table);box.append(wrap);
 }
 box.dataset.state="success";
}
function renderError(box,error){
 box.replaceChildren();
 const p=document.createElement("p");p.textContent=error?.message||"Could not calculate. Check input format.";box.append(p);box.dataset.state="error";
}
const makeText=(title,result,url)=>title+"\n"+result.headline+"\n"+result.detail+"\nTry the free tool: "+url+"\nEducational / fictional scenario; not financial advice.";
async function shareResult(title,result,url){
 if(!result)return;
 const text=makeText(title,result,url);
 try{
  if(navigator.share)await navigator.share({title,text,url});
  else if(navigator.clipboard) {await navigator.clipboard.writeText(text);announce("Result copied to clipboard.");}
  else announce("Sharing is unavailable here. Try Copy Result.");
 }catch(error){if(error?.name!=="AbortError")announce("Sharing failed. You can copy the result instead.");}
}
function announce(msg){const el=document.getElementById("cm-action-status")||document.querySelector("[data-cm-action-status]");if(el)el.textContent=msg;}
async function copyResult(title,result,url){
 if(!result)return;
 const text=makeText(title,result,url);
 try{if(!navigator.clipboard)throw Error();await navigator.clipboard.writeText(text);announce("Result copied.");}
 catch{const node=document.createElement("textarea");node.value=text;node.style.position="fixed";node.style.left="-9999px";document.body.append(node);node.select();const success=document.execCommand?.("copy");node.remove();announce(success?"Result copied.":"Clipboard blocked. Use the Share option.");}
}
function downloadCard(title,result,url){
 if(!result)return;
 const canvas=document.createElement("canvas");canvas.width=1200;canvas.height=630;
 const ctx=canvas.getContext("2d");if(!ctx){announce("Your browser cannot create a PNG card.");return;}
 ctx.fillStyle="#071723";ctx.fillRect(0,0,1200,630);
 ctx.fillStyle="#bbf570";ctx.fillRect(55,58,11,50);
 ctx.fillStyle="#a0c1bc";ctx.font="bold 26px sans-serif";ctx.fillText("◈ COINMETRIQ · BROWSER RESEARCH",92,94);
 function wrap(value,y,font,color,maxWidth=1050,step=54){
  ctx.font=font;ctx.fillStyle=color;
  const words=String(value).split(/\s+/);let line="",rows=0;
  for(const w of words){const attempt=line?line+" "+w:w;if(ctx.measureText(attempt).width>maxWidth&&line){ctx.fillText(line,78,y+rows*step);rows++;line=w;if(rows>=3)break;}else line=attempt;}
  if(rows<3&&line)ctx.fillText(line,78,y+rows*step);return y+(rows+1)*step;
 }
 wrap(title,180,"bold 44px sans-serif","#f6fff6",1050,54);
 wrap(result.headline,345,"bold 47px sans-serif","#bbf570",1050,59);
 ctx.fillStyle="#8bacb0";ctx.font="24px sans-serif";ctx.fillText("Fictional / educational scenario · Not financial advice",78,515);
 ctx.font="20px sans-serif";ctx.fillText(url.slice(0,90),78,572);
 canvas.toBlob(blob=>{
  if(!blob){announce("PNG export failed.");return;}
  const href=URL.createObjectURL(blob);
  const a=document.createElement("a");a.download="coinmetriq-result.png";a.href=href;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),1500);
  announce("Result card saved.");
 },"image/png");
}
function connectActions(form,box){
 let latest=null;
 const title=form.querySelector("h2")?.textContent||document.querySelector("h1")?.textContent||"CoinMetriq Result";
 const url=location.origin+location.pathname;
 const buttons={share:form.querySelector("[data-cm-share]"),copy:form.querySelector("[data-cm-copy]"),download:form.querySelector("[data-cm-download]")};
 const setResult=data=>{latest=data;for(const b of Object.values(buttons))if(b)b.disabled=!data;};
 buttons.share?.addEventListener("click",()=>shareResult(title,latest,url));
 buttons.copy?.addEventListener("click",()=>copyResult(title,latest,url));
 buttons.download?.addEventListener("click",()=>downloadCard(title,latest,url));
 return setResult;
}
for(const form of document.querySelectorAll("form[data-cm-tool]")){
 const box=form.querySelector(".cm-extra-result");const setResult=connectActions(form,box);
 form.addEventListener("submit",event=>{
  event.preventDefault();setResult(null);
  const input=Object.fromEntries(new FormData(form).entries());
  try{const out=calculateStudio(form.dataset.cmTool,input);renderResult(box,out);setResult(out);}
  catch(error){renderError(box,error);}
 });
}
for(const form of document.querySelectorAll("form[data-cm-fun]")){
 const box=form.querySelector(".cm-extra-result");const setResult=connectActions(form,box);
 form.addEventListener("submit",event=>{
  event.preventDefault();setResult(null);
  const v=Object.fromEntries(new FormData(form).entries());
  try{
   let out;
   switch(form.dataset.cmFun){
    case "fee-goblin":{
     const amount=Number(v.amount),count=Number(v.count),fee=Number(v.fee);
     if(!(amount>0&&amount<=1e10&&Number.isInteger(count)&&count>0&&count<=100000&&fee>=0&&fee<=100&&Number.isFinite(fee)))throw Error("Enter valid positive trade values and a 0–100% fee.");
     const monthly=amount*count*fee/100;
     out={headline:"The Fee Goblin ate $"+fmt(monthly)+" this month!",detail:"At the hypothetical rate, 12 months would cost $"+fmt(monthly*12)+" if the same trades repeat. Does not include price moves, spread or taxes."};break;
    }
    case "moon-math":{
     const k=Number(v.multiple);
     if(!(k>1&&k<=1e6&&Number.isFinite(k)))throw Error("Enter a multiplier above 1 and at most 1,000,000.");
     out={headline:fmt((k-1)*100,1)+"% return needed for "+fmt(k,1)+"×",detail:"That is "+fmt(Math.log2(k),2)+" successive doublings. Pure percentage arithmetic, not a forecast or endorsement of a target."};break;
    }
    case "scam-bingo":{
     const marked=form.querySelectorAll('input[name="warning"]:checked').length;
     out={headline:marked+" of 3 warning signals identified",detail:"Fictional scenarios: guaranteed high returns, recovery phrase requests and withdrawal unlock fees are warning signals. Never enter recovery phrases or trust this quiz as a complete fraud detector."};break;
    }
    default:throw Error("Unknown game.");
   }
   renderResult(box,out);setResult(out);
  }catch(error){renderError(box,error);}
 });
}
if(document.querySelector("[data-cm-tool],[data-cm-fun]")){
 const s=document.createElement("p");s.id="cm-action-status";s.className="cm-screenreader-status";s.setAttribute("role","status");s.setAttribute("aria-live","polite");document.body.append(s);
}
