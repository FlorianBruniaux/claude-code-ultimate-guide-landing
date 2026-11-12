// Menu + hover audit. Usage: node menu.cjs <label>
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const label = process.argv[2] || 'menu';
const OUT = path.join(__dirname, 'shots');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell';
(async () => {
  const b = await chromium.launch({ executablePath: EXE });
  for (const theme of ['light', 'dark']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
    const p = await ctx.newPage();
    await p.goto('http://127.0.0.1:4391/learning/', { waitUntil: 'networkidle' });
    // Open the "Start" panel and hover its first essential link
    const trig = p.locator('.top-level-link').filter({ hasText: 'Start' }).first();
    await trig.click(); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(OUT, `${label}-panel-${theme}.png`) });
    const link = p.locator('.intent-panel a').nth(2);
    if (await link.count()) { await link.hover(); await p.waitForTimeout(250); await p.screenshot({ path: path.join(OUT, `${label}-panel-hover-${theme}.png`) }); }
    await p.keyboard.press('Escape');
    // Learning cards hover
    await p.mouse.move(5, 5);
    const card = p.locator('.path-card').first();
    await card.scrollIntoViewIfNeeded(); await card.hover(); await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(OUT, `${label}-learning-card-hover-${theme}.png`) });
    const pc = p.locator('.pattern-card').first();
    await pc.scrollIntoViewIfNeeded(); await pc.hover(); await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(OUT, `${label}-learning-pattern-hover-${theme}.png`) });
    await ctx.close();
  }
  // Portfolio reference: Learn menu open + card hover
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:4392/', { waitUntil: 'networkidle' });
  const learn = p.locator('#portfolio-header .learn-menu > summary').filter({ hasText: 'Learn' }).first();
  if (await learn.count()) { await learn.click(); await p.waitForTimeout(400); const l = p.locator('#portfolio-header .learn-dropdown a').nth(1); if (await l.count()) await l.hover(); await p.waitForTimeout(250); await p.screenshot({ path: path.join(OUT, `${label}-portfolio-menu.png`) }); }
  await p.keyboard.press('Escape'); await p.mouse.move(5, 5);
  const card = p.locator('#readings .brand-interactive-card').first();
  await card.scrollIntoViewIfNeeded(); await card.hover(); await p.waitForTimeout(250);
  await p.screenshot({ path: path.join(OUT, `${label}-portfolio-card-hover.png`) });
  await p.goto('http://127.0.0.1:4392/sitemap/', { waitUntil: 'networkidle' });
  await p.screenshot({ path: path.join(OUT, `${label}-portfolio-sitemap.png`), fullPage: false });
  await b.close();
  console.log('ok');
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
