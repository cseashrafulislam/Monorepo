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
  const labels=Array.isArray(data.columns)&&data.columns.length===data.rows[0].length?data.columns:data.rows[0].length===4?["Asset","Current value","Target allocation","Proposed adjustment"]:["Asset","Estimated value","Share"];const head=document.createElement("thead"),header=document.createElement("tr");for(const label of labels){const th=document.createElement("th");th.scope="col";th.textContent=label;header.append(th);}head.append(header);table.append(head);
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

function parseFunDatedSeries(source,{label="value",max=50}={}){
 const raw=String(source||"").trim();
 if(!raw)throw Error("Enter a price/value sequence.");
 let rows=[];
 if(!raw.includes("\n")&&!/^\d{4}-\d{2}-\d{2},/.test(raw)){
  const numbers=raw.split(",").map(x=>x.trim());
  if(numbers.some(x=>x===""))throw Error("Empty values are not supported.");
  rows=numbers.map((v,i)=>({date:"Period "+(i+1),value:Number(v)}));
 }else{
  const lines=raw.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  if(lines[0]&&/^(date,price|date,value)$/i.test(lines[0]))lines.shift();
  let prev="";
  rows=lines.map((line,i)=>{
   const pair=line.split(",").map(x=>x.trim());
   if(pair.length!==2)throw Error("Line "+(i+1)+" must have YYYY-MM-DD,"+label+".");
   const date=pair[0],time=Date.parse(date+"T00:00:00Z");
   if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(time)||new Date(time).toISOString().slice(0,10)!==date||prev&&date<=prev)throw Error("Series dates must be valid YYYY-MM-DD and increasing.");
   prev=date;
   return {date,value:Number(pair[1])};
  });
 }
 if(rows.length<2||rows.length>max||rows.some(x=>!Number.isFinite(x.value)||x.value<=0||x.value>1e15))throw Error("Enter 2–"+max+" positive values with consistent dates.");
 return rows;
}
function createFunSvg(box,points,title){
 if(points.length<2)return;
 const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("viewBox","0 0 560 210");svg.setAttribute("role","img");svg.setAttribute("class","cm-fun-svg");svg.setAttribute("aria-label",title);
 const vals=points.map(p=>p.value),min=Math.min(...vals),max=Math.max(...vals),spread=Math.max(max-min,Math.abs(max)*.06,1e-9);
 const scaleY=value=>160-(value-(min-spread*.16))/(spread*1.32)*120;
 const positions=points.map((p,i)=>[28+i*504/(points.length-1),scaleY(p.value)]);
 const create=(tag,attrs,text)=>{
  const el=document.createElementNS(svg.namespaceURI,tag);
  for(const [k,v] of Object.entries(attrs||{}))el.setAttribute(k,String(v));
  if(text)el.textContent=text;svg.append(el);return el;
 };
 create("title",{},title);
 create("path",{d:"M 25 180 L 535 180",stroke:"#527273","stroke-width":1});
 const d=positions.map(([x,y],i)=>(i?"L ":"M ")+x.toFixed(2)+" "+y.toFixed(2)).join(" ");
 create("path",{d,fill:"none",stroke:"#b1f475","stroke-width":4,"stroke-linejoin":"round","stroke-linecap":"round",class:"cm-fun-trail","pathLength":100});
 for(const [i,[x,y]] of positions.entries())if(i===0||i===positions.length-1||i%Math.max(1,Math.floor(positions.length/9))===0){
  create("circle",{cx:x,cy:y,r:4.5,fill:"#69d7c4"});
 }
 create("text",{x:28,y:196,fill:"#adcbc7","font-size":12},points[0].date);
 create("text",{x:535,y:196,"text-anchor":"end",fill:"#adcbc7","font-size":12},points.at(-1).date);
 const wrapper=document.createElement("div");wrapper.className="cm-fun-visual";wrapper.append(svg);box.append(wrapper);
}
function createFunSplit(box,share){
 const container=document.createElement("div");container.className="cm-fun-visual";
 const title=document.createElement("p");title.textContent="Fictional allocation: Coin A "+fmt(share,1)+"%, Coin B "+fmt(100-share,1)+"%";container.append(title);
 const bar=document.createElement("div");bar.className="cm-fun-split";bar.setAttribute("role","img");bar.setAttribute("aria-label",title.textContent);
 const a=document.createElement("span"),b=document.createElement("span");
 a.style.width=share+"%";b.style.width=(100-share)+"%";a.className="cm-fun-part-a";b.className="cm-fun-part-b";bar.append(a,b);container.append(bar);box.append(container);
}

for(const input of document.querySelectorAll("input[data-cm-fun-csv]")){
 input.addEventListener("change",async()=>{
  const file=input.files?.[0];
  if(!file)return;
  const form=input.closest("form"),textarea=form?.querySelector('textarea[name="prices"]');
  if(!textarea)return;
  try{
   if(file.size>150000)throw Error("Choose a CSV smaller than 150 KB for a fun challenge.");
   const raw=await file.text();
   parseFunDatedSeries(raw,{label:"price"});
   textarea.value=raw;textarea.focus();
  }catch(err){const box=form.querySelector(".cm-extra-result");renderError(box,err);}
 });
}
for(const form of document.querySelectorAll("form[data-cm-fun]")){
 const box=form.querySelector(".cm-extra-result");const setResult=connectActions(form,box);
 form.addEventListener("submit",event=>{
  event.preventDefault();setResult(null);
  const v=Object.fromEntries(new FormData(form).entries());
  try{
   let out,visual=null;
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
    case "dca-time-machine":{
     const prices=parseFunDatedSeries(v.prices,{label:"price"});
     const amount=Number(v.amount);
     if(!(amount>0&&amount<=1e12&&Number.isFinite(amount)))throw Error("Enter a positive USD contribution.");
     let units=0;
     const progression=prices.map((point,i)=>{units+=amount/point.value;return {date:point.date,value:units};});
     const spent=prices.length*amount;
     out={headline:"Time Machine average: $"+fmt(spent/units,4),detail:"You contributed $"+fmt(spent)+" over "+prices.length+" user-supplied hypothetical purchases and acquired "+fmt(units,6)+" units. Your sample price schedule is not market evidence."};
     visual=box=>createFunSvg(box,progression,"Accumulated hypothetical token units across the entered dated purchase schedule");
     break;
    }
    case "hodl-rollercoaster":{
     const observations=parseFunDatedSeries(v.values,{label:"portfolio value"});
     let peak=0,maximum=0,recovery=false,peakDate="";
     for(const point of observations){
      if(point.value>=peak){peak=point.value;peakDate=point.date;}
      const decline=(peak-point.value)/peak;
      maximum=Math.max(maximum,decline);
     }
     recovery=observations.at(-1).value>=Math.max(...observations.slice(0,-1).map(x=>x.value));
     out={headline:"Your imaginary rollercoaster dropped "+fmt(maximum*100,2)+"% from a peak",detail:"The line follows "+observations.length+" dated fictional portfolio values. Final value "+(recovery?"reached a new observed high.":"did not regain the earlier observed high.")+" Past patterns cannot predict future returns."};
     visual=box=>createFunSvg(box,observations,"Dated fictional portfolio drawdown, rebound and recovery scenario");
     break;
    }
    case "portfolio-personality":{
     const names={math:["Spreadsheet Owl","You enjoy checking the numbers in a fictional research adventure."],maps:["Curious Chart Fox","You enjoy reading patterns on sample charts and asking new questions."],notes:["Patient Research Turtle","You enjoy writing things down before exploring more options."]};
     if(!Object.prototype.hasOwnProperty.call(names,v.style))throw Error("Choose a playful research activity.");
     const [name,detail]=names[v.style];
     out={headline:"You unlocked: "+name,detail:detail+" Pure entertainment: not a personality assessment or financial recommendation."};break;
    }
    case "coin-split":{
     const share=Number(v.share);
     if(!Number.isFinite(share)||share<0||share>100)throw Error("Coin share must be between 0% and 100%.");
     const other=100-share,hhi=(share/100)**2+(other/100)**2;
     out={headline:fmt(share,1)+"% Coin A / "+fmt(other,1)+"% Coin B",detail:"Example concentration score is "+fmt(hhi,3)+". Equal halves score 0.500; all in one has 1.000. Your result is for a fictional two-asset mix and not portfolio advice."};
     visual=box=>createFunSplit(box,share);break;
    }
    case "mining-monster":{
     const watts=Number(v.watts),hours=Number(v.hours),tariff=Number(v.tariff),gross=Number(v.revenue);
     if(!(watts>0&&watts<=1e7&&hours>0&&hours<=87600&&tariff>=0&&tariff<=1e5&&Number.isFinite(tariff)&&gross>=0&&Number.isFinite(gross)&&gross<=1e12))throw Error("Enter positive watts/hours, nonnegative tariff and hypothetical revenue.");
     const energy=watts*hours/1000,expense=energy*tariff,net=gross-expense;
     out={headline:"Power Goblin ate "+fmt(energy,2)+" kWh!",detail:"Fictional electricity expense $"+fmt(expense)+" versus hypothetical revenue $"+fmt(gross)+", leaving $"+fmt(net)+" before hardware, repairs, network reward changes and taxes."};
     visual=box=>createFunSvg(box,[{date:"Gross USD",value:Math.max(gross,0.01)},{date:"Electricity USD",value:Math.max(expense,0.01)}],"Fictional mining revenue and energy expense comparison (not time series)");
     break;
    }
    case "unlock-surprise":{
     const supply=Number(v.supply),unlock=Number(v.unlock);
     if(!(supply>0&&supply<=1e24&&unlock>=0&&unlock<=1e24&&Number.isFinite(unlock)))throw Error("Enter positive initial supply and a nonnegative unlock quantity.");
     const dilution=unlock/(supply+unlock)*100;
     out={headline:fmt(dilution,2)+"% illustrative share dilution",detail:"A fixed holding becomes a smaller share after the fictional unlock. The chart shows only a two-state supply comparison, not dated market observations or a token price forecast."};
     visual=box=>createFunSvg(box,[{date:"Before",value:supply},{date:"After",value:supply+unlock}],"Fictional circulating supply before and after one illustrative token unlock");
     break;
    }
    case "emoji-decoder":{
     if(!["fee","wallet","token"].includes(v.gas)||!["depth","supply","stake"].includes(v.liquidity)||!["keys","price","bank"].includes(v.wallet))throw Error("Choose vocabulary answers in all three prompts.");
     const correct=(v.gas==="fee"?1:0)+(v.liquidity==="depth"?1:0)+(v.wallet==="keys"?1:0);
     out={headline:correct+" / 3 Crypto Terms Emoji Challenge",detail:"⛽ Gas: network execution/transaction fees (chain rules differ). 💧 Liquidity: availability and depth of actual trading. 🔑 Wallet: management of signing keys and chain interactions, not an asset-price guarantee."};
     break;
    }
    case "scam-bingo":{
     const marked=form.querySelectorAll('input[name="warning"]:checked').length;
     out={headline:marked+" of 3 warning signals identified",detail:"Fictional scenarios: guaranteed high returns, recovery phrase requests and withdrawal unlock fees are warning signals. Never enter recovery phrases or trust this quiz as a complete fraud detector."};break;
    }
    default:throw Error("Unknown game.");
   }
   renderResult(box,out);if(visual)visual(box);setResult(out);
  }catch(error){renderError(box,error);}
 });
}
if(document.querySelector("[data-cm-tool],[data-cm-fun]")){
 const s=document.createElement("p");s.id="cm-action-status";s.className="cm-screenreader-status";s.setAttribute("role","status");s.setAttribute("aria-live","polite");document.body.append(s);
}
