import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { DIST, hasDist, ids, page } from './dist.ts'

// CX-01 and CX-04: every on-site search result must open an existing page
// and land on an existing heading.
test('every anchored search entry targets an id that exists in the built page', { skip: !hasDist }, () => {
  const index = JSON.parse(readFileSync(join(DIST, 'search-index.json'), 'utf8'))
  const entries: Array<{ url: string; title: string }> = index.entries ?? index
  const cache = new Map<string, Set<string> | null>()
  const missing: string[] = []
  let checked = 0
  for (const entry of entries) {
    if (!entry.url?.startsWith('/') || !entry.url.includes('#')) continue
    const [path, rawHash] = entry.url.split('#')
    if (!cache.has(path)) {
      const html = page(path)
      cache.set(path, html ? ids(html) : null)
    }
    const known = cache.get(path)
    checked++
    if (!known || !known.has(decodeURIComponent(rawHash))) missing.push(`${entry.url} (${entry.title})`)
  }
  assert.ok(checked > 1000, `expected the guide sections in the index, got ${checked}`)
  assert.deepEqual(missing.slice(0, 20), [], `${missing.length} of ${checked} anchors are missing`)
})
