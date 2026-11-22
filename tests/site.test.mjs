import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { calculate } from "../packages/site-core/calculator.js";

const ids=["coinmetriq","earthviora","solarqentra","techorvia","moneyavora","industryluma","worldorixa","vitaloryx","edunovira","lifealora"];
const encodeHtml=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
test("Ten distinct brands with expandable topic catalogs",()=>{
 assert.equal(ids.length,10);
 const designs = new Set();
 let total=0;
 for(const id of ids) {
  const config=JSON.parse(fs.readFileSync(path.join("sites",id,"site.json"),"utf8"));
  const topics=JSON.parse(fs.readFileSync(path.join("sites",id,"topics.json"),"utf8"));
  assert.equal(config.id,id);
  assert.ok(!Object.prototype.hasOwnProperty.call(config,"categories"),id+": redundant categories data");
  assert.ok(topics.length>=1,id);
  assert.equal(new Set(topics.map(t=>t.name)).size,30,id);
  assert.equal(new Set(topics.map(t=>slug(t.name))).size,30,id);
  assert.ok(new Set(topics.map(t=>t.group)).size>=1,id);
  for(const topic of topics) {
   assert.ok(topic.overview.length>35,id+" "+topic.name);
   assert.ok(topic.practice.length>35,id+" "+topic.name);
  }
  assert.ok(config.countries.length>=4,id);
  assert.ok(config.tool.inputs.length>=2,id);
  assert.ok(config.design.design,id);
  designs.add(config.design.design);
  total+=topics.length;
 }
 assert.ok(total>=ids.length);
 assert.equal(designs.size,10);
});
test("Static build: all topic routes, unique designs, SEO & site isolation",()=>{
 for(const id of ids){
  const base=path.join("dist",id);
  const config=JSON.parse(fs.readFileSync(path.join("sites",id,"site.json"),"utf8"));
  const topics=JSON.parse(fs.readFileSync(path.join("sites",id,"topics.json"),"utf8"));
  const home=fs.readFileSync(path.join(base,"index.html"),"utf8");
  const index=fs.readFileSync(path.join(base,"topics","index.html"),"utf8");
  const sitemap=fs.readFileSync(path.join(base,"sitemap.xml"),"utf8");
  assert.match(home,new RegExp('data-design="'+config.design.design+'"'),id);
  assert.ok(home.includes(config.design.heroTitle),id+" distinct hero");
  assert.ok(home.includes('<link rel="canonical"'),id+" canonical");
  assert.ok(home.includes('og:title'),id+" open graph");
  assert.ok(index.includes(String(topics.length)),id+" topic count");
  assert.ok(sitemap.includes("https://"+id+".pages.dev/topics/"),id+" sitemap");
  assert.ok(!sitemap.includes("/topics/"+slug(topics[0].name)+"/"),id+" noindex guide excluded from sitemap");
  assert.ok(fs.existsSync(path.join(base,"assets","favicon.svg")));
  assert.ok(fs.existsSync(path.join(base,"assets","experience.css")));
  if(id==="coinmetriq") {
   assert.ok(home.includes("cm-hero-grid"),"Unique crypto layout");
   assert.ok(index.includes("cm-topic-search"),"Searchable research hub");
   assert.ok(fs.existsSync(path.join(base,"assets","cm.css")),"Dedicated crypto CSS");
   assert.ok(fs.existsSync(path.join(base,"assets","cm.js")),"Search behavior");
  }
  assert.ok(fs.existsSync(path.join(base,"tools",config.tool.slug,"index.html")));
  for(const topic of topics){
   const topicFile=path.join(base,"topics",slug(topic.name),"index.html");
   assert.ok(fs.existsSync(topicFile),id+" "+topic.name);
   const doc=fs.readFileSync(topicFile,"utf8");
   assert.ok(doc.includes(encodeHtml(topic.overview)),id+" description");
   assert.ok(doc.includes(encodeHtml(topic.practice)),id+" practical");
   assert.ok(doc.includes('content="noindex,follow"'),id+" review required");
   assert.ok(doc.includes('BreadcrumbList'),id+" breadcrumb structured data");
  }
 }
});
test("Working calculators: correct formulas and representative values",()=>{
 assert.match(calculate("marketcap",{price:.25,supply:1e7}).headline,/2,500,000/);
 assert.match(calculate("rainwater",{area:120,rainfall:85,efficiency:80}).headline,/8,160/);
 assert.match(calculate("solar",{capacity:5,sunHours:4.5,performance:78,tariff:.18}).headline,/17.55/);
 assert.match(calculate("ai",{inputTokens:2e6,outputTokens:8e5,inputRate:1.25,outputRate:5}).headline,/6.50/);
 assert.match(calculate("emi",{principal:250000,annualRate:0,months:50}).headline,/5,000/);
 assert.match(calculate("oee",{availability:92.5,performance:87,quality:98}).headline,/78.87/);
 assert.match(calculate("days",{startDate:"2027-01-01",endDate:"2028-01-01"}).headline,/365/);
 assert.match(calculate("bmi",{height:170,weight:68}).headline,/23.5/);
 assert.match(calculate("gpa",{credit1:3,grade1:4,credit2:3,grade2:3.7,credit3:4,grade3:3.3}).headline,/3.63/);
 assert.match(calculate("trip",{days:7,daily:85,hotel:55,transport:450,extras:120}).headline,/1,550/);
 assert.throws(()=>calculate("emi",{principal:100,annualRate:4,months:0}));
 assert.throws(()=>calculate("rainwater",{area:100,rainfall:40,efficiency:200}));
 assert.throws(()=>calculate("days",{startDate:"2027-02-30",endDate:"2027-03-01"}));
});
