import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {catalog,categories,findTool} from "../sites/techorvia/catalog.mjs";
import {fieldsFor,runPure,runCalculator} from "../sites/techorvia/core.mjs";
import {zipStore,createDocx} from "../sites/techorvia/files.mjs";
import {parseFeed,curateNews} from "../scripts/techorvia-news-core.mjs";
const base=path.join("dist","techorvia");
test("All TechOrvia pages are real, indexable software tool pages",()=>{
 assert.ok(catalog.length>=100,"Expected a substantial functional toolbox");
 assert.ok(categories.length>=10);
 assert.equal(new Set(catalog.map(x=>x.slug)).size,catalog.length);
 assert.equal(new Set(categories).size,categories.length);
 const home=fs.readFileSync(path.join(base,"index.html"),"utf8");
 const list=fs.readFileSync(path.join(base,"tools","index.html"),"utf8");
 assert.ok(home.includes('class="tv-hero"'));
 assert.ok(home.includes("PDF Studio"));
 assert.ok(home.includes("tv-searchbox"));
 assert.ok(list.includes("data-tool-card"));
 assert.ok(!home.includes("126+?"));
 const sitemap=fs.readFileSync(path.join(base,"sitemap.xml"),"utf8");
 for(const t of catalog){
  assert.equal(findTool(t.slug),t);
  assert.ok(t.description.length>25,t.slug+" description");
  const pathName=path.join(base,"tools",t.slug,"index.html");
  assert.ok(fs.existsSync(pathName),t.slug+" generated");
  const html=fs.readFileSync(pathName,"utf8");
  assert.ok(html.includes('data-tv-tool'),t.slug+" interactive form");
  assert.ok(html.includes('data-op="'+t.op+'"'),t.slug+" correct handler");
  assert.ok(html.includes('content="index,follow"'),t.slug+" indexable");
  assert.ok(html.includes("SoftwareApplication"),t.slug+" structured tool data");
  assert.ok(sitemap.includes("/tools/"+t.slug+"/"),t.slug+" discoverable");
 }
 for(const category of categories){
  const slug=category.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  assert.ok(fs.existsSync(path.join(base,"categories",slug,"index.html")),slug);
 }
 for(const f of ["tv.css","tv-app.mjs","tv-core.mjs","tv-files.mjs"])
  assert.ok(fs.existsSync(path.join(base,"assets",f)),"Missing asset "+f);
 assert.ok(!fs.existsSync(path.join(base,"news","index.html")),"TechOrvia is a tools-only website");
});
test("TechOrvia calculations, dates and invalid inputs",async()=>{
 const overtime=await runPure("overtime","",{rate:20,hours:45,threshold:40,multiplier:1.5});
 assert.ok(overtime.text.includes("950"));
 assert.equal(runCalculator("age",{birth:"2000-01-01",asof:"2026-11-22"}).text,"26 completed years");
 assert.equal(runCalculator("date-add",{start:"2026-01-01",days:30}).text,"2026-01-31");
 assert.ok(runCalculator("percent-change",{old:100,new:125}).text.includes("25"));
 assert.equal(runCalculator("ratio",{a:120,b:80}).text,"3:2 ratio");
 assert.throws(()=>runCalculator("breakeven",{fixed:100,price:5,variable:5}));
 assert.throws(()=>runCalculator("date-diff",{start:"2026-02-30",end:"2026-03-01"}));
 assert.throws(()=>runCalculator("overtime",{rate:-1,hours:45,threshold:40,multiplier:1.5}));
 for(const tool of catalog.filter(x=>x.mode==="calc"||x.op==="ai-cost"||x.op==="context"))
  assert.ok(fieldsFor(tool.op).length>=1,tool.slug+" inputs");
});
test("Text, JSON, developer, data transformations",async()=>{
 assert.equal((await runPure("slug","An Example SEO Title!")).text,"an-example-seo-title");
 assert.equal((await runPure("base64-decode","SGVsbG8=")).text,"Hello");
 assert.equal((await runPure("json-pretty",'{"a":1}')).text,'{\n  "a": 1\n}');
 assert.ok((await runPure("csv-json",'Name,Email\n"Smith, John",test@example.com')).text.includes("Smith, John"));
 assert.ok((await runPure("json-csv",'[{"name":"A,B"}]')).text.includes('"A,B"'));
 assert.ok((await runPure("sha256","abc")).text.includes("ba7816bf8f01"));
 assert.ok((await runPure("meta","",{title:"Test",description:"Description",url:"https://example.com/"})).text.includes("canonical"));
 await assert.rejects(()=>runPure("json-min","{invalid"));
 await assert.rejects(()=>runPure("sitemap","https://evil.test\nhttp://example.com/"));
});
test("Generated DOCX is a non-empty ZIP with correct OOXML entries",()=>{
 const zip=createDocx("First line\nSecond line");
 assert.equal(String.fromCharCode(...zip.slice(0,2)),"PK");
 assert.ok(zip.length>600);
 const generic=zipStore([{name:"hello.txt",bytes:new TextEncoder().encode("hello")}]);
 assert.equal(String.fromCharCode(...generic.slice(0,2)),"PK");
 assert.throws(()=>zipStore([{name:"../evil",bytes:new Uint8Array([1])}]));
});
test("RSS metadata ingestion retains only official links and dates",()=>{
 const feed='<rss><channel><item><title>Google announces a new research feature</title><link>https://blog.google/technology/ai/example</link><pubDate>Sun, 22 Nov 2026 00:00:00 GMT</pubDate></item><item><title>External phishing website publishes fake report</title><link>https://attacker.example/steal</link><pubDate>Sun, 22 Nov 2026 00:00:00 GMT</pubDate></item></channel></rss>';
 const sources=parseFeed(feed,{name:"Google AI Blog",url:"https://blog.google/technology/ai/rss/"});
 assert.equal(sources.length,1);
 assert.ok(sources[0].title.includes("Google announces"));
 assert.equal(curateNews([...sources,...sources],new Date("2026-11-22T06:00:00Z")).length,1);
 assert.equal(curateNews(sources,new Date("2027-03-01T00:00:00Z")).length,0);
 const news=JSON.parse(fs.readFileSync("sites/worldorixa/news.json","utf8"));
 assert.ok(Array.isArray(news.items));
});
