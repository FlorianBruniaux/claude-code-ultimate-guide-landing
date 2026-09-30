import assert from 'node:assert/strict'
import test from 'node:test'

import { CLAIMS_VS_MEASURED, MEASUREMENTS } from './token-saving-benchmarks.ts'
import { CATALOG } from './token-saving-catalog.ts'
import {
  REFERENCE_TOOLS,
  catalogRows,
  claimCards,
  groupMeasurementsByTool,
  isReferenceTool,
  resultsFor,
  shapeOf,
  signOf,
} from './token-saving-view.ts'

test('grouping keeps every measurement exactly once', () => {
  const groups = groupMeasurementsByTool()
  const all = groups.flatMap((g) => g.rows)
  assert.equal(all.length, MEASUREMENTS.length)
  for (const m of MEASUREMENTS) assert.equal(all.filter((r) => r === m).length, 1, `${m.tool} ${m.benchmark}`)
})

test('grouping has one group per tool, sorted by name, rows in source order', () => {
  const groups = groupMeasurementsByTool()
  const tools = groups.map((g) => g.tool)
  assert.equal(new Set(tools).size, tools.length)
  assert.deepEqual(tools, [...tools].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })))
  for (const g of groups) {
    const expected = MEASUREMENTS.filter((m) => m.tool === g.tool)
    assert.deepEqual(g.rows, expected)
  }
})

test('grouping is stable when called twice', () => {
  assert.deepEqual(groupMeasurementsByTool(), groupMeasurementsByTool())
})

test('the chart has at most 18 tool rows once reference rows are set aside', () => {
  const toolRows = groupMeasurementsByTool().filter((g) => !isReferenceTool(g.tool))
  assert.ok(toolRows.length <= 18, String(toolRows.length))
})

test('every reference tool exists in the measurements', () => {
  const tools = new Set(MEASUREMENTS.map((m) => m.tool))
  for (const t of REFERENCE_TOOLS) assert.ok(tools.has(t), t)
})

test('sign and shape encode direction and unit', () => {
  assert.equal(signOf(-1), 'good')
  assert.equal(signOf(1), 'bad')
  assert.equal(signOf(0), 'zero')
  assert.equal(shapeOf('cost'), 'circle')
  assert.equal(shapeOf('tokens'), 'diamond')
  assert.equal(shapeOf('output tokens'), 'diamond')
})

test('catalog rows cover every entry once and match measuredAs', () => {
  const rows = catalogRows()
  assert.equal(rows.length, CATALOG.length)
  for (const r of rows) {
    assert.deepEqual(r.results, resultsFor(r.entry))
    if (!r.entry.measuredAs) assert.equal(r.results.length, 0, r.entry.id)
    else assert.ok(r.results.length > 0, r.entry.id)
  }
})

test('every measurement of a catalogued tool is reachable from its catalog row', () => {
  const rows = catalogRows()
  const catalogued = new Set(CATALOG.map((c) => c.measuredAs).filter(Boolean))
  for (const m of MEASUREMENTS) {
    if (!catalogued.has(m.tool)) continue
    assert.ok(rows.some((r) => r.results.includes(m)), `${m.tool} ${m.benchmark}`)
  }
})

test('claim cards list all results for each claim tool, with none dropped', () => {
  const cards = claimCards()
  assert.equal(cards.length, CLAIMS_VS_MEASURED.length)
  for (const card of cards) {
    assert.deepEqual(card.results, MEASUREMENTS.filter((m) => m.tool === card.claim.tool))
    assert.ok(card.results.length >= 1, card.claim.tool)
  }
})

test('RTK card shows every RTK result and the maintainer response', () => {
  const rtk = claimCards().find((c) => c.claim.tool === 'RTK')
  assert.ok(rtk)
  assert.equal(rtk.results.length, MEASUREMENTS.filter((m) => m.tool === 'RTK').length)
  assert.ok(rtk.results.length > 1)
  assert.ok(rtk.maintainerResponses.some((r) => r.url.startsWith('https://')))
})

test('view helpers add no em dash', () => {
  const text = JSON.stringify({ g: groupMeasurementsByTool(), c: claimCards() })
  assert.ok(!text.includes('—'))
})
