import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import test from 'node:test'

test('every compatibility catalogue category matches the guide source', () => {
  const root = resolve(import.meta.dirname, '../..')
  const output = execFileSync(process.execPath, ['scripts/sync-security-catalog.mjs', '--check'], {
    cwd: root,
    encoding: 'utf8',
  })
  assert.match(output, /Security catalogue matches:/)
})
