import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {releaseInfo,stampCoinMetriqRelease} from "../sites/coinmetriq/release-provenance.mjs";
const sha="0123456789abcdef0123456789abcdef01234567";
test("Cloudflare source SHA wins over unrelated CI commit and does not expose secrets",()=>{
 const x=releaseInfo({CF_PAGES:"1",CF_PAGES_COMMIT_SHA:sha,CF_PAGES_BRANCH:"main",GITHUB_SHA:"f".repeat(40),CLOUDFLARE_API_TOKEN:"TOP_SECRET"});
 assert.equal(x.commit,sha);assert.equal(x.platform,"Cloudflare Pages");
 assert.equal(x.branch,"main");assert.ok(!JSON.stringify(x).includes("TOP_SECRET"));
 assert.equal(releaseInfo({CF_PAGES_COMMIT_SHA:"not-a-sha"}),null);
});
test("Every page is tagged with actual provider SHA and build-info.json is generated",()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),"coinmetriq-release-"));
 try{
  fs.mkdirSync(path.join(root,"portfolio"));
  fs.writeFileSync(path.join(root,"index.html"),"<html><head><title>CoinMetriq</title></head><body></body></html>");
  fs.writeFileSync(path.join(root,"portfolio","index.html"),"<html><head></head><body></body></html>");
  assert.equal(stampCoinMetriqRelease(root,{}).stamped,false);
  const x=stampCoinMetriqRelease(root,{CF_PAGES:"1",CF_PAGES_COMMIT_SHA:sha,CF_PAGES_BRANCH:"main"});
  assert.equal(x.stamped,true);assert.equal(x.htmlPages,2);
  const a=fs.readFileSync(path.join(root,"portfolio","index.html"),"utf8");
  assert.ok(a.includes('name="coinmetriq-build-commit" content="'+sha+'"'));
  const info=JSON.parse(fs.readFileSync(path.join(root,"build-info.json"),"utf8"));
  assert.equal(info.commit,sha);
  assert.throws(()=>stampCoinMetriqRelease(root,{CF_PAGES:"1",CF_PAGES_COMMIT_SHA:sha}),/Duplicate/);
 }finally{fs.rmSync(root,{force:true,recursive:true});}
});
test("CI site build includes its GitHub commit when run in Actions",()=>{
 const infoPath="dist/coinmetriq/build-info.json";
 if(process.env.GITHUB_SHA&&/^[0-9a-f]{40}$/i.test(process.env.GITHUB_SHA)){
  assert.ok(fs.existsSync(infoPath));
  const info=JSON.parse(fs.readFileSync(infoPath,"utf8"));
  assert.equal(info.commit,process.env.GITHUB_SHA.toLowerCase());
  assert.ok(fs.readFileSync("dist/coinmetriq/index.html","utf8").includes(info.commit));
 }else assert.ok(!fs.existsSync(infoPath),"Pure local builds do not invent a provider SHA.");
});
