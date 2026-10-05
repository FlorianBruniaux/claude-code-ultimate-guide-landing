import assert from 'node:assert/strict'
import test from 'node:test'
import { EXAMPLES, type ExamplesData } from '../data/examples-data.ts'
import { examplePageSlug, getExamplePages } from './example-pages.ts'

test('detail selection keeps every recommended template and unique generated routes', () => {
  const pages = getExamplePages()
  const categories: ExamplesData = EXAMPLES
  const favorites = Object.values(categories).flatMap(category => category.files).filter(file => file.favorite)
  for (const favorite of favorites) assert.ok(pages.some(page => page.path === favorite.path), favorite.path)
  assert.equal(new Set(pages.map(page => examplePageSlug(page.name))).size, pages.length)
  assert.equal(pages.length, Math.max(50, favorites.length))
})

test('slugs preserve the published route convention', () => {
  assert.equal(examplePageSlug('code-reviewer.md'), 'codereviewermd')
  assert.equal(examplePageSlug('security-suite/'), 'securitysuite')
})
