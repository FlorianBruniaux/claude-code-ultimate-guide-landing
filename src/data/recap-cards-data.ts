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
    hashedZipFr: 'recap-cards-technique.fr.v1.0.0.9b0b381553a1.zip',
    hashedZipEn: 'recap-cards-technique.en.v1.0.0.cc8add9f18c3.zip',
  },
  {
    id: 'M',
    name: 'Methodology',
    description: 'Workflows, agents, hooks, CI/CD, debugging, multi-agent — how to work.',
    color: '#3b82f6',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-methodologie.fr.v1.0.0.30327271fd8b.zip',
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
  'c01-trust-calibration': 'c01-trust-calibration.fr.v1.0.0.89b3090776fb.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.fr.v1.0.0.4c5fb6c6680d.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.fr.v1.0.0.c1fcbe372ba9.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.fr.v1.0.0.bce8b54cb168.pdf',
  'c05-memory-stack': 'c05-memory-stack.fr.v1.0.0.f2630f3294f7.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.fr.v1.0.0.1884a7fa1a14.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.fr.v1.0.0.06143eafff3f.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.fr.v1.0.0.e2cd42a5265d.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.fr.v1.0.0.c99f2ce97de9.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.fr.v1.0.0.1f98a8da4206.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.fr.v1.0.0.de8c25a68c50.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.fr.v1.0.0.b86f4de53133.pdf',
  'c13-erreurs-courantes': '25-erreurs-courantes.fr.v1.0.0.48af8c01dead.pdf',
  // ── Méthodologie (M) ────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.fr.v1.0.0.b431194cd0b2.pdf',
  'm02-context-management': '04-context-management.fr.v1.0.0.53bbcc60df12.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuité.fr.v1.0.0.fc36ff3b78ac.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.fr.v1.0.0.698fddaab64c.pdf',
  'm05-plan-mode': 'm05-plan-mode.fr.v1.0.0.d3d473daf899.pdf',
  'm06-task-management-system': 'm06-task-management-system.fr.v1.0.0.9dfb58669c03.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.fr.v1.0.0.98cbbefd3a7c.pdf',
  'm08-agents-custom': 'm08-agents-custom.fr.v1.0.0.1f3a7d11bd42.pdf',
  'm09-slash-commands': 'm09-slash-commands.fr.v1.0.0.6a3e7baecac7.pdf',
  'm10-skills': 'm10-skills.fr.v1.0.0.02743cb57111.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.fr.v1.0.0.711e2afc27f7.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.fr.v1.0.0.800cbd11a37a.pdf',
  'm13-worktrees': 'm13-worktrees.fr.v1.0.0.5c2396a47b29.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.fr.v1.0.0.56df16dc171f.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.fr.v1.0.0.ad814ff95969.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.fr.v1.0.0.3507866a286e.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.fr.v1.0.0.9887142ca958.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.fr.v1.0.0.926ec68b3b2e.pdf',
  'm19-github-actions': 'm19-github-actions.fr.v1.0.0.6390882a3088.pdf',
  'm20-cicd-production': 'm20-cicd-production.fr.v1.0.0.2006b838729c.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.fr.v1.0.0.c6bad83b3294.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.fr.v1.0.0.766aa49226ba.pdf',
  // ── Technique (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': '01-commandes-essentielles.fr.v1.0.0.7b0c6e3f2553.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.fr.v1.0.0.072be43683b4.pdf',
  't03-permission-modes': '03-permission-modes.fr.v1.0.0.9a040884ba85.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.fr.v1.0.0.2bb169445d41.pdf',
  't05-hierarchie-configuration': '06-hierarchie-configuration.fr.v1.0.0.8e0064afe5ac.pdf',
  't06-settings-json': 't06-settings-json.fr.v1.0.0.74f9aa3f1788.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.fr.v1.0.0.568a34fc5582.pdf',
  't08-auto-memories': 't08-auto-memories.fr.v1.0.0.a41e581bf6f8.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.fr.v1.0.0.e5c9734955bd.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.fr.v1.0.0.05e8be2f980a.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.fr.v1.0.0.8f1e0efc0120.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.fr.v1.0.0.c8f836139aa6.pdf',
  't13-context7-sequential': 't13-context7-sequential.fr.v1.0.0.bc9fc1570a15.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.fr.v1.0.0.a66adbae4793.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.fr.v1.0.0.8158e07e9f1c.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.fr.v1.0.0.c31701b4a2b9.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.fr.v1.0.0.27b77e16f775.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.fr.v1.0.0.69e6cbb09ade.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.fr.v1.0.0.a1c03c7ddedf.pdf',
  't20-token-optimization': 't20-token-optimization.fr.v1.0.0.079af148bd10.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.fr.v1.0.0.b626b9e2683b.pdf',
  't22-third-party-tools': 't22-third-party-tools.fr.v1.0.0.a458ab0b148c.pdf',
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
