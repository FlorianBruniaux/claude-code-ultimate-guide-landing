// Behaviour checks on the running dev server. Output: shots/interact.json + focus/hover screenshots.
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const BASE = process.env.BASE || 'http://127.0.0.1:4391';
const OUT = path.join(__dirname, 'shots');
const EXE = (process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');

function lum(rgb) {
  const m = rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2];
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const res = {};
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    const r = (res[theme] = {});
    // Computed styles + contrast of the three levels at rest
    const read = (sel) => page.$eval(sel, (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return { bg: s.backgroundColor, color: s.color, border: s.borderTopColor, deco: s.textDecorationLine, thick: s.textDecorationThickness, w: b.width, h: b.height, outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`, transition: s.transitionDuration, font: s.fontFamily.split(',')[0] }; });
    const pageBg = await page.$eval('body', (el) => getComputedStyle(el).backgroundColor);
    const P = '.hero-actions .btn-primary', S = '.hero-actions .btn-secondary', Q = '.hero-actions .btn-quiet';
    const rest = { primary: await read(P), secondary: await read(S), quiet: await read(Q) };
    r.rest = rest;
    r.contrast = {
      primaryText: ratio(rest.primary.color, rest.primary.bg),
      secondaryText: ratio(rest.secondary.color, rest.secondary.bg),
      quietOnPage: ratio(rest.quiet.color, pageBg),
      bodyText: ratio(await page.$eval('body', (el) => getComputedStyle(el).color), pageBg),
    };
    // Hover: colours change, box stays the same size
    r.hover = {};
    for (const [k, sel] of Object.entries({ primary: P, secondary: S, quiet: Q })) {
      await page.hover(sel); await page.waitForTimeout(250);
      const h = await read(sel);
      r.hover[k] = { bg: h.bg, border: h.border, thick: h.thick, sameSize: Math.abs(h.w - rest[k].w) < 0.5 && Math.abs(h.h - rest[k].h) < 0.5 };
      await page.screenshot({ path: path.join(OUT, `check-hover-${k}-${theme}.png`), clip: { x: 0, y: 420, width: 720, height: 140 } });
    }
    await page.mouse.move(5, 5);
    // Keyboard: tab until the primary hero action is focused
    let found = false;
    for (let i = 0; i < 60 && !found; i++) {
      await page.keyboard.press('Tab');
      found = await page.evaluate(() => document.activeElement?.matches('.hero-actions .btn-primary'));
    }
    r.keyboard = { reachedPrimary: found, focus: found ? (await read(P)).outline : null };
    if (found) await page.screenshot({ path: path.join(OUT, `check-focus-primary-${theme}.png`), clip: { x: 0, y: 420, width: 720, height: 140 } });
    // Search: Cmd/Ctrl+K opens the modal, typing returns results
    await page.keyboard.press('Escape');
    await page.keyboard.press('ControlOrMeta+k'); await page.waitForTimeout(400);
    const input = await page.$('#search-input, [data-search-input], input[type="search"]');
    let results = 0;
    if (input) { await input.type('hooks'); await page.waitForTimeout(500); results = await page.$$eval('[role="option"], .search-result, #search-results li', (els) => els.length); }
    r.search = { inputFound: !!input, focusedInput: input ? await page.evaluate((el) => document.activeElement === el, input) : false, results };
    await page.screenshot({ path: path.join(OUT, `check-search-${theme}.png`) });
    await page.keyboard.press('Escape');
    // Reduced motion: button transitions are cut
    await page.emulateMedia({ reducedMotion: 'reduce' });
    r.reducedMotionTransition = (await read(P)).transition;
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await ctx.close();
  }
  // Copy command on /learning/ with clipboard permission
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await ctx.newPage();
    await page.goto(BASE + '/learning/', { waitUntil: 'networkidle' });
    const btn = await page.$('button.copy-btn[data-copy]');
    if (btn) {
      await btn.scrollIntoViewIfNeeded();
      await btn.click(); await page.waitForTimeout(300);
      res.copy = { clipboard: (await page.evaluate(() => navigator.clipboard.readText())).slice(0, 80), label: (await btn.innerText()).trim(), className: await btn.getAttribute('class') };
    } else res.copy = { error: 'no copy button' };
    await ctx.close();
  }
  // Downloads: every download link answers
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(BASE + '/downloads/', { waitUntil: 'networkidle' });
    const links = await page.$$eval('.download-actions a, a[download]', (as) => as.map((a) => ({ text: a.innerText.trim(), href: a.href, cls: a.className })));
    res.downloads = [];
    for (const l of links) {
      let status = null;
      try { const rr = await ctx.request.head(l.href, { timeout: 20000, maxRedirects: 5 }); status = rr.status(); } catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
      res.downloads.push({ ...l, status });
    }
    // Overflow check at 390 px on the four pages
    await page.setViewportSize({ width: 390, height: 844 });
    res.overflow390 = {};
    for (const u of ['/', '/downloads/', '/guide/ultimate-guide/01-quick-start/', '/learning/']) {
      await page.goto(BASE + u, { waitUntil: 'networkidle' });
      res.overflow390[u] = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    }
    // Groups with more than one primary action
    await page.setViewportSize({ width: 1440, height: 900 });
    res.multiPrimary = {};
    for (const u of ['/', '/downloads/', '/learning/', '/whitepapers/', '/cheatsheet/', '/examples/']) {
      await page.goto(BASE + u, { waitUntil: 'networkidle' });
      res.multiPrimary[u] = await page.$$eval('.btn-primary', (bs) => { const m = new Map(); bs.forEach((b) => { const p = b.parentElement; m.set(p, (m.get(p) || 0) + 1); }); return [...m.entries()].filter(([, n]) => n > 1).map(([p, n]) => `${p.className || p.tagName}:${n}`); });
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'interact.json'), JSON.stringify(res, null, 2));
  await browser.close();
  console.log(JSON.stringify(res, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
