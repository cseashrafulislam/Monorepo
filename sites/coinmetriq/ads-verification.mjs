/*
 * CoinMetriq AdSense *ownership verification* preparation.
 * Never fabricate a publisher ID, auto-enable ad scripts, or imply site approval.
 * Only the account owner can confirm site Ready / CMP compliance in AdSense.
 */
import fs from "node:fs";
import path from "node:path";
const validPublisher=/^pub-[0-9]{16}$/;
export function planAdSenseVerification(publisherId){
 if(publisherId==null||String(publisherId).trim()==="")return {configured:false,metaTag:"",adsTxt:null};
 const id=String(publisherId).trim();
 if(!validPublisher.test(id))throw Error("COINMETRIQ_ADSENSE_PUBLISHER must be the exact AdSense pub- ID followed by 16 digits.");
 return {
  configured:true,
  publisher:id,
  metaTag:'<meta name="google-adsense-account" content="ca-'+id+'">',
  adsTxt:"google.com, "+id+", DIRECT, f08c47fec0942fa0\n"
 };
}
export function applyAdSenseVerification(outputDir,env=process.env){
 const config=planAdSenseVerification(env.COINMETRIQ_ADSENSE_PUBLISHER);
 if(!config.configured)return {configured:false,adServing:false,reason:"No real publisher ID configured. Site remains ad-free."};
 const stack=[outputDir],html=[];
 while(stack.length){
  const folder=stack.pop();
  for(const item of fs.readdirSync(folder,{withFileTypes:true})){
   const loc=path.join(folder,item.name);
   if(item.isDirectory())stack.push(loc);
   else if(item.name.endsWith(".html"))html.push(loc);
  }
 }
 for(const file of html){
  const source=fs.readFileSync(file,"utf8");
  if(!source.includes("</head>"))throw Error("Invalid HTML head in "+file);
  if(source.includes('name="google-adsense-account"'))throw Error("Duplicate AdSense publisher tag detected.");
  fs.writeFileSync(file,source.replace("</head>",config.metaTag+"</head>"));
 }
 fs.writeFileSync(path.join(outputDir,"ads.txt"),config.adsTxt,"utf8");
 return {configured:true,adServing:false,htmlPages:html.length,adsTxtWritten:true,reason:"Site ownership verification only. No ad serving until actual Google Ready status and compliant consent/CMP setup."};
}
