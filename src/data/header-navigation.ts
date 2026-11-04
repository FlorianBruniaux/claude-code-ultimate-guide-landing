import { guideHighlights } from './guide-navigation.mjs'
import type { EcosystemMenuId } from './ecosystem-discovery'

export interface HeaderNavigationLink {
  href: string
  label: string
  description: string
  external?: boolean
  rss?: boolean
}

export interface HeaderNavigationGroup {
  label: string
  links: HeaderNavigationLink[]
}

export type HeaderNavigationSectionId = 'start' | 'build' | 'scale' | 'security' | 'resources'
export type HeaderNavigationId = HeaderNavigationSectionId | 'guide'

/**
 * One mega-menu panel. Every panel follows the same template, top to bottom:
 * header (with the optional overview link), project strip, four Essentials
 * cards on one row, then the Go further groups laid out on four columns.
 */
export interface HeaderNavigationSection {
  id: HeaderNavigationSectionId
  label: string
  description: string
  overview?: {
    href: string
    label: string
  }
  essentials: HeaderNavigationLink[]
  groups: HeaderNavigationGroup[]
  projects?: EcosystemMenuId
}

export type HeaderActionSurface = 'navigation'

interface HeaderActionLink {
  href: string
  label: string
  external: boolean
  surfaces: HeaderActionSurface[]
}

const headerActionLinks: HeaderActionLink[] = [
  {
    href: 'https://www.florian.bruniaux.com/sponsor/',
    label: 'Sponsor',
    external: true,
    surfaces: ['navigation'],
  },
]

export function getHeaderActionLinks(surface: HeaderActionSurface) {
  return headerActionLinks
    .filter((link) => link.surfaces.includes(surface))
    .map(({ surfaces: _surfaces, ...link }) => link)
}

/** Guide is a direct link in the bar: the complete guide has its own map. */
export const guideNavigationLink = {
  id: 'guide',
  href: '/guide/',
  label: 'Guide',
  description: 'Browse the complete guide, chapter by chapter.',
} as const

/** Whole-site map, reachable from the bar and from every panel. */
export const allPagesLink = {
  href: '/sitemap/',
  label: 'All pages',
} as const

const guideHighlightsByHref = new Map(
  guideHighlights.map((highlight) => [highlight.href, highlight]),
)

// Guide highlights come from the synced guide: a page that disappears upstream
// drops out of the menu instead of breaking the build.
function guideHighlightLinks(hrefs: string[]): HeaderNavigationLink[] {
  return hrefs.flatMap((href) => {
    const highlight = guideHighlightsByHref.get(href)
    return highlight ? [{ href, label: highlight.title, description: highlight.desc }] : []
  })
}

export const latestGuideReferenceHrefs = [
  '/guide/mistral-large-4/',
  '/guide/translations/',
  '/guide/agent-harness-landscape/',
  '/guide/practitioner-insights/',
]

/** Newest guide reference pages, shown in Resources and on the homepage. */
export function getLatestGuideReferenceLinks(): HeaderNavigationLink[] {
  return guideHighlightLinks(latestGuideReferenceHrefs)
}

export const newGuideWorkflowHrefs = [
  '/guide/workflows/monitor-event-delegation/',
  '/guide/workflows/agentic-software-factories/',
  '/guide/workflows/team-ai-instructions/',
]

export const navigationSections: HeaderNavigationSection[] = [
  {
    id: 'start',
    label: 'Start',
    description: 'Learn Claude Code and choose the path that fits your role.',
    essentials: [
      { href: '/guide/ultimate-guide/01-quick-start/', label: 'Quick Start', description: 'Install Claude Code and complete a first task.' },
      { href: '/learning/', label: 'Learning Paths', description: 'Follow a structured path from first use to team practice.' },
      { href: '/quiz/', label: 'Knowledge Quiz', description: 'Test your knowledge across tools, workflows, and safety.' },
      { href: '/roles/', label: 'AI Roles', description: 'Find the responsibilities and skills closest to your work.' },
    ],
    groups: [
      {
        label: 'By role',
        links: [
          { href: '/guide/for-product-managers/', label: 'Product Managers', description: 'Use specs, prototypes, and review without losing product judgment.' },
          { href: '/guide/for-tech-leads/', label: 'Tech Leads', description: 'Standardize configuration, review, and team rollout.' },
          { href: '/guide/for-cto/', label: 'CTOs', description: 'Frame the business case, controls, and adoption signals.' },
          { href: '/guide/for-cio-ceo/', label: 'CIOs & CEOs', description: 'Read the executive brief and decision boundaries.' },
          { href: '/learning/#security-practitioner', label: 'Security practitioners', description: 'Check cyber access first, then scan, isolate, and scope tests.' },
        ],
      },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    description: 'Engineer agents, context, workflows, and tool integrations.',
    essentials: [
      { href: '/guide/workflows/', label: 'Workflows', description: 'Use runnable patterns for planning, delivery, and delegation.' },
      { href: '/guide/loop-graph-engineering/', label: 'Agent Engineering', description: 'Design bounded loops, graphs, checkpoints, and recovery.' },
      { href: '/context-engineering/', label: 'Context Engineering Tools', description: 'Compare compression, RAG, gateways, and LLMOps tools.' },
      { href: '/claude-md-best-practices/', label: 'CLAUDE.md Best Practices', description: 'Structure durable project instructions and boundaries.' },
    ],
    groups: [
      {
        label: 'Engineering',
        links: [
          { href: '/ai-design-patterns/', label: 'AI Design Patterns', description: 'Map GoF and resilience patterns onto hooks, subagents, and limits.' },
          { href: '/context/', label: 'Context Configurator', description: 'Choose a context strategy for your repository and task.' },
          { href: '/memory-systems/', label: 'Memory Systems', description: 'Choose native, cross-session, or team-shared memory.' },
          { href: '/methodologies/', label: 'Methodologies', description: 'Select a disciplined AI-assisted development approach.' },
        ],
      },
      {
        label: 'MCP & tools',
        links: [
          { href: '/mcp/', label: 'Claude Code Guide MCP Server', description: 'Install and use the public guide MCP server.' },
          { href: '/guide/claude-code-guide-mcp/', label: 'MCP Technical Guide', description: 'Inspect architecture, privacy, tools, and troubleshooting.' },
          { href: '/mcp-or-cli/', label: 'MCP or CLI?', description: 'Get an interactive recommendation for your situation.' },
          { href: '/ecosystem/mcp-vs-cli/', label: 'MCP vs CLI Reference', description: 'Compare trade-offs and choose the smallest interface.' },
          { href: '/ecosystem/', label: 'Ecosystem', description: 'Explore complementary tools and multi-provider workflows.' },
          { href: '/compare/', label: 'AI Coding Tools Comparison', description: 'Compare Claude Code with other AI coding tools.' },
        ],
      },
      {
        label: 'New workflows',
        links: guideHighlightLinks(newGuideWorkflowHrefs),
      },
    ],
    projects: 'build',
  },
  {
    id: 'scale',
    label: 'Scale',
    description: 'Make agent systems reliable, governable, and sustainable.',
    essentials: [
      { href: '/guide/agent-harness/', label: 'Agent Harness Engineering', description: 'Build the control and verification layer around the model.' },
      { href: '/guide/adoption-approaches/', label: 'Team Adoption', description: 'Plan rollout, trust calibration, and shared practice.' },
      { href: '/guide/enterprise-governance/', label: 'Enterprise Governance', description: 'Define usage charters, approvals, and risk tiers.' },
      { href: '/finops/', label: 'AI FinOps', description: 'Cost regimes, levers, and dated market prices.' },
    ],
    groups: [
      {
        label: 'Reliability',
        links: [
          { href: '/guide/agent-evaluation/', label: 'Agent Evaluation', description: 'Measure quality, behavior, and regressions across runs.' },
          { href: '/guide/observability/', label: 'Observability', description: 'Trace reliability, failures, cost, and recovery.' },
        ],
      },
      {
        label: 'Organization & Economics',
        links: [
          { href: '/team-metrics/', label: 'Team Metrics', description: 'Measure outcomes without turning proxies into productivity.' },
          { href: '/lean-ai/', label: 'Lean and AI', description: 'Trace work from demand to accepted user outcome.' },
          { href: '/guide/team-knowledge-base/', label: 'Team Knowledge', description: 'Preserve and share operational context across teams.' },
          { href: '/token-savings/', label: 'Token-saving tools, measured', description: 'A catalogue of 45 tools, eight public benchmarks and 15 preprints.' },
          { href: '/guide/subscription-strategy/', label: 'Subscription Strategy', description: 'Choose seats, APIs, gateways, and provider portfolios.' },
          { href: '/guide/ai-unit-economics/', label: 'AI Unit Economics', description: 'Understand accepted-task cost and spend controls.' },
        ],
      },
    ],
    projects: 'scale',
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Know the attack surface of coding agents before it reaches production.',
    overview: {
      href: '/security/',
      label: 'Open the security hub',
    },
    essentials: [
      { href: '/security/threats/', label: 'Threat Intelligence', description: 'Attack techniques, malicious skills, and active campaigns affecting coding agents.' },
      { href: '/security/cves/', label: 'CVE Database', description: 'Search tracked Claude Code and MCP vulnerabilities by CVE, severity, and fixed version.' },
      { href: '/security/hardening/', label: 'Hardening', description: 'Five-minute, workstation, and team controls with permissions, hooks, and checklists.' },
      { href: '/security/sandbox/', label: 'Sandbox', description: 'Compare isolation modes, avoid common failures, and verify a configuration.' },
    ],
    groups: [
      {
        label: 'Guardrails',
        links: [
          { href: '/guide/production-safety/', label: 'Production Safety', description: 'Add guardrails, review gates, rollback, and resilience.' },
          { href: '/guide/data-privacy/', label: 'Data Privacy', description: 'Control sensitive data, retention, and access.' },
        ],
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    description: 'Choose the format that fits the task and depth you need.',
    essentials: [
      { href: '/downloads/', label: 'Offline Downloads', description: 'Get PDF and EPUB editions in English and French.' },
      { href: '/whitepapers/', label: 'Ebooks', description: 'Read long-form guides and research in PDF.' },
      { href: '/cheatsheet/', label: 'Cheat Sheet', description: 'Keep essential commands on one printable page.' },
      { href: '/examples/', label: 'Examples', description: 'Reuse production-ready agents, hooks, commands, and skills.' },
    ],
    groups: [
      {
        label: 'Reference',
        links: [
          { href: '/resources/', label: 'All Resources', description: 'Browse the curated resource hub.' },
          { href: '/cheatsheets/', label: 'Recap Cards', description: 'Use compact technical, methodology, and design cards.' },
          { href: '/diagrams/', label: 'Diagrams', description: 'Inspect visual maps of architectures and workflows.' },
          { href: '/glossary/', label: 'Glossary', description: 'Look up Claude Code and agent-engineering terminology.' },
          { href: '/faq/', label: 'FAQ', description: 'Find direct answers to recurring questions.' },
        ],
      },
      {
        label: 'Library',
        links: [
          { href: '/projects/', label: 'Related Projects', description: 'Explore open-source companion tools from the author.' },
          { href: 'https://www.florian.bruniaux.com/blog/', label: 'Blog', description: 'Read field notes and longer engineering articles.', external: true },
        ],
      },
      {
        label: "What's new",
        links: [
          { href: '/changelog/', label: 'Guide Changelog', description: 'See new pages, corrections, and major revisions.' },
          { href: '/releases/', label: 'Claude Code Releases', description: 'Track product changes and their operational impact.' },
          { href: '/rss.xml', label: 'RSS Feed', description: 'Follow updates in your preferred reader.', rss: true },
        ],
      },
      {
        label: 'Latest guide references',
        links: getLatestGuideReferenceLinks(),
      },
    ],
    projects: 'resources',
  },
]

/** Every link a panel exposes: overview, Essentials, then Go further. */
export function getSectionLinks(section: HeaderNavigationSection): HeaderNavigationLink[] {
  const overview = section.overview
    ? [{ href: section.overview.href, label: section.label, description: section.description }]
    : []
  return [...overview, ...section.essentials, ...section.groups.flatMap((group) => group.links)]
}

export function getSectionPageCount(section: HeaderNavigationSection) {
  return new Set(getSectionLinks(section).map((link) => link.href)).size
}

export const FURTHER_COLUMNS = 4

/**
 * Go further sits on four columns. Spare columns go to the longest group while
 * it holds more than 1.5 links per column, so no group grows into a tall
 * single column that would make the panel scroll.
 */
export function getFurtherSpans(groups: HeaderNavigationGroup[], columns = FURTHER_COLUMNS) {
  const spans = groups.map(() => 1)
  while (spans.reduce((total, span) => total + span, 0) < columns) {
    let best = -1
    let ratio = 1.5
    groups.forEach((group, index) => {
      const linksPerColumn = group.links.length / spans[index]
      if (linksPerColumn > ratio) {
        ratio = linksPerColumn
        best = index
      }
    })
    if (best < 0) break
    spans[best]++
  }
  return spans
}

function normalizePath(path: string) {
  const withoutQuery = path.split(/[?#]/, 1)[0] || '/'
  if (withoutQuery === '/') return '/'
  return `/${withoutQuery.replace(/^\/+|\/+$/g, '')}/`
}

/**
 * The section that owns a path: the longest matching menu link wins, so
 * /guide/workflows/x/ follows its own link before the /guide/workflows/ hub.
 */
export function getActiveNavigation(path: string): HeaderNavigationId | null {
  const currentPath = normalizePath(path)
  let best: HeaderNavigationSectionId | null = null
  let bestLength = -1

  for (const section of navigationSections) {
    for (const link of getSectionLinks(section)) {
      if (link.external || /^https?:/.test(link.href) || link.rss) continue
      const href = normalizePath(link.href)
      const matches = currentPath === href || currentPath.startsWith(href)
      if (matches && href.length > bestLength) {
        best = section.id
        bestLength = href.length
      }
    }
  }

  if (best) return best
  if (currentPath === '/guide/' || currentPath.startsWith('/guide/')) return 'guide'
  return null
}
