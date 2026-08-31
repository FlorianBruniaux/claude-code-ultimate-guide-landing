import assert from 'node:assert/strict'
import test from 'node:test'

import { MATURITY_LEVELS } from './context-data.ts'
import { CONTEXT_NAV_ITEMS, CONTEXT_SYSTEM_STAGES } from './context-page.ts'

test('context navigation targets each major page section once', () => {
  assert.deepEqual(CONTEXT_NAV_ITEMS.map((item) => item.href), [
    '#configure',
    '#understand',
    '#maturity',
    '#full-guide',
  ])
  assert.equal(new Set(CONTEXT_NAV_ITEMS.map((item) => item.href)).size, 4)
})

test('context system stages form the approved four-step flow', () => {
  assert.deepEqual(CONTEXT_SYSTEM_STAGES.map((item) => item.id), [
    'claude-md',
    'modular-rules',
    'role-profiles',
    'ci-feedback',
  ])
  assert.ok(CONTEXT_SYSTEM_STAGES.every((item) => item.guideHref.startsWith('/')))
})

test('maturity levels remain ordered from L1 through L5', () => {
  assert.deepEqual(MATURITY_LEVELS.map((item) => item.level), [1, 2, 3, 4, 5])
})
