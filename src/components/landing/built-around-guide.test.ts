import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const communitySource = readFileSync(new URL('./BuiltAroundGuide.astro', import.meta.url), 'utf8')
const homepageSource = readFileSync(new URL('../../pages/index.astro', import.meta.url), 'utf8')

test('community cards expose their complete surface as one accessible link', () => {
  assert.equal(communitySource.match(/<a\s+class="community-card"/g)?.length, 2)
  assert.doesNotMatch(communitySource, /<div\s+class="community-card"/)
  assert.match(communitySource, /\.community-card:hover,\s*\.community-card:focus-visible/)
})

test('the homepage keeps seven sections in the agreed order', () => {
  const sections = [...homepageSource.matchAll(/^  <([A-Z]\w+)/gm)].map((match) => match[1])
  assert.deepEqual(sections, ['HeroBanner', 'StartHere', 'Essentials', 'McpProof', 'LatestContent', 'BuiltAroundGuide', 'ConsultingCta'])
})
