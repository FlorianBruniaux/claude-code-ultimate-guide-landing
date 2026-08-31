import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../pages/sitemap/index.astro', import.meta.url), 'utf8')
const sitemapConfig = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8')
const intentNavigation = JSON.parse(readFileSync(new URL('./intent-navigation.json', import.meta.url), 'utf8'))
const intentSource = JSON.stringify(intentNavigation)

test('surfaces the agent harness reference pages in the HTML sitemap', () => {
  assert.match(source, /guideSections/)
  assert.match(source, /Agent Engineering/)
})

test('describes the HTML sitemap as curated and links to the complete XML sitemap', () => {
  assert.doesNotMatch(source, />All pages on/)
  assert.match(source, /href="\/sitemap-index\.xml"/)
  assert.match(source, /complete XML sitemap/i)
})

test('renders the shared intent navigation before landing-only and guide sections', () => {
  assert.match(source, /intent-navigation\.json/)
  assert.match(source, /const sections = \[\.\.\.intentSections, \.\.\.landingOnlySections, \.\.\.curatedGuideSections/)
  assert.deepEqual(intentNavigation.groups.map(group => group.id), ['start', 'build', 'scale', 'resources', 'updates'])
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
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/downloads\/': '2026-08-31'/)
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/projects\/': '2026-08-31'/)
})

test('keeps a stable lastmod date for the Context configurator', () => {
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/context\/': '2026-08-31'/)
})

test('HTML sitemap exposes the complete Security route family', () => {
  for (const href of ['/security/', '/security/threats/', '/security/cves/', '/security/sandbox/', '/security/hardening/']) {
    assert.match(source, new RegExp(`href: '${href}'`))
  }
})

test('Security routes have stable lastmod dates', () => {
  for (const path of ['', 'threats/', 'cves/', 'sandbox/', 'hardening/']) {
    const href = `https://cc.bruniaux.com/security/${path}`.replaceAll('/', '\\/')
    assert.match(sitemapConfig, new RegExp(`'${href}': '2026-08-31'`))
  }
})
