import assert from 'node:assert/strict'
import test from 'node:test'
import { exampleLinks } from './example-links.ts'

test('multi-file skills expose a browse target without an invalid raw download', () => {
  assert.deepEqual(exampleLinks('skills/talk-pipeline/'), {
    github: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/tree/main/examples/skills/talk-pipeline/',
    raw: null,
  })
})

test('file links preserve case for raw downloads', () => {
  const links = exampleLinks('skills/token-audit/skill.md')
  assert.ok(links.github.endsWith('/blob/main/examples/skills/token-audit/skill.md'))
  assert.ok(links.raw?.endsWith('/skills/token-audit/skill.md'))
})
