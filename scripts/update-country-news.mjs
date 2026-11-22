import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {parseFeed,curateNews} from "./techorvia-news-core.mjs";
import {tagCountries} from "./country-tags.mjs";
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const SITES=["worldorixa"];
const sources=[
 {name:"The Guardian World",url:"https://www.theguardian.com/world/rss",sites:["worldorixa"]},
 {name:"The Guardian Environment",url:"https://www.theguardian.com/environment/rss",sites:["worldorixa"]},
 {name:"The Guardian Science",url:"https://www.theguardian.com/science/rss",sites:["worldorixa"]},
 {name:"The Guardian Business",url:"https://www.theguardian.com/business/rss",sites:["worldorixa"]},
 {name:"The Business Standard Bangladesh",url:"https://www.tbsnews.net/bangladesh/rss.xml",country:"BD",sites:["worldorixa"]}
];
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
    // WorldOrixa reports international and country-specific events.
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
