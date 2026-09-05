export const landingSeo = {
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
    description: 'Compare context tools and govern Claude Code skills with usage evidence, review gates, safe retirement, and explicit ownership.',
  },
}

export const contextualLinks = [
  {
    sourceRoute: '/guide/',
    target: '/guide/workflows/code-review/',
    anchor: 'Review code with a repeatable multi-provider workflow',
    placement: 'workflow section',
  },
  {
    sourceRoute: '/compare/',
    target: '/compare/claude-code-vs-windsurf/',
    anchor: 'Compare Claude Code with Windsurf',
    placement: 'direct comparison intro',
  },
  {
    sourceRoute: '/compare/',
    target: '/compare/claude-code-vs-aider/',
    anchor: 'Compare Claude Code with Aider',
    placement: 'direct comparison intro',
  },
  {
    sourceRoute: '/security/hardening/',
    target: '/cheatsheets/t04-permissions-glob-patterns/',
    anchor: 'Check permission glob patterns',
    placement: 'permissions section',
  },
  {
    sourceRoute: '/claude-md-best-practices/',
    target: '/cheatsheets/t06-settings-json/',
    anchor: 'Review the settings.json reference card',
    placement: 'hierarchy section',
  },
  {
    sourceRoute: '/guide/hooks-events-reference/',
    target: '/cheatsheets/m11-hooks-evenements-systeme/',
    anchor: 'Use the hooks and events recap card',
    placement: 'generated related material appendix',
  },
]

export function getContextualLink(target) {
  const link = contextualLinks.find((candidate) => candidate.target === target)
  if (!link) throw new Error(`Missing contextual link for ${target}`)
  return link
}

export function releaseDateToIsoDate(releaseDate) {
  const match = releaseDate.match(/^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/)
  if (!match) throw new Error(`Invalid release date: ${releaseDate}`)

  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  }
  const [, month, day, year] = match
  const monthNumber = months[month]
  if (!monthNumber) throw new Error(`Invalid release month: ${month}`)

  return `${year}-${monthNumber}-${day.padStart(2, '0')}`
}

export const LATEST_CLAUDE_CODE_RELEASE_DATE = 'Sep 4, 2026'
export const LATEST_CLAUDE_CODE_RELEASE_DATE_ISO = releaseDateToIsoDate(LATEST_CLAUDE_CODE_RELEASE_DATE)
