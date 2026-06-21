/* ═══════════════════════════════════════════════════
   main.js — Lenis + GSAP + cursor + all interactions
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth <= 1024;

  /* ═══════════════════════════════════════════════
     LENIS SMOOTH SCROLL
  ═══════════════════════════════════════════════ */
  const lenis = new Lenis({
    duration: 1.3,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });

  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ═══════════════════════════════════════════════
     SCROLL PROGRESS BAR
  ═══════════════════════════════════════════════ */
  const progressBar = document.getElementById('progressBar');
  lenis.on('scroll', ({ progress }) => {
    if (progressBar) progressBar.style.width = `${progress * 100}%`;
  });

  /* ═══════════════════════════════════════════════
     CUSTOM CURSOR
  ═══════════════════════════════════════════════ */
  const cursorEl = document.getElementById('cursor');
  const dotEl    = document.getElementById('cursorDot');

  if (cursorEl && window.matchMedia('(hover: hover)').matches) {
    let cx = -100, cy = -100, dx = -100, dy = -100;

    document.addEventListener('mousemove', e => { dx = e.clientX; dy = e.clientY; });

    (function loop() {
      cx += (dx - cx) * 0.11;
      cy += (dy - cy) * 0.11;
      cursorEl.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      dotEl.style.transform    = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

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
    start: 'top+=80 top',
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });

  // Smooth-scroll anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80, duration: 1.7 });
        // close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  /* ═══════════════════════════════════════════════
     MOBILE MENU
  ═══════════════════════════════════════════════ */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  function openMobileMenu() {
    menuOpen = true;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    lenis.stop();
  }

  function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    lenis.start();
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => menuOpen ? closeMobileMenu() : openMobileMenu());
  }

  // Language buttons inside mobile menu mirror desktop
  document.querySelectorAll('.mobile-lang .lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.__i18n) window.__i18n.setLang(btn.dataset.lang);
      // sync desktop lang switcher
      document.querySelectorAll('.lang-switcher .lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === btn.dataset.lang);
        b.setAttribute('aria-pressed', String(b.dataset.lang === btn.dataset.lang));
      });
      closeMobileMenu();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) closeMobileMenu(); });

  /* ═══════════════════════════════════════════════
     TEXT SCRAMBLE (hero eyebrow)
  ═══════════════════════════════════════════════ */
  function scramble(el, delay = 800) {
    if (reduced || !el) return;
    const CHARS  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·0123456789';
    const final  = el.textContent.trim();
    const frames = 22;
    let   tick   = 0;

    setTimeout(() => {
      const iv = setInterval(() => {
        el.textContent = final.split('').map((ch, i) => {
          if (ch === ' ' || ch === '·') return ch;
          if (tick / frames > i / final.length) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        if (++tick > frames) { el.textContent = final; clearInterval(iv); }
      }, 45);
    }, delay);
  }

  /* ═══════════════════════════════════════════════
     HERO ENTRANCE
  ═══════════════════════════════════════════════ */
  if (!reduced) {
    const eyebrow = document.querySelector('.hero-eyebrow');

    gsap.timeline({ delay: 0.15 })
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        onStart: () => scramble(eyebrow, 0) })
      .to('.title-word',  { y: '0%', duration: 1.05, stagger: 0.09, ease: 'power4.out' }, '-=0.45')
      .to('.hero-sub',    { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.45')
      .to('.hero-cta',    { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .to('.scroll-indicator', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  }

  /* ═══════════════════════════════════════════════
     HORIZONTAL SCROLL (projects) — desktop only
  ═══════════════════════════════════════════════ */
  function initHScroll() {
    const pin   = document.getElementById('projectsPin');
    const track = document.getElementById('projectsTrack');
    if (!pin || !track || isMobile()) return;

    // kill any previous instance
    ScrollTrigger.getAll().filter(st => st.vars.id === 'hscroll').forEach(st => st.kill());

    const totalScroll = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -totalScroll(),
      ease: 'none',
      scrollTrigger: {
        id: 'hscroll',
        trigger: pin,
        start: 'top top',
        end: () => `+=${totalScroll()}`,
        pin: true, scrub: 1.3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }
  initHScroll();

  /* ═══════════════════════════════════════════════
     SCROLL VELOCITY SKEW
  ═══════════════════════════════════════════════ */
  if (!reduced) {
    let skewProxy = { skewY: 0 };
    let skewST    = ScrollTrigger.create({
      onUpdate(self) {
        const vel = self.getVelocity() / 3000;
        const sk  = Math.min(Math.abs(vel) * 5, 5) * -Math.sign(vel);
        gsap.to(skewProxy, {
          skewY: sk, duration: 0.5, ease: 'power3.out',
          overwrite: true,
          onUpdate() {
            gsap.set('.hero-title, .section-title, .contact-big', {
              skewY: skewProxy.skewY,
            });
          },
        });
      },
    });
  }

  /* ═══════════════════════════════════════════════
     SECTION LABEL REVEALS
  ═══════════════════════════════════════════════ */
  if (!reduced) {
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' } }
      );
    });

    gsap.utils.toArray('.section-title, .contact-big').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 87%' } }
      );
    });

    gsap.utils.toArray('.about-bio').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });

    // Stats counters
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const target = +el.dataset.count;
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter() {
          gsap.fromTo({ n: 0 }, { n: target, duration: 1.6, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].n); }
          });
        },
      });
    });

    // Skill bars
    document.querySelectorAll('.skill-fill').forEach(bar => {
      ScrollTrigger.create({
        trigger: bar, start: 'top 92%', once: true,
        onEnter: () => bar.classList.add('animated'),
      });
    });

    // Contact email + links
    gsap.fromTo('.contact-email',
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-email', start: 'top 88%' } }
    );
    gsap.utils.toArray('.ext-link').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-links', start: 'top 88%' } }
      );
    });

    // Footer
    gsap.fromTo('.site-footer',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.site-footer', start: 'top 95%' } }
    );

    // Marquee strip reveal
    gsap.fromTo('.marquee-strip',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.marquee-strip', start: 'top 95%' } }
    );
  }

  /* ═══════════════════════════════════════════════
     CARD 3D TILT (desktop)
  ═══════════════════════════════════════════════ */
  if (!reduced && !isMobile()) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r   = card.getBoundingClientRect();
        const rx  =  ((e.clientY - r.top  - r.height / 2) / r.height) * 7;
        const ry  = -((e.clientX - r.left - r.width  / 2) / r.width)  * 7;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        card.style.transition = 'transform 0.08s ease';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.6s var(--ease-out), border-color 0.4s, box-shadow 0.4s';
      });
    });
  }

  /* ═══════════════════════════════════════════════
     MAGNETIC ELEMENTS (CTA, links)
  ═══════════════════════════════════════════════ */
  if (!reduced && !isMobile()) {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
        el.style.transform  = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'transform 0.1s ease';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform  = '';
        el.style.transition = 'transform 0.55s var(--ease-out)';
      });
    });
  }

  /* ═══════════════════════════════════════════════
     CARD COLOR VAR — set CSS --color from data-color
  ═══════════════════════════════════════════════ */
  document.querySelectorAll('.project-card[data-color]').forEach(card => {
    const glow = card.querySelector('.card-glow');
    if (glow) glow.style.setProperty('--color', card.dataset.color);
  });

  /* ═══════════════════════════════════════════════
     MOBILE VERTICAL CARD REVEALS
  ═══════════════════════════════════════════════ */
  if (!reduced && isMobile()) {
    gsap.utils.toArray('.project-card').forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' } }
      );
    });
  }

  /* ═══════════════════════════════════════════════
     RESIZE — reinit horizontal scroll
  ═══════════════════════════════════════════════ */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (!isMobile()) initHScroll();
    }, 200);
  });

})();
