import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

import {
  ANTI_PATTERN_CATEGORIES,
  ANTI_PATTERNS,
  FAMILIES,
  FURTHER_READING,
  NATIVE_PATTERNS,
  PATTERN_CARDS,
  PATTERN_ROWS,
  LAST_UPDATED,
  LAST_VERIFIED,
  guideHref,
  repoPathHref,
} from './ai-design-patterns.ts'

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach(item => collectStrings(item, out))
  else if (value && typeof value === 'object') Object.values(value).forEach(item => collectStrings(item, out))
  return out
}

// Same slug rule as the guide reader (GitHub-style headings).
function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-')
}

test('pattern ids are unique kebab-case across crosswalk and native patterns', () => {
  const ids = [...PATTERN_ROWS.map(row => row.id), ...NATIVE_PATTERNS.map(row => row.id)]
  assert.equal(new Set(ids).size, ids.length)
  for (const id of ids) assert.match(id, KEBAB)
})

test('every crosswalk row is sourced and anchored in official Claude Code docs', () => {
  const familyIds = FAMILIES.map(family => family.id)
  for (const row of PATTERN_ROWS) {
    assert.ok(familyIds.includes(row.family), `${row.id} has unknown family ${row.family}`)
    assert.ok(row.sources.length > 0, `${row.id} has no source`)
    assert.ok(row.claudeCode.length > 0, `${row.id} has no Claude Code mechanism`)
    for (const mechanism of row.claudeCode) {
      assert.match(mechanism.doc, /^https:\/\/code\.claude\.com\/docs\//, `${row.id} cites a non-official doc`)
    }
    assert.ok(row.failureMode.length > 0 && row.verify.length > 0, `${row.id} lacks a failure mode or a check`)
  }
})

test('a divergent row shows at least two readings with distinct sources', () => {
  const divergent = PATTERN_ROWS.filter(row => row.consensus === 'divergent')
  assert.ok(divergent.length > 0)
  for (const row of divergent) {
    assert.ok(row.agentAnalogue.length >= 2, `${row.id} shows one reading only`)
    const sourceSets = new Set(row.agentAnalogue.map(a => a.sources.map(s => s.id).join(',')))
    assert.ok(sourceSets.size >= 2, `${row.id} readings share the same sources`)
  }
})

test('anti-patterns point to known patterns and categories', () => {
  const patternIds = new Set([...PATTERN_ROWS, ...NATIVE_PATTERNS].map(row => row.id))
  const categoryIds = ANTI_PATTERN_CATEGORIES.map(category => category.id)
  for (const anti of ANTI_PATTERNS) {
    assert.ok(categoryIds.includes(anti.category), `${anti.id} has unknown category`)
    for (const related of anti.patterns) assert.ok(patternIds.has(related.id), `${anti.id} links unknown ${related.id}`)
  }
})

test('guide links target the guide reader page and the dataset contains no em dash', () => {
  assert.equal(guideHref('observer'), '/guide/ai-design-patterns/#observer')
  assert.equal(guideHref(), '/guide/ai-design-patterns/')
  const strings = collectStrings([PATTERN_ROWS, NATIVE_PATTERNS, ANTI_PATTERNS])
  assert.ok(strings.every(text => !text.includes('—')))
})

test('the landing snapshot matches the guide dataset and every anchor exists when GUIDE_REPO_PATH is available', () => {
  if (!process.env.GUIDE_REPO_PATH) return
  const datasetPath = resolve(process.env.GUIDE_REPO_PATH, 'machine-readable/ai-design-patterns.json')
  const pagePath = resolve(process.env.GUIDE_REPO_PATH, 'guide/core/ai-design-patterns.md')
  if (!existsSync(datasetPath) || !existsSync(pagePath)) return

  const snapshot = readFileSync(new URL('./ai-design-patterns.json', import.meta.url), 'utf8')
  assert.equal(snapshot, readFileSync(datasetPath, 'utf8'))

  const headings = new Set(
    readFileSync(pagePath, 'utf8')
      .split('\n')
      .filter(line => /^#{2,3} /.test(line))
      .map(line => slugify(line.replace(/^#+ /, ''))),
  )
  const anchors = [...PATTERN_ROWS, ...NATIVE_PATTERNS].map(row => row.guideAnchor)
  anchors.push('crosswalk', 'where-the-analogy-breaks', 'native-agent-patterns', 'choose-a-pattern', 'anti-patterns')
  for (const anchor of anchors) assert.ok(headings.has(anchor), `guide page has no heading for #${anchor}`)
})

test('the guide preparation script synchronizes the dataset snapshot', () => {
  const source = readFileSync(new URL('../../scripts/prepare-guide-content.mjs', import.meta.url), 'utf8')
  assert.match(source, /machine-readable\/ai-design-patterns\.json/)
  assert.match(source, /src\/data\/ai-design-patterns\.json/)
  assert.match(source, /syncAiDesignPatterns\(\)/)
})

test('every pattern has one card image, and video links open YouTube at a timestamp', () => {
  assert.equal(PATTERN_CARDS.length, PATTERN_ROWS.length + NATIVE_PATTERNS.length)
  for (const card of PATTERN_CARDS) {
    assert.equal(card.image, `/guide/images/ai-design-patterns/patterns/${card.id}.webp`, card.id)
    assert.ok(card.alt.startsWith(card.name), `${card.id}: alt text names the pattern`)
    for (const video of card.videos) {
      assert.match(video.url, /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}&t=\d+s$/, card.id)
      assert.match(video.timeLabel, /^\d+:\d{2}$/)
    }
  }
  const guideRepo = process.env.GUIDE_REPO_PATH
  if (guideRepo) {
    for (const card of PATTERN_CARDS) {
      assert.ok(existsSync(resolve(guideRepo, card.image!.slice(1))), `missing ${card.image}`)
    }
  }
})

test('further reading entries resolve to sources and known patterns', () => {
  assert.ok(FURTHER_READING.length > 0)
  const ids = new Set(PATTERN_CARDS.map(card => card.id))
  for (const item of FURTHER_READING) {
    assert.match(item.url, /^https:\/\//)
    for (const pattern of item.patterns) assert.ok(ids.has(pattern.id), `${item.title}: ${pattern.id}`)
  }
})

test('repository paths map to the guide reader layout or to GitHub', () => {
  assert.deepEqual(repoPathHref('guide/core/memory-systems.md#2-native-claude-code-memory-stack'), {
    href: '/guide/memory-systems/#2-native-claude-code-memory-stack',
    external: false,
  })
  assert.deepEqual(repoPathHref('guide/workflows/plan-driven.md'), { href: '/guide/workflows/plan-driven/', external: false })
  assert.deepEqual(repoPathHref('examples/hooks/bm25-routing/README.md'), {
    href: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/examples/hooks/bm25-routing/README.md',
    external: true,
  })
})

test('related links are labeled, external links use https, and guide links target a generated page', () => {
  const guideDir = resolve('src/content/docs/guide')
  const links = PATTERN_CARDS.flatMap(card => card.related)
  assert.ok(links.length > 0)
  for (const link of links) {
    assert.ok(link.title && link.kindLabel, `${link.href}: missing title or kind label`)
    if (link.external) {
      assert.match(link.href, /^https:\/\//)
    } else if (existsSync(guideDir)) {
      const page = link.href.replace(/^\/guide\//, '').split('#')[0].replace(/\/$/, '')
      assert.ok(existsSync(resolve(guideDir, `${page}.md`)), `${link.href}: no generated guide page`)
    }
  }
  const authorLinks = links.filter(link => link.kind === 'project' || link.kind === 'article')
  assert.ok(authorLinks.every(link => link.kindLabel.startsWith("Author's")), 'author links must disclose authorship')
})

test('related images resolve to a copied guide image and carry alt text', () => {
  const images = PATTERN_CARDS.flatMap(card => card.related).flatMap(link => (link.image ? [link.image] : []))
  assert.ok(images.length > 0)
  for (const image of images) {
    assert.match(image.src, /^\/guide\/images\/[a-z0-9/-]+\.webp$/)
    assert.ok(image.alt.length >= 40, `${image.src}: alt text too short`)
    if (existsSync(resolve('public/guide/images'))) {
      assert.ok(existsSync(resolve('public', image.src.slice(1))), `${image.src}: not copied to public/`)
    }
  }
})

test('the last update date is an ISO day on or after the mechanism verification date', () => {
  assert.match(LAST_UPDATED, /^\d{4}-\d{2}-\d{2}$/)
  assert.match(LAST_VERIFIED, /^\d{4}-\d{2}-\d{2}$/)
  assert.ok(LAST_UPDATED >= LAST_VERIFIED, `${LAST_UPDATED} is before ${LAST_VERIFIED}`)
})
