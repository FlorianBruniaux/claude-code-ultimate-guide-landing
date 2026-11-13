import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { DIST, hasDist, page } from './dist.ts'

const CHAPTER_DIR = join(DIST, 'guide/ultimate-guide')
const chapters = hasDist
  ? readdirSync(CHAPTER_DIR, { withFileTypes: true }).filter((e) => e.isDirectory() && /^\d\d-/.test(e.name)).map((e) => e.name).sort()
  : []

// CX-03: learning-path pages appear in the sidebar with the current page marked.
test('every learning-path page is marked as the current sidebar entry', { skip: !hasDist }, () => {
  const routes = ['/guide/learning-path/', ...['01-installation', '02-core-loop', '03-memory', '04-agents', '05-skills', '06-hooks', '07-advanced'].map((s) => `/guide/learning-path/${s}/`)]
  const missing = routes.filter((route) => {
    const html = page(route) ?? ''
    const sidebar = html.split('id="starlight__sidebar"')[1] ?? html.split('class="sidebar-content')[1] ?? ''
    return !new RegExp(`href="${route}"[^>]*aria-current="page"|aria-current="page"[^>]*href="${route}"`).test(sidebar)
  })
  assert.deepEqual(missing, [])
})

// UX-05: chapters and modules end with a link to the next page.
test('ultimate-guide chapters and learning-path modules link to the next page', { skip: !hasDist }, () => {
  const pairs: Array<[string, string]> = []
  for (let i = 0; i < chapters.length - 1; i++) pairs.push([`/guide/ultimate-guide/${chapters[i]}/`, `/guide/ultimate-guide/${chapters[i + 1]}/`])
  pairs.push(['/guide/learning-path/03-memory/', '/guide/learning-path/04-agents/'])
  const missing = pairs.filter(([from, to]) => {
    const html = page(from) ?? ''
    const pagination = html.split('pagination-links')[1] ?? ''
    return !new RegExp(`href="${to}"[^>]*rel="next"|rel="next"[^>]*href="${to}"`).test(pagination)
  }).map(([from, to]) => `${from} -> ${to}`)
  assert.deepEqual(missing, [])
})
