// node p5ctx-hover.cjs <label> <theme> <path> <selector>
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const [label, theme, p, sel] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4391' + p, { waitUntil: 'networkidle' });
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  const read = () => el.evaluate((e) => { const c = getComputedStyle(e); return { bg: c.backgroundColor, color: c.color, shadow: c.boxShadow, transform: c.transform, outline: c.outlineStyle + ' ' + c.outlineWidth, deco: c.textDecorationLine + ' ' + c.textDecorationThickness }; });
  const rest = await read();
  await el.hover(); await page.waitForTimeout(300);
  const hov = await read();
  const box = await el.boundingBox();
  await page.screenshot({ path: path.join(__dirname, 'shots', `${label}-hover-${theme}.png`), clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: Math.min(1400, box.width + 60), height: box.height + 60 } });
  await page.mouse.move(0, 0);
  await page.keyboard.press('Tab');
  await el.focus(); await page.waitForTimeout(200);
  const foc = await read();
  await page.screenshot({ path: path.join(__dirname, 'shots', `${label}-focus-${theme}.png`), clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: Math.min(1400, box.width + 60), height: box.height + 60 } });
  console.log(JSON.stringify({ rest, hov, foc }));
  await b.close();
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
