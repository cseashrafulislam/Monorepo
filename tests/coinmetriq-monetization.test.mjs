import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {planAdSenseVerification,applyAdSenseVerification} from "../sites/coinmetriq/ads-verification.mjs";
test("CoinMetriq never invents an AdSense ID or enables paid ads without a real account",()=>{
 assert.deepEqual(planAdSenseVerification(""),{configured:false,metaTag:"",adsTxt:null});
 assert.throws(()=>planAdSenseVerification("pub-123"),/16 digits/);
 assert.throws(()=>planAdSenseVerification("ca-pub-1234567890123456"),/pub-/);
 const result=planAdSenseVerification("pub-1234567890123456");
 assert.equal(result.configured,true);
 assert.ok(result.adsTxt.includes("pub-1234567890123456, DIRECT"));
 assert.ok(result.metaTag.includes("ca-pub-1234567890123456"));
});
test("AdSense ownership preparation adds valid meta/ads.txt but never autoloads ads",()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"cm-publisher-test-"));
 try{
  fs.mkdirSync(path.join(dir,"help"));
  fs.writeFileSync(path.join(dir,"index.html"),"<html><head></head><body>Home</body></html>");
  fs.writeFileSync(path.join(dir,"help/index.html"),"<html><head></head><body>Help</body></html>");
  assert.equal(applyAdSenseVerification(dir,{}).configured,false);
  assert.ok(!fs.existsSync(path.join(dir,"ads.txt")));
  const outcome=applyAdSenseVerification(dir,{COINMETRIQ_ADSENSE_PUBLISHER:"pub-1234567890123456"});
  assert.equal(outcome.configured,true);
  assert.equal(outcome.adServing,false);
  assert.equal(outcome.htmlPages,2);
  const home=fs.readFileSync(path.join(dir,"index.html"),"utf8");
  assert.match(home,/name="google-adsense-account"/);
  assert.ok(!home.includes("adsbygoogle"));
  assert.ok(fs.readFileSync(path.join(dir,"ads.txt"),"utf8").startsWith("google.com, pub-1234567890123456"));
  assert.throws(()=>applyAdSenseVerification(dir,{COINMETRIQ_ADSENSE_PUBLISHER:"pub-1234567890123456"}),/Duplicate/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test("Unconfigured build serves no invented owner verification",()=>{
 const root="dist/coinmetriq";
 const index=fs.readFileSync(path.join(root,"index.html"),"utf8");
 if(!process.env.COINMETRIQ_ADSENSE_PUBLISHER){
  assert.ok(!index.includes('name="google-adsense-account"'));
  assert.ok(!fs.existsSync(path.join(root,"ads.txt")));
 }
 assert.ok(!index.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"));
});
