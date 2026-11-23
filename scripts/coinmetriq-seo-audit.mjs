/* Offline CoinMetriq SEO + broken-route QA. Run AFTER npm run build:all.
 * No paid scanner, live API, or claim of Search Console indexing. */
import fs from "node:fs";
import path from "node:path";
import {topicResearch} from "../sites/coinmetriq/topic-research.mjs";
const root=path.resolve("dist/coinmetriq"),site="coinmetriq";
const bad=[],warn=[];
if(!fs.existsSync(root))throw Error("Run npm run build:all before SEO audit.");
const paths=[];
function walk(dir){
 for(const name of fs.readdirSync(dir)){
  const item=path.join(dir,name);
  if(fs.statSync(item).isDirectory())walk(item);
  else if(item.endsWith("/index.html")||name==="404.html")paths.push(item);
 }
}
walk(root);
const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
const base=urls[0]?.replace(/\/$/,"");
if(!base?.startsWith("https://"))bad.push("Missing valid HTTPS base from sitemap");
const canonicalMap=new Map(),titles=new Map(),contentFiles=new Map();
for(const file of paths){
 const relative=path.relative(root,file).replaceAll(path.sep,"/");
 const route=relative==="index.html"?"/":relative==="404.html"?"/404.html":"/"+relative.slice(0,-"index.html".length);
 const html=fs.readFileSync(file,"utf8");
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
 const title=html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
 const robots=html.match(/<meta name="robots" content="([^"]+)"/)?.[1]??"";
 if(!title||!canonical)bad.push(route+" missing title or canonical");
 else{
  const duplicate=titles.get(title);if(duplicate)bad.push("Duplicate page title: "+duplicate+" and "+route);
  titles.set(title,route);
  const old=canonicalMap.get(canonical);if(old)bad.push("Duplicate canonical: "+old+" and "+route);
  canonicalMap.set(canonical,route);
 }
 if(canonical!==base+route)bad.push(route+" canonical mismatch (check PUBLIC_SITE_URL)");
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1&&route!=="/404.html")bad.push(route+" should have exactly one H1");

 if(!robots.includes("noindex")&&route!=="/404.html"&&!urls.includes(base+route))bad.push(route+" indexable but omitted from sitemap");
 if(robots.includes("noindex")&&urls.includes(base+route))bad.push(route+" noindex URL appears in sitemap");
 for(const hit of html.matchAll(/href="(\/[^"]*)"/g)){
  const raw=hit[1],target=raw.split(/[?#]/)[0];
  if(!target||target==="/news/"||target.startsWith("/news/"))continue; // existing legacy _redirects
  const dest=target.startsWith("/assets/")?path.join(root,target):path.join(root,target,"index.html");
  const alternate=path.join(root,target);
  if(!fs.existsSync(dest)&&!fs.existsSync(alternate))bad.push(route+" broken internal link: "+raw);
 }
 for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
  try{JSON.parse(m[1]);}catch{bad.push(route+" has invalid structured-data JSON");}
 }
 contentFiles.set(route,html);
}
const uniqueUrls=new Set(urls);
if(uniqueUrls.size!==urls.length)bad.push("Sitemap contains duplicate loc entries");
for(const loc of urls){
 if(!loc.startsWith(base+"/"))bad.push("Sitemap cross-domain URL "+loc);
 const route=loc.slice(base.length);
 if(!contentFiles.has(route))bad.push("Sitemap route not emitted: "+route);
}
const topics=[...contentFiles.keys()].filter(x=>x.startsWith("/topics/")&&x!=="/topics/");
if(topics.length!==30)bad.push("Expected to preserve 30 independent topic pages, found "+topics.length);
let publishedTopics=0,reviewOnlyTopics=0;
for(const route of topics){
 const slug=route.split("/")[2],research=topicResearch.get(slug),html=contentFiles.get(route);
 if(!research){bad.push("Unknown research content for "+route);continue;}
 if(!html?.includes(research.title))bad.push(route+" is missing original researched heading.");
 if(!html?.includes("A clearly fictional worked example"))bad.push(route+" has no worked example.");
 if(!html?.includes('href="'+research.tool+'"'))bad.push(route+" missing related working tool link.");
 for(const [label,url] of research.sources)if(!html.includes(url))bad.push(route+" missing original source "+url);
 if(research.status==="published"){
  publishedTopics++;
  if(!html.includes('content="index,follow"'))bad.push(route+" published guide must be indexable.");
  if(!urls.includes(base+route))bad.push(route+" published guide omitted from sitemap.");
  if(!html.includes('"@type":"Article"'))bad.push(route+" requires Article JSON-LD.");
 }else{
  reviewOnlyTopics++;
  if(!html.includes('content="noindex,follow"'))bad.push(route+" source-sensitive guide must stay noindex.");
  if(urls.includes(base+route))bad.push(route+" review-only guide appears in sitemap.");
 }
}
if(publishedTopics!==27||reviewOnlyTopics!==3)bad.push("Research editorial breakdown should be 27 indexed + 3 noindex, observed "+publishedTopics+" + "+reviewOnlyTopics+".");
if(!contentFiles.has("/portfolio/backups/")||!contentFiles.has("/fun/")||!contentFiles.has("/studio/")||!contentFiles.has("/articles/"))bad.push("Missing CoinMetriq key route");
for(const asset of ["cm-studio.js","cm-portfolio.js","cm-studio.css","cm-portfolio.css","ledger-core.mjs","market-core.mjs","risk-core.mjs","issuance-core.mjs","backup-core.mjs","fun-math.mjs","scenario-core.mjs"]){
 if(!fs.existsSync(path.join(root,"assets",asset)))bad.push("Missing linked client asset "+asset);
}
console.log(JSON.stringify({site,pages:paths.length,indexableSitemapUrls:urls.length,publishedOriginalTopicGuides:publishedTopics,unindexedSensitiveTopicGuides:reviewOnlyTopics,errors:bad.length,warnings:warn.length,examples:warn.slice(0,3)},null,2));
if(bad.length){console.error(bad.slice(0,35).join("\n"));process.exitCode=1;}
