document.addEventListener("DOMContentLoaded",()=>{
 const field=document.getElementById("cm-topic-search");
 if(!field)return;
 const cards=[...document.querySelectorAll("[data-search-card]")];
 const groups=[...document.querySelectorAll("[data-group]")];
 const result=document.getElementById("cm-search-count");
 const empty=document.getElementById("cm-empty");
 field.addEventListener("input",()=>{
  const q=field.value.trim().toLowerCase();
  let count=0;
  for(const card of cards){const show=card.dataset.search.includes(q);card.hidden=!show;if(show)count++;}
  for(const group of groups){group.hidden=![...group.querySelectorAll("[data-search-card]")].some(x=>!x.hidden);}
  if(result)result.textContent=count+" "+(count===1?"topic":"topics")+" found";
  if(empty)empty.hidden=count!==0;
 });
});