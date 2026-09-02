import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const communitySource = readFileSync(new URL('./Community.astro', import.meta.url), 'utf8')

test('community cards expose their complete surface as one accessible link', () => {
  assert.equal(communitySource.match(/<a\s+class="community-card"/g)?.length, 2)
  assert.doesNotMatch(communitySource, /<div\s+class="community-card"/)
  assert.match(communitySource, /\.community-card:hover,\s*\.community-card:focus-visible/)
})
