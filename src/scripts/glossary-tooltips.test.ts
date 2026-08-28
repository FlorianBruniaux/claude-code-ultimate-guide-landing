import assert from 'node:assert/strict'
import test from 'node:test'

import { glossaryTerms } from '../data/glossary-data.ts'
import {
  createTooltipMatcher,
  normalizeGlossarySlug,
  resolveTooltipTerms,
  shouldEnrichTextNode,
  transitionTooltip,
} from './glossary-tooltips.ts'

test('resolves the explicit tooltip allowlist from glossary definitions', () => {
  const terms = resolveTooltipTerms(glossaryTerms)

  assert.deepEqual(
    terms.map((term) => term.term),
    ['Agent harness', 'CLAUDE.md', 'Context window', 'Git worktree', 'Hook', 'MCP (Model Context Protocol)', 'Plan Mode', 'Prompt injection', 'Skill', 'Sub-agent'],
  )
  assert.ok(terms.every((term) => term.definition.length > 0))
})

test('normalizes a glossary term into the same route slug everywhere', () => {
  assert.equal(normalizeGlossarySlug('MCP (Model Context Protocol)'), 'mcp-model-context-protocol')
  assert.equal(normalizeGlossarySlug('CLAUDE.md'), 'claudemd')
})

test('matches whole terms only, preferring the longer allowlisted term', () => {
  const matcher = createTooltipMatcher([
    { term: 'Agent', definition: 'short', slug: 'agent' },
    { term: 'Agent harness', definition: 'long', slug: 'agent-harness' },
  ])

  const result = matcher.match('Agent harness helps an Agent, but not Agentic coding.')

  assert.deepEqual(result.matches.map((match) => match.term.term), ['Agent harness', 'Agent'])
  assert.equal(result.text, 'Agent harness helps an Agent, but not Agentic coding.')
})

test('never enriches a text node below excluded or pre-existing interactive content', () => {
  assert.equal(shouldEnrichTextNode(['article', 'p']), true)
  assert.equal(shouldEnrichTextNode(['article', 'h2']), false)
  assert.equal(shouldEnrichTextNode(['article', 'a']), false)
  assert.equal(shouldEnrichTextNode(['article', 'pre', 'code']), false)
  assert.equal(shouldEnrichTextNode(['article', 'form', 'input']), false)
  assert.equal(shouldEnrichTextNode(['article', 'div[data-interactive]']), false)
  assert.equal(shouldEnrichTextNode(['article', 'figure.mermaid-diagram']), false)
})

test('enriches only each term first occurrence and stops at the page cap', () => {
  const matcher = createTooltipMatcher(
    Array.from({ length: 10 }, (_, index) => ({
      term: `Term ${index + 1}`,
      definition: String(index + 1),
      slug: `term-${index + 1}`,
    })),
  )

  const result = matcher.match('Term 1. Term 1. Term 2. Term 3. Term 4. Term 5. Term 6. Term 7. Term 8. Term 9. Term 10.')

  assert.deepEqual(result.matches.map((match) => match.term.term), [
    'Term 1', 'Term 2', 'Term 3', 'Term 4', 'Term 5', 'Term 6', 'Term 7', 'Term 8',
  ])
})

test('keeps one accessible tooltip open and closes it on Escape or an outside click', () => {
  let state = { openId: null as string | null }
  state = transitionTooltip(state, { type: 'open', id: 'tooltip-agent' })
  assert.equal(state.openId, 'tooltip-agent')

  state = transitionTooltip(state, { type: 'toggle', id: 'tooltip-hook' })
  assert.equal(state.openId, 'tooltip-hook')

  state = transitionTooltip(state, { type: 'escape' })
  assert.equal(state.openId, null)

  state = transitionTooltip({ openId: 'tooltip-skill' }, { type: 'outside-click' })
  assert.equal(state.openId, null)
})
