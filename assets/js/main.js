/* ═══════════════════════════════════════════════════
   main.js — V5 · Lenis + GSAP · intro · stack→grid ·
   integrated project overlay · reveals · i18n-synced
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth <= 768;

  /* ─── PROJECT DATA (galleries are static; text comes from i18n) ─── */
  const ORDER = ['ecos', 'mexican', 'shanYun', 'tank', 'c4d', 'porsche'];
  const PROJECTS = {
    ecos: { images: [
      { src: 'images/ecos/CampoEntrenamiento1.jpg', cls: 'g-full' },
      { src: 'images/ecos/MenuInicio.jpg' },
      { src: 'images/ecos/MuseoInterior1.jpg' },
      { src: 'images/ecos/MuseoInterior2.jpg', cls: 'g-full' },
      { src: 'images/ecos/EspadaRender.jpg', cls: 'g-tall' },
      { src: 'images/ecos/Ballesta4k.jpg' },
      { src: 'images/ecos/Cannon.jpg' },
      { src: 'images/ecos/ArmaduraEscudo.jpg' },
      { src: 'images/ecos/PersonajeGuia.jpg' },
      { src: 'images/ecos/PropsModularesShowcase.jpg', cls: 'g-full' },
      { src: 'images/ecos/CampoEntrenamiento2.jpg' },
      { src: 'images/ecos/CampoEntrenamiento3.jpg' },
      { src: 'images/ecos/RenderEstudio_v2.jpg', cls: 'g-full' },
    ]},
    mexican: { images: [ { src: 'images/behance/mexican.jpg', cls: 'g-full' } ] },
    shanYun: { images: [ { src: 'images/behance/shanyun.jpg', cls: 'g-contain g-full' } ] },
    tank:    { images: [ { src: 'images/behance/tank.jpg', cls: 'g-full' } ] },
    c4d:     { images: [ { src: 'images/behance/c4d.jpg', cls: 'g-contain g-full' } ] },
    porsche: { images: [], video: true },
  };

  /* ─── LENIS ─── */
  const lenis = new Lenis({ duration: 1.25, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.95 });
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ─── PROGRESS BAR ─── */
  const progressBar = document.getElementById('progressBar');
  lenis.on('scroll', ({ progress }) => { if (progressBar) progressBar.style.width = `${progress * 100}%`; });

  /* ─── CURSOR ─── */
  const cursorEl = document.getElementById('cursor');
  const dotEl = document.getElementById('cursorDot');
  if (cursorEl && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let cx = -100, cy = -100, dx = -100, dy = -100;
    document.addEventListener('mousemove', e => { dx = e.clientX; dy = e.clientY; });
    (function loop() {
      cx += (dx - cx) * 0.16; cy += (dy - cy) * 0.16;
      cursorEl.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      dotEl.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const setHover = on => document.body.classList.toggle('cursor-hover', on);
    document.addEventListener('mouseover', e => { if (e.target.closest('a, button, .magnetic, .proj-open')) setHover(true); });
    document.addEventListener('mouseout', e => { if (e.target.closest('a, button, .magnetic, .proj-open')) setHover(false); });
  }

  /* ─── NAV scrolled ─── */
  const nav = document.getElementById('nav');
  ScrollTrigger.create({ start: 'top+=60 top', onEnter: () => nav.classList.add('scrolled'), onLeaveBack: () => nav.classList.remove('scrolled') });

  /* ─── SMOOTH ANCHORS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -70, duration: 1.5 }); closeMobileMenu(); }
    });
  });

  /* ─── MOBILE MENU ─── */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;
  function openMobileMenu() { menuOpen = true; mobileMenu.classList.add('open'); mobileMenu.setAttribute('aria-hidden', 'false'); menuToggle.classList.add('open'); menuToggle.setAttribute('aria-expanded', 'true'); lenis.stop(); }
  function closeMobileMenu() { if (!menuOpen) return; menuOpen = false; mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true'); menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); lenis.start(); }
  if (menuToggle) menuToggle.addEventListener('click', () => menuOpen ? closeMobileMenu() : openMobileMenu());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

  /* ─── TONAL BACKDROP for contained images ─── */
  function applyTone(img) {
    const host = img.closest('.proj-media-contain') || img.closest('.g-contain');
    if (!host) return;
    try {
      const cv = document.createElement('canvas'); const w = cv.width = 20, h = cv.height = 20;
      const ctx = cv.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const d = ctx.getImageData(0, 0, w, h).data; let r = 0, g = 0, b = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { if (d[i + 3] < 200) continue; r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
      if (!n) return; const mix = c => Math.round((c / n) * 0.5 + 16);
      host.style.setProperty('--tone', `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`);
    } catch (_) {}
  }
  function toneAll(root) { (root || document).querySelectorAll('.proj-media-contain img, .g-contain img').forEach(img => { if (img.complete && img.naturalWidth) applyTone(img); else img.addEventListener('load', () => applyTone(img), { once: true }); }); }
  toneAll();

  /* ─── HERO entrance (after intro) ─── */
  function playHero() {
    if (reduced) {
      gsap.set('.hero-title .word', { y: '0%' });
      document.querySelectorAll('.hero-eyebrow,.hero-cycle,.hero-sub,.hero-cta-row').forEach(el => el.style.opacity = 1);
      return;
    }
    gsap.timeline()
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to('.hero-title .word', { y: '0%', duration: 1.05, stagger: 0.08, ease: 'power4.out' }, '-=0.4')
      .to('.hero-cycle', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .to('.hero-sub', { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.35')
      .to('.hero-cta-row', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');
  }

  /* ─── INTRO / OPENING ─── */
  const intro = document.getElementById('intro');
  let introSeen = false; try { introSeen = sessionStorage.getItem('hfp-intro') === '1'; } catch (_) {}
  let introDone = false;
  function finishIntro() {
    if (introDone) return; introDone = true;
    if (intro) { intro.classList.add('done'); setTimeout(() => intro.classList.add('intro-hidden'), 1000); }
    lenis.start(); playHero();
  }
  if (reduced || introSeen || !intro) {
    if (intro) intro.classList.add('intro-hidden');
    playHero();
  } else {
    try { sessionStorage.setItem('hfp-intro', '1'); } catch (_) {}
    lenis.stop(); window.scrollTo(0, 0);
    const draws = intro.querySelectorAll('.lg-draw');
    const dot = intro.querySelector('.lg-dot');
    draws.forEach(p => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
    gsap.timeline({ onComplete: finishIntro })
      .to(draws[0], { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.15)
      .to(draws[1], { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, '-=0.35')
      .to(dot, { scale: 1, duration: 0.4, ease: 'back.out(2.2)' }, '-=0.15')
      .to(intro.querySelector('.intro-word'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .to({}, { duration: 0.45 });
    setTimeout(finishIntro, 4000); // safety
  }

  /* ─── WORD CYCLE ─── */
  const cycleEl = document.getElementById('cycleWord');
  let cycleWords = ['modelo'], cycleIdx = 0;
  function readCycle() { try { const t = window.__i18n.get(); if (t && t.hero && t.hero.cycle) cycleWords = t.hero.cycle; } catch (_) {} }
  function spinCycle() {
    if (!cycleEl) return;
    cycleIdx = (cycleIdx + 1) % cycleWords.length; const next = cycleWords[cycleIdx];
    if (reduced) { cycleEl.textContent = next; return; }
    gsap.to(cycleEl, { yPercent: -110, opacity: 0, duration: 0.4, ease: 'power3.in', onComplete() {
      cycleEl.textContent = next;
      gsap.fromTo(cycleEl, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }});
  }
  window.addEventListener('hfp:lang', () => { readCycle(); cycleIdx = 0; if (cycleEl) cycleEl.textContent = cycleWords[0]; if (overlayOpenId) fillOverlay(overlayOpenId); });
  readCycle(); if (cycleEl) { cycleEl.textContent = cycleWords[0]; setInterval(spinCycle, 2200); }

  /* ─── REVEALS ─── */
  if (!reduced) {
    const batchReveal = sel => ScrollTrigger.batch(sel, { start: 'top 88%', onEnter: els => els.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 80)) });
    batchReveal('.cap-card'); batchReveal('.timeline-item'); batchReveal('.about-bio'); batchReveal('.about-stats'); batchReveal('.step');
    const fill = document.getElementById('stepLineFill');
    if (fill) gsap.fromTo(fill, { width: '0%' }, { width: '100%', ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 70%', scrub: 0.8 } });
  } else {
    document.querySelectorAll('.cap-card,.timeline-item,.about-bio,.about-stats,.step,.proj-card').forEach(el => el.classList.add('in'));
  }

  /* ─── PROJECT CARDS: STACK → GRID (short, dramatic) ─── */
  const grid = document.getElementById('projGrid');
  const projCards = grid ? gsap.utils.toArray('.proj-card') : [];
  if (!reduced && !isMobile() && grid && projCards.length) {
    const n = projCards.length;
    const stackX = () => grid.offsetWidth / 2;
    const stackY = () => grid.offsetHeight * 0.16;
    const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 80%', end: 'top 42%', scrub: 0.6, invalidateOnRefresh: true } });
    projCards.forEach((card, i) => {
      gsap.set(card, { zIndex: n - i, transformOrigin: '50% 50%', opacity: 1 });
      const fan = i - (n - 1) / 2;
      tl.fromTo(card, {
        x: () => stackX() - (card.offsetLeft + card.offsetWidth / 2),
        y: () => stackY() - (card.offsetTop + card.offsetHeight / 2),
        rotation: fan * 6, scale: 0.5,
      }, { x: 0, y: 0, rotation: 0, scale: 1, ease: 'power3.out', duration: 1 }, i * 0.05);
    });
  } else { projCards.forEach(el => el.classList.add('in')); }

  /* ─── MANIFESTO word highlight ─── */
  const quoteEl = document.getElementById('quoteText');
  let quoteST = null;
  function buildQuote() {
    if (!quoteEl) return; if (quoteST) { quoteST.kill(); quoteST = null; }
    const text = quoteEl.textContent.trim();
    quoteEl.innerHTML = text.split(/(\s+)/).map(tok => /\s+/.test(tok) ? tok : `<span class="qw">${tok}</span>`).join('');
    if (reduced) { quoteEl.querySelectorAll('.qw').forEach(w => w.classList.add('lit')); return; }
    const words = quoteEl.querySelectorAll('.qw');
    quoteST = ScrollTrigger.create({ trigger: quoteEl, start: 'top 78%', end: 'bottom 58%', scrub: 0.5, onUpdate(self) { const lit = self.progress * words.length; words.forEach((w, i) => w.classList.toggle('lit', i < lit)); } });
  }
  buildQuote();
  window.addEventListener('hfp:lang', () => { if (quoteEl) buildQuote(); });

  /* ─── MAGNETIC ─── */
  if (!reduced && !isMobile()) {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.25}px)`; });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ═══ PROJECT OVERLAY (integrated, no redirects) ═══ */
  const overlay = document.getElementById('overlay');
  const ovPanel = document.getElementById('overlayPanel');
  const ovScroll = document.getElementById('overlayScroll');
  const ovTag = document.getElementById('ovTag');
  const ovTitle = document.getElementById('ovTitle');
  const ovMeta = document.getElementById('ovMeta');
  const ovDesc = document.getElementById('ovDesc');
  const ovGallery = document.getElementById('ovGallery');
  let overlayOpenId = null;
  let lastFocused = null;

  function fillOverlay(id) {
    const t = window.__i18n.get(); const p = (t.projects && t.projects[id]) || {};
    ovTag.textContent = p.tag || ''; ovTitle.textContent = p.t || ''; ovMeta.textContent = p.meta || ''; ovDesc.textContent = p.desc || '';
    ovGallery.innerHTML = '';
    const data = PROJECTS[id] || { images: [] };
    if (data.video && !data.images.length) {
      const note = document.createElement('div');
      note.className = 'g-full g-contain'; note.style.minHeight = '320px'; note.style.display = 'flex'; note.style.alignItems = 'center'; note.style.justifyContent = 'center';
      note.innerHTML = `<span class="video-badge mono"><span class="play-tri"></span><span>${(t.work && t.work.video) || 'Video'}</span></span>`;
      ovGallery.appendChild(note);
    } else {
      data.images.forEach(im => {
        const fig = document.createElement('figure'); if (im.cls) fig.className = im.cls;
        const img = document.createElement('img'); img.src = im.src; img.alt = (p.t || '') + ' — ' + (p.tag || ''); img.loading = 'lazy';
        fig.appendChild(img); ovGallery.appendChild(fig);
      });
      toneAll(ovGallery);
    }
  }

  function openOverlay(id) {
    overlayOpenId = id; lastFocused = document.activeElement;
    fillOverlay(id);
    overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false');
    if (ovScroll) ovScroll.scrollTop = 0;
    lenis.stop();
    if (reduced) { gsap.set(ovPanel, { opacity: 1, scale: 1, y: 0 }); }
    else { gsap.fromTo(ovPanel, { opacity: 0, scale: 0.965, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.05 }); }
    document.getElementById('overlayClose').focus();
  }
  function closeOverlay() {
    if (!overlayOpenId) return;
    const done = () => { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); overlayOpenId = null; lenis.start(); if (lastFocused) lastFocused.focus(); };
    if (reduced) { done(); return; }
    gsap.to(ovPanel, { opacity: 0, scale: 0.97, y: 16, duration: 0.32, ease: 'power2.in', onComplete: done });
  }
  document.querySelectorAll('.proj-open').forEach(btn => btn.addEventListener('click', () => openOverlay(btn.dataset.project)));
  document.getElementById('overlayClose').addEventListener('click', closeOverlay);
  document.getElementById('overlayBackdrop').addEventListener('click', closeOverlay);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlayOpenId) closeOverlay(); });
  function step(dir) { if (!overlayOpenId) return; const i = ORDER.indexOf(overlayOpenId); const next = ORDER[(i + dir + ORDER.length) % ORDER.length]; overlayOpenId = next; fillOverlay(next); if (ovScroll) ovScroll.scrollTop = 0; if (!reduced) gsap.fromTo(ovPanel, { opacity: 0.4, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }); }
  document.getElementById('ovPrev').addEventListener('click', () => step(-1));
  document.getElementById('ovNext').addEventListener('click', () => step(1));

  /* ─── RESIZE ─── */
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); });
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
