/* ═══════════════════════════════════════════════════
   cmdk.js — V7 · command palette (⌘K / Ctrl+K)
   jump to projects/sections · switch language/theme · vCard
   Shared across all pages. CSS-driven visibility.
═══════════════════════════════════════════════════ */
(function () {
  'use strict';
  function t() { try { return window.__i18n.get(); } catch (_) { return null; } }
  const PAGES = { ecos: 'ecos.html', mexican: 'mexican.html', shanyun: 'shanyun.html', porsche: 'porsche.html', cinema4d: 'cinema4d.html', tank: 'tank.html' };
  const I18N = { ecos: 'ecos', mexican: 'mexican', shanyun: 'shanYun', porsche: 'porsche', cinema4d: 'c4d', tank: 'tank' };

  const ov = document.createElement('div');
  ov.className = 'cmdk'; ov.setAttribute('aria-hidden', 'true');
  ov.innerHTML = '<div class="cmdk-backdrop"></div><div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command palette">' +
    '<input class="cmdk-input mono" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Buscar" />' +
    '<ul class="cmdk-list" role="listbox"></ul></div>';
  document.body.appendChild(ov);
  const input = ov.querySelector('.cmdk-input'), list = ov.querySelector('.cmdk-list');
  let items = [], filtered = [], sel = 0, open = false;

  function onIndex() { return /(^|\/)(index\.html)?$/.test(location.pathname); }
  function nav2(href) {
    close();
    const hashM = href.match(/^index\.html(#.+)$/);
    if (hashM && onIndex()) { const el = document.querySelector(hashM[1]); if (el) { if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 }); else el.scrollIntoView({ behavior: 'smooth' }); } return; }
    const c = document.querySelector('.curtain');
    if (c) { c.classList.remove('up'); setTimeout(() => location.href = href, 420); } else location.href = href;
  }
  function downloadVCard() {
    const v = ['BEGIN:VCARD', 'VERSION:3.0', 'FN:Hugo Ferrer Plaza', 'N:Ferrer Plaza;Hugo;;;', 'TITLE:3D Generalist', 'EMAIL;TYPE=INTERNET:hugo.ferrer@mail.ucv.es', 'TEL;TYPE=CELL:601307544', 'ADR;TYPE=HOME:;;Valencia;;;;Spain', 'URL:https://hugoucv.github.io/hugo-portfolio/', 'END:VCARD'].join('\r\n');
    const blob = new Blob([v], { type: 'text/vcard' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'Hugo-Ferrer-Plaza.vcf'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }
  function setTheme() { const l = document.body.classList.toggle('light'); try { localStorage.setItem('hfp-theme', l ? 'light' : 'dark'); } catch (_) {} }

  function buildItems() {
    const tr = t() || {}; const P = tr.projects || {}; const nav = tr.nav || {}; const cmd = (tr.page && tr.page.cmd) || {};
    items = [];
    Object.keys(PAGES).forEach(k => { const pj = P[I18N[k]] || {}; items.push({ label: pj.t || k, hint: cmd.proj || 'Project', icon: '▦', run: () => nav2(PAGES[k]) }); });
    items.push({ label: nav.work || 'Work', hint: cmd.sec || 'Section', icon: '#', run: () => nav2('index.html#work') });
    items.push({ label: nav.about || 'About', hint: cmd.sec || 'Section', icon: '#', run: () => nav2('index.html#about') });
    items.push({ label: nav.contact || 'Contact', hint: cmd.sec || 'Section', icon: '#', run: () => nav2('index.html#contact') });
    items.push({ label: cmd.theme || 'Theme', hint: '', icon: '◐', run: setTheme });
    [['es', 'Español'], ['en', 'English'], ['va', 'Valencià']].forEach(([l, name]) => items.push({ label: name, hint: cmd.lang || 'Language', icon: '⌘', run: () => { if (window.__i18n) window.__i18n.setLang(l); } }));
    items.push({ label: cmd.vcard || 'Download contact', hint: 'vCard', icon: '⤓', run: downloadVCard });
    items.push({ label: cmd.email || 'Email', hint: 'hugo.ferrer@mail.ucv.es', icon: '✉', run: () => { location.href = 'mailto:hugo.ferrer@mail.ucv.es'; } });
  }
  function render() {
    list.innerHTML = '';
    if (!filtered.length) { const tr = t() || {}; const e = document.createElement('li'); e.className = 'cmdk-empty mono'; e.textContent = (tr.page && tr.page.cmd && tr.page.cmd.empty) || 'No results'; list.appendChild(e); return; }
    filtered.forEach((it, i) => {
      const li = document.createElement('li'); li.className = 'cmdk-item' + (i === sel ? ' sel' : ''); li.setAttribute('role', 'option');
      li.innerHTML = '<span class="cmdk-ic">' + it.icon + '</span><span class="cmdk-label">' + it.label + '</span><span class="cmdk-hint mono">' + (it.hint || '') + '</span>';
      li.addEventListener('mousemove', () => { if (sel !== i) { sel = i; markSel(); } });
      li.addEventListener('click', () => it.run());
      list.appendChild(li);
    });
  }
  function markSel() { [...list.children].forEach((li, i) => li.classList.toggle('sel', i === sel)); }
  function filter() {
    const q = input.value.trim().toLowerCase();
    filtered = !q ? items.slice() : items.filter(it => it.label.toLowerCase().includes(q) || (it.hint || '').toLowerCase().includes(q));
    sel = 0; render();
  }
  function openP() { buildItems(); const tr = t() || {}; input.placeholder = (tr.page && tr.page.cmd && tr.page.cmd.ph) || 'Search…'; input.value = ''; filtered = items.slice(); sel = 0; render(); ov.classList.add('open'); ov.setAttribute('aria-hidden', 'false'); open = true; if (window.__lenis) window.__lenis.stop(); setTimeout(() => input.focus(), 30); }
  function close() { ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true'); open = false; if (window.__lenis) window.__lenis.start(); }
  function ensureVis() { const el = list.children[sel]; if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' }); }

  input.addEventListener('input', filter);
  ov.querySelector('.cmdk-backdrop').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open ? close() : openP(); return; }
    if (!open) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(filtered.length - 1, sel + 1); markSel(); ensureVis(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); markSel(); ensureVis(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[sel]) filtered[sel].run(); }
  });
  window.addEventListener('hfp:lang', () => { if (open) { buildItems(); filter(); } });
  document.querySelectorAll('[data-cmdk]').forEach(b => b.addEventListener('click', openP));
  window.__cmdk = { open: openP };
})();
