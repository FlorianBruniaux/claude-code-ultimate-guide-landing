/**
 * Global Search Index
 * Aggregates all landing site entries + guide entries for Cmd+K search
 */

import { EXAMPLES } from './examples-data.ts'
import { releases } from './releases.ts'
import { GUIDE_ENTRIES } from './guide-search-entries.ts'
import { GUIDE_CONTENT_ENTRIES } from './guide-content-entries.ts'
import { glossaryTerms } from './glossary-data.ts'

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
    id: 'page-cheatsheets',
    title: 'Recap Cards — 57 Printable Cheat Sheets',
    keywords: 'recap cards cheat sheets printable a4 technical methodology design pdf series',
    category: 'Pages',
    url: '/cheatsheets/',
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
    id: 'role-quiz',
    title: 'AI Role Personality Quiz',
    keywords: 'quiz role career personality test which ai role career path match fit',
    category: 'Tools',
    url: '/roles/#role-quiz',
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
    id: 'page-context-engineering',
    title: 'Context Engineering: Tools & Ecosystem',
    keywords: 'context engineering token optimization compression rtk headroom llmlingua edgee portkey langfuse rag kv cache vllm sglang lllmops observability minimum viable context mvc context rot semantic priming',
    category: 'Pages',
    url: '/context-engineering/',
    source: 'landing',
  },
  {
    id: 'page-glossary',
    title: 'Glossary — 130+ Terms Defined',
    keywords: 'glossary terms definitions vocabulary concepts patterns claude code reference',
    category: 'Pages',
    url: '/glossary/',
    source: 'landing',
  },
  {
    id: 'page-team-metrics',
    title: 'Team Metrics for AI-Augmented Engineering',
    keywords: 'team metrics dora space dora 2025 archetypes deployment frequency lead time change failure rate mttr mean time to recovery bug escape rate time to value csat engineering manager tech lead piloting ai augmented 5 person 25 person velocity trap monday ritual developer experience dx core 4',
    category: 'Pages',
    url: '/team-metrics/',
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
  {
    id: 'page-whitepapers',
    title: 'Ebooks & Whitepapers',
    keywords: 'ebooks whitepapers pdf epub download free whitepaper wp00 wp01 wp02 wp03 security prompts architecture team adoption privacy roi budget agents learning',
    category: 'Pages',
    url: '/whitepapers/',
    source: 'landing',
  },
  {
    id: 'page-methodologies',
    title: 'Methodology Quiz — Find Your Stack',
    keywords: 'methodology quiz stack tdd bdd spec first vibe coding bmad fdd sdd plan mode agentic exploration pair programming 8 stacks 12 questions team size',
    category: 'Pages',
    url: '/methodologies/',
    source: 'landing',
  },
  {
    id: 'page-roles',
    title: 'AI Roles — Which Role Fits You?',
    keywords: 'ai roles career path vibe coder architect orchestrator reviewer researcher ops security pm product manager junior senior power user match fit quiz decision matrix',
    category: 'Pages',
    url: '/roles/',
    source: 'landing',
  },
  {
    id: 'page-context-configurator',
    title: 'Context Engineering Configurator — CLAUDE.md Generator',
    keywords: 'context engineering configurator claude.md generator starter kit team size setup tech stack maturity level 3 steps personalized',
    category: 'Pages',
    url: '/context/',
    source: 'landing',
  },
  {
    id: 'page-ecosystem',
    title: 'Third-Party Ecosystem — 25+ Tools for Claude Code',
    keywords: 'ecosystem third party tools token tracking session management alternative ui multi agent orchestration plugin community built extensions ccm sniffly vibetunnel claudio',
    category: 'Pages',
    url: '/ecosystem/',
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
    id: 'guide-scheduled-tasks',
    title: 'Scheduled Tasks: Cloud, Desktop & /loop',
    keywords: 'scheduled tasks cron automation /schedule /loop cloud desktop recurring background headless claude --print',
    category: 'Guide > Commands',
    url: '/guide/ultimate-guide/06-commands/#scheduled-tasks-three-methods',
    source: 'guide',
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

// ─── Guide Spotlight Entries (notable sections not covered by auto-generated H2 index) ─
const guideSpotlightEntries: SearchEntry[] = [
  {
    id: 'guide-output-styles',
    title: 'Output Styles: Default, Explanatory, Learning + Custom',
    keywords: 'output styles outputStyle default explanatory learning custom /config settings.json .claude/styles/ token cost response format',
    category: 'Guide > Advanced Patterns',
    url: '/guide/ultimate-guide/09-advanced-patterns/#97-output-styles',
    source: 'guide',
  },
  {
    id: 'guide-ultraplan',
    title: 'Ultraplan: Async Cloud Planning with Opus 4.6',
    keywords: 'ultraplan /ultraplan cloud planning async multi-agent opus browser review inline comments session teleportation github pr research preview',
    category: 'Guide > Core Workflow',
    url: '/guide/ultimate-guide/02-core-workflow/#ultraplan',
    source: 'guide',
  },
  {
    id: 'guide-managed-agents',
    title: 'Claude Managed Agents (Cloud-Hosted Platform)',
    keywords: 'managed agents cloud hosted platform messages api ant cli orchestrator specialists next.js sse streaming anthropic notion rakuten asana sentry',
    category: 'Guide > AI Ecosystem',
    url: '/guide/ai-ecosystem/#14-claude-managed-agents-cloud-hosted-platform',
    source: 'guide',
  },
  {
    id: 'guide-autoresearch',
    title: 'Autoresearch: Overnight Autonomous Improvement Loops',
    keywords: 'autoresearch autonomous loop overnight improvement karpathy measure change remeasure program.md /autoresearch h100 ml iterations sleep',
    category: 'Guide > AI Ecosystem',
    url: '/guide/ai-ecosystem/#13-autonomous-research-loops-autoresearch-pattern',
    source: 'guide',
  },
  {
    id: 'guide-hook-profiles',
    title: 'Hook Profiles: Environment-Variable Gating (minimal/standard/strict)',
    keywords: 'hook profiles environment variable gating minimal standard strict HOOK_REQUIRED_LEVEL team scaling per-hook level assignment',
    category: 'Guide > Hooks',
    url: '/guide/ultimate-guide/07-hooks/#76-hook-profiles',
    source: 'guide',
  },
  {
    id: 'guide-instinct-learning',
    title: 'Instinct-Based Continuous Learning',
    keywords: 'instinct based continuous learning observation capture stop hook confidence scoring decay model promotion pipeline rules skills automated refinement',
    category: 'Guide > Advanced Patterns',
    url: '/guide/ultimate-guide/09-advanced-patterns/#924-instinct-based-continuous-learning',
    source: 'guide',
  },
  {
    id: 'guide-claude-in-chrome',
    title: 'Claude in Chrome: Visual Feedback Loop',
    keywords: 'claude in chrome browser extension visual feedback loop --chrome --no-chrome screenshot dom interaction web ui testing v2.0.72',
    category: 'Guide > Advanced Patterns',
    url: '/guide/ultimate-guide/09-advanced-patterns/#claude-in-chrome-the-visual-feedback-loop',
    source: 'guide',
  },
  {
    id: 'guide-smart-explore',
    title: 'Progressive Code Exploration (Smart Explore)',
    keywords: 'progressive code exploration smart explore tree-sitter ast structure first drill second 86% token reduction grep discipline mcp server code review graph',
    category: 'Guide > Advanced Patterns',
    url: '/guide/ultimate-guide/09-advanced-patterns/#progressive-code-exploration-smart-explore',
    source: 'guide',
  },
  {
    id: 'guide-auto-dream',
    title: 'Auto Dream: Background Memory Consolidation',
    keywords: 'auto dream memory consolidation background sub-agent orient gather signal prune index 24h 5 sessions /memory unofficial community discovered',
    category: 'Guide > Memory & Files',
    url: '/guide/ultimate-guide/03-memory-files/#auto-dream-memory-consolidation-community-discovered',
    source: 'guide',
  },
  {
    id: 'guide-permission-fatigue',
    title: 'Permission Fatigue Anti-Pattern',
    keywords: 'permission fatigue anti-pattern approve without reading dangerously skip permissions auto mode bypass right mode decision table',
    category: 'Guide > Quick Start',
    url: '/guide/ultimate-guide/01-quick-start/#permission-fatigue-anti-pattern',
    source: 'guide',
  },
  {
    id: 'guide-advanced-tool-use',
    title: 'Advanced Tool Use Patterns (API): PTC, Dynamic Filtering, Tool Use Examples',
    keywords: 'advanced tool use patterns ptc programmatic tool calling dynamic filtering tool use examples input_examples 72% to 90% accuracy +13.3pp browsecomp api',
    category: 'Guide > Architecture',
    url: '/guide/architecture/#7-advanced-tool-use-patterns-api',
    source: 'guide',
  },
  {
    id: 'guide-codesight',
    title: 'codesight: Project Context Bootstrapping (Zero-Dependencies CLI)',
    keywords: 'codesight project context bootstrapping zero dependencies cli ast analysis routes schema deps blast radius wiki knowledge base 11 mcp tools',
    category: 'Guide > Third-Party Tools',
    url: '/guide/third-party-tools/#codesight',
    source: 'guide',
  },
]

// ─── Glossary entries ─────────────────────────────────────────────────────────
const glossaryEntries: SearchEntry[] = glossaryTerms.map(t => ({
  id: `glossary-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  title: t.term,
  keywords: `${t.term.toLowerCase()} ${t.category.toLowerCase()} ${t.subcategory.toLowerCase()} glossary definition`,
  category: `Glossary › ${t.category}`,
  url: `/glossary/#letter-${t.term[0].toUpperCase()}`,
  source: 'landing' as const,
}))

// ─── Assemble full index ──────────────────────────────────────────────────────
export const SEARCH_INDEX: SearchEntry[] = [
  ...pageEntries,
  ...cheatsheetEntries,
  ...exampleEntries,
  ...homepageEntries,
  ...releaseEntries,
  ...securityEntries,
  ...diagramEntries,
  ...guideSpotlightEntries,
  ...glossaryEntries,
  ...(GUIDE_ENTRIES as SearchEntry[]),
  ...(GUIDE_CONTENT_ENTRIES as SearchEntry[]),
]
