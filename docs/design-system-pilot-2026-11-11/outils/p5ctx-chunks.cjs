// node chunks.cjs <label> <theme> <width> <path> <chunkH> <scale>
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const [label, theme, width, p, chunkH, scale] = process.argv.slice(2);
const OUT = '/private/tmp/claude-501/-Users-florianbruniaux-Sites-perso-claude-code-ultimate-guide-landing/ae2a09ea-7519-4aaf-b2dd-1d28c0e08028/scratchpad/p5ctx';
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: (process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') });
  const ctx = await b.newContext({ viewport: { width: Number(width), height: 900 }, deviceScaleFactor: Number(scale) });
  await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4391' + p, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(400);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const slug = p.replace(/\W+/g, '-').replace(/^-|-$/g, '');
  let i = 0;
  for (let y = 0; y < H; y += Number(chunkH)) {
    await page.screenshot({ path: path.join(OUT, `${label}-${slug}-${theme}-${width}-${i}.png`), fullPage: true, clip: { x: 0, y, width: Number(width), height: Math.min(Number(chunkH), H - y) } });
    i++;
  }
  console.log(slug, 'height', H, 'chunks', i);
  await b.close();
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
