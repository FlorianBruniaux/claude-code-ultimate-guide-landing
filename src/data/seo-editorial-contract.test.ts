import assert from 'node:assert/strict'
import test from 'node:test'

import {
  contextualLinks,
  getReleaseTitle,
  landingSeo,
  releaseDateToIsoDate,
} from './seo-editorial-contract.mjs'
import * as seoEditorialContract from './seo-editorial-contract.mjs'
import { releases } from './releases.ts'

test('keeps the audited landing snippets within search-result limits', () => {
  assert.deepEqual(landingSeo, {
    releases: {
      title: 'Claude Code Latest Version {version} | Release History',
      description: 'Current Claude Code version, release date, version history, changelog, breaking changes, environment variables, and config flags.',
    },
    glossary: {
      title: 'Claude Code Glossary: Terms & Definitions',
      description: 'Definitions for Claude Code commands, agents, hooks, MCP, context, permissions, workflows, and related terminology.',
    },
    contextEngineering: {
      title: 'Context Engineering Tools for Claude Code',
      description: 'Compare context tools and govern Claude Code skills with usage evidence, review gates, safe retirement, and explicit ownership.',
    },
  })

  for (const [route, snippet] of Object.entries(landingSeo)) {
    const title = route === 'releases' ? getReleaseTitle(releases[0].version) : snippet.title
    assert.ok(title.length >= 30 && title.length <= 60)
    assert.ok(snippet.description.length >= 50 && snippet.description.length <= 160)
  }
})

test('uses the displayed current release in the releases search title', () => {
  assert.equal(getReleaseTitle(releases[0].version), `Claude Code Latest Version ${releases[0].version} | Release History`)
  assert.equal(getReleaseTitle('v9.9.9'), 'Claude Code Latest Version v9.9.9 | Release History')
})

test('defines six contextual links with descriptive anchors outside global chrome', () => {
  const targets = new Set([
    '/guide/workflows/code-review/',
    '/compare/claude-code-vs-windsurf/',
    '/compare/claude-code-vs-aider/',
    '/cheatsheets/t04-permissions-glob-patterns/',
    '/cheatsheets/t06-settings-json/',
    '/cheatsheets/m11-hooks-evenements-systeme/',
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
  assert.equal(seoEditorialContract.LATEST_CLAUDE_CODE_RELEASE_DATE, 'Sep 29, 2026')
  assert.equal(seoEditorialContract.LATEST_CLAUDE_CODE_RELEASE_DATE_ISO, '2026-09-29')
})
