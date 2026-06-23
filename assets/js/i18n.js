/* ═══════════════════════════════════════════════════
   i18n.js — Inline translations, no fetch needed
   Supports: es (Spanish), en (English), va (Valencian)
   V3 — extended: hero cycle, capabilities, timeline, featured, projects
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const TRANSLATIONS = {
    es: {
      nav: { work: 'Trabajo', about: 'Sobre mí', contact: 'Contacto', cta: 'Hablemos' },
      avail: 'Disponible para prácticas',
      hero: {
        eyebrow: '3D Generalist · Graduado DNAV · UCV',
        cyclePre: 'Diseño y',
        cycle: ['modelo', 'texturizo', 'programo', 'renderizo'],
        cyclePost: 'mundos en 3D',
        sub: 'Soy Hugo Ferrer Plaza, artista 3D de Valencia. Construyo entornos, props y experiencias VR cuidando cada paso del pipeline — del esculpido al render en tiempo real.',
        ctaWork: 'Ver proyectos',
        ctaContact: 'Contacto',
        scroll: 'Desliza',
        metaLoc: 'Valencia, España',
      },
      tickerLabel: 'Herramientas',
      caps: {
        label: '( Lo que hago )',
        title: 'Capacidades',
        intro: 'Un perfil generalista que cubre el pipeline completo, del concepto al asset final.',
        items: [
          { t: 'Modelado 3D', d: 'Hard-surface y orgánico, desde props modulares hasta entornos completos listos para producción.' },
          { t: 'Texturizado PBR', d: 'Materiales realistas y estilizados en Substance Painter con flujo PBR y baking limpio.' },
          { t: 'Desarrollo VR', d: 'Experiencias en Unreal Engine 5 con C++ y Blueprints, optimizadas para Meta Quest standalone.' },
          { t: 'Lookdev & Render', d: 'Iluminación, composición de cámara y render físico de nivel cinematográfico.' },
          { t: 'Esculpido', d: 'Alta definición en ZBrush: anatomía, expresión y detalle de superficie.' },
          { t: 'Tiempo real', d: 'Optimización de assets, retopología y LODs para motores en tiempo real.' },
        ],
      },
      about: {
        label: '( Sobre mí )',
        title: 'Artista 3D que construye mundos desde cero',
        bio: 'Recién graduado del Grado en Desarrollo de Animación y Videojuegos (DNAV) de la Universidad Católica de Valencia. Me involucro en cada paso del pipeline de producción buscando assets artísticamente impactantes y técnicamente sólidos.',
        bio2: 'Mi TFG, Ecos de Xàtiva, es una experiencia VR en Unreal Engine 5.4 para Meta Quest 3 donde ejercí como Lead Programmer: sistemas de física en C++, mecánicas de interacción y optimización Android standalone.',
        timelineTitle: 'Trayectoria',
        timeline: [
          { y: '2022 — 2026', t: 'Grado DNAV', d: 'Desarrollo de Animación y Videojuegos · UCV' },
          { y: '2024', t: 'Intercambio académico', d: 'Curso de Entornos 3D e Iluminación en México' },
          { y: '2025 — 2026', t: 'Lead Programmer · TFG', d: 'Ecos de Xàtiva — experiencia VR en UE5' },
          { y: '2026', t: 'Graduado', d: 'Disponible para prácticas y proyectos 3D' },
        ],
        stats: [
          { n: '6', l: 'Proyectos' },
          { n: '8+', l: 'Herramientas' },
          { n: '1', l: 'Experiencia VR' },
        ],
      },
      featured: {
        label: '( Proyecto destacado )',
        title: 'Ecos de Xàtiva',
        meta: 'Lead Programmer · UE5.4 · C++ · Blueprints · Android',
        desc: 'Experiencia VR para Meta Quest 3 ambientada en el Castell de Xàtiva. Un sandbox histórico donde blandes armas medievales, disparas cañones y exploras el patrimonio ibérico de los siglos XV–XVI.',
        live: 'Ver demo en vivo',
        gallery: 'Galería del proyecto',
      },
      work: {
        label: '( Más trabajo )',
        title: 'Proyectos',
        viewAll: 'Ver portfolio completo',
        cta: 'Ver proyecto',
        video: 'Proyecto en vídeo',
      },
      projects: {
        mexican: { t: 'Mexican Town', tag: 'Entorno 3D · Iluminación', d: 'Entorno de una plaza mexicana tradicional creado durante un intercambio en México: kiosco central, puestos de comida callejera y mototaxis, modelado e iluminado desde referencia cultural directa.' },
        shanYun: { t: 'Shan Yun', tag: 'Character Study · ZBrush', d: 'Character study de alta definición que explora anatomía, expresión facial y textura superficial. Esculpido en ZBrush, texturizado con Substance Painter.' },
        porsche: { t: 'PORSCHE', tag: 'Cinematografía · Animación', d: 'Pieza cinematográfica 3D que combina diseño automovilístico y storytelling. Composición de cámara, mood de iluminación y timing de nivel comercial.' },
        c4d: { t: 'Cinema 4D Showcase', tag: 'Hard-surface · MoGraph', d: 'Showcase técnico y creativo de modelado hard-surface en Cinema 4D: modelado procedimental, sistemas MoGraph y render físico.' },
        tank: { t: 'Creative Artillery', tag: 'Estilizado · Ilustración', d: 'Tanque de lápiz estilizado que combina sensibilidad ilustrativa con craft 3D. Una exploración del lenguaje no-fotorrealista aplicado a hard-surface.' },
      },
      quote: { text: 'Cada asset que construyo tiene que aguantar un primer plano y correr a noventa fps. Belleza y rendimiento no se negocian: se diseñan juntos.' },
      process: {
        label: '( Cómo trabajo )',
        title: 'Proceso',
        intro: 'Un flujo claro del brief al asset final en motor.',
        steps: [
          { t: 'Referencia & blockout', d: 'Reúno referencia, defino escala y proporciones con un blockout rápido antes de modelar nada.' },
          { t: 'Modelado & escultura', d: 'Hard-surface limpio o escultura en ZBrush según el asset, con topología pensada para producción.' },
          { t: 'Texturizado & lookdev', d: 'PBR en Substance, materiales y baking; iluminación y composición de cámara hasta el render final.' },
          { t: 'Optimización & entrega', d: 'Retopología, LODs y optimización para tiempo real / VR, entrega lista para motor.' },
        ],
      },
      faq: {
        label: '( Preguntas frecuentes )',
        title: 'FAQ',
        items: [
          { q: '¿Qué tipo de proyectos haces?', a: 'Entornos, props, hard-surface, personajes y experiencias VR. Como generalista cubro todo el pipeline, del concepto al asset final en motor.' },
          { q: '¿Con qué software trabajas?', a: 'Maya, ZBrush, Substance Painter, Blender, Cinema 4D, Marmoset y Unreal Engine 5. Programo en C++ y Blueprints para VR.' },
          { q: '¿Estás disponible para prácticas?', a: 'Sí. Acabo de graduarme en DNAV (UCV) y busco prácticas o proyectos donde seguir creciendo como 3D Generalist.' },
          { q: '¿Trabajas en remoto?', a: 'Sí, trabajo en remoto sin problema, y presencialmente en la zona de Valencia.' },
          { q: '¿Cómo empezamos?', a: 'Escríbeme a zizekrp02@gmail.com con tu idea o necesidad y te respondo con un enfoque y unos tiempos.' },
        ],
      },
      contact: {
        label: '( Hablemos )',
        title: 'Creemos algo juntos',
        sub: '¿Buscas un 3D Generalist para tu equipo o proyecto? Escríbeme y lo hablamos.',
        emailLabel: 'Email',
        social: 'Redes',
      },
      footer: { made: 'Diseñado y construido por Hugo Ferrer Plaza', top: 'Volver arriba', rights: 'Todos los derechos reservados' },
    },

    en: {
      nav: { work: 'Work', about: 'About', contact: 'Contact', cta: "Let's talk" },
      avail: 'Available for internships',
      hero: {
        eyebrow: '3D Generalist · DNAV Graduate · UCV',
        cyclePre: 'I design &',
        cycle: ['model', 'texture', 'program', 'render'],
        cyclePost: 'worlds in 3D',
        sub: "I'm Hugo Ferrer Plaza, a 3D artist from Valencia. I build environments, props and VR experiences caring for every step of the pipeline — from sculpting to real-time rendering.",
        ctaWork: 'View projects',
        ctaContact: 'Contact',
        scroll: 'Scroll',
        metaLoc: 'Valencia, Spain',
      },
      tickerLabel: 'Tools',
      caps: {
        label: '( What I do )',
        title: 'Capabilities',
        intro: 'A generalist profile covering the full pipeline, from concept to final asset.',
        items: [
          { t: '3D Modeling', d: 'Hard-surface and organic, from modular props to full production-ready environments.' },
          { t: 'PBR Texturing', d: 'Realistic and stylized materials in Substance Painter with a clean PBR baking flow.' },
          { t: 'VR Development', d: 'Unreal Engine 5 experiences with C++ and Blueprints, optimized for Meta Quest standalone.' },
          { t: 'Lookdev & Render', d: 'Lighting, camera composition and physical rendering at a cinematic level.' },
          { t: 'Sculpting', d: 'High-detail ZBrush work: anatomy, expression and surface detail.' },
          { t: 'Real-time', d: 'Asset optimization, retopology and LODs for real-time engines.' },
        ],
      },
      about: {
        label: '( About )',
        title: '3D artist building worlds from scratch',
        bio: 'Recent graduate of the Animation & Video Game Development degree (DNAV) at the Universidad Católica de Valencia. I get involved in every step of the production pipeline, aiming for assets that are artistically striking and technically sound.',
        bio2: "My thesis, Ecos de Xàtiva, is a VR experience on Unreal Engine 5.4 for Meta Quest 3 where I served as Lead Programmer — C++ physics systems, interaction mechanics and Android standalone optimization.",
        timelineTitle: 'Journey',
        timeline: [
          { y: '2022 — 2026', t: 'DNAV Degree', d: 'Animation & Video Game Development · UCV' },
          { y: '2024', t: 'Academic exchange', d: '3D Environments & Lighting course in Mexico' },
          { y: '2025 — 2026', t: 'Lead Programmer · Thesis', d: 'Ecos de Xàtiva — VR experience in UE5' },
          { y: '2026', t: 'Graduate', d: 'Available for internships and 3D projects' },
        ],
        stats: [
          { n: '6', l: 'Projects' },
          { n: '8+', l: 'Tools' },
          { n: '1', l: 'VR experience' },
        ],
      },
      featured: {
        label: '( Featured project )',
        title: 'Ecos de Xàtiva',
        meta: 'Lead Programmer · UE5.4 · C++ · Blueprints · Android',
        desc: 'VR experience for Meta Quest 3 set in Castell de Xàtiva. A historical sandbox where you wield medieval weapons, fire cannons and explore 15th–16th century Iberian heritage.',
        live: 'View live demo',
        gallery: 'Project gallery',
      },
      work: {
        label: '( More work )',
        title: 'Projects',
        viewAll: 'View full portfolio',
        cta: 'View project',
        video: 'Video project',
      },
      projects: {
        mexican: { t: 'Mexican Town', tag: '3D Environment · Lighting', d: 'Traditional Mexican plaza environment created during an exchange in Mexico: central kiosk, street food carts and mototaxis, modeled and lit from direct cultural reference.' },
        shanYun: { t: 'Shan Yun', tag: 'Character Study · ZBrush', d: 'High-detail character study exploring anatomy, facial expression and surface texture. Sculpted in ZBrush, textured with Substance Painter.' },
        porsche: { t: 'PORSCHE', tag: 'Cinematography · Animation', d: 'Cinematic 3D piece combining automotive design with storytelling. Camera composition, lighting mood and commercial-grade timing.' },
        c4d: { t: 'Cinema 4D Showcase', tag: 'Hard-surface · MoGraph', d: 'Technical and creative showcase of hard-surface modeling in Cinema 4D: procedural modeling, MoGraph systems and physical rendering.' },
        tank: { t: 'Creative Artillery', tag: 'Stylized · Illustration', d: 'Stylized pencil tank combining illustration sensibility with 3D craft. An exploration of non-photorealistic language applied to hard-surface.' },
      },
      quote: { text: "Every asset I build has to hold up in a close-up and run at ninety fps. Beauty and performance aren't a trade-off — they're designed together." },
      process: {
        label: '( How I work )',
        title: 'Process',
        intro: 'A clear flow from brief to final in-engine asset.',
        steps: [
          { t: 'Reference & blockout', d: 'I gather reference and define scale and proportions with a quick blockout before modeling anything.' },
          { t: 'Modeling & sculpting', d: 'Clean hard-surface or ZBrush sculpting depending on the asset, with production-ready topology.' },
          { t: 'Texturing & lookdev', d: 'PBR in Substance, materials and baking; lighting and camera composition through to final render.' },
          { t: 'Optimization & delivery', d: 'Retopology, LODs and real-time / VR optimization, delivered engine-ready.' },
        ],
      },
      faq: {
        label: '( Frequently asked )',
        title: 'FAQ',
        items: [
          { q: 'What kind of projects do you do?', a: 'Environments, props, hard-surface, characters and VR experiences. As a generalist I cover the full pipeline, from concept to final in-engine asset.' },
          { q: 'What software do you use?', a: 'Maya, ZBrush, Substance Painter, Blender, Cinema 4D, Marmoset and Unreal Engine 5. I code in C++ and Blueprints for VR.' },
          { q: 'Are you available for internships?', a: "Yes. I just graduated in DNAV (UCV) and I'm looking for internships or projects to keep growing as a 3D Generalist." },
          { q: 'Do you work remotely?', a: 'Yes, I work remotely with no problem, and on-site around Valencia.' },
          { q: 'How do we start?', a: 'Email me at zizekrp02@gmail.com with your idea or need and I will reply with an approach and a timeline.' },
        ],
      },
      contact: {
        label: '( Get in touch )',
        title: "Let's create something together",
        sub: 'Looking for a 3D Generalist for your team or project? Drop me a line.',
        emailLabel: 'Email',
        social: 'Social',
      },
      footer: { made: 'Designed & built by Hugo Ferrer Plaza', top: 'Back to top', rights: 'All rights reserved' },
    },

    va: {
      nav: { work: 'Treball', about: 'Sobre mi', contact: 'Contacte', cta: 'Parlem' },
      avail: 'Disponible per a pràctiques',
      hero: {
        eyebrow: '3D Generalist · Graduat DNAV · UCV',
        cyclePre: 'Dissenye i',
        cycle: ['modele', 'texturitze', 'programe', 'renderitze'],
        cyclePost: 'mons en 3D',
        sub: 'Soc Hugo Ferrer Plaza, artista 3D de València. Construïsc entorns, props i experiències VR cuidant cada pas del pipeline — de l\'escultura al render en temps real.',
        ctaWork: 'Veure projectes',
        ctaContact: 'Contacte',
        scroll: 'Desplaça',
        metaLoc: 'València, Espanya',
      },
      tickerLabel: 'Eines',
      caps: {
        label: '( El que faig )',
        title: 'Capacitats',
        intro: 'Un perfil generalista que cobreix el pipeline complet, del concepte a l\'asset final.',
        items: [
          { t: 'Modelat 3D', d: 'Hard-surface i orgànic, des de props modulars fins a entorns complets llestos per a producció.' },
          { t: 'Texturitzat PBR', d: 'Materials realistes i estilitzats en Substance Painter amb flux PBR i baking net.' },
          { t: 'Desenvolupament VR', d: 'Experiències en Unreal Engine 5 amb C++ i Blueprints, optimitzades per a Meta Quest standalone.' },
          { t: 'Lookdev & Render', d: 'Il·luminació, composició de càmera i render físic de nivell cinematogràfic.' },
          { t: 'Escultura', d: 'Alta definició en ZBrush: anatomia, expressió i detall de superfície.' },
          { t: 'Temps real', d: 'Optimització d\'assets, retopologia i LODs per a motors en temps real.' },
        ],
      },
      about: {
        label: '( Sobre mi )',
        title: 'Artista 3D que construeix mons des de zero',
        bio: 'Recentment graduat en el Grau de Desenvolupament d\'Animació i Videojocs (DNAV) de la Universitat Catòlica de València. M\'involucre en cada pas del pipeline de producció buscant assets artísticament impactants i tècnicament sòlids.',
        bio2: 'El meu TFG, Ecos de Xàtiva, és una experiència VR en Unreal Engine 5.4 per a Meta Quest 3 on vaig exercir com a Lead Programmer: sistemes de física en C++, mecàniques d\'interacció i optimització Android standalone.',
        timelineTitle: 'Trajectòria',
        timeline: [
          { y: '2022 — 2026', t: 'Grau DNAV', d: 'Desenvolupament d\'Animació i Videojocs · UCV' },
          { y: '2024', t: 'Intercanvi acadèmic', d: 'Curs d\'Entorns 3D i Il·luminació a Mèxic' },
          { y: '2025 — 2026', t: 'Lead Programmer · TFG', d: 'Ecos de Xàtiva — experiència VR en UE5' },
          { y: '2026', t: 'Graduat', d: 'Disponible per a pràctiques i projectes 3D' },
        ],
        stats: [
          { n: '6', l: 'Projectes' },
          { n: '8+', l: 'Eines' },
          { n: '1', l: 'Experiència VR' },
        ],
      },
      featured: {
        label: '( Projecte destacat )',
        title: 'Ecos de Xàtiva',
        meta: 'Lead Programmer · UE5.4 · C++ · Blueprints · Android',
        desc: 'Experiència VR per a Meta Quest 3 ambientada al Castell de Xàtiva. Un sandbox històric on brandeixes armes medievals, dispares canons i explores el patrimoni ibèric dels segles XV–XVI.',
        live: 'Veure demo en viu',
        gallery: 'Galeria del projecte',
      },
      work: {
        label: '( Més treball )',
        title: 'Projectes',
        viewAll: 'Veure portfolio complet',
        cta: 'Veure projecte',
        video: 'Projecte en vídeo',
      },
      projects: {
        mexican: { t: 'Mexican Town', tag: 'Entorn 3D · Il·luminació', d: 'Entorn d\'una plaça mexicana tradicional creat durant un intercanvi a Mèxic: quiosc central, parades de menjar de carrer i mototaxis, modelat i il·luminat des de referència cultural directa.' },
        shanYun: { t: 'Shan Yun', tag: 'Character Study · ZBrush', d: 'Character study d\'alta definició que explora anatomia, expressió facial i textura superficial. Esculpit en ZBrush, texturitzat amb Substance Painter.' },
        porsche: { t: 'PORSCHE', tag: 'Cinematografia · Animació', d: 'Peça cinematogràfica 3D que combina disseny automobilístic i storytelling. Composició de càmera, mood d\'il·luminació i timing de nivell comercial.' },
        c4d: { t: 'Cinema 4D Showcase', tag: 'Hard-surface · MoGraph', d: 'Showcase tècnic i creatiu de modelat hard-surface en Cinema 4D: modelat procedimental, sistemes MoGraph i render físic.' },
        tank: { t: 'Creative Artillery', tag: 'Estilitzat · Il·lustració', d: 'Tanc de llapis estilitzat que combina sensibilitat il·lustrativa amb craft 3D. Una exploració del llenguatge no-fotorealista aplicat a hard-surface.' },
      },
      quote: { text: 'Cada asset que construïsc ha d\'aguantar un primer pla i córrer a noranta fps. Bellesa i rendiment no es negocien: es dissenyen junts.' },
      process: {
        label: '( Com treballe )',
        title: 'Procés',
        intro: 'Un flux clar del brief a l\'asset final en motor.',
        steps: [
          { t: 'Referència & blockout', d: 'Reunisc referència, definisc escala i proporcions amb un blockout ràpid abans de modelar res.' },
          { t: 'Modelat & escultura', d: 'Hard-surface net o escultura en ZBrush segons l\'asset, amb topologia pensada per a producció.' },
          { t: 'Texturitzat & lookdev', d: 'PBR en Substance, materials i baking; il·luminació i composició de càmera fins al render final.' },
          { t: 'Optimització & entrega', d: 'Retopologia, LODs i optimització per a temps real / VR, entrega llesta per a motor.' },
        ],
      },
      faq: {
        label: '( Preguntes freqüents )',
        title: 'FAQ',
        items: [
          { q: 'Quin tipus de projectes fas?', a: 'Entorns, props, hard-surface, personatges i experiències VR. Com a generalista cobrisc tot el pipeline, del concepte a l\'asset final en motor.' },
          { q: 'Amb quin programari treballes?', a: 'Maya, ZBrush, Substance Painter, Blender, Cinema 4D, Marmoset i Unreal Engine 5. Programe en C++ i Blueprints per a VR.' },
          { q: 'Estàs disponible per a pràctiques?', a: 'Sí. Acabe de graduar-me en DNAV (UCV) i busque pràctiques o projectes on seguir creixent com a 3D Generalist.' },
          { q: 'Treballes en remot?', a: 'Sí, treballe en remot sense problema, i presencialment a la zona de València.' },
          { q: 'Com comencem?', a: 'Escriu-me a zizekrp02@gmail.com amb la teua idea o necessitat i et responc amb un enfocament i uns temps.' },
        ],
      },
      contact: {
        label: '( Parlem )',
        title: 'Creem alguna cosa junts',
        sub: 'Busques un 3D Generalist per al teu equip o projecte? Escriu-me i ho parlem.',
        emailLabel: 'Email',
        social: 'Xarxes',
      },
      footer: { made: 'Dissenyat i construït per Hugo Ferrer Plaza', top: 'Tornar amunt', rights: 'Tots els drets reservats' },
    },
  };

  /* ─── Helpers ──────────────────────────────── */
  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
  }

  let current = 'es';

  function applyLang(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = getPath(t, el.dataset.i18n);
      if (typeof val === 'string') el.innerHTML = val;
    });
    document.documentElement.lang = lang === 'va' ? 'ca' : lang;
    // notify dynamic renderers (hero word-cycle, etc.)
    window.dispatchEvent(new CustomEvent('hfp:lang', { detail: { lang, t } }));
  }

  function setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    current = lang;
    try { localStorage.setItem('hfp-lang', lang); } catch (_) {}

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    applyLang(lang);
  }

  /* ─── Init ─────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    let saved = 'es';
    try { saved = localStorage.getItem('hfp-lang') || 'es'; } catch (_) {}
    setLang(saved);
  });

  // expose for main.js dynamic bits + debugging
  window.__i18n = { setLang, getLang: () => current, get: () => TRANSLATIONS[current], TRANSLATIONS };
})();
