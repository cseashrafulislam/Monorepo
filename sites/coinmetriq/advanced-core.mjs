// Additional CoinMetriq browser-only scenarios. No API, wallet or live market prices.
const fmt=(x,d=2)=>Number(x).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
const number=(x,label,positive=true)=>{
 if(x===undefined||x===null||String(x).trim()==="")throw Error("Missing "+label+".");
 const n=Number(x);if(!Number.isFinite(n)||(positive?n<=0:n<0)||Math.abs(n)>1e24)throw Error("Invalid "+label+".");
 return n;
};
const csv=(value,columns)=>{
 const lines=String(value||"").trim().split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 if(!lines.length||lines.length>3000)throw Error("Enter 1 to 3000 rows.");
 return lines.map((line,i)=>{
  const values=line.split(",").map(x=>x.trim());
  if(values.length!==columns.length)throw Error("Row "+(i+1)+" requires "+columns.join(", ")+".");
  return Object.fromEntries(columns.map((key,j)=>[key,values[j]]));
 });
};
const date=(s)=>{
 const str=String(s||"").trim(),ms=Date.parse(str+"T00:00:00Z");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(str)||!Number.isFinite(ms)||new Date(ms).toISOString().slice(0,10)!==str)throw Error("Use valid YYYY-MM-DD dates.");
 return ms;
};
const result=(headline,detail,rows=[],summary=[])=>({headline,detail,rows,summary});
export const advancedTools=[
 {slug:"portfolio-rebalancer",title:"Crypto Portfolio Rebalancing Planner",short:"Compare current USD asset values to user-selected allocation targets.",formula:"Target asset value = total portfolio value × desired weight",textarea:"allocation",example:"BTC,3200,50\nETH,3600,35\nSOL,2100,15",help:"One asset per line: asset name, current USD value, target percent. Target percents must total 100%."},
 {slug:"lump-sum-vs-dca",title:"Lump Sum vs Crypto DCA",short:"Compare two hypothetical entry schedules using your own sample prices.",formula:"Lump units = budget ÷ first price; DCA units = sum(equal contributions ÷ price)",textarea:"prices",example:"100\n80\n120\n90",help:"One positive hypothetical price per line; no prices are fetched.",fields:[["budget","Investment budget (USD)",400],["finalPrice","Hypothetical exit price (USD)",110]]},
 {slug:"daily-volatility",title:"Historical Daily Crypto Volatility",short:"Calculate sample daily and annualized price-return variation for consecutive dates.",formula:"Annualized volatility = sample SD(daily simple returns) × sqrt(365)",textarea:"series",example:"2026-11-01,100\n2026-11-02,105\n2026-11-03,98\n2026-11-04,102",help:"One row for each consecutive calendar day: YYYY-MM-DD, asset price."},
 {slug:"slippage-fees",title:"Crypto Slippage and Fees",short:"See an illustrative purchase cost when execution slippage and a percentage fee are added.",formula:"Total = quoted price × quantity × (1 + slippage%) × (1 + fee%)",fields:[["price","Quoted unit price USD",100],["qty","Units",10],["slippage","Slippage (%)",0.5],["fee","Exchange fee (%)",0.1]]},
 {slug:"stablecoin-peg",title:"Stablecoin Price/Peg Deviation",short:"Compare user-entered observations against a chosen stablecoin benchmark.",formula:"Deviation = (observed price ÷ target price − 1) × 100%",textarea:"observations",example:"2026-11-01,1.001\n2026-11-02,0.992\n2026-11-03,1.003",help:"One row: YYYY-MM-DD, observed price. Do not mistake for live pricing.",fields:[["target","Target price USD",1]]}
];
export function calculateAdvanced(slug,input){
 switch(slug){
  case "portfolio-rebalancer":{
   const rows=csv(input.allocation,["asset","value","target"]);
   if(rows.length<2)throw Error("Enter at least 2 asset rows.");
   const seen=new Set(),items=rows.map(r=>{
    const asset=String(r.asset||"").trim();
    if(!/^[a-z0-9 ._-]{1,36}$/i.test(asset)||seen.has(asset.toLowerCase()))throw Error("Asset names must be unique and use simple characters.");
    seen.add(asset.toLowerCase());
    const value=number(r.value,"asset value",false),target=number(r.target,"target percent",false);
    if(target>100)throw Error("Target percent cannot exceed 100.");
    return {asset,value,target};
   });
   const total=items.reduce((s,x)=>s+x.value,0),targets=items.reduce((s,x)=>s+x.target,0);
   if(total<=0)throw Error("Total portfolio value must be positive.");
   if(Math.abs(targets-100)>0.001)throw Error("Targets must total 100%.");
   const differences=items.map(x=>{const change=total*x.target/100-x.value;
     return [x.asset,fmt(x.value)+" USD",fmt(x.target)+"%",(change>=0?"+":"")+fmt(change)+" USD"];
   });
   return result(fmt(total)+" USD allocation plan","Notional adjustment only; exchange min lots, liquidity, taxes and trading fees not included.",differences,[["Assets",String(items.length)],["Target sum",fmt(targets)+"%"]]);
  }
  case "lump-sum-vs-dca":{
   const prices=csv(input.prices,["price"]).map(r=>number(r.price,"price"));
   if(prices.length<2)throw Error("Enter at least 2 sample prices.");
   const budget=number(input.budget,"budget"),end=number(input.finalPrice,"final price");
   const lumpUnits=budget/prices[0],dcaUnits=prices.reduce((s,p)=>s+budget/prices.length/p,0);
   const difference=(dcaUnits-lumpUnits)*end;
   return result(fmt(difference)+" USD DCA minus lump sum","Both scenarios use exactly the same budget and only your hypothetical prices. Neither is guaranteed to perform better.",[],[["Lump sum final value",fmt(lumpUnits*end)+" USD"],["DCA final value",fmt(dcaUnits*end)+" USD"],["Periods",String(prices.length)]]);
  }
  case "daily-volatility":{
   const rows=csv(input.series,["date","price"]);if(rows.length<4)throw Error("Enter at least 4 daily prices.");
   let lastTime=null;
   const prices=rows.map(r=>{
    const time=date(r.date);
    if(lastTime!==null&&time-lastTime!==86400000)throw Error("Dates must be consecutive calendar days.");
    lastTime=time;return number(r.price,"price");
   });
   const rates=prices.slice(1).map((p,i)=>p/prices[i]-1);
   const mean=rates.reduce((a,b)=>a+b,0)/rates.length;
   const sd=Math.sqrt(rates.reduce((a,b)=>a+(b-mean)**2,0)/(rates.length-1));
   return result(fmt(sd*Math.sqrt(365)*100,4)+"% annualized volatility","Sample standard deviation from consecutive daily simple returns. Historical volatility cannot predict next-day moves.",[],[["Daily sample volatility",fmt(sd*100,4)+"%"],["Daily return observations",String(rates.length)]]);
  }
  case "slippage-fees":{
   const price=number(input.price,"price"),qty=number(input.qty,"quantity");
   const slip=number(input.slippage,"slippage",false),fee=number(input.fee,"fee",false);
   if(slip>100||fee>100)throw Error("Fee or slippage above 100% is not supported.");
   const quoted=price*qty,total=quoted*(1+slip/100)*(1+fee/100);
   if(!Number.isFinite(total))throw Error("Values too large.");
   return result(fmt(total-quoted,4)+" USD additional cost","Illustrative buy cost from manual execution assumptions, not a real exchange offer.",[],[["Quoted notional",fmt(quoted)+" USD"],["Simulated total",fmt(total)+" USD"],["Effective price",fmt(total/qty,6)+" USD"]]);
  }
  case "stablecoin-peg":{
   const target=number(input.target,"target price");
   const rows=csv(input.observations,["date","price"]);let last=0,max=0,at="",lastPrice=0;
   for(const r of rows){
    const day=date(r.date);
    if(day<=last)throw Error("Observation dates must be increasing.");last=day;
    const price=number(r.price,"observed price");
    const deviation=Math.abs(price/target-1)*100;
    if(deviation>max){max=deviation;at=r.date;}
    lastPrice=price;
   }
   return result(fmt(max,4)+"% maximum absolute peg deviation","User-entered price observations, not a real-time stablecoin quote or issuer-reserve assessment.",[],[["Latest entered price",fmt(lastPrice,6)+" USD"],["Maximum deviation date",at||rows[0].date],["Observations",String(rows.length)]]);
  }
  default:throw Error("Unknown advanced calculator.");
 }
}
