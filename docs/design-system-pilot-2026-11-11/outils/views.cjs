// Usage: node views.cjs <label> <theme> <path> <y1,y2,...>
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const [label, theme, p, ys] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
  const page = await ctx.newPage();
  await page.goto((process.env.BASE || 'http://127.0.0.1:4391') + p, { waitUntil: 'networkidle' });
  for (const y of ys.split(',').map(Number)) {
    await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, 'shots', `${label}-${y}-${theme}.png`) });
  }
  console.log(await page.evaluate(() => document.documentElement.scrollHeight));
  await b.close();
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
