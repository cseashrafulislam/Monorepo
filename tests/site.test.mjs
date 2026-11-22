import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { calculate } from "../packages/site-core/calculator.js";
const ids=["coinmetriq","earthviora","solarqentra","techorvia","moneyavora","industryluma","worldorixa","vitaloryx","edunovira","lifealora"];
test("Ten independent configurations and meaningful category plans",()=>{
 assert.equal(new Set(ids).size,10);
 for(const id of ids){
  const c=JSON.parse(fs.readFileSync(path.join("sites",id,"site.json"),"utf8"));
  assert.equal(c.id,id);
  assert.ok(c.categories.length>=15 && c.categories.length<=20,id);
  assert.equal(c.categories.length,new Set(c.categories).size);
  assert.ok(c.countries.length>=4,id);
  assert.ok(c.tool.inputs.length>=2,id);
 }
});
test("Representative calculators",()=>{
 assert.match(calculate("marketcap",{price:0.25,supply:1e7}).headline,/2,500,000/);
 assert.match(calculate("rainwater",{area:120,rainfall:85,efficiency:80}).headline,/8,160/);
 assert.match(calculate("solar",{capacity:5,sunHours:4.5,performance:78,tariff:0.18}).headline,/17.55/);
 assert.match(calculate("ai",{inputTokens:2e6,outputTokens:8e5,inputRate:1.25,outputRate:5}).headline,/6.50/);
 assert.match(calculate("emi",{principal:250000,annualRate:0,months:50}).headline,/5,000/);
 assert.match(calculate("oee",{availability:92.5,performance:87,quality:98}).headline,/78.87/);
 assert.match(calculate("days",{startDate:"2027-01-01",endDate:"2028-01-01"}).headline,/365/);
 assert.match(calculate("bmi",{height:170,weight:68}).headline,/23.5/);
 assert.match(calculate("gpa",{credit1:3,grade1:4,credit2:3,grade2:3.7,credit3:4,grade3:3.3}).headline,/3.63/);
 assert.match(calculate("trip",{days:7,daily:85,hotel:55,transport:450,extras:120}).headline,/1,550/);
});
test("Reject invalid critical values",()=>{
 assert.throws(()=>calculate("emi",{principal:100,annualRate:4,months:0}));
 assert.throws(()=>calculate("rainwater",{area:100,rainfall:40,efficiency:200}));
 assert.throws(()=>calculate("days",{startDate:"2027-02-30",endDate:"2027-03-01"}));
});
