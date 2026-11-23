/* Optional, fail-closed commercial market-data source interface.
 * A genuinely documented permission is required. No source enabled by default.
 * No API secrets, unlicensed CoinGecko free plans or exchange data scrapers.
 */
const fail=msg=>{throw Error(msg);};
const dayValid=s=>{
 const day=String(s||"");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day))return false;
 const time=Date.parse(day+"T00:00:00Z");
 return Number.isFinite(time)&&new Date(time).toISOString().slice(0,10)===day;
};
const safeHttps=(value,label)=>{
 let url;
 try{url=new URL(value);}catch{fail(label+" must be a valid HTTPS URL.");}
 if(url.protocol!=="https:"||url.username||url.password||url.port||url.search||url.hash||url.href.length>700)fail(label+" must be HTTPS without credentials, ports or query tokens.");
 const host=url.hostname.toLowerCase();
 if(!host.includes(".")||/^(localhost|[0-9.]+|\[[^\]]+\])$/.test(host)||host.endsWith(".local")||host.endsWith(".internal")||host.endsWith(".lan")||host.endsWith(".test")||host.endsWith(".invalid")||host.endsWith(".example")||host.endsWith(".onion"))fail(label+" must use a public HTTPS hostname.");
 return url.href;
};
export function validateLicensedSource(source,{today=new Date().toISOString().slice(0,10)}={}){
 if(!source||typeof source!=="object"||Array.isArray(source))fail("Invalid market data source entry.");
 const {id,label,symbol,url,licenseEvidenceUrl,reviewedAt,licenseValidUntil,commercialDisplayAllowed,redistributionAllowed,ownerReviewedRights,minRefreshSeconds}=source;
 if(!/^[a-z][a-z0-9-]{2,40}$/.test(String(id||"")))fail("Provider ID must be a safe slug.");
 if(String(label||"").length<5||String(label).length>120)fail("Provider label must identify the legal source.");
 if(!/^[A-Z0-9-]{3,20}$/.test(String(symbol||"")))fail("Quote symbol must be an explicit standard pair such as BTC-USD.");
 const api=safeHttps(url,"Provider quote URL"),evidence=safeHttps(licenseEvidenceUrl,"Provider license proof");
 if(!dayValid(today)||!dayValid(reviewedAt)||!dayValid(licenseValidUntil)||reviewedAt>today||licenseValidUntil<today)fail("License review dates are invalid or authorization has expired.");
 if(commercialDisplayAllowed!==true||redistributionAllowed!==true||ownerReviewedRights!==true)fail("Provider must have independently confirmed commercial ad-supported display AND redistribution permission.");
 if(!Number.isSafeInteger(minRefreshSeconds)||minRefreshSeconds<60||minRefreshSeconds>86400)fail("Provider refresh duration must be 60–86,400 seconds.");
 return {id,label,symbol,url:api,licenseEvidenceUrl:evidence,reviewedAt,licenseValidUntil,minRefreshSeconds};
}
export function validateLicensedCatalog(catalog,options){
 if(catalog?.schemaVersion!==1||!Array.isArray(catalog.sources)||catalog.sources.length>10)fail("Invalid provider registry (max ten sources).");
 const ids=new Set(),list=[];
 for(const source of catalog.sources){
  const valid=validateLicensedSource(source,options);
  if(ids.has(valid.id))fail("Duplicate provider ID.");ids.add(valid.id);list.push(valid);
 }
 return list;
}
export function parseLicensedQuote(quote,source,{now=Date.now()}={}){
 if(!quote||typeof quote!=="object"||Array.isArray(quote))fail("Provider JSON must be an object.");
 if(String(quote.symbol||"")!==source.symbol)fail("Provider quote symbol does not match the registered pair.");
 if(quote.priceUSD===null||quote.priceUSD===undefined||String(quote.priceUSD).trim()==="")fail("Provider quote price is missing.");
 const price=Number(quote.priceUSD),timestamp=Date.parse(String(quote.asOf||""));
 if(!Number.isFinite(price)||price<=0||price>1e12)fail("Provider price is not a valid positive USD amount.");
 if(!Number.isFinite(timestamp)||timestamp<0||timestamp>now+5*60*1000)fail("Provider timestamp is invalid or in the future.");
 return {symbol:source.symbol,priceUSD:price,asOf:new Date(timestamp).toISOString(),
  sourceName:source.label,sourceUrl:source.url,licenseProof:source.licenseEvidenceUrl,
  ageSeconds:Math.max(0,Math.floor((now-timestamp)/1000)),
  stale:(now-timestamp)/1000>source.minRefreshSeconds};
}
export async function fetchLicensedQuote(source,{fetchFn=fetch,now=Date.now()}={}){
 const response=await fetchFn(source.url,{method:"GET",credentials:"omit",cache:"no-store",referrerPolicy:"no-referrer",
  headers:{Accept:"application/json"},signal:AbortSignal.timeout(10000)});
 if(!response.ok)fail("Approved data provider returned HTTP "+response.status+".");
 if(!String(response.headers?.get("content-type")||"").toLowerCase().includes("json"))fail("Provider did not return JSON.");
 const body=await response.text();
 if(body.length>30000)fail("Provider quote payload exceeds 30 KB.");
 let payload;
 try{payload=JSON.parse(body);}catch{fail("Provider JSON parsing failed.");}
 return parseLicensedQuote(payload,source,{now});
}
export function manualQuote({symbol,priceUSD,asOf}){
 const source={symbol:String(symbol||"").toUpperCase(),label:"Manual reader-supplied example",url:"",licenseEvidenceUrl:"",minRefreshSeconds:600};
 if(!/^[A-Z0-9-]{3,20}$/.test(source.symbol))fail("Enter an explicit uppercase pair such as BTC-USD.");
 return {...parseLicensedQuote({symbol:source.symbol,priceUSD,asOf},source),stale:true,
  sourceName:"Manual user entry (not independently verified)",sourceUrl:"",licenseProof:""};
}
