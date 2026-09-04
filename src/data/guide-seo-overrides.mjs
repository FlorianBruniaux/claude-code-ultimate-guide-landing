export const GUIDE_SEO_OVERRIDES = {
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

function normalizeDocumentH1s(content) {
  const frontmatterMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---/)
  if (!frontmatterMatch) return content

  const frontmatter = frontmatterMatch[0]
  const body = content.slice(frontmatter.length)
  const newline = body.includes('\r\n') ? '\r\n' : '\n'
  const lines = body.split(/\r?\n/)
  let firstDocumentH1Removed = false
  let demoteDocumentSubtree = false
  let fenceMarker = ''

  const normalizedLines = lines.flatMap((line) => {
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/)
    if (fenceMatch) {
      const marker = fenceMatch[1]
      if (!fenceMarker) fenceMarker = marker
      else if (marker[0] === fenceMarker[0] && marker.length >= fenceMarker.length && fenceMatch[2].trim() === '') fenceMarker = ''
      return [line]
    }

    if (fenceMarker) return [line]

    const headingMatch = line.match(/^( {0,3})(#{1,6})(\s+)/)
    if (!headingMatch) return [line]

    const [, indent, markers, spacing] = headingMatch
    if (markers.length === 1 && !firstDocumentH1Removed) {
      firstDocumentH1Removed = true
      return []
    }

    if (markers.length === 1) demoteDocumentSubtree = true
    if (!demoteDocumentSubtree) return [line]

    const shiftedMarkers = '#'.repeat(Math.min(markers.length + 1, 6))
    return [line.replace(/^( {0,3})#{1,6}(\s+)/, `${indent}${shiftedMarkers}${spacing}`)]
  })

  return `${frontmatter}${normalizedLines.join(newline)}`
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

  const withoutDocumentH1s = normalizeDocumentH1s(transformed)
  if (sourcePath !== 'guide/core/hooks-events-reference.md') return withoutDocumentH1s

  const hooksRecap = getContextualLink('/cheatsheets/m11-hooks-evenements-systeme/')
  return `${withoutDocumentH1s}\n\n## Related material\n\n[${hooksRecap.anchor}](${hooksRecap.target})\n`
}

export function canonicalGuidePageUrl(relPath) {
  const normalized = relPath.replace(/\\/g, '/')
  if (normalized === 'claude-code-releases.md') return '/releases/'

  return `/guide/${normalized.replace(/\.md$/, '')}/`
}
