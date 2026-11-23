/*
 * Cloudflare Build Watch Paths may deliberately skip docs/other-site commits.
 * Do not demand a CoinMetriq deployment for a commit that cannot change CoinMetriq.
 */
import fs from "node:fs";
const prefixes=["sites/coinmetriq/","packages/"];
const exact=new Set(["scripts/build.mjs","package.json"]);
export function affectsCoinMetriq(files){
 if(!Array.isArray(files))throw Error("Commit file list is missing.");
 return files.some(file=>{
  const name=typeof file==="string"?file:file?.filename;
  return typeof name==="string"&&(exact.has(name)||prefixes.some(p=>name.startsWith(p)));
 });
}
async function main(env=process.env){
 const event=env.GITHUB_EVENT_NAME;
 const isChange=event==="workflow_run";
 let deploymentNeeded=false,reason="";
 if(isChange){
  const sha=env.COINMETRIQ_EXPECTED_SHA||"";
  const repo=env.GITHUB_REPOSITORY||"";
  const token=env.GITHUB_TOKEN||"";
  if(!/^[a-f0-9]{40}$/i.test(sha)||!/^[-\w.]+\/[-\w.]+$/.test(repo)||!token)throw Error("Missing repository, exact CI SHA or read-only GitHub token.");
  const url="https://api.github.com/repos/"+repo+"/commits/"+sha;
  const response=await fetch(url,{headers:{Accept:"application/vnd.github+json",Authorization:"Bearer "+token,"X-GitHub-Api-Version":"2022-11-28","User-Agent":"CoinMetriq-ReleaseScope/1.0"},signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw Error("Cannot read commit changed files (HTTP "+response.status+").");
  const commit=await response.json();
  if(!Array.isArray(commit.files))throw Error("GitHub did not return a complete commit file list.");
  deploymentNeeded=affectsCoinMetriq(commit.files);
  reason=deploymentNeeded?"CoinMetriq build-related source changed":"Only docs, monitoring or other sites changed; no new CoinMetriq deployment required";
 }else{
  reason="Manual or scheduled public host test; no exact new commit deployment required";
 }
 const runLive=!isChange||deploymentNeeded;
 const output="check_release="+String(deploymentNeeded)+"\nrun_live="+String(runLive)+"\n";
 if(env.GITHUB_OUTPUT)fs.appendFileSync(env.GITHUB_OUTPUT,output);
 console.log(JSON.stringify({event,checkRelease:deploymentNeeded,runLive,reason}));
}
if(process.argv[1]?.endsWith("coinmetriq-release-scope.mjs"))main().catch(e=>{console.error(e.message);process.exitCode=1;});
