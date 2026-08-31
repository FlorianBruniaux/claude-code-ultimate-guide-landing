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
  assert.match(source, /Release history/)
  assert.doesNotMatch(source, /In progress/)
  assert.doesNotMatch(source, /Latest updates/)
  assert.doesNotMatch(source, /section-grid/)
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

test('keeps Unreleased separate from the current published version in the display model', async () => {
  const {
    buildGuideChangelogDisplay,
    parseGuideChangelog,
  } = await import('./../utils/guide-changelog.ts')
  const releases = parseGuideChangelog(`# Changelog

## [Unreleased]

### Added

- **Next guide page**: not published yet.

## [3.43.0] - 2026-08-31

### Fixed

- **Current release**: already published.

## [3.42.0] - 2026-08-26

### Added

- **Previous release**: already published.
`)

  const displayed = buildGuideChangelogDisplay(releases, '3.43.0')

  assert.deepEqual(
    displayed.map(({ version, status }) => ({ version, status })),
    [
      { version: 'Unreleased', status: 'unreleased' },
      { version: '3.43.0', status: 'current' },
      { version: '3.42.0', status: 'published' },
    ],
  )
})

test('removes only a leading parenthesized file list from changelog summaries', async () => {
  const { summarizeGuideChangelogDescription } = await import('./../utils/guide-changelog.ts')

  assert.equal(
    summarizeGuideChangelogDescription('(`guide/ops/subscription-strategy.md`, `guide/ecosystem/local-vs-cloud-inference.md`, and discovery indexes): added current cost boundaries.'),
    'added current cost boundaries.',
  )
  assert.equal(
    summarizeGuideChangelogDescription('(for teams with more than 20 seats): added current cost boundaries.'),
    '(for teams with more than 20 seats): added current cost boundaries.',
  )
})

test('preserves inline code formatting in changelog summaries', async () => {
  const { summarizeGuideChangelogDescription } = await import('./../utils/guide-changelog.ts')

  assert.equal(
    summarizeGuideChangelogDescription('The workflow now links `intent.md` to `spec.md` before implementation.'),
    'The workflow now links `intent.md` to `spec.md` before implementation.',
  )
  assert.equal(
    summarizeGuideChangelogDescription('Use `intent.md` before `spec.md` and continue with a very long explanation.', 36),
    'Use `intent.md` before `spec.md` and...',
  )
})

test('derives readable public links for guide pages mentioned in change items', async () => {
  const { guideChangelogItemLinks } = await import('./../utils/guide-changelog.ts')
  const links = guideChangelogItemLinks({
    title: 'New harness guidance',
    description: 'Updated `guide/core/agent-harness.md` and `guide/workflows/monitor-event-delegation.md`.',
  })

  assert.deepEqual(links, [
    { label: 'Agent Harness', href: '/guide/agent-harness/' },
    { label: 'Monitor Event Delegation', href: '/guide/workflows/monitor-event-delegation/' },
  ])
})

test('expands compact brace notation into public guide links', async () => {
  const { guideChangelogItemLinks } = await import('./../utils/guide-changelog.ts')
  const links = guideChangelogItemLinks({
    title: 'Agent engineering references',
    description: 'Updated `guide/core/{agent-harness.md,loop-graph-engineering.md}`.',
  })

  assert.deepEqual(links, [
    { label: 'Agent Harness', href: '/guide/agent-harness/' },
    { label: 'Loop Graph Engineering', href: '/guide/loop-graph-engineering/' },
  ])
})

test('links landing page source files to distinct public routes', async () => {
  const { guideChangelogItemLinks } = await import('./../utils/guide-changelog.ts')
  const links = guideChangelogItemLinks({
    title: 'Landing copy corrected',
    description: 'Updated `src/pages/faq/index.astro`, `src/pages/compare/index.astro`, and `src/pages/compare/[slug].astro`.',
  })

  assert.deepEqual(links, [
    { label: 'FAQ', href: '/faq/' },
    { label: 'Comparisons', href: '/compare/' },
  ])
})

test('keeps guide and landing destinations distinct and skips missing guide files', async () => {
  const { guideChangelogItemLinks } = await import('./../utils/guide-changelog.ts')
  const publishedGuidePaths = new Set([
    'guide/core/memory-systems.md',
    'guide/diagrams/07-multi-agent-patterns.md',
  ])
  const links = guideChangelogItemLinks({
    title: 'Memory and diagrams refreshed',
    description: 'Updated `guide/core/memory-systems.md`, `src/pages/memory-systems/index.astro`, `guide/diagrams/07-multi-agent-patterns.md`, and the example `guide/foo.md`.',
  }, publishedGuidePaths)

  assert.deepEqual(links, [
    { label: 'Memory Systems', href: '/guide/memory-systems/' },
    { label: 'Memory Systems Overview', href: '/memory-systems/' },
    { label: '07 Multi Agent Patterns', href: '/diagrams/#multi-agent' },
  ])
})

test('uses the canonical landing route for the context engineering guide', async () => {
  const { guideChangelogItemLinks } = await import('./../utils/guide-changelog.ts')
  const links = guideChangelogItemLinks({
    title: 'Context engineering updated',
    description: 'Updated `guide/core/context-engineering.md`.',
  })

  assert.deepEqual(links, [
    { label: 'Context Engineering', href: '/context-engineering/' },
  ])
})

test('uses readable labels for guide index destinations', async () => {
  const { guideChangelogItemLinks } = await import('./../utils/guide-changelog.ts')
  const links = guideChangelogItemLinks({
    title: 'Guide indexes refreshed',
    description: 'Updated `guide/workflows/README.md`, `guide/diagrams/README.md`, and `guide/ultimate-guide.fr.md`.',
  })

  assert.deepEqual(links, [
    { label: 'Workflows', href: '/guide/workflows/' },
    { label: 'Diagrams', href: '/diagrams/' },
    { label: 'Ultimate Guide FR', href: '/guide/ultimate-guidefr/' },
  ])
})

test('recognizes annotated release headings and merges duplicate versions', async () => {
  const { parseGuideChangelog } = await import('./../utils/guide-changelog.ts')
  const releases = parseGuideChangelog(`# Changelog

## [3.39.1] - 2026-04-16 (2)

### Documentation

- **Release tracking**: updated.

## [3.39.1] - 2026-04-16

### Added

- **New guide**: published.
`)

  assert.equal(releases.length, 1)
  assert.equal(releases[0].version, '3.39.1')
  assert.equal(releases[0].sections.length, 2)
})

test('merges repeated section headings inside the same release', async () => {
  const { parseGuideChangelog } = await import('./../utils/guide-changelog.ts')
  const releases = parseGuideChangelog(`# Changelog

## [Unreleased]

### Added

- **First page**: published.

### Fixed

- **Broken link**: corrected.

### Added

- **Second page**: published.
`)

  assert.equal(releases[0].sections.length, 2)
  assert.equal(releases[0].sections[0].title, 'Added')
  assert.equal(releases[0].sections[0].items.length, 2)
})

test('fails closed on an unsupported release heading', async () => {
  const { parseGuideChangelog } = await import('./../utils/guide-changelog.ts')

  assert.throws(
    () => parseGuideChangelog('## [version-next] - someday'),
    /Unsupported changelog release heading/,
  )
})

test('removes the inactive guide changelog loader from the Claude Code releases page', () => {
  const releasesPage = readFileSync(resolve(ROOT, 'src/pages/releases/index.astro'), 'utf8')

  assert.doesNotMatch(releasesPage, /function parseChangelog/)
  assert.doesNotMatch(releasesPage, /loadChangelog\(\)/)
  assert.doesNotMatch(releasesPage, /getElementById\('changelog-container'\)/)
})
