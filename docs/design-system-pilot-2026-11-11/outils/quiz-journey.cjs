// Usage: node quiz-journey.cjs <label> <theme> <width>
const { chromium } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const [label, theme, width] = process.argv.slice(2);
const BASE = process.env.BASE || 'http://127.0.0.1:4391';
const EXE = (process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
(async () => {
  const b = await chromium.launch({ executablePath: EXE });
  const ctx = await b.newContext({ viewport: { width: Number(width), height: 900 } });
  await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push('pageerror ' + e.message));
  const shot = async (n, full) => page.screenshot({ path: path.join(__dirname, 'shots', `${label}-${n}-${width}-${theme}.png`), fullPage: !!full });
  const ox = async (n) => console.log(n, 'overflowX', await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));
  await page.goto(BASE + '/quiz/', { waitUntil: 'networkidle' });
  await page.waitForSelector('.category-item');
  await shot('1-setup', true); await ox('setup');
  await page.click('#deselect-all-btn');
  await page.locator('.category-item input').last().check();
  await page.locator('.role-btn').nth(2).click();
  await page.click('.difficulty-btn[data-difficulty="junior"]');
  console.log('count:', await page.textContent('#selected-count'));
  await page.screenshot({ path: path.join(__dirname, 'shots', `${label}-1b-setup-filtered-${width}-${theme}.png`) });
  await page.locator('.role-btn').first().click();
  await page.click('.difficulty-btn[data-difficulty="all"]');
  console.log('count after reset:', await page.textContent('#selected-count'));
  await page.click('#start-btn');
  await page.waitForSelector('.option-btn');
  await shot('2-question'); await ox('question');
  await page.click('.option-btn');
  await page.waitForTimeout(300);
  await shot('3-answer', true); await ox('answer');
  await page.click('#next-btn');
  await page.click('.option-btn:nth-child(2)');
  await page.waitForTimeout(300);
  await shot('4-answer2', true);
  for (let i = 0; i < 40; i++) {
    if (await page.evaluate(() => document.getElementById('quiz-results').classList.contains('active'))) break;
    if (await page.evaluate(() => !!document.querySelector('.option-btn:not(.disabled)'))) await page.locator('.option-btn:not(.disabled)').nth(i % 3).click();
    await page.click('#next-btn');
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(300);
  await shot('5-results', true); await ox('results');
  console.log('console errors:', JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
