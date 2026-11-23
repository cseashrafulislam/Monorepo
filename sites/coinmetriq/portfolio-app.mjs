/*
 * CoinMetriq browser-only portfolio workbench.
 * No remote APIs, tracking or wallet access. Files stay on this device.
 */
import {parseCsv,parseTradesCsv,normalizeTrades,calculateCostBasis,calculateTwr,calculateXirr,exportTradesCsv,toCsv,SAMPLE_TRADES_CSV,isoDay} from "./ledger-core.mjs";
import {encryptJournal,decryptJournal} from "./backup-core.mjs";
import {parseOhlcvCsv,summarizeOhlcv,backtestSma,parsePairsCsv,analyzeCorrelation,comparePortfolios,recoveryStats} from "./market-core.mjs";
const storeKey="coinmetriq.journal.v1",sessionKey="coinmetriq.session.journal.v1";
const fmt=(n,p=2)=>Number(n).toLocaleString("en-US",{minimumFractionDigits:p,maximumFractionDigits:p});
const errorText=e=>e instanceof Error?e.message:"Unable to complete this operation.";
const by=(root,q)=>root.querySelector(q);
const tx=(name,root=document)=>by(root,"[data-cm-"+name+"]");
const make=(tag,value,cls)=>{const x=document.createElement(tag);if(value!==undefined)x.textContent=String(value);if(cls)x.className=cls;return x;};
const clear=(el)=>el.replaceChildren();
const lead=(out,text,detail)=>{
 clear(out);out.append(make("strong",text,"cm-portfolio-lead"));
 if(detail)out.append(make("p",detail));out.dataset.state="success";
};
const fail=(out,err)=>{clear(out);out.append(make("p",errorText(err)));out.dataset.state="error";};
const rowTable=(out,columns,rows,caption="Calculated values")=>{
 const wrap=make("div",undefined,"cm-table-scroll"),table=make("table"),cap=make("caption",caption);table.append(cap);
 const tr=make("tr"),thead=make("thead");
 for(const k of columns){const th=make("th",k);th.scope="col";tr.append(th);}
 thead.append(tr);table.append(thead);
 const tbody=make("tbody");
 for(const r of rows){const row=make("tr");for(const value of r){const cell=make("td",value);row.append(cell);}tbody.append(row);}
 table.append(tbody);wrap.append(table);out.append(wrap);
};
const stats=(out,entries)=>{
 const dl=make("dl",undefined,"cm-result-list");
 for(const [k,v] of entries){dl.append(make("dt",k),make("dd",v));}
 out.append(dl);
};
const val=(form,key)=>{const el=by(form,'[name="'+key+'"]');return el?.value??"";};
const read=(form,key)=>tx(key,form)?.value??"";
const csvData=(source,columns)=>{
 const raw=parseCsv(source);if(raw.length<2)throw Error("A header row and at least one data row are required.");
 const header=raw.shift().map(x=>x.trim().toLowerCase());
 if(header.length!==new Set(header).size||columns.some(x=>!header.includes(x)))throw Error("Expected CSV headers: "+columns.join(", ")+".");
 return raw.map((r,i)=>{
  if(r.length!==header.length)throw Error("CSV column mismatch at row "+(i+2)+".");
  return Object.fromEntries(columns.map(c=>[c,r[header.indexOf(c)]]));
 });
};
const download=(name,content,type)=>{
 const file=new Blob([content],{type}),url=URL.createObjectURL(file),a=document.createElement("a");
 a.href=url;a.download=name;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),2500);
};
const readFile=(input,target)=>{
 input?.addEventListener("change",async()=>{
  const file=input.files?.[0];if(!file)return;
  if(file.size>1500000){window.alert("Select a file below 1.5 MB.");input.value="";return;}
  try{target.value=await file.text();target.focus();}
  catch{window.alert("Unable to read selected file on this device.");}
 });
};
const setExport=(form,rows,columns)=>{form._export={rows,columns};
 const btn=tx("download-csv",form);if(btn)btn.disabled=!rows?.length;
};
const setChartExport=(form,svg)=>{
 form._svg=svg||null;const btn=tx("download-svg",form);if(btn)btn.disabled=!svg;
};
function chart(container,series,{title="Historical user data",unit="",height=315}={}){
 clear(container);
 const all=series.flatMap(s=>s.points.map(p=>p.value)).filter(Number.isFinite);
 if(!all.length||series.every(s=>s.points.length<2))return null;
 const min=Math.min(...all),max=Math.max(...all),pad=Math.max(0.01,Math.abs(max-min)*.09),low=min-pad,high=max+pad;
 const width=900,left=65,right=22,top=38,bottom=height-42,plotWidth=width-left-right,plotHeight=bottom-top;
 const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("viewBox","0 0 "+width+" "+height);svg.setAttribute("role","img");svg.setAttribute("aria-label",title);svg.setAttribute("class","cm-local-chart");
 const create=(tag,attrs)=>{const n=document.createElementNS(svg.namespaceURI,tag);for(const [k,v] of Object.entries(attrs||{}))n.setAttribute(k,String(v));svg.append(n);return n;};
 const ttl=create("title");ttl.textContent=title;const desc=create("desc");desc.textContent="User-supplied historical input data. See corresponding table for numerical context.";
 for(let k=0;k<=4;k++){
  const y=top+plotHeight*k/4;
  create("line",{x1:left,y1:y,x2:width-right,y2:y,stroke:"#38565d","stroke-width":1});
  const label=create("text",{x:6,y:y+4,fill:"#b6d0ce","font-size":14});label.textContent=fmt(high-(high-low)*k/4,2)+unit;
 }
 const colors=["#b4f673","#4bd3c1","#f6c26e"];
 for(const [i,s] of series.entries()){
  const points=s.points.map((p,j)=>{
   const x=left+plotWidth*j/Math.max(1,s.points.length-1),y=top+plotHeight*(high-p.value)/(high-low);
   return fmt(x,2).replaceAll(",","")+","+fmt(y,2).replaceAll(",","");
  }).join(" ");
  create("polyline",{points,fill:"none",stroke:colors[i%colors.length],"stroke-width":3,"stroke-linejoin":"round","stroke-linecap":"round"});
  const label=create("text",{x:left+i*220,y:height-10,fill:colors[i%colors.length],"font-size":15});label.textContent=s.label;
 }
 const first=series[0].points[0]?.date,last=series[0].points.at(-1)?.date;
 if(first&&last){const l=create("text",{x:left,y:height-30,fill:"#a6c3c0","font-size":12});l.textContent=first;const r=create("text",{x:width-right,"text-anchor":"end",y:height-30,fill:"#a6c3c0","font-size":12});r.textContent=last;}
 container.append(svg);return svg;
}
function sessionTrades(){
 for(const storage of [sessionStorage,localStorage]){
  try{const json=storage.getItem(storage===sessionStorage?sessionKey:storeKey);if(json){const parsed=JSON.parse(json);return normalizeTrades(parsed.trades??[]);}}
  catch{/* user disabled storage or bad stored version: ignore */}
 }
 return null;
}
const saveSession=rows=>{try{sessionStorage.setItem(sessionKey,JSON.stringify({v:1,trades:rows}));}catch{/* optional storage */}};
const getTrades=()=>sessionTrades()??parseTradesCsv(SAMPLE_TRADES_CSV);
let currentTrades=getTrades();
let previousJournalCsv=null;
const tradeFields=["date","asset","side","qty","price","fee","tag","id","note"];
function journalPreview(out,rows,form){
 lead(out,rows.length+" validated trades", "Totals are bookkeeping examples, not investment advice or a tax report. Saved only in this browser session unless you choose Remember locally.");
 const led=calculateCostBasis(rows,"FIFO");stats(out,[["Assets with open positions",String(led.assetCount)],["Realized example P&L",fmt(led.realized,4)+" USD"],["Fees entered",fmt(led.fees)+" USD"]]);
 rowTable(out,["Date","Asset","Side","Qty","Price USD","Fee USD","Tag","Trade ID"],rows.map(r=>[r.date,r.asset,r.side,fmt(r.qty,8),fmt(r.price),fmt(r.fee),r.tag,r.id]),"Validated trade journal");
 const toolbar=make("div",undefined,"cm-extra-actions");
 const edit=make("button","Add or edit a trade");edit.type="button";edit.className="cm-inline-edit-button";toolbar.append(edit);out.append(toolbar);
 edit.addEventListener("click",()=>{
  const holder=make("form",undefined,"cm-journal-editor");holder.setAttribute("aria-label","Edit local trade");
  const inputs={};
  for(const key of tradeFields){
   const label=make("label",key),el=make("input");el.type=(["qty","price","fee"].includes(key)?"number":key==="date"?"date":"text");
   if(el.type==="number")el.step="any";
   el.required=["date","asset","side","qty","price"].includes(key);el.name=key;inputs[key]=el;label.append(el);holder.append(label);
  }
  const selector=make("label","Select existing trade or New");const select=make("select");select.append(new Option("New record",""));
  for(const t of rows)select.append(new Option(t.id+" · "+t.asset+" "+t.side,t.id));
  selector.append(select);holder.prepend(selector);
  select.addEventListener("change",()=>{
   const row=rows.find(r=>r.id===select.value);
   for(const k of tradeFields)inputs[k].value=row?.[k]??"";
  });
  const submit=make("button","Apply change");submit.type="submit";
  const remove=make("button","Delete selected trade");remove.type="button";
  holder.append(submit,remove);
  edit.after(holder);edit.disabled=true;
  const done=()=>{
   previousJournalCsv=exportTradesCsv(currentTrades);
   const area=tx("trades",form);if(area)area.value=previousJournalCsv;
   saveSession(currentTrades);journalPreview(out,currentTrades,form);
  };
  holder.addEventListener("submit",ev=>{
   ev.preventDefault();
   try{
    const raw=Object.fromEntries(tradeFields.map(k=>[k,inputs[k].value]));raw.side=raw.side.toUpperCase();raw.fee=raw.fee||0;raw.id=raw.id||"MANUAL-"+Date.now();
    const next=currentTrades.filter(r=>r.id!==select.value);
    next.push({...raw,index:next.length});
    const validated=normalizeTrades(next);
    calculateCostBasis(validated,"FIFO");currentTrades=validated;done();
   }catch(err){window.alert(errorText(err));}
  });
  remove.addEventListener("click",()=>{
   if(!select.value){window.alert("Choose a trade to delete.");return;}
   try{const next=currentTrades.filter(r=>r.id!==select.value);calculateCostBasis(next);currentTrades=next;done();}
   catch(err){window.alert(errorText(err));}
  });
 });
}
function setupJournal(form,out){
 const textarea=tx("trades",form),file=tx("file",form);
 readFile(file,textarea);
 const existing=sessionTrades();if(existing?.length){currentTrades=existing;textarea.value=previousJournalCsv=exportTradesCsv(existing);}
 tx("demo",form)?.addEventListener("click",()=>{textarea.value=SAMPLE_TRADES_CSV;textarea.focus();});
 tx("save",form)?.addEventListener("click",()=>{
  try{const rows=normalizeTrades(currentTrades);if(!rows.length)throw Error("Import at least one trade before saving.");
   localStorage.setItem(storeKey,JSON.stringify({v:1,trades:rows}));lead(out,"Saved on this device","Unencrypted localStorage. Not backed up. Use a private device or export an encrypted backup.");}
  catch(err){fail(out,err);}
 });
 tx("forget",form)?.addEventListener("click",()=>{
  try{localStorage.removeItem(storeKey);sessionStorage.removeItem(sessionKey);currentTrades=[];lead(out,"Stored journal cleared","No files were deleted from your computer. Your current editor contents remain until you replace them.");}
  catch(err){fail(out,err);}
 });
 tx("trade-export",form)?.addEventListener("click",()=>{
  try{if(!currentTrades.length)throw Error("Import trades first.");download("coinmetriq-trades.csv",exportTradesCsv(currentTrades),"text/csv;charset=utf-8");lead(out,"CSV downloaded","Copy includes trade IDs and entered strategy tags.");}
  catch(err){fail(out,err);}
 });
 form.addEventListener("submit",event=>{
  event.preventDefault();
  try{
   const mapping=Object.fromEntries([...form.querySelectorAll("[data-cm-map]")].map(x=>[x.name,x.value]));
   const parsed=parseTradesCsv(textarea.value,mapping);calculateCostBasis(parsed,"FIFO");
   currentTrades=parsed;saveSession(currentTrades);journalPreview(out,currentTrades,form);
  }catch(err){fail(out,err);}
 });
}
function setupCostBasis(form,out){
 form.addEventListener("submit",ev=>{
  ev.preventDefault();
  try{
   const rows=sessionTrades()??currentTrades??parseTradesCsv(SAMPLE_TRADES_CSV);
   const x=calculateCostBasis(rows,val(form,"method"));
   lead(out,fmt(x.realized,4)+" USD realized P&L",x.method+" · based on "+x.tradeCount+" historical trade rows. "+x.pricingNote);
   stats(out,[["Open cost basis",fmt(x.openCost)+" USD"],["Fees recorded",fmt(x.fees)+" USD"],["Open asset count",String(x.assetCount)]]);
   rowTable(out,["Asset","Remaining units","Cost basis USD","Average price USD","Last trade price (NOT live)"],x.positions.map(p=>[p.asset,fmt(p.qty,8),fmt(p.cost),fmt(p.avgCost,6),fmt(p.lastTradePrice,6)]),"Remaining inventory");
   if(x.positions.length&&x.openCost>0){
    const heat=make("section",undefined,"cm-portfolio-heatmap");
    heat.append(make("h3","Cost-basis allocation, not live market value"));
    for(const p of x.positions){
      const percent=p.cost/x.openCost*100,bar=make("meter");bar.min=0;bar.max=100;bar.value=percent;
      const row=make("div",undefined,"cm-portfolio-heat-row"),title=make("span",p.asset+" · "+fmt(percent,2)+"%");
      row.append(title,bar);heat.append(row);
    }
    out.append(heat);
   }
   rowTable(out,["Date","Asset","Type","Units","Proceeds USD","Cost basis USD","Realized P&L USD"],x.audit.map(a=>[a.date,a.asset,a.side,fmt(a.qty,8),fmt(a.proceeds),fmt(a.basis),fmt(a.realized,4)]),"Sale-by-sale audit (buys show zero proceeds)");
   const cols=["id","date","asset","side","qty","fee","proceeds","basis","realized","remainingQty"];
   setExport(form,x.audit,cols);setChartExport(form,null);
  }catch(err){fail(out,err);}
 });
}
function setupPerformance(form,out){
 form.addEventListener("submit",ev=>{
  ev.preventDefault();
  try{
   const vals=csvData(read(form,"valuations"),["date","value","flow"]).map(x=>({date:x.date,value:x.value,flow:x.flow}));
   const x=calculateTwr(vals);
   lead(out,fmt(x.totalReturn*100,4)+"% time-weighted return",x.method);
   const statsRows=[["Max historical drawdown",fmt(x.maxDrawdown*100)+"%"],["Drawdown trough",x.drawdownTrough||"None"]];
   const rec=recoveryStats(x.curve.map(v=>({date:v.date,value:v.equity})));statsRows.push(["Subsequent recovery",rec.recoveredDate||"Not recovered within observations"]);
   const flows=csvData(read(form,"cashflows"),["date","value"]);
   try{statsRows.unshift(["XIRR, annualized",fmt(calculateXirr(flows)*100,4)+"%"]);}
   catch(err){statsRows.unshift(["XIRR unavailable",errorText(err)]);}
   stats(out,statsRows);
   const chartRoot=tx("portfolio-chart",form);
   const svg=chart(chartRoot,[{label:"Cumulative TWR indexed to 100",points:x.curve.map(z=>({date:z.date,value:z.equity*100}))}],{title:"Cumulative time-weighted return from locally entered values"});
   setChartExport(form,svg);
   const records=x.curve.map(v=>({date:v.date,equityIndex:fmt(v.equity*100,6),drawdownPct:fmt(v.drawdown*100,4)}));
   setExport(form,records,["date","equityIndex","drawdownPct"]);
  }catch(err){fail(out,err);}
 });
}
function setupMarket(form,out){
 readFile(tx("file",form),tx("ohlcv",form));
 form.addEventListener("submit",ev=>{
  ev.preventDefault();
  try{
   const bars=parseOhlcvCsv(read(form,"ohlcv")),x=summarizeOhlcv(bars);
   lead(out,fmt(x.returnPercent,4)+"% price change","From the FIRST bar open to the LAST bar close, based only on entered historical data.");
   stats(out,[["Bars",String(x.bars)],["Range high",fmt(x.high,6)],["Range low",fmt(x.low,6)],["Total recorded volume",fmt(x.volume,2)]]);
   const svg=chart(tx("portfolio-chart",form),[{label:"User-supplied close",points:x.closeSeries}],{title:"Close prices from entered OHLCV CSV"});setChartExport(form,svg);
   setExport(form,bars,["date","open","high","low","close","volume"]);
  }catch(err){fail(out,err);}
 });
}
function sampleBacktest(){
 const rows=["date,open,high,low,close,volume"];
 let previous=110;
 for(let i=0;i<75;i++){
  const time=Date.parse("2026-01-01T00:00:00Z")+i*86400000,date=new Date(time).toISOString().slice(0,10);
  const close=100+i*.35+15*Math.sin(i*.23)+(i>45?-5:0);
  const open=previous,hi=Math.max(open,close)+3,lo=Math.min(open,close)-3;
  rows.push([date,...[open,hi,lo,close,1000+i*13].map(x=>Number(x.toFixed(6)))].join(","));
  previous=close;
 }
 return rows.join("\n");
}
function setupBacktest(form,out){
 const field=tx("ohlcv",form);readFile(tx("file",form),field);
 tx("backtest-sample",form)?.addEventListener("click",()=>{field.value=sampleBacktest();field.focus();});
 form.addEventListener("submit",ev=>{
  ev.preventDefault();
  try{
   const bars=parseOhlcvCsv(field.value);
   const x=backtestSma(bars,{initial:val(form,"initial"),fast:val(form,"fast"),slow:val(form,"slow"),feePct:val(form,"feePct")});
   lead(out,fmt(x.returnPercent,4)+"% hypothetical backtest return",x.method);
   stats(out,[["Final account value",fmt(x.finalValue)+" USD"],["Benchmark buy-and-hold",fmt(x.holdReturnPercent,4)+"%"],["Maximum drawdown",fmt(x.maxDrawdown,2)+"%"],["Estimated trading fees",fmt(x.totalFees)+" USD"],["Transactions",String(x.transactions.length)]]);
   rowTable(out,["Date","Side","Price","Qty","Fee"],x.transactions.map(t=>[t.date,t.side,fmt(t.price,4),fmt(t.qty,8),fmt(t.fee,4)]),"Simulated next-day open executions");
   const svg=chart(tx("portfolio-chart",form),[{label:"SMA strategy",points:x.equity.map(z=>({date:z.date,value:z.value}))}],{title:"Hypothetical SMA strategy equity"});setChartExport(form,svg);
   setExport(form,x.equity,["date","value","drawdown","position"]);
  }catch(err){fail(out,err);}
 });
}
function setupCompare(form,out){
 form.addEventListener("submit",ev=>{
  ev.preventDefault();
  try{
   const a=csvData(read(form,"series-a"),["date","value"]),b=csvData(read(form,"series-b"),["date","value"]);
   const comparison=comparePortfolios(a,b);
   const rows=parsePairsCsv(read(form,"paired")),roll=analyzeCorrelation(rows,{window:Number(val(form,"window"))});
   lead(out,roll.correlation===null?"Undefined return correlation":fmt(roll.correlation,4)+" return correlation","Pearson correlation across "+roll.pairs+" historical return pairs; not a prediction.");
   stats(out,[["Portfolio A ending index",fmt(comparison.portfolioA.at(-1).value)],["Portfolio B ending index",fmt(comparison.portfolioB.at(-1).value)],["Common valuation dates",String(comparison.dates.length)]]);
   const svg=chart(tx("portfolio-chart",form),[{label:"Portfolio A (index)",points:comparison.portfolioA},{label:"Portfolio B (index)",points:comparison.portfolioB}],{title:"Two portfolio values normalized to 100 at first common date"});setChartExport(form,svg);
   const rolling=roll.rolling.filter(p=>Number.isFinite(p.value));
   if(rolling.length>1){
     const wrapper=make("section",undefined,"cm-portfolio-rolling"),heading=make("h3","Rolling correlation of your example asset returns");
     const holder=make("div");
     wrapper.append(heading,holder);tx("portfolio-chart",form).append(wrapper);
     chart(holder,[{label:"Rolling correlation",points:rolling}],{title:"Rolling correlation of aligned historical simple returns"});
   }
   setExport(form,comparison.dates.map((date,i)=>({date,portfolioA:fmt(comparison.portfolioA[i].value,6),portfolioB:fmt(comparison.portfolioB[i].value,6)})),["date","portfolioA","portfolioB"]);
  }catch(err){fail(out,err);}
 });
}
function setupSafety(form,out){
 form.addEventListener("submit",ev=>{
  ev.preventDefault();const checks=form.querySelectorAll('.cm-checklist input[type="checkbox"]');
  const count=[...checks].filter(x=>x.checked).length;
  lead(out,count+" of "+checks.length+" educational checks reviewed","A checklist can identify things to learn but cannot certify a token, wallet or device as safe. No inputs are stored or sent.");
  setExport(form,null,[]);
 });
}
function setupFees(form,out){
 form.addEventListener("submit",ev=>{
  ev.preventDefault();
  try{
   const bytes=Number(val(form,"vbytes")),rate=Number(val(form,"feerate")),price=Number(val(form,"btcprice")),conf=Number(val(form,"confirmations"));
   if(!Number.isSafeInteger(bytes)||bytes<=0||bytes>1e6||!Number.isFinite(rate)||rate<0||rate>1e9||!Number.isFinite(price)||price<0||price>1e12||!Number.isSafeInteger(conf)||conf<0||conf>1e8)throw Error("Invalid fee / size / price / confirmation numbers.");
   const sats=bytes*rate,btc=sats/1e8,usd=btc*price;
   lead(out,fmt(sats,3)+" satoshis hypothetical fee","Bitcoin-like vbyte model from your manual fee rate; no live recommended fee or confirmation estimate.");
   stats(out,[["BTC",fmt(btc,8)],["USD (manual reference)",fmt(usd,4)],["Confirmed blocks (manual)",String(conf)],["Finality","Probabilistic; protocol-specific"]]);
   setExport(form,[{vbytes:bytes,satsPerVbyte:rate,sats,btc,usd,confirmations:conf}],["vbytes","satsPerVbyte","sats","btc","usd","confirmations"]);
  }catch(err){fail(out,err);}
 });
}
function setupBackups(){
 const field=tx("passphrase"),file=tx("backup-file"),out=tx("portfolio-output");
 tx("backup-create")?.addEventListener("click",async()=>{
  try{
   const rows=sessionTrades()??currentTrades;
   if(!rows?.length)throw Error("Import trades in the Journal before backing up.");
   const encrypted=await encryptJournal(rows,field.value);
   download("coinmetriq-encrypted-journal.json",JSON.stringify(encrypted,null,2),"application/json;charset=utf-8");
   lead(out,"Encrypted backup downloaded","No passphrase or trade data was sent to a server. Keep both the file and passphrase securely.");
  }catch(err){fail(out,err);}
 });
 tx("backup-open")?.addEventListener("click",async()=>{
  try{
   const f=file.files?.[0];if(!f||f.size>2800000)throw Error("Choose an encrypted backup JSON smaller than 2.8 MB.");
   const backup=JSON.parse(await f.text()),rows=await decryptJournal(backup,field.value);
   if(!window.confirm("Restore "+rows.length+" trades to this browser session? Current unsaved session journal will be replaced."))return;
   currentTrades=rows;saveSession(rows);
   lead(out,rows.length+" restored trades","Decryption authenticated. Only the current browser session was changed; previous optional localStorage was not overwritten. Open Trade Journal to inspect.");
  }catch(err){fail(out,err);}
 });
}
for(const form of document.querySelectorAll("form[data-cm-portfolio]")){
 const out=tx("portfolio-output",form);
 const job=form.dataset.cmPortfolio;
 const handlers={journal:setupJournal,costbasis:setupCostBasis,performance:setupPerformance,market:setupMarket,backtest:setupBacktest,compare:setupCompare,safety:setupSafety,fees:setupFees};
 if(handlers[job])handlers[job](form,out);
 tx("download-csv",form)?.addEventListener("click",()=>{
  if(!form._export?.rows?.length)return;
  download("coinmetriq-"+job+"-analysis.csv",toCsv(form._export.rows,form._export.columns),"text/csv;charset=utf-8");
 });
 tx("download-svg",form)?.addEventListener("click",()=>{
  if(!form._svg)return;
  const content=new XMLSerializer().serializeToString(form._svg);
  download("coinmetriq-"+job+"-chart.svg",content,"image/svg+xml;charset=utf-8");
 });
}
if(tx("backup-create"))setupBackups();
