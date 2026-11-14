// Rendu du hero élargi : débordement, ordre de tabulation, cibles, contraste, captures.
process.env.BASE = process.env.BASE || 'http://127.0.0.1:4391';
const path = require('path');
const fs = require('fs');
const { launch, ctx, BASE } = require('../../ux-audit-2026-11-13/outils/lib.cjs');
const SHOTS = path.join(__dirname, '..', 'captures');
fs.mkdirSync(SHOTS, { recursive: true });

(async () => {
  const b = await launch();
  const out = [];
  for (const [w, h, theme] of [[1440, 900, 'light'], [1440, 900, 'dark'], [390, 844, 'light'], [768, 1024, 'dark']]) {
    const c = await ctx(b, { w, h, theme, touch: w < 500 });
    const p = await c.newPage();
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const nav = document.querySelector('.hero-beyond');
      const links = [...nav.querySelectorAll('a')];
      const rgb = (s) => s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
      const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const bgOf = (el) => { while (el) { const c = getComputedStyle(el).backgroundColor; if (c && !c.startsWith('rgba(0, 0, 0, 0)') && c !== 'transparent') return c; el = el.parentElement; } return 'rgb(255,255,255)'; };
      const ratio = (el) => { const a = lum(rgb(getComputedStyle(el).color)), bb = lum(rgb(bgOf(el))); return +((Math.max(a, bb) + 0.05) / (Math.min(a, bb) + 0.05)).toFixed(2); };
      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        title: document.title,
        description: document.querySelector('meta[name="description"]').content,
        links: links.map((a) => ({ text: a.textContent, h: Math.round(a.getBoundingClientRect().height), contrast: ratio(a) })),
        label: ratio(nav.querySelector('.hero-beyond-label')),
        support: ratio(document.querySelector('.hero-support')),
      };
    });
    // Ordre de tabulation : les boutons du hero avant les liens thématiques.
    const order = [];
    for (let i = 0; i < 40; i++) {
      await p.keyboard.press('Tab');
      const t = await p.evaluate(() => { const a = document.activeElement; return a.closest('.hero-actions') ? 'btn' : a.closest('.hero-beyond') ? 'topic' : ''; });
      if (t) order.push(t);
      if (order.filter((x) => x === 'topic').length === 5) break;
    }
    r.tabOrder = order.join(',');
    await p.locator('.hero').screenshot({ path: path.join(SHOTS, `hero-${w}-${theme}.png`) });
    out.push({ w, theme, ...r });
    await c.close();
  }
  await b.close();
  console.log(JSON.stringify(out, null, 1));
})();
