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
    batchReveal('.proj-card');
    batchReveal('.about-bio');
    batchReveal('.about-stats');
    ScrollTrigger.batch('.reveal-img', {
      start: 'top 85%',
      onEnter: els => els.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 60)),
    });
  } else {
    document.querySelectorAll('.cap-card,.timeline-item,.proj-card,.about-bio,.about-stats,.reveal-img').forEach(el => el.classList.add('in'));
  }

  /* ─── FEATURED HERO PARALLAX ─── */
  if (!reduced) {
    const fh = document.querySelector('.featured-hero img');
    if (fh) gsap.fromTo(fh, { yPercent: -8 }, { yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: '.featured-hero', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

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
