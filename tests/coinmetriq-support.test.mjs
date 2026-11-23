import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {supportRoutes} from "../sites/coinmetriq/site-support.mjs";
const root="dist/coinmetriq";
test("CoinMetriq publishes four distinct useful governance and support pages",()=>{
 assert.deepEqual(supportRoutes(),["/contact/","/editorial/","/disclaimer/","/help/"]);
 const siteMap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
 const footer=fs.readFileSync(path.join(root,"index.html"),"utf8");
 for(const route of supportRoutes()){
  const doc=fs.readFileSync(path.join(root,route,"index.html"),"utf8");
  assert.match(doc,/<h1>/);
  assert.ok(doc.includes('rel="canonical" href="https://coinmetriq.pages.dev'+route+'"'),route);
  assert.ok(siteMap.includes("https://coinmetriq.pages.dev"+route),route);
  assert.ok(doc.includes('content="index,follow"'),route);
  assert.ok(footer.includes('href="'+route+'"'),route+" visible in footer");
  assert.ok(!doc.includes("YOUR_EMAIL_HERE"),route+" must not invent contact");
 }
});
test("Privacy, corrections and disclaimers describe actual external and device-specific limitations",()=>{
 const contact=fs.readFileSync(path.join(root,"contact","index.html"),"utf8");
 const privacy=fs.readFileSync(path.join(root,"privacy","index.html"),"utf8");
 const editorial=fs.readFileSync(path.join(root,"editorial","index.html"),"utf8");
 const disclaimer=fs.readFileSync(path.join(root,"disclaimer","index.html"),"utf8");
 assert.match(contact,/github.com\/cseashrafulislam\/Monorepo\/issues/);
 assert.match(contact,/private keys/);
 assert.match(privacy,/localStorage/);
 assert.match(privacy,/AES-GCM/);
 assert.match(editorial,/source/i);
 assert.match(editorial,/noindex/i);
 assert.match(disclaimer,/tax/);
 assert.match(disclaimer,/wallet/);
});
