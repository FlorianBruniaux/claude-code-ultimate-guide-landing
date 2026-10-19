import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import { guideRouteFromFile, readGuideLastmods } from './guide-lastmod.mjs'

test('guide files map to the routes Starlight serves', () => {
  assert.equal(guideRouteFromFile('guide/architecture.md'), '/guide/architecture/')
  assert.equal(guideRouteFromFile('guide/ultimate-guide/05-skills.md'), '/guide/ultimate-guide/05-skills/')
  assert.equal(guideRouteFromFile('guide/ultimate-guide.fr.md'), '/guide/ultimate-guidefr/')
  assert.equal(guideRouteFromFile('guide/index.md'), '/guide/')
  assert.equal(guideRouteFromFile('guide/workflows/index.mdx'), '/guide/workflows/')
})

test('lastmod comes from each page lastUpdated frontmatter, not from the build date', () => {
  const root = mkdtempSync(join(tmpdir(), 'guide-lastmod-'))
  mkdirSync(join(root, 'guide', 'ultimate-guide'), { recursive: true })
  writeFileSync(join(root, 'guide', 'architecture.md'), '---\ntitle: "A"\nlastUpdated: 2026-10-17\n---\n\nBody\n')
  writeFileSync(join(root, 'guide', 'ultimate-guide', '05-skills.md'), "---\ntitle: \"S\"\nlastUpdated: '2026-09-21'\n---\n\nlastUpdated: 2099-01-01\n")
  writeFileSync(join(root, 'guide', 'no-date.md'), '---\ntitle: "N"\n---\n')

  const dates = readGuideLastmods(root)

  assert.equal(dates.get('/guide/architecture/'), '2026-10-17')
  assert.equal(dates.get('/guide/ultimate-guide/05-skills/'), '2026-09-21')
  assert.equal(dates.has('/guide/no-date/'), false)
})

test('a missing content directory yields no dates instead of failing the build', () => {
  assert.equal(readGuideLastmods(join(tmpdir(), 'does-not-exist-guide-lastmod')).size, 0)
})
