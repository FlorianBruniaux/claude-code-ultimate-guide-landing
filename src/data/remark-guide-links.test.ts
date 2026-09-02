import assert from 'node:assert/strict'
import test from 'node:test'

import { remarkGuideLinks } from '../../plugins/remark-guide-links.mjs'

function rewrite(url: string, currentFile: string): string {
  const tree = {
    type: 'root',
    children: [{ type: 'paragraph', children: [{ type: 'link', url, children: [] }] }],
  }
  const transform = remarkGuideLinks()
  transform(tree, { history: [`/workspace/src/content/docs/guide/${currentFile}`] })
  return tree.children[0].children[0].url
}

test('keeps same-directory learning path links under the learning-path route', () => {
  assert.equal(
    rewrite('01-installation.md', 'learning-path/index.md'),
    '/guide/learning-path/01-installation/',
  )
})

test('keeps same-directory workflow links under the workflows route', () => {
  assert.equal(
    rewrite('best-of-n.md', 'workflows/index.md'),
    '/guide/workflows/best-of-n/',
  )
})

test('maps cross-directory workflow links to their published route', () => {
  assert.equal(
    rewrite('./workflows/agent-teams.md', 'agent-harness.md'),
    '/guide/workflows/agent-teams/',
  )
})

test('keeps flattened guide sections on their public top-level route', () => {
  assert.equal(
    rewrite('../core/architecture.md', 'workflows/example.md'),
    '/guide/architecture/',
  )
})

test('sends unpublished repository Markdown files to GitHub', () => {
  assert.equal(
    rewrite('../../examples/skills/learning-path/SKILL.md', 'learning-path/index.md'),
    'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/examples/skills/learning-path/SKILL.md',
  )
})

test('maps the source guide README to the published guide portal', () => {
  assert.equal(rewrite('../README.md', 'learning-path/index.md'), '/guide/')
})

test('maps a relative workflow directory to its published index', () => {
  assert.equal(rewrite('./workflows/', 'ultimate-guidefr.md'), '/guide/workflows/')
})

test('maps the French source filename to its normalized Astro route', () => {
  assert.equal(
    rewrite('../ultimate-guide.fr.md', 'core/translations.md'),
    '/guide/ultimate-guidefr/',
  )
})
