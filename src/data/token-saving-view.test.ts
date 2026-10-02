import assert from 'node:assert/strict'
import test from 'node:test'

import { CLAIMS_VS_MEASURED, MEASUREMENTS, type Measurement } from './token-saving-benchmarks.ts'
import { CATALOG } from './token-saving-catalog.ts'
import {
  REFERENCE_TOOLS,
  THIRD_PARTY_MEASUREMENTS,
  catalogRows,
  claimCards,
  efficiencyKey,
  efficiencyLabel,
  groupMeasurementsByTool,
  isReferenceTool,
  rankByEfficiency,
  resultsFor,
  shapeOf,
  signOf,
} from './token-saving-view.ts'

test('grouping keeps every third-party measurement exactly once', () => {
  const groups = groupMeasurementsByTool()
  const all = groups.flatMap((g) => g.rows)
  assert.equal(all.length, THIRD_PARTY_MEASUREMENTS.length)
  for (const m of THIRD_PARTY_MEASUREMENTS) assert.equal(all.filter((r) => r === m).length, 1, `${m.tool} ${m.benchmark}`)
})

test('a publisher measuring its own tool is never a third-party result', () => {
  const own = MEASUREMENTS.filter((m) => !THIRD_PARTY_MEASUREMENTS.includes(m))
  assert.deepEqual(own.map((m) => `${m.tool}/${m.benchmark}`).sort(), ['Parsec/dasein', 'Tokenade/thol'])
  for (const id of ['tokenade', 'parsec']) {
    const row = catalogRows().find((r) => r.entry.id === id)
    assert.ok(row, id)
    assert.equal(row.results.length, 0, id)
  }
  assert.ok(groupMeasurementsByTool().every((g) => g.tool !== 'Tokenade' && g.tool !== 'Parsec'))
})

test('grouping has one group per tool, sorted by name, rows in source order', () => {
  const groups = groupMeasurementsByTool()
  const tools = groups.map((g) => g.tool)
  assert.equal(new Set(tools).size, tools.length)
  assert.deepEqual(tools, [...tools].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })))
  for (const g of groups) {
    const expected = THIRD_PARTY_MEASUREMENTS.filter((m) => m.tool === g.tool)
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
    const thirdParty = THIRD_PARTY_MEASUREMENTS.filter((m) => m.tool === r.entry.measuredAs)
    if (!r.entry.measuredAs) assert.equal(r.results.length, 0, r.entry.id)
    else assert.deepEqual(r.results, thirdParty, r.entry.id)
  }
})

test('every measurement of a catalogued tool is reachable from its catalog row', () => {
  const rows = catalogRows()
  const catalogued = new Set(CATALOG.map((c) => c.measuredAs).filter(Boolean))
  for (const m of THIRD_PARTY_MEASUREMENTS) {
    if (!catalogued.has(m.tool)) continue
    assert.ok(rows.some((r) => r.results.includes(m)), `${m.tool} ${m.benchmark}`)
  }
})

test('claim cards list all results for each claim tool, with none dropped', () => {
  const cards = claimCards()
  assert.equal(cards.length, CLAIMS_VS_MEASURED.length)
  for (const card of cards) {
    assert.deepEqual(card.results, THIRD_PARTY_MEASUREMENTS.filter((m) => m.tool === card.claim.tool))
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

const m = (tool: string, unit: Measurement['unit'], values: number[], benchmark: Measurement['benchmark'] = 'stet'): Measurement => ({
  tool,
  benchmark,
  metric: 'test',
  values,
  unit,
})

test('efficiency order on real data: cheapest median first, tools without a result last', () => {
  const ranked = rankByEfficiency(catalogRows(), (r) => r.results, (r) => r.entry.name)
  const names = ranked.map((r) => r.item.entry.name)
  assert.equal(names[0], "Fermat's Last Token (Quotient Labs)")
  assert.deepEqual(names.slice(0, 12), [
    "Fermat's Last Token (Quotient Labs)",
    'Edgee',
    'WOZCODE (Woz)',
    'claude-token-efficient',
    'Caveman',
    'CodeGraph',
    'Ponytail',
    'graphify',
    'RTK (Rust Token Killer)',
    'LeanCTX',
    'Headroom',
    'Context Mode',
  ])
  const keyed = ranked.filter((r) => r.key)
  assert.equal(keyed.length, 12)
  assert.ok(keyed.every((r, i) => i === 0 || keyed[i - 1].key!.median <= r.key!.median))
  assert.ok(ranked.slice(12).every((r) => r.key === null))
  // RTK has several third-party cost results: the key is their median, not one study.
  const rtk = ranked.find((r) => r.item.entry.id === 'rtk')
  assert.ok(rtk && rtk.key?.basis === 'cost')
  assert.equal(rtk.key.median, efficiencyKey(THIRD_PARTY_MEASUREMENTS.filter((x) => x.tool === 'RTK'))?.median)
})

test('efficiency key is the median of every cost value, two-run results count both runs', () => {
  assert.deepEqual(efficiencyKey([m('t', 'cost', [10]), m('t', 'cost', [-20, 40])]), { median: 10, basis: 'cost' })
  assert.deepEqual(efficiencyKey([m('t', 'cost', [-4, 32])]), { median: 14, basis: 'cost' })
  assert.equal(efficiencyKey([m('t', 'cost', [1, 2, 3, 100])])?.median, 2.5)
})

test('without a cost result the key falls back to token counts and says so', () => {
  const key = efficiencyKey([m('t', 'tokens', [-30]), m('t', 'output tokens', [-10, -20])])
  assert.deepEqual(key, { median: -20, basis: 'tokens' })
  assert.match(efficiencyLabel(key), /token count, not cost/)
  assert.doesNotMatch(efficiencyLabel({ median: -5, basis: 'cost' }), /token count/)
  // A cost result wins over token counts, which are then ignored.
  assert.deepEqual(efficiencyKey([m('t', 'tokens', [-90]), m('t', 'cost', [5])]), { median: 5, basis: 'cost' })
})

test('tools with no result sort last, and a token-count tool ranks among cost tools by its median', () => {
  const tools = [
    { name: 'none', rows: [] as Measurement[] },
    { name: 'tokens-only', rows: [m('tokens-only', 'tokens', [-50])] },
    { name: 'cost-bad', rows: [m('cost-bad', 'cost', [30])] },
    { name: 'cost-good', rows: [m('cost-good', 'cost', [-10])] },
  ]
  const before = tools.map((t) => t.name)
  const ranked = rankByEfficiency(tools, (t) => t.rows, (t) => t.name)
  assert.deepEqual(ranked.map((r) => r.item.name), ['tokens-only', 'cost-good', 'cost-bad', 'none'])
  assert.deepEqual(tools.map((t) => t.name), before)
  assert.equal(efficiencyKey([]), null)
  assert.equal(efficiencyLabel(null), 'No third-party result')
})

test('equal medians fall back to the name', () => {
  const tools = ['b', 'A', 'c'].map((name) => ({ name, rows: [m(name, 'cost', [-5])] }))
  assert.deepEqual(rankByEfficiency(tools, (t) => t.rows, (t) => t.name).map((r) => r.item.name), ['A', 'b', 'c'])
})

test('a maker-run result never counts, even when passed in directly', () => {
  const own = MEASUREMENTS.filter((x) => !THIRD_PARTY_MEASUREMENTS.includes(x))
  assert.equal(own.length, 2)
  for (const row of own) assert.equal(efficiencyKey([row]), null, `${row.tool}/${row.benchmark}`)
  // Mixed with a real third-party row, only that row sets the key.
  const parsecOwn = own.find((x) => x.tool === 'Parsec')!
  assert.deepEqual(efficiencyKey([parsecOwn, m('Parsec', 'cost', [7], 'stet')]), { median: 7, basis: 'cost' })
  // The catalogue never ranks Tokenade or Parsec by their own benchmark.
  const ranked = rankByEfficiency(catalogRows(), (r) => r.results, (r) => r.entry.name)
  for (const id of ['tokenade', 'parsec']) assert.equal(ranked.find((r) => r.item.entry.id === id)?.key, null, id)
})

test('efficiency labels add no em dash', () => {
  assert.ok(!efficiencyLabel({ median: -13, basis: 'cost' }).includes('\u2014'))
})
