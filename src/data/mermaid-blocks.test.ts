import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Replace only the external command. RenderSVG and the Markdown transformation stay real.
const workspace = mkdtempSync(join(tmpdir(), 'mermaid-theme-failure-'))
const originalPath = process.env.PATH
const modeFile = join(workspace, 'fail-theme')
writeFileSync(modeFile, 'dark')
writeFileSync(join(workspace, 'npx'), `#!${process.execPath}
const fs = require('node:fs')
const args = process.argv.slice(2)
if (args.includes('--version')) process.exit(0)
if (args[args.indexOf('-t') + 1] === fs.readFileSync(${JSON.stringify(modeFile)}, 'utf8')) process.exit(1)
fs.writeFileSync(args[args.indexOf('-o') + 1], '<svg id="my-svg"><text>Rendered chart</text></svg>')
`, { mode: 0o755 })
process.env.PATH = `${workspace}:${originalPath}`
const { renderMermaidBlocks } = await import('../../scripts/lib/render-mermaid-blocks.mjs')
after(() => {
  process.env.PATH = originalPath
  rmSync(workspace, { recursive: true, force: true })
})
const markdown = '# Example\n\n```mermaid\ngraph TD; A-->B\n```\n'

test('keeps the original Mermaid block when only one theme renders', () => {
  assert.equal(renderMermaidBlocks(markdown, 'theme-failure'), markdown)
})

test('replaces the Mermaid block only when both themes render', () => {
  writeFileSync(modeFile, '')
  const output = renderMermaidBlocks(markdown, 'theme-success')
  assert.ok(output.includes('<div class="mermaid-light"><svg'))
  assert.ok(output.includes('<div class="mermaid-dark"><svg'))
  assert.ok(!output.includes('```mermaid'))
})
