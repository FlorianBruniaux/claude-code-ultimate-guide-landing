import assert from 'node:assert/strict'
import test from 'node:test'

import {
  contextualLinks,
  getGlossaryTitle,
  getReleaseDescription,
  getReleaseTitle,
  landingSeo,
  releaseDateToIsoDate,
} from './seo-editorial-contract.mjs'
import * as seoEditorialContract from './seo-editorial-contract.mjs'
import { releases } from './releases.ts'
import { glossaryTerms } from './glossary-data.ts'

test('keeps the audited landing snippets within search-result limits', () => {
  assert.deepEqual(landingSeo, {
    releases: {
      title: 'Claude Code Latest Version {version} | Release History',
      description: 'Claude Code {version}, released {date}. See the latest version, release history, changelog, breaking changes, and configuration updates.',
    },
    glossary: {
      title: 'Claude Code Glossary: {count} Terms & Definitions',
      description: 'Definitions for Claude Code commands, agents, hooks, MCP, context, permissions, workflows, and related terminology.',
    },
    contextEngineering: {
      title: 'Context Engineering Tools for Claude Code',
      description: 'Compare context tools and govern Claude Code skills with usage evidence, review gates, safe retirement, and explicit ownership.',
    },
  })

  for (const [route, snippet] of Object.entries(landingSeo)) {
    const title = route === 'releases'
      ? getReleaseTitle(releases[0].version)
      : route === 'glossary'
        ? getGlossaryTitle(glossaryTerms.length)
        : snippet.title
    assert.ok(title.length >= 30 && title.length <= 60)
    assert.ok(snippet.description.length >= 50 && snippet.description.length <= 160)
  }
})

test('states the glossary size in its search title', () => {
  assert.equal(getGlossaryTitle(179), 'Claude Code Glossary: 179 Terms & Definitions')
  assert.equal(getGlossaryTitle(glossaryTerms.length), `Claude Code Glossary: ${glossaryTerms.length} Terms & Definitions`)
})

test('uses the displayed current release in the releases search title', () => {
  assert.equal(getReleaseTitle(releases[0].version), `Claude Code Latest Version ${releases[0].version} | Release History`)
  assert.equal(getReleaseTitle('v9.9.9'), 'Claude Code Latest Version v9.9.9 | Release History')
})

test('answers current-version queries with the same version and date displayed on the release page', () => {
  assert.equal(
    getReleaseDescription('v2.1.111', 'Oct 3, 2026'),
    'Claude Code v2.1.111, released Oct 3, 2026. See the latest version, release history, changelog, breaking changes, and configuration updates.',
  )
  assert.match(getReleaseDescription('v9.9.9', 'Jan 2, 2027'), /^Claude Code v9\.9\.9, released Jan 2, 2027\./)
  assert.ok(getReleaseDescription(releases[0].version, releases[0].date).length <= 160)
})

test('defines nine contextual links with descriptive anchors outside global chrome', () => {
  const targets = new Set([
    '/guide/workflows/code-review/',
    '/compare/claude-code-vs-windsurf/',
    '/compare/claude-code-vs-aider/',
    '/cheatsheets/t04-permissions-glob-patterns/',
    '/cheatsheets/t06-settings-json/',
    '/cheatsheets/m11-hooks-evenements-systeme/',
    '/compare/claude-code-vs-cursor/',
    '/methodologies/',
    '/cheatsheets/t03-permission-modes/',
  ])

  assert.deepEqual(new Set(contextualLinks.map((link) => link.target)), targets)

  for (const link of contextualLinks) {
    assert.ok(link.sourceRoute.length > 0)
    assert.ok(link.anchor.trim().split(/\s+/).length >= 3)
    assert.doesNotMatch(link.placement, /(?:footer|global-header)/i)
  }
})

test('derives release schema dates from release data without a build clock', () => {
  assert.equal(releaseDateToIsoDate('Aug 31, 2026'), '2026-08-31')
})

test('shares one stable latest release date with release content and sitemap output', () => {
  assert.equal(seoEditorialContract.LATEST_CLAUDE_CODE_RELEASE_DATE, 'Oct 31, 2026')
  assert.equal(seoEditorialContract.LATEST_CLAUDE_CODE_RELEASE_DATE_ISO, '2026-10-31')
})
