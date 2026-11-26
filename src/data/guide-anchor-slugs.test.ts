import assert from 'node:assert/strict'
import test from 'node:test'
import * as links from '../../plugins/remark-guide-links.mjs'

test('keeps the punctuation spacing used by the rendered chapter headings', () => {
  assert.equal(links.guideHeadingAnchor?.('2.5 Model selection & thinking guide'), '25-model-selection--thinking-guide')
  assert.equal(links.guideHeadingAnchor?.('9.12 Git best practices & workflows'), '912-git-best-practices--workflows')
})

test('uses an explicit heading ID without deriving a different fragment', () => {
  assert.equal(links.guideHeadingAnchor?.('Session Pattern Discovery (cc-sessions discover) {#session-pattern-discovery}'), 'session-pattern-discovery')
})
