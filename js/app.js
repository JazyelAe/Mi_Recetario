const RECETAS = [
  {n:"Tacos de papa", e:"🌮", c:"Antojitos", t:25, d:"Fácil", i:"papa, tortilla, queso, salsa"},
  {n:"Sopa de lentejas", e:"🥣", c:"Sopas", t:40, d:"Fácil", i:"lentejas, zanahoria, jitomate, ajo"},
  {n:"Guacamole clásico", e:"🥑", c:"Antojitos", t:10, d:"Muy fácil", i:"aguacate, cebolla, limón, cilantro"},
  {n:"Pollo al horno", e:"🍗", c:"Platos fuertes", t:60, d:"Media", i:"pollo, ajo, limón, especias"},
  {n:"Arroz rojo", e:"🍚", c:"Guarniciones", t:30, d:"Fácil", i:"arroz, jitomate, ajo, caldo"},
  {n:"Frijoles de la olla", e:"🫘", c:"Guarniciones", t:90, d:"Fácil", i:"frijol, cebolla, epazote, sal"},
  {n:"Ensalada fresca", e:"🥗", c:"Ligeros", t:15, d:"Muy fácil", i:"lechuga, pepino, jitomate, limón"},
  {n:"Hotcakes caseros", e:"🥞", c:"Desayunos", t:20, d:"Fácil", i:"harina, leche, huevo, mantequilla"}
];
let cat = "Todas", texto = "";
const $ = s => document.querySelector(s);
const cats = ["Todas", ...new Set(RECETAS.map(r => r.c))];

function pintarFiltros(){
  $("#filters").innerHTML = cats.map(c => `<button class="chip ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join("");
  document.querySelectorAll(".chip").forEach(b => b.onclick = () => { cat = b.dataset.c; render(); });
}
function render(){
  const lista = RECETAS.filter(r =>
    (cat === "Todas" || r.c === cat) &&
    (r.n + " " + r.i).toLowerCase().includes(texto.toLowerCase()));
  $("#grid").innerHTML = lista.map(r => `
    <article class="card"><div class="em">${r.e}</div><h3>${r.n}</h3>
    <p>${r.i}</p><div class="meta"><span>⏱ ${r.t} min</span><span>${r.d}</span></div></article>`).join("")
    || "<p>No se encontraron recetas.</p>";
  $("#count").textContent = lista.length + " receta(s) encontrada(s)";
  pintarFiltros();
}
$("#q").addEventListener("input", e => { texto = e.target.value; render(); });
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const ok = $("#ok"); ok.hidden = false;
  ok.textContent = "¡Gracias, " + $("#nombre").value + "! Tu sugerencia fue registrada.";
  e.target.reset();
});
render();
