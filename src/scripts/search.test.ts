import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { initSearch, searchEntries } from './search.ts'
import type { SearchEntry } from './search.ts'

const ENTRIES: SearchEntry[] = [
  { id: 'releases', title: 'Claude Code Releases', keywords: 'latest version changelog', category: 'Pages', url: '/releases/', source: 'landing' },
]

function fixture() {
  const window = new Window({ url: 'https://cc.bruniaux.com/' })
  window.document.body.innerHTML = `
    <button id="search-trigger" type="button">Search</button>
    <div id="search-modal" hidden aria-hidden="true">
      <div id="search-backdrop"></div>
      <input id="search-input" type="search" />
      <ul id="search-results"></ul>
    </div>`
  return { window, document: window.document as unknown as Document }
}

function countingLoader() {
  const calls = { count: 0 }
  const load = async () => {
    calls.count++
    return ENTRIES
  }
  return { calls, load }
}

const tick = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

test('the search index is not fetched before the visitor shows intent to search', async () => {
  const { document } = fixture()
  const { calls, load } = countingLoader()
  initSearch(load, document)
  await tick()
  assert.equal(calls.count, 0)
})

test('opening the modal fetches the index once and the first query returns results', async () => {
  const { document } = fixture()
  const { calls, load } = countingLoader()
  initSearch(load, document)

  document.getElementById('search-trigger')?.click()
  const input = document.getElementById('search-input') as HTMLInputElement
  input.value = 'releases'
  input.dispatchEvent(new document.defaultView!.Event('input'))
  await tick(80)

  assert.equal(calls.count, 1)
  assert.match(document.getElementById('search-results')?.textContent ?? '', /Claude Code Releases/)

  input.dispatchEvent(new document.defaultView!.KeyboardEvent('keydown', { key: 'Escape' }))
  document.getElementById('search-trigger')?.click()
  await tick()
  assert.equal(calls.count, 1)
})

test('the keyboard shortcut opens the modal and fetches the index', async () => {
  const { document } = fixture()
  const { calls, load } = countingLoader()
  initSearch(load, document)

  document.dispatchEvent(new document.defaultView!.KeyboardEvent('keydown', { key: 'k', metaKey: true }))
  await tick()

  assert.equal(document.getElementById('search-modal')?.hasAttribute('hidden'), false)
  assert.equal(calls.count, 1)
})

test('hovering or focusing the trigger prefetches the index', async () => {
  const { document } = fixture()
  const { calls, load } = countingLoader()
  initSearch(load, document)

  const trigger = document.getElementById('search-trigger')!
  trigger.dispatchEvent(new document.defaultView!.Event('pointerenter'))
  trigger.dispatchEvent(new document.defaultView!.Event('focus'))
  await tick()

  assert.equal(calls.count, 1)
})

test('a failed fetch is retried on the next open', async () => {
  const { document } = fixture()
  let attempts = 0
  initSearch(async () => {
    attempts++
    if (attempts === 1) throw new Error('offline')
    return ENTRIES
  }, document)

  const trigger = document.getElementById('search-trigger')!
  trigger.click()
  await tick()
  document.getElementById('search-input')!.dispatchEvent(new document.defaultView!.KeyboardEvent('keydown', { key: 'Escape' }))
  trigger.click()
  await tick()

  assert.equal(attempts, 2)
})

test('a query typed before the index arrives runs once the index loads', async () => {
  const { document } = fixture()
  let release: (entries: SearchEntry[]) => void = () => {}
  initSearch(() => new Promise<SearchEntry[]>((resolve) => { release = resolve }), document)

  document.getElementById('search-trigger')?.click()
  const input = document.getElementById('search-input') as HTMLInputElement
  input.value = 'releases'
  input.dispatchEvent(new document.defaultView!.Event('input'))
  await tick(80)
  assert.doesNotMatch(document.getElementById('search-results')?.textContent ?? '', /Claude Code Releases/)

  release(ENTRIES)
  await tick()
  assert.match(document.getElementById('search-results')?.textContent ?? '', /Claude Code Releases/)
})

test('a failed load tells the visitor and is not retried on every keystroke', async () => {
  const { document } = fixture()
  let attempts = 0
  initSearch(async () => {
    attempts++
    throw new Error('offline')
  }, document)

  document.getElementById('search-trigger')?.click()
  const input = document.getElementById('search-input') as HTMLInputElement
  for (const value of ['r', 're', 'rel']) {
    input.value = value
    input.dispatchEvent(new document.defaultView!.Event('input'))
    await tick(80)
  }

  assert.equal(attempts, 1)
  assert.match(document.getElementById('search-results')?.textContent ?? '', /Search is unavailable/)
})

const MEMORY_ENTRIES: SearchEntry[] = [
  { id: 'guide-memory-settings', title: 'Memory & Settings (2 levels)', keywords: 'memory settings', category: 'Core Guides', url: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#3-memory--settings', source: 'guide' },
  { id: 'gc-memory-history', title: 'Memory History Compaction', keywords: 'memory history', category: 'Guide', url: '/guide/memory-systems/#keep-history-distinct-from-compaction', source: 'guide' },
  { id: 'glossary-memory-hierarchy', title: 'Memory hierarchy', keywords: 'memory claude.md', category: 'Glossary', url: '/glossary/#memory-hierarchy', source: 'landing' },
  { id: 'page-memory-systems', title: 'Memory Systems: native, cross-session and team memory', keywords: 'memory claude-mem agentmemory', category: 'Build', url: '/memory-systems/', source: 'landing' },
  { id: 'page-releases', title: 'Claude Code Releases', keywords: 'latest version changelog', category: 'Pages', url: '/releases/', source: 'landing' },
]

test('dedicated landing pages rank above glossary entries, local guide pages and GitHub files', () => {
  const ids = searchEntries(MEMORY_ENTRIES, 'memory').map((entry) => entry.id)
  assert.deepEqual(ids, ['page-memory-systems', 'glossary-memory-hierarchy', 'gc-memory-history', 'guide-memory-settings'])
})

test('a dedicated page whose title starts with the query outranks a cheat sheet entry with that exact title', () => {
  const entries: SearchEntry[] = [
    { id: 'cs-memory', title: 'Memory System', keywords: 'memory system auto-memory', category: 'Cheat Sheet', url: '/cheatsheet/#memory', source: 'landing' },
    MEMORY_ENTRIES[3],
  ]
  const ids = searchEntries(entries, 'memory system').map((entry) => entry.id)
  assert.deepEqual(ids, ['page-memory-systems', 'cs-memory'])
})

test('a ranking bonus never turns a non-matching entry into a result', () => {
  const ids = searchEntries(MEMORY_ENTRIES, 'memory').map((entry) => entry.id)
  assert.ok(!ids.includes('page-releases'))
})

test('only off-site results carry the external-link icon', async () => {
  const { document } = fixture()
  initSearch(async () => MEMORY_ENTRIES, document)
  document.getElementById('search-trigger')?.click()
  const input = document.getElementById('search-input') as HTMLInputElement
  input.value = 'memory'
  input.dispatchEvent(new document.defaultView!.Event('input'))
  await tick(80)

  const items = [...document.querySelectorAll<HTMLElement>('.search-result-item')]
  const withIcon = items.filter((item) => item.querySelector('.search-external-icon')).map((item) => item.dataset.url)
  assert.deepEqual(withIcon, [MEMORY_ENTRIES[0].url])
})
