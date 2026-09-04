import assert from 'node:assert/strict'
import test from 'node:test'

import {
  contextualLinks,
  landingSeo,
  releaseDateToIsoDate,
} from './seo-editorial-contract.mjs'
import * as seoEditorialContract from './seo-editorial-contract.mjs'

test('keeps the audited landing snippets within search-result limits', () => {
  assert.deepEqual(landingSeo, {
    releases: {
      title: 'Claude Code Version History & Latest Release',
      description: 'Current Claude Code version, release date, version history, changelog, breaking changes, environment variables, and config flags.',
    },
    glossary: {
      title: 'Claude Code Glossary: Terms & Definitions',
      description: 'Definitions for Claude Code commands, agents, hooks, MCP, context, permissions, workflows, and related terminology.',
    },
    contextEngineering: {
      title: 'Context Engineering Tools for Claude Code',
      description: 'Compare RTK, lean-ctx, LLMLingua, gateways, RAG, caching, and observability tools for reducing and managing LLM context.',
    },
  })

  for (const snippet of Object.values(landingSeo)) {
    assert.ok(snippet.title.length >= 30 && snippet.title.length <= 60)
    assert.ok(snippet.description.length >= 50 && snippet.description.length <= 160)
  }
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
  assert.equal(seoEditorialContract.LATEST_CLAUDE_CODE_RELEASE_DATE, 'Aug 31, 2026')
  assert.equal(seoEditorialContract.LATEST_CLAUDE_CODE_RELEASE_DATE_ISO, '2026-08-31')
})
