import assert from 'node:assert/strict'
import test from 'node:test'

import { shouldShowFeedback } from './feedback-visibility.ts'

test('feedback remains visible on desktop', () => {
  assert.equal(shouldShowFeedback({ viewportWidth: 1200, scrollY: 0, viewportHeight: 800 }), true)
})

test('feedback waits until the visitor has scrolled on mobile', () => {
  assert.equal(shouldShowFeedback({ viewportWidth: 390, scrollY: 0, viewportHeight: 844 }), false)
  assert.equal(shouldShowFeedback({ viewportWidth: 390, scrollY: 640, viewportHeight: 844 }), true)
})
