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
  const banner = readFileSync(resolve(PROJECT_ROOT, 'src/components/global/AnnouncementBanner.astro'), 'utf8')
  const searchEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-search-entries.ts'), 'utf8')
  const contentEntries = readFileSync(resolve(PROJECT_ROOT, 'src/data/guide-content-entries.ts'), 'utf8')

  assert.match(sitemapPage, /'\/guide\/subscription-strategy\/'/)
  assert.match(sitemapPage, /Subscription Strategy at Team Scale/)
  assert.match(rssEntries, /title: 'Subscription Strategy at Team Scale'/)
  assert.match(rssEntries, /https:\/\/cc\.bruniaux\.com\/guide\/subscription-strategy\//)
  assert.match(banner, /href="\/guide\/subscription-strategy\/" class="ann-link">Subscription Strategy<\/a>/)
  assert.match(searchEntries, /"id": "guide-subscription-strategy-guide"/)
  assert.match(contentEntries, /"url": "\/guide\/subscription-strategy\/#tl-dr"/)
})

test('Announcement banner keeps at most four links, rotates its id, and announces the page', () => {
  const banner = readFileSync(resolve(PROJECT_ROOT, 'src/components/global/AnnouncementBanner.astro'), 'utf8')
  const linkCount = (banner.match(/class=\"ann-link\"/g) ?? []).length

  assert.equal(linkCount, 4)
  assert.match(banner, /const BANNER_ID = 'banner-team-ai-strategy-2026-08'/)
  assert.match(banner, /href="\/guide\/loop-graph-engineering\/" class="ann-link">Loop &amp; Graph Engineering<\/a>/)
})

test('WP12 exposes the different FR and EN PDF page counts', () => {
  const whitepapers = readFileSync(resolve(PROJECT_ROOT, 'src/data/whitepapers-data.ts'), 'utf8')
  const page = readFileSync(resolve(PROJECT_ROOT, 'src/pages/whitepapers/index.astro'), 'utf8')

  assert.match(whitepapers, /num: '12',[\s\S]*?pages: 42,[\s\S]*?pagesEn: 33,/)
  assert.match(page, /wp\.pagesEn.*?EN.*?wp\.pages.*?FR/)
})
