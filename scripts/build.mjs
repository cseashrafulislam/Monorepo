import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitesFolder = path.join(ROOT, "sites");
const ids = fs.readdirSync(sitesFolder).filter(id => fs.existsSync(path.join(sitesFolder, id, "site.json"))).sort();
const requested = process.argv.find(x => x.startsWith("--site="))?.slice(7);
if (requested && !ids.includes(requested)) throw new Error("Unknown site: " + requested);
const targets = requested ? [requested] : ids;
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
function write(folder, file, content) {
  const full = path.join(folder, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}
function baseUrl(c) {
  const v = process.env.PUBLIC_SITE_URL || "https://" + c.id + ".pages.dev";
  if (!/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/.*)?$/i.test(v)) throw new Error("PUBLIC_SITE_URL must be a valid https URL.");
  return v.replace(/\/+$/, "");
}
function layout(c, page, body) {
  const e = escapeHtml;
  const currentUrl = baseUrl(c) + page.route;
  const title = page.title === c.name ? c.name + " | " + c.sector : page.title + " | " + c.name;
  const css = "#ffffff";
  const header = '<header class="topbar"><div class="shell nav"><a class="brand" href="/"><span class="brand-mark" aria-hidden="true">◆</span>' + e(c.name) + '</a><nav class="navlinks" aria-label="Main navigation"><a href="/">Home</a><a href="/tools/' + e(c.tool.slug) + '/">Free Tool</a><a href="/#topics">Topics</a><a href="/about/">About</a></nav></div></header>';
  const footer = '<footer class="footer"><div class="shell footer-grid"><span>© ' + new Date().getUTCFullYear() + ' ' + e(c.name) + ' · Independent information and utility website</span><nav aria-label="Footer navigation"><a href="/about/">About</a><a href="/privacy/">Privacy</a></nav></div></footer>';
  const structured = { "@context": "https://schema.org", "@type": "WebSite", name: c.name, url: baseUrl(c) + "/", description: c.tagline, inLanguage: "en" };
  const json = JSON.stringify(structured).replace(/</g, "\\u003c");
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="' + e(css) + '"><title>' + e(title) + '</title><meta name="description" content="' + e(page.description) + '"><link rel="canonical" href="' + e(currentUrl) + '"><meta property="og:type" content="website"><meta property="og:title" content="' + e(title) + '"><meta property="og:description" content="' + e(page.description) + '"><meta property="og:url" content="' + e(currentUrl) + '"><link rel="stylesheet" href="/assets/style.css"><script type="application/ld+json">' + json + '</script></head><body style="--accent:' + e(c.accent) + '"><a class="skip" href="#main" style="position:absolute;left:-9999px">Skip to content</a>' + header + '<main id="main">' + body + '</main>' + footer + '<script type="module" src="/assets/calculator.js"></script></body></html>';
}
function homepage(c) {
  const e = escapeHtml;
  const topics = c.categories.map((x,i) => '<li><span class="num">' + String(i+1).padStart(2,"0") + '</span>' + e(x) + '</li>').join("");
  const regions = c.countries.map(x => '<span class="chip">' + e(x) + '</span>').join("");
  const body = '<section class="hero"><div class="shell"><div class="eyebrow">Free interactive tools · Global information</div><h1>' + e(c.tagline) + '</h1><p class="lead">' + e(c.sector) + '. Explore helpful calculations without signing up. All numbers are entered by you, not fabricated from live feeds.</p><div class="actions"><a class="btn" href="/tools/' + e(c.tool.slug) + '/">Use free calculator</a><a class="btn secondary" href="#topics">Explore topics</a></div></div></section>' +
  '<section class="section"><div class="shell"><div class="section-heading"><div><div class="eyebrow">Available now</div><h2>Start with a practical tool</h2></div></div><div class="featured"><div class="feature-art"><small>' + e(c.sector) + '</small><strong>' + e(c.tool.title) + '</strong><p>' + e(c.tool.intro) + '</p></div><div class="card"><div class="eyebrow">Interactive calculator</div><h3>' + e(c.tool.title) + '</h3><p class="sub">' + e(c.tool.formula) + '</p><p><a class="btn" href="/tools/' + e(c.tool.slug) + '/">Open calculator</a></p><p class="note">Works entirely in your browser. No account required.</p></div></div></div></section>' +
  '<section class="section" id="topics"><div class="shell"><div class="section-heading"><div><div class="eyebrow">Editorial roadmap</div><h2>Explore our areas of focus</h2></div><p class="sub">These are planned content areas, not claims of published articles. Additional tools and verified resources will be published progressively.</p></div><ol class="topic-grid">' + topics + '</ol></div></section>' +
  '<section class="section"><div class="shell card"><h2>Country-focused coverage, where useful</h2><p class="sub">We prioritize meaningful regional data instead of publishing identical country pages. These markets guide future research, tools and verified content.</p><div class="chips" style="margin-top:16px">' + regions + '</div><p class="note">Country-specific tariffs, regulations and live feeds are not yet available in this starter release.</p></div></section>';
  return layout(c,{ title:c.name,description:c.tagline,route:"/" },body);
}
function toolPage(c) {
  const e=escapeHtml, t=c.tool;
  const inputs=t.inputs.map(f=>{const type=f.type==="date"?"date":"number";const props=type==="date"?"":' min="'+e(f.min)+'" max="'+e(f.max)+'" step="any"';return '<div class="field"><label for="' + e(f.key) + '">' + e(f.label) + '</label><input id="' + e(f.key) + '" name="' + e(f.key) + '" data-field="' + e(f.key) + '" type="' + type + '"' + props + ' value="' + e(f.default) + '" required></div>';}).join("");
  const form = '<form class="card" data-calculator="' + e(t.kind) + '"><h2>Enter your values</h2><p class="sub">Change any field, then calculate. Input remains in your browser.</p><div class="form-grid">' + inputs + '</div><button class="btn" type="submit">Calculate</button><div class="result" aria-live="polite" aria-atomic="true" data-result><strong>Ready to calculate</strong><p>Enter the information above and choose Calculate.</p></div></form>';
  const explanation = '<aside class="card"><div class="eyebrow">How it works</div><h3>Formula and assumptions</h3><p>' + e(t.formula) + '</p><h3>Important limitations</h3><p>' + e(t.caution) + '</p><p class="note">No live API pricing, market rate or country law is inferred by this tool.</p></aside>';
  const body = '<section class="section"><div class="shell"><div class="breadcrumbs"><a href="/">Home</a> / Free Tool</div><div class="eyebrow">' + e(c.sector) + '</div><h1>' + e(t.title) + '</h1><p class="lead">' + e(t.intro) + '</p><div class="tool-wrap">' + form + explanation + '</div></div></section>';
  return layout(c,{title:t.title,description:t.intro,route:"/tools/"+t.slug+"/"},body);
}
function infoPage(c,kind) {
  const e=escapeHtml;
  const about=kind==="about";
  const title=about?"About "+c.name:"Privacy Policy";
  const body=about ?
    '<h1>About ' + e(c.name) + '</h1><p>' + e(c.tagline) + '</p><p>This independent website is part of a planned network of ten utility and information sites. It currently offers a working interactive calculator and an editorial roadmap. Topic coverage will expand when useful original tools and verifiable data are available.</p><p>Calculator results are estimates using user inputs; they are not professional, regulatory or financial advice.</p>' :
    '<h1>Privacy Policy</h1><p>This starter website does not require accounts and its calculator does not transmit entered values to our servers. Pages are delivered by the hosting provider, which may process technical request information for website delivery and security.</p><p>No analytics trackers, advertising scripts or cookies are intentionally included in this initial codebase. If advertising or analytics services are enabled later, this notice and any required visitor-consent mechanisms must be updated before deployment.</p><p>Calculator inputs stay in your browser. Do not submit sensitive personal information through any future public forms.</p>';
  return layout(c,{title,description:(about?"Learn about ":"Privacy practices for ")+c.name+".",route:"/"+kind+"/"},'<section class="section"><div class="shell readable">'+body+'</div></section>');
}
function notFound(c) {return layout(c,{title:"Page Not Found",description:"This page does not exist.",route:"/404.html"},'<section class="section"><div class="shell error-page"><div class="eyebrow">404</div><h1>Page not found</h1><p class="lead">The requested page is not available.</p><p><a class="btn" href="/">Return home</a></p></div></section>');}
function validate(c, id) {
 if(c.id!==id || !/^[a-z0-9-]+$/.test(id))throw new Error("Site identity mismatch: "+id);
 if(!/^#[0-9a-f]{6}$/i.test(c.accent))throw new Error("Invalid accent "+id);
 if(!Array.isArray(c.categories)||c.categories.length<15||c.categories.length>20||new Set(c.categories).size!==c.categories.length)throw new Error("Categories invalid "+id);
 if(!c.tool||!c.tool.slug||!c.tool.inputs?.length)throw new Error("Tool invalid "+id);
}
for (const id of targets) {
 const config=JSON.parse(fs.readFileSync(path.join(sitesFolder,id,"site.json"),"utf8"));
 validate(config,id);
 const out=path.join(ROOT,"dist",id);
 fs.rmSync(out,{recursive:true,force:true});
 write(out,"index.html",homepage(config));
 write(out,"tools/"+config.tool.slug+"/index.html",toolPage(config));
 write(out,"about/index.html",infoPage(config,"about"));
 write(out,"privacy/index.html",infoPage(config,"privacy"));
 write(out,"404.html",notFound(config));
 fs.mkdirSync(path.join(out,"assets"),{recursive:true});
 for (const a of ["style.css","calculator.js"]) fs.copyFileSync(path.join(ROOT,"packages/site-core",a),path.join(out,"assets",a));
 const rootUrl=baseUrl(config);
 const paths=["/","/tools/"+config.tool.slug+"/","/about/","/privacy/"];
 write(out,"sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>"<url><loc>"+rootUrl+p+"</loc></url>").join("")+"</urlset>");
 write(out,"robots.txt","User-agent: *\nAllow: /\nSitemap: "+rootUrl+"/sitemap.xml\n");
 write(out,"_headers","/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n");
 console.log("Built "+id+" → dist/"+id+" (5 HTML pages + SEO resources)");
}
