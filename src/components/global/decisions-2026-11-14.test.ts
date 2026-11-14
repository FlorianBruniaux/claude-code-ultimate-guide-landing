import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

// Arbitrages validés le 14/11/2026 sur l'audit UX du 13/11
// (docs/ux-audit-2026-11-13/rapport-ux-2026-11-13.md, sections 4 et 5).

const read = (path: string) => readFileSync(new URL(`../../../${path}`, import.meta.url), 'utf8')

test('UX-06: "Start in 15 min" opens the Quick Start chapter', () => {
  const hero = read('src/components/landing/HeroBanner.astro')
  assert.match(hero, /<a href="\/guide\/ultimate-guide\/01-quick-start\/" class="btn btn-primary">Start in 15 min<\/a>/)
})

test('AM-05: the guide portal offers the paths before the news', async () => {
  const { renderGuideIndex } = await import('../../data/guide-navigation.mjs')
  const portal = renderGuideIndex({ guideLineCount: 1, workflowCount: 1 })
  const paths = portal.indexOf('## Choose your path')
  const news = portal.indexOf('## New and noteworthy')
  assert.ok(paths > -1 && news > paths, 'Choose your path comes first')
})

test('P-01: a first visit follows the system colour scheme on both page systems', () => {
  const layout = read('src/layouts/Layout.astro')
  const config = read('astro.config.mjs')
  for (const source of [layout, config]) {
    assert.match(source, /matchMedia\('\(prefers-color-scheme: dark\)'\)\.matches/)
  }
  assert.doesNotMatch(layout, /stored \|\| 'light'/)
  assert.doesNotMatch(config, /getItem\('theme'\)\|\|'light'/)
})

test('PA-02: the guide cheat sheet hands over to /cheatsheet/', async () => {
  const { SUPERSEDED_GUIDE_PAGES } = await import('../../data/superseded-guide-pages.mjs')
  assert.equal((SUPERSEDED_GUIDE_PAGES as Record<string, string>)['/guide/cheatsheet/'], '/cheatsheet/')
  assert.doesNotMatch(read('src/data/guide-navigation.mjs'), /href: '\/guide\/cheatsheet\/'/)
  assert.doesNotMatch(read('src/pages/learning/index.astro'), /href="\/guide\/cheatsheet\/"/)
})

test('AM-01: guide prose lines stay near 75 characters, code and tables keep the full width', () => {
  const css = read('src/styles/starlight-overrides.css')
  assert.match(css, /html:not\(\[data-has-hero\]\) \.sl-markdown-content :is\(p, li, blockquote, dd\) \{\s*max-width: 65ch;/)
})

test('AM-04: a chapter GitHub link opens the section being read, GitHub links open a new tab', () => {
  const fab = read('src/components/global/GuidePageFab.astro')
  assert.match(fab, /function currentSectionId\(\)/)
  assert.match(fab, /ultimate-guide\.md#\$\{/)
  const guideHeader = read('src/components/starlight/Header.astro')
  assert.match(guideHeader, /a\[href\^="https:\/\/github\.com\/"\]:not\(\[target\]\)/)
})
