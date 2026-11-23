/*
 * Verify the GitHub App's actual Cloudflare Pages deployment check
 * for the intended commit BEFORE testing public static availability.
 * Uses GitHub Actions' read-only token, not Cloudflare API credentials.
 */
import fs from "node:fs";
import {setTimeout as sleep} from "node:timers/promises";
const commit=String(process.env.COINMETRIQ_EXPECTED_SHA||"").trim().toLowerCase();
const repo=String(process.env.GITHUB_REPOSITORY||"");
const token=String(process.env.GITHUB_TOKEN||"");
if(!/^[0-9a-f]{40}$/.test(commit)||!/^[-\w.]+\/[-\w.]+$/.test(repo)||!token)throw Error("Need full expected commit, GitHub repository and Actions token.");
const url="https://api.github.com/repos/"+repo+"/commits/"+commit+"/check-runs?per_page=100";
const record={verifiedAt:new Date().toISOString(),commit,repository:repo,checkName:"Cloudflare Pages: coinmetriq",result:"unverified"};
let terminalError=null;
for(let attempt=1;attempt<=78;attempt++){
 let data;
 try{
  const r=await fetch(url,{headers:{Accept:"application/vnd.github+json",Authorization:"Bearer "+token,"X-GitHub-Api-Version":"2022-11-28","User-Agent":"CoinMetriq-Release-Verification/1.0"},signal:AbortSignal.timeout(12000)});
  if(!r.ok)throw Error("GitHub checks API returned HTTP "+r.status);
  data=await r.json();
 }catch(error){terminalError=error.message;console.warn("Cloudflare check lookup attempt "+attempt+": "+terminalError);}
 if(data?.check_runs){
  const checks=data.check_runs.filter(x=>x.name===record.checkName).sort((a,b)=>String(b.completed_at||b.started_at).localeCompare(String(a.completed_at||a.started_at)));
  const selected=checks[0];
  if(selected){
   record.checkRunUrl=selected.html_url;
   record.checkCompletedAt=selected.completed_at;
   record.conclusion=selected.conclusion;
   if(selected.status==="completed"&&selected.conclusion==="success"){
    record.result="verified";
    record.deploymentId=selected.external_id||null;
    record.deploymentDetailsUrl=selected.details_url||null;
    record.statusTitle=selected.output?.title||null;
    break;
   }
   if(selected.status==="completed"&&selected.conclusion!=="success"){
    terminalError="Cloudflare Pages check finished: "+String(selected.conclusion);
    break;
   }
  }
 }
 if(attempt<78)await sleep(5000);
}
if(record.result!=="verified")record.error=terminalError||"No successful Cloudflare Pages GitHub App check appeared for expected commit in 390 seconds.";
fs.mkdirSync("dist",{recursive:true});
fs.writeFileSync("dist/coinmetriq-deployment-check.json",JSON.stringify(record,null,2)+"\n");
console.log("Cloudflare GitHub App deployment verification:",JSON.stringify({commit,verified:record.result==="verified",check:record.checkRunUrl||null,reason:record.error||null}));
if(record.result!=="verified")process.exitCode=1;
