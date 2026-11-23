import {scenarioTools,calculateScenario} from "./scenario-core.mjs";
import {advancedTools,calculateAdvanced} from "./advanced-core.mjs";
/* CoinMetriq Research Studio: deterministic, local-only financial arithmetic.
   No live prices, private keys, custodial wallet connection, or investment advice. */
const fmt=(n,d=2)=>Number(n).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
const n=(v,key,{min=0,positive=false}={})=>{
 const x=Number(v?.[key]);
 if(v?.[key]===undefined||v?.[key]===null||String(v[key]).trim()===""||!Number.isFinite(x)||x<min||(positive&&x===0))throw Error("Enter a valid "+key+(positive?" greater than zero":"")+".");
 return x;
};
const safe=x=>{if(!Number.isFinite(x)||Math.abs(x)>1e30)throw Error("Result exceeds supported numeric range.");return x;};
const pct=(v,key)=>n(v,key,{min:0});
const rowList=(value,columns,max=5000)=>{
 const lines=String(value||"").trim().split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
 if(lines.length<1||lines.length>max)throw Error("Enter between 1 and "+max+" CSV rows.");
 return lines.map((line,i)=>{
  const parts=line.split(",").map(v=>v.trim());
  if(parts.length!==columns.length)throw Error("Line "+(i+1)+" must contain "+columns.join(", ")+".");
  return Object.fromEntries(columns.map((key,j)=>[key,parts[j]]));
 });
};
const result=(headline,detail,rows=[],summary=[])=>({headline,detail,rows,summary});
export const tools=[
 {slug:"trade-profit",title:"Crypto Trade Profit & Fee Calculator",short:"Buy price, sell price, quantity and percentage fees reveal actual hypothetical net gain.",formula:"Net = qty × sell × (1 − sell fee%) − qty × buy × (1 + buy fee%)",fields:[["buy","Buy price (USD)",100],["sell","Sell price (USD)",120],["qty","Token quantity",5],["buyFee","Buy fee (%)",0.5],["sellFee","Sell fee (%)",0.5]]},
 {slug:"average-entry",title:"Average Crypto Buy Price",short:"Calculate your weighted purchase cost including per-fill fees.",formula:"Average entry = sum(price × quantity + fee) ÷ sum(quantity)",textarea:"fills",example:"100,2,1\n120,3,2\n90,1,0.5",help:"One trade per line: price, quantity, fee in USD."},
 {slug:"dca-simulator",title:"Crypto DCA Simulator",short:"Compare contributions and units acquired from your own price sequence.",formula:"Total units = sum(contribution ÷ hypothetical price)",textarea:"purchases",example:"100,100\n80,100\n120,100\n90,150",help:"One purchase per line: token price USD, cash contribution USD. No historical prices are fetched.",fields:[["finalPrice","Hypothetical final token price (USD)",115]]},
 {slug:"portfolio-allocation",title:"Crypto Portfolio Allocation Analyzer",short:"Estimate current allocation and concentration from holdings you provide.",formula:"Asset value = quantity × manually entered price; allocation = asset value ÷ total value",textarea:"holdings",example:"BTC,0.04,80000\nETH,1.2,3000\nSOL,15,140",help:"One holding per line: asset name, quantity, manually entered USD price."},
 {slug:"drawdown",title:"Portfolio Maximum Drawdown Calculator",short:"Measure the largest historical peak-to-trough decline in your uploaded/entered portfolio values.",formula:"Drawdown = (running peak − current value) ÷ running peak",textarea:"series",example:"2026-01-01,1000\n2026-02-01,1400\n2026-03-01,980\n2026-04-01,1200",help:"One observation per line: YYYY-MM-DD, portfolio value USD. Enter dates in increasing order."},
 {slug:"risk-position-size",title:"Crypto Position Size by Risk",short:"Calculate maximum position units from hypothetical account risk and entry/stop prices.",formula:"Units = (account size × max loss%) ÷ absolute(entry − stop)",fields:[["account","Account size (USD)",10000],["riskPct","Maximum loss (%)",1],["entry","Entry price (USD)",100],["stop","Stop price (USD)",95]]},
 {slug:"staking-apy",title:"Staking APR and Compounding Calculator",short:"Illustrate how a hypothetical reward rate and compounding frequency change totals.",formula:"Final = principal × (1 + APR ÷ periods) ^ (periods × years)",fields:[["principal","Starting tokens",100],["apr","Nominal APR (%)",8],["periods","Compounding periods per year",12],["years","Years",2]]},
 {slug:"mining-cost",title:"Crypto Mining Electricity Cost",short:"Estimate electricity expense and hypothetical profit after a user-entered revenue estimate.",formula:"Electricity = power kW × operating hours × tariff",fields:[["watts","Power draw (watts)",1200],["hours","Operating hours",720],["tariff","Electricity price (USD/kWh)",0.12],["gross","Hypothetical revenue for same period (USD)",140],["other","Other period expense (USD)",15]]},
 {slug:"impermanent-loss",title:"Liquidity Pool Impermanent Loss",short:"Explore theoretical impermanent loss for a constant-product 50/50 pool (excluding fees).",formula:"IL = 2 × sqrt(price ratio) ÷ (1 + price ratio) − 1",fields:[["ratio","New price ÷ initial price",2]]},
 {slug:"token-unlock",title:"Token Unlock Dilution Scenario",short:"Model approximate ownership share change after additional token supply enters circulation.",formula:"Change in share = initial supply ÷ (initial supply + unlocked tokens) − 1",fields:[["supply","Initial circulating tokens",10000000],["unlock","Newly unlocked tokens",2500000]]}
 ,...advancedTools
 ,...scenarioTools
];
export function calculateStudio(slug,input){
 if(!tools.some(t=>t.slug===slug))throw Error("Unknown research calculator.");
 switch(slug){
 case "trade-profit":{
  const buy=n(input,"buy",{positive:true}),sell=n(input,"sell",{positive:true}),qty=n(input,"qty",{positive:true});
  const bf=pct(input,"buyFee"),sf=pct(input,"sellFee");
  if(bf>100||sf>100)throw Error("Fee percentages must not exceed 100%.");
  const cost=safe(buy*qty*(1+bf/100)),proceeds=safe(sell*qty*(1-sf/100)),net=safe(proceeds-cost);
  return result(fmt(net,4)+" USD "+(net>=0?"profit":"loss"),"The entry cost includes the buy fee; exit proceeds exclude the sell fee.",[],[["Initial cost",fmt(cost)+" USD"],["Exit proceeds",fmt(proceeds)+" USD"],["ROI on cost",fmt(net/cost*100)+"%"],["Break-even sell price",fmt(cost/(qty*(1-sf/100)))+" USD"]]);
 }
 case "average-entry":{
  const rows=rowList(input.fills,["price","qty","fee"]);let cost=0,units=0;
  rows.forEach((r,i)=>{const a=n(r,"price",{positive:true}),b=n(r,"qty",{positive:true}),fee=n(r,"fee");cost+=a*b+fee;units+=b;});
  safe(cost);safe(units);
  return result(fmt(cost/units,6)+" USD per token","Weighted average cost per token including explicitly entered absolute USD fees.",[],[["Purchases",String(rows.length)],["Total units",fmt(units,6)],["Total cost",fmt(cost)+" USD"]]);
 }
 case "dca-simulator":{
  const rows=rowList(input.purchases,["price","amount"]);let invested=0,units=0;
  rows.forEach(r=>{const price=n(r,"price",{positive:true}),cash=n(r,"amount",{positive:true});invested+=cash;units+=cash/price;});
  const final=n(input,"finalPrice",{positive:true}),value=safe(units*final);safe(invested);
  return result(fmt(value-invested)+" USD hypothetical P&L","Illustrative investment return using only the prices and contributions you entered; fees and taxes excluded.",[],[["Invested",fmt(invested)+" USD"],["Tokens acquired",fmt(units,8)],["Average cost",fmt(invested/units,6)+" USD"],["Hypothetical value",fmt(value)+" USD"],["Return",fmt((value/invested-1)*100)+"%"]]);
 }
 case "portfolio-allocation":{
  const rows=rowList(input.holdings,["asset","qty","price"],300);
  let holdings=rows.map(r=>{if(!/^[A-Za-z0-9 ._-]{1,36}$/.test(r.asset))throw Error("Asset names should be 1–36 letters, digits or simple punctuation.");return {asset:r.asset,qty:n(r,"qty",{positive:true}),price:n(r,"price",{positive:true})};});
  const seen=new Set(); for(const h of holdings){const k=h.asset.toLowerCase();if(seen.has(k))throw Error("Duplicate asset name: "+h.asset+". Combine its quantities.");seen.add(k);}
  const total=safe(holdings.reduce((sum,h)=>sum+h.qty*h.price,0));
  const out=holdings.map(h=>[h.asset,fmt(h.qty*h.price)+" USD",fmt(h.qty*h.price/total*100)+"%"]).sort((a,b)=>parseFloat(b[1].replaceAll(",",""))-parseFloat(a[1].replaceAll(",","")));
  const top=Math.max(...holdings.map(h=>h.qty*h.price/total*100));
  return result(fmt(total)+" USD total estimated value","Manual-price valuation. Displayed allocation is an estimate, not live market data.",out,[["Number of assets",String(holdings.length)],["Largest allocation",fmt(top)+"%"]]);
 }
 case "drawdown":{
  const observations=rowList(input.series,["date","value"],3000);let peak=0,worst=0,peakDate="",troughDate="",last="";
  observations.forEach(r=>{
   if(!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||Number.isNaN(Date.parse(r.date))||new Date(r.date+"T00:00:00Z").toISOString().slice(0,10)!==r.date)throw Error("Use valid ISO date (YYYY-MM-DD).");
   if(last&&r.date<=last)throw Error("Dates must be in strictly increasing order.");last=r.date;
   const value=n(r,"value",{positive:true});
   if(value>peak){peak=value;peakDate=r.date;}
   const decline=(peak-value)/peak;
   if(decline>worst){worst=decline;troughDate=r.date;}
  });
  return result(fmt(worst*100)+"% maximum drawdown","Worst observed fall from a running peak across the entered portfolio values. Past declines do not predict future losses.",[],[["Observations",String(observations.length)],["Latest observation",last],["Trough date",troughDate||"None"],["Final running peak",fmt(peak)+" USD"]]);
 }
 case "risk-position-size":{
  const account=n(input,"account",{positive:true}),pctRisk=pct(input,"riskPct"),entry=n(input,"entry",{positive:true}),stop=n(input,"stop",{positive:true});
  if(pctRisk<=0||pctRisk>100)throw Error("Risk percentage must be greater than zero and at most 100.");
  if(entry===stop)throw Error("Entry and stop prices must be different.");
  const loss=account*pctRisk/100,units=safe(loss/Math.abs(entry-stop));
  return result(fmt(units,6)+" units (hypothetical)","This simple scenario ignores trading gaps, slippage, volatility, fees and leverage. It is not a trade recommendation.",[],[["Risk budget",fmt(loss)+" USD"],["Notional exposure",fmt(units*entry)+" USD"],["Price difference",fmt(Math.abs(entry-stop))+" USD"]]);
 }
 case "staking-apy":{
  const amount=n(input,"principal",{positive:true}),apr=n(input,"apr"),periods=n(input,"periods",{positive:true}),years=n(input,"years",{positive:true});
  if(!Number.isInteger(periods)||periods>365||years>100||apr>10000)throw Error("Use whole compounding periods from 1–365, years ≤ 100 and APR ≤ 10,000%.");
  const ending=safe(amount*Math.pow(1+apr/100/periods,periods*years));
  return result(fmt(ending-amount,6)+" hypothetical tokens earned","Illustrative compounding only. Actual staking rewards, price, slashing, lockups, custody risk and taxes can differ.",[],[["Ending tokens",fmt(ending,6)],["Effective annual yield",fmt((Math.pow(1+apr/100/periods,periods)-1)*100)+"%"]]);
 }
 case "mining-cost":{
  const kw=n(input,"watts")/1000,hours=n(input,"hours"),tariff=n(input,"tariff"),gross=n(input,"gross"),other=n(input,"other");
  if(hours>87600)throw Error("Use at most 87,600 hours.");
  const electric=safe(kw*hours*tariff),net=safe(gross-electric-other);
  return result(fmt(net)+" USD estimated period profit/loss","Hypothetical revenue comes from your input, not a live network mining-reward feed.",[],[["Electricity",fmt(electric)+" USD"],["Other costs",fmt(other)+" USD"],["Gross revenue",fmt(gross)+" USD"],["Energy use",fmt(kw*hours)+" kWh"]]);
 }
 case "impermanent-loss":{
  const ratio=n(input,"ratio",{positive:true});
  const il=safe((2*Math.sqrt(ratio)/(1+ratio)-1)*100);
  return result(fmt(il,4)+"% estimated impermanent loss","Relative to holding a 50/50 pair for a constant-product pool, before trading fees, funding and protocol risks.",[],[["Price ratio",fmt(ratio,4)],["Loss vs holding",fmt(Math.abs(il),4)+"%"]]);
 }
 case "token-unlock":{
  const supply=n(input,"supply",{positive:true}),unlock=n(input,"unlock");
  const change=safe((supply/(supply+unlock)-1)*100);
  return result(fmt(Math.abs(change))+"% illustrative ownership dilution","Simplified constant-holdings share of supply. This does not predict token price.",[],[["Initial supply",fmt(supply,0)],["New total supply",fmt(supply+unlock,0)],["Share of new supply vs old",fmt(supply/(supply+unlock)*100)+"%"]]);
 }
 }
 return scenarioTools.some(t=>t.slug===slug)?calculateScenario(slug,input):calculateAdvanced(slug,input);
}
