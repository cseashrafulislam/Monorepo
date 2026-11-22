// Pure operations are tested in Node and executed in browsers. No network or DOM needed except documented DOMParser cases.
const fmt=(n,d=2)=>Number(n).toLocaleString("en-US",{maximumFractionDigits:d});
const html=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const val=(f,k,min=-Infinity)=>{const n=Number(f[k]);if(f[k]===""||f[k]==null||!Number.isFinite(n)||n<min)throw Error("Enter a valid "+k+".");return n;};
const pos=(f,k)=>{const n=val(f,k,0);if(n===0)throw Error(k+" must be greater than zero.");return n;};
const date=s=>{const x=String(s||"");if(!/^\d{4}-\d{2}-\d{2}$/.test(x))throw Error("Use YYYY-MM-DD dates.");const n=Date.parse(x+"T00:00:00Z");if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,10)!==x)throw Error("Date is invalid.");return n;};
const uc=s=>String(s).trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const dec=s=>{try{return decodeURIComponent(String(s));}catch{throw Error("Invalid percent encoding.");}};
const result=(text,filename)=>({text:String(text),filename});
const fmtNum=(n,u="")=>{if(!Number.isFinite(n))throw Error("Calculation is out of range.");return result(fmt(n,4)+(u?" "+u:""))};
const signed=(n)=>{if(!Number.isFinite(n))throw Error("Calculation overflow.");return n;};
const paletteHex=s=>{const m=/^#?([a-f\d]{6})$/i.exec(String(s||"").trim());if(!m)throw Error("Enter a six-digit HEX color, such as #336699.");return m[1].toUpperCase();};
const rgb=s=>{const c=paletteHex(s);return [0,2,4].map(i=>parseInt(c.slice(i,i+2),16));};
const hexRGB=a=>"#"+a.map(n=>Math.round(n).toString(16).padStart(2,"0")).join("").toUpperCase();
const contrast=(a,b)=>{const lum=x=>{const y=rgb(x).map(v=>{const c=v/255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4);});return y[0]*.2126+y[1]*.7152+y[2]*.0722;};const l1=lum(a),l2=lum(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);};
const parseCSV=text=>{const rows=[];let row=[],field="",quote=false;const s=String(text).replace(/^\uFEFF/,"");for(let i=0;i<s.length;i++){const c=s[i];if(quote){if(c==='"'&&s[i+1]==='"'){field+='"';i++;}else if(c==='"')quote=false;else field+=c;}else if(c==='"'){if(field!=="")throw Error("Malformed CSV quotes.");quote=true;}else if(c===","){row.push(field);field="";}else if(c==="\n"||c==="\r"){if(c==="\r"&&s[i+1]==="\n")i++;row.push(field);rows.push(row);row=[];field="";}else field+=c;}if(quote)throw Error("Unclosed CSV quote.");if(field.length||row.length){row.push(field);rows.push(row);}return rows;};
const csvEscape=v=>{const s=String(v??"");return /[",\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
const csvRows=rows=>rows.map(row=>row.map(csvEscape).join(",")).join("\r\n");
const url=s=>{let x;try{x=new URL(String(s));}catch{throw Error("Enter an absolute HTTPS URL.");}if(x.protocol!=="https:")throw Error("Only HTTPS URLs are supported.");if(x.username||x.password)throw Error("Credentials inside URLs are not supported.");return x.href;};
const aux=(f,k,defaultValue="")=>String(f[k]??defaultValue);
const nums=(f,keys)=>keys.map(k=>val(f,k,0));
const ints=(f,k)=>{const n=val(f,k,0);if(!Number.isInteger(n))throw Error(k+" must be a whole number.");return n;};
const mins=(n)=>fmt(n,1)+" minutes";
const stop=(s)=>{if(s.length>2000000)throw Error("Input exceeds 2 million characters.");return s;};
const toBase64=s=>btoa(Array.from(new TextEncoder().encode(s),b=>String.fromCharCode(b)).join(""));
const fromBase64=s=>{try{return new TextDecoder("utf-8",{fatal:true}).decode(Uint8Array.from(atob(s.trim()),c=>c.charCodeAt(0)));}catch{throw Error("Not valid UTF-8 Base64.");}};
const flatten=(x,path="",out={},depth=0)=>{if(depth>32)throw Error("JSON nesting exceeds supported depth.");if(x&&typeof x==="object"&&!Array.isArray(x)){for(const [key,v] of Object.entries(x)){if(["__proto__","prototype","constructor"].includes(key))throw Error("Unsafe key.");flatten(v,path?path+"."+key:key,out,depth+1);}}else{out[path||"value"]=x;}return out;};
export function fieldsFor(op){
 const raw={
 overtime:"rate|Hourly rate|20;hours|Total hours|45;threshold|Regular hours threshold|40;multiplier|Overtime multiplier|1.5",
 "work-hours":"start|Start hour (0-24)|9;end|End hour (0-24)|18;break|Unpaid break in hours|1",
 timecard:"daily|Hours per shift|8;days|Shifts worked|5;break|Break hours per shift|0.5",
 shift:"start|Start hour (0-24)|22;end|End hour (0-24)|6;break|Unpaid break|0.5",
 "salary-hourly":"annual|Annual pay|52000;hours|Hours per week|40;weeks|Weeks per year|52",
 "hourly-salary":"rate|Hourly pay|25;hours|Hours per week|40;weeks|Weeks per year|52",
 raise:"salary|Current salary|50000;percent|Raise percent|5",
 commission:"sales|Sales amount|10000;percent|Commission percent|7.5",
 age:"birth|Birth date|2000-01-01|date;asof|As of date|2026-11-22|date",
 "date-diff":"start|Starting date|2026-01-01|date;end|Ending date|2026-12-31|date",
 "business-days":"start|Starting date|2026-01-01|date;end|Ending date|2026-01-31|date",
 "date-add":"start|Starting date|2026-01-01|date;days|Days to add|30",
 duration:"start|Start hour (0-24)|9;end|End hour (0-24)|17.5",
 download:"size|File size in MB|250;speed|Connection speed in Mbps|50",
 storage:"gib|Size in GiB|2",
 percentage:"amount|Base value|250;percent|Percent|12",
 "percent-change":"old|Original value|100;new|New value|125",
 discount:"price|Original price|150;percent|Discount percent|15",
 average:"a|First value|10;b|Second value|20;c|Third value|30",
 ratio:"a|First integer|120;b|Second integer|80",
 aspect:"width|Width|1920;height|Height|1080",
 electricity:"watts|Watts|800;hours|Hours per day|5;days|Days|30;tariff|Price per kWh|0.15",
 fuel:"distance|Distance km|350;use|Liters / 100 km|7;price|Price per liter|1.5",
 margin:"cost|Unit cost|70;price|Selling price|100",
 markup:"cost|Unit cost|70;price|Selling price|100",
 breakeven:"fixed|Fixed costs|10000;price|Selling price|100;variable|Variable cost per unit|60",
 freelance:"target|Annual billings target|80000;weekly|Billable hours per week|25;weeks|Working weeks|46",
 "ai-cost":"inputTokens|Input tokens|2000000;outputTokens|Output tokens|800000;inputRate|Input cost per million|1.25;outputRate|Output cost per million|5",
 context:"window|Context window|128000;system|System tokens|4000;history|Input/history tokens|20000;output|Reserved output tokens|8000",
 case:"style|Case style|title|select:upper,lower,title,sentence",
 "sort-lines":"order|Sort direction|asc|select:asc,desc",
 replace:"find|Find text|hello;replacement|Replace with|hi",
 regex:"pattern|Regex pattern|[a-z]+;flags|Flags|gi",
 "rgb-hex":"r|Red (0-255)|51;g|Green (0-255)|102;b|Blue (0-255)|153",
 "hex-rgb":"color|HEX color|#336699",
 contrast:"foreground|Text color|#222222;background|Background color|#FFFFFF",
 gradient:"a|Start HEX|#3B82F6;b|End HEX|#A855F7;angle|Degrees|135",
 palette:"color|Base HEX|#336699",
 meta:"title|Page title|Example Page;description|Meta description|Describe your page;url|Canonical HTTPS URL|https://example.com/",
 og:"title|Title|Example Page;description|Description|Example description;url|Page URL|https://example.com/;image|Image HTTPS URL|https://example.com/image.jpg",
 robots:"sitemap|Sitemap HTTPS URL|https://example.com/sitemap.xml",
 canonical:"url|Canonical HTTPS URL|https://example.com/",
 jsonld:"title|Web page name|Example page;url|Web page URL|https://example.com/",
 serp:"title|SEO page title|Example title;description|Search description|A clear summary.",
 hreflang:"language|First language tag|en;url|First HTTPS URL|https://example.com/;language2|Second language|bn;url2|Second HTTPS URL|https://example.com/bn/",
 password:"length|Password length (8-128)|20",
 random:"length|Identifier length (4-128)|24",
 "csv-columns":"columns|Comma-separated column names|Name,Email",
 "url-parser":"url|Absolute URL|https://example.com/path?q=1",
 "token-est":"text|Text to estimate tokens|A quick example",
 prompt:"role|Role or persona|Helpful technical writer;task|Task|Explain the technical topic;context|Context|The reader is a beginner;constraints|Constraints|Be accurate and clear;format|Output format|Bulleted summary"
 };
 const value=raw[op];
 if(!value)return [];
 return value.split(";").map(x=>{const [key,label,def,kind="text"]=x.split("|");return {key,label,default:def,type:kind};});
}
export async function runPure(op,input="",f={}){
 const s=stop(String(input??""));
 let n,a,b,c,txt,lines;
 switch(op){
 case "words":{const w=s.trim().match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[];return result(w.length+" words\n"+[...s].length+" characters\n"+s.split("\n").length+" lines\nEstimated read time: "+fmt(w.length/200,1)+" min");}
 case "chars":return result([...s].length+" characters\n"+[...s].filter(x=>!/\s/u.test(x)).length+" excluding whitespace");
 case "case":{const x=aux(f,"style","title");return result(x==="upper"?s.toUpperCase():x==="lower"?s.toLowerCase():x==="sentence"?s.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu,(_,p,q)=>p+q.toUpperCase()):s.toLowerCase().replace(/\b([a-z])/g,m=>m.toUpperCase()));}
 case "unique-lines":return result([...new Set(s.split(/\r?\n/))].join("\n"));
 case "sort-lines":return result(s.split(/\r?\n/).sort((x,y)=>x.localeCompare(y)*(aux(f,"order")==="desc"?-1:1)).join("\n"));
 case "reverse":return result(Array.from(s).reverse().join(""));
 case "diff":{const other=aux(f,"second");let i=0;while(i<s.length&&i<other.length&&s[i]===other[i])i++;return result(i===s.length&&i===other.length?"Texts are identical.":"First difference at position "+(i+1)+" (0-based "+i+").\nInput A: "+JSON.stringify(s.slice(Math.max(0,i-20),i+30))+"\nInput B: "+JSON.stringify(other.slice(Math.max(0,i-20),i+30)));}
 case "replace":{const find=aux(f,"find");if(!find)throw Error("Enter text to find.");return result(s.split(find).join(aux(f,"replacement")));}
 case "space":return result(s.split(/\r?\n/).map(x=>x.trim().replace(/[ \t]{2,}/g," ")).join("\n").trim());
 case "slug":return result(uc(s));
 case "escape":return result(html(s));
 case "markdown":{let t=html(s);t=t.replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\n/g,"<br>");return result(t);}
 case "json-pretty":return result(JSON.stringify(JSON.parse(s),null,2),"formatted.json");
 case "json-min":return result(JSON.stringify(JSON.parse(s)),"minified.json");
 case "json-validate":{JSON.parse(s);return result("Valid JSON.");}
 case "flatten":return result(JSON.stringify(flatten(JSON.parse(s)),null,2),"flattened.json");
 case "base64-encode":return result(toBase64(s));
 case "base64-decode":return result(fromBase64(s));
 case "url-encode":return result(encodeURIComponent(s));
 case "url-decode":return result(dec(s));
 case "jwt":{const parts=s.trim().split(".");if(parts.length!==3)throw Error("Expected JWT with three dot-separated parts.");const convert=p=>JSON.parse(fromBase64(p.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(p.length/4)*4,"=")));return result("UNVERIFIED header/payload. Do not trust without signature verification.\n"+JSON.stringify({header:convert(parts[0]),payload:convert(parts[1])},null,2));}
 case "uuid":return result(crypto.randomUUID());
 case "regex":{if(s.length>20000)throw Error("Limit test input to 20,000 characters.");const pat=aux(f,"pattern");if(pat.length>200)throw Error("Pattern is too long.");const re=new RegExp(pat,aux(f,"flags","g"));const arr=[...s.matchAll(re.global?re:new RegExp(re.source,re.flags+"g"))].slice(0,100);return result(arr.length+" matches shown (max 100):\n"+arr.map(x=>"At "+x.index+": "+JSON.stringify(x[0])).join("\n"));}
 case "timestamp":{const t=s.trim();let ms;if(/^-?\d{1,13}$/.test(t)){const x=Number(t);ms=t.length>10?x:x*1000;}else{ms=Date.parse(t);}if(!Number.isFinite(ms)||!Number.isFinite(new Date(ms).getTime()))throw Error("Enter an ISO date or Unix seconds/milliseconds.");return result("UTC: "+new Date(ms).toISOString()+"\nUnix seconds: "+Math.floor(ms/1000)+"\nUnix milliseconds: "+ms);}
 case "url-parser":{const u=new URL(aux(f,"url",s));return result(JSON.stringify({protocol:u.protocol,host:u.host,hostname:u.hostname,port:u.port,path:u.pathname,query:Object.fromEntries(u.searchParams),hash:u.hash},null,2));}
 case "xml":{if(typeof DOMParser==="undefined")throw Error("XML parsing requires a browser.");const doc=new DOMParser().parseFromString(s,"text/xml");if(doc.querySelector("parsererror"))throw Error("XML is malformed.");return result(new XMLSerializer().serializeToString(doc));}
 case "meta":{const title=aux(f,"title"),d=aux(f,"description"),link=url(aux(f,"url"));return result('<title>'+html(title)+'</title>\n<meta name="description" content="'+html(d)+'">\n<link rel="canonical" href="'+html(link)+'">',"meta-tags.html");}
 case "og":{const tag=(k,v)=>'<meta property="og:'+k+'" content="'+html(v)+'">';return result(["title","description"].map(k=>tag(k,aux(f,k))).concat([tag("url",url(aux(f,"url"))),tag("image",url(aux(f,"image"))),tag("type","website")]).join("\n"),"open-graph.html");}
 case "robots":return result("User-agent: *\nAllow: /\nSitemap: "+url(aux(f,"sitemap"))+"\n","robots.txt");
 case "canonical":return result('<link rel="canonical" href="'+html(url(aux(f,"url")))+'">');
 case "hreflang":return result('<link rel="alternate" hreflang="'+html(aux(f,"language"))+'" href="'+html(url(aux(f,"url")))+'">\n<link rel="alternate" hreflang="'+html(aux(f,"language2"))+'" href="'+html(url(aux(f,"url2")))+'">');
 case "jsonld":return result('<script type="application/ld+json">'+JSON.stringify({"@context":"https://schema.org","@type":"WebPage",name:aux(f,"title"),url:url(aux(f,"url"))}).replace(/</g,"\\u003c")+'</script>');
 case "serp":{const ti=aux(f,"title"),de=aux(f,"description");return result(ti+" ("+[...ti].length+" characters)\n\n"+de+" ("+[...de].length+" characters)\n\nGoogle may rewrite snippets; character count is only a guideline.");}
 case "sitemap":{const urls=s.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);if(!urls.length||urls.length>10000)throw Error("Supply 1-10,000 HTTPS URLs, one per line.");const uniques=[...new Set(urls.map(url))];return result('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+uniques.map(x=>"  <url><loc>"+html(x)+"</loc></url>").join("\n")+"\n</urlset>","sitemap.xml");}
 case "headings":case "alts":{if(typeof DOMParser==="undefined")throw Error("HTML analysis requires browser.");const doc=new DOMParser().parseFromString(s,"text/html");if(op==="alts"){const imgs=[...doc.querySelectorAll("img")];const bad=imgs.filter(i=>!i.hasAttribute("alt"));return result(imgs.length+" image elements; "+bad.length+" without alt attribute.\n"+bad.map(i=>i.outerHTML.slice(0,200)).join("\n"));}const hs=[...doc.querySelectorAll("h1,h2,h3,h4,h5,h6")];let prev=0,warnings=[];for(const h of hs){const level=+h.tagName[1];if(prev&&level>prev+1)warnings.push(h.tagName+" skipped a heading level.");prev=level;}return result("Heading outline:\n"+hs.map(h=>h.tagName+" "+h.textContent.trim()).join("\n")+"\n"+warnings.join("\n"));}
 case "password":case "random":{const length=ints(f,"length");if(length>(op==="password"?128:128)||length<(op==="password"?8:4))throw Error("Length outside allowed range.");const chars=op==="password"?"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*-_":"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let out="",limit=Math.floor(256/chars.length)*chars.length;while(out.length<length){const b=crypto.getRandomValues(new Uint8Array(32));for(const n of b){if(n<limit){out+=chars[n%chars.length];if(out.length===length)break;}}}return result(out);}
 case "strength":{let types=0;for(const re of [/[a-z]/,/[A-Z]/,/\d/,/[^a-zA-Z0-9]/])if(re.test(s))types++;return result((s.length>=16&&types>=3?"Strong-looking":"Needs improvement")+" — length "+s.length+", character sets "+types+"/4. This is only a heuristic; password reuse and known patterns matter.");}
 case "sha256":case "sha512":{const hash=await crypto.subtle.digest(op==="sha256"?"SHA-256":"SHA-512",new TextEncoder().encode(s));return result([...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,"0")).join(""));}
 case "csp":return result("Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests\nReview script-src, style-src and connect-src before deploying.");
 case "hex-rgb":return result("RGB("+rgb(aux(f,"color")).join(", ")+")");
 case "rgb-hex":{const v=["r","g","b"].map(k=>ints(f,k));if(v.some(x=>x>255))throw Error("RGB channel must be 0 to 255.");return result(hexRGB(v));}
 case "contrast":{const ratio=contrast(aux(f,"foreground"),aux(f,"background"));return result("Contrast: "+fmt(ratio,2)+":1\nWCAG AA normal text: "+(ratio>=4.5?"Pass":"Fail")+"\nWCAG AAA normal text: "+(ratio>=7?"Pass":"Fail")+"\nWCAG AA large text: "+(ratio>=3?"Pass":"Fail"));}
 case "gradient":return result("background: linear-gradient("+val(f,"angle")+"deg, #"+paletteHex(aux(f,"a"))+", #"+paletteHex(aux(f,"b"))+");");
 case "palette":{const base=rgb(aux(f,"color"));return result([-60,-30,0,30,60].map(n=>hexRGB(base.map(x=>Math.max(0,Math.min(255,x+n))))).join("\n"));}
 case "csv-json":{const rows=parseCSV(s);if(rows.length<2)throw Error("CSV must have a header and data.");const names=rows.shift();return result(JSON.stringify(rows.filter(r=>r.some(x=>x!=="")).map(r=>Object.fromEntries(names.map((h,i)=>[h,r[i]??""]))),null,2),"records.json");}
 case "json-csv":{const obj=JSON.parse(s);if(!Array.isArray(obj)||obj.some(x=>!x||Array.isArray(x)||typeof x!=="object"))throw Error("Enter an array of flat JSON objects.");const keys=[...new Set(obj.flatMap(x=>Object.keys(x)))];return result(csvRows([keys,...obj.map(row=>keys.map(k=>typeof row[k]==="object"?JSON.stringify(row[k]):row[k]))]),"export.csv");}
 case "csv-unique":{const rows=parseCSV(s),seen=new Set();return result(csvRows(rows.filter(r=>{const key=JSON.stringify(r);if(seen.has(key))return false;seen.add(key);return true;})),"unique.csv");}
 case "csv-columns":{const rows=parseCSV(s),names=aux(f,"columns").split(",").map(x=>x.trim()).filter(Boolean);if(!rows.length||!names.length)throw Error("Enter CSV and desired column names.");const indexes=names.map(x=>rows[0].indexOf(x));if(indexes.includes(-1))throw Error("One or more columns are missing.");return result(csvRows(rows.map(r=>indexes.map(i=>r[i]??""))),"columns.csv");}
 case "token-est":return result("Approximately "+Math.ceil([...s].length/4)+" tokens. This is not a model tokenizer.");
 case "prompt":return result("ROLE:\n"+aux(f,"role")+"\n\nTASK:\n"+aux(f,"task")+"\n\nCONTEXT:\n"+aux(f,"context")+"\n\nCONSTRAINTS:\n"+aux(f,"constraints")+"\n\nRESPONSE FORMAT:\n"+aux(f,"format"));
 }
 return runCalculator(op,f);
}
export function runCalculator(op,f={}){
 let a,b,c,n;
 switch(op){
 case "overtime":{const [rate,hours,threshold,multiplier]=nums(f,["rate","hours","threshold","multiplier"]);if(multiplier>10)throw Error("Multiplier must be at most 10.");const overtime=Math.max(0,hours-threshold);return result("Gross pay: "+fmt(Math.min(hours,threshold)*rate+overtime*rate*multiplier)+"\nRegular hours: "+fmt(Math.min(hours,threshold))+"\nOvertime hours: "+fmt(overtime)+"\nOvertime pay: "+fmt(overtime*rate*multiplier)+"\nCustom math only; verify applicable local rules.");}
 case "work-hours":case "shift":case "duration":{a=val(f,"start",0);b=val(f,"end",0);if(a>24||b>24)throw Error("Hours must be 0–24.");n=(b-a+24)%24;if(n===0&&b!==a)n=24;const breakHours=op==="duration"?0:val(f,"break",0);if(breakHours>n)throw Error("Break exceeds shift.");return fmtNum(n-breakHours,"hours");}
 case "timecard":{a=val(f,"daily",0);b=val(f,"days",0);c=val(f,"break",0);if(a>24||b>366||c>a)throw Error("Invalid shift or break.");return fmtNum((a-c)*b,"hours");}
 case "salary-hourly":return fmtNum(val(f,"annual",0)/(pos(f,"hours")*pos(f,"weeks")),"per hour");
 case "hourly-salary":return fmtNum(val(f,"rate",0)*pos(f,"hours")*pos(f,"weeks"),"per year");
 case "raise":return fmtNum(val(f,"salary",0)*(1+val(f,"percent")/100),"new pay");
 case "commission":return fmtNum(val(f,"sales",0)*val(f,"percent")/100,"commission");
 case "age":{a=date(f.birth);b=date(f.asof);if(b<a)throw Error("As-of date is before birth.");const born=new Date(a),now=new Date(b);let years=now.getUTCFullYear()-born.getUTCFullYear();if(now.getUTCMonth()<born.getUTCMonth()||(now.getUTCMonth()===born.getUTCMonth()&&now.getUTCDate()<born.getUTCDate()))years--;return result(years+" completed years");}
 case "date-diff":return fmtNum(Math.abs(date(f.start)-date(f.end))/86400000,"calendar days");
 case "business-days":{a=date(f.start);b=date(f.end);if(b<a)[a,b]=[b,a];if((b-a)/86400000>365250)throw Error("Date range too large.");let count=0;for(let ts=a;ts<b;ts+=86400000){const d=new Date(ts).getUTCDay();if(d!==0&&d!==6)count++;}return result(count+" weekdays (excluding end date and public holidays not applied)");}
 case "date-add":{const ms=date(f.start);const days=val(f,"days");if(!Number.isInteger(days)||Math.abs(days)>365250)throw Error("Days must be a whole number within range.");return result(new Date(ms+days*86400000).toISOString().slice(0,10));}
 case "download":return fmtNum(val(f,"size",0)*8/pos(f,"speed"),"seconds (ideal throughput, MB decimal)");
 case "storage":return result(fmtNum(pos(f,"gib")*1024,"MiB").text+"\n"+fmt(pos(f,"gib")*1024**3,0)+" bytes");
 case "percentage":return fmtNum(val(f,"amount")*val(f,"percent")/100);
 case "percent-change":return fmtNum((val(f,"new")-val(f,"old"))/pos(f,"old")*100,"%");
 case "discount":{a=val(f,"price",0);b=val(f,"percent",0);if(b>100)throw Error("Discount cannot exceed 100%.");return fmtNum(a*(1-b/100));}
 case "average":return fmtNum((val(f,"a")+val(f,"b")+val(f,"c"))/3);
 case "ratio":case "aspect":{a=ints(f,op==="ratio"?"a":"width");b=ints(f,op==="ratio"?"b":"height");if(!a||!b)throw Error("Both must be positive.");let x=a,y=b;while(y){const z=x%y;x=y;y=z;}return result(a/x+":"+b/x+" ratio");}
 case "electricity":return fmtNum(val(f,"watts",0)*val(f,"hours",0)*val(f,"days",0)/1000*val(f,"tariff",0),"in local currency");
 case "fuel":return fmtNum(val(f,"distance",0)*val(f,"use",0)/100*val(f,"price",0),"in local currency");
 case "margin":{a=val(f,"cost",0);b=pos(f,"price");return result("Profit: "+fmt(b-a)+"\nMargin: "+fmt((b-a)/b*100)+"%");}
 case "markup":{a=pos(f,"cost");b=val(f,"price",0);return fmtNum((b-a)/a*100,"% markup");}
 case "breakeven":{a=val(f,"fixed",0);b=val(f,"price",0);c=val(f,"variable",0);if(b<=c)throw Error("Selling price must exceed unit variable cost.");return fmtNum(Math.ceil(a/(b-c)),"units");}
 case "freelance":return fmtNum(val(f,"target",0)/(pos(f,"weekly")*pos(f,"weeks")),"hourly billing rate");
 case "ai-cost":return fmtNum(val(f,"inputTokens",0)/1e6*val(f,"inputRate",0)+val(f,"outputTokens",0)/1e6*val(f,"outputRate",0),"USD estimated");
 case "context":{a=val(f,"window",0);b=val(f,"system",0)+val(f,"history",0)+val(f,"output",0);if(b>a)throw Error("Reserved tokens exceed context window.");return fmtNum(a-b,"tokens remaining");}
 default:throw Error("Tool handler unavailable: "+op);
 }
}
