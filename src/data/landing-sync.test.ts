import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const PROJECT_ROOT = resolve(import.meta.dirname, '../..')

test('Astro sitemap integration stays enabled for XML sitemap generation', () => {
  const astroConfig = readFileSync(resolve(PROJECT_ROOT, 'astro.config.mjs'), 'utf8')

  assert.match(astroConfig, /import sitemap from '@astrojs\/sitemap'/)
  assert.match(astroConfig, /sitemap\({/)
})

test('compact footer sends Guide to the guide landing page', () => {
  const footer = readFileSync(resolve(PROJECT_ROOT, 'src/components/global/Footer.astro'), 'utf8')

  assert.match(footer, /<a href="\/guide\/">Guide<\/a>/)
})

test('Translation status is exposed in navigation, sidebar, and sitemap data', () => {
  const navigation = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-navigation.mjs'), 'utf8')
  const astroConfig = readFileSync(resolve(PROJECT_ROOT, 'astro.config.mjs'), 'utf8')
  const footer = readFileSync(resolve(PROJECT_ROOT, 'src/components/global/Footer.astro'), 'utf8')
  const searchEntries = readFileSync(
    resolve(PROJECT_ROOT, 'src/data/guide-search-entries.ts'),
    'utf8',
  )

  assert.match(navigation, /title: 'Translations'/)
  assert.match(navigation, /href: '\/guide\/translations\/'/)
  assert.match(navigation, /English, French, Chinese, Ukrainian, and Latin American Spanish/)
  assert.match(astroConfig, /slug: 'guide\/translations'/)
  assert.match(footer, /href: '\/guide\/translations\/'/)
  assert.match(
    searchEntries,
    /"id": "guide-translations-status"[\s\S]*?"url": "\/guide\/translations\/"/,
  )
})

test('Community translations are not declared as equivalent hreflang alternates', () => {
  const mainHead = readFileSync(resolve(PROJECT_ROOT, 'src/layouts/Layout.astro'), 'utf8')
  const starlightHead = readFileSync(
    resolve(PROJECT_ROOT, 'src/components/starlight/Head.astro'),
    'utf8',
  )

  assert.doesNotMatch(mainHead, /hreflang/i)
  assert.doesNotMatch(starlightHead, /hreflang/i)
})

test('HTML sitemap exposes Loop & Graph Engineering', () => {
  const sitemapPage = readFileSync(resolve(PROJECT_ROOT, 'src/pages/sitemap/index.astro'), 'utf8')

  assert.match(sitemapPage, /'\/guide\/loop-graph-engineering\/'/)
  assert.match(sitemapPage, /Loop & Graph Engineering/)
})

test('RSS feed includes the loop and graph engineering page', () => {
  const rssEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/rss-entries.ts'), 'utf8')

  assert.match(rssEntries, /title: 'Loop & Graph Engineering'/)
  assert.match(rssEntries, /https:\/\/cc\.bruniaux\.com\/guide\/loop-graph-engineering\//)
})

test('Subscription Strategy stays exposed across landing discovery surfaces', () => {
  const sitemapPage = readFileSync(resolve(PROJECT_ROOT, 'src/pages/sitemap/index.astro'), 'utf8')
  const rssEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/rss-entries.ts'), 'utf8')
  const searchEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-search-entries.ts'), 'utf8')
  const contentEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-content-entries.ts'), 'utf8')

  assert.match(sitemapPage, /'\/guide\/subscription-strategy\/'/)
  assert.match(sitemapPage, /Subscription Strategy at Team Scale/)
  assert.match(rssEntries, /title: 'Subscription Strategy at Team Scale'/)
  assert.match(rssEntries, /https:\/\/cc\.bruniaux\.com\/guide\/subscription-strategy\//)
  assert.match(searchEntries, /"id": "guide-subscription-strategy-guide"/)
  assert.match(contentEntries, /"url": "\/guide\/subscription-strategy\/#tl-dr"/)
})

test('AI coding cost controls stay exposed across landing discovery surfaces', () => {
  const navigation = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-navigation.mjs'), 'utf8')
  const rssEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/rss-entries.ts'), 'utf8')
  const searchEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-search-entries.ts'), 'utf8')
  const contentEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-content-entries.ts'), 'utf8')

  assert.match(navigation, /AI Unit Economics[\s\S]*?three-level routing[\s\S]*?progressive spend controls/)
  assert.match(navigation, /API Gateway[\s\S]*?progressive spend policy[\s\S]*?terminal budgets/)
  assert.match(rssEntries, /title: 'AI Coding Cost Controls at Scale'/)
  assert.match(rssEntries, /https:\/\/cc\.bruniaux\.com\/guide\/ai-unit-economics\//)
  assert.match(
    searchEntries,
    /"id": "guide-ai-unit-economics-routing-levels"[\s\S]*?"url": "\/guide\/ai-unit-economics\/#route-by-complexity"/,
  )
  assert.match(
    searchEntries,
    /"id": "guide-api-gateway-progressive-spend-policy"[\s\S]*?"url": "\/guide\/api-gateway\/#31-progressive-spend-policy-for-interactive-users"/,
  )
  assert.match(contentEntries, /"url": "\/guide\/ai-unit-economics\/#3-the-real-cost-reduction-levers"/)
})

test('Announcement banner keeps at most four links, rotates its id, and announces the page', () => {
  const banner = readFileSync(resolve(PROJECT_ROOT, 'src/components/global/AnnouncementBanner.astro'), 'utf8')
  const linkCount = (banner.match(/class=\"ann-link\"/g) ?? []).length

  assert.equal(linkCount, 4)
  assert.match(banner, /const BANNER_ID = 'banner-skill-governance-2026-09'/)
  assert.match(banner, /href="\/guide\/ultimate-guide\/05-skills\/" class="ann-link">Skill Governance<\/a>/)
  assert.match(banner, /href="\/context-engineering\/#skill-lifecycle" class="ann-link">Skill Lifecycle<\/a>/)
  assert.match(banner, /href="\/changelog\/" class="ann-link">Changelog &rarr;<\/a>/)
})

test('Translation status stays exposed across landing discovery surfaces', () => {
  const navigation = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-navigation.mjs'), 'utf8')
  const rssEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/rss-entries.ts'), 'utf8')
  const searchEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-search-entries.ts'), 'utf8')

  assert.match(navigation, /href: '\/guide\/translations\/'/)
  assert.match(rssEntries, /title: 'Translations and Language Status'/)
  assert.match(rssEntries, /https:\/\/cc\.bruniaux\.com\/guide\/translations\//)
  assert.match(searchEntries, /"id": "guide-translation-status-guide"/)
})

test('WP12 exposes the different FR and EN PDF page counts', () => {
  const whitepapers = readFileSync(resolve(PROJECT_ROOT, 'src/data/whitepapers-data.ts'), 'utf8')
  const page = readFileSync(resolve(PROJECT_ROOT, 'src/pages/whitepapers/index.astro'), 'utf8')

  assert.match(whitepapers, /num: '12',[\s\S]*?pages: 42,[\s\S]*?pagesEn: 33,/)
  assert.match(page, /wp\.pagesEn.*?EN.*?wp\.pages.*?FR/)
})
