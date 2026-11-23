/* Editorial preflight for CoinMetriq: reviewed source-backed articles only.
 * Static JSON is the authoring interface. Build never publishes drafts.
 */
import fs from "node:fs";
import path from "node:path";
const data=JSON.parse(fs.readFileSync("sites/coinmetriq/articles.json","utf8"));
if(data.schemaVersion!==1||!Array.isArray(data.articles))throw Error("Invalid catalog version.");
const slugs=new Set(),failures=[];
const validDate=date=>{
 if(!/^\d{4}-\d{2}-\d{2}$/.test(String(date||"")))return false;
 const ms=Date.parse(date+"T00:00:00Z");
 return Number.isFinite(ms)&&new Date(ms).toISOString().slice(0,10)===date;
};
for(const article of data.articles){
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)||slugs.has(article.slug))failures.push("Duplicate or invalid slug: "+article.slug);
 slugs.add(article.slug);
 if(!["draft","published"].includes(article.status))failures.push(article.slug+" must have draft/published status");
 if(article.status!=="published")continue;
 if(!validDate(article.publishedAt))failures.push(article.slug+" missing valid publishedAt");
 if(String(article.title||"").length<35||String(article.excerpt||"").length<50)failures.push(article.slug+" needs descriptive unique title/excerpt");
 if(!Array.isArray(article.paragraphs)||article.paragraphs.length<4||article.paragraphs.some(p=>!Array.isArray(p)||p.length!==2||p[0].length<5||p[1].length<110))failures.push(article.slug+" requires four substantial original sections");
 if(!article.href?.startsWith("/")||article.href.includes("//")||article.href.includes(".."))failures.push(article.slug+" must link its own real tool");
 if(!Array.isArray(article.sources)||!article.sources.length||article.sources.some(x=>!Array.isArray(x)||x.length!==2||!x[0]||!/^https:\/\//.test(x[1])))failures.push(article.slug+" missing primary HTTPS reference sources");
 const route="dist/coinmetriq/articles/"+article.slug+"/index.html";
 if(!fs.existsSync(route)){failures.push(article.slug+" published route missing; run build");continue;}
 const html=fs.readFileSync(route,"utf8");
 if(!html.includes('content="index,follow"')||!html.includes('"@type":"Article"'))failures.push(article.slug+" missing Article SEO/indexability");
 if(!html.includes('"datePublished":"'+article.publishedAt+'"'))failures.push(article.slug+" date/JSON-LD mismatch");
 if(!html.includes('href="'+article.href+'"'))failures.push(article.slug+" missing functioning tool link");
 for(const [name,url] of article.sources)if(!html.includes(url))failures.push(article.slug+" reference omitted from public page");
}
if(failures.length){console.error(failures.join("\n"));process.exitCode=1;}
else console.log("CoinMetriq editorial audit passed: "+data.articles.filter(a=>a.status==="published").length+" sourced published guides, "+data.articles.filter(a=>a.status==="draft").length+" unindexed drafts.");
