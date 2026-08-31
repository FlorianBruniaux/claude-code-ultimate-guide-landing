import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../pages/sitemap/index.astro', import.meta.url), 'utf8')
const sitemapConfig = readFileSync(new URL('../../astro.config.mjs', import.meta.url), 'utf8')

test('surfaces the agent harness reference pages in the HTML sitemap', () => {
  assert.match(source, /guideSections/)
  assert.match(source, /Agent Engineering/)
})

test('describes the HTML sitemap as curated and links to the complete XML sitemap', () => {
  assert.doesNotMatch(source, />All pages on/)
  assert.match(source, /href="\/sitemap-index\.xml"/)
  assert.match(source, /complete XML sitemap/i)
})

test('links the guide changelog separately from Claude Code releases', () => {
  assert.match(source, /href: '\/changelog\/'/)
  assert.match(source, /Guide Changelog/)
  assert.match(source, /href: '\/releases\/'/)
  assert.match(source, /Claude Code Releases/)
})

test('exposes the homepage resource hubs in the HTML sitemap', () => {
  assert.match(source, /href: '\/resources\/'/)
  assert.match(source, /href: '\/downloads\/'/)
  assert.match(source, /href: '\/projects\/'/)
})

test('keeps stable lastmod dates for the homepage resource hubs', () => {
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/resources\/': '2026-08-31'/)
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/downloads\/': '2026-08-31'/)
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/projects\/': '2026-08-31'/)
})
