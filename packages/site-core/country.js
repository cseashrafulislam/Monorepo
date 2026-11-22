/* Independent-site country edition: data remains separate per domain. No location tracking. */
(()=>{
"use strict";
const countries=[
["BD","Bangladesh","BDT","৳"],["IN","India","INR","₹"],["US","United States","USD","$"],
["GB","United Kingdom","GBP","£"],["CA","Canada","CAD","C$"],["AU","Australia","AUD","A$"],
["DE","Germany","EUR","€"],["AE","United Arab Emirates","AED","د.إ"],["SG","Singapore","SGD","S$"],
["JP","Japan","JPY","¥"]
];
const site=document.body.dataset.site||"";
const vertical={
 coinmetriq:["crypto markets","local digital-asset regulations, applicable exchange access and country-specific risk disclosures"],
 earthviora:["earth and climate","local hazard advisories, weather observations and environmental authority information"],
 solarqentra:["solar and energy","regional sunlight, utility tariffs, equipment assumptions and grid connection guidance"],
 techorvia:["technology tools","regional technology news and relevant software, privacy and online safety guidance"],
 moneyavora:["finance","local currencies, financial rules, tax rules and comparable business cost assumptions"],
 industryluma:["manufacturing","regional production standards, safety guidance, environmental permits and supply-chain context"],
 worldorixa:["world news","verified national reporting, government developments and local source links"],
 vitaloryx:["health and wellness","local public-health information, relevant guidance and nutritional context"],
 edunovira:["education and careers","national curricula, admission eligibility, scholarships and official examination dates"],
 lifealora:["travel and daily life","local transport, entry requirements, living costs and practical services"]
};
const focus=vertical[site]||["local information","verified country-specific sources"];
const key="edition-country-v1";const params=new URLSearchParams(location.search);
const valid=x=>x==="WORLD"||countries.some(c=>c[0]===x);
const stored=(()=>{try{return localStorage.getItem(key);}catch{return null;}})();
let current=valid(params.get("country"))?params.get("country"):valid(stored)?stored:"WORLD";
const name=code=>countries.find(x=>x[0]===code)?.[1]||"Worldwide";
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&quot;","'":"&#39;"}[c]));
let selector,banner;
function save(code){
 current=valid(code)?code:"WORLD";
 document.documentElement.dataset.edition=current;
 document.body.dataset.country=current;
 try{localStorage.setItem(key,current);}catch{}
 const u=new URL(location.href);if(current==="WORLD")u.searchParams.delete("country");else u.searchParams.set("country",current);
 try{history.replaceState(history.state,"",u.pathname+u.search+u.hash);}catch{}
 if(selector)selector.value=current;
 update();
 document.dispatchEvent(new CustomEvent("editionchange",{detail:{country:current}}));
}
function filterNews(){
 let count=0,shownPreview=0;
 const stories=[...document.querySelectorAll("[data-edition-story]")];
 for(const story of stories){
  const c=story.getAttribute("data-edition-story")||"WORLD";
  const match=current==="WORLD"||c.split(",").map(x=>x.trim()).includes(current);
  const preview=!!story.closest("[data-country-preview]");
  const visible=match&&(!preview||shownPreview<8);
  story.hidden=!visible;if(visible){count++;if(preview)shownPreview++;}
 }
 const noNews=document.querySelector("[data-edition-empty]");
 if(noNews){noNews.hidden=count>0;noNews.textContent=current==="WORLD"?"No recent verified headlines available.":"No verified "+name(current)+" headlines available in this section. Select Worldwide to see global reporting.";}
 const counter=document.querySelector("[data-edition-count]");if(counter)counter.textContent=String(count);
}
function update(){
 const selected=countries.find(x=>x[0]===current),s=selected?selected[1]:"Worldwide";
 const hasNews=!!document.querySelector("[data-edition-story]")||!!document.querySelector("[data-edition-empty]");
 if(banner){
  banner.hidden=current==="WORLD";
  if(selected){
   banner.querySelector("[data-edition-heading]").textContent=s+" edition · "+focus[0];
   banner.querySelector("[data-edition-summary]").textContent="Showing verified "+s+" coverage where available. Focus: "+focus[1]+". General guides and tools remain available worldwide.";
   banner.querySelector("[data-edition-currency]").textContent="Reference currency: "+selected[2]+" ("+selected[3]+"). Calculators do not change tax, labor or regulatory formulas automatically.";
  }
 }
 const title=document.querySelector("[data-edition-label]");
 if(title)title.textContent=current==="WORLD"?"Worldwide":s;
 if(hasNews)filterNews();
}
function init(){
 const header=document.querySelector("header");
 if(!header)return;
 const bar=document.createElement("div");bar.className="edition-bar";bar.innerHTML='<div class="edition-wrap"><span class="edition-lead">COUNTRY EDITION</span><label for="edition-country">Select country</label><select id="edition-country" aria-label="Choose country edition"><option value="WORLD">🌐 Worldwide</option>'+countries.map(c=>'<option value="'+c[0]+'">'+esc(c[1])+'</option>').join("")+'</select><small data-edition-label>Worldwide</small></div>';
 header.parentNode.insertBefore(bar,header);
 selector=bar.querySelector("select");selector.value=current;selector.addEventListener("change",e=>save(e.target.value));
 const main=document.querySelector("main");
 if(main&&site!=="worldorixa"){
  banner=document.createElement("section");banner.className="edition-context";banner.hidden=true;banner.setAttribute("aria-label","Country edition context");
  banner.innerHTML='<div class="edition-wrap"><strong data-edition-heading></strong><p data-edition-summary></p><small data-edition-currency></small></div>';
  main.insertBefore(banner,main.firstChild);
 }else if(main){
  banner=document.createElement("section");banner.className="edition-context";banner.hidden=true;banner.innerHTML='<div class="edition-wrap"><strong data-edition-heading></strong><p data-edition-summary></p><small data-edition-currency></small></div>';main.insertBefore(banner,main.firstChild);
 }
 save(current);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();