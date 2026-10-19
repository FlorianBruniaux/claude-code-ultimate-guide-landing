import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { checkReleasePage, expectedLatestVersion, lastSuccessAgeHours } from '../../scripts/lib/release-freshness.mjs'

const page = (version: string) => `<html><head><title>Claude Code Latest Version ${version} | Release History</title></head>
<body><h1>Claude Code latest version: ${version}</h1></body></html>`

test('the expected version is the first entry of the releases data', () => {
  const source = readFileSync(new URL('./releases.ts', import.meta.url), 'utf8')
  assert.match(expectedLatestVersion(source), /^v\d+\.\d+\.\d+$/)
  assert.equal(expectedLatestVersion("export const releases: Release[] = [\n  {\n    version: 'v2.1.302',\n  },\n  {\n    version: 'v2.1.301',"), 'v2.1.302')
})

test('a served page announcing the expected version passes', () => {
  assert.deepEqual(checkReleasePage(page('v2.1.302'), 'v2.1.302'), [])
})

test('a stale served page is reported in both title and H1', () => {
  assert.deepEqual(checkReleasePage(page('v2.1.296'), 'v2.1.302'), [
    '/releases/ title does not announce v2.1.302: "Claude Code Latest Version v2.1.296 | Release History"',
    '/releases/ H1 does not announce v2.1.302: "Claude Code latest version: v2.1.296"',
  ])
})

test('a version prefix of the expected version does not count as a match', () => {
  assert.equal(checkReleasePage(page('v2.1.30'), 'v2.1.302').length, 2)
})

test('deploy age is measured from the latest successful run', () => {
  const now = Date.parse('2026-10-18T12:00:00Z')
  assert.equal(lastSuccessAgeHours({ workflow_runs: [{ updated_at: '2026-10-18T09:00:00Z' }] }, now), 3)
  assert.equal(lastSuccessAgeHours({ workflow_runs: [] }, now), Number.POSITIVE_INFINITY)
})
