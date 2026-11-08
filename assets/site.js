const DEFAULT_PATH = "content/site.json";
const esc = (s="") => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const link = (href,label,cls="") => `<a class="${cls}" href="${esc(href||"#")}" ${String(href||"").startsWith("http")?'target="_blank" rel="noopener"':""}>${esc(label||"")}</a>`;
async function loadContent(){
  try{
    const r=await fetch(new URL(DEFAULT_PATH,document.baseURI));
    if(!r.ok) throw new Error("content unavailable");
    const remote=await r.json();
    const local=localStorage.getItem("sabbirPortfolioDraft");
    return local ? JSON.parse(local) : remote;
  }catch(e){ return JSON.parse(localStorage.getItem("sabbirPortfolioDraft")||"{}"); }
}
function applyTheme(t){const root=document.documentElement;root.style.setProperty("--accent",t.accent||"#b7f36b");root.style.setProperty("--bg",t.background||"#10110f");root.style.setProperty("--surface",t.surface||"#191b18");root.style.setProperty("--text",t.text||"#f1f2ec");root.style.setProperty("--muted",t.muted||"#a3a69d")}
function render(d){
  const s=d.site||{},h=d.hero||{},a=d.about||{},c=d.contact||{};
  applyTheme(d.theme||{});
  document.title=`${s.name||"Portfolio"} — Portfolio`;
  document.getElementById("brand-name").textContent=(s.name||"").toUpperCase();
  document.getElementById("nav").innerHTML=(d.navigation||[]).map(n=>link(n.href,n.label)).join("");
  const experience=(d.experience||[]).map(x=>`<article class="timeline"><div><div class="period">${esc(x.period)}</div><div class="period">${esc(x.location)}</div></div><div><h3>${esc(x.role)}</h3><div class="company">${esc(x.company)}</div><p>${esc(x.description)}</p><ul class="bullet-grid">${(x.highlights||[]).map(v=>`<li>${esc(v)}</li>`).join("")}</ul>${x.recognition?`<span class="recognition">${esc(x.recognition)}</span>`:""}</div></article>`).join("");
  const projects=(d.projects||[]).map(p=>`<article class="project-card"><div class="project-top"><span class="project-type">${esc(p.type)}</span><span class="project-status">${esc(p.status)}</span></div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="project-tags">${(p.highlights||[]).map(t=>`<span>${esc(t)}</span>`).join("")}</div>${p.link?link(p.link,`${p.label||"View project"} ↗`,"project-link"):""}</article>`).join("");
  const skills=(d.skills||[]).map(g=>`<article class="skill-card"><h3>${esc(g.group)}</h3><div class="skill-list">${(g.items||[]).map(v=>`<span>${esc(v)}</span>`).join("")}</div></article>`).join("");
  const education=(d.education||[]).map(e=>`<article class="education-item"><div><h3>${esc(e.qualification)}</h3><p>${esc(e.institution)} · ${esc(e.period)}</p><p>${esc(e.board)}</p></div><div class="result">${esc(e.result)}</div></article>`).join("");
  document.getElementById("app").innerHTML=`
  <section class="hero wrap"><div><div class="eyebrow">${esc(h.eyebrow)}</div><h1>${String(h.headline||"").replace(/<br\s*\/?>/gi,"<br>")}</h1><p class="hero-copy">${esc(h.intro)}</p><div class="actions">${link(h.primaryHref,h.primaryLabel,"btn")}${link(h.secondaryHref,h.secondaryLabel,"btn secondary")}</div></div><div class="portrait-wrap"><div class="portrait-frame"><img src="${esc(s.portrait||"assets/profile.jpg")}" alt="${esc(s.name||"Profile portrait")}"></div><div class="portrait-tag"><b>${esc(s.availability||"")}</b>${esc(s.location||"")}</div></div></section>
  <section class="section" id="about"><div class="wrap"><div class="section-head"><div><div class="eyebrow">${esc(a.eyebrow)}</div><h2>${esc(a.title)}</h2></div><span class="section-index">01 / PROFILE</span></div><div class="about-grid"><div class="about-lead">${esc(a.note||"")}</div><div class="about-body">${esc(a.body)}</div></div></div></section>
  <section class="section" id="experience"><div class="wrap"><div class="section-head"><div><div class="eyebrow">CAREER HISTORY</div><h2>Experience built on consistency.</h2></div><span class="section-index">02 / EXPERIENCE</span></div>${experience}</div></section>
  <section class="section" id="projects"><div class="wrap"><div class="section-head"><div><div class="eyebrow">SELECTED WORK</div><h2>Ideas, made tangible.</h2></div><span class="section-index">03 / PROJECTS</span></div><div class="project-grid">${projects}</div></div></section>
  <section class="section" id="skills"><div class="wrap"><div class="section-head"><div><div class="eyebrow">CAPABILITIES</div><h2>Tools, skills and working strengths.</h2></div><span class="section-index">04 / SKILLS</span></div><div class="skills-grid">${skills}</div></div></section>
  <section class="section" id="education"><div class="wrap"><div class="section-head"><div><div class="eyebrow">EDUCATION</div><h2>Learning that shaped the foundation.</h2></div><span class="section-index">05 / EDUCATION</span></div>${education}</div></section>
  <section class="section" id="contact"><div class="wrap"><div class="contact-panel"><div><div class="eyebrow">${esc(c.eyebrow)}</div><h2>${esc(c.title)}</h2><p>${esc(c.body)}</p><div class="contact-links">${link(s.email?`mailto:${s.email}`:"#",s.email)}${s.linkedin?link(s.linkedin,"LINKEDIN ↗"):""}${s.github?link(s.github,"GITHUB ↗"):""}${s.opervyn?link(s.opervyn,"OPERVYN ↗"):""}</div></div>${link(s.email?`mailto:${s.email}`:"#",c.buttonLabel||"Email me","btn")}</div></div></section>`;
  document.getElementById("footer").innerHTML=`<div class="footer-inner"><span>${esc((d.footer||{}).text||"")}</span><span>${esc((d.footer||{}).copyright||"")}</span></div>`;
}
loadContent().then(render);