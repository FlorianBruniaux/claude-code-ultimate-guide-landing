import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

// Positioning decided on 13/11/2026 (docs/seo-positioning-2026-11-13/critique-hero-mots-cles.md):
// Claude Code stays first, and the hero links the agent-engineering topics that already rank.

const hero = readFileSync(new URL('./HeroBanner.astro', import.meta.url), 'utf8')
const home = readFileSync(new URL('../../pages/index.astro', import.meta.url), 'utf8')

const BEYOND_LINKS = [
  ['Context engineering', '/context-engineering/'],
  ['Agent harness engineering', '/guide/agent-harness/'],
  ['Loop & graph engineering', '/guide/loop-graph-engineering/'],
  ['Agent evaluation', '/guide/agent-evaluation/'],
  ['Memory systems', '/memory-systems/'],
] as const

test('Claude Code stays first in the H1 and the page title', () => {
  assert.match(hero, /<h1 id="hero-title">Claude Code Ultimate Guide<\/h1>/)
  const title = home.match(/const title = '([^']+)'/)?.[1] ?? ''
  assert.ok(title.startsWith('Claude Code Ultimate Guide'), title)
  assert.ok(title.length <= 60, `${title.length} characters`)
})

test('the meta description leads with Claude Code and fits the snippet', () => {
  const description = home.match(/const description = `([^`]+)`/)?.[1] ?? ''
  assert.ok(description.startsWith('Claude Code'), description)
  assert.ok(description.length <= 160, `${description.length} characters`)
  assert.match(description, /context engineering/i)
  assert.match(description, /harness/i)
})

test('the hero links the agent-engineering topics after its buttons', () => {
  const actionsAt = hero.indexOf('class="hero-actions"')
  const beyondAt = hero.indexOf('class="hero-beyond"')
  assert.ok(actionsAt > -1 && beyondAt > actionsAt, 'the topic links come after the buttons in the tab order')
  assert.match(hero, /<nav class="hero-beyond" aria-label="Beyond Claude Code">/)
  const links = [...hero.slice(beyondAt).matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].map((m) => [m[2].replace('&amp;', '&'), m[1]])
  assert.deepEqual(links, BEYOND_LINKS.map(([label, href]) => [label, href]))
})

test('every topic link points to an existing page', () => {
  const pageFiles: Record<string, string> = {
    '/context-engineering/': '../../pages/context-engineering/index.astro',
    '/memory-systems/': '../../pages/memory-systems/index.astro',
  }
  for (const [, href] of BEYOND_LINKS) {
    const file = pageFiles[href]
    if (file) assert.ok(existsSync(new URL(file, import.meta.url)), href)
  }
  const guideDir = new URL('../../content/docs/guide/', import.meta.url)
  if (!existsSync(guideDir)) return // generated guide content absent
  for (const slug of ['agent-harness', 'loop-graph-engineering', 'agent-evaluation']) {
    assert.ok(existsSync(new URL(`${slug}.md`, guideDir)), slug)
  }
})
