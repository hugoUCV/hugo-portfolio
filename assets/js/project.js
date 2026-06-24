/* ═══════════════════════════════════════════════════
   project.js — V6 · dedicated project pages
   data-driven render · lightbox · render↔wireframe ·
   category filters · reveals · page-curtain · prev/next
═══════════════════════════════════════════════════ */
(function () {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const E = 'images/ecos/', P = 'images/behance/';

  /* ─── DATA (text comes from i18n projects.*) ─── */
  const ORDER = ['ecos', 'mexican', 'shanyun', 'porsche', 'cinema4d', 'tank'];
  const I18N_ID = { ecos: 'ecos', mexican: 'mexican', shanyun: 'shanYun', porsche: 'porsche', cinema4d: 'c4d', tank: 'tank' };
  const PAGE = { ecos: 'ecos.html', mexican: 'mexican.html', shanyun: 'shanyun.html', porsche: 'porsche.html', cinema4d: 'cinema4d.html', tank: 'tank.html' };

  const im = (src, cls, cat) => ({ src, cls: cls || '', cat: cat || 'env' });
  const DATA = {
    ecos: {
      hero: E + 'Castillo4k.jpg', live: 'https://hugoucv.github.io/ecos-de-xativa/index.html',
      gallery: [
        im(E+'CampoEntrenamiento1.jpg','g-full','env'), im(E+'CampoEntrenamiento4.jpg','','env'), im(E+'CampoEntrenamiento6.jpg','','env'),
        im(E+'MuseoInterior1.jpg','','env'), im(E+'MuseoInterior4.jpg','','env'), im(E+'MuseoInterior5.jpg','g-full','env'),
        im(E+'NivelSubterraneoInicio.jpg','','env'), im(E+'NivelSubterraneoInicio2.jpg','','env'), im(E+'NivelSubterraneoInicio3.jpg','','env'),
        im(E+'Torre.jpg','g-tall','env'), im(E+'TorreVigilancia.jpg','','env'), im(E+'TorreDestruccion.jpg','','env'),
        im(E+'FondoCastillo.jpg','g-full','env'), im(E+'CampoEntrenamiento2.jpg','','env'), im(E+'CampoEntrenamiento3.jpg','','env'),
        im(E+'CampoEntrenamiento5.jpg','','env'), im(E+'CampoEntrenamiento7.jpg','','env'), im(E+'CampoEntrenamiento8.jpg','','env'),
        im(E+'MuseoInterior2.jpg','','env'), im(E+'MuseoInterior3.jpg','','env'),
        im(E+'AlmacenIsometrico.jpg','','props'), im(E+'IsometricoArteModular.jpg','','props'), im(E+'IsometricoTP.jpg','','props'),
        im(E+'PropsModularesShowcase.jpg','g-full','props'), im(E+'EspadaRender.jpg','g-tall','props'), im(E+'Cannon.jpg','','props'),
        im(E+'Ballesta4k.jpg','','props'), im(E+'ArmaduraEscudo.jpg','','props'), im(E+'Espada.jpg','','props'),
        im(E+'AntorchaMano.jpg','','props'), im(E+'Vestimenta.jpg','','props'),
        im(E+'PersonajeGuia.jpg','','chars'), im(E+'Dumia.jpg','','chars'), im(E+'RetratoFelipe.jpg','g-tall','chars'),
        im(E+'MenuInicio.jpg','g-full','ui'), im(E+'MenuInicio2.jpg','','ui'), im(E+'MenuInicio3.jpg','','ui'),
        im(E+'ControlesTutorial.jpg','','ui'), im(E+'LogoTFGFondoNegro.jpg','','ui'),
        im(E+'TutorialArco.jpg','','tut'), im(E+'TutorialBallesta.jpg','','tut'),
      ],
      wireframe: [
        { r: E+'Boveda.jpg', w: E+'BovedaWF.jpg' }, { r: E+'Columnas.jpg', w: E+'ColumnasWF.jpg' },
        { r: E+'Escaleras.jpg', w: E+'EscalerasWF.jpg' }, { r: E+'ParedPuerta.jpg', w: E+'ParedPuertaWF.jpg' },
        { r: E+'ParedVentana.jpg', w: E+'ParedVentanaWF.jpg' }, { r: E+'ParedAntorcha.jpg', w: E+'ParedAntorchaWF.jpg' },
        { r: E+'ParedLisa.jpg', w: E+'ParedLisaWF.jpg' }, { r: E+'RefuerzoBoveda.jpg', w: E+'RefuerzoBovedaWF.jpg' },
        { r: E+'PiedrasSuelo.jpg', w: E+'PiedrasSueloWF.jpg' }, { r: E+'LadrillosPared.jpg', w: E+'LadrillosParedWF.jpg' },
        { r: E+'SueloPiedras.jpg', w: E+'SueloPiedrasWF.jpg' },
      ],
      credits: [ E+'UCV.png', E+'TencentHuayan_logo.png' ],
      filters: ['all','env','wire','props','chars','ui','tut'],
    },
    mexican: { hero: P+'mexican.jpg', gallery: [ im(P+'mexican.jpg','g-full','env') ] },
    shanyun: { hero: P+'shanyun.jpg', heroContain: true, gallery: [ im(P+'shanyun.jpg','g-contain g-full','chars') ] },
    porsche: { hero: null, video: true, gallery: [] },
    cinema4d:{ hero: P+'c4d.jpg', heroContain: true, gallery: [ im(P+'c4d.jpg','g-contain g-full','props') ] },
    tank:    { hero: P+'tank.jpg', gallery: [ im(P+'tank.jpg','g-full','props') ] },
  };

  const root = document.getElementById('proj');
  const pid = root ? root.dataset.project : null;
  if (!root || !pid || !DATA[pid]) return;

  /* ─── shared chrome (Lenis · GSAP · cursor · theme · curtain) ─── */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tm => lenis.raf(tm * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  // progress bar
  const pbar = document.getElementById('progressBar');
  if (pbar && lenis) lenis.on('scroll', ({ progress }) => { pbar.style.width = `${progress * 100}%`; });
  // cursor
  const cur = document.getElementById('cursor'), dot = document.getElementById('cursorDot');
  if (cur && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let cx = -100, cy = -100, dx = -100, dy = -100;
    document.addEventListener('mousemove', e => { dx = e.clientX; dy = e.clientY; });
    (function loop() { cx += (dx - cx) * 0.16; cy += (dy - cy) * 0.16; cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', e => { if (e.target.closest('a,button,.magnetic,.wfx,.ph-cell img')) document.body.classList.add('cursor-hover'); });
    document.addEventListener('mouseout', e => { if (e.target.closest('a,button,.magnetic,.wfx,.ph-cell img')) document.body.classList.remove('cursor-hover'); });
  }
  // nav scrolled
  const nav = document.getElementById('nav');
  if (nav && window.ScrollTrigger) ScrollTrigger.create({ start: 'top+=60 top', onEnter: () => nav.classList.add('scrolled'), onLeaveBack: () => nav.classList.remove('scrolled') });
  // theme toggle
  const themeToggle = document.getElementById('themeToggle');
  let theme = 'dark'; try { theme = localStorage.getItem('hfp-theme') || 'dark'; } catch (_) {}
  if (theme === 'light') document.body.classList.add('light');
  if (themeToggle) themeToggle.addEventListener('click', () => { const l = document.body.classList.toggle('light'); try { localStorage.setItem('hfp-theme', l ? 'light' : 'dark'); } catch (_) {} });
  // page curtain (reuse the one in the page, don't duplicate)
  let curtain = document.querySelector('.curtain');
  if (!curtain) { curtain = document.createElement('div'); curtain.className = 'curtain'; document.body.appendChild(curtain); }
  requestAnimationFrame(() => curtain.classList.add('up'));
  setTimeout(() => curtain.classList.add('up'), 700);
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a) return;
    const href = a.getAttribute('href');
    if (a.target === '_blank' || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault(); curtain.classList.remove('up');
    setTimeout(() => { window.location.href = href; }, 520);
  });
  // contact copy + vCard (if present on page)
  initContact();

  /* ─── i18n-aware render ─── */
  function t() { try { return window.__i18n.get(); } catch (_) { return null; } }
  function build() {
    const tr = t(); if (!tr) return;
    const d = DATA[pid]; const pj = (tr.projects && tr.projects[I18N_ID[pid]]) || {};
    const pg = tr.page || {}; const sec = pg.sec || {}; const filt = pg.filters || {};
    const idx = ORDER.indexOf(pid);
    const nextId = ORDER[(idx + 1) % ORDER.length];
    let h = '';

    /* hero */
    h += `<header class="ph-hero">
      <a class="ph-back mono" href="index.html#work">← <span>${pg.back || 'Proyectos'}</span></a>
      <span class="ph-tag mono">${pj.tag || ''}</span>
      <h1 class="ph-title">${pj.t || ''}</h1>
      <p class="ph-meta mono">${pj.meta || ''}</p>
      <p class="ph-intro">${pj.desc || ''}</p>
      ${d.live ? `<a class="btn btn-accent magnetic" href="${d.live}" target="_blank" rel="noopener">${pg.live || 'Demo'} ↗</a>` : ''}
    </header>`;
    if (d.video) {
      h += `<div class="ph-heromedia ph-video"><span class="video-badge mono"><span class="play-tri"></span><span>${(tr.work && tr.work.video) || 'Video'}</span></span></div>`;
    } else if (d.hero) {
      h += `<figure class="ph-heromedia reveal-img${d.heroContain ? ' g-contain' : ''}"><img src="${d.hero}" alt="${pj.t || ''}" /></figure>`;
    }

    /* filters (ecos) */
    if (d.filters) {
      h += `<div class="ph-filters">` + d.filters.map((f, i) =>
        `<button class="filt-chip mono${i === 0 ? ' active' : ''}" data-filter="${f}">${f === 'all' ? (filt.all || 'All') : (filt[f] || f)}</button>`).join('') + `</div>`;
    }

    /* gallery */
    if (d.gallery && d.gallery.length) {
      h += `<div class="ph-gallery" id="phGallery">` + d.gallery.map(g =>
        `<figure class="ph-cell ${g.cls}" data-cat="${g.cat}"><img src="${g.src}" alt="${pj.t || ''} — ${g.cat}" loading="lazy" /></figure>`).join('') + `</div>`;
    }

    /* render ↔ wireframe */
    if (d.wireframe && d.wireframe.length) {
      h += `<section class="ph-sec" data-cat="wire"><h2 class="ph-sectitle">${sec.wire || 'Render / Wireframe'}</h2>
        <p class="ph-sechint mono">${pg.wireHint || ''}</p><div class="wfx-grid">` +
        d.wireframe.map(p => `<div class="wfx" tabindex="0" role="slider" aria-label="Render / wireframe" aria-valuenow="50">
          <img class="wfx-base" src="${p.r}" alt="render" loading="lazy" />
          <img class="wfx-over" src="${p.w}" alt="wireframe" loading="lazy" />
          <span class="wfx-handle"><i></i></span>
        </div>`).join('') + `</div></section>`;
    }

    /* credits */
    if (d.credits && d.credits.length) {
      h += `<section class="ph-credits"><span class="mono">${sec.credits || 'Credits'}</span><div class="ph-logos">` +
        d.credits.map(c => `<img src="${c}" alt="logo" loading="lazy" />`).join('') + `</div></section>`;
    }

    /* next project + contact */
    const npj = (tr.projects && tr.projects[I18N_ID[nextId]]) || {};
    h += `<a class="ph-next" href="${PAGE[nextId]}">
      <span class="mono">${pg.next || 'Next'} →</span>
      <span class="ph-next-title">${npj.t || ''}</span>
    </a>`;

    root.innerHTML = h;
    afterBuild();
  }

  function afterBuild() {
    initReveals(); initWireframe(); initFilters(); initLightbox(); initMagnetic();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  /* ─── reveals ─── */
  function initReveals() {
    if (reduced) { document.querySelectorAll('.reveal-img,.ph-cell,.wfx').forEach(el => el.classList.add('in')); return; }
    if (!window.ScrollTrigger) return;
    ScrollTrigger.batch('.ph-cell, .wfx, .reveal-img', { start: 'top 92%', onEnter: els => els.forEach((el, i) => setTimeout(() => el.classList.add('in'), (i % 6) * 60)) });
  }

  /* ─── render ↔ wireframe slider ─── */
  function initWireframe() {
    document.querySelectorAll('.wfx').forEach(box => {
      const over = box.querySelector('.wfx-over'); const handle = box.querySelector('.wfx-handle');
      let split = 50;
      const set = v => { split = Math.max(0, Math.min(100, v)); box.style.setProperty('--split', split + '%'); box.setAttribute('aria-valuenow', Math.round(split)); };
      set(reduced ? 50 : 50);
      const fromX = clientX => { const r = box.getBoundingClientRect(); set(((clientX - r.left) / r.width) * 100); };
      let drag = false;
      box.addEventListener('pointerdown', e => { drag = true; box.setPointerCapture(e.pointerId); fromX(e.clientX); });
      box.addEventListener('pointermove', e => { if (drag) fromX(e.clientX); });
      box.addEventListener('pointerup', () => { drag = false; });
      box.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') set(split - 4); else if (e.key === 'ArrowRight') set(split + 4); });
    });
  }

  /* ─── category filters ─── */
  function initFilters() {
    const chips = document.querySelectorAll('.filt-chip'); if (!chips.length) return;
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active')); chip.classList.add('active');
      const f = chip.dataset.filter;
      document.querySelectorAll('.ph-cell, .ph-sec[data-cat]').forEach(el => {
        const show = f === 'all' || el.dataset.cat === f;
        el.style.display = show ? '' : 'none';
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }));
  }

  /* ─── lightbox ─── */
  let lbList = [], lbIdx = 0;
  const lb = document.getElementById('lightbox');
  const lbImg = lb && lb.querySelector('.lb-img');
  function refreshLbList() { lbList = [...document.querySelectorAll('.ph-gallery .ph-cell img, .ph-heromedia img')].filter(i => i.offsetParent !== null); }
  function openLb(src) { refreshLbList(); lbIdx = Math.max(0, lbList.findIndex(i => i.src === src)); showLb(); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); if (window.__lenis) window.__lenis.stop(); }
  function showLb() { if (lbList[lbIdx]) lbImg.src = lbList[lbIdx].src; }
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); if (window.__lenis) window.__lenis.start(); }
  function lbStep(d) { if (!lbList.length) return; lbIdx = (lbIdx + d + lbList.length) % lbList.length; showLb(); }
  function initLightbox() {
    if (!lb) return;
    document.querySelectorAll('.ph-gallery .ph-cell img, .ph-heromedia img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLb(img.src));
    });
  }
  if (lb) {
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-backdrop').addEventListener('click', closeLb);
    lb.querySelector('.lb-next').addEventListener('click', () => lbStep(1));
    lb.querySelector('.lb-prev').addEventListener('click', () => lbStep(-1));
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowRight') lbStep(1); else if (e.key === 'ArrowLeft') lbStep(-1);
    });
    // swipe
    let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1); }, { passive: true });
  }

  /* ─── magnetic ─── */
  function initMagnetic() {
    if (reduced || window.innerWidth <= 768) return;
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.25}px)`; });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ─── contact: copy + vCard (shared) ─── */
  function initContact() {
    document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); } catch (_) {}
      const tr = t(); const lbl = btn.querySelector('.copy-lbl');
      if (lbl) { const o = lbl.textContent; lbl.textContent = (tr && tr.contact && tr.contact.copied) || '¡Copiado!'; btn.classList.add('copied'); setTimeout(() => { lbl.textContent = o; btn.classList.remove('copied'); }, 1600); }
    }));
    const vb = document.getElementById('vcardBtn');
    if (vb) vb.addEventListener('click', () => {
      const v = ['BEGIN:VCARD','VERSION:3.0','FN:Hugo Ferrer Plaza','N:Ferrer Plaza;Hugo;;;','TITLE:3D Generalist','EMAIL;TYPE=INTERNET:hugo.ferrer@mail.ucv.es','TEL;TYPE=CELL:601307544','ADR;TYPE=HOME:;;Valencia;;;;Spain','URL:https://hugoucv.github.io/hugo-portfolio/','END:VCARD'].join('\r\n');
      const blob = new Blob([v], { type: 'text/vcard' }); const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Hugo-Ferrer-Plaza.vcf'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    });
  }

  /* ─── build now + rebuild on language change ─── */
  if (window.__i18n && window.__i18n.get()) build();
  else document.addEventListener('DOMContentLoaded', build);
  window.addEventListener('hfp:lang', build);
})();
