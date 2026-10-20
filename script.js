const A=(()=>{let s=D;try{const j=JSON.parse(localStorage.getItem("da_articles"));if(Array.isArray(j)&&j.length)s=j}catch(x){}s.forEach(a=>{if(a.ts)a.h=(Date.now()-a.ts)/36e5});return s.sort((x,y)=>x.h-y.h)})();
const P={about:["About us","Daily Avenue is a general publication covering news, features, jobs and free resources."],contact:["Contact us","Add your email, phone and WhatsApp details here."],privacy:["Privacy policy","Add your privacy policy here."]};
const $=s=>document.querySelector(s),e=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ago=h=>h<1?"Just now":h<24?Math.round(h)+" hours ago":Math.round(h/24)+" days ago";
const th=(a,l)=>`<div class="th" style="--h:${H[a.c]}">${l?e(a.c):""}</div>`;
const meta=a=>`<div class="m"><span>${e(a.c)}</span><span>${ago(a.h)}</span></div>`;
const card=(a,b)=>`<a class="cd${b?" big":""}" href="#/a/${a.id}">${th(a,1)}<h3>${e(a.t)}</h3><div class="m"><span>${e(a.a)}</span><span>${ago(a.h)}</span></div>${b?`<p>${e(a.x)}</p>`:""}</a>`;
const row=a=>`<a class="li" href="#/a/${a.id}">${th(a)}<div>${meta(a)}<h3>${e(a.t)}</h3></div></a>`;
const sec=(t,h)=>`<section><h2 class="sh">${t}</h2>${h}</section>`;
const lk=c=>"#/c/"+encodeURIComponent(c);
let n=4;
function home(){
 const top=[...A].sort((x,y)=>y.v-x.v).slice(0,5);
 const blk=c=>sec(e(c)+` <a class="m" href="${lk(c)}">See all</a>`,A.filter(a=>a.c===c).slice(0,3).map(row).join(""));
 return `<div class="g hero">${card(A[0],1)}<div>${A.slice(1,4).map(row).join("")}</div></div>
<div class="g main"><div>${sec("What’s new",A.slice(4,n+4).map(row).join("")+(n+4<A.length?'<p><button class="bt" id="more">Load more</button></p>':""))}</div>
<aside>${sec("Trending",'<ol class="tr">'+top.map(a=>`<li><a href="#/a/${a.id}">${e(a.t)}</a></li>`).join("")+"</ol>")}<div class="ad">Advertise here</div></aside></div>
<div class="g cols">${["News","Business","Tech","GES Files","NTC Updates","Jobs & Scholarships"].map(blk).join("")}</div>`;
}
function list(t,l,msg){return sec(t,l.length?`<div class="g cols">${l.map(a=>card(a)).join("")}</div>`:`<p>${msg}</p>`)}
function art(a){
 if(!a)return `<div class="pg"><h1>Story not found</h1><p><a href="#/"><u>Go to the homepage</u></a> to find the latest stories.</p></div>`;
 const r=A.filter(x=>x.c===a.c&&x.id!==a.id).slice(0,3);
 return `<article class="art"><a class="m" href="${lk(a.c)}">${e(a.c)}</a><h1>${e(a.t)}</h1><div class="m"><span>${e(a.a)}</span><span>${ago(a.h)}</span><span>${a.v} reads</span></div>${th(a)}<p><strong>${e(a.x)}</strong></p>${a.b.map(p=>`<p>${e(p)}</p>`).join("")}${r.length?sec("More in "+e(a.c),r.map(row).join("")):""}</article>`;
}
function go(keep){
 const m=location.hash.match(/^#\/(\w)\/(.*)$/)||[],k=m[1],v=m[2]||"";let h,on=k?"x":"";
 if(k==="a")h=art(A.find(a=>a.id==v));
 else if(k==="c"){const c=decodeURIComponent(v);on=c;h=list(e(c),A.filter(a=>a.c===c),"No stories here yet.")}
 else if(k==="s"){const q=decodeURIComponent(v),l=q.toLowerCase();h=list("Results for “"+e(q)+"”",A.filter(a=>(a.t+a.x+a.c).toLowerCase().includes(l)),"No stories match your search. Try a shorter word.")}
 else if(k==="p"&&P[v])h=`<div class="pg"><h1>${P[v][0]}</h1><p>${P[v][1]}</p></div>`;
 else h=home();
 $("#app").innerHTML=h;
 document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.dataset.k===on));
 const b=$("#more");if(b)b.onclick=()=>{n+=4;go(1)};
 if(!keep)scrollTo(0,0);
}
$("#nv").innerHTML='<a href="#/" data-k="">Home</a>'+C.map(c=>`<a href="${lk(c)}" data-k="${e(c)}">${e(c)}</a>`).join("");
$("#tk").innerHTML="<b>Breaking</b>"+A.slice(0,3).map(a=>`<a href="#/a/${a.id}">${e(a.t)}</a>`).join("");
$("#dt").textContent=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
$("#sf").onsubmit=ev=>{ev.preventDefault();const q=$("#q").value.trim();if(q)location.hash="#/s/"+encodeURIComponent(q)};
addEventListener("hashchange",()=>go());go(1);
