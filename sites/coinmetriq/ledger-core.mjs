/* CoinMetriq: private, long-only USD trade ledger. No market feeds or tax advice. */
const fail=s=>{throw Error(s)};
const number=(v,name,{positive=false,nonnegative=false,max=1e18}={})=>{
 if(v===undefined||v===null||String(v).trim()==="")fail("Missing "+name);
 const n=Number(v);if(!Number.isFinite(n)||Math.abs(n)>max||(positive&&n<=0)||(nonnegative&&n<0))fail("Invalid "+name);
 return n;
};
export const isoDay=v=>{
 const s=String(v??"").trim(),time=Date.parse(s+"T00:00:00Z");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(time)||new Date(time).toISOString().slice(0,10)!==s)fail("Invalid calendar date, use YYYY-MM-DD.");
 return s;
};
const asset=v=>{const s=String(v??"").trim().toUpperCase();if(!/^[A-Z0-9][A-Z0-9._-]{0,19}$/.test(s))fail("Invalid asset symbol.");return s;};
export function parseCsv(text,{maxRows=5001,maxChars=1500000}={}){
 const input=String(text??"").replace(/^\uFEFF/,"");
 if(!input.trim()||input.length>maxChars)fail("Paste a non-empty CSV smaller than 1.5 MB.");
 const rows=[];let row=[],field="",quoted=false,closed=false;
 const flush=()=>{row.push(field);if(row.some(v=>v.trim()!==""))rows.push(row);if(rows.length>maxRows)fail("Too many CSV rows.");row=[];field="";closed=false};
 for(let i=0;i<input.length;i++){
  const ch=input[i];
  if(quoted){
   if(ch==='"'&&input[i+1]==='"'){field+='"';i++}
   else if(ch==='"'){quoted=false;closed=true}
   else field+=ch;
  }else if(ch==='"'){
   if(field||closed)fail("Invalid CSV quote.");quoted=true;
  }else if(ch===","){row.push(field);field="";closed=false}
  else if(ch==="\r"||ch==="\n"){if(ch==="\r"&&input[i+1]==="\n")i++;flush()}
  else if(closed){if(!/\s/.test(ch))fail("Characters after quoted CSV field.");}
  else field+=ch;
 }
 if(quoted)fail("Unclosed CSV quote.");
 flush();return rows;
}
const normalizedHeader=s=>String(s??"").toLowerCase().replace(/[^a-z0-9]/g,"");
export const DEFAULT_TRADE_MAPPING={date:"date",asset:"asset",side:"side",qty:"quantity",price:"price",fee:"fee",tag:"tag",id:"trade_id",note:"note"};
export const SAMPLE_TRADES_CSV=[
 "date,asset,side,quantity,price,fee,tag,trade_id,note",
 "2026-01-10,BTC,BUY,0.05,50000,3,Long-term,A001,Example buy",
 "2026-02-12,BTC,BUY,0.03,60000,2,Long-term,A002,Example accumulation",
 "2026-03-14,BTC,SELL,0.02,65000,2,Trim,A003,Example partial sale",
 "2026-03-16,ETH,BUY,1.5,2500,3,Research,B001,Example investment",
 "2026-04-09,ETH,SELL,0.5,2900,1,Trim,B002,Example disposal"
].join("\n");
export function parseTradesCsv(text,mapping=DEFAULT_TRADE_MAPPING){
 const raw=parseCsv(text);
 if(raw.length<2)fail("Trade CSV needs header and trade rows.");
 const headers=raw[0].map(normalizedHeader);
 if(headers.some(x=>!x)||new Set(headers).size!==headers.length)fail("Duplicate or blank CSV headers.");
 const idx={};
 for(const key of ["date","asset","side","qty","price","fee","tag","id","note"]){
  idx[key]=headers.indexOf(normalizedHeader(mapping[key]??DEFAULT_TRADE_MAPPING[key]));
  if(["date","asset","side","qty","price"].includes(key)&&idx[key]<0)fail("Missing column "+key+".");
 }
 const seen=new Set();
 return raw.slice(1).map((r,i)=>{
  if(r.length!==headers.length)fail("CSV row "+(i+2)+" has wrong column count.");
  const get=k=>idx[k]<0?"":r[idx[k]];
  const side=String(get("side")).trim().toUpperCase();
  if(!["BUY","SELL"].includes(side))fail("CSV row "+(i+2)+": use BUY or SELL.");
  const id=String(get("id")).trim()||"ROW-"+(i+2);
  if(id.length>100||seen.has(id))fail("Duplicate or invalid trade ID.");seen.add(id);
  const trade={id,date:isoDay(get("date")),asset:asset(get("asset")),side,qty:number(get("qty"),"quantity",{positive:true}),price:number(get("price"),"price",{positive:true}),fee:get("fee")===""?0:number(get("fee"),"fee",{nonnegative:true}),tag:String(get("tag")).trim().slice(0,60),note:String(get("note")).trim().slice(0,350),index:i};
  if(side==="SELL"&&trade.fee>trade.qty*trade.price)fail("Sale fee exceeds gross sale proceeds.");
  return trade;
 });
}
export function normalizeTrades(trades){
 if(!Array.isArray(trades)||trades.length>5000)fail("Provide at most 5,000 trade rows.");
 const seen=new Set();
 return trades.map((t,i)=>{
  const id=String(t.id??"ROW-"+i).trim(),side=String(t.side??"").toUpperCase();
  if(!id||id.length>100||seen.has(id))fail("Trade ID must be unique.");seen.add(id);
  if(!["BUY","SELL"].includes(side))fail("Trade side must be BUY or SELL.");
  const row={id,date:isoDay(t.date),asset:asset(t.asset),side,qty:number(t.qty,"quantity",{positive:true}),price:number(t.price,"price",{positive:true}),fee:number(t.fee??0,"fee",{nonnegative:true}),tag:String(t.tag??"").slice(0,60),note:String(t.note??"").slice(0,350),index:Number.isInteger(t.index)?t.index:i};
  if(side==="SELL"&&row.fee>row.qty*row.price)fail("Sale fee exceeds gross proceeds.");
  return row;
 }).sort((a,b)=>a.date.localeCompare(b.date)||a.index-b.index);
}
export function calculateCostBasis(trades,method="FIFO"){
 if(!["FIFO","WAC"].includes(method))fail("Method must be FIFO or WAC.");
 const books=new Map(),audit=[];let realized=0,fees=0;
 for(const t of normalizeTrades(trades)){
  let b=books.get(t.asset);if(!b){b={asset:t.asset,qty:0,cost:0,lots:[],lastTradePrice:0};books.set(t.asset,b)}
  fees+=t.fee;b.lastTradePrice=t.price;const gross=t.qty*t.price;
  let basis=0,proceeds=0,profit=0;
  if(t.side==="BUY"){
   b.qty+=t.qty;b.cost+=gross+t.fee;b.lots.push({qty:t.qty,cost:gross+t.fee});
  }else{
   if(t.qty-b.qty>1e-8*Math.max(1,b.qty))fail("Cannot sell "+t.qty+" "+t.asset+" on "+t.date+"; available "+b.qty+". No short-selling.");
   let remaining=t.qty;
   if(method==="WAC")basis=b.cost*t.qty/b.qty;
   else{
    while(remaining>1e-10){
     const lot=b.lots[0];if(!lot)fail("FIFO lots insufficient.");
     const used=Math.min(lot.qty,remaining),price=lot.cost/lot.qty;
     basis+=used*price;lot.cost-=used*price;lot.qty-=used;remaining-=used;
     if(lot.qty<=1e-10)b.lots.shift();
    }
   }
   proceeds=gross-t.fee;profit=proceeds-basis;realized+=profit;
   b.qty-=t.qty;b.cost-=basis;
   if(b.qty<=1e-10){b.qty=0;b.cost=0;b.lots=[]}
  }
  if(!Number.isFinite(b.cost)||!Number.isFinite(realized)||b.qty<0||b.cost< -1e-6)fail("Ledger overflow or invalid position.");
  audit.push({id:t.id,date:t.date,asset:t.asset,side:t.side,qty:t.qty,price:t.price,fee:t.fee,proceeds,basis,realized:profit,remainingQty:b.qty,tag:t.tag});
 }
 const positions=[...books.values()].filter(b=>b.qty>0).map(b=>({asset:b.asset,qty:b.qty,cost:b.cost,avgCost:b.cost/b.qty,lastTradePrice:b.lastTradePrice,referenceValuation:b.qty*b.lastTradePrice}));
 return {method,tradeCount:audit.length,assetCount:positions.length,realized,fees,openCost:positions.reduce((s,p)=>s+p.cost,0),positions,audit,asOf:audit.at(-1)?.date??null,pricingNote:"Last TRADE price is NOT a current quote. Reference valuations are illustrative."};
}
const csvSafe=value=>{
 const s=String(value??""),v=/^[=+@\t\r]/.test(s)||(/^-[^0-9.]/.test(s))?"'"+s:s;
 return /[,"\r\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;
};
export function toCsv(rows,columns){
 if(!Array.isArray(rows)||!Array.isArray(columns)||!columns.length)fail("Invalid export.");
 return columns.map(csvSafe).join(",")+"\r\n"+rows.map(row=>columns.map(k=>csvSafe(row[k])).join(",")).join("\r\n")+"\r\n";
}
export const tradeColumns=["date","asset","side","qty","price","fee","tag","id","note"];
export const exportTradesCsv=trades=>toCsv(normalizeTrades(trades),tradeColumns);
export function calculateXirr(flows){
 if(!Array.isArray(flows)||flows.length<2||flows.length>2000)fail("Enter 2–2,000 dated flows.");
 const data=flows.map(x=>({date:isoDay(x.date),value:number(x.value,"cash flow")})).sort((a,b)=>a.date.localeCompare(b.date));
 if(data[0].date===data.at(-1).date)fail("XIRR requires distinct dates.");
 if(!data.some(x=>x.value>0)||!data.some(x=>x.value<0))fail("XIRR requires positive and negative cashflows.");
 let sign=0,changes=0;for(const x of data){const next=Math.sign(x.value);if(!next)continue;if(sign&&next!==sign)changes++;sign=next}
 if(changes!==1)fail("Ambiguous multiple-sign-change IRR is not supported.");
 const start=Date.parse(data[0].date+"T00:00:00Z");
 const periods=data.map(x=>({value:x.value,t:(Date.parse(x.date+"T00:00:00Z")-start)/86400000/365}));
 const npv=rate=>periods.reduce((s,x)=>s+x.value/Math.pow(1+rate,x.t),0);
 let low=-.999999,high=1,lv=npv(low),hv=npv(high);
 while(Number.isFinite(lv)&&Number.isFinite(hv)&&lv*hv>0&&high<1e8){high=high*2+1;hv=npv(high)}
 if(!Number.isFinite(lv)||!Number.isFinite(hv)||lv*hv>0)fail("Unable to determine annual XIRR.");
 for(let i=0;i<160;i++){const mid=(low+high)/2,m=npv(mid);if(!Number.isFinite(m))fail("XIRR overflow.");if(Math.abs(m)<1e-10)return mid;if(lv*m>0){low=mid;lv=m}else{high=mid}}
 return (low+high)/2;
}
/* End-of-period external flows: positive=contribution, negative=withdrawal. */
export function calculateTwr(observations){
 if(!Array.isArray(observations)||observations.length<2||observations.length>5000)fail("Enter 2–5,000 valuation rows.");
 const rows=observations.map(x=>({date:isoDay(x.date),value:number(x.value,"value",{positive:true}),flow:number(x.flow??0,"external flow")}));
 if(rows[0].flow!==0)fail("Opening external flow must be zero.");
 let factor=1,peak=1,drawdown=0,trough="",curve=[{date:rows[0].date,equity:1,drawdown:0}];
 for(let i=1;i<rows.length;i++){
  if(rows[i].date<=rows[i-1].date)fail("Valuation dates must increase.");
  const sub=(rows[i].value-rows[i].flow)/rows[i-1].value;
  if(sub<=0)fail("Period return less than -100%; check valuation and flow.");
  factor*=sub;if(!Number.isFinite(factor))fail("TWR overflow.");
  peak=Math.max(peak,factor);const drop=1-factor/peak;if(drop>drawdown){drawdown=drop;trough=rows[i].date}
  curve.push({date:rows[i].date,equity:factor,drawdown:drop});
 }
 return {totalReturn:factor-1,maxDrawdown:drawdown,drawdownTrough:trough,latestValue:rows.at(-1).value,curve,method:"External contributions/withdrawals are assumed to occur at the END of each valuation interval."};
}
