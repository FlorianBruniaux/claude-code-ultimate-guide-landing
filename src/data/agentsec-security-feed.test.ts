import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SECURITY_DATA } from './security-data.ts'
import feedFixture from './agentsec-security-feed.v1.json' with { type: 'json' }
import {
  AGENTSEC_FEED,
  buildAgentSecSecurityView,
  parseAgentSecFeed,
} from './agentsec-security-feed.ts'

test('canonical feed exposes current database metadata and derived landing metrics', () => {
  const view = buildAgentSecSecurityView(AGENTSEC_FEED)

  assert.equal(view.databaseLabel, 'Threat DB v2.29.0')
  assert.equal(view.databaseUpdatedLabel, 'September 12, 2026')
  assert.deepEqual(
    view.stats.map((item) => [item.id, item.value]),
    [
      ['skills-scanned', 3984],
      ['flawed-skills', 36.82],
      ['critical-risk-skills', 534],
      ['malicious-payloads', 76],
      ['cves-tracked', 131],
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

test('security view exposes every detector without depending on feed order', () => {
  const reordered = structuredClone(AGENTSEC_FEED)
  reordered.detectors.reverse()

  const canonical = buildAgentSecSecurityView(AGENTSEC_FEED)
  const reversed = buildAgentSecSecurityView(reordered)
  const expected = ['clawhavoc-skill', 'shai-hulud-keyv']

  assert.deepEqual(canonical.detectors.map((item) => item.id), expected)
  assert.deepEqual(reversed.detectors.map((item) => item.id), expected)
  assert.deepEqual(canonical.detectors[0]?.supported_inputs, [
    'repository-local SKILL.md files',
    'same-skill local Markdown setup files referenced by SKILL.md',
  ])
  assert.deepEqual(canonical.detectors[0]?.not_scanned, [
    'skill.registry_history',
    'skill.remote_payloads',
    'skill.runtime_behavior',
    'skill.unreferenced_companion_files',
  ])
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

test('repository CVEs in the public event feed remain searchable in the compatibility catalogue', () => {
  const ids = new Set<string>(SECURITY_DATA.cve_database.map((entry) => entry.id))
  for (const event of AGENTSEC_FEED.intelligence.events) {
    // Hosted incidents can remain timeline-only when repository checks do not apply.
    if (event.detector_coverage.status === 'not_applicable') continue
    for (const id of event.related.cve_ids) assert.ok(ids.has(id), `Missing catalogue record: ${id}`)
  }
  assert.equal(SECURITY_DATA.minimum_safe_versions['claude-code'], '2.1.269')
  assert.equal(SECURITY_DATA.minimum_safe_versions['mysql-mcp-server'], '0.4.2')
})
