import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const ROOT = resolve(import.meta.dirname, '../..')
const navigationPath = resolve(ROOT, 'src/data/guide-navigation.mjs')

test('uses one curated navigation model for the guide hub and HTML sitemap', () => {
  assert.ok(existsSync(navigationPath), 'src/data/guide-navigation.mjs must exist')
  if (!existsSync(navigationPath)) return

  const prepare = readFileSync(resolve(ROOT, 'scripts/prepare-guide-content.mjs'), 'utf8')
  const sitemap = readFileSync(resolve(ROOT, 'src/pages/sitemap/index.astro'), 'utf8')

  assert.match(prepare, /guide-navigation\.mjs/)
  assert.match(sitemap, /guide-navigation\.mjs/)
})

test('surfaces the current agent engineering and team operations references', async () => {
  assert.ok(existsSync(navigationPath), 'src/data/guide-navigation.mjs must exist')
  if (!existsSync(navigationPath)) return

  const { guideHighlights, guideSections } = await import('./guide-navigation.mjs')
  const links = [...guideHighlights, ...guideSections.flatMap((section: { links: unknown[] }) => section.links)] as Array<{ href: string }>
  const hrefs = new Set(links.map((link) => link.href))

  for (const href of [
    '/guide/agent-harness/',
    '/guide/agent-harness-landscape/',
    '/guide/loop-graph-engineering/',
    '/guide/agentic-tools/',
    '/guide/workflows/agentic-software-factories/',
    '/guide/workflows/monitor-event-delegation/',
    '/guide/subscription-strategy/',
    '/guide/workflows/team-ai-instructions/',
    '/guide/ai-unit-economics/',
    '/guide/api-gateway/',
    '/guide/practitioner-insights/',
  ]) {
    assert.ok(hrefs.has(href), `missing curated guide link: ${href}`)
  }
})

test('keeps curated guide URLs unique', async () => {
  assert.ok(existsSync(navigationPath), 'src/data/guide-navigation.mjs must exist')
  if (!existsSync(navigationPath)) return

  const { guideSections } = await import('./guide-navigation.mjs')
  const hrefs = guideSections.flatMap((section: { links: Array<{ href: string }> }) => section.links.map((link) => link.href))
  assert.equal(new Set(hrefs).size, hrefs.length)
})

test('renders the guide hub as a highlighted portal instead of a stale hard-coded table', () => {
  const prepare = readFileSync(resolve(ROOT, 'scripts/prepare-guide-content.mjs'), 'utf8')

  assert.match(prepare, /New and noteworthy/)
  assert.match(prepare, /Choose your path/)
  assert.match(prepare, /writeFileSync\(resolve\(OUT_GUIDE, 'index\.mdx'/)
  assert.doesNotMatch(prepare, /22K\+ lines/)
  assert.doesNotMatch(prepare, /19 total workflow guides/)
})
