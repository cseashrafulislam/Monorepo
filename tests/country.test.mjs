import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {tagCountries} from "../scripts/country-tags.mjs";
const ids=["coinmetriq","earthviora","solarqentra","techorvia","moneyavora","industryluma","worldorixa","vitaloryx","edunovira","lifealora"];
const validCountries=["BD","IN","US","GB","CA","AU","DE","AE","SG","JP"];
test("Country metadata cannot invent local news",()=>{
 assert.deepEqual(tagCountries("A startup launches its latest tool"),["WORLD"]);
 assert.deepEqual(tagCountries("New robotics research in Dhaka"),["BD"]);
 assert.deepEqual(tagCountries("London startup invests in Dhaka"),["BD","GB"]);
 assert.deepEqual(tagCountries("Unrelated research from outside country","BD"),["BD"]);
 assert.deepEqual(tagCountries("Solar expansion in Japan"),["JP"]);
});
test("Ten independent site builds include country selector, news and source filtering",()=>{
 for(const id of ids){
  const root=path.join("dist",id);
  const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
  assert.ok(home.includes('/assets/country.js'),id+" country runtime");
  assert.ok(home.includes("data-country-preview"),id+" homepage country-aware news");
  assert.ok(home.includes('/assets/country.css'),id+" country stylesheet");
  assert.ok(fs.existsSync(path.join(root,"news","index.html")),id+" news route");
  const page=fs.readFileSync(path.join(root,"news","index.html"),"utf8");
  if(id!=="techorvia")assert.ok(page.includes("data-edition-empty"),id);
  const json=JSON.parse(fs.readFileSync(path.join("sites",id,"news.json"),"utf8"));
  assert.ok(Array.isArray(json.items),id+" news data");
  for(const news of json.items)if(news.countries)for(const country of news.countries)assert.ok(validCountries.includes(country)||country==="WORLD");
 }
 const script=fs.readFileSync("packages/site-core/country.js","utf8");
 for(const country of validCountries)assert.ok(script.includes('["'+country+'"'),country+" top ten choice");
 assert.ok(script.includes("localStorage"),"per-origin persistence");
 assert.ok(script.includes("data-edition-story"),"article filtering");
});
