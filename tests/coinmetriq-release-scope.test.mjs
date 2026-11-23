import test from "node:test";
import assert from "node:assert/strict";
import {affectsCoinMetriq} from "../scripts/coinmetriq-release-scope.mjs";
test("Source changes require a CoinMetriq Cloudflare build",()=>{
 for(const change of ["sites/coinmetriq/render.mjs","sites/coinmetriq/articles.json","scripts/build.mjs","package.json","packages/site-core/calculator.js"]){
  assert.equal(affectsCoinMetriq([{filename:change}]),true,change);
 }
});
test("Docs, workflows and changes for other brands do not imply a CoinMetriq deployment",()=>{
 for(const change of ["docs/coinmetriq-production-launch.md",".github/workflows/ci.yml",".github/workflows/coinmetriq-live-check.yml","sites/techorvia/render.mjs","scripts/coinmetriq-live-health.mjs","tests/coinmetriq-studio.test.mjs"]){
  assert.equal(affectsCoinMetriq([{filename:change}]),false,change);
 }
 assert.throws(()=>affectsCoinMetriq(null),/file list/);
});
