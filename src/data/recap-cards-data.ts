/**
 * Recap Cards data: 58 printable A4 recap cards, 3 series
 * PDFs hosted on Vercel (florian.bruniaux.com/guides/recap-cards/) with hashed filenames.
 * ZIPs delivered by email via /api/subscribe.
 */

import { PDF_BASE_URL } from './whitepapers-data.ts'

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

/** First 3 cards of each released series: direct access, no email required */
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
    description: 'Commands, permissions, config, MCP, sandbox, models: the core toolbox.',
    color: '#d97706',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-technique.fr.v3.44.1.1f31df824189.zip',
    hashedZipEn: 'recap-cards-technique.en.v3.44.1.648fdd69ed34.zip',
  },
  {
    id: 'M',
    name: 'Methodology',
    description: 'Workflows, agents, hooks, CI/CD, debugging, multi-agent: how to work.',
    color: '#3b82f6',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-methodologie.fr.v3.44.1.6c7756e51f3d.zip',
    hashedZipEn: 'recap-cards-methodologie.en.v3.44.1.8a3137e39e00.zip',
  },
  {
    id: 'C',
    name: 'Design',
    description: 'Trust calibration, prompting, security, architecture: how to think.',
    color: '#22c55e',
    cardCount: 14,
    released: true,
    hashedZipFr: 'recap-cards-conception.fr.v3.44.1.f8c686368d6d.zip',
    hashedZipEn: 'recap-cards-conception.en.v3.44.1.f66657a56cf8.zip',
  },
]

/** Map: card ID (slug) → hashed FR PDF filename on Vercel */
export const CARD_HASHES_FR: Record<string, string> = {
  // ── Conception (C) ──────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.fr.v3.44.1.c18a491ee347.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.fr.v3.44.1.37fdbbc9e03d.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.fr.v3.44.1.889660fb2f1a.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.fr.v3.44.1.f1c65508339a.pdf',
  'c05-memory-stack': 'c05-memory-stack.fr.v3.44.1.592aa5fa6efd.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.fr.v3.44.1.a1008fb0c6a2.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.fr.v3.44.1.2310c01741a8.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.fr.v3.44.1.9c2421f8334a.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.fr.v3.44.1.1e8c581dee73.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.fr.v3.44.1.63428655ab79.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.fr.v3.44.1.74fa73cbbf3e.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.fr.v3.44.1.14c8c78cec60.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.fr.v3.44.1.b9c365275571.pdf',
  'c14-agent-harness-map': 'c14-agent-harness-map.fr.v3.44.1.a39917ab5d3b.pdf',
  // ── Méthodologie (M) ────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.fr.v3.44.1.4d2640dc7664.pdf',
  'm02-context-management': 'm02-context-management.fr.v3.44.1.69ce2ae2ee60.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.fr.v3.44.1.75f7740e9732.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.fr.v3.44.1.0fe7dd4360c2.pdf',
  'm05-plan-mode': 'm05-plan-mode.fr.v3.44.1.a79074aeccc4.pdf',
  'm06-task-management-system': 'm06-task-management-system.fr.v3.44.1.2dda4d9fd3ca.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.fr.v3.44.1.9bc5f36a3679.pdf',
  'm08-agents-custom': 'm08-agents-custom.fr.v3.44.1.4eb740612029.pdf',
  'm09-slash-commands': 'm09-slash-commands.fr.v3.44.1.0cf49d9a88c7.pdf',
  'm10-skills': 'm10-skills.fr.v3.44.1.cd0285a2a7a6.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.fr.v3.44.1.9ea1565d58ae.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.fr.v3.44.1.a943620c0799.pdf',
  'm13-worktrees': 'm13-worktrees.fr.v3.44.1.9feb28ae439e.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.fr.v3.44.1.f12eb4f9f107.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.fr.v3.44.1.abde78ee09e0.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.fr.v3.44.1.b6a1c4cad8d5.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.fr.v3.44.1.a4506d554efe.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.fr.v3.44.1.807f9a80387f.pdf',
  'm19-github-actions': 'm19-github-actions.fr.v3.44.1.dfe1a61c8aab.pdf',
  'm20-cicd-production': 'm20-cicd-production.fr.v3.44.1.112481f45651.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.fr.v3.44.1.ad46857c80fe.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.fr.v3.44.1.a53cbef46c9a.pdf',
  // ── Technique (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.fr.v3.44.1.bafbabf23ddc.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.fr.v3.44.1.0c7f27f389cf.pdf',
  't03-permission-modes': 't03-permission-modes.fr.v3.44.1.17778cf1833f.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.fr.v3.44.1.9692280b04ff.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.fr.v3.44.1.ff34852c7087.pdf',
  't06-settings-json': 't06-settings-json.fr.v3.44.1.0693a0d0f646.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.fr.v3.44.1.22bddea9f8f7.pdf',
  't08-auto-memories': 't08-auto-memories.fr.v3.44.1.a08e793c8ba3.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.fr.v3.44.1.921c8050b9fc.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.fr.v3.44.1.c24a72ea0d20.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.fr.v3.44.1.62c5445bb566.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.fr.v3.44.1.2993275be7bb.pdf',
  't13-context7-sequential': 't13-context7-sequential.fr.v3.44.1.04a26856e21c.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.fr.v3.44.1.2863bc737f13.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.fr.v3.44.1.cb76b0979560.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.fr.v3.44.1.c1df9b134bf9.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.fr.v3.44.1.0b59a67aaf7a.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.fr.v3.44.1.5896f5fd70b7.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.fr.v3.44.1.16a48cadb78e.pdf',
  't20-token-optimization': 't20-token-optimization.fr.v3.44.1.801bf4617ed0.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.fr.v3.44.1.667903bea90c.pdf',
  't22-third-party-tools': 't22-third-party-tools.fr.v3.44.1.214364c80c68.pdf',
}

/** Backward-compat alias: prefer CARD_HASHES_FR */
export const CARD_HASHES = CARD_HASHES_FR

/** Map: card ID (slug) → hashed EN PDF filename on Vercel */
export const CARD_HASHES_EN: Record<string, string> = {
  // ── Design (C) ──────────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.en.v3.44.1.de93cb80ed77.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.en.v3.44.1.50bb9355fc23.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.en.v3.44.1.5781cbb441c2.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.en.v3.44.1.2129f9777eef.pdf',
  'c05-memory-stack': 'c05-memory-stack.en.v3.44.1.cf77959eef71.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.en.v3.44.1.ea2bae22e530.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.en.v3.44.1.78ea8af27e3a.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.en.v3.44.1.edea1b5d7022.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.en.v3.44.1.7799282409a7.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.en.v3.44.1.be7adbdbabf6.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.en.v3.44.1.2a55cb46261b.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.en.v3.44.1.5b4ada898072.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.en.v3.44.1.e1844efd316d.pdf',
  'c14-agent-harness-map': 'c14-agent-harness-map.en.v3.44.1.8df58c51e44c.pdf',
  // ── Methodology (M) ─────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.en.v3.44.1.09224565acb3.pdf',
  'm02-context-management': 'm02-context-management.en.v3.44.1.74f79a3a3dce.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.en.v3.44.1.6abde0aeb307.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.en.v3.44.1.beea8ea4c55f.pdf',
  'm05-plan-mode': 'm05-plan-mode.en.v3.44.1.671e7db3c621.pdf',
  'm06-task-management-system': 'm06-task-management-system.en.v3.44.1.454659d64bfb.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.en.v3.44.1.10284d108123.pdf',
  'm08-agents-custom': 'm08-agents-custom.en.v3.44.1.93524d54cf4f.pdf',
  'm09-slash-commands': 'm09-slash-commands.en.v3.44.1.20cf614327e3.pdf',
  'm10-skills': 'm10-skills.en.v3.44.1.66c9e5b0dfe8.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.en.v3.44.1.086900724e52.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.en.v3.44.1.9c4b0cbc655e.pdf',
  'm13-worktrees': 'm13-worktrees.en.v3.44.1.e7fac7b580d4.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.en.v3.44.1.5caad57748ea.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.en.v3.44.1.7221b351211d.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.en.v3.44.1.a01d0cdc1e31.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.en.v3.44.1.89c3c80e0d4e.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.en.v3.44.1.4336f26bbe46.pdf',
  'm19-github-actions': 'm19-github-actions.en.v3.44.1.8f7032e94372.pdf',
  'm20-cicd-production': 'm20-cicd-production.en.v3.44.1.64d302b8bcf4.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.en.v3.44.1.6c03bf3b2995.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.en.v3.44.1.b1fc025a37dd.pdf',
  // ── Technical (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.en.v3.44.1.42a878ea715a.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.en.v3.44.1.42464d784fed.pdf',
  't03-permission-modes': 't03-permission-modes.en.v3.44.1.f0c4a247cba4.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.en.v3.44.1.a093c322c3bd.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.en.v3.44.1.7a075da9335e.pdf',
  't06-settings-json': 't06-settings-json.en.v3.44.1.dcfb16886c83.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.en.v3.44.1.997d57820a0f.pdf',
  't08-auto-memories': 't08-auto-memories.en.v3.44.1.01261784fc72.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.en.v3.44.1.8c484a33e179.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.en.v3.44.1.37388fdfde1a.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.en.v3.44.1.feacbf0fe548.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.en.v3.44.1.406dfd59dcf5.pdf',
  't13-context7-sequential': 't13-context7-sequential.en.v3.44.1.08c7d529f9cb.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.en.v3.44.1.0e2ceac5a2f3.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.en.v3.44.1.b854366ec440.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.en.v3.44.1.8fa4e53ed8aa.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.en.v3.44.1.76ced8c76ae9.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.en.v3.44.1.3f4f4dc37134.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.en.v3.44.1.3bf069cbc14d.pdf',
  't20-token-optimization': 't20-token-optimization.en.v3.44.1.90902dab55de.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.en.v3.44.1.e8f88b7bcf36.pdf',
  't22-third-party-tools': 't22-third-party-tools.en.v3.44.1.ff003853173d.pdf',
}

/** localStorage key for shared subscriber flag */
export const LS_SUBSCRIBER = 'cc-subscriber'

/** localStorage key for a given series unlock, e.g. cc-unlocked-T */
export const lsUnlockKey = (seriesId: 'T' | 'M' | 'C') => `cc-unlocked-${seriesId}`
