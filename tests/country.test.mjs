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
test("Ten-site builds keep country selection but news only on WorldOrixa",()=>{
 for(const id of ids){
  const root=path.join("dist",id);
  const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
  assert.ok(home.includes('/assets/country.js'),id+" country runtime");
  if(id==="worldorixa")assert.ok(home.includes("data-country-preview"),"WorldOrixa news-first homepage");
  else assert.ok(!home.includes("data-country-preview"),id+" tools-only homepage");
  assert.ok(home.includes('/assets/country.css'),id+" country stylesheet");
  const hasNews=fs.existsSync(path.join(root,"news","index.html"));
  assert.equal(hasNews,id==="worldorixa",id+" matches news/tools architecture");
  assert.equal(fs.readFileSync(path.join(root,"sitemap.xml"),"utf8").includes("/news/"),id==="worldorixa",id+" news sitemap only for news property");
  if(id==="worldorixa"){
   const page=fs.readFileSync(path.join(root,"news","index.html"),"utf8");
   assert.ok(page.includes("data-edition-empty"));
   const json=JSON.parse(fs.readFileSync(path.join("sites",id,"news.json"),"utf8"));
   assert.ok(Array.isArray(json.items));
   for(const news of json.items)if(news.countries)for(const code of news.countries)assert.ok(validCountries.includes(code)||code==="WORLD");
  }else{
   assert.ok(!home.includes("href=\"/news/\""),id+" no news navigation");
   assert.ok(!fs.readFileSync(path.join(root,"tools",JSON.parse(fs.readFileSync(path.join("sites",id,"site.json"),"utf8")).tool.slug,"index.html"),"utf8").includes("data-edition-story"),id+" tools remain tools");
  }
 }
 const script=fs.readFileSync("packages/site-core/country.js","utf8");
 for(const country of validCountries)assert.ok(script.includes('["'+country+'"'),country+" top ten choice");
 assert.ok(script.includes("localStorage"),"per-origin persistence");
 assert.ok(script.includes("data-edition-story"),"article filtering");
});
