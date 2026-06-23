/* ═══════════════════════════════════════════════════
   main.js — Lenis + GSAP · cursor · word-cycle · reveals
   theme inversion · magnetic · tilt · mobile menu
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth <= 768;

  /* ─── LENIS ─── */
  const lenis = new Lenis({
    duration: 1.25,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });
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
    const hoverables = 'a, button, .magnetic, .proj-link';
    document.querySelectorAll(hoverables).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ─── NAV scrolled state ─── */
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top+=60 top',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });

  /* ─── THEME INVERSION (light → dark) ─── */
  const firstDark = document.querySelector('.featured');
  if (firstDark) {
    ScrollTrigger.create({
      trigger: firstDark, start: 'top 10%', end: 'bottom top',
      onEnter: () => document.body.classList.add('dark'),
      onEnterBack: () => document.body.classList.add('dark'),
      onLeaveBack: () => document.body.classList.remove('dark'),
    });
  }

  /* ─── SMOOTH ANCHORS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70, duration: 1.5 });
        closeMobileMenu();
      }
    });
  });

  /* ─── MOBILE MENU ─── */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;
  function openMobileMenu() {
    menuOpen = true; mobileMenu.classList.add('open'); mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.classList.add('open'); menuToggle.setAttribute('aria-expanded', 'true'); lenis.stop();
  }
  function closeMobileMenu() {
    if (!menuOpen) return;
    menuOpen = false; mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); lenis.start();
  }
  if (menuToggle) menuToggle.addEventListener('click', () => menuOpen ? closeMobileMenu() : openMobileMenu());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

  /* ─── HERO ENTRANCE ─── */
  if (!reduced) {
    gsap.timeline({ delay: 0.2 })
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to('.hero-title .word', { y: '0%', duration: 1.05, stagger: 0.08, ease: 'power4.out' }, '-=0.4')
      .to('.hero-cycle', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .to('.hero-sub', { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.35')
      .to('.hero-cta-row', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');
  } else {
    gsap.set('.hero-title .word', { y: '0%' });
    document.querySelectorAll('.hero-eyebrow,.hero-cycle,.hero-sub,.hero-cta-row').forEach(el => el.style.opacity = 1);
  }

  /* ─── WORD CYCLE (reads i18n, updates on lang change) ─── */
  const cycleEl = document.getElementById('cycleWord');
  let cycleWords = ['modelo'];
  let cycleIdx = 0;
  function readCycle() {
    try { const t = window.__i18n.get(); if (t && t.hero && t.hero.cycle) cycleWords = t.hero.cycle; } catch (_) {}
  }
  function spinCycle() {
    if (!cycleEl) return;
    cycleIdx = (cycleIdx + 1) % cycleWords.length;
    const next = cycleWords[cycleIdx];
    if (reduced) { cycleEl.textContent = next; return; }
    gsap.to(cycleEl, { yPercent: -110, opacity: 0, duration: 0.4, ease: 'power3.in', onComplete() {
      cycleEl.textContent = next;
      gsap.fromTo(cycleEl, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }});
  }
  window.addEventListener('hfp:lang', () => {
    readCycle(); cycleIdx = 0; if (cycleEl) cycleEl.textContent = cycleWords[0];
  });
  readCycle();
  if (cycleEl) { cycleEl.textContent = cycleWords[0]; setInterval(spinCycle, 2200); }

  /* ─── SCROLL REVEALS ─── */
  if (!reduced) {
    const batchReveal = (sel) => ScrollTrigger.batch(sel, {
      start: 'top 88%',
      onEnter: els => els.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 80)),
    });
    batchReveal('.cap-card');
    batchReveal('.timeline-item');
    batchReveal('.about-bio');
    batchReveal('.about-stats');
    ScrollTrigger.batch('.reveal-img', {
      start: 'top 85%',
      onEnter: els => els.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 60)),
    });
  } else {
    document.querySelectorAll('.cap-card,.timeline-item,.proj-card,.about-bio,.about-stats,.reveal-img').forEach(el => el.classList.add('in'));
  }

  /* ─── TONAL BACKDROP — derive a colour from each contained render ─── */
  /* makes vertical/portrait renders fill a landscape frame in harmony */
  function applyTone(img) {
    const media = img.closest('.proj-media-contain');
    if (!media) return;
    try {
      const cv = document.createElement('canvas');
      const w = cv.width = 24, h = cv.height = 24;
      const ctx = cv.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const d = ctx.getImageData(0, 0, w, h).data;
      let r = 0, g = 0, b = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3]; if (a < 200) continue;
        r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
      }
      if (!n) return;
      r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n);
      // pull toward a deep, slightly-saturated tone so it stays in the dark palette
      const mix = (c) => Math.round(c * 0.5 + 14);
      media.style.setProperty('--tone', `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`);
    } catch (_) { /* canvas may taint on some hosts — gradient fallback stays */ }
  }
  document.querySelectorAll('.proj-media-contain img').forEach(img => {
    if (img.complete && img.naturalWidth) applyTone(img);
    else img.addEventListener('load', () => applyTone(img), { once: true });
  });

  /* ─── PROJECT CARDS — scroll-linked convergence (ref-style) ─── */
  /* cards start offset/scaled/tilted to the sides and settle into the grid as you scroll */
  if (!reduced) {
    const grid = document.querySelector('.proj-grid');
    if (grid) {
      const mid = () => grid.getBoundingClientRect().width / 2;
      gsap.utils.toArray('.proj-card').forEach(card => {
        const c = card.offsetLeft + card.offsetWidth / 2;
        const m = mid();
        const dir = c < m - 30 ? -1 : c > m + 30 ? 1 : 0; // left / right / center column
        gsap.fromTo(card,
          { opacity: 0, scale: 0.78, y: 110, xPercent: dir * 14, rotateY: dir * -10, rotateX: 6 },
          { opacity: 1, scale: 1, y: 0, xPercent: 0, rotateY: 0, rotateX: 0, ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 96%', end: 'top 52%', scrub: 0.9 } }
        );
      });
    }
  }

  /* ─── FEATURED HERO PARALLAX ─── */
  if (!reduced) {
    const fh = document.querySelector('.featured-hero img');
    if (fh) gsap.fromTo(fh, { yPercent: -8 }, { yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: '.featured-hero', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ─── QUOTE — words light up on scroll ─── */
  const quoteEl = document.getElementById('quoteText');
  let quoteST = null;
  function buildQuote() {
    if (!quoteEl) return;
    if (quoteST) { quoteST.kill(); quoteST = null; }
    const text = quoteEl.textContent.trim();
    quoteEl.innerHTML = text.split(/(\s+)/).map(tok =>
      /\s+/.test(tok) ? tok : `<span class="qw">${tok}</span>`
    ).join('');
    if (reduced) { quoteEl.querySelectorAll('.qw').forEach(w => w.classList.add('lit')); return; }
    const words = quoteEl.querySelectorAll('.qw');
    quoteST = ScrollTrigger.create({
      trigger: quoteEl, start: 'top 78%', end: 'bottom 58%', scrub: 0.5,
      onUpdate(self) {
        const lit = self.progress * words.length;
        words.forEach((w, i) => w.classList.toggle('lit', i < lit));
      },
    });
  }
  buildQuote();
  // i18n sets the text before dispatching, so rebuild synchronously (rAF can be throttled)
  window.addEventListener('hfp:lang', () => { if (quoteEl) buildQuote(); });

  /* ─── PROCESS STEPS — staggered reveal + connecting line fills ─── */
  if (!reduced) {
    ScrollTrigger.batch('.step', {
      start: 'top 88%',
      onEnter: els => els.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 130)),
    });
    const fill = document.getElementById('stepLineFill');
    if (fill) gsap.fromTo(fill, { width: '0%' }, { width: '100%', ease: 'none',
      scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 70%', scrub: 0.8 } });
  } else {
    document.querySelectorAll('.step').forEach(el => el.classList.add('in'));
  }

  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      // close siblings for a clean single-open accordion
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) { other.classList.remove('open'); other.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); }
      });
      item.classList.toggle('open', !open);
      btn.setAttribute('aria-expanded', String(!open));
      ScrollTrigger.refresh();
    });
  });

  /* ─── MAGNETIC ─── */
  if (!reduced && !isMobile()) {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ─── CARD TILT ─── */
  if (!reduced && !isMobile()) {
    document.querySelectorAll('[data-tilt] .proj-link').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -4;
        const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ─── RESIZE ─── */
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); });

  /* refresh once images settle */
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
