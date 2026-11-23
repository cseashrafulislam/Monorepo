/* Offline historical risk research — NOT trading advice or predictive price data.
 * Source is user-supplied dated OHLCV, never a third-party live feed.
 */
import {parseOhlcvCsv} from "./market-core.mjs";
const ensure=(ok,reason)=>{if(!ok)throw Error(reason)};
const quantile=(sorted,p)=>{
 const index=(sorted.length-1)*p,low=Math.floor(index),weight=index-low;
 return sorted[low]*(1-weight)+sorted[Math.min(sorted.length-1,low+1)]*weight;
};
const mean=nums=>nums.reduce((a,b)=>a+b,0)/nums.length;
const sampleSd=nums=>{const m=mean(nums);return Math.sqrt(nums.reduce((s,n)=>s+(n-m)**2,0)/(nums.length-1));};
const f=(v,d=8)=>Number(v.toFixed(d));
export function evaluateHistoricalRisk(bars,{riskFreeAnnual=0,confidence=95}={}){
 ensure(Array.isArray(bars)&&bars.length>=11&&bars.length<=5001,"Risk analysis requires 11–5,001 chronological daily OHLCV bars.");
 const rate=Number(riskFreeAnnual),c=Number(confidence);
 ensure(Number.isFinite(rate)&&rate>=-50&&rate<=100,"Annual risk-free input must be -50% to 100%, as a manual scenario assumption.");
 ensure([95,99].includes(c),"Use 95% or 99% historical VaR confidence.");
 const returns=bars.slice(1).map((b,i)=>{
  const value=b.close/bars[i].close-1;
  ensure(Number.isFinite(value)&&value>=-1&&value<1e10,"Historical price ratio exceeds supported range.");
  return {date:b.date,value};
 });
 const samples=returns.map(r=>r.value),sorted=samples.slice().sort((a,b)=>a-b),avg=mean(samples),sd=sampleSd(samples);
 const threshold=quantile(sorted,1-c/100),tail=sorted.filter(x=>x<=threshold);
 const downsideDaily=rate/100/365;
 const downsideSd=Math.sqrt(samples.reduce((a,r)=>a+Math.min(0,r-downsideDaily)**2,0)/samples.length);
 let peak=bars[0].close,drawdown=0,trough="",recovery="";
 let decline=false;
 const curve=bars.map((b,i)=>{
  if(b.close>peak){peak=b.close;if(decline&&!recovery)recovery=b.date;decline=false;}
  const dd=1-b.close/peak;
  if(dd>drawdown){drawdown=dd;trough=b.date;recovery="";decline=dd>0;}
  return {date:b.date,close:b.close,drawdownPct:f(dd*100,5)};
 });
 const rfDaily=rate/100/365;
 return {
  count:samples.length,
  confidence:c,
  averageDailyPct:f(avg*100,6),
  dailyVolatilityPct:f(sd*100,6),
  annualizedVolatilityPct:f(sd*Math.sqrt(365)*100,5),
  historicalVarPct:f(Math.max(0,-threshold*100),5),
  historicalExpectedShortfallPct:f(Math.max(0,-mean(tail)*100),5),
  sampleTailCount:tail.length,
  sharpe:sd>1e-12?f((avg-rfDaily)/sd*Math.sqrt(365),5):null,
  sortino:downsideSd>1e-12?f((avg-rfDaily)/downsideSd*Math.sqrt(365),5):null,
  maxDrawdownPct:f(drawdown*100,5),
  drawdownTrough:trough||null,
  mostRecentPeakRecovery:recovery||null,
  returns:returns.map(r=>({date:r.date,returnPct:f(r.value*100,6)})),
  curve,
  method:"Historical simple close-to-close returns, equal-weighted observations, sample standard deviation and sqrt(365) annualization. VaR is the empirical lower-return quantile; expected shortfall is the observed average tail return. Not a prediction, calibrated probability or full market-risk model."
 };
}
export function riskFromOhlcvCsv(input,options){
 return evaluateHistoricalRisk(parseOhlcvCsv(input),options);
}
function randomGenerator(seed){
 let x=seed>>>0;
 if(x===0)x=0x9e3779b9;
 return ()=>{
  x^=x<<13;x^=x>>>17;x^=x<<5;
  return (x>>>0)/4294967296;
 };
}
export function bootstrapRiskScenarios(bars,{days=30,paths=250,seed=73651}={}){
 ensure(Array.isArray(bars)&&bars.length>=11,"Bootstrap requires at least 11 historical daily OHLCV bars.");
 ensure(Number.isSafeInteger(days)&&days>=5&&days<=90,"Scenario days must be an integer from 5–90.");
 ensure(Number.isSafeInteger(paths)&&paths>=100&&paths<=500,"Scenario paths must be an integer from 100–500.");
 ensure(Number.isSafeInteger(seed)&&seed>=1&&seed<=4294967295,"Reproducibility seed must be an integer from 1–4,294,967,295.");
 const returns=bars.slice(1).map((b,i)=>b.close/bars[i].close-1),draws=randomGenerator(seed);
 const outcomes=[],samplePaths=[];
 for(let p=0;p<paths;p++){
  let value=100;
  const points=[{step:0,index:100}];
  for(let d=1;d<=days;d++){
   const r=returns[Math.floor(draws()*returns.length)];
   value*=1+r;
   if(!Number.isFinite(value)||value>1e18)throw Error("Bootstrap calculation exceeds supported numeric range.");
   if(p<3)points.push({step:d,index:f(value,5)});
  }
  outcomes.push(value);
  if(p<3)samplePaths.push({sample:p+1,points});
 }
 const sorted=outcomes.slice().sort((a,b)=>a-b);
 return {
  days,paths,seed,
  negativeOutcomes:outcomes.filter(x=>x<100).length,
  negativePercent:f(outcomes.filter(x=>x<100).length/paths*100,4),
  p05:f(quantile(sorted,.05),5),
  p50:f(quantile(sorted,.5),5),
  p95:f(quantile(sorted,.95),5),
  samplePaths,
  method:"Reproducible bootstrap samples historical daily returns with replacement; ignores regime shifts, correlation, fat tails, liquidity, taxes and fees. The percent of simulated down paths is not a forecast probability."
 };
}
export const SAMPLE_RISK_CSV=(()=>{
 const rows=["date,open,high,low,close,volume"];
 let last=100;
 for(let i=0;i<35;i++){
  const close=last*(1+0.02*Math.sin(i*.71)-0.007*Math.cos(i*.22));
  const date=new Date(Date.UTC(2026,0,1+i)).toISOString().slice(0,10);
  rows.push([date,last,Math.max(last,close)*1.01,Math.min(last,close)*.99,close,1000+i*11].map((x,j)=>j===0?x:String(Number(x.toFixed(7)))).join(","));
  last=close;
 }
 return rows.join("\n");
})();
