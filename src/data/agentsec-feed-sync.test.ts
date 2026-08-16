import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const PROJECT_ROOT = resolve(import.meta.dirname, '../..')
const SCRIPT = resolve(PROJECT_ROOT, 'scripts/check-agentsec-feed-sync.mjs')

function fixture(landingContent: string, guideContent: string) {
  const root = mkdtempSync(join(tmpdir(), 'agentsec-feed-sync-'))
  const landingRoot = join(root, 'landing')
  const guideRoot = join(root, 'guide')
  mkdirSync(join(landingRoot, 'src/data'), { recursive: true })
  mkdirSync(join(guideRoot, 'machine-readable'), { recursive: true })
  writeFileSync(join(landingRoot, 'src/data/agentsec-security-feed.v1.json'), landingContent)
  writeFileSync(
    join(guideRoot, 'machine-readable/agentsec-security-feed.v1.json'),
    guideContent,
  )
  return { landingRoot, guideRoot }
}

function run(landingRoot: string, guideRoot: string) {
  return spawnSync(
    process.execPath,
    [SCRIPT, '--landing-root', landingRoot, '--guide-root', guideRoot],
    { encoding: 'utf8' },
  )
}

test('sync checker accepts byte-identical valid feeds', () => {
  const content = '{"schema_version":"1","content_license":"CC-BY-SA-4.0"}\n'
  const { landingRoot, guideRoot } = fixture(content, content)

  const result = run(landingRoot, guideRoot)

  assert.equal(result.status, 0, result.stderr)
})

test('sync checker rejects landing drift', () => {
  const valid = '{"schema_version":"1","content_license":"CC-BY-SA-4.0"}\n'
  const drifted = '{"schema_version":"1","content_license":"CC-BY-SA-4.0","extra":true}\n'
  const { landingRoot, guideRoot } = fixture(drifted, valid)

  const result = run(landingRoot, guideRoot)

  assert.equal(result.status, 1)
  assert.match(result.stderr, /landing feed differs from guide mirror/)
})
