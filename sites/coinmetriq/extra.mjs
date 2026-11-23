import fs from "node:fs";
const catalog=JSON.parse(fs.readFileSync(new URL("./articles.json",import.meta.url),"utf8"));
if(catalog.schemaVersion!==1||!Array.isArray(catalog.articles))throw Error("Invalid CoinMetriq editorial catalog.");
const moreGuides=catalog.articles.filter(a=>a.status==="published");
import {portfolioRoutes,renderPortfolioPages} from "./portfolio-pages.mjs";
import {tools} from "./studio-core.mjs";
const esc=x=>String(x??"").replace(/[&<>"']/g,v=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[v]));
const crumb=(title)=>'<nav class="cm-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span> / </span><span>'+esc(title)+'</span></nav>';
const heading=(tag,title,intro)=>'<section class="cm-page-hero"><div class="cm-container">'+crumb(title)+'<span class="cm-kicker">'+esc(tag)+'</span><h1>'+esc(title)+'</h1><p>'+esc(intro)+'</p></div></section>';
const link=(route,title,desc,tag)=>'<a class="cm-extra-card" href="'+route+'"><small>'+esc(tag)+'</small><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p><span aria-hidden="true">Open tool ↗</span></a>';
const form=(t)=>{
 const fields=(t.fields||[]).map(([key,label,initial])=>'<label class="cm-extra-field"><span>'+esc(label)+'</span><input name="'+esc(key)+'" inputmode="decimal" type="number" step="any" required value="'+esc(initial)+'"></label>').join("");
 const textarea=t.textarea?'<label class="cm-extra-field"><span>'+esc(t.help)+'</span><textarea name="'+esc(t.textarea)+'" required rows="6" spellcheck="false">'+esc(t.example)+'</textarea></label>':"";
 return '<form class="cm-extra-form" data-cm-tool="'+esc(t.slug)+'"><div class="cm-extra-fields">'+fields+textarea+'</div><button class="cm-button cm-button-solid" type="submit">Calculate <span aria-hidden="true">↗</span></button><div class="cm-extra-result" role="status" aria-live="polite"><strong>Enter your scenario</strong><p>Runs privately in your browser. Nothing is uploaded.</p></div><div class="cm-extra-actions"><button type="button" data-cm-share disabled>Share this tool</button><button type="button" data-cm-copy disabled>Copy result</button><button type="button" data-cm-download disabled>Save result card PNG</button></div></form>';
};
const listCards=()=>tools.map(t=>link("/studio/"+t.slug+"/",t.title,t.short,"BROWSER-ONLY TOOL")).join("");
const meta={};
const guides=[
 {
 slug:"trading-fees-and-real-profit",
 category:"Trading Mathematics",
 faq:[["Does a higher selling price guarantee profit?","No. Fees on both sides and actual executed proceeds may offset a small quoted gain."],["Does this model include spreads and taxes?","No. It uses exactly the manual fees and prices supplied to the calculator."]],
 title:"Why a price gain is not always a trading profit",
 excerpt:"A reproducible example of buy fees, sell fees and net trading results.",
 paragraphs:[
 ["The question","A chart can show a higher selling price even when the trade loses money. The result depends on the total cash paid for the purchase, the actual proceeds of the sale, and other costs. These are separate from the headline percentage price change."],
 ["Example with actual numbers","Suppose five tokens cost 100 USD each, a 0.5% buy fee is charged, they are sold for 101 USD each and the sell fee is 0.5%. Initial spending is 500 + 2.50 = 502.50 USD. Sale proceeds are 505 − 2.525 = 502.475 USD. The transaction therefore loses 0.025 USD before any other taxes, withdrawals, slippage or borrowing costs."],
 ["Method","Total cost = quantity × buy price × (1 + buy fee percentage / 100). Total proceeds = quantity × sell price × (1 − sell fee percentage / 100). Net result = proceeds − cost. Break-even sell price = total cost / [quantity × (1 − sell fee fraction)]."],
 ["Where this model stops","The tool is an arithmetic scenario, not an exchange quote. Real order execution, maker/taker schedules, spread, funding and taxes can change the outcome. Compare charges in the same currency and write down your assumptions."]
 ],tool:"trade-profit"
 },
 {
 slug:"weighted-average-crypto-entry",
 category:"Portfolio Methods",
 faq:[["Why not average the purchase prices directly?","A fill buying more units contributes more to total invested cost than a very small fill."],["Is average entry the same as a legal tax lot basis?","No. The simplified arithmetic example does not decide a jurisdiction-specific tax convention."]],
 title:"Weighted average entry price across multiple fills",
 excerpt:"Calculate the average cost of a holding without averaging prices incorrectly.",
 paragraphs:[
 ["Why an arithmetic mean is misleading","Buying two tokens at 100 USD and eight at 200 USD does not produce a 150 USD average entry. You spent 200 + 1600 = 1800 USD for ten tokens, so the correct weighted average before fees is 180 USD per token. The quantity of each fill matters."],
 ["Fees belong in cost","For three fills of price, quantity and fixed USD fee — (100,2,1), (120,3,2) and (90,1,0.5) — total purchase cost is 201 + 362 + 90.5 = 653.50 USD. Six acquired tokens yield a 108.9167 USD weighted entry. A simple average of 100, 120 and 90 would be wrong."],
 ["Method","Sum every fill's price × quantity + allocated purchase fee. Divide by the total acquired quantity. If you transferred coins and incurred withdrawal fees or sold a portion, choose and document an appropriate accounting convention; this simple estimator does not implement jurisdictional tax-lot accounting."],
 ["Practical use","Export your own exchange records, normalize currency and order units, then paste one fill per line into the browser calculator. Keep the original file privately. Do not upload private keys or wallet recovery phrases to any tool."]
 ],tool:"average-entry"
 },
 {
 slug:"drawdown-and-recovery-math",
 category:"Portfolio Methods",
 faq:[["Why does a 30 percent fall require a larger percentage recovery?","The recovery is measured from the smaller post-loss base: 300 divided by 700 is about 42.86 percent."],["Does historical maximum drawdown predict the next crash?","No. It summarizes the worst decline observed in the chosen historical observations."]],
 title:"Why a 30% drawdown needs more than a 30% recovery",
 excerpt:"Understand portfolio peak-to-trough loss mathematically with a worked scenario.",
 paragraphs:[
 ["Peak and trough","A portfolio recorded at 1,000 USD and later 700 USD has fallen by (1000−700)/1000 = 30%. Maximum drawdown is the largest observed percentage fall relative to the highest prior observation in the same series, not the average daily loss."],
 ["Recovery uses a new base","To move from 700 USD back to 1,000 USD, the needed change is (1000−700)/700 = 42.857%. A 30% rise from 700 USD would reach only 910 USD. Declines and rebounds are not symmetric because they are measured from different starting balances."],
 ["Method and data hygiene","For each date, store the largest value observed up to that date. Compute (running peak − current value)/running peak. The maximum of these fractions is the observed maximum drawdown. Include observation dates and use one consistent valuation currency. Missing observations or deposits and withdrawals can distort interpretation."],
 ["Limitations","A drawdown chart summarizes past values only. It cannot determine the chance of future losses or distinguish market performance from net deposits if your uploaded values include cash flows."]
 ],tool:"drawdown"
 }
,...moreGuides
];
const funItems=[
 ["fee-goblin","Fee Goblin","Spot how repeated small exchange fees can consume a hypothetical budget."],
 ["dca-time-machine","DCA Time Machine","Reveal an example average price across a sequence of imagined purchase periods."],
 ["hodl-rollercoaster","HODL Rollercoaster","Watch what the peak-to-trough decline does to a fictional portfolio ride."],
 ["moon-math","Moon Math vs Reality","Turn an outrageous price-multiplier dream into clear percentage math."],
 ["portfolio-personality","Portfolio Personality Card","Choose a research style and receive a purely playful, non-diagnostic nickname."],
 ["coin-split","What-if Coin Split","Split a fictional portfolio into two coins and see how concentrated it becomes."],
 ["mining-monster","Mining Electric Bill Monster","Let an imaginary mining machine munch electricity units and show the cost."],
 ["unlock-surprise","Token Unlock Surprise","See how adding fictional unlocked supply changes the relative share of holdings."],
 ["scam-bingo","Scam Signal Bingo","Spot warning signs in fictional crypto promotions. Learn, do not connect a wallet."],
 ["emoji-decoder","Crypto Emoji Decoder","Match a playful symbol to a real basic crypto vocabulary term."]
];
function gameCard(item){
 const [slug,title,desc]=item;
 const inputs={
  "fee-goblin":'<label class="cm-extra-field">Trade amount USD<input name="amount" type="number" min="1" step="any" value="100" required></label><label class="cm-extra-field">Trades per month<input name="count" type="number" min="1" max="100000" step="1" value="20" required></label><label class="cm-extra-field">Fee per trade (%)<input name="fee" type="number" min="0" max="100" step="any" value="0.5" required></label>',
  "dca-time-machine":'<label class="cm-extra-field">Hypothetical dated prices (CSV: date,price) or comma-separated prices<textarea name="prices" rows="5" required spellcheck="false">2026-01-01,100\n2026-02-01,80\n2026-03-01,120\n2026-04-01,90</textarea></label><label class="cm-extra-field">Import your local dated CSV (no upload)<input type="file" data-cm-fun-csv accept=".csv,text/csv"></label><label class="cm-extra-field">USD per hypothetical purchase<input name="amount" type="number" min="1" step="any" value="50" required></label>',
  "hodl-rollercoaster":'<label class="cm-extra-field">Dated fictional portfolio values (date,value)<textarea name="values" rows="5" required spellcheck="false">2026-01-01,1000\n2026-02-01,1500\n2026-03-01,900\n2026-04-01,1200\n2026-05-01,1700</textarea></label>',
  "moon-math":'<label class="cm-extra-field">Wild target multiplier (×)<input name="multiple" type="number" min="1.01" max="1000000" step="any" value="10" required></label>',
  "portfolio-personality":'<label class="cm-extra-field">Which activity sounds fun?<select name="style"><option value="math">Checking each number twice</option><option value="maps">Exploring a chart for patterns</option><option value="notes">Writing thoughtful research notes</option></select></label>',
  "coin-split":'<label class="cm-extra-field">Coin A share (%)<input name="share" type="number" min="0" max="100" step="any" value="70" required></label>',
  "mining-monster":'<label class="cm-extra-field">Power draw (watts)<input name="watts" type="number" min="1" step="any" value="1200" required></label><label class="cm-extra-field">Operating hours<input name="hours" type="number" min="1" step="any" value="720" required></label><label class="cm-extra-field">Electricity cost (USD/kWh)<input name="tariff" type="number" min="0" step="any" value="0.12" required></label><label class="cm-extra-field">Fictional gross mining revenue (USD for this period)<input name="revenue" type="number" min="0" step="any" value="140" required></label>',
  "unlock-surprise":'<label class="cm-extra-field">Initial supply<input name="supply" type="number" min="1" step="any" value="10000000" required></label><label class="cm-extra-field">Newly unlocked supply<input name="unlock" type="number" min="0" step="any" value="2500000" required></label>',
  "scam-bingo":'<p>Mark the three fictional warning signs. This is an awareness game, not a full risk assessment.</p><label><input type="checkbox" name="warning" value="1"> Guaranteed 1000% return, zero risk</label><label><input type="checkbox" name="warning" value="2"> Enter your recovery phrase to claim a gift</label><label><input type="checkbox" name="warning" value="3"> Pay a secret unlock fee to withdraw</label>',
  "emoji-decoder":'<label class="cm-extra-field">⛽ What does gas mean here?<select name="gas"><option value="fee">Network execution / transaction fee</option><option value="wallet">Physical wallet</option><option value="token">Every token has identical gas rules</option></select></label><label class="cm-extra-field">💧 What is market liquidity?<select name="liquidity"><option value="depth">Availability and depth of executable trading</option><option value="supply">Exactly the maximum token supply</option><option value="stake">A guaranteed staking yield</option></select></label><label class="cm-extra-field">🔑 What does a wallet help manage?<select name="wallet"><option value="keys">Signing keys and chain transactions</option><option value="price">A guaranteed asset price</option><option value="bank">A bank deposit account only</option></select></label>'
 };
 if(!inputs[slug])throw Error("Unsupported game.");
 const decorative='<svg class="cm-game-emblem" viewBox="0 0 180 70" aria-hidden="true" focusable="false"><path d="M5 57 H175" stroke="#466860" stroke-width="2"/><path d="M5 46 Q30 4 58 37 T110 30 T174 15" fill="none" stroke="#a9f17a" stroke-width="4"/><circle cx="58" cy="37" r="6" fill="#64d6c2"/><circle cx="110" cy="30" r="6" fill="#64d6c2"/></svg>';
 return '<form class="cm-fun-game" data-cm-fun="'+slug+'"><div class="cm-game-banner">'+decorative+'<div class="cm-kicker">LOCAL / FICTIONAL GAME</div></div><h2>'+esc(title)+'</h2><p>'+esc(desc)+'</p><div class="cm-extra-fields">'+inputs[slug]+'</div><button class="cm-button cm-button-solid" type="submit">Reveal result</button><div class="cm-extra-result" role="status" aria-live="polite"><strong>Play to reveal</strong><p>No personal accounts, wallet connection or live prices.</p></div><div class="cm-extra-actions"><button type="button" data-cm-share disabled>Share game</button><button type="button" data-cm-copy disabled>Copy result</button><button type="button" data-cm-download disabled>Save game card</button></div></form>';
}
export function extraRoutes(){
 return ["/studio/","/fun/","/articles/",...tools.map(t=>"/studio/"+t.slug+"/"),...guides.map(g=>"/articles/"+g.slug+"/"),...portfolioRoutes()];
}
export function renderExtraPages(c,groups,base,page){
 const files={};
 const intro="No accounts, no wallet connection, no real-time quotes. Every calculation stays in your own browser; numbers are educational scenarios.";
 const top=heading("CRYPTO / PRIVATE WORKBENCH","Crypto Research Studio",intro);
 files["studio/index.html"]=page(c,base,{title:"Crypto Research Studio",description:"Twenty private crypto portfolio and fee calculators for DCA, mining, staking, drawdown and more; no login or live rates.",route:"/studio/",crumbs:[["Home","/"],["Studio","/studio/"]]},top+'<section class="cm-section"><div class="cm-container"><div class="cm-extra-note"><strong>Know your assumptions.</strong> Each calculator is based on your manual inputs. None is a financial forecast. Avoid sharing private account files or keys.</div><div class="cm-extra-grid">'+listCards()+'</div><p>Already know the circulation estimate? <a href="/tools/'+esc(c.tool.slug)+'/">Use the existing Token Market Cap Calculator</a>.</p></div></section>',groups);
 for(const t of tools){
  const route="/studio/"+t.slug+"/";
  const body=heading("CRYPTO / SCENARIO CALCULATOR",t.title,t.short)+'<section class="cm-section"><div class="cm-container cm-extra-tool"><div>'+form(t)+'</div><aside class="cm-extra-explainer"><h2>Method & limitations</h2><p>'+esc(t.short)+'</p><div class="cm-code-line">'+esc(t.formula)+'</div><h3>Data privacy</h3><p>Inputs run on this device only. No asset prices or account data are fetched or transmitted to our server.</p><h3>Assumptions</h3><p>These outputs are mathematical scenarios in USD or tokens where labeled. They exclude unspecified trading spreads, taxes, risk, account funding and external changes. They are not financial advice.</p><a class="cm-textlink" href="/studio/">Explore other crypto calculators ↗</a></aside></div></section>';
  files["studio/"+t.slug+"/index.html"]=page(c,base,{title:t.title,description:t.short+" Browser-based, no registration or live market connection.",route,crumbs:[["Home","/"],["Crypto Studio","/studio/"],[t.title,route]]},body,groups);
 }
 const funHtml=heading("CRYPTO / FREE INTERACTIVE","Crypto Chaos Lab","Ten playful, fictional crypto education challenges. Learn the arithmetic, save a result card and share only if you want to.")+'<section class="cm-section"><div class="cm-container"><div class="cm-extra-grid cm-extra-game-grid">'+funItems.map(gameCard).join("")+'</div><p class="cm-tiny">Entertainment and education only. Not investment advice, market signals, a psychological score, or a security guarantee.</p><a class="cm-textlink" href="/studio/">Go to the serious research calculators ↗</a></div></section>';
 files["fun/index.html"]=page(c,base,{title:"Crypto Chaos Lab",description:"Play ten original educational crypto challenges; original free browser mini games and shareable result cards.",route:"/fun/",crumbs:[["Home","/"],["Crypto Chaos Lab","/fun/"]]},funHtml,groups);
 const articleCategories=["Trading Mathematics","Portfolio Methods","Protocol & Network","Wallet Safety"];
 const articleGroups=articleCategories.map(name=>({name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),items:guides.filter(g=>g.category===name)})).filter(x=>x.items.length);
 const jumpLinks=articleGroups.map(g=>'<a href="#'+g.slug+'">'+esc(g.name)+' ('+g.items.length+')</a>').join("");
 const articleSections=articleGroups.map(g=>'<section id="'+g.slug+'" class="cm-guide-category"><div class="cm-section-head"><h2>'+esc(g.name)+'</h2><span>'+g.items.length+' independently useful guides</span></div><div class="cm-extra-grid">'+g.items.map(a=>link("/articles/"+a.slug+"/",a.title,a.excerpt,"ORIGINAL EDUCATIONAL ARTICLE")).join("")+'</div></section>').join("");
 const guideIndex=heading("CRYPTO / ORIGINAL METHODS","Crypto Research Articles","Original worked arithmetic, source-backed methods and practical risk explainers organized by research question, not mass-published keyword variations.")+'<section class="cm-section"><div class="cm-container"><nav class="cm-guide-jumps" aria-label="Article categories">'+jumpLinks+'</nav>'+articleSections+'<p>Related <a href="/topics/">research topics</a> include original worked methods. Legal, tax and time-sensitive crypto news notes remain noindex until further qualified editorial review.</p></div></section>';
 files["articles/index.html"]=page(c,base,{title:"Crypto Research Articles",description:"Original sourced crypto research guides covering trading fees, portfolio math, security, block rewards and practical risks.",route:"/articles/",crumbs:[["Home","/"],["Articles","/articles/"]]},guideIndex,groups);
 for(const g of guides){
  const route="/articles/"+g.slug+"/";
  const article=heading("CRYPTO / METHOD EXPLAINED",g.title,g.excerpt)+'<section class="cm-section"><div class="cm-container cm-article-grid"><article class="cm-paper"><div class="cm-reading-meta">ORIGINAL MATHEMATICAL EXAMPLE · EDUCATIONAL · NOT A LIVE MARKET QUOTE</div>'+g.paragraphs.map(([title,text])=>'<h2>'+esc(title)+'</h2><p>'+esc(text)+'</p>').join("")+'<h2>Quick questions</h2>'+(g.faq?.length?g.faq.map(([q,a])=>'<details class="cm-guide-faq"><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join(""):'<p>Read the methodology and limits above before applying this scenario.</p>')+'<h2>Try the exact calculation</h2><p><a href="'+esc(g.href||"/studio/"+g.tool+"/")+'">Open the corresponding free browser tool</a>, enter the numbers from this explanation and verify the output. The example is fictional and has no predictive meaning.</p>'+(g.sources?.length?'<h2>Primary and original reference sources</h2><ul>'+g.sources.map(([name,url])=>'<li><a href="'+esc(url)+'" rel="noopener noreferrer">'+esc(name)+'</a></li>').join("")+'</ul>':"")+'<p>Published: '+esc(g.publishedAt||'2026-11-23')+' · General education; the scenarios described are not investment or tax advice. Verify changing technical and legal claims against the current primary sources.</p></article><aside class="cm-read-aside"><div class="cm-aside-card"><h3>Research, not signals</h3><p>No live exchange prices, wallet data or personalized trading guidance are used.</p><a href="/studio/">Research Studio ↗</a></div><div class="cm-aside-card"><h3>Other explainers</h3>'+guides.filter(z=>z.slug!==g.slug).map(z=>'<a class="cm-aside-link" href="/articles/'+esc(z.slug)+'/">'+esc(z.title)+'</a>').join("")+'</div></aside></div></section>';
  files["articles/"+g.slug+"/index.html"]=page(c,base,{title:g.title,description:g.excerpt,route,type:"article",datePublished:g.publishedAt||"2026-11-23",crumbs:[["Home","/"],["Articles","/articles/"],[g.title,route]]},article,groups);
 }
 Object.assign(files,renderPortfolioPages(c,groups,base,page));
 return files;
}
