import assert from 'node:assert/strict'
import test from 'node:test'

import { glossaryTerms } from './glossary-data.ts'
import { getGlossaryDescription } from './glossary-seo.ts'

test('keeps every glossary description within the complete 160-character budget', () => {
  for (const term of glossaryTerms) {
    const description = getGlossaryDescription(term)
    assert.ok(description.length <= 160, `${term.term}: ${description.length} characters`)
    assert.ok(description.startsWith(`${term.term}: `))
  }
})

test('preserves short definitions without generic glossary filler or markdown delimiters', () => {
  assert.equal(
    getGlossaryDescription({ term: 'Test command', definition: 'Run `example` to inspect context.' }),
    'Test command: Run example to inspect context.',
  )
})

test('prefers a complete first sentence when the rest exceeds the budget', () => {
  assert.equal(
    getGlossaryDescription({ term: 'Example', definition: `A focused definition. ${'Secondary context '.repeat(15)}` }),
    'Example: A focused definition.',
  )
})

test('keeps the Lost-in-the-middle citation inside its full explanatory sentence', () => {
  const term = glossaryTerms.find((candidate) => candidate.term === 'Lost-in-the-middle')!
  assert.equal(
    getGlossaryDescription(term),
    'Lost-in-the-middle: Attention phenomenon (Liu et al. 2023, arXiv:2307.03172) where models show degraded recall for information in the middle of long contexts.',
  )
})

test('does not stop a sentence at common inline abbreviations', () => {
  const sentences = [
    'Examples, e.g. a tool call, clarify the definition.',
    'The contract, i.e. the API response field, stays explicit.',
    'Compare local vs. remote tools before choosing.',
  ]
  for (const sentence of sentences) {
    assert.equal(
      getGlossaryDescription({ term: 'Example', definition: `${sentence} ${'Secondary context '.repeat(15)}` }),
      `Example: ${sentence}`,
    )
  }
})

test('truncates long first sentences at a word boundary', () => {
  const description = getGlossaryDescription({ term: 'Example', definition: 'context '.repeat(30).trim() })
  assert.ok(description.length <= 160)
  assert.ok(description.endsWith('context...'))
})

test('distinguishes API stop reasons from the SDK turn limit without changing the full definitions', () => {
  for (const name of ['stop_reason', 'max_turns']) {
    const term = glossaryTerms.find((candidate) => candidate.term === name)!
    const originalDefinition = term.definition
    const description = getGlossaryDescription(term)
    assert.match(description, /Messages API/)
    assert.match(description, /Agent SDK/)
    assert.match(description, /separate/i)
    assert.equal(term.definition, originalDefinition)
  }
})
