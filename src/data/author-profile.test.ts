import assert from 'node:assert/strict'
import test from 'node:test'

import { getYearsOfExperience } from './author-profile.ts'

test('experience increases only on the career-start anniversary', () => {
  assert.equal(getYearsOfExperience(new Date('2026-07-31T12:00:00Z')), 12)
  assert.equal(getYearsOfExperience(new Date('2026-08-01T12:00:00Z')), 13)
})
