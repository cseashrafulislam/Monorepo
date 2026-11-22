import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {parseFeed,curateNews} from "./techorvia-news-core.mjs";
import {tagCountries} from "./country-tags.mjs";
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const feeds=[
 {name:"Google AI Blog",url:"https://blog.google/technology/ai/rss/"},
 {name:"GitHub Blog",url:"https://github.blog/feed/"},
 {name:"Cloudflare Blog",url:"https://blog.cloudflare.com/rss/"},
 {name:"Digi Bangla Local",url:"https://digibanglatech.news/rss/category/local-40",forceCountry:"BD"},
 {name:"Digi Bangla English",url:"https://digibanglatech.news/rss/category/english"},
 {name:"TBS ICT",url:"https://www.tbsnews.net/tech/ict/rss.xml"}
];
const localTech=/\b(?:tech(?:nology)?|ai|artificial intelligence|ict|digital|internet|btrc|telecom|5g|4g|mobile|smartphone|gadget|gaming|startup|robot|software|computer|broadband|cyber(?:security)?|data center|e-?commerce|fintech|app|apps|semiconductor|cloud|innovation|online|facebook|youtube|google|microsoft)\b|প্রযুক্তি|তথ্যপ্রযুক্তি|ডিজিটাল|ইন্টারনেট|মোবাইল|সাইবার|স্টার্টআপ|রোবট|বিটিআরসি|টেলিকম|স্মার্টফোন|অ্যাপ|সফটওয়্যার|গেমিং/i;
const isRelevant=item=>!item.source?.startsWith("Digi Bangla")||localTech.test(item.title);
const all=[];let good=0;
for(const source of feeds){
 try{const response=await fetch(source.url,{signal:AbortSignal.timeout(12000),headers:{"User-Agent":"TechOrvia-HeadlineBot/1.0 (+https://techorvia.pages.dev/news/)","Accept":"application/rss+xml, application/atom+xml, text/xml"}});if(!response.ok)throw Error("HTTP "+response.status);
 const xml=await response.text();if(xml.length>(source.name.startsWith("Digi Bangla")?10000000:2500000))throw Error("Feed too large.");
 const entries=parseFeed(xml,source).filter(isRelevant).map(item=>({...item,countries:tagCountries(item.title,source.forceCountry)}));if(!entries.length)throw Error("No valid entries.");all.push(...entries);good++;
 console.log(source.name+": "+entries.length+" metadata records");
 }catch(err){console.warn(source.name+" unavailable:",err.message);}
}
if(good===0)throw Error("No verified news feeds fetched; retaining the previous news file.");
const existing=JSON.parse(fs.readFileSync(path.join(base,"sites/techorvia/news.json"),"utf8")).items||[];
const items=curateNews([...all,...existing.filter(isRelevant)]);
const target=path.join(base,"sites/techorvia/news.json");
const before=JSON.parse(fs.readFileSync(target,"utf8"));
const newContent=JSON.stringify(items);
if(JSON.stringify(before.items)===newContent){console.log("News headlines unchanged.");}
else{fs.writeFileSync(target,JSON.stringify({items},null,2)+"\n","utf8");console.log("Saved "+items.length+" recent, deduplicated headline links.");}
