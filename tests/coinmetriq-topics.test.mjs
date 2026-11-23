import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {topicResearch,applyCoinMetriqResearchStatus} from "../sites/coinmetriq/topic-research.mjs";
const root="dist/coinmetriq",base="https://coinmetriq.pages.dev";
test("Original 30 research topics map to distinct substantial source-backed content",()=>{
 const topics=JSON.parse(fs.readFileSync("sites/coinmetriq/topics.json","utf8")).map(t=>({...t,slug:t.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}));
 const statuses=applyCoinMetriqResearchStatus(topics);
 assert.deepEqual(statuses,{total:30,published:27,review:3});
 assert.equal(topicResearch.size,30);
 for(const t of topics){
  const r=topicResearch.get(t.slug);
  assert.ok(r,"Missing "+t.slug);
  for(const key of ["question","method","example","interpretation","limitations"])assert.ok(r[key].length>=140,t.slug+" "+key);
  assert.ok(r.sources.length>=1,t.slug);
  assert.ok(r.sources.every(([title,url])=>title&&/^https:\/\//.test(url)),t.slug);
  assert.ok(r.tool.startsWith("/"),t.slug);
  assert.ok(r.status==="published"||r.status==="review");
 }
});
test("Each published topic has a unique canonical, Article schema and an indexable sitemap entry",()=>{
 const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
 const allTitles=new Set();
 for(const [slug,guide] of topicResearch){
  const route="/topics/"+slug+"/";
  const html=fs.readFileSync(path.join(root,"topics",slug,"index.html"),"utf8");
  assert.ok(html.includes('rel="canonical" href="'+base+route+'"'),slug);
  assert.ok(html.includes("<h1>"+guide.title+"</h1>"),slug);
  assert.ok(html.includes("A clearly fictional worked example"),slug);
  assert.ok(html.includes('href="'+guide.tool+'"'),slug);
  for(const [,url] of guide.sources)assert.ok(html.includes(url),slug);
  assert.ok(!allTitles.has(guide.title),slug);allTitles.add(guide.title);
  if(guide.status==="published"){
   assert.match(html,/content="index,follow"/,slug);
   assert.match(html,/"@type":"Article"/,slug);
   assert.ok(sitemap.includes(base+route),slug);
  }else{
   assert.match(html,/content="noindex,follow"/,slug);
   assert.ok(!sitemap.includes(base+route),slug);
  }
 }
});
test("Three legal, tax and news review topics must never silently switch to indexable",()=>{
 assert.deepEqual([...topicResearch.values()].filter(x=>x.status==="review").map(x=>x.slug).sort(),
 ["crypto-news-research","crypto-regulations","crypto-tax-concepts"]);
});
