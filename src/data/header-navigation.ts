import { guideHighlights } from './guide-navigation.mjs'

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

export interface HeaderNavigationSection {
  id: 'guide' | 'start' | 'build' | 'scale' | 'resources' | 'updates'
  label: string
  description: string
  overview?: {
    href: string
    label: string
  }
  groups: HeaderNavigationGroup[]
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

export const navigationSections: HeaderNavigationSection[] = [
  {
    id: 'start',
    label: 'Start',
    description: 'Learn Claude Code and choose the path that fits your role.',
    groups: [
      {
        label: 'Get started',
        links: [
          { href: '/guide/ultimate-guide/01-quick-start/', label: 'Quick Start', description: 'Install Claude Code and complete a first task.' },
          { href: '/learning/', label: 'Learning Paths', description: 'Follow a structured path from first use to team practice.' },
          { href: '/quiz/', label: 'Knowledge Quiz', description: 'Test your knowledge across tools, workflows, and safety.' },
          { href: '/roles/', label: 'AI Roles', description: 'Find the responsibilities and skills closest to your work.' },
        ],
      },
      {
        label: 'By role',
        links: [
          { href: '/guide/for-product-managers/', label: 'Product Managers', description: 'Use specs, prototypes, and review without losing product judgment.' },
          { href: '/guide/for-tech-leads/', label: 'Tech Leads', description: 'Standardize configuration, review, and team rollout.' },
          { href: '/guide/for-cto/', label: 'CTOs', description: 'Frame the business case, controls, and adoption signals.' },
          { href: '/guide/for-cio-ceo/', label: 'CIOs & CEOs', description: 'Read the executive brief and decision boundaries.' },
        ],
      },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    description: 'Engineer agents, context, workflows, and tool integrations.',
    groups: [
      {
        label: 'Engineering',
        links: [
          { href: '/guide/loop-graph-engineering/', label: 'Agent Engineering', description: 'Design bounded loops, graphs, checkpoints, and recovery.' },
          { href: '/context/', label: 'Context Configurator', description: 'Choose a context strategy for your repository and task.' },
          { href: '/context-engineering/', label: 'Context Engineering Tools', description: 'Compare compression, RAG, gateways, and LLMOps tools.' },
          { href: '/memory-systems/', label: 'Memory Systems', description: 'Choose native, cross-session, or team-shared memory.' },
          { href: '/guide/workflows/', label: 'Workflows', description: 'Use runnable patterns for planning, delivery, and delegation.' },
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
          { href: '/claude-md-best-practices/', label: 'CLAUDE.md Best Practices', description: 'Structure durable project instructions and boundaries.' },
          { href: '/compare/', label: 'AI Coding Tools Comparison', description: 'Compare Claude Code with other AI coding tools.' },
        ],
      },
    ],
  },
  {
    id: 'scale',
    label: 'Scale',
    description: 'Make agent systems reliable, governable, and sustainable.',
    groups: [
      {
        label: 'Reliability',
        links: [
          { href: '/security/', label: 'AI Agent Security', description: 'Assess threats, MCP risk, permissions, and defenses.' },
          { href: '/guide/agent-harness/', label: 'Agent Harness Engineering', description: 'Build the control and verification layer around the model.' },
          { href: '/guide/agent-evaluation/', label: 'Agent Evaluation', description: 'Measure quality, behavior, and regressions across runs.' },
          { href: '/guide/observability/', label: 'Observability', description: 'Trace reliability, failures, cost, and recovery.' },
          { href: '/guide/production-safety/', label: 'Production Safety', description: 'Add guardrails, review gates, rollback, and resilience.' },
          { href: '/guide/data-privacy/', label: 'Data Privacy', description: 'Control sensitive data, retention, and access.' },
        ],
      },
      {
        label: 'Organization & Economics',
        links: [
          { href: '/guide/enterprise-governance/', label: 'Enterprise Governance', description: 'Define usage charters, approvals, and risk tiers.' },
          { href: '/guide/adoption-approaches/', label: 'Team Adoption', description: 'Plan rollout, trust calibration, and shared practice.' },
          { href: '/team-metrics/', label: 'Team Metrics', description: 'Measure outcomes without turning proxies into productivity.' },
          { href: '/guide/team-knowledge-base/', label: 'Team Knowledge', description: 'Preserve and share operational context across teams.' },
          { href: '/guide/subscription-strategy/', label: 'Subscription Strategy', description: 'Choose seats, APIs, gateways, and provider portfolios.' },
          { href: '/guide/ai-unit-economics/', label: 'AI Unit Economics', description: 'Understand accepted-task cost and spend controls.' },
        ],
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    description: 'Choose the format that fits the task and depth you need.',
    groups: [
      {
        label: 'Reference',
        links: [
          { href: '/resources/', label: 'All Resources', description: 'Browse the curated resource hub.' },
          { href: '/cheatsheet/', label: 'Quick Reference', description: 'Keep essential commands on one printable page.' },
          { href: '/cheatsheets/', label: 'Cheat Sheets', description: 'Use compact technical, methodology, and design cards.' },
          { href: '/examples/', label: 'Examples', description: 'Reuse production-ready agents, hooks, commands, and skills.' },
          { href: '/diagrams/', label: 'Diagrams', description: 'Inspect visual maps of architectures and workflows.' },
          { href: '/glossary/', label: 'Glossary', description: 'Look up Claude Code and agent-engineering terminology.' },
        ],
      },
      {
        label: 'Library & projects',
        links: [
          { href: '/whitepapers/', label: 'Ebooks', description: 'Read long-form guides and research in PDF.' },
          { href: '/downloads/', label: 'Offline Downloads', description: 'Get PDF and EPUB editions in English and French.' },
          { href: '/faq/', label: 'FAQ', description: 'Find direct answers to recurring questions.' },
          { href: '/projects/', label: 'Related Projects', description: 'Explore open-source companion tools from the author.' },
          { href: 'https://www.florian.bruniaux.com/blog/', label: 'Blog', description: 'Read field notes and longer engineering articles.', external: true },
        ],
      },
    ],
  },
  {
    id: 'updates',
    label: 'Updates',
    description: 'Track guide changes and Claude Code releases separately.',
    groups: [
      {
        label: 'Follow changes',
        links: [
          { href: '/changelog/', label: 'Guide Changelog', description: 'See new pages, corrections, and major revisions.' },
          { href: '/releases/', label: 'Claude Code Releases', description: 'Track product changes and their operational impact.' },
          { href: '/rss.xml', label: 'RSS Feed', description: 'Follow updates in your preferred reader.', rss: true },
        ],
      },
    ],
  },
]

const occupiedNavigationHrefs = new Set(
  navigationSections.flatMap((section) =>
    section.groups.flatMap((group) => group.links.map((link) => link.href)),
  ),
)

const guideHighlightsByHref = new Map(
  guideHighlights.map((highlight) => [highlight.href, highlight]),
)

function selectGuideHighlights(hrefs: string[]): HeaderNavigationLink[] {
  return hrefs.flatMap((href) => {
    const highlight = guideHighlightsByHref.get(href)
    if (!highlight || occupiedNavigationHrefs.has(href)) return []
    return [{ href, label: highlight.title, description: highlight.desc }]
  })
}

export const guideNavigationSection = {
  id: 'guide',
  label: 'Guide',
  description: 'Browse the newest additions or open the complete documentation map.',
  overview: {
    href: '/guide/',
    label: 'Browse the complete guide',
  },
  groups: [
    {
      label: 'Latest references',
      links: selectGuideHighlights([
        '/guide/translations/',
        '/guide/agent-harness-landscape/',
        '/guide/practitioner-insights/',
      ]),
    },
    {
      label: 'New workflows',
      links: selectGuideHighlights([
        '/guide/workflows/monitor-event-delegation/',
        '/guide/workflows/agentic-software-factories/',
        '/guide/workflows/team-ai-instructions/',
      ]),
    },
  ],
} satisfies HeaderNavigationSection

function normalizePath(path: string) {
  const withoutQuery = path.split(/[?#]/, 1)[0] || '/'
  if (withoutQuery === '/') return '/'
  return `/${withoutQuery.replace(/^\/+|\/+$/g, '')}/`
}

function matchesPath(currentPath: string, href: string) {
  const normalizedHref = normalizePath(href)
  return currentPath === normalizedHref || currentPath.startsWith(normalizedHref)
}

export function getActiveNavigation(path: string): HeaderNavigationSection['id'] | null {
  const currentPath = normalizePath(path)

  for (const section of navigationSections) {
    const matchesSection = section.groups.some((group) =>
      group.links.some((link) => !link.external && matchesPath(currentPath, link.href)),
    )
    if (matchesSection) return section.id
  }

  if (matchesPath(currentPath, '/guide/')) return 'guide'
  return null
}
