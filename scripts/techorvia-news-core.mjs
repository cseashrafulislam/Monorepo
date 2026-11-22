// RSS/Atom metadata parser. Collect titles, dates and source URLs only: no scraped article bodies or images.
const entities={"amp":"&","lt":"<","gt":">","quot":'"',"apos":"'","nbsp":" "};
const decode=s=>String(s||"").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,"$1").replace(/&(#x[0-9a-f]+|#[0-9]+|amp|lt|gt|quot|apos|nbsp);/gi,(m,v)=>{if(v[0]==="#"){const cp=v[1].toLowerCase()==="x"?parseInt(v.slice(2),16):parseInt(v.slice(1),10);return cp>0&&cp<=0x10ffff?String.fromCodePoint(cp):m;}return entities[v.toLowerCase()]||m;}).replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
const tag=(xml,name)=>{const m=xml.match(new RegExp("<(?:[\\w-]+:)?"+name+"(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w-]+:)?"+name+">","i"));return m?decode(m[1]):"";};
export function parseFeed(xml,source){
 const items=[];const nodes=xml.match(/<item\b[\s\S]*?<\/item>|<entry\b[\s\S]*?<\/entry>/gi)||[];
 for(const node of nodes.slice(0,100)){
  const title=tag(node,"title").slice(0,240);
  let link=tag(node,"link");
  if(!link){const m=node.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*\/?>/i);if(m)link=decode(m[1]);}
  const rawDate=tag(node,"pubDate")||tag(node,"published")||tag(node,"updated");
  const time=Date.parse(rawDate||"");if(!Number.isFinite(time))continue;
  let u;try{u=new URL(link);}catch{continue;}
  if(u.protocol!=="https:"||u.username||u.password)continue;
  const allowed=new URL(source.url).hostname.replace(/^www\./,"");
  const host=u.hostname.replace(/^www\./,"");if(host!==allowed&&!host.endsWith("."+allowed))continue;
  if(title.length<15)continue;
  items.push({title,url:u.href,date:new Date(time).toISOString(),source:source.name});
 }
 return items;
}
export function curateNews(items,now=new Date()){
 const cutoff=now.getTime()-30*86400000,upper=now.getTime()+86400000;
 const list=items.filter(x=>{const d=Date.parse(x.date);return Number.isFinite(d)&&d>=cutoff&&d<=upper;}).sort((a,b)=>b.date.localeCompare(a.date));
 const seen=new Set(),filtered=[];
 for(const x of list){const key=x.title.toLowerCase().replace(/\W+/g," ").trim();if(seen.has(key))continue;seen.add(key);filtered.push(x);if(filtered.length===60)break;}
 return filtered;
}
