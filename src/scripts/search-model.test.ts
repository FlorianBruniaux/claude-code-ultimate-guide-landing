import assert from 'node:assert/strict'
import test from 'node:test'

import { buildSearchView, classifyUrl, cycleFilters, groupHits, highlightParts, score, suggestQueries } from './search-model.ts'
import type { SearchEntry, SearchPayload, SearchRoute } from './search-model.ts'
import { SEARCH_PAYLOAD } from '../data/search-index.ts'
import { getSectionLinks, navigationSections } from '../data/header-navigation.ts'

const GH = 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md'

const ROUTES: SearchRoute[] = [
  { href: '/guide/ultimate-guide/01-quick-start/', group: 'start' },
  { href: '/memory-systems/', group: 'build' },
  { href: '/examples/', group: 'resources' },
  { href: '/cheatsheet/', group: 'resources' },
  { href: '/releases/', group: 'resources' },
]

const entry = (id: string, title: string, url: string, extra: Partial<SearchEntry> = {}): SearchEntry => ({
  id,
  title,
  keywords: title.toLowerCase(),
  category: 'Guide',
  url,
  source: 'guide',
  ...extra,
})

const PAYLOAD: SearchPayload = {
  entries: [
    entry('page-memory-systems', 'Memory Systems', '/memory-systems/', { source: 'landing', category: 'Build' }),
    entry('gc-a', 'Memory benchmarks', '/guide/memory-systems/#benchmarks'),
    entry('gc-b', 'Memory decay models', '/guide/memory-systems/#decay'),
    entry('gc-c', 'Memory history and compaction', '/guide/memory-systems/#history'),
    entry('gc-d', 'Memory bandwidth', '/guide/local-vs-cloud-inference/#memory-bandwidth'),
    entry('ex-1', 'Persistent memory plugin', '/examples/', { source: 'landing', category: 'Examples > Plugins' }),
    entry('ex-2', 'Memory bootstrap skill', '/examples/', { source: 'landing', category: 'Examples > Skills' }),
    entry('gh-1', 'Memory settings', `${GH}#memory`),
    entry('sec-1', 'Memory poisoning', '/security/#memory-poisoning', { source: 'landing', category: 'Security' }),
  ],
  pages: {
    '/memory-systems/': { title: 'Memory Systems', description: 'Native, cross-session and team memory.' },
    '/guide/memory-systems/': { title: 'Memory Systems guide', description: 'Complete guide to memory.' },
    '/examples/': { title: 'Examples & Templates' },
  },
  routes: ROUTES,
}

test('one page shows once, with its matching sections under it', () => {
  const hits = groupHits(PAYLOAD, 'memory')
  const guide = hits.filter((hit) => hit.key === '/guide/memory-systems/')
  assert.equal(guide.length, 1)
  assert.equal(guide[0].title, 'Memory Systems guide')
  assert.equal(guide[0].description, 'Complete guide to memory.')
  assert.equal(guide[0].sections.length, 3)
  assert.equal(guide[0].matches, 3)
})

test('a page matched only through a section opens that section', () => {
  const hit = groupHits(PAYLOAD, 'bandwidth').find((page) => page.key === '/guide/local-vs-cloud-inference/')
  assert.equal(hit?.url, '/guide/local-vs-cloud-inference/#memory-bandwidth')
})

test('templates listed on /examples/ become sections of the Examples page', () => {
  const examples = groupHits(PAYLOAD, 'memory').filter((hit) => hit.key === '/examples/')
  assert.equal(examples.length, 1)
  assert.equal(examples[0].title, 'Examples & Templates')
  assert.deepEqual(examples[0].sections.map((section) => section.title).sort(), ['Memory bootstrap skill', 'Persistent memory plugin'])
  assert.equal(examples[0].url, '/examples/')
})

test('each GitHub anchor stays its own result', () => {
  const hits = groupHits({ ...PAYLOAD, entries: [entry('gh-1', 'Memory', `${GH}#a`), entry('gh-2', 'Memory more', `${GH}#b`)] }, 'memory')
  assert.equal(hits.length, 2)
  assert.ok(hits.every((hit) => hit.group === 'github' && hit.offSite))
})

test('urls are filed by the menu: exact route first, security on its own, guide pages as chapters', () => {
  assert.equal(classifyUrl('/guide/ultimate-guide/01-quick-start/#install', ROUTES), 'start')
  assert.equal(classifyUrl('/security/threats/', ROUTES), 'security')
  assert.equal(classifyUrl('/guide/memory-systems/#x', ROUTES), 'guide')
  assert.equal(classifyUrl('/cheatsheet/#hooks', ROUTES), 'resources')
  assert.equal(classifyUrl(`${GH}#x`, ROUTES), 'github')
  assert.equal(classifyUrl('/unknown/', ROUTES), 'other')
})

test('the All view puts the best on-site matches first and GitHub last', () => {
  const view = buildSearchView(PAYLOAD, 'memory')
  assert.equal(view.groups[0].id, 'best')
  assert.ok(view.groups[0].pages.every((page) => !page.offSite))
  assert.equal(view.groups[0].pages[0].key, '/memory-systems/')
  assert.equal(view.groups.at(-1)?.id, 'github')
  const keys = view.rows.map((row) => row.key)
  assert.equal(new Set(keys).size, keys.length, 'a page is never listed twice')
})

test('a filtered view shows only that section and Tab cycles through non-empty sections', () => {
  const view = buildSearchView(PAYLOAD, 'memory', 'security')
  assert.deepEqual(view.groups.map((group) => group.id), ['security'])
  assert.deepEqual(cycleFilters(view.counts), ['all', 'build', 'security', 'resources', 'guide', 'github'])
})

test('the All view caps each section and reports what it hides', () => {
  const many: SearchPayload = {
    entries: Array.from({ length: 9 }, (_, i) => entry(`g${i}`, `Hooks part ${i}`, `/guide/chapter-${i}/#x`)),
    pages: {},
    routes: [],
  }
  const guide = buildSearchView(many, 'hooks').groups.find((group) => group.id === 'guide')
  assert.equal(guide?.pages.length, 4)
  assert.equal(guide?.hidden, 5)
  assert.equal(buildSearchView(many, 'hooks', 'guide').groups[0].pages.length, 9)
})

test('highlighting is case-insensitive and keeps the original text', () => {
  const parts = highlightParts('Memory and MEMORY systems', ['memory'])
  assert.equal(parts.map((part) => part.text).join(''), 'Memory and MEMORY systems')
  assert.deepEqual(parts.filter((part) => part.match).map((part) => part.text), ['Memory', 'MEMORY'])
})

test('the published payload groups real guide sections under their page title', () => {
  const view = buildSearchView(SEARCH_PAYLOAD, 'memory')
  const guide = view.rows.find((row) => row.key === '/guide/memory-systems/')
  assert.ok(guide, 'the Memory Systems guide page is listed')
  assert.equal(guide.title, 'Memory Systems')
  assert.ok(guide.sections.length >= 3)
  assert.ok(guide.description)
})

test('every internal menu link is a search route, and security pages file under Security', () => {
  const routes = new Map(SEARCH_PAYLOAD.routes.map((route) => [route.href, route.group]))
  for (const section of navigationSections) {
    for (const link of getSectionLinks(section)) {
      if (link.external || /^https?:/.test(link.href)) continue
      assert.ok(routes.has(link.href.split('#', 1)[0]), `${link.href} has a route`)
    }
  }
  assert.equal(routes.get('/security/'), 'security')
  assert.equal(routes.get('/releases/'), 'resources')
  assert.equal(classifyUrl('/security/#cve-database', SEARCH_PAYLOAD.routes), 'security')
  assert.equal(classifyUrl('/security/cves/', SEARCH_PAYLOAD.routes), 'security')
  assert.equal(classifyUrl('/guide/production-safety/', SEARCH_PAYLOAD.routes), 'security')
})

// UX-16: accents are folded on both sides of the comparison.
test('a query matches with or without accents', () => {
  const entry = { title: 'Règles de sécurité', keywords: 'mémoire paramètres', category: 'Guide' }
  assert.ok(score(entry, 'securite') > 0)
  assert.ok(score(entry, 'sécurité') > 0)
  assert.ok(score(entry, 'memoire') > 0)
  assert.ok(score({ title: 'Securite', keywords: '', category: '' }, 'sécurité') > 0)
})

// CX-09: a query without results proposes close words found in the index.
test('a misspelled query gets close index words as suggestions', () => {
  const entries = [
    { id: 'a', title: 'Claude Code Skills', keywords: '', category: 'Guide', url: '/a/', source: 'guide' as const },
    { id: 'b', title: 'Agent Skills and Hooks', keywords: '', category: 'Guide', url: '/b/', source: 'guide' as const },
  ]
  assert.deepEqual(suggestQueries(entries, 'skils'), ['skills'])
  assert.deepEqual(suggestQueries(entries, 'hoks skils'), ['hooks skills'])
  assert.deepEqual(suggestQueries(entries, 'xyzzyqwerty'), [])
})
