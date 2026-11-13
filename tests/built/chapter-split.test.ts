import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { DIST, hasDist, page } from './dist.ts'

const CHAPTER_DIR = join(DIST, 'guide/ultimate-guide')
const chapters = hasDist
  ? readdirSync(CHAPTER_DIR, { withFileTypes: true }).filter((e) => e.isDirectory() && /^\d\d-/.test(e.name)).map((e) => e.name).sort()
  : []

const text = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()

// CX-06: the intro of chapter N+1 must not end chapter N.
test('no ultimate-guide chapter contains the numbered heading of another chapter', { skip: !hasDist }, () => {
  const leaks: string[] = []
  for (const slug of chapters) {
    const own = Number(slug.slice(0, 2))
    const html = page(`/guide/ultimate-guide/${slug}/`) ?? ''
    const start = html.search(/<div class="sl-markdown-content[^"]*"/)
    const body = start === -1 ? '' : html.slice(start)
    for (const m of body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
      const n = text(m[1]).match(/^(\d+)\.\s/)
      if (n && Number(n[1]) !== own) leaks.push(`${slug}: ${text(m[1])}`)
    }
  }
  assert.deepEqual(leaks, [])
})
