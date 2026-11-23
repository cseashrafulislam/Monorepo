/* Fails closed for any unapproved/expired commercial quote provider.
 * Evidence URLs need human/legal review; this script only enforces the gate.
 */
import fs from "node:fs";
import {validateLicensedCatalog} from "../sites/coinmetriq/licensed-data-core.mjs";
const source=JSON.parse(fs.readFileSync("sites/coinmetriq/licensed-sources.json","utf8"));
const published=JSON.parse(fs.readFileSync("dist/coinmetriq/assets/cm-licensed-sources.json","utf8"));
const approved=validateLicensedCatalog(source),live=validateLicensedCatalog(published);
if(JSON.stringify(source)!==JSON.stringify(published))throw Error("Published quote source configuration differs from source-controlled reviewed license record.");
if(approved.length!==live.length)throw Error("Licensed provider count mismatch.");
for(const source of approved){
 if(/(?:coingecko\.com|coinbase\.com|bitstamp\.net)$/.test(new URL(source.url).hostname.toLowerCase()))
  console.warn("Commercial exchange data requires actual written provider permission; verify paid/redistribution terms before enabling: "+source.id);
}
console.log("CoinMetriq commercial quote source gate PASSED: "+approved.length+" approved sources. "+(approved.length?"Recheck actual written permission and contract before public use.":"No live quote source enabled; 100% local quote/CSV fallback."));
