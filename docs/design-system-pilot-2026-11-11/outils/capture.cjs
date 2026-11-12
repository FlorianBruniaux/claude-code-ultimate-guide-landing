// Usage: node capture.cjs <label>  (label = before | after)
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const label = process.argv[2] || 'before';
const BASE = process.env.BASE || 'http://127.0.0.1:4391';
const OUT = path.join(__dirname, 'shots');
const pages = [
  { id: 'home', url: '/', full: false },
  { id: 'lecture', url: '/guide/ultimate-guide/02-core-workflow/', full: false },
  { id: 'install', url: '/guide/ultimate-guide/01-quick-start/', full: false },
  { id: 'downloads', url: '/downloads/', full: false },
];
(async () => {
  const browser = await chromium.launch({ executablePath: (process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') });
  const report = [];
  for (const theme of ['light', 'dark']) {
    for (const vp of [{ n: 'desk', w: 1440, h: 900 }, { n: 'mob', w: 390, h: 844 }]) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
      await ctx.addInitScript((t) => { try { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); } catch (e) {} }, theme);
      const page = await ctx.newPage();
      for (const p of pages) {
        if (vp.n === 'mob' && p.id === 'lecture') continue;
        await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 90000 });
        await page.waitForTimeout(400);
        const file = `${label}-${p.id}-${vp.n}-${theme}.png`;
        await page.screenshot({ path: path.join(OUT, file), fullPage: p.full });
        const info = await page.evaluate(() => {
          const cs = (sel) => { const el = document.querySelector(sel); if (!el) return null; const s = getComputedStyle(el); return { font: s.fontFamily.slice(0, 40), color: s.color, bg: s.backgroundColor, minH: s.minHeight, h: el.getBoundingClientRect().height, radius: s.borderRadius, deco: s.textDecorationLine }; };
          return { body: cs('body'), h1: cs('h1'), primary: cs('.btn-primary'), secondary: cs('.btn-secondary'), overflowX: document.documentElement.scrollWidth > window.innerWidth };
        });
        report.push({ file, ...info });
      }
      if (vp.n === 'mob') {
        await page.goto(BASE + '/', { waitUntil: 'networkidle' });
        const t = await page.$('#mobile-menu-toggle');
        if (t) { await t.click(); await page.waitForTimeout(500); }
        await page.screenshot({ path: path.join(OUT, `${label}-navmobile-mob-${theme}.png`) });
      }
      await ctx.close();
    }
  }
  require('fs').writeFileSync(path.join(OUT, `${label}-computed.json`), JSON.stringify(report, null, 2));
  await browser.close();
  console.log('ok', report.length);
})().catch((e) => { console.error(e); process.exit(1); });
