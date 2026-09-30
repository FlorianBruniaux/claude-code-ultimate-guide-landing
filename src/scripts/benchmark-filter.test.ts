import assert from 'node:assert/strict'
import test from 'node:test'

import { DEFAULT_STATE, PAGE_SIZE, applyFilter, compareItems, countLabel, matches, type FilterItem } from './benchmark-filter.ts'

const item = (over: Partial<FilterItem>): FilterItem => ({
  name: 'Tool',
  search: 'tool',
  mech: 'filter',
  measured: false,
  stars: 10,
  results: 0,
  ...over,
})

const items: FilterItem[] = [
  item({ name: 'Beta', search: 'beta shell filters', stars: 500, results: 2, measured: true }),
  item({ name: 'alpha', search: 'alpha proxy', mech: 'proxy', stars: 900, results: 0 }),
  item({ name: 'Gamma', search: 'gamma memory', mech: 'memory', stars: -1, results: 1, measured: true }),
]

test('an empty state matches everything', () => {
  for (const i of items) assert.ok(matches(i, DEFAULT_STATE))
})

test('search is case-insensitive and trimmed', () => {
  assert.ok(matches(items[0], { ...DEFAULT_STATE, query: '  SHELL ' }))
  assert.ok(!matches(items[1], { ...DEFAULT_STATE, query: 'shell' }))
})

test('mechanism and measured filters combine', () => {
  const state = { ...DEFAULT_STATE, mech: 'filter', measuredOnly: true }
  assert.deepEqual(items.map((i) => matches(i, state)), [true, false, false])
})

test('sorting is stable and falls back to the name', () => {
  assert.deepEqual([...items].sort(compareItems('name')).map((i) => i.name), ['alpha', 'Beta', 'Gamma'])
  assert.deepEqual([...items].sort(compareItems('stars')).map((i) => i.name), ['alpha', 'Beta', 'Gamma'])
  assert.deepEqual([...items].sort(compareItems('results')).map((i) => i.name), ['Beta', 'Gamma', 'alpha'])
})

test('the page limit applies after filtering and showAll lifts it', () => {
  const many = Array.from({ length: 40 }, (_, i) => item({ name: `t${String(i).padStart(2, '0')}`, search: 't' }))
  const limited = applyFilter(many, DEFAULT_STATE)
  assert.equal(limited.matched, 40)
  assert.equal(limited.visible.size, PAGE_SIZE)
  const all = applyFilter(many, { ...DEFAULT_STATE, showAll: true })
  assert.equal(all.visible.size, 40)
})

test('filtered order lists only matching items', () => {
  const r = applyFilter(items, { ...DEFAULT_STATE, mech: 'proxy' })
  assert.deepEqual(r.order, [1])
  assert.equal(r.matched, 1)
})

test('count label covers the empty and filtered cases', () => {
  assert.equal(countLabel(0, 0, 45), 'No tools match. Reset the filters.')
  assert.equal(countLabel(15, 45, 45), 'Showing 15 of 45 tools.')
  assert.equal(countLabel(3, 3, 45), 'Showing 3 of 3 tools, filtered from 45.')
})
