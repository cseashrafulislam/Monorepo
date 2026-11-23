import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {moreGuides} from "../sites/coinmetriq/guides-expanded.mjs";
import {extraRoutes} from "../sites/coinmetriq/extra.mjs";
const root="dist/coinmetriq";
test("CoinMetriq has eight distinct longer source-backed original research guides",()=>{
 assert.equal(moreGuides.length,8);
 assert.equal(new Set(moreGuides.map(g=>g.slug)).size,8);
 for(const g of moreGuides){
  assert.ok(g.title.length>20);
  assert.ok(g.excerpt.length>45);
  assert.ok(g.paragraphs.length>=4);
  assert.ok(g.paragraphs.every(([h,t])=>h.length>5&&t.length>100));
  assert.ok(g.href.startsWith("/"));
  assert.ok(g.sources?.length>0);
  assert.ok(g.sources.every(([name,url])=>name.length>5&&url.startsWith("https://")));
 }
});
test("Published guide routes have HTML, real links and Article schema",()=>{
 const site=JSON.parse(fs.readFileSync("sites/coinmetriq/site.json","utf8"));
 const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
 for(const g of moreGuides){
  const route="/articles/"+g.slug+"/";
  assert.ok(extraRoutes().includes(route));
  const html=fs.readFileSync(path.join(root,"articles",g.slug,"index.html"),"utf8");
  assert.ok(html.includes('rel="canonical" href="https://coinmetriq.pages.dev'+route+'"'));
  assert.ok(sitemap.includes("https://coinmetriq.pages.dev"+route));
  assert.match(html,/"@type":"Article"/);
  assert.match(html,/"datePublished":"2026-11-23"/);
  assert.match(html,/content="index,follow"/);
  assert.ok(html.includes('href="'+g.href+'"'),g.href);
  for(const [label,url] of g.sources){assert.ok(html.includes(url),url);}
  assert.ok(html.includes(site.name));
 }
});
test("Existing short topic overviews remain noindex and original tool remains functional",()=>{
 const sample=fs.readFileSync(path.join(root,"topics","crypto-glossary","index.html"),"utf8");
 assert.ok(sample.includes('content="noindex,follow"'));
 assert.ok(fs.existsSync(path.join(root,"tools","token-market-cap","index.html")));
});
