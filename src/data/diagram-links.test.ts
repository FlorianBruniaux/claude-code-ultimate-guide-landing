import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { checkDiagramLinks } from '../../scripts/check-diagram-links.mjs'

test('diagram links reject absent fragments while ignoring headings inside fenced examples', () => {
  const root = mkdtempSync(join(tmpdir(), 'diagram-links-'))
  try {
    mkdirSync(join(root, 'guide/diagrams'), { recursive: true })
    writeFileSync(join(root, 'guide/reference.md'), '# Reference\n\n## Real Heading\n\n````md\n```md\n## Fake Heading\n```\n````\n')
    writeFileSync(join(root, 'guide/diagrams/test.md'), `# Test

[Valid](../reference.md#real-heading)
[Missing file](../missing.md)

\`\`\`mermaid
flowchart TD
 A --> B
 click A href "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/reference.md#fake-heading"
\`\`\`
`)
    const result = checkDiagramLinks(root)
    assert.equal(result.checked, 3)
    assert.deepEqual(result.failures.map(f => f.kind).sort(), ['missing-file', 'missing-fragment'])
    assert.ok(result.failures.some(f => f.url.endsWith('#fake-heading')))
    writeFileSync(join(root, 'guide/reference.md'), '# Reference\n\n## Real Heading\n\n## Fake Heading\n')
    writeFileSync(join(root, 'guide/missing.md'), '# Now exists\n')
    assert.equal(checkDiagramLinks(root).failures.length, 0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
