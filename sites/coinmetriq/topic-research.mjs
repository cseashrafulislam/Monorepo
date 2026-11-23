/* CoinMetriq research library: distinct sourced, worked educational notes.
   Review-only topics stay noindex. Do not use this file as a live market API. */
import fs from "node:fs";
const data=["a","b","c"].flatMap(part=>JSON.parse(fs.readFileSync(new URL("./topic-research-"+part+".json",import.meta.url),"utf8")));
if(data.length!==30)throw Error("CoinMetriq topic research registry must retain 30 existing topics.");
export const topicResearch=new Map();
for(const item of data){
 if(topicResearch.has(item.slug))throw Error("Duplicate research topic "+item.slug);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)||!["published","review"].includes(item.status))throw Error("Invalid topic status or slug "+item.slug);
 for(const key of ["title","question","method","example","interpretation","limitations"])if(String(item[key]??"").length<140&&key!=="title")throw Error("Substantive original field missing: "+item.slug+" / "+key);
 if(!Array.isArray(item.sources)||!item.sources.length||item.sources.some(([label,url])=>!label||!/^https:\/\//.test(url)))throw Error("Verified reference URL requirement missing "+item.slug);
 if(!item.tool?.startsWith("/")||item.tool.includes("//"))throw Error("Invalid related product route "+item.slug);
 topicResearch.set(item.slug,item);
}
export function applyCoinMetriqResearchStatus(topics){
 const observed=new Set();
 for(const topic of topics){
  const item=topicResearch.get(topic.slug);
  if(!item)throw Error("Missing distinct research editorial item for "+topic.slug);
  observed.add(item.slug);
  topic.editorialReviewed=item.status==="published";
  topic.sources=item.sources;
  topic.researchStatus=item.status;
 }
 if(observed.size!==topicResearch.size)throw Error("Unexpected topic research slug not in original topics.json.");
 return {total:observed.size,published:[...topicResearch.values()].filter(x=>x.status==="published").length,review:[...topicResearch.values()].filter(x=>x.status==="review").length};
}
