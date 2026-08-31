import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const snapshotUrl = new URL('./intent-navigation.json', import.meta.url)
const snapshot = JSON.parse(readFileSync(snapshotUrl, 'utf8'))

test('intent navigation snapshot follows the public information architecture', () => {
  assert.equal(snapshot.site_base_url, 'https://cc.bruniaux.com')
  assert.deepEqual(snapshot.groups.map(group => group.id), ['start', 'build', 'scale', 'resources', 'updates'])

  const ids = snapshot.groups.flatMap(group => group.items.map(item => item.id))
  assert.equal(new Set(ids).size, ids.length)
})

test('intent navigation snapshot matches the guide manifest when GUIDE_REPO_PATH is available', () => {
  if (!process.env.GUIDE_REPO_PATH) return
  const guideManifestPath = resolve(process.env.GUIDE_REPO_PATH, 'machine-readable/navigation.json')
  if (!existsSync(guideManifestPath)) return

  const guideManifest = JSON.parse(readFileSync(guideManifestPath, 'utf8'))
  assert.deepEqual(snapshot, guideManifest)
})

test('the guide preparation script synchronizes the intent manifest', () => {
  const source = readFileSync(new URL('../../scripts/prepare-guide-content.mjs', import.meta.url), 'utf8')
  assert.match(source, /machine-readable\/navigation\.json/)
  assert.match(source, /src\/data\/intent-navigation\.json/)
  assert.match(source, /syncIntentNavigation\(\)/)
})
