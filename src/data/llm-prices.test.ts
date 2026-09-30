import assert from 'node:assert/strict'
import test from 'node:test'

import { DEFAULT_SCENARIO, LLM_PRICES, dailyCost, priceRows } from './llm-prices.ts'

const byId = (id: string) => {
  const price = LLM_PRICES.find((p) => p.id === id)
  assert.ok(price, `missing price row ${id}`)
  return price
}

const reference: Record<string, number> = {
  'gpt-6-astra': 76.0,
  'claude-fable-5-1': 64.0,
  'claude-opus-5-5': 27.2,
  'grok-4-7': 42.4,
  'kimi-k3': 22.8,
  'gpt-6-sol': 15.2,
  'claude-sonnet-5-5': 15.2,
  'glm-5-3': 11.52,
  'devstral-2': 8.8,
  'deepseek-v4-pro-peak': 7.568,
  'deepseek-v4-pro-off-peak': 3.784,
  'groq-gpt-oss-120b': 2.04,
  'deepseek-flash-peak': 1.776,
  'deepseek-flash-off-peak': 0.888,
  'gpt-6-luna': 0.76,
}

test('reference scenario (20M in, 80% cached, 0.4M out) matches expected daily costs', () => {
  assert.equal(Object.keys(reference).length, LLM_PRICES.length)
  for (const [id, expected] of Object.entries(reference)) {
    const actual = dailyCost(byId(id), DEFAULT_SCENARIO)
    assert.ok(Math.abs(actual - expected) < 1e-9, `${id}: expected ${expected}, got ${actual}`)
  }
})

test('rows without a cached price bill all input at the full price and are flagged', () => {
  const rows = priceRows(DEFAULT_SCENARIO)
  const flagged = rows.filter((r) => r.upperBound).map((r) => r.price.id).sort()
  assert.deepEqual(flagged, ['devstral-2', 'grok-4-7'])
  // Cache share must not change an upper-bound row.
  const grok = byId('grok-4-7')
  assert.equal(dailyCost(grok, { ...DEFAULT_SCENARIO, cacheHitPercent: 0 }), dailyCost(grok, { ...DEFAULT_SCENARIO, cacheHitPercent: 100 }))
})

test('rows are sorted by descending daily cost and monthly cost uses working days', () => {
  const rows = priceRows(DEFAULT_SCENARIO)
  for (let i = 1; i < rows.length; i++) assert.ok(rows[i - 1].perDay >= rows[i].perDay)
  assert.ok(Math.abs(rows[0].perMonth - 76 * 21) < 1e-9)
})

test('off-peak rows can be excluded', () => {
  const rows = priceRows(DEFAULT_SCENARIO, { includeOffPeak: false })
  assert.equal(rows.length, LLM_PRICES.length - 2)
  assert.ok(rows.every((r) => r.price.tier !== 'off-peak'))
})

test('invalid inputs are clamped instead of producing NaN or negative costs', () => {
  const astra = byId('gpt-6-astra')
  const weird = { inputMTokPerDay: -5, cacheHitPercent: 250, outputMTokPerDay: Number.NaN, workingDaysPerMonth: -1 }
  assert.equal(dailyCost(astra, weird), 0)
  assert.equal(dailyCost(astra, { ...DEFAULT_SCENARIO, cacheHitPercent: 250 }), 20 * 1 + 0.4 * 50)
  assert.equal(priceRows(weird)[0].perMonth, 0)
})

test('every row stores an https source URL and positive prices', () => {
  for (const p of LLM_PRICES) {
    assert.match(p.sourceUrl, /^https:\/\//)
    assert.ok(p.input > 0 && p.output > 0)
    if (p.cachedInput !== null) assert.ok(p.cachedInput > 0 && p.cachedInput <= p.input)
  }
  assert.equal(new Set(LLM_PRICES.map((p) => p.id)).size, LLM_PRICES.length)
})
