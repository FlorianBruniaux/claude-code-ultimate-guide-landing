import assert from 'node:assert/strict'
import test from 'node:test'

import { ROLES, ROLES_META, formatRolesUpdatedDate } from './ai-roles.ts'

test('the published role count matches the rendered catalog', () => {
  assert.equal(ROLES_META.count, ROLES.length)
})

test('the update label is derived from the canonical ISO date', () => {
  assert.equal(ROLES_META.modifiedDate, '2026-08-31')
  assert.equal(ROLES_META.updated, formatRolesUpdatedDate(ROLES_META.modifiedDate))
  assert.equal(ROLES_META.updated, 'August 2026')
})

test('the landing catalog contains the 22 canonical guide profiles', () => {
  const expectedTitles = [
    'AI Agent Engineer',
    'AI Architect',
    'AI Developer Advocate',
    'AI Engineer',
    'AI Evaluation Engineer',
    'AI Governance Engineer',
    'AI Orchestration Engineer',
    'AI Platform Engineer',
    'AI Product Manager',
    'AI Safety Engineer',
    'AI Security Engineer',
    'Agent Identity Architect',
    'Applied AI Engineer',
    'Context Engineer',
    'Forward-Deployed Engineer',
    'Founding AI Engineer',
    'Harness Engineer',
    'LLM Engineer',
    'ML Engineer',
    'MLOps Engineer',
    'Prompt Engineer',
    'Spec Engineer',
  ]

  assert.deepEqual(ROLES.map((role) => role.title).sort(), expectedTitles)
  assert.equal(new Set(ROLES.map((role) => role.id)).size, ROLES.length)
})
