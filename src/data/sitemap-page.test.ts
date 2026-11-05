import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../pages/sitemap/index.astro', import.meta.url), 'utf8')
const sitemapConfig = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8')
const intentNavigation = JSON.parse(
  readFileSync(new URL('./intent-navigation.json', import.meta.url), 'utf8'),
) as { groups: Array<{ id: string }> }
const intentSource = JSON.stringify(intentNavigation)

test('the All pages map follows the menu sections, in menu order, with section anchors', async () => {
  const { navigationSections } = await import('./header-navigation.ts')
  const { getMenuSitemapSections } = await import('./sitemap-sections.ts')
  assert.deepEqual(
    getMenuSitemapSections().map((section) => section.id),
    navigationSections.map((section) => section.id),
  )
  assert.match(source, /id=\{section\.id\}/)
})

test('each map section counts the same pages as its "All N pages" menu link', async () => {
  const { navigationSections, getSectionPageCount } = await import('./header-navigation.ts')
  const { getMenuSitemapSections } = await import('./sitemap-sections.ts')
  const sections = getMenuSitemapSections()
  navigationSections.forEach((menuSection, index) => {
    const section = sections[index]
    const count = section.essentials.length + section.links.length + (section.overview ? 1 : 0)
    assert.equal(count, getSectionPageCount(menuSection), menuSection.id)
  })
})

test('menu panels and the search map link to their section on the All pages map', async () => {
  const { sitemapSectionHref } = await import('./sitemap-sections.ts')
  const header = readFileSync(new URL('../components/global/Header.astro', import.meta.url), 'utf8')
  const search = readFileSync(new URL('../components/global/SearchModal.astro', import.meta.url), 'utf8')
  assert.equal(sitemapSectionHref('security'), '/sitemap/#security')
  assert.match(header, /class="intent-panel-all" href=\{sitemapSectionHref\(section\.id\)\}/)
  assert.match(search, /section\.overview\?\.href \?\? sitemapSectionHref\(id\)/)
})

test('the map keeps every page the previous sitemap listed', async () => {
  const { getGuideSitemapSections, getMenuSitemapSections, guidePortalLink } = await import('./sitemap-sections.ts')
  const listed = new Set([guidePortalLink.href])
  for (const section of [...getMenuSitemapSections(), ...getGuideSitemapSections()]) {
    if (section.overview) listed.add(section.overview.href)
    for (const link of [...section.essentials, ...section.links]) listed.add(link.href)
  }
  const previous = [
    ...intentNavigation.groups.flatMap((group) => (group as unknown as { items: Array<{ site_path: string }> }).items.map((item) => item.site_path)),
    '/security/', '/security/threats/', '/security/cves/', '/security/sandbox/', '/security/hardening/',
    '/finops/', '/token-savings/', '/lean-ai/',
    '/guide/agent-harness/', '/guide/loop-graph-engineering/', '/guide/subscription-strategy/',
  ]
  for (const href of previous) assert.ok(listed.has(href), href)
})

test('section anchors on the map are unique', async () => {
  const { getGuideSitemapSections, getMenuSitemapSections } = await import('./sitemap-sections.ts')
  const ids = [
    ...getMenuSitemapSections(), ...getGuideSitemapSections(),
  ].map((section) => section.id).concat(['guide-chapters', 'cheat-sheets', 'cheat-sheets-technical', 'cheat-sheets-methodology', 'cheat-sheets-design'])
  assert.equal(new Set(ids).size, ids.length)
})

test('describes the page as All pages and links to the complete XML sitemap', () => {
  assert.match(source, /<h1>All pages<\/h1>/)
  assert.match(source, /href="\/sitemap-index\.xml"/)
  assert.match(source, /complete XML sitemap/i)
})

test('links the guide changelog separately from Claude Code releases', () => {
  assert.match(intentSource, /"site_path":"\/changelog\/"/)
  assert.match(intentSource, /Guide Changelog/)
  assert.match(intentSource, /"site_path":"\/releases\/"/)
  assert.match(intentSource, /Claude Code Releases/)
})

test('exposes the homepage resource hubs in the HTML sitemap', () => {
  assert.match(intentSource, /"site_path":"\/resources\/"/)
  assert.match(intentSource, /"site_path":"\/downloads\/"/)
  assert.match(intentSource, /"site_path":"\/projects\/"/)
})

test('keeps stable lastmod dates for the homepage resource hubs', () => {
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/resources\/': '2026-08-31'/)
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/downloads\/': publicationEdition\.updatedAt/)
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/projects\/': '2026-08-31'/)
})

test('keeps a stable lastmod date for the Context configurator', () => {
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/context\/': '2026-08-31'/)
})

test('Security routes have stable lastmod dates', () => {
  for (const path of ['', 'threats/', 'cves/', 'sandbox/', 'hardening/']) {
    const href = `https://cc.bruniaux.com/security/${path}`.replaceAll('/', '\\/')
    assert.match(sitemapConfig, new RegExp(`'${href}': '2026-08-31'`))
  }
})

test('no All pages link points to a redirect source', async () => {
  const { getMenuSitemapSections, getGuideSitemapSections } = await import('./sitemap-sections.ts')
  const { legacyGuideRedirects } = await import('./legacy-guide-redirects.mjs')
  const { SUPERSEDED_GUIDE_PAGES } = await import('./superseded-guide-pages.mjs')
  const start = sitemapConfig.indexOf('  redirects:')
  const block = sitemapConfig.slice(start, sitemapConfig.indexOf('\n  }', start))
  const redirectSources = new Set([
    ...Object.keys(legacyGuideRedirects),
    ...Object.keys(SUPERSEDED_GUIDE_PAGES),
    ...[...block.matchAll(/'(\/[^']*)':\s*'/g)].map((match) => match[1]),
  ])
  assert.ok(redirectSources.has('/guide/team-knowledge-infrastructure/'), 'redirect block parsed')
  const hrefs = [...getMenuSitemapSections(), ...getGuideSitemapSections()]
    .flatMap((section) => [section.overview, ...section.essentials, ...section.links])
    .filter((link) => link !== undefined)
    .map((link) => link.href.split('#')[0])
  assert.deepEqual(hrefs.filter((href) => redirectSources.has(href)), [])
})
