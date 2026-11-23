/* Additional local crypto research scenario arithmetic — not market forecasts. */
const valid=(v,name,{positive=false,nonnegative=false}={})=>{
 if(v===undefined||v===null||String(v).trim()==="")throw Error("Missing "+name);
 const n=Number(v);if(!Number.isFinite(n)||Math.abs(n)>1e15||(positive&&n<=0)||(nonnegative&&n<0))throw Error("Invalid "+name);
 return n;
};
const fmt=(v,d=2)=>Number(v).toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
const result=(headline,detail,rows=[],summary=[])=>({headline,detail,rows,summary});
export const scenarioTools=[
 {slug:"trade-expectancy",title:"Crypto Trade Expectancy & Risk/Reward",short:"Estimate an arithmetic expected outcome from hypothetical win rate, average win and average loss.",formula:"Expected value = win% × average net win − loss% × average net loss",fields:[["win","Hypothetical profitable trades (%)",45],["gain","Average net profit of winner (USD)",150],["loss","Average net loss of loser (USD)",100],["count","Hypothetical number of trades",50]]},
 {slug:"leverage-shock",title:"Leverage Price Shock & Margin Risk",short:"Explore gross price-shock P&L and a simple margin wipeout threshold; NOT an exchange liquidation quote.",formula:"Gross P&L = margin × leverage × signed price change",fields:[["margin","Initial margin USD",1000],["leverage","Leverage multiple",3],["move","Hypothetical price move (%)",-20],["direction","Direction (1 long / -1 short)",1]]},
 {slug:"mining-roi",title:"Mining Hardware Break-even Scenario",short:"Compare hypothetical mining revenue, electricity consumption, recurring expenses and hardware cost.",formula:"Operating margin/day = revenue − (power kW × 24 × tariff) − other costs",fields:[["hardware","Initial hardware expense USD",2500],["watts","Continuous power draw W",1200],["tariff","Price per kWh USD",0.12],["revenue","Hypothetical daily gross revenue USD",12],["other","Other daily cost USD",1],["days","Scenario duration (days)",365]]},
 {slug:"portfolio-stress-test",title:"Asset-by-Asset Portfolio Stress Test",short:"Apply simultaneous user-selected price shocks to a manually entered portfolio.",formula:"Scenario total = sum(asset current value × (1 + hypothetical shock%))",textarea:"shocks",example:"BTC,3200,-30\nETH,3600,-45\nSOL,2100,20",help:"One asset per line: asset,current value USD,hypothetical shock percentage. This is not a market prediction."}
];
export function calculateScenario(slug,input){
 switch(slug){
  case "trade-expectancy":{
   const win=valid(input.win,"win rate",{nonnegative:true}),gain=valid(input.gain,"average win",{nonnegative:true}),loss=valid(input.loss,"average loss",{nonnegative:true}),count=valid(input.count,"trade count",{positive:true});
   if(win>100||!Number.isInteger(count)||count>1e7||gain+loss===0)throw Error("Use win rate 0–100%, nonzero payoff and whole trade count ≤10 million.");
   const ev=win/100*gain-(1-win/100)*loss;
   return result(fmt(ev,4)+" USD hypothetical expectancy per trade","A weighted arithmetic average from chosen assumptions. Actual trades are neither independent nor guaranteed to match the given win probability.",[],[["Expected total",fmt(ev*count)+" USD"],["Break-even win rate",fmt(loss/(gain+loss)*100,2)+"%"],["Wins assumed",fmt(win,1)+"%"]]);
  }
  case "leverage-shock":{
   const margin=valid(input.margin,"margin",{positive:true}),leverage=valid(input.leverage,"leverage",{positive:true}),move=valid(input.move,"price move"),direction=valid(input.direction,"direction");
   if(leverage>100||move<-100||move>1000||![-1,1].includes(direction))throw Error("Leverage 1–100, price move -100% to +1000%, direction 1/-1.");
   const exposure=margin*leverage,pnl=exposure*move/100*direction,equity=margin+pnl;
   const wipeout=(direction===1?-100/leverage:100/leverage);
   return result(fmt(equity,2)+" USD scenario equity","A teaching model of gross leveraged P&L, ignoring funding, collateral changes, maintenance margin, exchange liquidation engine and fees. Actual liquidation can occur BEFORE margin reaches zero.",[],[["Gross position exposure",fmt(exposure)+" USD"],["Illustrative gross P&L",fmt(pnl)+" USD"],["Simple margin wipeout price move",fmt(wipeout,2)+"% (not liquidation price)"],["Direction",direction===1?"LONG":"SHORT"]]);
  }
  case "mining-roi":{
   const hardware=valid(input.hardware,"hardware cost",{nonnegative:true}),watts=valid(input.watts,"watts",{positive:true}),tariff=valid(input.tariff,"tariff",{nonnegative:true}),revenue=valid(input.revenue,"revenue",{nonnegative:true}),other=valid(input.other,"other costs",{nonnegative:true}),days=valid(input.days,"days",{positive:true});
   if(!Number.isInteger(days)||days>36500||watts>1e7)throw Error("Enter whole scenario days ≤36,500 and power ≤10 MW.");
   const dailyPower=watts/1000*24,electricity=dailyPower*tariff,margin=revenue-electricity-other,net=margin*days-hardware;
   if(!Number.isFinite(net))throw Error("Result too large.");
   return result(fmt(net)+" USD hypothetical after hardware costs","Illustrative constant revenue, power and daily costs only. Difficulty, block rewards, downtime, taxes and equipment depreciation may change realized performance.",[],[["Daily electricity use",fmt(dailyPower)+" kWh"],["Daily electricity cost",fmt(electricity)+" USD"],["Daily net margin",fmt(margin)+" USD"],["Hardware break-even",margin>0?fmt(hardware/margin,1)+" days":"Not reached at entered inputs"]]);
  }
  case "portfolio-stress-test":{
   const lines=String(input.shocks||"").trim().split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
   if(!lines.length||lines.length>100)throw Error("Enter 1–100 asset rows.");
   let initial=0,after=0;const used=new Set(),rows=[];
   for(const [i,line] of lines.entries()){
    const parts=line.split(",").map(x=>x.trim());
    if(parts.length!==3)throw Error("Row "+(i+1)+" requires asset,value,shock.");
    const [asset,valueRaw,shockRaw]=parts;
    if(!/^[a-z0-9._-]{1,20}$/i.test(asset)||used.has(asset.toUpperCase()))throw Error("Use unique asset symbols.");
    used.add(asset.toUpperCase());
    const value=valid(valueRaw,"asset value",{nonnegative:true}),shock=valid(shockRaw,"price shock");
    if(shock<-100||shock>1000)throw Error("Scenario shocks supported from -100% to +1000%.");
    initial+=value;const final=value*(1+shock/100);after+=final;
    rows.push([asset.toUpperCase(),fmt(value)+" USD",fmt(shock)+"% / "+fmt(final)+" USD"]);
   }
   if(initial<=0||!Number.isFinite(after))throw Error("Portfolio total must be positive and finite.");
   return result(fmt(after-initial)+" USD hypothetical portfolio change","Simultaneous scenario shocks only; no forecast or correlation model. Other costs and withdrawals are excluded.",rows,[["Starting portfolio",fmt(initial)+" USD"],["Hypothetical ending value",fmt(after)+" USD"],["Change percentage",fmt((after/initial-1)*100,2)+"%"]]);
  }
  default:throw Error("Unknown scenario.");
 }
}
