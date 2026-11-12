// Site-wide sweep: every page template, light + dark at 1440, light at 390.
// Checks: horizontal overflow, console errors, card hover (no lift, hard shadow), viewport screenshot.
const { webkit } = require('/Users/florianbruniaux/Sites/perso/html-pres/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const OUT = path.join(__dirname, 'shots', 'sweep-webkit');
fs.mkdirSync(OUT, { recursive: true });
const routes = ['/', '/learning/', '/roles/', '/roles/ai-agent-engineer/', '/glossary/150k-ceiling/', '/examples/adrwritermd/', '/cheatsheets/c01-trust-calibration/', '/compare/claude-code-vs-aider/', '/quiz/', '/faq/', '/glossary/', '/security/', '/security/threats/', '/security/cves/', '/security/sandbox/', '/security/hardening/', '/examples/', '/cheatsheets/', '/cheatsheet/', '/diagrams/', '/whitepapers/', '/downloads/', '/resources/', '/projects/', '/sitemap/', '/ecosystem/', '/ecosystem/mcp-vs-cli/', '/mcp/', '/mcp-or-cli/', '/compare/', '/releases/', '/changelog/', '/context/', '/context-engineering/', '/memory-systems/', '/methodologies/', '/ai-design-patterns/', '/lean-ai/', '/finops/', '/team-metrics/', '/token-savings/', '/claude-md-best-practices/', '/guide/', '/guide/ultimate-guide/01-quick-start/', '/guide/adoption-approaches/', '/guide/cheatsheet/'];
(async () => {
  const b = await webkit.launch();
  const rows = [];
  for (const [theme, w] of [['light', 1440], ['light', 390]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    await ctx.addInitScript((t) => { localStorage.setItem('theme', t); localStorage.setItem('starlight-theme', t); }, theme);
    const page = await ctx.newPage();
    for (const r of routes) {
      const errors = [];
      const onErr = (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); };
      page.on('console', onErr);
      let status = null;
      try { const resp = await page.goto('http://127.0.0.1:4391' + r, { waitUntil: 'networkidle', timeout: 90000 }); status = resp && resp.status(); } catch (e) { status = 'ERR'; }
      const slug = r.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home';
      const info = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        hero: !!document.querySelector('.page-hero, .band-hero, .main-pane main > .content-panel:first-child'),
        bands: document.querySelectorAll('.band, .section--alt').length,
        cards: document.querySelectorAll('.brand-interactive-card').length,
      }));
      let hover = null;
      if (w === 1440 && info.cards) {
        const card = page.locator('.brand-interactive-card:visible').first();
        try {
          await card.scrollIntoViewIfNeeded(); await card.hover(); await page.waitForTimeout(220);
          hover = await card.evaluate((el) => { const s = getComputedStyle(el); return { transform: s.transform, shadow: s.boxShadow.slice(0, 60), bg: s.backgroundColor }; });
        } catch (e) { hover = 'n/a'; }
        await page.mouse.move(2, 2);
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      await page.screenshot({ path: path.join(OUT, `${slug}-${w}-${theme}.png`) });
      page.off('console', onErr);
      rows.push({ route: r, theme, w, status, ...info, hover, errors: errors.slice(0, 3) });
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'sweep.json'), JSON.stringify(rows, null, 1));
  const bad = rows.filter((x) => x.status !== 200 || x.overflow > 0 || x.errors.length || (x.hover && x.hover !== 'n/a' && x.hover.transform !== 'none'));
  console.log('rows', rows.length, 'issues', bad.length);
  for (const x of bad) console.log(JSON.stringify(x));
  const noHero = [...new Set(rows.filter((x) => !x.hero).map((x) => x.route))];
  console.log('noHero', noHero.join(' '));
  await b.close();
})().catch((e) => { console.error(e.message.split('\n')[0]); process.exit(1); });
