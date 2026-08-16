import { test } from 'node:test'
import assert from 'node:assert/strict'
import feedFixture from './agentsec-security-feed.v1.json' with { type: 'json' }
import {
  AGENTSEC_FEED,
  buildAgentSecSecurityView,
  parseAgentSecFeed,
} from './agentsec-security-feed.ts'

test('canonical feed exposes current database metadata and derived landing metrics', () => {
  const view = buildAgentSecSecurityView(AGENTSEC_FEED)

  assert.equal(view.databaseLabel, 'Threat DB v2.26.0')
  assert.equal(view.databaseUpdatedLabel, 'August 6, 2026')
  assert.deepEqual(
    view.stats.map((item) => [item.id, item.value]),
    [
      ['skills-scanned', 3984],
      ['flawed-skills', 36.82],
      ['critical-risk-skills', 534],
      ['malicious-payloads', 76],
      ['cves-tracked', 107],
      ['exposed-servers', 1000],
    ],
  )
})

test('event cards join stable source ids to public source references', () => {
  const view = buildAgentSecSecurityView(AGENTSEC_FEED)
  const contested = view.events.find((item) => item.id === 'evt-2026-08-keyv-contested-scope')

  assert.ok(contested)
  assert.equal(contested.dateLabel, 'August 6, 2026')
  assert.equal(contested.coverageStatus, 'detected')
  assert.deepEqual(
    contested.sources.map((source) => source.publisher),
    ['JFrog Security Research', 'SafeDep'],
  )
})

test('parser rejects a feed with missing contract sections', () => {
  assert.throws(
    () => parseAgentSecFeed({ schema_version: '1' }),
    /must be an object/,
  )
})

test('view builder rejects unresolved event source ids', () => {
  const malformed = structuredClone(feedFixture)
  malformed.intelligence.events[0].source_ids = ['missing-source']
  const parsed = parseAgentSecFeed(malformed)

  assert.throws(() => buildAgentSecSecurityView(parsed), /unresolved source id missing-source/)
})
