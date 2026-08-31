import { DIAGRAM_THEMES } from './diagrams-data.ts'
import { RECAP_SERIES } from './recap-cards-data.ts'
import { WHITEPAPERS } from './whitepapers-data.ts'

export const HOMEPAGE_METRICS = {
  whitepaperCount: WHITEPAPERS.length,
  recapCardCount: RECAP_SERIES.reduce((total, series) => total + series.cardCount, 0),
  diagramCount: DIAGRAM_THEMES.reduce((total, theme) => total + theme.diagrams.length, 0),
} as const

export const GUIDE_DOWNLOADS = [
  {
    id: 'guide-en-pdf',
    language: 'EN',
    format: 'PDF',
    href: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/releases/latest/download/guide-export.pdf',
  },
  {
    id: 'guide-en-epub',
    language: 'EN',
    format: 'EPUB',
    href: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/releases/latest/download/guide-export.epub',
  },
  {
    id: 'guide-fr-pdf',
    language: 'FR',
    format: 'PDF',
    href: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/releases/latest/download/guide-export-fr.pdf',
  },
  {
    id: 'guide-fr-epub',
    language: 'FR',
    format: 'EPUB',
    href: 'https://github.com/FlorianBruniaux/claude-code-ultimate-guide/releases/latest/download/guide-export-fr.epub',
  },
] as const

export const START_PATHS = [
  {
    id: 'learn',
    eyebrow: 'New to Claude Code',
    title: 'Start using it well',
    description: 'Install Claude Code, understand the workflow, then complete a first useful task.',
    duration: '15 min',
    href: '/guide/learning-path/',
    steps: ['Install and authenticate', 'Learn the core workflow', 'Ship a first change'],
  },
  {
    id: 'team',
    eyebrow: 'Rolling it out',
    title: 'Adopt it with a team',
    description: 'Set guardrails, choose a rollout model, and establish repeatable engineering practices.',
    duration: '30 min',
    href: '/guide/adoption-approaches/',
    steps: ['Define safe defaults', 'Run a focused pilot', 'Measure and expand'],
  },
  {
    id: 'answer',
    eyebrow: 'Already productive',
    title: 'Find one answer fast',
    description: 'Jump to the cheat sheet, examples, security data, or the complete resource catalog.',
    duration: '5 min',
    href: '/resources/',
    steps: ['Choose a resource', 'Apply the pattern', 'Keep the reference'],
  },
] as const

export const FLAGSHIP_RESOURCES = [
  {
    icon: '📖',
    title: 'Ultimate Guide',
    description: 'The complete reference, from fundamentals to production workflows.',
    meta: '25K+ lines',
    href: '/guide/ultimate-guide/',
  },
  {
    icon: '⚡',
    title: 'Cheat Sheet',
    description: 'Commands, shortcuts, and patterns for daily use.',
    meta: '5-minute reference',
    href: '/cheatsheet/',
  },
  {
    icon: '🧩',
    title: 'Ready-to-use Templates',
    description: 'Copyable agents, hooks, commands, skills, and workflows.',
    meta: '272 templates',
    href: '/examples/',
  },
  {
    icon: '🛡️',
    title: 'Security Database',
    description: 'Tracked vulnerabilities, threat patterns, and production hardening.',
    meta: 'Continuously updated',
    href: '/security/',
  },
] as const

export const DEEP_TOPICS = [
  {
    icon: '🛡️',
    title: 'Security',
    description: 'Threat model, CVEs, sandboxing, and production guardrails.',
    href: '/security/',
  },
  {
    icon: '🧠',
    title: 'Memory & context',
    description: 'Keep sessions focused and preserve the knowledge that matters.',
    href: '/memory-systems/',
  },
  {
    icon: '◫',
    title: 'Visual diagrams',
    description: `${HOMEPAGE_METRICS.diagramCount} diagrams for architecture, workflows, and decisions.`,
    href: '/diagrams/',
  },
  {
    icon: '⇄',
    title: 'Tool comparisons',
    description: 'Choose the right model, editor, runtime, and integration.',
    href: '/compare/',
  },
] as const

export const RESOURCE_CATALOG = [
  ...FLAGSHIP_RESOURCES,
  { icon: '🎯', title: 'Quiz', description: 'Test practical knowledge and identify gaps.', meta: '473 questions', href: '/quiz/' },
  { icon: '📋', title: 'Recap Cards', description: 'Printable cards for technical, methodology, and design topics.', meta: `${HOMEPAGE_METRICS.recapCardCount} cards`, href: '/cheatsheets/' },
  { icon: '📄', title: 'Whitepapers', description: 'Focused, bilingual guides for deeper study.', meta: `${HOMEPAGE_METRICS.whitepaperCount} guides`, href: '/whitepapers/' },
  { icon: '⬇', title: 'Offline Downloads', description: 'Keep the full guide in PDF or EPUB, in English or French.', meta: '4 formats', href: '/downloads/' },
  { icon: '🔌', title: 'MCP Server', description: 'Search the guide directly from an MCP-compatible client.', meta: 'Public npm package', href: '/mcp/' },
  { icon: '🗺️', title: 'Learning Paths', description: 'Structured routes for beginners, teams, and advanced users.', meta: 'Role-based', href: '/guide/learning-path/' },
  { icon: '◫', title: 'Visual Diagrams', description: 'Architecture and workflow concepts rendered visually.', meta: `${HOMEPAGE_METRICS.diagramCount} diagrams`, href: '/diagrams/' },
  { icon: '🧰', title: 'Related Projects', description: 'Companion tools built around Claude Code workflows.', meta: '12 projects', href: '/projects/' },
] as const

export const RELATED_PROJECTS = [
  { icon: '📊', title: 'ccboard', description: 'TUI and web dashboard for Claude Code sessions and analytics.', href: 'https://ccboard.bruniaux.com/', featured: true },
  { icon: '🔌', title: 'cc-copilot-bridge', description: 'Multi-provider router for Anthropic, Copilot, Ollama, and more.', href: 'https://ccbridge.bruniaux.com/', featured: true },
  { icon: '⚡', title: 'RTK', description: 'CLI token optimizer that keeps development command output focused.', href: 'https://www.rtk-ai.app/', featured: true },
  { icon: '🖥️', title: 'Claude Cowork Guide', description: 'Guide to desktop automation and browser control with Claude Cowork.', href: 'https://cowork.bruniaux.com/', featured: false },
  { icon: '📦', title: 'Claude Code Plugins', description: 'Production-ready templates packaged as installable plugins.', href: 'https://github.com/FlorianBruniaux/claude-code-plugins', featured: false },
  { icon: '🌐', title: 'StarMapper', description: 'World map of GitHub stargazers and repository audiences.', href: 'https://starmapper.bruniaux.com/', featured: false },
  { icon: '🔎', title: 'node-dep-scope', description: 'Symbol-level dependency analysis for TypeScript and JavaScript.', href: 'https://github.com/FlorianBruniaux/node-dep-scope', featured: false },
  { icon: '🛡️', title: 'ctxharness', description: 'Validator for CLAUDE.md and rule files.', href: 'https://github.com/FlorianBruniaux/ctxharness', featured: false },
  { icon: '📋', title: 'cc-sessions', description: 'Search and analyze Claude Code session history.', href: 'https://github.com/FlorianBruniaux/cc-sessions', featured: false },
  { icon: '📈', title: 'Google Search Console MCP', description: 'MCP tools for search, analytics, schema, and performance audits.', href: 'https://github.com/FlorianBruniaux/google-search-console-mcp', featured: false },
  { icon: '🎬', title: 'YouTube Video Insights', description: 'Per-video insights, aggregate reports, and scored short-form moments.', href: 'https://github.com/FlorianBruniaux/youtube-video-insights', featured: false },
  { icon: '🔥', title: 'GitHub Roast TPC', description: 'Claude Code plugin for intent-aware GitHub profile audits.', href: 'https://github.com/FlorianBruniaux/github-roast-tpc', featured: false },
] as const

export const FEATURED_PROJECTS = RELATED_PROJECTS.filter((project) => project.featured)
