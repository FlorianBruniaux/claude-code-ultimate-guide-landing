import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const ROOT = resolve(import.meta.dirname, '../..')
const changelogPage = resolve(ROOT, 'src/pages/changelog/index.astro')
const changelogParser = resolve(ROOT, 'src/utils/guide-changelog.ts')

test('publishes a dedicated guide changelog page', () => {
  assert.ok(existsSync(changelogPage), 'src/pages/changelog/index.astro must exist')
  if (!existsSync(changelogPage)) return

  const source = readFileSync(changelogPage, 'utf8')
  assert.match(source, /Guide Changelog/)
  assert.match(source, /parseGuideChangelog/)
  assert.match(source, /CHANGELOG\.md/)
  assert.match(source, /href="\/releases\/"/)
})

test('keeps guide changelog and Claude Code releases as distinct routes', () => {
  const config = readFileSync(resolve(ROOT, 'astro.config.mjs'), 'utf8')
  const banner = readFileSync(resolve(ROOT, 'src/components/global/AnnouncementBanner.astro'), 'utf8')
  const search = readFileSync(resolve(ROOT, 'src/data/search-index.ts'), 'utf8')
  const footer = readFileSync(resolve(ROOT, 'src/components/global/Footer.astro'), 'utf8')
  const homeUpdates = readFileSync(resolve(ROOT, 'src/components/landing/Releases.astro'), 'utf8')

  assert.doesNotMatch(config, /['"]\/changelog\/['"]:\s*['"]\/releases\/['"]/)
  assert.match(banner, /href="\/changelog\/" class="ann-link">Changelog/)
  assert.match(search, /id: 'page-guide-changelog'[\s\S]*?url: '\/changelog\/'/)
  assert.match(search, /id: 'page-releases'[\s\S]*?Claude Code Releases/)
  assert.match(footer, /href: '\/changelog\/', label: 'Guide Changelog'/)
  assert.match(footer, /href: '\/releases\/', label: 'Claude Code Releases'/)
  assert.match(homeUpdates, /href="\/changelog\/"[\s\S]*?>\s*View Full Changelog/)
})

test('routes guide release RSS entries through the public changelog page', () => {
  const rssPage = readFileSync(resolve(ROOT, 'src/pages/rss.xml.ts'), 'utf8')

  assert.match(rssPage, /entry\.type === 'guide_release'/)
  assert.match(rssPage, /\/changelog\/#/)
})

test('parses unreleased and dated guide releases from Keep a Changelog markdown', async () => {
  assert.ok(existsSync(changelogParser), 'src/utils/guide-changelog.ts must exist')
  if (!existsSync(changelogParser)) return

  const { parseGuideChangelog } = await import('./../utils/guide-changelog.ts')
  const releases = parseGuideChangelog(`# Changelog

## [Unreleased]

### Added

- **New guide page**: useful description.

## [3.43.0] - 2026-08-30

### Fixed

- **Navigation corrected**: guide and releases are separate.
`)

  assert.equal(releases.length, 2)
  assert.equal(releases[0].version, 'Unreleased')
  assert.equal(releases[0].sections[0].items[0].title, 'New guide page')
  assert.equal(releases[1].version, '3.43.0')
  assert.equal(releases[1].date, '2026-08-30')
  assert.equal(releases[1].sections[0].items[0].description, 'guide and releases are separate.')
})

test('removes the inactive guide changelog loader from the Claude Code releases page', () => {
  const releasesPage = readFileSync(resolve(ROOT, 'src/pages/releases/index.astro'), 'utf8')

  assert.doesNotMatch(releasesPage, /function parseChangelog/)
  assert.doesNotMatch(releasesPage, /loadChangelog\(\)/)
  assert.doesNotMatch(releasesPage, /getElementById\('changelog-container'\)/)
})
