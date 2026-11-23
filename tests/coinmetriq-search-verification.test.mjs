import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {searchVerificationMeta,applySearchVerification} from "../sites/coinmetriq/search-verification.mjs";
test("Search ownership is not invented and only accepts strict owner-issued tokens",()=>{
 assert.deepEqual(searchVerificationMeta({}),{google:false,bing:false,meta:""});
 const v=searchVerificationMeta({COINMETRIQ_GOOGLE_SITE_VERIFICATION:"kFoVnRJ-dqnTqveyMhSdqDJQmjTSVcFzCBZUh3sCE",COINMETRIQ_BING_SITE_VERIFICATION:"C372014433F45D178E3383B966B6E7E4"});
 assert.ok(v.meta.includes('name="google-site-verification"'));
 assert.ok(v.meta.includes('name="msvalidate.01"'));
 assert.throws(()=>searchVerificationMeta({COINMETRIQ_GOOGLE_SITE_VERIFICATION:'abc"><script>alert(1)</script>'}),/verification token/);
 assert.throws(()=>searchVerificationMeta({COINMETRIQ_BING_SITE_VERIFICATION:"<meta name='msvalidate.01'>"}),/verification token/);
});
test("Owner tags are only inserted to homepage and do not certify GSC/Bing ownership",()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),"coinmetriq-search-"));
 try{
  fs.mkdirSync(path.join(root,"help"));
  fs.writeFileSync(path.join(root,"index.html"),"<html><head><title>CoinMetriq</title></head><body></body></html>");
  fs.writeFileSync(path.join(root,"help","index.html"),"<html><head></head><body>Help</body></html>");
  const x=applySearchVerification(root,{COINMETRIQ_GOOGLE_SITE_VERIFICATION:"aReallyLongGoogleToken_123456"});
  assert.equal(x.google,true);assert.equal(x.bing,false);
  assert.match(fs.readFileSync(path.join(root,"index.html"),"utf8"),/google-site-verification/);
  assert.ok(!fs.readFileSync(path.join(root,"help","index.html"),"utf8").includes("google-site-verification"));
  assert.match(x.reason,/still confirm verification/);
  assert.throws(()=>applySearchVerification(root,{COINMETRIQ_GOOGLE_SITE_VERIFICATION:"anotherValidGoogleToken123"}),/duplicate/i);
 }finally{fs.rmSync(root,{force:true,recursive:true});}
});
test("Normal unconfigured site build contains no fake GSC or Bing ownership token",()=>{
 if(!process.env.COINMETRIQ_GOOGLE_SITE_VERIFICATION&&!process.env.COINMETRIQ_BING_SITE_VERIFICATION){
  const html=fs.readFileSync("dist/coinmetriq/index.html","utf8");
  assert.ok(!html.includes('name="google-site-verification"'));
  assert.ok(!html.includes('name="msvalidate.01"'));
 }
});
