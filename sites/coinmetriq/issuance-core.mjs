/* Bitcoin mainnet consensus-derived issuance teaching model.
 * MIT-licensed original Bitcoin Core code is only referenced, not copied.
 * Max subsidy, not observed actual issuance; no API / block explorer used.
 * Bitcoin Core: https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp
 * BIP42: https://github.com/bitcoin/bips/blob/master/bip-0042.mediawiki
 */
export const BITCOIN_REFERENCE={
 name:"Bitcoin Core consensus subsidy implementation (MIT-licensed)",
 url:"https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp",
 halvingSource:"https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp",
 bip42:"https://github.com/bitcoin/bips/blob/master/bip-0042.mediawiki",
 note:"The model computes the scheduled *maximum* coinbase subsidy; actual miners may claim less. Network fees are not newly minted BTC."
};
const INITIAL_SAT=5_000_000_000n,ERA=210000;
const assert=(condition,message)=>{if(!condition)throw Error(message);};
export function bitcoinSubsidySats(height){
 assert(Number.isSafeInteger(height)&&height>=0&&height<=100_000_000,"Block height must be a nonnegative whole number ≤100,000,000.");
 const halves=Math.floor(height/ERA);
 return halves>=33?0n:INITIAL_SAT>>BigInt(halves);
}
const bignumBtc=sats=>Number(sats)/1e8;
export function bitcoinSubsidyAtHeight(height){
 const sats=bitcoinSubsidySats(height);
 return {height,era:Math.floor(height/ERA),subsidySats:sats.toString(),subsidyBtc:bignumBtc(sats),nextHalvingHeight:(Math.floor(height/ERA)+1)*ERA};
}
export function bitcoinEraTable({eras=12}={}){
 assert(Number.isSafeInteger(eras)&&eras>=2&&eras<=33,"Enter 2–33 issuance eras.");
 const rows=[];
 let issued=0n;
 for(let i=0;i<eras;i++){
  const starts=i*ERA,ends=(i+1)*ERA-1;
  const sat=bitcoinSubsidySats(starts);
  const maxEra=sat*BigInt(ERA);
  issued+=maxEra;
  rows.push({era:i,startHeight:starts,lastHeight:ends,subsidyBtc:bignumBtc(sat),
   maxNewBtc:bignumBtc(maxEra),maxCumulativeBtc:bignumBtc(issued)});
 }
 return rows;
}
export function totalTheoreticalScheduledBtc(){
 let max=0n;
 for(let era=0;era<33;era++)max+=bitcoinSubsidySats(era*ERA)*BigInt(ERA);
 return bignumBtc(max);
}
export function validateIssuerProvenance({issuer,sourceTitle,sourceUrl,sourceDate,licenseNote}){
 const label=String(issuer||"").trim(),title=String(sourceTitle||"").trim();
 const date=String(sourceDate||"").trim(),note=String(licenseNote||"").trim();
 assert(label.length>=2&&label.length<=90,"Issuer or network must be 2–90 characters.");
 assert(title.length>=12&&title.length<=180,"Document title must describe the exact source (12–180 characters).");
 let url;
 try{url=new URL(sourceUrl);}catch{throw Error("Enter a direct HTTPS official source URL.");}
 assert(url.protocol==="https:"&&!url.username&&!url.password&&url.hostname.includes(".")&&url.href.length<=600,"Source must be an HTTPS document URL without credentials.");
 assert(/^\d{4}-\d{2}-\d{2}$/.test(date)&&new Date(date+"T00:00:00Z").toISOString().slice(0,10)===date,"Use a valid YYYY-MM-DD source document date.");
 assert(note.length>=16&&note.length<=250,"Describe this source's actual public method and rights status (16–250 characters).");
 return {issuer:label,sourceTitle:title,sourceUrl:url.href,sourceDate:date,licenseNote:note,
  verification:"Source cited by user; publisher and issuance values are NOT independently authenticated by CoinMetriq."};
}
