import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'

const PROJECT_ROOT = resolve(import.meta.dirname, '../..')
const SCRIPT = resolve(PROJECT_ROOT, 'scripts/build-guide-index.mjs')

test('builds the guide index from an explicit portable guide root', () => {
  const root = mkdtempSync(join(tmpdir(), 'guide-index-'))
  const guideRoot = join(root, 'claude-code-ultimate-guide')
  const outputPath = join(root, 'guide-search-entries.ts')
  mkdirSync(join(guideRoot, 'machine-readable'), { recursive: true })
  writeFileSync(
    join(guideRoot, 'machine-readable/reference.yaml'),
    'deep_dive:\n  liza_tool: "guide/ecosystem/agentic-tools.md#48-liza"\n',
  )

  const result = spawnSync(
    process.execPath,
    [SCRIPT, '--guide-root', guideRoot, '--out', outputPath],
    { encoding: 'utf8' },
  )

  assert.equal(result.status, 0, result.stderr)
  const generated = readFileSync(outputPath, 'utf8')
  assert.match(generated, /guide-liza-tool/)
  assert.match(generated, /\/guide\/agentic-tools\/#48-liza/)
})

test('maps loop-graph-engineering to the local canonical guide URL', () => {
  const root = mkdtempSync(join(tmpdir(), 'guide-index-loop-'))
  const guideRoot = join(root, 'claude-code-ultimate-guide')
  const outputPath = join(root, 'guide-search-entries.ts')
  mkdirSync(join(guideRoot, 'machine-readable'), { recursive: true })
  writeFileSync(
    join(guideRoot, 'machine-readable/reference.yaml'),
    'deep_dive:\n  loop_graph_engineering: "guide/core/loop-graph-engineering.md#2-write-a-loop-contract"\n',
  )

  const result = spawnSync(
    process.execPath,
    [SCRIPT, '--guide-root', guideRoot, '--out', outputPath],
    { encoding: 'utf8' },
  )

  assert.equal(result.status, 0, result.stderr)
  const generated = readFileSync(outputPath, 'utf8')
  assert.match(generated, /\/guide\/loop-graph-engineering\/#2-write-a-loop-contract/)
  assert.doesNotMatch(generated, /github.com\/FlorianBruniaux\/claude-code-ultimate-guide.*loop-graph-engineering/)
})

test('does not embed a developer-specific absolute guide path', () => {
  const source = readFileSync(SCRIPT, 'utf8')

  assert.doesNotMatch(source, /\/Users\/florianbruniaux/)
  assert.match(source, /resolve\(ROOT, ['"]\.\.['"], ['"]claude-code-ultimate-guide['"]\)/)
})

test('fails closed without replacing the current index when reference.yaml is missing', () => {
  const root = mkdtempSync(join(tmpdir(), 'guide-index-missing-'))
  const guideRoot = join(root, 'missing-guide')
  const outputPath = join(root, 'guide-search-entries.ts')
  writeFileSync(outputPath, 'existing index\n')

  const result = spawnSync(
    process.execPath,
    [SCRIPT, '--guide-root', guideRoot, '--out', outputPath],
    { encoding: 'utf8' },
  )

  assert.notEqual(result.status, 0)
  assert.equal(readFileSync(outputPath, 'utf8'), 'existing index\n')
})
