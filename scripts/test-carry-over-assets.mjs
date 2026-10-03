import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const temporary = mkdtempSync(join(tmpdir(), 'carry-over-assets-test-'))
const carry = join(temporary, 'carry')
const day = 24 * 60 * 60 * 1000

const build = (name, files) => {
  const dir = join(temporary, name, '_astro')
  mkdirSync(dir, { recursive: true })
  for (const [file, body] of Object.entries(files)) writeFileSync(join(dir, file), body)
  return dir
}
const restoredList = join(temporary, 'restored.txt')
const run = (dist, now) =>
  execFileSync('node', [join(root, 'scripts/carry-over-assets.mjs'), dist, carry, '3'], {
    env: { ...process.env, CARRY_OVER_NOW: String(now), CARRY_OVER_RESTORED_LIST: restoredList },
  })
const manifest = () => JSON.parse(readFileSync(join(carry, 'manifest.json'), 'utf8'))

try {
  const t0 = Date.parse('2026-10-03T08:00:00Z')

  // First build: empty carry directory, nothing to restore.
  const first = build('first', { 'index.OLD.css': 'old css', 'shared.SAME.css': 'shared v1' })
  run(first, t0)
  assert.deepEqual(Object.keys(manifest().files).sort(), ['index.OLD.css', 'shared.SAME.css'])

  // Second build changes one hashed name: the old file is served again, current files are untouched.
  const second = build('second', { 'index.NEW.css': 'new css', 'shared.SAME.css': 'shared v2' })
  run(second, t0 + day)
  assert.equal(readFileSync(join(second, 'index.OLD.css'), 'utf8'), 'old css')
  assert.equal(readFileSync(join(second, 'shared.SAME.css'), 'utf8'), 'shared v2')
  assert.equal(manifest().files['index.OLD.css'], t0)
  assert.equal(readFileSync(restoredList, 'utf8'), 'index.OLD.css\n')
  assert.equal(manifest().files['index.NEW.css'], t0 + day)

  // Past the retention window, a file last built more than 3 days ago is dropped everywhere.
  const third = build('third', { 'index.NEW.css': 'new css', 'shared.SAME.css': 'shared v2' })
  run(third, t0 + 4 * day)
  assert.equal(existsSync(join(third, 'index.OLD.css')), false)
  assert.equal(existsSync(join(carry, 'index.OLD.css')), false)
  assert.equal('index.OLD.css' in manifest().files, false)

  // A corrupt or missing manifest never blocks a deploy.
  writeFileSync(join(carry, 'manifest.json'), '{not json')
  const fourth = build('fourth', { 'index.LAST.css': 'last' })
  run(fourth, t0 + 5 * day)
  assert.deepEqual(Object.keys(manifest().files), ['index.LAST.css'])

  console.log('Asset carry-over restore, overwrite protection, retention and recovery passed.')
} finally {
  rmSync(temporary, { recursive: true, force: true })
}
