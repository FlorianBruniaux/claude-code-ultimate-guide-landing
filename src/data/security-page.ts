import { AGENTSEC_FEED, AGENTSEC_SECURITY_VIEW, type AgentSecEventCard } from './agentsec-security-feed.ts'
import { SECURITY_DATA, type Campaign, type CveEntry, type MaliciousSkill, type SecuritySource } from './security-data.ts'

export type SecurityRouteId = 'hub' | 'threats' | 'cves' | 'sandbox' | 'hardening'

export interface SecurityRoute {
  id: SecurityRouteId
  href: string
  title: string
  description: string
  eyebrow: string
  heading: string
  summary: string
}

export interface SecurityCveRow extends CveEntry {
  fixedInLabel: string
  searchText: string
}

export interface SecurityThreatRow {
  id: string
  type: 'skill' | 'author' | 'campaign' | 'event'
  title: string
  summary: string
  date?: string
  risk?: string
  source?: string
  searchText: string
}

export interface SecurityChecklistGroup {
  id: string
  title: string
  items: readonly string[]
}

export const SECURITY_ROUTES: readonly SecurityRoute[] = [
  {
    id: 'hub',
    href: '/security/',
    title: 'AI Agent Security for Claude Code | Claude Code Guide',
    description: 'Check a repository with AgentSec, review current Claude Code security risks, and choose a focused path for threats, CVEs, sandboxing, or hardening.',
    eyebrow: 'Security hub',
    heading: 'Secure Claude Code and AI Agents',
    summary: 'Start with a local repository check, review current evidence, then follow the security path that matches your task.',
  },
  {
    id: 'threats',
    href: '/security/threats/',
    title: 'AI Agent Threat Intelligence | Claude Code Guide',
    description: 'Review attack techniques, malicious skills, active campaigns, and sourced AgentSec intelligence affecting Claude Code and AI coding agents.',
    eyebrow: 'Threat intelligence',
    heading: 'AI Agent Threat Intelligence',
    summary: 'Understand how current attacks work, which ecosystems they affect, and which evidence supports each record.',
  },
  {
    id: 'cves',
    href: '/security/cves/',
    title: 'Claude Code CVE Database | Claude Code Guide',
    description: 'Search tracked Claude Code and MCP vulnerabilities by CVE, component, severity, mitigation, and known fixed version.',
    eyebrow: 'Vulnerability database',
    heading: 'Claude Code CVE Database',
    summary: 'Check whether a component is affected, inspect the primary source, and find the documented remediation.',
  },
  {
    id: 'sandbox',
    href: '/security/sandbox/',
    title: 'Claude Code Sandbox Security | Claude Code Guide',
    description: 'Compare Claude Code isolation modes, avoid common sandbox failures, and verify a configuration with copyable examples.',
    eyebrow: 'Isolation guide',
    heading: 'Configure the Claude Code Sandbox',
    summary: 'Choose an isolation boundary, understand what it excludes, and verify the controls before running an agent.',
  },
  {
    id: 'hardening',
    href: '/security/hardening/',
    title: 'Claude Code Security Hardening | Claude Code Guide',
    description: 'Apply five-minute, workstation, and team security controls with Claude Code commands, defense tools, permissions, hooks, and checklists.',
    eyebrow: 'Defensive baseline',
    heading: 'Harden Claude Code',
    summary: 'Reduce immediate risk, strengthen a workstation, and establish repeatable controls for a development team.',
  },
]

export const SECURITY_HISTORICAL_ANCHORS = [
  'security-stats',
  'agentsec-triage',
  'attack-techniques',
  'cve-database',
  'agentsec-intelligence',
  'active-campaigns',
  'threat-database',
  'the-sandbox',
  'defense-tools',
  'built-in-security-commands',
  'security-checklist',
  'security-sources',
] as const

export const SECURITY_CONTENT_MIGRATION = {
  'security-stats': '/security/',
  'agentsec-triage': '/security/',
  'attack-techniques': '/security/threats/#attack-techniques',
  'cve-database': '/security/cves/#cve-database',
  'agentsec-intelligence': '/security/threats/#agentsec-intelligence',
  'active-campaigns': '/security/threats/#active-campaigns',
  'threat-database': '/security/threats/#threat-database',
  'the-sandbox': '/security/sandbox/#the-sandbox',
  'defense-tools': '/security/hardening/#defense-tools',
  'built-in-security-commands': '/security/hardening/#built-in-security-commands',
  'security-checklist': '/security/hardening/#security-checklist',
  'security-sources': '/security/threats/#security-sources',
} as const

export const SECURITY_CHECKLIST_GROUPS: readonly SecurityChecklistGroup[] = [
  {
    id: 'repository',
    title: 'Repository',
    items: [
      'Review CLAUDE.md, rules, hooks, skills, and MCP configuration before trusting the project.',
      'Run AgentSec locally and inspect every finding before changing the repository.',
      'Keep credentials outside tracked files and rotate any secret that may have been exposed.',
    ],
  },
  {
    id: 'runtime',
    title: 'Runtime',
    items: [
      'Start with restricted permissions and grant tools only for the current task.',
      'Use sandboxing as one control, not as the only boundary around untrusted input.',
      'Keep network access, filesystem writes, and shell execution separately reviewable.',
    ],
  },
  {
    id: 'team',
    title: 'Team controls',
    items: [
      'Pin reviewed dependencies and define an owner for agent configuration changes.',
      'Require human review for security-sensitive changes and generated workflows.',
      'Re-run checks after upgrades, new MCP servers, and changes to hooks or skills.',
    ],
  },
]

export function getSecurityRoute(id: SecurityRouteId): SecurityRoute {
  const route = SECURITY_ROUTES.find((item) => item.id === id)
  if (!route) throw new TypeError(`Unknown security route: ${id}`)
  return route
}

export function getLatestSecurityEvents(limit: number): readonly AgentSecEventCard[] {
  return [...AGENTSEC_SECURITY_VIEW.events]
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, Math.max(0, limit))
}

export function filterCves(query: string, severities: ReadonlySet<string>): readonly SecurityCveRow[] {
  const needle = query.trim().toLowerCase()
  const cveDatabase: readonly CveEntry[] = SECURITY_DATA.cve_database
  return cveDatabase
    .map((item) => ({
      ...item,
      fixedInLabel: item.fixed_in ?? 'Unknown',
      searchText: [item.id, item.component, item.severity, item.description, item.mitigation, item.source]
        .join(' ')
        .toLowerCase(),
    }))
    .filter((item) => (severities.size === 0 || severities.has(item.severity.toLowerCase())))
    .filter((item) => needle.length === 0 || item.searchText.includes(needle))
}

function createThreatRecords(): SecurityThreatRow[] {
  const maliciousSkills: readonly MaliciousSkill[] = SECURITY_DATA.malicious_skills
  const campaignRecords: readonly Campaign[] = SECURITY_DATA.campaigns
  const skills = maliciousSkills.map((item, index) => ({
    id: `skill-${index}-${item.name}`,
    type: 'skill' as const,
    title: item.name,
    summary: item.notes ?? `${item.type} record from ${item.source}`,
    risk: item.risk,
    source: item.source,
    searchText: [item.name, item.type, item.category, item.platform, item.source, item.notes].filter(Boolean).join(' ').toLowerCase(),
  }))
  const authors = SECURITY_DATA.malicious_authors.map((item, index) => ({
    id: `author-${index}-${item.name}`,
    type: 'author' as const,
    title: item.name,
    summary: item.notes,
    risk: item.risk,
    source: item.source,
    searchText: [item.name, item.source, item.risk, item.notes].join(' ').toLowerCase(),
  }))
  const campaigns = campaignRecords.map((item, index) => ({
    id: `campaign-${index}-${item.name}`,
    type: 'campaign' as const,
    title: item.name,
    summary: [item.malware, item.technique, item.platform, ...(item.platforms ?? [])].filter(Boolean).join(' · ') || `Campaign reported by ${item.source}`,
    date: item.date,
    source: item.source,
    searchText: JSON.stringify(item).toLowerCase(),
  }))
  const events = AGENTSEC_SECURITY_VIEW.events.map((item) => ({
    id: `event-${item.id}`,
    type: 'event' as const,
    title: item.title,
    summary: item.summary,
    date: item.date,
    source: item.sources.map((source) => source.publisher).join(', '),
    searchText: [item.title, item.summary, item.event_type, item.ecosystems.join(' ')].join(' ').toLowerCase(),
  }))
  return [...events, ...campaigns, ...authors, ...skills]
}

export const SECURITY_THREAT_RECORDS = createThreatRecords()

export function filterThreatRecords(query: string, types: ReadonlySet<string>): readonly SecurityThreatRow[] {
  const needle = query.trim().toLowerCase()
  return SECURITY_THREAT_RECORDS
    .filter((item) => types.size === 0 || types.has(item.type))
    .filter((item) => needle.length === 0 || item.searchText.includes(needle))
}

export function getSecuritySources(sourceNames: readonly string[]): readonly SecuritySource[] {
  if (sourceNames.length === 0) return SECURITY_DATA.sources
  const needles = sourceNames.map((name) => name.toLowerCase())
  return SECURITY_DATA.sources.filter((source) =>
    needles.some((needle) => source.name.toLowerCase().includes(needle) || needle.includes(source.name.toLowerCase())),
  )
}

export const SECURITY_FEED = AGENTSEC_FEED
export const SECURITY_VIEW = AGENTSEC_SECURITY_VIEW
