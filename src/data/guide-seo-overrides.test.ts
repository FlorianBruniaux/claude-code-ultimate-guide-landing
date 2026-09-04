import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
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

test('uses the exact audited metadata values for guide pages', () => {
  assert.deepEqual(GUIDE_SEO_OVERRIDES, {
    'guide/core/architecture.md': {
      title: 'Claude Code Architecture & Agent Loop',
      description: 'How Claude Code runs its model-tool loop, manages context, executes tools, and isolates subagents, with sourced architecture notes.',
    },
    'guide/core/agent-harness.md': {
      title: 'Claude Code Agent Harness Engineering',
      description: 'Design and evaluate the context, policy, tool, verification, observability, and recovery layers around Claude Code agents.',
    },
    'guide/security/data-privacy.md': {
      title: 'Claude Code Privacy & Data Retention',
      description: 'What Claude Code sends to Anthropic, retention by plan, training controls, MCP exposure, and safeguards for sensitive data.',
    },
    'guide/core/hooks-events-reference.md': {
      title: 'Claude Code Hooks: 30 Event Reference',
      description: 'Reference for 30 Claude Code hook events, matcher fields, input schemas, decision control, timeouts, and copyable JSON examples.',
    },
    'guide/ecosystem/third-party-tools.md': {
      title: 'Claude Code Tools: RTK, ccusage & GUIs',
      description: 'Compare Claude Code GUIs, TUIs, configuration managers, token trackers, RTK, lean-ctx, ccusage, and other community tools.',
    },
  })

  for (const override of Object.values(GUIDE_SEO_OVERRIDES)) {
    assert.ok(override.title.length >= 30 && override.title.length <= 60)
    assert.ok(override.description.length >= 50 && override.description.length <= 160)
  }
})

test('canonicalizes the legacy release document', () => {
  assert.equal(canonicalGuidePageUrl('claude-code-releases.md'), '/releases/')
})

test('keeps fenced H1 examples and demotes later document H1 headings', () => {
  const fixture = '---\ntitle: Page\n---\n\n# Page\n\n```md\n# Example\n```\n\n# Later section'
  const result = transformGuideMarkdown(fixture, 'guide/core/architecture.md')

  assert.match(result, /```md\n# Example\n```/)
  assert.match(result, /^## Later section$/m)
  assert.doesNotMatch(result, /^# Later section$/m)
})

test('removes the leading H1 from a workflow page without an SEO override', () => {
  const result = transformGuideMarkdown(
    '---\ntitle: Workflow\ndescription: Example\n---\n\n# Workflow\n\n## Steps',
    'guide/workflows/tdd-with-claude.md',
  )

  assert.doesNotMatch(result, /^# Workflow$/m)
  assert.match(result, /^## Steps$/m)
})

test('appends the hooks recap card to the generated Hooks Events Reference', () => {
  const result = transformGuideMarkdown(
    '---\ntitle: Hooks\n---\n\n# Hooks\n\n## Events',
    'guide/core/hooks-events-reference.md',
  )

  assert.match(result, /\[Use the hooks and events recap card\]\(\/cheatsheets\/m11-hooks-evenements-systeme\/\)/)
})

test('removes the leading H1 across every generated Starlight content family', () => {
  const sourcePaths = [
    'guide/learning-path/02-core-loop.md',
    'docs/for-cto.md',
    'guide/ultimate-guide.md',
    'guide/ultimate-guide/index.md',
  ]

  for (const sourcePath of sourcePaths) {
    const result = transformGuideMarkdown(
      '---\ntitle: Page\n---\n\n# Page\n\n## Keep',
      sourcePath,
    )
    assert.doesNotMatch(result, /^# Page$/m, sourcePath)
    assert.match(result, /^## Keep$/m, sourcePath)
  }
})

test('invokes the transform for every generated Starlight content family', () => {
  const script = readFileSync(new URL('../../scripts/prepare-guide-content.mjs', import.meta.url), 'utf8')
  const sections = [
    script.slice(script.indexOf('const LEARNING_PATH_DIR'), script.indexOf('// 2.7 Audience pages')),
    script.slice(script.indexOf('const DOCS_DIR'), script.indexOf('// 3. Split ultimate-guide.md')),
    script.slice(script.indexOf('// Write chapter files'), script.indexOf('console.log(`[prepare-guide] ✓ Ultimate Guide chapters')),
    script.slice(script.indexOf('// Generate the ultimate-guide index page'), script.indexOf('// -----------------------------------------------------------------------\n// 4. Copy images')),
  ]

  for (const section of sections) {
    assert.match(section, /transformGuideMarkdown\(/)
  }
})
