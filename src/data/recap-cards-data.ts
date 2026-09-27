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
    hashedZipFr: 'recap-cards-technique.fr.v3.43.0.515091264577.zip',
    hashedZipEn: 'recap-cards-technique.en.v3.43.0.9bb98f7ee2f8.zip',
  },
  {
    id: 'M',
    name: 'Methodology',
    description: 'Workflows, agents, hooks, CI/CD, debugging, multi-agent: how to work.',
    color: '#3b82f6',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-methodologie.fr.v3.43.0.3555c38a875a.zip',
    hashedZipEn: 'recap-cards-methodologie.en.v3.43.0.13bf051929eb.zip',
  },
  {
    id: 'C',
    name: 'Design',
    description: 'Trust calibration, prompting, security, architecture: how to think.',
    color: '#22c55e',
    cardCount: 14,
    released: true,
    hashedZipFr: 'recap-cards-conception.fr.v3.43.0.80e10354e708.zip',
    hashedZipEn: 'recap-cards-conception.en.v3.43.0.4bcaedfee81f.zip',
  },
]

/** Map: card ID (slug) → hashed FR PDF filename on Vercel */
export const CARD_HASHES_FR: Record<string, string> = {
  // ── Conception (C) ──────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.fr.v3.43.0.6be75a0205a1.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.fr.v3.43.0.ba297d202e9c.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.fr.v3.43.0.2f8304830ed8.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.fr.v3.43.0.eacdb97f0308.pdf',
  'c05-memory-stack': 'c05-memory-stack.fr.v3.43.0.7bfde5b268d6.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.fr.v3.43.0.22a71c850295.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.fr.v3.43.0.21d7b78e7658.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.fr.v3.43.0.97ae889b0dec.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.fr.v3.43.0.4db3b9a6333d.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.fr.v3.43.0.06e5afe7224a.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.fr.v3.43.0.689ea02a3326.pdf',
  'c12-agent-sdk-integrations-ide': '/cheatsheets/pdf/c12-agent-sdk-integrations-ide.fr.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.fr.v3.43.0.0d7a06737bd7.pdf',
  'c14-agent-harness-map': '/cheatsheets/pdf/c14-agent-harness-map.fr.pdf',
  // ── Méthodologie (M) ────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.fr.v3.43.0.6fd4de27f653.pdf',
  'm02-context-management': 'm02-context-management.fr.v3.43.0.cbae85c3727d.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.fr.v3.43.0.506d26452bae.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.fr.v3.43.0.e91987d3d83f.pdf',
  'm05-plan-mode': 'm05-plan-mode.fr.v3.43.0.2b53dd92c7f3.pdf',
  'm06-task-management-system': 'm06-task-management-system.fr.v3.43.0.e041d49c1c0f.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.fr.v3.43.0.f4ca9c8df127.pdf',
  'm08-agents-custom': 'm08-agents-custom.fr.v3.43.0.38a5cb30dd71.pdf',
  'm09-slash-commands': 'm09-slash-commands.fr.v3.43.0.1f5adcf61f26.pdf',
  'm10-skills': 'm10-skills.fr.v3.43.0.b5af125006fa.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.fr.v3.43.0.c9a59972a9e8.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.fr.v3.43.0.c09260369b98.pdf',
  'm13-worktrees': 'm13-worktrees.fr.v3.43.0.bceb33014d7e.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.fr.v3.43.0.25a98b3b43d6.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.fr.v3.43.0.67984b451af4.pdf',
  'm16-multi-agent-topologie': '/cheatsheets/pdf/m16-multi-agent-topologie.fr.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.fr.v3.43.0.bb0f13ad654f.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.fr.v3.43.0.143da1aeac7d.pdf',
  'm19-github-actions': 'm19-github-actions.fr.v3.43.0.567ba5968bbd.pdf',
  'm20-cicd-production': 'm20-cicd-production.fr.v3.43.0.c3c87c9838a8.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.fr.v3.43.0.11d8ec9a870b.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.fr.v3.43.0.a81d4e6ad44a.pdf',
  // ── Technique (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.fr.v3.43.0.8282b0746ae4.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.fr.v3.43.0.8afece0e5b9d.pdf',
  't03-permission-modes': 't03-permission-modes.fr.v3.43.0.eebd9ae45ecd.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.fr.v3.43.0.a98264a5516d.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.fr.v3.43.0.473c0a351cc9.pdf',
  't06-settings-json': 't06-settings-json.fr.v3.43.0.78b555717582.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.fr.v3.43.0.00d75097f9f5.pdf',
  't08-auto-memories': 't08-auto-memories.fr.v3.43.0.bcd778e988c0.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.fr.v3.43.0.37895b06d333.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.fr.v3.43.0.6e1f87d10bbc.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.fr.v3.43.0.7487737f823b.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.fr.v3.43.0.12e990f16993.pdf',
  't13-context7-sequential': 't13-context7-sequential.fr.v3.43.0.2ff6db7f9ac2.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.fr.v3.43.0.bd0534fe4ae1.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.fr.v3.43.0.df2aaa50207b.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.fr.v3.43.0.caa670cb2a4d.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.fr.v3.43.0.52f104444e61.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.fr.v3.43.0.c259b325f29d.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.fr.v3.43.0.d933e8294b76.pdf',
  't20-token-optimization': 't20-token-optimization.fr.v3.43.0.7c0c87399e6f.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.fr.v3.43.0.451221284770.pdf',
  't22-third-party-tools': '/cheatsheets/pdf/t22-third-party-tools.fr.pdf',
}

/** Backward-compat alias: prefer CARD_HASHES_FR */
export const CARD_HASHES = CARD_HASHES_FR

/** Map: card ID (slug) → hashed EN PDF filename on Vercel */
export const CARD_HASHES_EN: Record<string, string> = {
  // ── Design (C) ──────────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.en.v3.43.0.c00496264256.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.en.v3.43.0.84cf52d97963.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.en.v3.43.0.a3090f4e9c69.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.en.v3.43.0.fb43974f6534.pdf',
  'c05-memory-stack': 'c05-memory-stack.en.v3.43.0.3d41cbe46c71.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.en.v3.43.0.b50d13d114b3.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.en.v3.43.0.29236fb3b408.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.en.v3.43.0.c101332e7e6b.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.en.v3.43.0.7946da114b78.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.en.v3.43.0.c192352681d9.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.en.v3.43.0.2034ccf00f3d.pdf',
  'c12-agent-sdk-integrations-ide': '/cheatsheets/pdf/c12-agent-sdk-integrations-ide.en.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.en.v3.43.0.f82333d76725.pdf',
  'c14-agent-harness-map': '/cheatsheets/pdf/c14-agent-harness-map.en.pdf',
  // ── Methodology (M) ─────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.en.v3.43.0.8ca99b9c845a.pdf',
  'm02-context-management': 'm02-context-management.en.v3.43.0.77380cce8b9a.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.en.v3.43.0.2a7402b77db8.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.en.v3.43.0.c95cd5bd7c1b.pdf',
  'm05-plan-mode': 'm05-plan-mode.en.v3.43.0.38fb7b3ae27d.pdf',
  'm06-task-management-system': 'm06-task-management-system.en.v3.43.0.522109711e1c.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.en.v3.43.0.cf1ddff784a8.pdf',
  'm08-agents-custom': 'm08-agents-custom.en.v3.43.0.f7746d510057.pdf',
  'm09-slash-commands': 'm09-slash-commands.en.v3.43.0.f5b40541f7ef.pdf',
  'm10-skills': 'm10-skills.en.v3.43.0.c880ce9015bd.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.en.v3.43.0.92bc332763bb.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.en.v3.43.0.2afcd864f856.pdf',
  'm13-worktrees': 'm13-worktrees.en.v3.43.0.d14532c2c35c.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.en.v3.43.0.fb332c1907b6.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.en.v3.43.0.edc8a140ca13.pdf',
  'm16-multi-agent-topologie': '/cheatsheets/pdf/m16-multi-agent-topologie.en.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.en.v3.43.0.a6d3488497dc.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.en.v3.43.0.46ded3548063.pdf',
  'm19-github-actions': 'm19-github-actions.en.v3.43.0.1cc95e01d97e.pdf',
  'm20-cicd-production': 'm20-cicd-production.en.v3.43.0.b158a24982a9.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.en.v3.43.0.7c85adda2753.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.en.v3.43.0.5b2dec48b22c.pdf',
  // ── Technical (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.en.v3.43.0.fc96cfac7e2d.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.en.v3.43.0.80e82be4cba1.pdf',
  't03-permission-modes': 't03-permission-modes.en.v3.43.0.a185d676a01d.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.en.v3.43.0.11573fff286a.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.en.v3.43.0.9473b10f7d62.pdf',
  't06-settings-json': 't06-settings-json.en.v3.43.0.1586101b6687.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.en.v3.43.0.2e67ce48e4ba.pdf',
  't08-auto-memories': 't08-auto-memories.en.v3.43.0.b1fd81a207a1.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.en.v3.43.0.d16ea8b4ec66.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.en.v3.43.0.a74f2d14bf81.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.en.v3.43.0.afdb0a55e98b.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.en.v3.43.0.3ae9309a1474.pdf',
  't13-context7-sequential': 't13-context7-sequential.en.v3.43.0.536ae8761d21.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.en.v3.43.0.9e0b49d9596f.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.en.v3.43.0.b8ae93c85ec4.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.en.v3.43.0.74db84a9b607.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.en.v3.43.0.2cbf68cbaffa.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.en.v3.43.0.c70e47ada788.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.en.v3.43.0.9585ac3b3d66.pdf',
  't20-token-optimization': 't20-token-optimization.en.v3.43.0.d77a6f57d1d6.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.en.v3.43.0.10a490c2654e.pdf',
  't22-third-party-tools': '/cheatsheets/pdf/t22-third-party-tools.en.pdf',
}

/** localStorage key for shared subscriber flag */
export const LS_SUBSCRIBER = 'cc-subscriber'

/** localStorage key for a given series unlock, e.g. cc-unlocked-T */
export const lsUnlockKey = (seriesId: 'T' | 'M' | 'C') => `cc-unlocked-${seriesId}`
