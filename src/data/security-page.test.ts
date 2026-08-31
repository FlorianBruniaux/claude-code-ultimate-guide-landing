import assert from 'node:assert/strict'
import test from 'node:test'

import {
  SECURITY_CONTENT_MIGRATION,
  SECURITY_ROUTES,
  filterCves,
  filterThreatRecords,
  getLatestSecurityEvents,
} from './security-page.ts'

test('security routes have unique tasks, metadata, and canonical paths', () => {
  assert.deepEqual(SECURITY_ROUTES.map((route) => route.href), [
    '/security/',
    '/security/threats/',
    '/security/cves/',
    '/security/sandbox/',
    '/security/hardening/',
  ])
  assert.equal(new Set(SECURITY_ROUTES.map((route) => route.title)).size, 5)
  assert.ok(SECURITY_ROUTES.every((route) => route.description.length >= 80))
})

test('latest events use canonical feed dates and descending order', () => {
  const events = getLatestSecurityEvents(3)
  assert.equal(events.length, 3)
  assert.deepEqual(events.map((item) => item.date), [...events.map((item) => item.date)].sort().reverse())
})

test('CVE filters preserve unknown fixed versions', () => {
  const row = filterCves('CVE-2025-6515', new Set()).at(0)
  assert.equal(row?.id, 'CVE-2025-6515')
  assert.equal(row?.fixedInLabel, 'Unknown')
})

test('threat filters search titles and respect record types', () => {
  const records = filterThreatRecords('clawhub', new Set(['skill']))
  assert.ok(records.length > 0)
  assert.ok(records.every((record) => record.type === 'skill'))
})

test('every monolith section has an approved destination', () => {
  assert.deepEqual(Object.keys(SECURITY_CONTENT_MIGRATION).sort(), [
    'active-campaigns', 'agentsec-intelligence', 'agentsec-triage', 'attack-techniques',
    'built-in-security-commands', 'cve-database', 'defense-tools', 'security-checklist',
    'security-sources', 'security-stats', 'the-sandbox', 'threat-database',
  ])
})
