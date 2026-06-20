/* ═══════════════════════════════════════════════════
   three-bg.js — Particle constellation hero background
   Requires Three.js loaded before this script
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  /* ─── Renderer ─────────────────────────────── */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 6;

  /* ─── Particles ────────────────────────────── */
  const COUNT = 280;
  const positions = new Float32Array(COUNT * 3);
  const colors    = new Float32Array(COUNT * 3);
  const sizes     = new Float32Array(COUNT);

  const gold  = new THREE.Color('#e8b86d');
  const white = new THREE.Color('#c8c8c8');

  for (let i = 0; i < COUNT; i++) {
    // Spread wider than the camera frustum so edges feel infinite
    positions[i * 3]     = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

    const isGold = Math.random() > 0.72;
    const c = isGold ? gold : white;
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 0.018 + 0.006;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

  /* Circular sprite texture */
  const spriteTex = (function () {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0,   'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();

  const mat = new THREE.PointsMaterial({
    size:          0.06,
    vertexColors:  true,
    transparent:   true,
    opacity:       0.65,
    sizeAttenuation: true,
    map:           spriteTex,
    blending:      THREE.AdditiveBlending,
    depthWrite:    false,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  /* ─── Mouse parallax ───────────────────────── */
  let mouseX = 0, mouseY = 0;
  let camX   = 0, camY   = 0;

  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ─── Animation loop ───────────────────────── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // Slow drift rotation
    points.rotation.y = t * 0.025;
    points.rotation.x = t * 0.008;

    // Lerp camera toward mouse — gentle parallax
    camX += (mouseX * 0.4 - camX) * 0.04;
    camY += (-mouseY * 0.25 - camY) * 0.04;
    camera.position.x = camX;
    camera.position.y = camY;

    renderer.render(scene, camera);
  }

  animate();

  /* ─── Resize ───────────────────────────────── */
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();
