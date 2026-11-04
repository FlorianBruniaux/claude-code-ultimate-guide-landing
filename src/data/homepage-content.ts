import { DIAGRAM_THEMES } from './diagrams-data.ts'
import { PERSONAL_PROJECTS, PERSONAL_PROJECT_ROUTES } from './personal-projects.generated.ts'
import { RECAP_SERIES } from './recap-cards-data.ts'
import { WHITEPAPERS } from './whitepapers-data.ts'

export { PERSONAL_PROJECT_ROUTES }

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
    description: 'Open the one-page cheat sheet of commands, shortcuts, and patterns for daily use.',
    duration: '5 min',
    href: '/cheatsheet/',
    steps: ['Choose a resource', 'Apply the pattern', 'Keep the reference'],
  },
] as const

/**
 * Homepage "Essentials": four cards, then a one-line "Go further" row.
 * The Quiz is here because it is the most visited page from Google; Security
 * appears once. `metaKey` lets the page fill live counts from site stats.
 */
export const HOMEPAGE_ESSENTIALS = [
  {
    icon: '📖',
    title: 'Ultimate Guide',
    description: 'The complete reference, from fundamentals to production workflows.',
    meta: '25K+ lines',
    href: '/guide/',
  },
  {
    icon: '🧩',
    title: 'Ready-to-use Templates',
    description: 'Copyable agents, hooks, commands, skills, and workflows.',
    meta: 'templates',
    metaKey: 'templateCount',
    href: '/examples/',
  },
  {
    icon: '🎯',
    title: 'Knowledge Quiz',
    description: 'Test practical knowledge across tools, workflows, and safety, and find your gaps.',
    meta: 'questions',
    metaKey: 'quizQuestionCount',
    href: '/quiz/',
  },
  {
    icon: '🛡️',
    title: 'Security',
    description: 'Tracked vulnerabilities, threat patterns, sandboxing, and production hardening.',
    meta: 'CVE and advisory records',
    metaKey: 'cveCount',
    href: '/security/',
  },
] as const

export const HOMEPAGE_GO_FURTHER = [
  { title: 'Memory & context', href: '/memory-systems/' },
  { title: `${HOMEPAGE_METRICS.diagramCount} visual diagrams`, href: '/diagrams/' },
  { title: 'Tool comparisons', href: '/compare/' },
  { title: 'Workflows', href: '/guide/workflows/' },
] as const

export const RESOURCE_CATALOG = [
  { icon: '📖', title: 'Ultimate Guide', description: 'The complete reference, from fundamentals to production workflows.', meta: '25K+ lines', href: '/guide/' },
  { icon: '⚡', title: 'Cheat Sheet', description: 'Commands, shortcuts, and patterns for daily use.', meta: '5-minute reference', href: '/cheatsheet/' },
  { icon: '🧩', title: 'Ready-to-use Templates', description: 'Copyable agents, hooks, commands, skills, and workflows.', meta: '272 templates', href: '/examples/' },
  { icon: '🛡️', title: 'Security Database', description: 'Tracked vulnerabilities, threat patterns, and production hardening.', meta: 'Continuously updated', href: '/security/' },
  { icon: '🎯', title: 'Quiz', description: 'Test practical knowledge and identify gaps.', meta: '473 questions', href: '/quiz/' },
  { icon: '📋', title: 'Recap Cards', description: 'Printable cards for technical, methodology, and design topics.', meta: `${HOMEPAGE_METRICS.recapCardCount} cards`, href: '/cheatsheets/' },
  { icon: '📄', title: 'Whitepapers', description: 'Focused, bilingual guides for deeper study.', meta: `${HOMEPAGE_METRICS.whitepaperCount} guides`, href: '/whitepapers/' },
  { icon: '⬇', title: 'Offline Downloads', description: 'Keep the full guide in PDF or EPUB, in English or French.', meta: '4 formats', href: '/downloads/' },
  { icon: '🔌', title: 'MCP Server', description: 'Search the guide directly from an MCP-compatible client.', meta: 'Public npm package', href: '/mcp/' },
  { icon: '🗺️', title: 'Learning Paths', description: 'Structured routes for beginners, teams, and advanced users.', meta: 'Role-based', href: '/guide/learning-path/' },
  { icon: '◫', title: 'Visual Diagrams', description: 'Architecture and workflow concepts rendered visually.', meta: `${HOMEPAGE_METRICS.diagramCount} diagrams`, href: '/diagrams/' },
  { icon: '🧰', title: 'Related Projects', description: 'Companion tools organized by the outcome they support.', meta: `${PERSONAL_PROJECTS.length} projects`, href: '/projects/' },
] as const

export const RELATED_PROJECTS = PERSONAL_PROJECTS

export const FEATURED_PROJECTS = RELATED_PROJECTS.filter((project) => project.featured)
