import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { getExamplePages } from './example-pages.ts'
import { readExampleSource } from './example-source.ts'

function fixtureRoot() {
  const root = mkdtempSync(join(tmpdir(), 'example-source-'))
  mkdirSync(join(root, 'agents'))
  writeFileSync(join(root, 'agents', 'a.md'), '# Agent\nbody\n')
  writeFileSync(join(root, 'agents', 'bin.png'), Buffer.from([0x89, 0x50, 0x00, 0x01, 0x02]))
  mkdirSync(join(root, 'dir'))
  return root
}

test('readExampleSource returns the text content of a file', () => {
  const r = readExampleSource('agents/a.md', fixtureRoot())
  assert.deepEqual(r, { content: '# Agent\nbody\n' })
})

test('readExampleSource skips directories, missing files, binaries and path escapes without throwing', () => {
  const root = fixtureRoot()
  assert.equal(readExampleSource('dir/', root).content, undefined)
  assert.equal(readExampleSource('agents/missing.md', root).content, undefined)
  assert.equal(readExampleSource('agents/bin.png', root).content, undefined)
  assert.equal(readExampleSource('../secret.md', root).content, undefined)
  assert.ok(readExampleSource('agents/missing.md', root).skipped)
})

test('detail page renders the file content in a code block, keeping GitHub as secondary', () => {
  const page = readFileSync(new URL('../pages/examples/[slug].astro', import.meta.url), 'utf8')
  assert.match(page, /readExampleSource/)
  assert.match(page, /<pre[^>]*>/)
  const btnPrimary = page.match(/class="btn btn-primary"/g) ?? []
  assert.equal(btnPrimary.length, 0, 'GitHub link is no longer the primary action')
  assert.match(page, /View on GitHub/)
})

test('real guide templates resolve when the sibling repo is present', () => {
  const pages = getExamplePages()
  const results = pages.map(p => readExampleSource(p.path))
  assert.ok(results.some(r => r.content), 'at least one template has content')
})
