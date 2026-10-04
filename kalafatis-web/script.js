const WA_NUMBER="595971565500";
const MENU=[
{id:"picadas",t:"Picadas",items:[
["Picada marineritas","12 marineritas de lomo, 12 mandiocas fritas y salsa de ajo",55000],
["Picada frita chica","12 milanesitas de lomo, 12 de pollo, papas fritas, aros de cebolla, papas noisette y chipa guasu",72000],
["Mandi'o cheese","12 mandiocas fritas con queso cheddar fundido",25000],
["Porción de chipa guasu","",15000]]},
{id:"lomitos",t:"Lomitos",note:"Agregados: 5.000 Gs.",items:[
["Lomito de carne","Pan tostado, lomito de carne, jamón y queso, katupyry, lechuga, tomate, cebolla y mayonesa",32000],
["Lomito de pollo","Pan tostado, lomito de pollo, jamón y queso, katupyry, lechuga, tomate, cebolla y mayonesa",30000],
["Lomito mixto","Carne y pollo, jamón y queso, katupyry, lechuga, tomate, cebolla, mayonesa y huevo",45000]]},
{id:"burgers",t:"Hamburguesas",note:"Caseras, con pan tostado.",items:[
["Para niños","Hamburguesa casera de 85 gr, tomate, mayonesa y queso cheddar",20000],
["Paraguayan Burger","Doble carne de 85 gr, huevo frito, cheddar, katupyry, tomate, lechuga y salsa barbacoa",40000],
["Para valientes","Triple carne de 85 gr, triple cheddar, triple panceta, lechuga, tomate, mayonesa y papas fritas",44000],
["Kalafatis Burger","Doble carne de 85 gr, doble cheddar, doble panceta, lechuga, tomate, cebolla, mayonesa y papas fritas",42000]]},
{id:"papas",t:"Papas",items:[
["Papas fritas regulares","",16000],
["Papas con cheddar","Con albahaca seca",25000],
["Papas Kalafatis","Con queso cheddar fundido, cebollitas de verdeo y panceta",48000],
["Aros de cebolla","",25000]]},
{id:"otros",t:"Más platos",items:[
["Wrap César","Lechuga repollada, pollo, queso muzzarella y salsa césar casera en rapiditas",33000],
["Ensalada César","Lechuga repollada, crotones, pollo, queso muzzarella y salsa césar casera",45000],
["Sándwich de milanesa de carne","Acompañado de aros de cebolla",39000],
["Sándwich de milanesa de pollo","Acompañado de aros de cebolla",38000],
["Bife de chorizo con guarnición","Bife de 250 gr con ensalada mixta, mandiocas fritas o papas fritas",75000],
["Picada paraguaya","Bife de chorizo, variedad de chorizos, mandioca, pan de ajo y chipa guasu",180000]]},
{id:"tragos",t:"Tragos",items:[
["Daiquiri de durazno","",25000],["Daiquiri de frutilla","",30000],["Piña colada","",25000],["Pantera rosa","",25000],
["Cuba libre","Coca cola, ron blanco, limón, hielo",22000],["Margarita","Clásica o frozen",28000],
["Caipirinha","",25000],["Caipiroska","",30000],["Whiscola","Coca cola, whisky, hielo",25000],
["Gintonic","Puerto de Indias",30000],["Gin dulce","Puerto de Indias",30000],["Gin dulce frutos rojos","Puerto de Indias",40000],
["Whisky en las rocas","Red Label",20000],["Whisky en las rocas","Double Black",30000],
["Shot de Jagger","",20000],["Shot de tequila","José Cuervo Silver",20000],
["Jarra de sangría","",45000],["Fernet cola","Branca",25000],["Aperol spritz","Aperol, espumante, soda y naranja",30000]]},
{id:"cervezas",t:"Cervezas",items:[
["Chopp Munich 300 ml","",11000],["Chopp Munich 500 ml","",14000],["Chopp Pilsen 500 ml","",15000],
["Corona 710 ml","",22000],["Coronita 355 ml","",12000],["Mini Coronita 210 ml","",10000],
["Bud 66","",21000],["Stella Artois 660 ml","",27000],["Stella Artois sin alcohol","",15000],
["Patagonia Weisse","",25000],["Patagonia Amber","",25000],["Patagonia Pilsener","",25000],["Patagonia 24/7","",25000],["Skol 275 ml","",10000]]},
{id:"sin",t:"Gaseosas y jugos",items:[
["Coca Cola 500 ml","",12000],["Coca Cola sin azúcar 500 ml","",12000],["Sprite 500 ml","",12000],["Fanta naranja 500 ml","",12000],["Fanta guaraná 500 ml","",12000],
["Agua mineral","",10000],["Agua con gas","",10000],["Agua tónica","",10000],
["Jugo de durazno","Natural, con azúcar",15000],["Jugo de limón","Natural, con azúcar",15000],["Jugo de piña","Natural, con azúcar",15000],
["Jugo de frutilla","Natural, con azúcar",20000],["Jugo tutti frutti","Natural, con azúcar",20000],
["Jugo detox","Limón, jengibre y menta",20000],["Jugo verde","Limón, jengibre, piña y menta",20000]]},
{id:"postres",t:"Postres",items:[
["Brownie con helado","",25000],["Cheesecake Oreo","",22000],["Cheesecake frutos rojos","",24000],["Red Velvet","",28000],["Carrot Cake","",28000]]}
];
const $=s=>document.querySelector(s),gs=n=>"₲ "+n.toLocaleString("es-PY");
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let cart={},cur=MENU[0].id,type="Delivery";
const all=[];MENU.forEach(c=>c.items.forEach(i=>all.push({k:all.length,c:c.id,n:i[0],d:i[1],p:i[2]})));
function render(){
  const q=$("#q").value.trim().toLowerCase();
  $("#nav").innerHTML=MENU.map(c=>`<button data-c="${c.id}" class="${!q&&c.id===cur?'on':''}">${c.t}</button>`).join("");
  let h="";
  MENU.forEach(c=>{
    const its=all.filter(i=>i.c===c.id&&(!q||(i.n+" "+i.d).toLowerCase().includes(q)));
    if(q?its.length:c.id===cur){
      h+=`<section class="cat on"><h2>${c.t}</h2>${c.note&&!q?`<p class="note">${c.note}</p>`:""}`+its.map(i=>`<div class="item"><div><h3>${esc(i.n)}</h3>${i.d?`<p>${esc(i.d)}</p>`:""}<div class="price">${gs(i.p)}</div></div><button class="add" data-k="${i.k}" aria-label="Agregar ${esc(i.n)}">+</button></div>`).join("")+"</section>";
    }
  });
  $("#main").innerHTML=h||'<p class="empty">No encontramos eso en la carta. Probá con otra palabra.</p>';
}
function upd(){
  const ks=Object.keys(cart),n=ks.reduce((a,k)=>a+cart[k],0),t=ks.reduce((a,k)=>a+cart[k]*all[k].p,0);
  $("#n").textContent=n;$("#tt").textContent=gs(t);$("#wa").disabled=!n;
  $("#lines").innerHTML=n?ks.map(k=>`<div class="line"><div><b>${esc(all[k].n)}</b><small>${gs(all[k].p*cart[k])}</small><div class="step"><button data-m="${k}">−</button>${cart[k]}<button data-a="${k}">+</button></div></div></div>`).join(""):'<p class="empty">Todavía no agregaste nada. Elegí algo de la carta.</p>';
}
const open=v=>{$("#dr").classList.toggle("on",v);$("#ov").classList.toggle("on",v)};
$("#nav").onclick=e=>{const c=e.target.dataset.c;if(c){cur=c;$("#q").value="";render();scrollTo({top:0})}};
$("#main").onclick=e=>{const k=e.target.dataset.k;if(k){cart[k]=(cart[k]||0)+1;upd();const b=e.target;b.textContent="✓";setTimeout(()=>b.textContent="+",600)}};
$("#lines").onclick=e=>{const m=e.target.dataset.m,a=e.target.dataset.a;if(a)cart[a]++;if(m&&--cart[m]<=0)delete cart[m];upd()};
$("#q").oninput=render;$("#fab").onclick=()=>open(1);$("#x").onclick=$("#ov").onclick=()=>open(0);
$("#ot").onclick=e=>{const t=e.target.dataset.t;if(!t)return;type=t;[...$("#ot").children].forEach(b=>b.classList.toggle("on",b===e.target));$("#adw").style.display=t==="Delivery"?"block":"none"};
$("#wa").onclick=()=>{
  const ks=Object.keys(cart);let m="*Pedido Kalafatis*%0A";
  m=decodeURIComponent(m)+ks.map(k=>`• ${cart[k]} x ${all[k].n} (${gs(all[k].p*cart[k])})`).join("\n")+`\n\n*Total:* ${$("#tt").textContent}\n*Tipo:* ${type}`;
  if($("#nm").value)m+=`\n*Nombre:* ${$("#nm").value}`;
  if(type==="Delivery"&&$("#ad").value)m+=`\n*Dirección:* ${$("#ad").value}`;
  if($("#nt").value)m+=`\n*Notas:* ${$("#nt").value}`;
  window.open("https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(m),"_blank");
};
function hours(){
  const n=new Date(),d=n.getDay(),h=n.getHours(),s=$("#st");
  const S={0:[16,25],1:null,2:[11,24],3:[11,24],4:[11,24],5:[11,24],6:[16,25]},D=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const t=S[d],p=S[(d+6)%7],f=x=>String(x%24).padStart(2,"0")+":00";
  let end=null;
  if(t&&h>=t[0])end=t[1];else if(p&&p[1]>24&&h<p[1]-24)end=p[1];
  if(end!==null){s.className="status open";s.lastChild.textContent="Abierto ahora · hasta las "+f(end);return}
  let w;
  if(t&&h<t[0])w="hoy a las "+f(t[0]);
  else for(let i=1;i<8;i++){const x=S[(d+i)%7];if(x){w=(i===1?"mañana":"el "+D[(d+i)%7])+" a las "+f(x[0]);break}}
  s.className="status";s.lastChild.textContent="Cerrado · abrimos "+w;
}
document.getElementById("merWa").onclick=()=>window.open("https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent("Hola, quiero consultar por la merienda en Kalafatis."),"_blank");
const openMod=v=>{$("#mod").classList.toggle("on",v);$("#mov").classList.toggle("on",v)};
$("#mx").onclick=$("#mov").onclick=()=>openMod(0);
$("#merPost").onclick=()=>{openMod(0);goCarta("postres")};
let tm;
function toast(t,a){const el=$("#toast");el.innerHTML="<span>"+esc(t)+"</span>"+(a?'<button id="ta">'+a.l+"</button>":"");el.classList.add("on");clearTimeout(tm);tm=setTimeout(()=>el.classList.remove("on"),4500);if(a)$("#ta").onclick=a.f}
const goCarta=c=>{if(c)cur=c;$("#q").value="";render();document.querySelector(".sticky").scrollIntoView({behavior:"smooth"})};
const ACT={
menu:()=>goCarta(),
drinks:()=>goCarta("tragos"),
info:()=>document.getElementById("info").scrollIntoView({behavior:"smooth"}),
amigos:()=>{goCarta("picadas");toast("Ideal para ir en grupo: las picadas se comparten.")},
pet:()=>toast("Tu mascota también es bienvenida en Kalafatis."),
merienda:()=>openMod(1)
};
document.querySelector(".perks").onclick=e=>{const g=e.target.closest("[data-go]");if(!g)return;g.classList.remove("pop");void g.offsetWidth;g.classList.add("pop");ACT[g.dataset.go]()};
render();upd();hours();
