/**
 * Recap Cards data: 57 printable A4 recap cards, 3 series
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
    hashedZipFr: 'recap-cards-technique.fr.v1.0.0.dcd1f8cddda4.zip',
    hashedZipEn: 'recap-cards-technique.en.v1.0.0.40660f4b67de.zip',
  },
  {
    id: 'M',
    name: 'Methodology',
    description: 'Workflows, agents, hooks, CI/CD, debugging, multi-agent: how to work.',
    color: '#3b82f6',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-methodologie.fr.v1.0.0.c05b721da980.zip',
    hashedZipEn: 'recap-cards-methodologie.en.v1.0.0.3392287e361e.zip',
  },
  {
    id: 'C',
    name: 'Design',
    description: 'Trust calibration, prompting, security, architecture: how to think.',
    color: '#22c55e',
    cardCount: 13,
    released: true,
    hashedZipFr: 'recap-cards-conception.fr.v1.0.0.8f32cd93bfe9.zip',
    hashedZipEn: 'recap-cards-conception.en.v1.0.0.8f6beb98e039.zip',
  },
]

/** Map: card ID (slug) → hashed FR PDF filename on Vercel */
export const CARD_HASHES_FR: Record<string, string> = {
  // ── Conception (C) ──────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.fr.v1.0.0.0f0a13f77c02.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.fr.v1.0.0.47e086641a48.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.fr.v1.0.0.ec6e003593bb.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.fr.v1.0.0.13aa99ab90d0.pdf',
  'c05-memory-stack': 'c05-memory-stack.fr.v1.0.0.701992f4cfa2.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.fr.v1.0.0.2f04950d4d9c.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.fr.v1.0.0.c238275710a1.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.fr.v1.0.0.163340079181.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.fr.v1.0.0.32476259e781.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.fr.v1.0.0.16503e46db3a.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.fr.v1.0.0.f34bdd7ac20a.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.fr.v1.0.0.38f9bda0f419.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.fr.v1.0.0.92fd609aa24a.pdf',
  // ── Méthodologie (M) ────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.fr.v1.0.0.1a15d1434460.pdf',
  'm02-context-management': 'm02-context-management.fr.v1.0.0.0414866c4eba.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.fr.v1.0.0.d1a39e38e33f.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.fr.v1.0.0.ffe8cd2e42dd.pdf',
  'm05-plan-mode': 'm05-plan-mode.fr.v1.0.0.eb70a253a703.pdf',
  'm06-task-management-system': 'm06-task-management-system.fr.v1.0.0.09d4dc6b902a.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.fr.v1.0.0.b9357ffdccb1.pdf',
  'm08-agents-custom': 'm08-agents-custom.fr.v1.0.0.6dc7b7c094a4.pdf',
  'm09-slash-commands': 'm09-slash-commands.fr.v1.0.0.014a115e9d52.pdf',
  'm10-skills': 'm10-skills.fr.v1.0.0.684f521bf4ee.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.fr.v1.0.0.5129762ee056.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.fr.v1.0.0.1bfd5f387de4.pdf',
  'm13-worktrees': 'm13-worktrees.fr.v1.0.0.405d4a56b4e1.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.fr.v1.0.0.a1adbd9acc6d.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.fr.v1.0.0.2c6ba7069f31.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.fr.v1.0.0.048208ca197c.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.fr.v1.0.0.9f16bf6325cb.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.fr.v1.0.0.5aa80e85ef9a.pdf',
  'm19-github-actions': 'm19-github-actions.fr.v1.0.0.45f7fec546bc.pdf',
  'm20-cicd-production': 'm20-cicd-production.fr.v1.0.0.9f649c0e7375.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.fr.v1.0.0.e876244c73d2.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.fr.v1.0.0.81fe9271d27e.pdf',
  // ── Technique (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.fr.v1.0.0.0f4f6ba55062.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.fr.v1.0.0.ee0e0e6ab611.pdf',
  't03-permission-modes': 't03-permission-modes.fr.v1.0.0.42a16b09ea50.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.fr.v1.0.0.aeb652c7332c.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.fr.v1.0.0.653be75573e1.pdf',
  't06-settings-json': 't06-settings-json.fr.v1.0.0.a0a5358a8b8d.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.fr.v1.0.0.b602d6fce7a8.pdf',
  't08-auto-memories': 't08-auto-memories.fr.v1.0.0.9d96562edb3a.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.fr.v1.0.0.f2d470f1cae4.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.fr.v1.0.0.460d4fb5e8be.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.fr.v1.0.0.f295ca2015c9.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.fr.v1.0.0.9a2f4325056f.pdf',
  't13-context7-sequential': 't13-context7-sequential.fr.v1.0.0.40c563a7452e.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.fr.v1.0.0.51c8aed7b8a6.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.fr.v1.0.0.a54769fbb6d7.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.fr.v1.0.0.5eafad1cb16f.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.fr.v1.0.0.bd214e29f7e9.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.fr.v1.0.0.52470fa263a1.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.fr.v1.0.0.6ae7683bb2f7.pdf',
  't20-token-optimization': 't20-token-optimization.fr.v1.0.0.c4f966a53be4.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.fr.v1.0.0.251ded17e9f7.pdf',
  't22-third-party-tools': 't22-third-party-tools.fr.v1.0.0.835e93c47e70.pdf',
}

/** Backward-compat alias: prefer CARD_HASHES_FR */
export const CARD_HASHES = CARD_HASHES_FR

/** Map: card ID (slug) → hashed EN PDF filename on Vercel */
export const CARD_HASHES_EN: Record<string, string> = {
  // ── Design (C) ──────────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.en.v1.0.0.11886ecf11cf.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.en.v1.0.0.4ab55852d13c.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.en.v1.0.0.49590f20b744.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.en.v1.0.0.818f4904d74a.pdf',
  'c05-memory-stack': 'c05-memory-stack.en.v1.0.0.95ead6f3ea2f.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.en.v1.0.0.abd9f1bd5dec.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.en.v1.0.0.c30fc2397576.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.en.v1.0.0.a512666e44f2.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.en.v1.0.0.a9f77a640338.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.en.v1.0.0.6db50ca51adf.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.en.v1.0.0.cecaae51e43c.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.en.v1.0.0.8954e0ae867d.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.en.v1.0.0.df176199ba21.pdf',
  // ── Methodology (M) ─────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.en.v1.0.0.b39e8e055e90.pdf',
  'm02-context-management': 'm02-context-management.en.v1.0.0.e304b6c231ab.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.en.v1.0.0.871250f527d9.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.en.v1.0.0.fdca71f6858d.pdf',
  'm05-plan-mode': 'm05-plan-mode.en.v1.0.0.a64279efd4c0.pdf',
  'm06-task-management-system': 'm06-task-management-system.en.v1.0.0.6fa06d95cd14.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.en.v1.0.0.067957658e02.pdf',
  'm08-agents-custom': 'm08-agents-custom.en.v1.0.0.92a6806e0c3f.pdf',
  'm09-slash-commands': 'm09-slash-commands.en.v1.0.0.c5ba62d3e33d.pdf',
  'm10-skills': 'm10-skills.en.v1.0.0.cb2afda43035.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.en.v1.0.0.eff5434873b7.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.en.v1.0.0.65f3f35b9a56.pdf',
  'm13-worktrees': 'm13-worktrees.en.v1.0.0.4b53a2b0520f.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.en.v1.0.0.bd8724a49db6.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.en.v1.0.0.01024b75a572.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.en.v1.0.0.9b8280146fb7.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.en.v1.0.0.42e154ae5fdc.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.en.v1.0.0.99915ccb25c7.pdf',
  'm19-github-actions': 'm19-github-actions.en.v1.0.0.cd631792e098.pdf',
  'm20-cicd-production': 'm20-cicd-production.en.v1.0.0.6e2d74a8ab6b.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.en.v1.0.0.3ae6d7346996.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.en.v1.0.0.290a216115c0.pdf',
  // ── Technical (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.en.v1.0.0.f088931ebbc3.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.en.v1.0.0.75033ea06d6b.pdf',
  't03-permission-modes': 't03-permission-modes.en.v1.0.0.8465d66b61de.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.en.v1.0.0.91d3873313ea.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.en.v1.0.0.e40abab42684.pdf',
  't06-settings-json': 't06-settings-json.en.v1.0.0.6a1cae4aa2a4.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.en.v1.0.0.4766ab11652d.pdf',
  't08-auto-memories': 't08-auto-memories.en.v1.0.0.710fba0b97ce.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.en.v1.0.0.47743b47bafb.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.en.v1.0.0.01a8fd04bc1d.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.en.v1.0.0.93b14e1f6305.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.en.v1.0.0.de9d07dcb9d6.pdf',
  't13-context7-sequential': 't13-context7-sequential.en.v1.0.0.1e4db43854c6.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.en.v1.0.0.b8ba84964690.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.en.v1.0.0.d1b7bad802da.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.en.v1.0.0.0cdaa07d66bf.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.en.v1.0.0.ecfbe1402180.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.en.v1.0.0.4c50dd32b11d.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.en.v1.0.0.5b4854955444.pdf',
  't20-token-optimization': 't20-token-optimization.en.v1.0.0.ad22a5ff188e.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.en.v1.0.0.05517c2ff349.pdf',
  't22-third-party-tools': 't22-third-party-tools.en.v1.0.0.811fbfd6bc50.pdf',
}

/** localStorage key for shared subscriber flag */
export const LS_SUBSCRIBER = 'cc-subscriber'

/** localStorage key for a given series unlock, e.g. cc-unlocked-T */
export const lsUnlockKey = (seriesId: 'T' | 'M' | 'C') => `cc-unlocked-${seriesId}`
