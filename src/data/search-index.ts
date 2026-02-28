/**
 * Global Search Index
 * Aggregates all landing site entries + guide entries for Cmd+K search
 */

import { EXAMPLES } from './examples-data.ts'
import { releases } from './releases.ts'
import { GUIDE_ENTRIES } from './guide-search-entries.ts'
import { GUIDE_CONTENT_ENTRIES } from './guide-content-entries.ts'

export type SearchSource = 'landing' | 'guide'

export interface SearchEntry {
  id: string
  title: string
  keywords: string   // lowercase, space-separated
  category: string
  url: string
  source: SearchSource
}

// ─── Pages ───────────────────────────────────────────────────────────────────
const pageEntries: SearchEntry[] = [
  {
    id: 'page-home',
    title: 'Claude Code Ultimate Guide',
    keywords: 'home overview claude code guide getting started',
    category: 'Pages',
    url: '/',
    source: 'landing',
  },
  {
    id: 'page-cheatsheet',
    title: 'Cheat Sheet',
    keywords: 'cheatsheet commands shortcuts reference quick lookup',
    category: 'Pages',
    url: '/cheatsheet/',
    source: 'landing',
  },
  {
    id: 'page-examples',
    title: 'Examples & Templates',
    keywords: 'examples templates agents hooks commands skills production ready',
    category: 'Pages',
    url: '/examples/',
    source: 'landing',
  },
  {
    id: 'page-quiz',
    title: 'Quiz: Test Your Knowledge',
    keywords: 'quiz test knowledge questions assessment practice',
    category: 'Pages',
    url: '/quiz/',
    source: 'landing',
  },
  {
    id: 'page-compare',
    title: 'Compare AI Coding Tools',
    keywords: 'compare comparison cursor copilot windsurf cline tools ai coding assistant',
    category: 'Pages',
    url: '/compare/',
    source: 'landing',
  },
  {
    id: 'page-security',
    title: 'Security: Threats & CVEs',
    keywords: 'security cve vulnerabilities threats attacks prompt injection hardening',
    category: 'Pages',
    url: '/security/',
    source: 'landing',
  },
  {
    id: 'page-faq',
    title: 'FAQ',
    keywords: 'faq frequently asked questions answers help support',
    category: 'Pages',
    url: '/faq/',
    source: 'landing',
  },
  {
    id: 'page-learning',
    title: 'Learning Path',
    keywords: 'learning path progression beginner junior senior power user skill level',
    category: 'Pages',
    url: '/learning/',
    source: 'landing',
  },
  {
    id: 'page-releases',
    title: 'Releases & Changelog',
    keywords: 'releases changelog versions updates new features breaking changes',
    category: 'Pages',
    url: '/releases/',
    source: 'landing',
  },
  {
    id: 'page-diagrams',
    title: 'Architecture Diagrams',
    keywords: 'diagrams visual architecture mermaid svg flowchart workflows multi-agent security',
    category: 'Pages',
    url: '/diagrams/',
    source: 'landing',
  },
]

// ─── Cheatsheet Sections ─────────────────────────────────────────────────────
const cheatsheetEntries: SearchEntry[] = [
  {
    id: 'cs-installation',
    title: 'Installation',
    keywords: 'install setup npm npx node node.js getting started first steps',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#installation',
    source: 'landing',
  },
  {
    id: 'cs-authentication',
    title: 'Authentication',
    keywords: 'authentication login oauth api key credentials access',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#authentication',
    source: 'landing',
  },
  {
    id: 'cs-basic-commands',
    title: 'Basic Commands',
    keywords: 'basic commands usage cli terminal chat continue resume',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#basic-commands',
    source: 'landing',
  },
  {
    id: 'cs-slash-commands',
    title: 'Slash Commands',
    keywords: 'slash commands /help /clear /compact /memory /config custom',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#slash-commands',
    source: 'landing',
  },
  {
    id: 'cs-keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    keywords: 'keyboard shortcuts keybindings hotkeys escape ctrl cmd submit',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#keyboard-shortcuts',
    source: 'landing',
  },
  {
    id: 'cs-mcp',
    title: 'MCP Servers',
    keywords: 'mcp model context protocol servers tools integrations configuration',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#mcp-servers',
    source: 'landing',
  },
  {
    id: 'cs-hooks',
    title: 'Hooks',
    keywords: 'hooks pre post tool use notification event automation bash shell script',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#hooks',
    source: 'landing',
  },
  {
    id: 'cs-memory',
    title: 'Memory System',
    keywords: 'memory system auto-memory persistence context CLAUDE.md project rules',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#memory',
    source: 'landing',
  },
  {
    id: 'cs-settings',
    title: 'Settings & Configuration',
    keywords: 'settings configuration config json models temperature permissions',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#settings',
    source: 'landing',
  },
  {
    id: 'cs-permissions',
    title: 'Permissions',
    keywords: 'permissions allow deny tools bash safety sandboxing allowlist denylist',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#permissions',
    source: 'landing',
  },
  {
    id: 'cs-multi-agent',
    title: 'Multi-Agent & Teams',
    keywords: 'multi agent teams orchestration parallel subagent task management delegation',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#multi-agent',
    source: 'landing',
  },
  {
    id: 'cs-git',
    title: 'Git Integration',
    keywords: 'git integration github pr commit push branch worktree',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#git-integration',
    source: 'landing',
  },
  {
    id: 'cs-tokens',
    title: 'Token Optimization',
    keywords: 'tokens optimization cost reduce context window ultracompressed compact',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#token-optimization',
    source: 'landing',
  },
  {
    id: 'cs-debugging',
    title: 'Debugging',
    keywords: 'debugging troubleshooting errors issues fix problems /debug',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#debugging',
    source: 'landing',
  },
  {
    id: 'cs-cicd',
    title: 'CI/CD Integration',
    keywords: 'ci cd pipeline github actions automation headless non-interactive',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#cicd',
    source: 'landing',
  },
  {
    id: 'cs-custom-agents',
    title: 'Custom Agents (Sub-Agents)',
    keywords: 'custom agents sub-agents persona specialized task automation .claude/agents',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#custom-agents',
    source: 'landing',
  },
  {
    id: 'cs-security',
    title: 'Security Best Practices',
    keywords: 'security best practices prompt injection prevention hardening safe mode',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#security-best-practices',
    source: 'landing',
  },
  {
    id: 'cs-context-management',
    title: 'Context Management',
    keywords: 'context management compact /compact window limit large codebase files',
    category: 'Cheat Sheet',
    url: '/cheatsheet/#context-management',
    source: 'landing',
  },
]

// ─── Examples (from data) ────────────────────────────────────────────────────
const exampleEntries: SearchEntry[] = Object.entries(EXAMPLES).flatMap(([catKey, cat]) => {
  const catLabel = (cat as any).label ?? catKey.charAt(0).toUpperCase() + catKey.slice(1).replace(/-/g, ' ')
  return (cat as any).files.map((file: any) => ({
    id: `example-${catKey}-${file.name.replace(/[\s.]/g, '-')}`,
    title: file.description,
    keywords: `${catKey} ${file.name} ${file.description} template example`.toLowerCase(),
    category: `Examples > ${catLabel}`,
    url: '/examples/',
    source: 'landing' as const,
  }))
})

// ─── Homepage Sections ────────────────────────────────────────────────────────
const homepageEntries: SearchEntry[] = [
  {
    id: 'home-golden-rules',
    title: 'Golden Rules',
    keywords: 'golden rules best practices core principles methodology workflow',
    category: 'Homepage',
    url: '/#golden-rules',
    source: 'landing',
  },
  {
    id: 'home-features',
    title: 'Features Overview',
    keywords: 'features overview capabilities what claude code does',
    category: 'Homepage',
    url: '/#features',
    source: 'landing',
  },
  {
    id: 'home-comparison',
    title: 'Tool Comparison Table',
    keywords: 'comparison table tools cursor copilot windsurf vs versus',
    category: 'Homepage',
    url: '/#comparison',
    source: 'landing',
  },
  {
    id: 'home-prompt-formula',
    title: 'Prompt Formula',
    keywords: 'prompt formula structure context task format examples good prompts',
    category: 'Homepage',
    url: '/#prompt-formula',
    source: 'landing',
  },
  {
    id: 'home-community',
    title: 'Community & Resources',
    keywords: 'community discord reddit resources links ecosystem',
    category: 'Homepage',
    url: '/#community',
    source: 'landing',
  },
]

// ─── Top Releases ─────────────────────────────────────────────────────────────
const releaseEntries: SearchEntry[] = releases.slice(0, 10).map(r => {
  // Strip HTML tags from highlights for keywords
  const highlightText = r.highlights
    .map(h => h.replace(/<[^>]+>/g, '').toLowerCase())
    .join(' ')
  return {
    id: `release-${r.version.replace(/\./g, '-')}`,
    title: `Release ${r.version} (${r.date})`,
    keywords: `release ${r.version} ${highlightText} changelog update`,
    category: 'Releases',
    url: `/releases/#${r.version}`,
    source: 'landing' as const,
  }
})

// ─── Security ─────────────────────────────────────────────────────────────────
const securityEntries: SearchEntry[] = [
  {
    id: 'sec-cve',
    title: 'CVE Database: Claude Code Vulnerabilities',
    keywords: 'cve vulnerabilities security exploit zero day critical severity',
    category: 'Security',
    url: '/security/#cve-database',
    source: 'landing',
  },
  {
    id: 'sec-prompt-injection',
    title: 'Prompt Injection Attacks',
    keywords: 'prompt injection attack vector malicious input social engineering',
    category: 'Security',
    url: '/security/#prompt-injection',
    source: 'landing',
  },
  {
    id: 'sec-mcp-threats',
    title: 'MCP Security Threats',
    keywords: 'mcp security threats malicious server tool poisoning rug pull',
    category: 'Security',
    url: '/security/#mcp-threats',
    source: 'landing',
  },
  {
    id: 'sec-campaigns',
    title: 'Attack Campaigns',
    keywords: 'attack campaigns malicious skills supply chain threat actors',
    category: 'Security',
    url: '/security/#attack-campaigns',
    source: 'landing',
  },
  {
    id: 'sec-hardening',
    title: 'Security Hardening Guide',
    keywords: 'hardening guide security checklist permissions sandboxing best practices',
    category: 'Security',
    url: '/security/#hardening',
    source: 'landing',
  },
]

// ─── Diagrams ─────────────────────────────────────────────────────────────────
const diagramEntries: SearchEntry[] = [
  {
    id: 'diag-foundations',
    title: 'Diagrams: Foundations',
    keywords: 'diagram visual foundations 4-layer model pipeline decision tree permission modes architecture',
    category: 'Diagrams',
    url: '/diagrams/#foundations',
    source: 'landing',
  },
  {
    id: 'diag-context-sessions',
    title: 'Diagrams: Context & Sessions',
    keywords: 'diagram visual context zones memory hierarchy session continuity window management',
    category: 'Diagrams',
    url: '/diagrams/#context-sessions',
    source: 'landing',
  },
  {
    id: 'diag-configuration',
    title: 'Diagrams: Configuration System',
    keywords: 'diagram visual configuration settings CLAUDE.md project rules hierarchy override',
    category: 'Diagrams',
    url: '/diagrams/#configuration',
    source: 'landing',
  },
  {
    id: 'diag-architecture',
    title: 'Diagrams: Architecture Internals',
    keywords: 'diagram visual architecture internals tool execution loop hooks pipeline internal',
    category: 'Diagrams',
    url: '/diagrams/#architecture',
    source: 'landing',
  },
  {
    id: 'diag-mcp',
    title: 'Diagrams: MCP Ecosystem',
    keywords: 'diagram visual mcp model context protocol servers tools integration ecosystem',
    category: 'Diagrams',
    url: '/diagrams/#mcp',
    source: 'landing',
  },
  {
    id: 'diag-workflows',
    title: 'Diagrams: Development Workflows',
    keywords: 'diagram visual workflows tdd bdd sdd development methodology feature loop',
    category: 'Diagrams',
    url: '/diagrams/#workflows',
    source: 'landing',
  },
  {
    id: 'diag-multi-agent',
    title: 'Diagrams: Multi-Agent Patterns',
    keywords: 'diagram visual multi agent patterns orchestration parallel subagent delegation teams',
    category: 'Diagrams',
    url: '/diagrams/#multi-agent',
    source: 'landing',
  },
  {
    id: 'diag-security',
    title: 'Diagrams: Security & Production',
    keywords: 'diagram visual security production hardening threat model prompt injection cve',
    category: 'Diagrams',
    url: '/diagrams/#security',
    source: 'landing',
  },
  {
    id: 'diag-cost',
    title: 'Diagrams: Cost & Optimization',
    keywords: 'diagram visual cost optimization tokens budget performance caching efficiency',
    category: 'Diagrams',
    url: '/diagrams/#cost',
    source: 'landing',
  },
  {
    id: 'diag-adoption',
    title: 'Diagrams: Adoption & Learning',
    keywords: 'diagram visual adoption learning path onboarding team skill progression roadmap',
    category: 'Diagrams',
    url: '/diagrams/#adoption',
    source: 'landing',
  },
]

// ─── Assemble full index ──────────────────────────────────────────────────────
export const SEARCH_INDEX: SearchEntry[] = [
  ...pageEntries,
  ...cheatsheetEntries,
  ...exampleEntries,
  ...homepageEntries,
  ...releaseEntries,
  ...securityEntries,
  ...diagramEntries,
  ...(GUIDE_ENTRIES as SearchEntry[]),
  ...(GUIDE_CONTENT_ENTRIES as SearchEntry[]),
]
