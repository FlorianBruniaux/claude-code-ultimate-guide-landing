import assert from 'node:assert/strict'
import { test } from 'node:test'

// Returning an index-based fallback or dropping the fragment breaks these cases.
import { extractDiagramBlocks } from '../../scripts/lib/diagram-source.mjs'

test('each diagram carries its own source destination after insertion or reordering', () => {
  const blocks = extractDiagramBlocks(`### New diagram

New description.

\`\`\`mermaid
flowchart TD
 A --> B
\`\`\`

<details><summary>ASCII</summary>

\`\`\`text
A -> B
\`\`\`

</details>

> **Source**: [Configuration](../ultimate-guide.md#34-precedence-rules)

---

### Previous diagram

Another description.

\`\`\`mermaid
flowchart LR
 C --> D
\`\`\`

<details><summary>ASCII</summary>

\`\`\`
C -> D
\`\`\`

</details>

> **Source**: [Architecture](../core/architecture.md#1-the-master-loop)
`, '03-configuration-system.md')
  assert.equal(blocks.length, 2)
  assert.equal(blocks[0].guideUrl, 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#34-precedence-rules')
  assert.equal(blocks[1].guideUrl, 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/architecture.md#1-the-master-loop')
  assert.equal(blocks[0].asciiFallback, 'A -> B')
})

test('missing or unsafe source links fail instead of publishing a wrong fallback', () => {
  const diagram = '### Test\n\nDescription.\n\n```mermaid\nflowchart TD\n A --> B\n```\n<details><summary>ASCII</summary>\n```\nA -> B\n```\n</details>\n'
  assert.throws(() => extractDiagramBlocks(diagram, '01-foundations.md'), /Source/)
  assert.throws(() => extractDiagramBlocks(diagram + '\n> **Source**: [Unsafe](javascript:alert)\n', '01-foundations.md'), /HTTPS/)
  const blocks = extractDiagramBlocks(diagram + '\n> **Source**: [Permissions](https://code.claude.com/docs/en/permissions#permission-modes)\n', '01-foundations.md')
  assert.equal(blocks[0].guideUrl, 'https://code.claude.com/docs/en/permissions#permission-modes')
})

test('an unrecognized diagram section or missing ASCII fails rather than dropping content', () => {
  const diagram = '### Test\n\nDescription.\n\n```mermaid\nflowchart TD\n A --> B\n```\n\n> **Source**: [Guide](../ultimate-guide.md#22-context-management)\n'
  assert.throws(() => extractDiagramBlocks(diagram, '01-foundations.md'), /ASCII/)
  assert.throws(() => extractDiagramBlocks(diagram.replace('### Test\n\n', '### Test\n'), '01-foundations.md'), /extracted 0\/1/)
})
