/*
 * Public static release provenance for a Git-integrated Cloudflare Pages site.
 * Store only a source commit and build type; never credentials or owner data.
 * A successful static build does not itself prove a public HTTP response.
 */
import fs from "node:fs";
import path from "node:path";
const isSha=x=>typeof x==="string"&&/^[a-f0-9]{40}$/i.test(x);
export function releaseInfo(env=process.env){
 const cloudflare=env.CF_PAGES==="1"&&isSha(env.CF_PAGES_COMMIT_SHA);
 const sha=cloudflare?env.CF_PAGES_COMMIT_SHA:isSha(env.GITHUB_SHA)?env.GITHUB_SHA:null;
 if(!sha)return null;
 return {
  site:"coinmetriq",
  commit:sha.toLowerCase(),
  platform:cloudflare?"Cloudflare Pages":"GitHub CI",
  branch:cloudflare?String(env.CF_PAGES_BRANCH||""):String(env.GITHUB_REF_NAME||""),
  source:"https://github.com/cseashrafulislam/Monorepo/commit/"+sha.toLowerCase()
 };
}
export function stampCoinMetriqRelease(root,env=process.env){
 const info=releaseInfo(env);
 if(!info)return {stamped:false,reason:"No provider-supplied 40-character commit. Local builds remain unstamped."};
 const meta='<meta name="coinmetriq-build-commit" content="'+info.commit+'">';
 let count=0;const folders=[root];
 while(folders.length){
  const folder=folders.pop();
  for(const item of fs.readdirSync(folder,{withFileTypes:true})){
   const file=path.join(folder,item.name);
   if(item.isDirectory())folders.push(file);
   else if(item.name.endsWith(".html")){
    const html=fs.readFileSync(file,"utf8");
    if(!html.includes("</head>"))throw Error("Missing HTML head in "+file);
    if(html.includes('name="coinmetriq-build-commit"'))throw Error("Duplicate release metadata in "+file);
    fs.writeFileSync(file,html.replace("</head>",meta+"</head>"));
    count++;
   }
  }
 }
 fs.writeFileSync(path.join(root,"build-info.json"),JSON.stringify(info,null,2)+"\n");
 return {stamped:true,htmlPages:count,sha:info.commit,platform:info.platform};
}
