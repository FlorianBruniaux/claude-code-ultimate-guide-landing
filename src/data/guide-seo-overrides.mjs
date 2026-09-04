export const GUIDE_SEO_OVERRIDES = {
  'guide/core/architecture.md': {
    title: 'Claude Code Architecture: Agent Loop & Tools',
    description: 'How Claude Code runs its model-tool loop, manages context, executes tools, and isolates subagents, with sourced architecture notes.',
  },
  'guide/core/agent-harness.md': {
    title: 'Claude Code Agent Harness: Architecture & Evaluation',
    description: 'Design and evaluate the context, policy, tool, verification, observability, and recovery layers around Claude Code agents.',
  },
  'guide/security/data-privacy.md': {
    title: 'Claude Code Privacy: Data Usage & Retention',
    description: 'What Claude Code sends to Anthropic, retention by plan, training controls, MCP exposure, and safeguards for sensitive data.',
  },
  'guide/core/hooks-events-reference.md': {
    title: 'Claude Code Hooks: 30 Events, Matchers & Schemas',
    description: 'Reference for 30 Claude Code hook events, matcher fields, input schemas, decision control, timeouts, and copyable JSON examples.',
  },
  'guide/ecosystem/third-party-tools.md': {
    title: 'Claude Code Tools: RTK, ccusage, GUIs & More',
    description: 'Compare Claude Code GUIs, TUIs, configuration managers, token trackers, RTK, lean-ctx, ccusage, and other community tools.',
  },
}

import { getContextualLink } from './seo-editorial-contract.mjs'

function replaceFrontmatterField(frontmatter, field, value) {
  const line = `${field}: ${JSON.stringify(value)}`
  const fieldPattern = new RegExp(`^${field}:.*(?:\\r?\\n|$)`, 'm')

  if (fieldPattern.test(frontmatter)) {
    return frontmatter.replace(fieldPattern, `${line}\n`)
  }

  return `${frontmatter}${frontmatter ? '\n' : ''}${line}`
}

function removeLeadingDocumentH1(content) {
  const frontmatterMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---/)
  if (!frontmatterMatch) return content

  const frontmatter = frontmatterMatch[0]
  const body = content.slice(frontmatter.length)
  const withoutH1 = body.replace(/^(?:\r?\n[ \t]*)*# [^\r\n]+(?:\r?\n)?/, '')

  return `${frontmatter}${withoutH1}`
}

export function transformGuideMarkdown(content, sourcePath) {
  const override = GUIDE_SEO_OVERRIDES[sourcePath]
  let transformed = content

  if (override) {
    transformed = transformed.replace(/^---\r?\n([\s\S]*?)\r?\n---/, (match, frontmatter) => {
      const withTitle = replaceFrontmatterField(frontmatter, 'title', override.title)
      const withDescription = replaceFrontmatterField(withTitle, 'description', override.description)
      return `---\n${withDescription}\n---`
    })
  }

  const withoutLeadingH1 = removeLeadingDocumentH1(transformed)
  if (sourcePath !== 'guide/core/hooks-events-reference.md') return withoutLeadingH1

  const hooksRecap = getContextualLink('/cheatsheets/m11-hooks-evenements-systeme/')
  return `${withoutLeadingH1}\n\n## Related material\n\n[${hooksRecap.anchor}](${hooksRecap.target})\n`
}

export function canonicalGuidePageUrl(relPath) {
  const normalized = relPath.replace(/\\/g, '/')
  if (normalized === 'claude-code-releases.md') return '/releases/'

  return `/guide/${normalized.replace(/\.md$/, '')}/`
}
