import assert from 'node:assert/strict'
import { statSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

import { WHITEPAPERS } from '../data/whitepapers-data.ts'
import {
  INITIAL_RECAP_CARD_LIMIT,
  getRecapCatalogView,
  getWhitepaperFormatOptions,
  type RecapCatalogEntry,
} from './resource-catalog.ts'

const cards: RecapCatalogEntry[] = Array.from({ length: 15 }, (_, index) => ({
  id: `card-${index + 1}`,
  cardNumber: `T${String(index + 1).padStart(2, '0')}`,
  title: index === 13 ? 'Production Security' : `Card ${index + 1}`,
  subtitle: index === 13 ? 'Hardening production agents' : 'Reference material',
  tags: index === 13 ? ['security', 'hardening'] : ['reference'],
  category: index < 8 ? 'Technical' : 'Methodology',
  directAccess: index === 2 || index === 13,
}))

const PROJECT_ROOT = resolve(import.meta.dirname, '../..')

test('the default recap catalogue reveals only the initial selection', () => {
  const view = getRecapCatalogView(cards, { category: 'all', query: '', showAll: false })

  assert.equal(view.visibleIds.length, INITIAL_RECAP_CARD_LIMIT)
  assert.deepEqual(view.visibleIds, cards.slice(0, 12).map(card => card.id))
  assert.equal(view.hiddenCount, 3)
  assert.equal(view.totalMatches, 15)
})

test('search reveals a matching card outside the initial selection', () => {
  const view = getRecapCatalogView(cards, { category: 'all', query: 'security', showAll: false })

  assert.deepEqual(view.visibleIds, ['card-14'])
  assert.equal(view.hiddenCount, 0)
})

test('category and direct-access filters expose every matching card', () => {
  const methodology = getRecapCatalogView(cards, {
    category: 'Methodology',
    query: '',
    showAll: false,
  })
  const direct = getRecapCatalogView(cards, {
    category: 'DirectAccess',
    query: '',
    showAll: false,
  })

  assert.deepEqual(methodology.visibleIds, cards.slice(8).map(card => card.id))
  assert.deepEqual(direct.visibleIds, ['card-3', 'card-14'])
})

test('show all removes the default catalogue limit', () => {
  const view = getRecapCatalogView(cards, { category: 'all', query: '', showAll: true })

  assert.equal(view.visibleIds.length, 15)
  assert.equal(view.hiddenCount, 0)
})

test('WP11 exposes downloadable EPUB files in both languages', () => {
  const wp11 = WHITEPAPERS.find(whitepaper => whitepaper.num === '11')

  assert.ok(wp11)
  assert.deepEqual(getWhitepaperFormatOptions(wp11), ['pdf', 'epub'])

  for (const [language, slug] of [['en', wp11.slugEn], ['fr', wp11.slugFr]]) {
    const epub = resolve(PROJECT_ROOT, `public/ebooks/epub/${language}/${slug}.epub`)
    assert.ok(statSync(epub).size > 0, `${language.toUpperCase()} EPUB must be non-empty`)
  }
})
