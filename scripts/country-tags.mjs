export const REGION_RULES=Object.freeze([
 ["BD",/\b(bangladesh|bangladeshi|dhaka|chattogram|chittagong|rajshahi|sylhet|khulna|gazipur|barisal)\b|বাংলাদেশ|ঢাকা|চট্টগ্রাম|সিলেট|খুলনা/i],
 ["IN",/\b(india|indian|delhi|mumbai|bengaluru|bangalore|chennai|kolkata|hyderabad)\b|ভারত|নয়াদিল্লি/i],
 ["US",/\b(united states|u\.s\.a?\.|american|washington dc|new york|california|silicon valley)\b/i],
 ["GB",/\b(united kingdom|british|britain|england|scotland|wales|london|manchester)\b/i],
 ["CA",/\b(canada|canadian|toronto|vancouver|ottawa|montreal)\b/i],
 ["AU",/\b(australia|australian|sydney|melbourne|canberra|brisbane)\b/i],
 ["DE",/\b(germany|german|berlin|munich|frankfurt)\b/i],
 ["AE",/\b(united arab emirates|emirati|dubai|abu dhabi|sharjah)\b/i],
 ["SG",/\b(singapore|singaporean)\b/i],
 ["JP",/\b(japan|japanese|tokyo|osaka|kyoto)\b/i]
]);
export function tagCountries(title,force=null){
 if(force)return [force];
 const tags=REGION_RULES.filter(([code,rx])=>rx.test(String(title||""))||(code==="US"&&/\bUS\b/.test(String(title||"")))).map(([code])=>code);
 return tags.length?tags:["WORLD"];
}
