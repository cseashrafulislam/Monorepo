import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {parseFeed,curateNews} from "./techorvia-news-core.mjs";
import {tagCountries} from "./country-tags.mjs";
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const SITES=["coinmetriq","earthviora","solarqentra","moneyavora","industryluma","worldorixa","vitaloryx","edunovira","lifealora"];
const sources=[
 {name:"The Guardian World",url:"https://www.theguardian.com/world/rss",sites:["worldorixa"]},
 {name:"The Guardian Environment",url:"https://www.theguardian.com/environment/rss",sites:["earthviora","worldorixa"]},
 {name:"The Guardian Science",url:"https://www.theguardian.com/science/rss",sites:["earthviora","vitaloryx","worldorixa"]},
 {name:"The Guardian Education",url:"https://www.theguardian.com/education/rss",sites:["edunovira"]},
 {name:"The Guardian Business",url:"https://www.theguardian.com/business/rss",sites:["moneyavora","worldorixa"]},
 {name:"The Guardian Travel",url:"https://www.theguardian.com/travel/rss",sites:["lifealora"]},
 {name:"NASA Earth Observatory",url:"https://earthobservatory.nasa.gov/feeds/image-of-the-day.rss",sites:["earthviora"]},
 {name:"pv magazine",url:"https://www.pv-magazine.com/feed/",sites:["solarqentra"]},
 {name:"CleanTechnica",url:"https://cleantechnica.com/feed/",sites:["solarqentra","industryluma"]},
 {name:"Cointelegraph",url:"https://cointelegraph.com/rss",sites:["coinmetriq"]},
 {name:"CoinDesk",url:"https://www.coindesk.com/arc/outboundfeeds/rss/",sites:["coinmetriq"]},
 {name:"The Business Standard Bangladesh",url:"https://www.tbsnews.net/bangladesh/rss.xml",country:"BD",sites:SITES}
];
const localKeywords={
 coinmetriq:/bitcoin|crypto|blockchain|digital.asset|coin|token|financial.technology|fintech/i,
 earthviora:/climate|flood|earthquake|cyclone|river|weather|temperature|air.pollution|environment|coast|warming|বন্যা|পরিবেশ|ভূমিকম্প/i,
 solarqentra:/solar|renewable|electricity|energy|power.grid|ev.charging|battery|বিদ্যুৎ|সৌর|জ্বালানি/i,
 moneyavora:/economy|bank|inflation|interest.rate|investment|finance|market|budget|tax|trade|অর্থনীতি|ব্যাংক|বাজার|কর/i,
 industryluma:/manufactur|factory|industrial|recycling|plastic|textile|garment|agriculture|production|supply.chain|কারখানা|শিল্প|কৃষি/i,
 worldorixa:/.+/,
 vitaloryx:/health|hospital|medicine|disease|diet|nutrition|medical|wellness|vaccin|স্বাস্থ্য|হাসপাতাল|রোগ|চিকিৎসা/i,
 edunovira:/education|school|college|university|student|exam|teacher|scholarship|job|training|শিক্ষা|বিশ্ববিদ্যালয়|পরীক্ষা|চাকরি|ভর্তি/i,
 lifealora:/travel|tourism|visa|flight|hotel|home|house|living|migration|holiday|পর্যটন|ভ্রমণ|ভিসা|বাড়ি/i
};
const out=Object.fromEntries(SITES.map(id=>[id,[]]));
let success=0;
for(const source of sources){
 try{
  const response=await fetch(source.url,{signal:AbortSignal.timeout(14000),headers:{"Accept":"application/rss+xml, application/atom+xml, text/xml","User-Agent":"IndependentNewsReader/1.0"}});
  if(!response.ok)throw Error("HTTP "+response.status);
  const xml=await response.text();if(xml.length>2500000||!/<(?:rss|feed|rdf:RDF)\b/i.test(xml.slice(0,1000)))throw Error("Invalid or oversized RSS/XML");
  const items=parseFeed(xml,source);if(!items.length)throw Error("No validated recent RSS entries");
  success++;let used=0;
  for(const site of source.sites){
   for(const item of items){
    if(source.country && !localKeywords[site].test(item.title+" "+item.summary))continue;
    out[site].push({...item,countries:tagCountries(item.title,source.country||null)});
    used++;
   }
  }
  console.log("[OK] "+source.name+": "+items.length+" valid entries");
 }catch(err){console.warn("[WARN] "+source.name+": "+err.message);}
}
if(success===0)throw Error("No news sources responded successfully; retaining previous country news.");
const now=new Date();
for(const site of SITES){
 const p=path.join(ROOT,"sites",site,"news.json");
 let previous=[];try{previous=JSON.parse(fs.readFileSync(p,"utf8")).items||[];}catch{}
 const items=curateNews([...out[site],...previous],now).slice(0,100).map(x=>({
  title:x.title,url:x.url,date:x.date,source:x.source,
  summary:String(x.summary||"").slice(0,230),countries:Array.isArray(x.countries)?x.countries:tagCountries(x.title)
 }));
 const content=JSON.stringify({updatedAt:now.toISOString(),items},null,2)+"\n";
 if(JSON.stringify(items)!==JSON.stringify(previous))fs.writeFileSync(p,content,"utf8");
 console.log("[DATA] "+site+": "+items.length+" recent verified links");
}
