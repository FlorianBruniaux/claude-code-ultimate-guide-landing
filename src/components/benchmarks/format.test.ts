import assert from 'node:assert/strict'
import test from 'node:test'

import { chartDomain, describeValue, describeValues, fmtPct, fmtRange, fmtValues, position } from './format.ts'

test('position centres a value when the domain has no width', () => {
  assert.equal(position(5, 5, 5), 50)
  assert.equal(position(0, 0, 0), 50)
  assert.ok(Number.isFinite(position(-3, 2, 2)))
})

test('position maps the domain ends to 0 and 100', () => {
  assert.equal(position(-60, -60, 60), 0)
  assert.equal(position(60, -60, 60), 100)
  assert.equal(position(0, -60, 60), 50)
})

test('chart domain of no values is a zero-width domain at zero', () => {
  assert.deepEqual(chartDomain([]), { lo: 0, hi: 0 })
})

test('chart domain rounds outward to the step', () => {
  assert.deepEqual(chartDomain([-49, 52.8]), { lo: -60, hi: 60 })
})

test('zero reads as no change and carries no sign', () => {
  assert.equal(fmtPct(0), '0%')
  assert.equal(describeValue(0, 'cost'), 'no change in cost')
})

test('several values keep study order', () => {
  assert.equal(fmtValues([7.6, 0.1]), '+7.6% then +0.1%')
  assert.equal(describeValues([9, -12], 'cost'), '9% more expensive, then 12% cheaper')
})

test('range keeps signs and collapses equal values', () => {
  assert.equal(fmtRange([13, -9, 7.1]), '−9% to +13%')
  assert.equal(fmtRange([-49, -49]), '−49%')
  assert.equal(fmtRange([]), '')
})
