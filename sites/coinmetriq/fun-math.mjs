/* Pure on-device scenario engines for two original shareable crypto games.
 * They use fictional/user-entered numbers, no blockchain prices or signals.
 */
const check=(value,key,{positive=false,integer=false,max=1e15}={})=>{
 if(value===undefined||value===null||String(value).trim()==="")throw Error("Missing "+key);
 const n=Number(value);
 if(!Number.isFinite(n)||(positive&&n<=0)||n<0||n>max||(integer&&!Number.isSafeInteger(n)))throw Error("Invalid "+key);
 return n;
};
export function miningCostStory({watts,hours,tariff,revenue}){
 const power=check(watts,"watts",{positive:true,max:1e7});
 const duration=check(hours,"hours",{positive:true,max:87600});
 const unitCost=check(tariff,"electricity tariff",{max:1e5});
 const gross=check(revenue,"fictional gross revenue",{max:1e12});
 const totalKwh=power*duration/1000,expense=totalKwh*unitCost,net=gross-expense;
 if(!Number.isFinite(totalKwh)||!Number.isFinite(expense)||!Number.isFinite(net)||Math.abs(net)>1e18)throw Error("Calculation exceeds supported limits.");
 const steps=Math.min(60,Math.ceil(duration/24)),points=[];
 for(let i=0;i<=steps;i++){
  const used=Math.min(duration,i*duration/steps),ratio=used/duration;
  points.push({step:i,hours:Number(used.toFixed(5)),energy:totalKwh*ratio,cost:expense*ratio,revenue:gross*ratio});
 }
 return {totalKwh,expense,gross,net,points,
  note:"This animation linearly distributes entered total hypothetical revenue across the operating hours. Actual block rewards and electricity tariffs can change abruptly; no mining earnings are predicted."};
}
export function tokenUnlockStory({initial,unlockPerRound,rounds,holding}){
 const supply=check(initial,"initial circulating units",{positive:true,max:1e15});
 const unlock=check(unlockPerRound,"new unlocked units per round",{max:1e15});
 const count=check(rounds,"number of rounds",{positive:true,integer:true,max:24});
 const tokens=check(holding,"unchanged holder balance",{positive:true,max:1e15});
 if(tokens>supply)throw Error("Example holder balance cannot exceed the initial circulating supply.");
 const points=[];
 for(let period=0;period<=count;period++){
  const total=supply+period*unlock;
  if(!Number.isFinite(total)||total>1e18)throw Error("Projected fictional supply exceeds supported range.");
  points.push({step:period,supply:total,holding:tokens,sharePct:tokens/total*100});
 }
 const original=tokens/supply*100,end=points.at(-1).sharePct;
 return {rounds:count,initialSupply:supply,finalSupply:points.at(-1).supply,unlockTotal:unlock*count,
  startSharePct:original,endSharePct:end,relativeDilutionPct:(1-end/original)*100,
  points,note:"Equal fictional unlock rounds only. Actual vesting, token burns, circulating supply methodology and market prices require independent primary documents."};
}
