import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QUIZ_ROLES, ROLE_OVERRIDES, getRolesForQuestion } from './quiz-roles.ts'

// The quiz has 17 categories (16 web + team-metrics 17). Every category must map
// to at least one persona, otherwise its questions get roles=[] and vanish from
// every role filter. This test is the guardrail against an orphaned category.
const ALL_CATEGORY_IDS = Array.from({ length: 17 }, (_, i) => i + 1)

test('there are 5 personas with unique ids', () => {
  assert.equal(QUIZ_ROLES.length, 5)
  const ids = QUIZ_ROLES.map((r) => r.id)
  assert.equal(new Set(ids).size, ids.length, 'persona ids must be unique')
})

test('every category 1-17 maps to at least one persona (no orphans)', () => {
  const orphans = ALL_CATEGORY_IDS.filter(
    (cid) => getRolesForQuestion(cid, `${cid}-001`).length === 0
  )
  assert.deepEqual(orphans, [], `categories with no persona: ${orphans.join(', ')}`)
})

test('persona categoryIds only reference real categories 1-17', () => {
  for (const role of QUIZ_ROLES) {
    for (const cid of role.categoryIds) {
      assert.ok(cid >= 1 && cid <= 17, `${role.id} references invalid category ${cid}`)
    }
  }
})

test('getRolesForQuestion returns the category default when no override', () => {
  // Security (13) is mapped to platform-architect and security-safety.
  const roles = getRolesForQuestion(13, '13-001')
  assert.deepEqual([...roles].sort(), ['platform-architect', 'security-safety'])
})

test('a question inherits every persona whose category set includes it', () => {
  // MCP servers (8) sits in developer, power-user, and security-safety.
  const roles = getRolesForQuestion(8, '08-001')
  assert.deepEqual([...roles].sort(), ['developer', 'power-user', 'security-safety'])
})

test('ROLE_OVERRIDES wins over the category default', () => {
  const original = ROLE_OVERRIDES['99-999']
  ROLE_OVERRIDES['99-999'] = ['pm']
  try {
    assert.deepEqual(getRolesForQuestion(13, '99-999'), ['pm'])
  } finally {
    if (original === undefined) delete ROLE_OVERRIDES['99-999']
    else ROLE_OVERRIDES['99-999'] = original
  }
})

test('an empty override hides a question from every role filter', () => {
  ROLE_OVERRIDES['98-998'] = []
  try {
    assert.deepEqual(getRolesForQuestion(1, '98-998'), [])
  } finally {
    delete ROLE_OVERRIDES['98-998']
  }
})

test('team-metrics (17) is reachable by platform-architect and pm', () => {
  const roles = getRolesForQuestion(17, '17-001')
  assert.deepEqual([...roles].sort(), ['platform-architect', 'pm'])
})
