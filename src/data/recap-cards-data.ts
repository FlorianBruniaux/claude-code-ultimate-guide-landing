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
  hashedZipFr: string           // FR ZIP filename sent to /api/subscribe (empty if not released)
  hashedZipEn: string           // EN ZIP filename (empty if not released)
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
  'c01-trust-calibration',
  'c02-prompting-basics',
  'c03-xml-prompting-anchors',
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
    hashedZipEn: 'recap-cards-technique.en.v1.0.0.cc8add9f18c3.zip',
  },
  {
    id: 'M',
    name: 'Methodology',
    description: 'Workflows, agents, hooks, CI/CD, debugging, multi-agent — how to work.',
    color: '#3b82f6',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-methodologie.fr.v1.0.0.13e7b6ebafd5.zip',
    hashedZipEn: 'recap-cards-methodologie.en.v1.0.0.11cb6e161f0f.zip',
  },
  {
    id: 'C',
    name: 'Design',
    description: 'Trust calibration, prompting, security, architecture — how to think.',
    color: '#22c55e',
    cardCount: 13,
    released: true,
    hashedZipFr: '',
    hashedZipEn: '',
  },
]

/** Map: card ID (slug) → hashed FR PDF filename on Vercel */
export const CARD_HASHES_FR: Record<string, string> = {
  // ── Conception (C) ──────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.fr.v1.0.0.06c8ad61a256.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.fr.v1.0.0.cae8e821774f.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.fr.v1.0.0.3e63b40073f4.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.fr.v1.0.0.5f4a9bda368a.pdf',
  'c05-memory-stack': 'c05-memory-stack.fr.v1.0.0.32172370d8ea.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.fr.v1.0.0.ed45b4044350.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.fr.v1.0.0.dd1324e19bf6.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.fr.v1.0.0.a3fb49640eb2.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.fr.v1.0.0.89a395ae6f29.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.fr.v1.0.0.a9550e0df0ae.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.fr.v1.0.0.70371cd7a428.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.fr.v1.0.0.c79ed0bdc8b6.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.fr.v1.0.0.3ddd18dab628.pdf',
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

/** Backward-compat alias — prefer CARD_HASHES_FR */
export const CARD_HASHES = CARD_HASHES_FR

/** Map: card ID (slug) → hashed EN PDF filename on Vercel */
export const CARD_HASHES_EN: Record<string, string> = {
  // ── Design (C) ──────────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.en.v1.0.0.af4c08364d93.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.en.v1.0.0.ced6b3210f93.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.en.v1.0.0.8177452ddc12.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.en.v1.0.0.6c5be6b77ff8.pdf',
  'c05-memory-stack': 'c05-memory-stack.en.v1.0.0.161e5ff1eced.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.en.v1.0.0.11e4e83bc0dc.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.en.v1.0.0.57ef170e9883.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.en.v1.0.0.f911549b13f0.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.en.v1.0.0.53a2d8549f2d.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.en.v1.0.0.208d67d4397f.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.en.v1.0.0.59cbe8a5e855.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.en.v1.0.0.2311afb45733.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.en.v1.0.0.2ce8af0fef54.pdf',
  // ── Methodology (M) ─────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.en.v1.0.0.31f32d824b67.pdf',
  'm02-context-management': 'm02-context-management.en.v1.0.0.041e9888596e.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.en.v1.0.0.9ac4ce13fb8d.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.en.v1.0.0.09a57dd5e5f3.pdf',
  'm05-plan-mode': 'm05-plan-mode.en.v1.0.0.1d5cf45a02c0.pdf',
  'm06-task-management-system': 'm06-task-management-system.en.v1.0.0.6b00020f26bf.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.en.v1.0.0.bda2431e6f7f.pdf',
  'm08-agents-custom': 'm08-agents-custom.en.v1.0.0.972bbcd23287.pdf',
  'm09-slash-commands': 'm09-slash-commands.en.v1.0.0.627038dba4ce.pdf',
  'm10-skills': 'm10-skills.en.v1.0.0.9ce876d86cdb.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.en.v1.0.0.e6b6e71b5ea1.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.en.v1.0.0.0c5c73e20e34.pdf',
  'm13-worktrees': 'm13-worktrees.en.v1.0.0.d64e338330bd.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.en.v1.0.0.bd0a82a171aa.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.en.v1.0.0.49b7c4131fd5.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.en.v1.0.0.0001de06425f.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.en.v1.0.0.056c0a31e09b.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.en.v1.0.0.76bc168d03ae.pdf',
  'm19-github-actions': 'm19-github-actions.en.v1.0.0.e8fd37b1f5de.pdf',
  'm20-cicd-production': 'm20-cicd-production.en.v1.0.0.b5ba7951e09e.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.en.v1.0.0.8330422f3a40.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.en.v1.0.0.0d956038b686.pdf',
  // ── Technical (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.en.v1.0.0.5f6a95412479.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.en.v1.0.0.486a5195dd10.pdf',
  't03-permission-modes': 't03-permission-modes.en.v1.0.0.77c4dd8dfb59.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.en.v1.0.0.0ac6d741dd37.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.en.v1.0.0.55713a9a6f0c.pdf',
  't06-settings-json': 't06-settings-json.en.v1.0.0.9383f7ea0aac.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.en.v1.0.0.6c3054ed415d.pdf',
  't08-auto-memories': 't08-auto-memories.en.v1.0.0.d155e0da7ed4.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.en.v1.0.0.531b2d000cb2.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.en.v1.0.0.d430c52835ca.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.en.v1.0.0.d06f26f26c05.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.en.v1.0.0.354628ed4f9a.pdf',
  't13-context7-sequential': 't13-context7-sequential.en.v1.0.0.308fdfe437c2.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.en.v1.0.0.e4bb3da178dc.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.en.v1.0.0.4a09671ee53b.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.en.v1.0.0.fc695b63d626.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.en.v1.0.0.11ce48425180.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.en.v1.0.0.993db39ca240.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.en.v1.0.0.5f5f5fd47805.pdf',
  't20-token-optimization': 't20-token-optimization.en.v1.0.0.b2eb9a06938f.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.en.v1.0.0.4f0831dcbd66.pdf',
  't22-third-party-tools': 't22-third-party-tools.en.v1.0.0.539eeafff171.pdf',
}

/** localStorage key for shared subscriber flag */
export const LS_SUBSCRIBER = 'cc-subscriber'

/** localStorage key for a given series unlock, e.g. cc-unlocked-T */
export const lsUnlockKey = (seriesId: 'T' | 'M' | 'C') => `cc-unlocked-${seriesId}`
