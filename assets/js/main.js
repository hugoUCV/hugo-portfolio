/* ═══════════════════════════════════════════════════
   main.js — Lenis + GSAP animations + cursor
   Requires: gsap, ScrollTrigger, lenis (CDN)
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════════
     LENIS SMOOTH SCROLL
  ═══════════════════════════════════════════════ */
  const lenis = new Lenis({
    duration:    1.25,
    easing:      t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  // Wire Lenis into GSAP ticker so ScrollTrigger stays in sync
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ═══════════════════════════════════════════════
     CUSTOM CURSOR
  ═══════════════════════════════════════════════ */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let cx = -100, cy = -100; // ring  (lagging)
    let dx = -100, dy = -100; // dot   (instant)

    document.addEventListener('mousemove', e => {
      dx = e.clientX;
      dy = e.clientY;
    });

    (function cursorLoop() {
      // Ring lags behind dot for that elastic feel
      cx += (dx - cx) * 0.12;
      cy += (dy - cy) * 0.12;

      cursor.style.transform    = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      cursorDot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;

      requestAnimationFrame(cursorLoop);
    })();

    // Scale up on interactive elements
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ═══════════════════════════════════════════════
     NAVIGATION — shrink on scroll
  ═══════════════════════════════════════════════ */
  const nav = document.getElementById('nav');

  ScrollTrigger.create({
    start:       'top+=80 top',
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });

  // Smooth-scroll nav links through Lenis
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) lenis.scrollTo(target, { offset: -80, duration: 1.6 });
    });
  });

  /* ═══════════════════════════════════════════════
     HERO ENTRANCE TIMELINE
  ═══════════════════════════════════════════════ */
  if (!prefersReduced) {
    const heroTl = gsap.timeline({ delay: 0.2 });

    heroTl
      .to('.hero-eyebrow', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      })
      .to('.title-word', {
        y: '0%', duration: 1.1, stagger: 0.1, ease: 'power4.out',
      }, '-=0.5')
      .to('.hero-sub', {
        opacity: 1, duration: 0.8, ease: 'power2.out',
      }, '-=0.5')
      .to('.hero-cta', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, '-=0.45')
      .to('.scroll-indicator', {
        opacity: 1, duration: 0.6, ease: 'power2.out',
      }, '-=0.3');
  }

  /* ═══════════════════════════════════════════════
     PROJECTS — HORIZONTAL SCROLL (PINNED)
  ═══════════════════════════════════════════════ */
  const pin   = document.getElementById('projectsPin');
  const track = document.getElementById('projectsTrack');

  function initHorizontalScroll() {
    if (!pin || !track) return;

    // Only enable on screens wide enough for horizontal layout
    if (window.innerWidth <= 900) return;

    const totalScroll = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x:    () => -totalScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger:          pin,
        start:            'top top',
        end:              () => `+=${totalScroll()}`,
        pin:              true,
        scrub:            1.2,
        anticipatePin:    1,
        invalidateOnRefresh: true,
      },
    });
  }

  initHorizontalScroll();

  /* ═══════════════════════════════════════════════
     SECTION REVEALS — staggered fade + rise
  ═══════════════════════════════════════════════ */
  if (!prefersReduced) {

    // Section labels
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' } }
      );
    });

    // Section + contact titles
    gsap.utils.toArray('.section-title, .contact-big').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });

    // About bio paragraphs
    gsap.utils.toArray('.about-bio').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });

    // Skills label
    gsap.fromTo('.skills-label',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-label', start: 'top 90%' } }
    );

    // Contact email + links
    gsap.fromTo('.contact-email',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-email', start: 'top 88%' } }
    );

    gsap.utils.toArray('.ext-link').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-links', start: 'top 88%' } }
      );
    });
  }

  /* ═══════════════════════════════════════════════
     SKILL BARS — animate on enter
  ═══════════════════════════════════════════════ */
  document.querySelectorAll('.skill-fill').forEach(bar => {
    ScrollTrigger.create({
      trigger:  bar,
      start:    'top 92%',
      onEnter:  () => bar.classList.add('animated'),
      once:     true,
    });
  });

  /* ═══════════════════════════════════════════════
     PROJECT CARDS — subtle entrance when in view
     (only fires on mobile / when horizontal scroll
      is not active, so cards appear as they scroll)
  ═══════════════════════════════════════════════ */
  if (window.innerWidth <= 900 && !prefersReduced) {
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' } }
      );
    });
  }

  /* ═══════════════════════════════════════════════
     FOOTER
  ═══════════════════════════════════════════════ */
  gsap.fromTo('.site-footer',
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: '.site-footer', start: 'top 95%' } }
  );

})();
