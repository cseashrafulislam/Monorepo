import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {parseFeed,curateNews} from "./techorvia-news-core.mjs";
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const feeds=[
 {name:"Google AI Blog",url:"https://blog.google/technology/ai/rss/"},
 {name:"GitHub Blog",url:"https://github.blog/feed/"},
 {name:"Cloudflare Blog",url:"https://blog.cloudflare.com/rss/"}
];
const all=[];let good=0;
for(const source of feeds){
 try{const response=await fetch(source.url,{signal:AbortSignal.timeout(12000),headers:{"User-Agent":"TechOrvia-HeadlineBot/1.0 (+https://techorvia.pages.dev/news/)","Accept":"application/rss+xml, application/atom+xml, text/xml"}});if(!response.ok)throw Error("HTTP "+response.status);
 const xml=await response.text();if(xml.length>2500000)throw Error("Feed too large.");
 const entries=parseFeed(xml,source);if(!entries.length)throw Error("No valid entries.");all.push(...entries);good++;
 console.log(source.name+": "+entries.length+" metadata records");
 }catch(err){console.warn(source.name+" unavailable:",err.message);}
}
if(good===0)throw Error("No verified news feeds fetched; retaining the previous news file.");
const items=curateNews(all);
const target=path.join(base,"sites/techorvia/news.json");
const before=JSON.parse(fs.readFileSync(target,"utf8"));
const newContent=JSON.stringify(items);
if(JSON.stringify(before.items)===newContent){console.log("News headlines unchanged.");}
else{fs.writeFileSync(target,JSON.stringify({items},null,2)+"\n","utf8");console.log("Saved "+items.length+" recent, deduplicated headline links.");}
