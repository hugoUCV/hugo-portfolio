/* ═══════════════════════════════════════════════════
   i18n.js — Inline translations, no fetch needed
   Supports: es (Spanish), en (English), va (Valencian)
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  const TRANSLATIONS = {
    es: {
      nav: { about: 'Sobre mí', work: 'Proyectos', contact: 'Contacto' },
      hero: {
        eyebrow: '3D Generalist · Graduado DNAV · UCV',
        sub:     'Creando mundos a través del modelado 3D, texturizado y experiencias VR',
        cta:     'Explorar mi trabajo',
        scroll:  'Scroll',
      },
      about: {
        label:       'Sobre mí',
        title:       'Artista 3D que<br>construye mundos<br>desde cero',
        bio:         'Soy un 3D Generalist recién graduado del Grado en Desarrollo de Animación y Videojuegos (DNAV) de la Universidad Católica de Valencia. Me involucro en cada paso del pipeline de producción — desde el esculpido y modelado hasta el texturizado PBR y el renderizado en tiempo real — siempre buscando assets artísticamente impactantes y técnicamente sólidos.',
        bio2:        'Mi TFG, Ecos de Xàtiva, es una experiencia VR construida en Unreal Engine 5.4 para Meta Quest 3 donde ejercí como Lead Programmer: implementé sistemas de física en C++, mecánicas de interacción VR y optimización para Android standalone.',
        skillsLabel: 'Herramientas y disciplinas',
      },
      work: { label: 'Proyectos seleccionados', title: 'Proyectos' },
      projects: {
        cta:    'Ver proyecto',
        ecos:   { desc: 'Experiencia VR para Meta Quest 3 ambientada en el Castell de Xàtiva. Un sandbox histórico donde puedes blandir armas medievales, disparar cañones y explorar el patrimonio ibérico de los siglos XV–XVI. Construida con UE5.4, C++ y Blueprints.', role: 'Lead Programmer · UE5 · C++ · Blueprints · Android' },
        mexican:{ desc: 'Entorno de una plaza mexicana tradicional creado durante un intercambio en México. Incluye kiosco central, puestos de comida callejera y mototaxis — todo modelado e iluminado desde referencia cultural directa.' },
        shanYun:{ desc: 'Character study de alta definición que explora anatomía, expresión facial y textura superficial. Esculpido en ZBrush, texturizado con Substance Painter.' },
        porsche:{ desc: 'Pieza cinematográfica 3D que combina diseño automovilístico y storytelling. Centrada en la composición de cámara, el mood de iluminación y el timing del movimiento para lograr una animación de nivel comercial.' },
        c4d:    { desc: 'Showcase técnico y creativo de modelado hard-surface en Cinema 4D. Cubre modelado procedimental, sistemas MoGraph y renderizado físico.' },
        tank:   { desc: 'Tanque de lápiz estilizado que combina sensibilidad ilustrativa con craft 3D. Una exploración del lenguaje de diseño no-fotorrealista aplicado a un sujeto hard-surface.' },
      },
      contact: { label: 'Hablemos', title: 'Creemos algo<br>juntos' },
      footer:  { made: 'Construido con ♥ y demasiados polígonos' },
    },

    en: {
      nav: { about: 'About', work: 'Work', contact: 'Contact' },
      hero: {
        eyebrow: '3D Generalist · DNAV Graduate · UCV',
        sub:     'Creating worlds through 3D modeling, texturing and VR experiences',
        cta:     'Explore my work',
        scroll:  'Scroll',
      },
      about: {
        label:       'About',
        title:       '3D artist building<br>worlds from<br>scratch',
        bio:         "I'm a 3D Generalist and recent DNAV graduate from the Universidad Católica de Valencia. I'm involved in every step of the production pipeline — from sculpting and modeling to PBR texturing and real-time rendering — always aiming for assets that are artistically striking and technically sound.",
        bio2:        "My Bachelor's thesis, Ecos de Xàtiva, is a VR experience built on Unreal Engine 5.4 for Meta Quest 3, where I served as Lead Programmer — implementing C++ physics systems, VR interaction mechanics and Android standalone optimization.",
        skillsLabel: 'Tools & disciplines',
      },
      work: { label: 'Selected Work', title: 'Projects' },
      projects: {
        cta:    'View project',
        ecos:   { desc: 'VR experience for Meta Quest 3 set in Castell de Xàtiva. A historical sandbox where you can wield medieval weapons, fire cannons and explore 15th–16th century Iberian heritage. Built with UE5.4, C++ and Blueprints.', role: 'Lead Programmer · UE5 · C++ · Blueprints · Android' },
        mexican:{ desc: 'Traditional Mexican plaza environment created during an exchange program in Mexico. Features a central kiosk, street food vendors and mototaxis — all modeled and lit from direct cultural reference.' },
        shanYun:{ desc: 'High-detail character study exploring anatomy, facial expression and surface texture. Sculpted in ZBrush, textured with Substance Painter.' },
        porsche:{ desc: 'Cinematic 3D piece combining automotive design with storytelling. Focuses on camera composition, lighting mood and motion timing to deliver a commercial-grade animation.' },
        c4d:    { desc: 'Technical and creative showcase of hard-surface prop modeling in Cinema 4D. Covers procedural modeling, MoGraph systems and physical rendering.' },
        tank:   { desc: 'Stylized pencil tank combining illustration sensibility with 3D craft. An exploration of non-photorealistic design language applied to a hard-surface subject.' },
      },
      contact: { label: 'Get in touch', title: "Let's create<br>something together" },
      footer:  { made: 'Built with ♥ and too many polygons' },
    },

    va: {
      nav: { about: 'Sobre mi', work: 'Projectes', contact: 'Contacte' },
      hero: {
        eyebrow: '3D Generalist · Graduat DNAV · UCV',
        sub:     'Creant mons a través del modelat 3D, texturitzat i experiències VR',
        cta:     'Veure el meu treball',
        scroll:  'Desplaça\'t',
      },
      about: {
        label:       'Sobre mi',
        title:       'Artista 3D que<br>construeix mons<br>des de zero',
        bio:         'Soc un 3D Generalist recentment graduat en el Grau de Desenvolupament d\'Animació i Videojocs (DNAV) de la Universitat Catòlica de València. M\'involucre en cada pas del pipeline de producció — des de l\'escultura i el modelat fins al texturitzat PBR i el renderitzat en temps real — sempre buscant assets artísticament impactants i tècnicament sòlids.',
        bio2:        'El meu TFG, Ecos de Xàtiva, és una experiència VR construïda en Unreal Engine 5.4 per a Meta Quest 3 on vaig exercir com a Lead Programmer: vaig implementar sistemes de física en C++, mecàniques d\'interacció VR i optimització Android standalone.',
        skillsLabel: 'Eines i disciplines',
      },
      work: { label: 'Projectes seleccionats', title: 'Projectes' },
      projects: {
        cta:    'Veure projecte',
        ecos:   { desc: 'Experiència VR per a Meta Quest 3 ambientada al Castell de Xàtiva. Un sandbox històric on pots brandir armes medievals, disparar canons i explorar el patrimoni ibèric dels segles XV–XVI. Construïda amb UE5.4, C++ i Blueprints.', role: 'Lead Programmer · UE5 · C++ · Blueprints · Android' },
        mexican:{ desc: 'Entorn d\'una plaça mexicana tradicional creat durant un intercanvi a Mèxic. Inclou quiosc central, parades de menjar de carrer i mototaxis — tot modelat i il·luminat des de referència cultural directa.' },
        shanYun:{ desc: 'Character study d\'alta definició que explora anatomia, expressió facial i textura superficial. Esculpit en ZBrush, texturitzat amb Substance Painter.' },
        porsche:{ desc: 'Peça cinematogràfica 3D que combina disseny automobilístic i storytelling. Centrada en la composició de càmera, el mood d\'il·luminació i el timing del moviment per aconseguir una animació de nivell comercial.' },
        c4d:    { desc: 'Showcase tècnic i creatiu de modelat hard-surface en Cinema 4D. Cobreix modelat procedimental, sistemes MoGraph i renderitzat físic.' },
        tank:   { desc: 'Tanc de llapis estilitzat que combina sensibilitat il·lustrativa amb craft 3D. Una exploració del llenguatge de disseny no-fotorrealista aplicat a un subjecte hard-surface.' },
      },
      contact: { label: 'Parlem', title: 'Creem alguna<br>cosa junts' },
      footer:  { made: 'Construït amb ♥ i massa polígons' },
    },
  };

  /* ─── Helpers ──────────────────────────────── */
  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
  }

  function applyLang(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = getPath(t, el.dataset.i18n);
      if (val !== undefined) el.innerHTML = val;
    });
    document.documentElement.lang = lang;

    // Update card glow CSS variable from data-color attr
    document.querySelectorAll('.project-card[data-color]').forEach(card => {
      card.querySelector('.card-glow').style.setProperty('--color', card.dataset.color);
    });
  }

  function setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
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

  // expose for debugging
  window.__i18n = { setLang, TRANSLATIONS };
})();
