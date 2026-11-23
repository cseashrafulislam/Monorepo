/* CoinMetriq: on-device OHLCV and portfolio analytics from user-supplied CSV only. */
import {parseCsv,isoDay} from "./ledger-core.mjs";
const fail=s=>{throw Error(s)};
const num=(v,label,{positive=false,nonnegative=false}={})=>{
 if(v===null||v===undefined||String(v).trim()==="")fail("Missing "+label);
 const x=Number(v);if(!Number.isFinite(x)||Math.abs(x)>1e20||(positive&&x<=0)||(nonnegative&&x<0))fail("Invalid "+label);
 return x;
};
function fromCsv(text,required){
 const raw=parseCsv(text);if(raw.length<2)fail("CSV needs headers and data.");
 const headings=raw[0].map(x=>x.trim().toLowerCase().replace(/[\s_-]/g,""));
 const positions=required.map(k=>headings.indexOf(k));
 if(positions.some(x=>x<0)||new Set(headings).size!==headings.length)fail("CSV header must include "+required.join(", ")+".");
 return raw.slice(1).map((row,i)=>{
  if(row.length!==headings.length)fail("Wrong column count at row "+(i+2)+".");
  return Object.fromEntries(required.map((key,k)=>[key,row[positions[k]]]));
 });
}
export const SAMPLE_OHLCV_CSV=[
 "date,open,high,low,close,volume",
 "2026-01-01,100,106,99,104,950",
 "2026-01-02,104,108,101,103,900",
 "2026-01-03,103,111,102,109,1000",
 "2026-01-04,109,112,106,110,1100",
 "2026-01-05,110,111,103,105,980"
].join("\n");
export function parseOhlcvCsv(text){
 const raw=fromCsv(text,["date","open","high","low","close","volume"]);
 if(raw.length>5000)fail("OHLCV has more than 5,000 rows.");
 let previous="";
 return raw.map(row=>{
  const date=isoDay(row.date);if(previous&&date<=previous)fail("OHLCV dates must be strictly increasing.");previous=date;
  const bar={date,open:num(row.open,"open",{positive:true}),high:num(row.high,"high",{positive:true}),low:num(row.low,"low",{positive:true}),close:num(row.close,"close",{positive:true}),volume:num(row.volume,"volume",{nonnegative:true})};
  if(bar.high<Math.max(bar.open,bar.close,bar.low)||bar.low>Math.min(bar.open,bar.close,bar.high))fail("OHLCV high/low inconsistent for "+date+".");
  return bar;
 });
}
export function summarizeOhlcv(bars){
 if(!Array.isArray(bars)||!bars.length)fail("OHLCV bars required.");
 let high=0,low=Infinity,volume=0;const close=[];
 for(const b of bars){high=Math.max(high,b.high);low=Math.min(low,b.low);volume+=b.volume;close.push(b.close)}
 const first=bars[0].open,last=bars.at(-1).close;
 return {bars:bars.length,high,low,volume,first,last,returnPercent:(last/first-1)*100,closeSeries:bars.map(b=>({date:b.date,value:b.close}))};
}
const sma=(values,end,len)=>{
 if(end<len-1)return null;
 let sum=0;for(let i=end-len+1;i<=end;i++)sum+=values[i];
 return sum/len;
};
export function backtestSma(bars,{initial=10000,fast=5,slow=20,feePct=0.1}={}){
 if(!Array.isArray(bars)||bars.length<5)fail("Add OHLCV history first.");
 initial=num(initial,"initial cash",{positive:true});fast=num(fast,"fast SMA",{positive:true});slow=num(slow,"slow SMA",{positive:true});feePct=num(feePct,"trade fee percentage",{nonnegative:true});
 if(!Number.isInteger(fast)||!Number.isInteger(slow)||fast>=slow||slow>300||bars.length<slow+2)fail("Require integer fast < slow ≤ 300 and at least slow+2 bars.");
 if(feePct>20)fail("Fee must be ≤20%.");
 const closes=bars.map(b=>b.close),fee=feePct/100;
 let cash=initial,units=0,transactions=[],equity=[],peak=initial,maxDrawdown=0,totalFees=0;
 // Signal from previous daily CLOSE; execution at NEXT daily OPEN. No future leakage.
 for(let i=0;i<bars.length;i++){
  let wanted=false;
  if(i>=slow){
   const fastPrev=sma(closes,i-1,fast),slowPrev=sma(closes,i-1,slow);
   wanted=fastPrev>slowPrev;
   if(wanted&&units===0){
    const qty=cash/(bars[i].open*(1+fee)),feeAmount=qty*bars[i].open*fee;
    units=qty;cash=0;totalFees+=feeAmount;
    transactions.push({date:bars[i].date,side:"BUY",price:bars[i].open,qty,fee:feeAmount});
   }else if(!wanted&&units>0){
    const gross=units*bars[i].open,feeAmount=gross*fee;cash=gross-feeAmount;
    transactions.push({date:bars[i].date,side:"SELL",price:bars[i].open,qty:units,fee:feeAmount});
    units=0;totalFees+=feeAmount;
   }
  }
  const value=cash+units*bars[i].close;
  if(!Number.isFinite(value))fail("Backtest numeric overflow.");
  peak=Math.max(peak,value);maxDrawdown=Math.max(maxDrawdown,1-value/peak);
  equity.push({date:bars[i].date,value,drawdown:1-value/peak,position:units>0?"LONG":"CASH"});
 }
 const finalValue=equity.at(-1).value;
 // Benchmark: buy and hold at first available opening price incl initial fee and exit comparison valued at final close.
 const holdUnits=initial/(bars[0].open*(1+fee)),holdValue=holdUnits*bars.at(-1).close;
 return {method:"Signals at previous bar close; buys/sells at next bar open. Long-only, all-in or all-cash. Not executable price quotes.",initial,finalValue,returnPercent:(finalValue/initial-1)*100,holdValue,holdReturnPercent:(holdValue/initial-1)*100,maxDrawdown:100*maxDrawdown,totalFees,transactions,equity};
}
export function recoveryStats(values){
 if(!Array.isArray(values)||values.length<2)fail("At least two dated values required.");
 let peak=-Infinity,peakDate="",trough="",maxDrawdown=0,recovered=null,target=0,awaiting=false;
 for(const [i,x] of values.entries()){
  const v=num(x.value,"portfolio value",{positive:true}),date=isoDay(x.date);
  if(i&&date<=values[i-1].date)fail("Dates must increase.");
  if(v>=peak){peak=v;peakDate=date;if(awaiting&&v>=target){recovered=date;awaiting=false}}
  else {
   const dd=1-v/peak;
   if(dd>maxDrawdown){maxDrawdown=dd;trough=date;target=peak;recovered=null;awaiting=true}
  }
 }
 return {maxDrawdown,peakDate,troughDate:trough,recoveredDate:recovered,unrecovered:awaiting};
}
/* Date aligned pair of price series; no interpolation or future filling. */
export function parsePairsCsv(text){
 const raw=fromCsv(text,["date","a","b"]);if(raw.length<4)fail("Enter at least 4 pair observations.");
 let last="";
 return raw.map(r=>{
  const date=isoDay(r.date);if(last&&date<=last)fail("Dates must be strictly increasing.");last=date;
  return {date,a:num(r.a,"asset A price",{positive:true}),b:num(r.b,"asset B price",{positive:true})};
 });
}
export function analyzeCorrelation(rows,{window=7}={}){
 if(!Array.isArray(rows)||rows.length<4)fail("Need four price observations.");
 const returns=rows.slice(1).map((row,i)=>({date:row.date,a:row.a/rows[i].a-1,b:row.b/rows[i].b-1}));
 const calc=data=>{
  if(data.length<2)return null;
  const a=data.reduce((s,x)=>s+x.a,0)/data.length,b=data.reduce((s,x)=>s+x.b,0)/data.length;
  let covariance=0,sa=0,sb=0;
  for(const x of data){covariance+=(x.a-a)*(x.b-b);sa+=(x.a-a)**2;sb+=(x.b-b)**2}
  return sa&&sb?Math.max(-1,Math.min(1,covariance/Math.sqrt(sa*sb))):null;
 };
 if(!Number.isInteger(window)||window<3||window>500)fail("Rolling window must be 3–500 return periods.");
 return {correlation:calc(returns),pairs:returns.length,rolling:returns.map((x,i)=>({date:x.date,value:i+1>=window?calc(returns.slice(i+1-window,i+1)):null})),note:"Pearson correlation of aligned historical simple returns; not forecast or causation."};
}
/* Plain CSV format: date,value for each independent portfolio.
   Compare growth indexed to 100, not absolute account size. */
export function comparePortfolios(left,right){
 function normalize(rows){if(!Array.isArray(rows)||rows.length<2)fail("Each portfolio requires at least two daily rows.");let prev="";return rows.map(x=>{const d=isoDay(x.date),v=num(x.value,"portfolio value",{positive:true});if(prev&&d<=prev)fail("Dates must increase.");prev=d;return {date:d,value:v}})}
 const a=normalize(left),b=normalize(right),map=new Map(b.map(x=>[x.date,x.value]));
 const common=a.filter(x=>map.has(x.date));
 if(common.length<2)fail("Portfolio series need at least two common dates.");
 const a0=common[0].value,b0=map.get(common[0].date);
 return {dates:common.map(x=>x.date),portfolioA:common.map(x=>({date:x.date,value:x.value/a0*100})),portfolioB:common.map(x=>({date:x.date,value:map.get(x.date)/b0*100})),note:"Indexed comparison from the same initial observation, ignoring external deposits/withdrawals."};
}

/* Annualized rolling realized volatility from local daily OHLCV close prices. */
export function rollingVolatility(bars,{window=3}={}){
 if(!Array.isArray(bars)||bars.length<window+1)throw Error("Need more daily close observations than the rolling window.");
 if(!Number.isInteger(window)||window<3||window>500)throw Error("Rolling volatility window must be 3–500.");
 const returns=bars.slice(1).map((x,i)=>({date:x.date,value:x.close/bars[i].close-1}));
 const points=returns.slice(window-1).map((_,i)=>{
  const slice=returns.slice(i,i+window),mean=slice.reduce((s,x)=>s+x.value,0)/window;
  const sd=Math.sqrt(slice.reduce((s,x)=>s+(x.value-mean)**2,0)/(window-1));
  return {date:slice.at(-1).date,value:sd*Math.sqrt(365)*100};
 });
 return {window,points,method:"Sample daily close-to-close simple returns, annualized with sqrt(365); volatility is retrospective and does not predict prices."};
}
/* User supplied token issuance figures; always label third-party sources as unverified until reviewed. */
export function parseSupplySchedule(text){
 const raw=fromCsv(text,["date","circulating","unlock"]);if(raw.length<2||raw.length>2000)throw Error("Enter 2–2,000 dated supply rows.");
 let last="",previous=0;
 return raw.map((r,i)=>{
  const date=isoDay(r.date);
  if(last&&date<=last)throw Error("Supply dates must be strictly increasing.");last=date;
  const supply=num(r.circulating,"circulating supply",{positive:true}),unlock=num(r.unlock,"new unlock tokens",{nonnegative:true});
  const percentage=i?((supply/previous)-1)*100:0;
  if(!Number.isFinite(percentage))throw Error("Supply change too large.");
  previous=supply;
  return {date,circulating:supply,unlock,changePct:percentage};
 });
}
export function summarizeSupplySchedule(rows){
 if(!Array.isArray(rows)||rows.length<2)throw Error("At least two supplies required.");
 const first=rows[0].circulating,last=rows.at(-1).circulating;
 const changes=rows.reduce((sum,x)=>sum+x.unlock,0);
 return {start:first,end:last,changePct:(last/first-1)*100,recordedUnlocks:changes,points:rows.map(r=>({date:r.date,value:r.circulating})),note:"Circulating supply and unlock amounts were manually entered. Additional minting, burns and vesting rules are not independently verified and token price cannot be inferred."};
}
