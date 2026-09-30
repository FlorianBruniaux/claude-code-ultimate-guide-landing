import assert from 'node:assert/strict'
import test from 'node:test'

import { FINOPS_LEVERS, FINOPS_REGIMES, countEdges, countLeversByRegime } from './finops-levers.ts'

const regimeIds = FINOPS_REGIMES.map((regime) => regime.id)

test('there are three regimes with stable ids', () => {
  assert.deepEqual(regimeIds, ['subscription', 'api', 'capacity'])
})

test('there are ten levers with unique ids', () => {
  assert.equal(FINOPS_LEVERS.length, 10)
  assert.equal(new Set(FINOPS_LEVERS.map((lever) => lever.id)).size, 10)
})

test('every lever targets known regimes and has a non-empty limit and href', () => {
  for (const lever of FINOPS_LEVERS) {
    assert.ok(lever.regimes.length > 0, `${lever.id} has no regime`)
    for (const id of [...lever.regimes, ...(lever.partialRegimes ?? [])]) {
      assert.ok(regimeIds.includes(id), `${lever.id} targets unknown regime ${id}`)
    }
    for (const id of lever.partialRegimes ?? []) {
      assert.ok(!lever.regimes.includes(id), `${lever.id} lists ${id} as full and partial`)
    }
    assert.ok(lever.limit.trim().length > 0, `${lever.id} has no limit`)
    assert.ok(lever.href.trim().length > 0, `${lever.id} has no href`)
  }
})

test('edge counts are derived from the data', () => {
  const solid = FINOPS_LEVERS.reduce((sum, lever) => sum + lever.regimes.length, 0)
  const dashed = FINOPS_LEVERS.reduce((sum, lever) => sum + (lever.partialRegimes?.length ?? 0), 0)
  assert.deepEqual(countEdges(), { solid, dashed })
  assert.deepEqual(countEdges(), { solid: 14, dashed: 1 })
})

test('off-peak pricing is the only dashed edge and points to subscription', () => {
  const partial = FINOPS_LEVERS.filter((lever) => lever.partialRegimes?.length)
  assert.equal(partial.length, 1)
  assert.equal(partial[0].name, 'Off-peak pricing')
  assert.deepEqual(partial[0].regimes, ['api'])
  assert.deepEqual(partial[0].partialRegimes, ['subscription'])
})

test('per-regime lever counts only include full edges', () => {
  assert.deepEqual(countLeversByRegime(), { subscription: 5, api: 8, capacity: 1 })
})
