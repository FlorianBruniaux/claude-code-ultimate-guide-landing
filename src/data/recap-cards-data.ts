/**
 * Recap Cards data — 57 printable A4 recap cards, 3 series
 * PDFs hosted on Vercel (florian.bruniaux.com/guides/recap-cards/) with hashed filenames.
 * ZIPs delivered by email via /api/subscribe.
 */

import { PDF_BASE_URL } from './whitepapers-data'

export interface RecapCardSeries {
  id: 'T' | 'M' | 'C'
  name: string                  // EN name
  description: string           // Short description (EN)
  color: string                 // Hex color for series badge
  cardCount: number
  released: boolean
  hashedZipFr: string           // Filename sent to /api/subscribe (empty if not released)
}

export const RECAP_BASE_URL = `${PDF_BASE_URL}/recap-cards`

/** First 3 cards of each released series — direct access, no email required */
export const DIRECT_ACCESS_IDS: ReadonlySet<string> = new Set([
  't01-commandes-essentielles',
  't02-mode-non-interactif',
  't03-permission-modes',
  'm01-workflow-quotidien',
  'm02-context-management',
  'm03-sessions-continuite',
])

export const RECAP_SERIES: RecapCardSeries[] = [
  {
    id: 'T',
    name: 'Technical',
    description: 'Commands, permissions, config, MCP, sandbox, models — the core toolbox.',
    color: '#d97706',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-technique.fr.v1.0.0.b49e567efc83.zip',
  },
  {
    id: 'M',
    name: 'Methodology',
    description: 'Workflows, agents, hooks, CI/CD, debugging, multi-agent — how to work.',
    color: '#3b82f6',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-methodologie.fr.v1.0.0.13e7b6ebafd5.zip',
  },
  {
    id: 'C',
    name: 'Design',
    description: 'Trust calibration, prompting, security, architecture — how to think.',
    color: '#22c55e',
    cardCount: 13,
    released: false,
    hashedZipFr: '',
  },
]

/** Map: card ID (slug) → hashed PDF filename on Vercel */
export const CARD_HASHES: Record<string, string> = {
  // ── Conception (C) — coming soon, hashes stored in claudedocs/recap-cards-c-hashes.md ──
  // ── Méthodologie (M) ────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.fr.v1.0.0.7a39ae6c702e.pdf',
  'm02-context-management': 'm02-context-management.fr.v1.0.0.bb231e85d45a.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.fr.v1.0.0.60fce4fed0d8.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.fr.v1.0.0.6f86f9103b15.pdf',
  'm05-plan-mode': 'm05-plan-mode.fr.v1.0.0.3aeabfe8def3.pdf',
  'm06-task-management-system': 'm06-task-management-system.fr.v1.0.0.9849dc3ef1ef.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.fr.v1.0.0.8fcf305d2bd1.pdf',
  'm08-agents-custom': 'm08-agents-custom.fr.v1.0.0.76f9eb083aab.pdf',
  'm09-slash-commands': 'm09-slash-commands.fr.v1.0.0.f3268120309f.pdf',
  'm10-skills': 'm10-skills.fr.v1.0.0.0f10c5381278.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.fr.v1.0.0.ed6cab9f2f6b.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.fr.v1.0.0.ea8a6fef7799.pdf',
  'm13-worktrees': 'm13-worktrees.fr.v1.0.0.8a05aad9535b.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.fr.v1.0.0.43709bf9fab9.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.fr.v1.0.0.e5636d384682.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.fr.v1.0.0.938cd21d5c1e.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.fr.v1.0.0.0b5c99e4428b.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.fr.v1.0.0.f789deb7099a.pdf',
  'm19-github-actions': 'm19-github-actions.fr.v1.0.0.9042ba29d575.pdf',
  'm20-cicd-production': 'm20-cicd-production.fr.v1.0.0.4cd64aa08812.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.fr.v1.0.0.2b1b23d56236.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.fr.v1.0.0.632b94b41f63.pdf',
  // ── Technique (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.fr.v1.0.0.d2af5d1d752c.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.fr.v1.0.0.7486f8fbf5b5.pdf',
  't03-permission-modes': 't03-permission-modes.fr.v1.0.0.318dc47d365b.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.fr.v1.0.0.0787515a1d98.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.fr.v1.0.0.fcdb566a2b09.pdf',
  't06-settings-json': 't06-settings-json.fr.v1.0.0.f96a06faed05.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.fr.v1.0.0.9a5322699617.pdf',
  't08-auto-memories': 't08-auto-memories.fr.v1.0.0.d32dcd1578dc.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.fr.v1.0.0.7f440d112479.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.fr.v1.0.0.19655711bd41.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.fr.v1.0.0.75e04de1650a.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.fr.v1.0.0.a49fdd6b805d.pdf',
  't13-context7-sequential': 't13-context7-sequential.fr.v1.0.0.eda00f0c1605.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.fr.v1.0.0.d83daf2bd8ac.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.fr.v1.0.0.dd32d342310c.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.fr.v1.0.0.c4c458890695.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.fr.v1.0.0.0a85a25b9eea.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.fr.v1.0.0.9231e0d3dfbb.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.fr.v1.0.0.d9d633d90189.pdf',
  't20-token-optimization': 't20-token-optimization.fr.v1.0.0.c998377aa34e.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.fr.v1.0.0.bd8dd604cc53.pdf',
  't22-third-party-tools': 't22-third-party-tools.fr.v1.0.0.102ae98e8e0b.pdf',
}

/** localStorage key for shared subscriber flag */
export const LS_SUBSCRIBER = 'cc-subscriber'

/** localStorage key for a given series unlock, e.g. cc-unlocked-T */
export const lsUnlockKey = (seriesId: 'T' | 'M' | 'C') => `cc-unlocked-${seriesId}`
