/* Public renderer. Content is data-driven; visual classes and design tokens remain in site.css. */
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeHeadline = value => esc(value).replace(/&lt;br\s*\/?&gt;/gi, '<br>');
const byId = id => document.getElementById(id);
const safeHref = href => { const value=String(href||'#').trim(); return /^(https?:\/\/|mailto:|tel:|#|\/)/i.test(value) ? value : '#'; };
const isExternal = href => /^https?:\/\//i.test(String(href || ''));
const link = (href, label, cls='') => `<a class="${esc(cls)}" href="${esc(safeHref(href))}" ${isExternal(href) ? 'target="_blank" rel="noopener noreferrer"' : ''}>${esc(label || '')}</a>`;
const enabled = section => section?.enabled !== false;
const heading = (eyebrow, title, index='') => `<div class="section-head"><div>${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ''}<h2>${esc(title || '')}</h2></div>${index ? `<span class="section-index">${esc(index)}</span>` : ''}</div>`;
function applyTheme(t={}) {
  const root=document.documentElement;
  root.style.setProperty('--accent',t.accent||'#b7f36b'); root.style.setProperty('--bg',t.background||'#10110f');
  root.style.setProperty('--surface',t.surface||'#191b18'); root.style.setProperty('--text',t.text||'#f1f2ec'); root.style.setProperty('--muted',t.muted||'#a3a69d');
}
async function json(path, fallback={}) { try { const r=await fetch(path,{cache:'no-store'}); if(!r.ok) throw new Error(path); return await r.json(); } catch { return fallback; } }
function renderHome(d, navData) {
  const s=d.site||{}, h=d.hero||{}, a=d.about||{}, c=d.contact||{}, labels=d.labels||{}, sections=d.sections||{};
  const experience=(d.experience||[]).map(x=>`<article class="timeline"><div><div class="period">${esc(x.period)}</div><div class="period">${esc(x.location)}</div></div><div><h3>${esc(x.role)}</h3><div class="company">${esc(x.company)}</div><p>${esc(x.description)}</p><ul class="bullet-grid">${(x.highlights||[]).map(v=>`<li>${esc(v)}</li>`).join('')}</ul>${x.recognition?`<span class="recognition">${esc(x.recognition)}</span>`:''}</div></article>`).join('');
  const projects=(d.projects||[]).map(p=>`<article class="project-card"><div class="project-top"><span class="project-type">${esc(p.type)}</span><span class="project-status">${esc(p.status)}</span></div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="project-tags">${(p.highlights||[]).map(t=>`<span>${esc(t)}</span>`).join('')}</div>${p.link?link(p.link,`${p.label||labels.defaultProjectLabel||'View project'} ↗`,'project-link'):''}</article>`).join('');
  const skills=(d.skills||[]).map(g=>`<article class="skill-card"><h3>${esc(g.group)}</h3><div class="skill-list">${(g.items||[]).map(v=>`<span>${esc(v)}</span>`).join('')}</div></article>`).join('');
  const education=(d.education||[]).map(e=>`<article class="education-item"><div><h3>${esc(e.qualification)}</h3><p>${esc(e.institution)} · ${esc(e.period)}</p><p>${esc(e.board)}</p></div><div class="result">${esc(e.result)}</div></article>`).join('');
  const nav=(navData.header||d.navigation||[]).filter(n=>n.enabled!==false).map(n=>link(n.href,n.label)).join('');
  byId('nav').innerHTML=nav;
  const cta=navData.cta||{}; byId('nav-cta').innerHTML=`${esc(cta.label||labels.navCta||'Let’s talk')} <span>${esc(labels.navCtaArrow||'↗')}</span>`; byId('nav-cta').href=safeHref(cta.href||'#contact'); byId('nav-cta').hidden=cta.enabled===false;
  byId('brand-name').textContent=(s.name||'').toUpperCase();const brand=document.querySelector('.brand');if(brand)brand.setAttribute('aria-label',labels.brandAria||'Home');const mark=document.querySelector('.brand-mark');if(mark)mark.textContent=labels.brandMark||'S.';const navEl=byId('nav');if(navEl)navEl.setAttribute('aria-label',labels.navAriaLabel||'Main navigation');
  let html=`<section class="hero wrap"><div><div class="eyebrow">${esc(h.eyebrow)}</div><h1>${safeHeadline(h.headline)}</h1><p class="hero-copy">${esc(h.intro)}</p><div class="actions">${link(h.primaryHref,h.primaryLabel,'btn')}${link(h.secondaryHref,h.secondaryLabel,'btn secondary')}</div></div><div class="portrait-wrap"><div class="portrait-frame"><img src="${esc(s.portrait||'/assets/profile.jpg')}" alt="${esc(s.name||'Profile portrait')}"></div><div class="portrait-tag"><b>${esc(s.availability)}</b>${esc(s.location)}</div></div></section>`;
  if(enabled(sections.about)) html+=`<section class="section" id="about"><div class="wrap">${heading(a.eyebrow,a.title,labels.aboutIndex)}<div class="about-grid"><div class="about-lead">${esc(a.note||'')}</div><div class="about-body">${esc(a.body||'')}</div></div></div></section>`;
  if(enabled(sections.experience)) html+=`<section class="section" id="experience"><div class="wrap">${heading(labels.careerEyebrow,labels.careerTitle,labels.experienceIndex)}${experience}</div></section>`;
  if(enabled(sections.projects)) html+=`<section class="section" id="projects"><div class="wrap">${heading(labels.projectsEyebrow,labels.projectsTitle,labels.projectsIndex)}<div class="project-grid">${projects}</div></div></section>`;
  if(enabled(sections.skills)) html+=`<section class="section" id="skills"><div class="wrap">${heading(labels.skillsEyebrow,labels.skillsTitle,labels.skillsIndex)}<div class="skills-grid">${skills}</div></div></section>`;
  if(enabled(sections.education)) html+=`<section class="section" id="education"><div class="wrap">${heading(labels.educationEyebrow,labels.educationTitle,labels.educationIndex)}${education}</div></section>`;
  if(enabled(sections.contact)) html+=`<section class="section" id="contact"><div class="wrap"><div class="contact-panel"><div><div class="eyebrow">${esc(c.eyebrow)}</div><h2>${esc(c.title)}</h2><p>${esc(c.body)}</p><div class="contact-links">${s.email?link(`mailto:${s.email}`,s.email):''}${s.linkedin?link(s.linkedin,labels.contactLinkedin||'LINKEDIN ↗'):''}${s.github?link(s.github,labels.contactGithub||'GITHUB ↗'):''}${s.opervyn?link(s.opervyn,labels.contactOpervyn||'OPERVYN ↗'):''}</div></div>${link(s.email?`mailto:${s.email}`:'#',c.buttonLabel||labels.emailFallback||'Email me','btn')}</div></div></section>`;
  byId('app').innerHTML=html;
  Footer(d.footer||{},navData.footer||[]);
}
function HeroSection(b) { return `<section class="hero wrap"><div><div class="eyebrow">${esc(b.eyebrow)}</div><h1>${safeHeadline(b.title)}</h1><p class="hero-copy">${esc(b.body)}</p>${b.buttonLabel?`<div class="actions">${link(b.buttonHref,b.buttonLabel,'btn')}</div>`:''}</div></section>`; }
function FeatureGrid(b) { return `<section class="section"><div class="wrap">${heading(b.eyebrow,b.title)}<div class="skills-grid">${(b.items||[]).map(x=>`<article class="skill-card"><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`).join('')}</div></div></section>`; }
function TestimonialBlock(b) { return `<section class="section"><div class="wrap">${heading(b.eyebrow,b.title)}<div class="project-grid">${(b.items||[]).map(x=>`<article class="project-card"><p>${esc(x.quote)}</p><h3>${esc(x.name)}</h3><span class="project-type">${esc(x.role)}</span></article>`).join('')}</div></div></section>`; }
function renderBlocks(blocks=[]) {
  return blocks.filter(b=>b.enabled!==false).map(b=>{
    if(b.type==='hero') return HeroSection(b);
    if(b.type==='text') return `<section class="section"><div class="wrap">${heading(b.eyebrow,b.title)}<div class="about-body">${esc(b.body)}</div></div></section>`;
    if(b.type==='featureGrid') return FeatureGrid(b);
    if(b.type==='testimonials') return TestimonialBlock(b);
    if(b.type==='cta') return `<section class="section"><div class="wrap"><div class="contact-panel"><div><div class="eyebrow">${esc(b.eyebrow)}</div><h2>${esc(b.title)}</h2><p>${esc(b.body)}</p></div>${link(b.buttonHref,b.buttonLabel||'Get in touch','btn')}</div></div></section>`;
    return '';
  }).join('');
}
function Footer(footer={}, links=[]) {
  const linksHtml=links.filter(x=>x.enabled!==false).map(x=>link(x.href,x.label)).join('');
  byId('footer').innerHTML=`<div class="footer-inner"><span>${esc(footer.text||'')}</span><span>${esc(footer.copyright||'')}</span>${linksHtml?`<nav class="footer-links">${linksHtml}</nav>`:''}</div>`;
}
async function boot() {
  const path=decodeURI(location.pathname).replace(/\/+$/,'');
  const slug=path.split('/').filter(Boolean).pop();
  const isHome=!slug || slug==='index.html' || slug==='mohammadsabbir-hub.github.io';
  const [navData,home]=await Promise.all([json('/content/navigation.json',{}),json('/content/home.json',null)]);
  const legacy=home||await json('/content/site.json',{});window.__portfolioLabels=legacy.labels||{};const loading=byId('app').querySelector('.loading');if(loading)loading.textContent=legacy.labels?.loading||'Preparing the portfolio…';
  const page=isHome?legacy:await json(`/content/pages/${encodeURIComponent(slug)}.json`,null);
  if(!page){const l=legacy.labels||{};byId('app').innerHTML=`<section class="section"><div class="wrap"><div class="eyebrow">${esc(l.notFoundEyebrow||'404 · PAGE NOT FOUND')}</div><h1>${esc(l.notFoundTitle||'Page not found.')}</h1><p class="hero-copy">${esc(l.notFoundBody||'This page may have been removed or its address may have changed.')}</p><a class="btn" href="/">${esc(l.notFoundButton||'Return home')}</a></div></section>`;Footer(legacy.footer||{},navData.footer||[]);return;}
  applyTheme(page.theme||legacy.theme||{});
  const meta=page.meta||legacy.meta||{};document.title=meta.title||`${page.site?.name||legacy.site?.name||'Portfolio'} — Portfolio`;
  const description=document.querySelector('meta[name="description"]');if(description&&meta.description)description.content=meta.description;
  document.documentElement.lang=meta.language||'en';
  if(isHome) renderHome(legacy,navData); else {byId('nav').innerHTML=(navData.header||[]).filter(x=>x.enabled!==false).map(x=>link(String(x.href||'').startsWith('#')?`/${x.href}`:x.href,x.label)).join('');byId('brand-name').textContent=(legacy.site?.name||'').toUpperCase();const brand=document.querySelector('.brand');if(brand)brand.setAttribute('aria-label',legacy.labels?.brandAria||'Home');const mark=document.querySelector('.brand-mark');if(mark)mark.textContent=legacy.labels?.brandMark||'S.';const navEl=byId('nav');if(navEl)navEl.setAttribute('aria-label',legacy.labels?.navAriaLabel||'Main navigation');const cta=navData.cta||{};byId('nav-cta').innerHTML=`${esc(cta.label||'Let’s talk')} <span>${esc(legacy.labels?.navCtaArrow||'↗')}</span>`;byId('nav-cta').href=safeHref(cta.href||'/#contact');byId('nav-cta').hidden=cta.enabled===false;byId('app').innerHTML=renderBlocks(page.blocks||[]);Footer(page.footer||legacy.footer||{},navData.footer||[]);}
}
boot().catch(err=>{console.error(err);byId('app').innerHTML=`<p class="loading">${esc((window.__portfolioLabels||{}).loadError||'Unable to load this page. Please refresh.')}</p>`;});
