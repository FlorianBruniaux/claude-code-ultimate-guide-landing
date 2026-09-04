import assert from 'node:assert/strict'
import test from 'node:test'

import {
  canonicalGuidePageUrl,
  GUIDE_SEO_OVERRIDES,
  transformGuideMarkdown,
} from './guide-seo-overrides.mjs'

test('removes only the leading document H1 after frontmatter', () => {
  const result = transformGuideMarkdown(
    '---\ntitle: Old\n---\n\n# Old\n\nIntro\n\n## Keep',
    'guide/core/architecture.md',
  )

  assert.doesNotMatch(result, /^# Old$/m)
  assert.match(result, /^## Keep$/m)
})

test('applies bounded metadata for audited guide pages', () => {
  for (const override of Object.values(GUIDE_SEO_OVERRIDES)) {
    assert.ok(override.title.length >= 30 && override.title.length <= 60)
    assert.ok(override.description.length >= 50 && override.description.length <= 160)
  }
})

test('canonicalizes the legacy release document', () => {
  assert.equal(canonicalGuidePageUrl('claude-code-releases.md'), '/releases/')
})

test('keeps headings inside code fences and later H1 examples intact', () => {
  const fixture = '---\ntitle: Page\n---\n\n# Page\n\n```md\n# Example\n```\n\n# Later example'
  const result = transformGuideMarkdown(fixture, 'guide/core/architecture.md')

  assert.match(result, /```md\n# Example\n```/)
  assert.match(result, /# Later example/)
})

test('removes the leading H1 from a workflow page without an SEO override', () => {
  const result = transformGuideMarkdown(
    '---\ntitle: Workflow\ndescription: Example\n---\n\n# Workflow\n\n## Steps',
    'guide/workflows/tdd-with-claude.md',
  )

  assert.doesNotMatch(result, /^# Workflow$/m)
  assert.match(result, /^## Steps$/m)
})
