import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const PROJECT_ROOT = resolve(import.meta.dirname, '../..')

test('landing pages expose the skill ownership and lifecycle guidance', () => {
  const ecosystem = readFileSync(resolve(PROJECT_ROOT, 'src/pages/ecosystem/index.astro'), 'utf8')
  const contextEngineering = readFileSync(resolve(PROJECT_ROOT, 'src/pages/context-engineering/index.astro'), 'utf8')

  assert.match(ecosystem, /Distribution Is Not Mutualized Maintenance/)
  assert.match(ecosystem, /Personal[\s\S]*Project or team[\s\S]*Tool or vendor[\s\S]*Marketplace or global/)
  assert.match(ecosystem, /npx skills add &lt;owner\/repo&gt;/)
  assert.match(ecosystem, /href="\/guide\/third-party-tools\/"/)
  assert.match(contextEngineering, /Low Use Is a Review Signal, Not a Deletion Rule/)
  assert.match(contextEngineering, /\/skill-doctor/)
  assert.match(contextEngineering, /outside discovered skill directories/)
})

test('ecosystem inventory count matches its current 26-item dataset', () => {
  const ecosystem = readFileSync(resolve(PROJECT_ROOT, 'src/pages/ecosystem/index.astro'), 'utf8')

  assert.match(ecosystem, /class="stat-number" data-target="26"/)
})

test('announcement and RSS expose the skill governance update without duplicate entries', async () => {
  const banner = readFileSync(resolve(PROJECT_ROOT, 'src/components/global/AnnouncementBanner.astro'), 'utf8')
  const { rssEntries } = await import('./rss-entries.ts')
  const entryKeys = rssEntries.map((entry) => `${entry.type}:${entry.title}:${entry.link}`)

  assert.match(banner, /banner-skill-governance-2026-09/)
  assert.match(banner, /href="\/guide\/ultimate-guide\/05-skills\/" class="ann-link">Skill Governance<\/a>/)
  assert.ok(rssEntries.some((entry) => entry.title === 'Skill Ownership, Evaluation and Retirement'))
  assert.equal(new Set(entryKeys).size, entryKeys.length)
})
