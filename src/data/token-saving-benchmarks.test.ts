import assert from 'node:assert/strict'
import test from 'node:test'

import { BENCHMARKS, CLAIMS_VS_MEASURED, MEASUREMENTS, TOOL_TOKEN_SHARE } from './token-saving-benchmarks.ts'
import { chartDomain, describeValue, fmtPct, position } from '../components/benchmarks/format.ts'

const benchmarkIds = new Set(BENCHMARKS.map((b) => b.id))

test('benchmark ids are unique', () => {
  assert.equal(benchmarkIds.size, BENCHMARKS.length)
})

test('every measurement points to a known benchmark', () => {
  for (const m of MEASUREMENTS) {
    assert.ok(benchmarkIds.has(m.benchmark), `${m.tool} -> ${m.benchmark}`)
  }
})

test('every claim row points to a known benchmark', () => {
  for (const c of CLAIMS_VS_MEASURED) {
    assert.ok(benchmarkIds.has(c.benchmark), `${c.tool} -> ${c.benchmark}`)
  }
})

test('every benchmark has at least one measurement', () => {
  for (const id of benchmarkIds) {
    assert.ok(MEASUREMENTS.some((m) => m.benchmark === id), `no measurement for ${id}`)
  }
})

test('tool token shares sum to 100 within 0.1', () => {
  const sum = TOOL_TOKEN_SHARE.reduce((acc, t) => acc + t.sharePct, 0)
  assert.ok(Math.abs(sum - 100) <= 0.1, `sum is ${sum}`)
})

test('benchmark and claim source urls are https', () => {
  for (const b of BENCHMARKS) assert.ok(b.url.startsWith('https://'), b.url)
  for (const c of CLAIMS_VS_MEASURED) assert.ok(c.claimSource.startsWith('https://'), c.claimSource)
})

test('measurements carry one or two finite values', () => {
  for (const m of MEASUREMENTS) {
    assert.ok(m.values.length >= 1 && m.values.length <= 2, m.tool)
    for (const v of m.values) assert.ok(Number.isFinite(v))
  }
})

test('visible data text contains no em dash', () => {
  const text = JSON.stringify({ BENCHMARKS, MEASUREMENTS, CLAIMS_VS_MEASURED, TOOL_TOKEN_SHARE })
  assert.ok(!text.includes('—'))
})

test('format helpers keep the sign convention', () => {
  assert.equal(fmtPct(-39), '−39%')
  assert.equal(fmtPct(13), '+13%')
  assert.equal(describeValue(-39, 'cost'), '39% cheaper')
  assert.equal(describeValue(44, 'cost'), '44% more expensive')
  assert.equal(describeValue(-8.5, 'output tokens'), '8.5% fewer output tokens')
})

test('chart domain contains zero and every value', () => {
  const { lo, hi } = chartDomain(MEASUREMENTS.flatMap((m) => m.values))
  assert.ok(lo < 0 && hi > 0)
  for (const m of MEASUREMENTS) {
    for (const v of m.values) {
      const p = position(v, lo, hi)
      assert.ok(p >= 0 && p <= 100, `${m.tool} ${v}`)
    }
  }
})
