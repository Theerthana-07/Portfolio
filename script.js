// ---- Content (edit these arrays to personalise the page) ----
const skills=[
  {n:"HTML5",v:90},{n:"CSS3 and responsive layout",v:85},{n:"JavaScript (ES6+)",v:70},
  {n:"React",v:50},{n:"Git and GitHub",v:70},{n:"Accessibility basics",v:65}
];
const projects=[
  {t:"Personal Portfolio",c:"web",d:"This site: a responsive portfolio with a validated contact form and a light/dark theme.",col:"#2B50E6",l:"#"},
  {t:"College Event Portal",c:"web",d:"A multi-page festival site with event listings, a registration form and a photo gallery.",col:"#0E7C66",l:"#"},
  {t:"Weather Dashboard",c:"js",d:"Search any city and see current conditions from a public weather API, with error handling.",col:"#B5541C",l:"#"},
  {t:"Movie Explorer",c:"react",d:"Search and filter movies, view ratings and details, with loading and error states.",col:"#7A3FB0",l:"#"}
];

// ---- Skills ----
const sl=document.getElementById("skillList");
skills.forEach(s=>{
  sl.insertAdjacentHTML("beforeend",
  `<div><div class="skill-top"><span>${s.n}</span><span>${s.v}%</span></div>
   <div class="track" role="progressbar" aria-label="${s.n}" aria-valuenow="${s.v}" aria-valuemin="0" aria-valuemax="100"><div class="fill" data-w="${s.v}"></div></div></div>`);
});
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.style.width=e.target.dataset.w+"%";io.unobserve(e.target)}
}),{threshold:.4});
document.querySelectorAll(".fill").forEach(f=>io.observe(f));

// ---- Projects + filter ----
const grid=document.getElementById("projectGrid");
projects.forEach(p=>{
  grid.insertAdjacentHTML("beforeend",
  `<article class="card" data-c="${p.c}"><div class="thumb" style="background:${p.col}" aria-hidden="true">${p.t.split(" ").map(w=>w[0]).join("")}</div>
   <div class="card-body"><h3>${p.t}</h3><p>${p.d}</p><div class="links"><a href="${p.l}">Live site</a><a href="${p.l}">Code</a></div></div></article>`);
});
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));
  const f=b.dataset.f;
  document.querySelectorAll(".card").forEach(c=>c.hidden=!(f==="all"||c.dataset.c===f));
}));

// ---- Mobile menu ----
const nav=document.getElementById("nav"),menu=document.getElementById("menu");
menu.addEventListener("click",()=>{const o=nav.classList.toggle("open");menu.setAttribute("aria-expanded",o)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));

// ---- Theme toggle (storage may be unavailable, so it is guarded) ----
const root=document.documentElement;
try{const t=localStorage.getItem("theme");if(t)root.dataset.theme=t}catch(e){}
document.getElementById("theme").addEventListener("click",()=>{
  const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme=dark?"light":"dark";
  try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}
});

// ---- Contact form validation ----
const form=document.getElementById("form"),status=document.getElementById("status");
const rules={
  name:v=>v.trim().length<2?"Enter your name (at least 2 characters).":"",
  email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?"":"Enter a valid email, like name@example.com.",
  msg:v=>v.trim().length<10?"Write a message of at least 10 characters.":""
};
const ids={name:"name",email:"email",msg:"msg"};
function check(k){
  const el=document.getElementById(ids[k]),m=rules[k](el.value);
  document.getElementById("e-"+k).textContent=m;
  el.setAttribute("aria-invalid",m?"true":"false");
  return !m;
}
Object.keys(rules).forEach(k=>document.getElementById(ids[k]).addEventListener("blur",()=>check(k)));
form.addEventListener("submit",e=>{
  e.preventDefault();
  const ok=Object.keys(rules).map(check).every(Boolean);
  if(!ok){status.textContent="Fix the highlighted fields and send again.";return}
  // Demo only: connect a service such as Formspree here to deliver real messages.
  status.textContent="Message sent. Thanks, "+document.getElementById("name").value.trim()+"!";
  form.reset();
});
document.getElementById("year").textContent=new Date().getFullYear();
