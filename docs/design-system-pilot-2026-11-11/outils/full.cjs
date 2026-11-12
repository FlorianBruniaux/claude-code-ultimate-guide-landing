// Usage: node full.cjs <label> <theme> <width> <path> [<path>...]
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const [label, theme, width, ...paths] = process.argv.slice(2);
const BASE = process.env.BASE || 'http://127.0.0.1:4391';
const EXE = (process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const ctx = await browser.newContext({ viewport: { width: Number(width), height: 900 } });
  await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
  const page = await ctx.newPage();
  for (const p of paths) {
    await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 120000 });
    await page.waitForTimeout(500);
    const slug = p.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home';
    await page.screenshot({ path: path.join(__dirname, 'shots', `${label}-${slug}-${width}-${theme}.png`), fullPage: true });
    const ox = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(slug, 'overflowX', ox);
  }
  await browser.close();
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
