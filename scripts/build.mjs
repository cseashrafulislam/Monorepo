import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITES = path.join(ROOT, "sites");
const siteIds = fs.readdirSync(SITES).filter(id => fs.existsSync(path.join(SITES, id, "site.json"))).sort();
const requested = process.argv.find(a => a.startsWith("--site="))?.slice(7);
if (requested && !siteIds.includes(requested)) throw new Error("Unknown site " + requested);
const targets = requested ? [requested] : siteIds;
const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);
const slugify = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const unique = items => new Set(items).size === items.length;
const groupMeta = {
  coinmetriq: { label:"Research desk", help:"Look for the originating chain or venue, sampling time and primary technical documentation. Price data must be time-stamped, and risk assumptions should be clear.", motto:"Methods before market narratives.", badge:"CRYPTO / RESEARCH" },
  earthviora: { label:"Observation notes", help:"Check the geographic coverage, instrument resolution, observation date, model uncertainty and local authority guidance before using Earth data.", motto:"Place, time and uncertainty matter.", badge:"EARTH / ATLAS" },
  solarqentra: { label:"Planning notes", help:"Check local tariffs, equipment specifications, performance losses, climate and applicable grid rules before turning estimates into purchasing decisions.", motto:"Every estimate begins with local inputs.", badge:"ENERGY / PLANNING" },
  techorvia: { label:"Lab checklist", help:"Check software version, provider terms, data privacy, measurable performance and the tested environment before adopting a technology.", motto:"Test, measure, then ship.", badge:"TECH / WORKBENCH" },
  moneyavora: { label:"Decision checklist", help:"Check units, date, compounding basis and jurisdiction. Financial, customs and tax rules need current official sources, not guesses.", motto:"Clear inputs make better comparisons.", badge:"FINANCE / METHODS" },
  industryluma: { label:"Operations notes", help:"Confirm the underlying production records, measurement period, equipment specifications and local compliance obligations before using KPIs.", motto:"Measure the process, not just the output.", badge:"INDUSTRY / SYSTEMS" },
  worldorixa: { label:"Editorial standards", help:"Distinguish the publication date from the event date; cross-check official primary material and separate verified facts from opinion.", motto:"Context precedes conclusions.", badge:"WORLD / CONTEXT" },
  vitaloryx: { label:"Health literacy note", help:"General information is not individual diagnosis. Consider source quality, relevant age groups and recognized health-authority guidance.", motto:"Evidence, context and care.", badge:"WELLNESS / REFERENCE" },
  edunovira: { label:"Study notes", help:"Check the institution's current curriculum, grading scale, eligibility rules and official deadlines before relying on study information.", motto:"Progress comes from clear practice.", badge:"LEARNING / PATHWAYS" },
  lifealora: { label:"Real-world checks", help:"Verify local prices, provider terms, official entry requirements and safety rules, since practical details vary by place and date.", motto:"Plan for the life you actually live.", badge:"LIFE / GUIDES" }
};
function write(out, name, content) {
 const p = path.join(out,name); fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p,content,"utf8");
}
function getBase(config){
 const url = (process.env.PUBLIC_SITE_URL || "https://" + config.id + ".pages.dev").replace(/\/+$/,"");
 if(!/^https:\/\/[a-z\d.-]+(?::\d+)?$/i.test(url)) throw new Error("Invalid PUBLIC_SITE_URL for " + config.id);
 return url;
}
function groupBy(topics) {
 const groups = [];
 for (const t of topics) {
   let g = groups.find(x=>x.name===t.group);
   if (!g) {g={name:t.group,topics:[]};groups.push(g);}
   g.topics.push(t);
 }
 return groups;
}
function linkTopic(t) {return "/topics/"+t.slug+"/";}
function groupLinks(groups) {
 return groups.map(g=>'<a href="/topics/#'+slugify(g.name)+'">'+escape(g.name)+'</a>').join("");
}
function siteNav(c,groups) {
 const menu = groups.slice(0,3).map(g=>'<a href="/topics/#'+slugify(g.name)+'">'+escape(g.name)+'</a>').join("");
 return '<header class="topbar"><div class="shell nav"><a class="brand" href="/" aria-label="'+escape(c.name)+' homepage"><span class="brand-mark" aria-hidden="true">'+escape(c.design.marker)+'</span>'+escape(c.name)+'</a><nav class="navlinks" aria-label="Main navigation">'+menu+'<a href="/topics/">All '+groups.reduce((n,g)=>n+g.topics.length,0)+' topics</a>'+(c.id==="worldorixa"?'<a href="/news/">Latest News</a>':"")+'<a href="/tools/'+escape(c.tool.slug)+'/">Calculator</a></nav></div></header>';
}
function structured(c,p,topics){
 const root=getBase(c);
 const objects=[{"@context":"https://schema.org","@type":"WebSite",name:c.name,url:root+"/",inLanguage:"en",description:c.tagline}];
 if(p.breadcrumbs) objects.push({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":p.breadcrumbs.map((b,i)=>({"@type":"ListItem",position:i+1,name:b.name,item:root+b.path}))});
 if(p.type==="collection") objects.push({"@context":"https://schema.org","@type":"CollectionPage",name:p.title,url:root+p.route,description:p.description,"mainEntity":{"@type":"ItemList",itemListElement:topics.map((t,i)=>({"@type":"ListItem",position:i+1,name:t.name,url:root+linkTopic(t)}))}});
 return JSON.stringify(objects).replace(/</g,"\\u003c");
}
function layout(c,p,content,topics,groups){
 const e=escape; const root=getBase(c); const canonical=root+p.route;
 const pageTitle=p.title===c.name?c.name+" | "+c.sector:p.title+" | "+c.name;
 const meta='<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="'+e(c.accent)+'"><title>'+e(pageTitle)+'</title><meta name="description" content="'+e(p.description)+'"><link rel="canonical" href="'+e(canonical)+'"><meta name="robots" content="'+(p.indexable===false?"noindex,follow":"index,follow")+'"><meta property="og:type" content="website"><meta property="og:site_name" content="'+e(c.name)+'"><meta property="og:title" content="'+e(pageTitle)+'"><meta property="og:description" content="'+e(p.description)+'"><meta property="og:url" content="'+e(canonical)+'"><meta name="twitter:card" content="summary"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/style.css"><link rel="stylesheet" href="/assets/experience.css"><script type="application/ld+json">'+structured(c,p,topics)+'</script>';
 const footer='<footer class="footer"><div class="shell footer-grid"><div><strong>'+e(c.name)+'</strong><div>'+e(c.design.short)+'</div><small>© '+new Date().getUTCFullYear()+' · Independent information and utility website</small></div><nav aria-label="Footer navigation"><a href="/topics/">Topics</a><a href="/about/">About</a><a href="/privacy/">Privacy</a></nav></div></footer>';
 return '<!doctype html><html lang="en"><head>'+meta+'</head><body data-design="'+e(c.design.design)+'" data-site="'+e(c.id)+'" style="--accent:'+e(c.accent)+'"><a class="sr-only" href="#main">Skip to main content</a>'+siteNav(c,groups)+'<main id="main">'+content+'</main>'+footer+'<script type="module" src="/assets/calculator.js"></script></body></html>';
}
function heroStage(c,groups){
 const e=escape;const key=c.id; const groupNames=groups.map(x=>x.name);
 const rows=groupNames.slice(0,3).map((name,i)=>'<div class="stage-point"><span>0'+(i+1)+' / '+e(name)+'</span><span aria-hidden="true">↗</span></div>').join("");
 const icon={coinmetriq:"◈",earthviora:"◎",solarqentra:"☀",techorvia:"{ }",moneyavora:"∑",industryluma:"▤",worldorixa:"✳",vitaloryx:"♡",edunovira:"✎",lifealora:"✺"}[key];
 const heading={coinmetriq:"Markets are data, not promises.",earthviora:"Read the landscape.",solarqentra:"Power your next decision.",techorvia:"Ideas → tools → answers.",moneyavora:"Think in clear numbers.",industryluma:"Operational clarity.",worldorixa:"A broader perspective.",vitaloryx:"Care starts with understanding.",edunovira:"Make progress visible.",lifealora:"A guide for the journey."}[key];
 const custom={
  coinmetriq:'<div class="stage-kicker">RESEARCH TERMINAL · LEARNING MODE</div><div class="stage-graphic">▥</div>',
  earthviora:'<div class="stage-kicker">GLOBAL OBSERVATION ATLAS</div><div class="stage-graphic">◉</div>',
  solarqentra:'<div class="stage-kicker">SOLAR → STORAGE → HOME</div><div class="stage-graphic">☀</div>',
  techorvia:'<div class="stage-kicker">TECH STACK / EXPLORE</div><div class="stage-graphic">&lt;/&gt;</div>',
  moneyavora:'<div class="stage-kicker">THE PRACTICAL FINANCE DESK</div><div class="stage-graphic">▦</div>',
  industryluma:'<div class="stage-kicker">OPERATIONS / BENCHMARKS</div><div class="stage-graphic">▥</div>',
  worldorixa:'<div class="stage-kicker">INDEPENDENT TOPIC DIRECTORY</div><div class="stage-graphic">✳</div>',
  vitaloryx:'<div class="stage-kicker">A MORE MINDFUL REFERENCE</div><div class="stage-graphic">♡</div>',
  edunovira:'<div class="stage-kicker">LEARNING / LEVEL UP</div><div class="stage-graphic">✎</div>',
  lifealora:'<div class="stage-kicker">YOUR PRACTICAL LIFE ATLAS</div><div class="stage-graphic">✈</div>'
 };
 return '<div class="hero-stage" aria-label="'+e(c.sector)+' illustration"><div class="stage-frame">'+custom[key]+'<div class="stage-title">'+e(heading)+'</div><div class="stage-points">'+rows+'</div></div></div>';
}
function topicCard(t,i){
 return '<a class="topic-card" href="'+linkTopic(t)+'"><span class="meta">'+escape(t.group)+' · '+String(i+1).padStart(2,"0")+'</span><h3>'+escape(t.name)+'</h3><p>'+escape(t.overview)+'</p><span class="continue">Explore guide <span aria-hidden="true">↗</span></span></a>';
}
function crumbs(parts){
 return '<nav class="breadcrumbs" aria-label="Breadcrumb">'+parts.map((p,i)=>(i?'<span aria-hidden="true"> / </span>':'')+(p.href?'<a href="'+p.href+'">'+escape(p.name)+'</a>':escape(p.name))).join("")+'</nav>';
}
function home(c,topics,groups){
 const e=escape;const meta=groupMeta[c.id];
 const pillars=groups.map((g,i)=>'<a class="pillar-card" href="/topics/#'+slugify(g.name)+'"><small>0'+(i+1)+' / 06 subjects</small><h3>'+e(g.name)+'</h3><p>'+e(g.topics[0].overview)+'</p><span class="arrow" aria-hidden="true">↗</span></a>').join("");
 const feature=topics.filter((_,i)=>[0,6,12,18,24,29].includes(i)).map((t,i)=>topicCard(t,i)).join("");
 const chips=c.countries.map(code=>'<span class="chip">'+e(code)+'</span>').join("");
 const html='<section class="page-hero"><div class="shell hero-layout"><div><div class="eyebrow">'+e(c.design.heroEyebrow)+'</div><h1>'+e(c.design.heroTitle)+'</h1><p class="lead">'+e(c.design.heroNote)+'</p><div class="actions"><a class="btn" href="/tools/'+e(c.tool.slug)+'/">Try '+e(c.tool.title)+'</a><a class="btn secondary" href="/topics/">Explore '+topics.length+' topics</a></div><p class="hero-caption">No account needed · Original topic guides · Transparent tool assumptions</p></div>'+heroStage(c,groups)+'</div></section>'+
 '<section class="section"><div class="shell"><div class="section-heading"><div><div class="eyebrow">'+e(meta.badge)+'</div><h2>'+groups.length+' paths into '+e(c.sector)+'</h2></div><p class="section-lede">'+topics.length+' carefully organized subjects with concrete guidance, divided into '+groups.length+' research groups.</p></div><div class="pillar-grid">'+pillars+'</div></div></section>'+
 '<section class="section"><div class="shell"><div class="tool-promo"><div><div class="eyebrow">WORKING CALCULATOR · FREE</div><h2>'+e(c.tool.title)+'</h2><p>'+e(c.tool.intro)+'</p><a class="btn" href="/tools/'+e(c.tool.slug)+'/">Open interactive tool</a><p class="note">Runs in your browser. Calculations use the numbers you enter; no fabricated live data.</p></div><div class="tool-equation"><small>Transparent method</small><strong>'+e(c.tool.formula)+'</strong></div></div></div></section>'+
 '<section class="section"><div class="shell"><div class="section-heading"><div><div class="eyebrow">TOPIC EXPLORER</div><h2>Start with these guides</h2></div><a href="/topics/">Browse all '+topics.length+' topics</a></div><div class="category-collection">'+feature+'</div></div></section>'+
 '<section class="section"><div class="shell card"><h2>Regional coverage, with meaningful local context</h2><p class="section-lede">These are target research markets, not live national datasets. We only add country pages when verified local information genuinely differs.</p><div class="chips" style="margin-top:16px">'+chips+'</div><p class="note">'+e(meta.motto)+'</p></div></section>';
 return layout(c,{title:c.name,description:c.design.heroNote,route:"/"},html,topics,groups);
}
function topicIndex(c,topics,groups){
 const e=escape;
 let content='<section class="content-hero"><div class="shell">'+crumbs([{name:"Home",href:"/"},{name:"Topics"}])+'<div class="eyebrow">'+e(c.design.heroEyebrow)+'</div><h1>Explore all '+topics.length+' '+e(c.sector)+' topics</h1><p class="lead">Browse '+groups.length+' curated research groups. Each guide explains the subject, practical checks and how to evaluate information responsibly.</p><div class="group-links">'+groupLinks(groups)+'</div></div></section>';
 content+='<section class="section"><div class="shell">';
 let index=0;
 for(const g of groups) {
  content+='<section aria-labelledby="group-'+slugify(g.name)+'" id="'+slugify(g.name)+'"><div class="group-title"><h2 id="group-'+slugify(g.name)+'">'+e(g.name)+'</h2><span>'+g.topics.length+' subject guides</span></div><div class="category-collection">'+g.topics.map(t=>topicCard(t,index++)).join("")+'</div></section>';
 }
 content+='</div></section>';
 return layout(c,{title:"All 30 Topics",description:"'+topics.length+' organized "+c.sector+" topic guides, methods and practical decision tips.",route:"/topics/",type:"collection",breadcrumbs:[{name:"Home",path:"/"},{name:"Topics",path:"/topics/"}]},content,topics,groups);
}
function topicPage(c,t,topics,groups){
 const e=escape, guide=groupMeta[c.id];const same=topics.filter(x=>x.group===t.group&&x.name!==t.name).slice(0,4);
 const route=linkTopic(t);const verified=Boolean(t.editorialReviewed && Array.isArray(t.sources) && t.sources.length);
 const info='<section class="content-hero"><div class="shell">'+crumbs([{name:"Home",href:"/"},{name:"Topics",href:"/topics/"},{name:t.name}])+'<div class="eyebrow">'+e(t.group)+' · TOPIC GUIDE</div><h1>'+e(t.name)+'</h1><p class="lead">'+e(t.overview)+'</p><span class="notlive"><span class="dot"></span>Practical guide · Not a live data feed</span></div></section>';
 const left='<article><section class="content-block"><h2>What '+e(t.name)+' helps you understand</h2><p>'+e(t.overview)+'</p><p>Part of <strong>'+e(t.group)+'</strong> on '+e(c.name)+', this guide focuses on how to evaluate the topic and use relevant information rather than making unsupported real-time claims.</p></section>'+
 '<section class="content-block"><h2>Practical considerations</h2><blockquote class="guide">'+e(t.practice)+'</blockquote><p>Before taking action, define the purpose of your comparison, choose consistent measurements and check whether the information is applicable to your location and time period.</p></section>'+
 '<section class="content-block"><h2>Suggested review process</h2><ol><li><strong>Scope:</strong> Define the question you need to answer about '+e(t.name)+', including units, geography and relevant dates.</li><li><strong>Evidence:</strong> Prefer primary materials, transparent methodologies and dated measurements; compare where sources disagree.</li><li><strong>Decision:</strong> Apply the result only within its stated limitations and document key assumptions.</li></ol></section>'+
 '<section class="content-block"><h2>Information quality and limits</h2><p>'+e(guide.help)+'</p><p>Any future live dataset on this page will identify its provider and last update time. This initial overview does not claim real-time prices, alerts, legal rules or professional recommendations.</p></section></article>';
 const right='<aside class="content-aside"><section class="content-block"><div class="eyebrow">'+e(guide.label)+'</div><h3>'+e(guide.motto)+'</h3><p>'+e(t.practice)+'</p><p><a href="/tools/'+e(c.tool.slug)+'/">Try '+e(c.tool.title)+' →</a></p></section><section class="content-block"><h3>Explore related topics</h3>'+same.map(x=>'<a class="topic-mini" href="'+linkTopic(x)+'">'+e(x.name)+' <span aria-hidden="true">↗</span></a>').join("")+'<p><a href="/topics/#'+slugify(t.group)+'">See all in '+e(t.group)+'</a></p></section></aside>';
 const content=info+'<section class="section"><div class="shell content-layout">'+left+right+'</div></section>';
 return layout(c,{title:t.name,description:t.overview+" "+t.practice,route,indexable:verified,breadcrumbs:[{name:"Home",path:"/"},{name:"Topics",path:"/topics/"},{name:t.name,path:route}]},content,topics,groups);
}
function toolPage(c,topics,groups){
 const e=escape,t=c.tool;
 const fields=t.inputs.map(f=>{const date=f.type==="date";return '<div class="field"><label for="'+e(f.key)+'">'+e(f.label)+'</label><input id="'+e(f.key)+'" name="'+e(f.key)+'" data-field="'+e(f.key)+'" type="'+(date?"date":"number")+'"'+(date?"":' min="'+e(f.min)+'" max="'+e(f.max)+'" step="any"')+' value="'+e(f.default)+'" required></div>';}).join("");
 const form='<form class="card" data-calculator="'+e(t.kind)+'"><h2>Calculator inputs</h2><p>Enter your values and calculate. Nothing is submitted to a server.</p><div class="form-grid">'+fields+'</div><button class="btn" type="submit">Calculate result</button><div class="result" data-result aria-live="polite" aria-atomic="true"><strong>Ready</strong><p>Enter information above and select Calculate result.</p></div></form>';
 const note='<aside class="content-aside"><div class="content-block"><div class="eyebrow">Calculation method</div><h3>Formula and assumptions</h3><p>'+e(t.formula)+'</p><h3>Limitations</h3><p>'+e(t.caution)+'</p><p class="disclaimer">A transparent estimate using visitor inputs—not a live quote, official advisory, or professional recommendation.</p></div><div class="content-block"><h3>Browse this knowledge area</h3><a href="/topics/">Explore 30 '+e(c.sector)+' topics →</a></div></aside>';
 const content='<section class="content-hero"><div class="shell">'+crumbs([{name:"Home",href:"/"},{name:"Free Calculator"}])+'<div class="eyebrow">'+e(c.design.heroEyebrow)+'</div><h1>'+e(t.title)+'</h1><p class="lead">'+e(t.intro)+'</p></div></section><section class="section"><div class="shell content-layout">'+form+note+'</div></section>';
 return layout(c,{title:t.title,description:t.intro,route:"/tools/"+t.slug+"/",breadcrumbs:[{name:"Home",path:"/"},{name:t.title,path:"/tools/"+t.slug+"/"}]},content,topics,groups);
}
function infoPage(c,kind,topics,groups){
 const e=escape;const about=kind==="about";const title=about?"About "+c.name:"Privacy Policy";
 const paragraphs=about?'<p>'+e(c.design.heroNote)+'</p><p>'+e(c.name)+' is a free public educational and utility website for '+e(c.design.audience)+' We organize '+topics.length+' subjects into five discoverable topic groups, with practical overview guides and a working browser-only calculator.</p><p>Some topic guides are brief initial overviews and are intentionally not indexed in search until they contain sufficient original, reviewed material. We do not fabricate real-time prices, news, official regulations or alerts.</p><p>New calculators, verified local data and research may be added progressively; the existing site is freely accessible without login.</p>':'<p>This site does not require registration. Calculator input stays in your browser and is not sent to our servers by the provided calculator code.</p><p>Cloudflare hosts the pages and may process connection details such as IP addresses and request metadata to deliver and secure the service. Consult Cloudflare privacy documentation for its infrastructure practices.</p><p>This version does not include advertising tags, third-party analytics trackers or marketing cookies. If advertising, analytics or sponsorship tracking is added later, the policy will be updated and consent controls implemented where required before enabling those services.</p><p>No form on this initial site requests sensitive personal data. Treat our informational content as general guidance, not personalized legal, medical or financial advice.</p>';
 const content='<section class="content-hero"><div class="shell">'+crumbs([{name:"Home",href:"/"},{name:title}])+'<h1>'+e(title)+'</h1></div></section><section class="section"><div class="shell readable card">'+paragraphs+'</div></section>';
 return layout(c,{title,description:(about?"About ":"Privacy details for ")+c.name,route:"/"+kind+"/",breadcrumbs:[{name:"Home",path:"/"},{name:title,path:"/"+kind+"/"}]},content,topics,groups);
}
function page404(c,topics,groups){
 return layout(c,{title:"Page not found",description:"The requested page could not be found.",route:"/404.html",indexable:false},'<section class="section"><div class="shell error-page"><div class="eyebrow">404 · Not found</div><h1>This page has moved or does not exist.</h1><p class="lead">Return to the homepage or browse the topic directory.</p><div class="actions"><a class="btn" href="/">Go home</a><a class="btn secondary" href="/topics/">Explore '+topics.length+' topics</a></div></div></section>',topics,groups);
}
function favicon(c) {
 const color=c.accent;const monogram=c.name.slice(0,1).toUpperCase();
 return '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="'+color+'"/><text x="32" y="44" font-family="Arial,sans-serif" font-size="39" font-weight="700" text-anchor="middle" fill="'+(["coinmetriq","techorvia","industryluma"].includes(c.id)?"#101e22":"#ffffff")+'">'+monogram+'</text></svg>';
}
function validate(c,topics){
 if(c.id!==c.id.toLowerCase()||!siteIds.includes(c.id))throw new Error("Invalid id");
 if(!c.design||!c.design.design||!c.design.marker)throw new Error("Missing brand identity: "+c.id);
 if(!/^#[0-9a-f]{6}$/i.test(c.accent))throw new Error("Invalid accent: "+c.id);
 if(!Array.isArray(topics)||topics.length<1)throw new Error(c.id+": at least one topic required");
 if(!unique(topics.map(t=>t.name))||!unique(topics.map(t=>t.slug)))throw new Error("Duplicate topic: "+c.id);
 const groups=groupBy(topics);
 if(!groups.length||groups.some(g=>!g.topics.length))throw new Error("Each topic group must be nonempty: "+c.id);
 for(const t of topics) if(t.overview.length<35||t.practice.length<35)throw new Error("Incomplete topic detail: "+c.id+" "+t.name);
 if(!c.tool?.inputs?.length)throw new Error("Working calculator required: "+c.id);
 return groups;
}

function newsPage(c,topics,groups,records=[]){
 const valid=(Array.isArray(records)?records:[]).filter(x=>x&&/^https:\/\//.test(x.url)&&typeof x.title==="string"&&x.title.length>12).slice(0,100);
 const cards=valid.map(x=>'<article class="topic-card" data-edition-story="'+escape((x.countries||[x.country||"WORLD"]).join(","))+'"><small class="meta">'+escape(x.source||"Publisher")+' · <time datetime="'+escape(x.date||"")+'">'+escape((x.date||"").slice(0,10))+'</time></small><h3><a href="'+escape(x.url)+'" target="_blank" rel="noopener noreferrer external">'+escape(x.title)+'</a></h3><p>'+escape(x.summary||"Read original publisher reporting for full context.")+'</p><a href="'+escape(x.url)+'" target="_blank" rel="noopener noreferrer external">Read at original source ↗</a></article>').join("");
 const intro='<section class="content-hero"><div class="shell"><div class="eyebrow">'+escape(c.name)+' · VERIFIED SOURCE LINKS</div><h1>'+escape(c.sector)+' News</h1><p class="lead">Select a country at the top to see only reporting tagged to that country. Headline summaries link to original publishers; no full articles are copied.</p><a href="/topics/">Explore practical topic guides →</a></div></section>';
 const body=intro+'<section class="section"><div class="shell"><h2>Recent source headlines <small>(<span data-edition-count>'+valid.length+'</span>)</small></h2><div class="category-collection" data-country-news>'+cards+'</div><p data-edition-empty '+(valid.length?"hidden":"")+' class="card">No recent verified headlines available. News appears after the scheduled feed update.</p></div></section>';
 return layout(c,{title:"Latest News",description:"Verified latest "+c.sector+" news headlines with source attribution and country-specific filtering.",route:"/news/"},body,topics,groups);
}

function homeNewsPreview(c,records=[]){
 const list=(Array.isArray(records)?records:[]).filter(x=>x&&/^https:\/\//.test(x.url)&&x.title).slice(0,75);
 const tech=c.id==="techorvia";
 const wrap=tech?"tv-container":"shell",section=tech?"tv-section":"section",grid=tech?"tv-news-grid":"category-collection",card=tech?"tv-news-card":"topic-card";
 const cards=list.map(x=>'<article class="'+card+'" data-edition-story="'+escape((x.countries||[x.country||"WORLD"]).join(","))+'"><small class="meta">'+escape(x.source||"Publisher")+' · '+escape((x.date||"").slice(0,10))+'</small><h3><a href="'+escape(x.url)+'" target="_blank" rel="noopener noreferrer external">'+escape(x.title)+'</a></h3><p>'+escape(x.summary||"Read the publisher’s original coverage.")+'</p><a href="'+escape(x.url)+'" target="_blank" rel="noopener noreferrer external">Read at source ↗</a></article>').join("");
 return '<section class="'+section+'" aria-label="Verified news headlines"><div class="'+wrap+'"><div class="section-heading"><div><div class="eyebrow">VERIFIED PUBLISHER LINKS · COUNTRY EDITIONS</div><h2>Latest '+escape(c.sector)+' News (<span data-edition-count>'+Math.min(list.length,8)+'</span>)</h2><p class="section-lede">Select your country at the top. Headlines are displayed only when relevant geography is verified.</p></div><a href="/news/">More news ↗</a></div><div class="'+grid+'" data-country-preview>'+cards+'</div><p data-edition-empty '+(list.length?"hidden":"")+' class="card">No verified headlines available for the selected country.</p></div></section>';
}
function countryAssets(out){
 const assets=path.join(ROOT,"packages","site-core");
 for(const file of ["country.js","country.css"])fs.copyFileSync(path.join(assets,file),path.join(out,"assets",file));
 const stack=[out];
 while(stack.length){
  const dir=stack.pop();
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
   const file=path.join(dir,entry.name);
   if(entry.isDirectory()){if(entry.name!=="assets")stack.push(file);continue;}
   if(!entry.name.endsWith(".html"))continue;
   let html=fs.readFileSync(file,"utf8");
   if(!html.includes("</head>")||!html.includes("</body>"))continue;
   html=html.replace("</head>",'<link rel="stylesheet" href="/assets/country.css"></head>')
            .replace("</body>",'<script defer src="/assets/country.js"></script></body>');
   fs.writeFileSync(file,html,"utf8");
  }
 }
}
for(const id of targets){
 const config=JSON.parse(fs.readFileSync(path.join(SITES,id,"site.json"),"utf8"));
 const topics=JSON.parse(fs.readFileSync(path.join(SITES,id,"topics.json"),"utf8")).map(t=>({...t,slug:slugify(t.name)}));
 const groups=validate(config,topics);
 const out=path.join(ROOT,"dist",id);
 fs.rmSync(out,{recursive:true,force:true});
 write(out,"index.html",home(config,topics,groups));
 write(out,"topics/index.html",topicIndex(config,topics,groups));
 for(const topic of topics)write(out,"topics/"+topic.slug+"/index.html",topicPage(config,topic,topics,groups));
 write(out,"tools/"+config.tool.slug+"/index.html",toolPage(config,topics,groups));
 write(out,"about/index.html",infoPage(config,"about",topics,groups));
 write(out,"privacy/index.html",infoPage(config,"privacy",topics,groups));
 write(out,"404.html",page404(config,topics,groups));
 if(id==="coinmetriq") {
  const { renderCoinMetriq } = await import("../sites/coinmetriq/render.mjs");
  const rendered = renderCoinMetriq(config,topics,groups,getBase(config));
  for(const [relative,html] of Object.entries(rendered)) write(out,relative,html);
 }
 let tvRoutes=[];
 if(id==="techorvia") {
  const {renderTechOrvia}=await import("../sites/techorvia/render.mjs");
  const rendered=renderTechOrvia(config,getBase(config));
  for(const [relative,html] of Object.entries(rendered.files))write(out,relative,html);
  tvRoutes=rendered.routes;
 }
 if(id==="worldorixa") {
  const newsData=JSON.parse(fs.readFileSync(path.join(SITES,id,"news.json"),"utf8"));
  write(out,"news/index.html",newsPage(config,topics,groups,newsData.items));
 }
 fs.mkdirSync(path.join(out,"assets"),{recursive:true});
 for (const filename of ["style.css","experience.css","calculator.js"])fs.copyFileSync(path.join(ROOT,"packages/site-core",filename),path.join(out,"assets",filename));
 write(out,"assets/favicon.svg",favicon(config));
 if(id==="techorvia") {
  for(const [from,to] of [["site.css","tv.css"],["app.mjs","tv-app.mjs"],["core.mjs","tv-core.mjs"],["files.mjs","tv-files.mjs"]])
   fs.copyFileSync(path.join(SITES,id,from),path.join(out,"assets",to));
 }
 if(id==="coinmetriq") {
  fs.copyFileSync(path.join(SITES,id,"site.css"),path.join(out,"assets","cm.css"));
  fs.copyFileSync(path.join(SITES,id,"site.js"),path.join(out,"assets","cm.js"));
   for(const [from,to] of [["studio-core.mjs","studio-core.mjs"],["studio-app.mjs","cm-studio.js"],["studio.css","cm-studio.css"]]) fs.copyFileSync(path.join(SITES,id,from),path.join(out,"assets",to));
 }
 if(id==="worldorixa") {
  const homepage=path.join(out,"index.html");
  const headlines=JSON.parse(fs.readFileSync(path.join(SITES,id,"news.json"),"utf8")).items||[];
  const homeHtml=fs.readFileSync(homepage,"utf8");
  fs.writeFileSync(homepage,homeHtml.replace('<main id="main">','<main id="main">'+homeNewsPreview(config,headlines)),"utf8");
 }
 countryAssets(out);
 const urls=["/","/topics/","/tools/"+config.tool.slug+"/","/about/","/privacy/"];
 if(id==="worldorixa")urls.push("/news/");
 if(id==="techorvia")for(const route of tvRoutes)if(!urls.includes(route))urls.push(route);
  if(id==="coinmetriq"){const {extraRoutes}=await import("../sites/coinmetriq/extra.mjs");for(const route of extraRoutes())if(!urls.includes(route))urls.push(route);}
 for(const t of topics)if(t.editorialReviewed===true&&Array.isArray(t.sources)&&t.sources.length)urls.push(linkTopic(t));
 write(out,"sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(route=>'<url><loc>'+getBase(config)+route+'</loc></url>').join("")+'</urlset>');
 if(id!=="worldorixa")write(out,"_redirects","/news/ /tools/"+config.tool.slug+"/ 301\n/news/* /tools/"+config.tool.slug+"/ 301\n");
 write(out,"robots.txt","User-agent: *\nAllow: /\nSitemap: "+getBase(config)+"/sitemap.xml\n");
 write(out,"_headers","/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n");
 console.log("Built "+config.name+": "+topics.length+" topic guides"+(id==="techorvia"?" and "+tvRoutes.length+" tool/site routes":"")+".");
}