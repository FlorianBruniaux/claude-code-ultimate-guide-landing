// Usage: node clip.cjs <out> <theme> <width> <path> <selector>
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const [out, theme, width, p, sel] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ executablePath: process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  const ctx = await b.newContext({ viewport: { width: Number(width), height: 900 } });
  await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4391' + p, { waitUntil: 'networkidle' });
  await page.locator(sel).first().screenshot({ path: out });
  await b.close();
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
