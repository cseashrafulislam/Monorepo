/*
 * Search Console and Bing Webmaster verification preparation, not approval.
 * Real owner-provided HTML meta values are supplied as build environment vars.
 * A URL-prefix property can be HTML-tag verified; domain properties may require DNS.
 */
import fs from "node:fs";
import path from "node:path";
const safeToken=value=>{
 const token=String(value||"").trim();
 if(!token)return "";
 if(!/^[A-Za-z0-9._+=/-]{8,256}$/.test(token))throw Error("Site ownership value must be an unmodified 8–256 character verification token, not pasted HTML.");
 return token;
};
export function searchVerificationMeta(env={}){
 const google=safeToken(env.COINMETRIQ_GOOGLE_SITE_VERIFICATION);
 const bing=safeToken(env.COINMETRIQ_BING_SITE_VERIFICATION);
 return {google:!!google,bing:!!bing,meta:[
  google?'<meta name="google-site-verification" content="'+google+'">':"",
  bing?'<meta name="msvalidate.01" content="'+bing+'">':""
 ].filter(Boolean).join("")};
}
export function applySearchVerification(root,env=process.env){
 const state=searchVerificationMeta(env);
 if(!state.meta)return {google:false,bing:false,reason:"No owner-issued verification tokens configured; no fabricated ownership."};
 const file=path.join(root,"index.html"),html=fs.readFileSync(file,"utf8");
 if(!html.includes("</head>"))throw Error("CoinMetriq homepage is missing </head>.");
 if(html.includes('name="google-site-verification"')||html.includes('name="msvalidate.01"'))throw Error("Search owner tags already present; duplicate verification refused.");
 fs.writeFileSync(file,html.replace("</head>",state.meta+"</head>"));
 return {google:state.google,bing:state.bing,reason:"HTML tag present only. The owner must still confirm verification on the official service."};
}
