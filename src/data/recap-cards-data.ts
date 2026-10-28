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
    hashedZipFr: 'recap-cards-technique.fr.v3.44.1.ed24753c4988.zip',
    hashedZipEn: 'recap-cards-technique.en.v3.44.1.21462181f99c.zip',
  },
  {
    id: 'M',
    name: 'Methodology',
    description: 'Workflows, agents, hooks, CI/CD, debugging, multi-agent: how to work.',
    color: '#3b82f6',
    cardCount: 22,
    released: true,
    hashedZipFr: 'recap-cards-methodologie.fr.v3.44.1.0704728e2848.zip',
    hashedZipEn: 'recap-cards-methodologie.en.v3.44.1.afac31cc9723.zip',
  },
  {
    id: 'C',
    name: 'Design',
    description: 'Trust calibration, prompting, security, architecture: how to think.',
    color: '#22c55e',
    cardCount: 14,
    released: true,
    hashedZipFr: 'recap-cards-conception.fr.v3.44.1.f14800a4f72d.zip',
    hashedZipEn: 'recap-cards-conception.en.v3.44.1.d105a17628ca.zip',
  },
]

/** Map: card ID (slug) → hashed FR PDF filename on Vercel */
export const CARD_HASHES_FR: Record<string, string> = {
  // ── Conception (C) ──────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.fr.v3.44.1.a3168c1232b0.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.fr.v3.44.1.7cd068215067.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.fr.v3.44.1.26a41d64d8ec.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.fr.v3.44.1.76a2994b5ab4.pdf',
  'c05-memory-stack': 'c05-memory-stack.fr.v3.44.1.31739111c4f4.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.fr.v3.44.1.39b119b51925.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.fr.v3.44.1.86af8c280c56.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.fr.v3.44.1.31efa224ff0f.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.fr.v3.44.1.92c8d55c4764.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.fr.v3.44.1.a79d53a270ef.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.fr.v3.44.1.de62f35f2601.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.fr.v3.44.1.3fc0bbd41a5b.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.fr.v3.44.1.c697b9398c1d.pdf',
  'c14-agent-harness-map': 'c14-agent-harness-map.fr.v3.44.1.39c72b80886e.pdf',
  // ── Méthodologie (M) ────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.fr.v3.44.1.10048f345a3d.pdf',
  'm02-context-management': 'm02-context-management.fr.v3.44.1.2ddbf0f7c05c.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.fr.v3.44.1.ddfaa337c075.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.fr.v3.44.1.8d0e0f8c0878.pdf',
  'm05-plan-mode': 'm05-plan-mode.fr.v3.44.1.874f5a321f59.pdf',
  'm06-task-management-system': 'm06-task-management-system.fr.v3.44.1.1468445032b3.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.fr.v3.44.1.c6b96451ceff.pdf',
  'm08-agents-custom': 'm08-agents-custom.fr.v3.44.1.2eacc994f69a.pdf',
  'm09-slash-commands': 'm09-slash-commands.fr.v3.44.1.fee5abd90395.pdf',
  'm10-skills': 'm10-skills.fr.v3.44.1.8625dd8fe803.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.fr.v3.44.1.187668a65c11.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.fr.v3.44.1.c7cf235adb87.pdf',
  'm13-worktrees': 'm13-worktrees.fr.v3.44.1.760f2200ef97.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.fr.v3.44.1.df5f2920ce82.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.fr.v3.44.1.aaae7b7def51.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.fr.v3.44.1.3517881b453e.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.fr.v3.44.1.ef03b30a0478.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.fr.v3.44.1.64b39988d399.pdf',
  'm19-github-actions': 'm19-github-actions.fr.v3.44.1.bb4616673140.pdf',
  'm20-cicd-production': 'm20-cicd-production.fr.v3.44.1.22855a340549.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.fr.v3.44.1.4bf567749d46.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.fr.v3.44.1.6ac1d444b1f6.pdf',
  // ── Technique (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.fr.v3.44.1.2d61750c3f1b.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.fr.v3.44.1.e222262b6a4b.pdf',
  't03-permission-modes': 't03-permission-modes.fr.v3.44.1.39016e1fb974.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.fr.v3.44.1.78a8659223e0.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.fr.v3.44.1.e68ab24e51e3.pdf',
  't06-settings-json': 't06-settings-json.fr.v3.44.1.1ebccb70439a.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.fr.v3.44.1.2c032fa381cb.pdf',
  't08-auto-memories': 't08-auto-memories.fr.v3.44.1.01f53f7c2efd.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.fr.v3.44.1.a637611bf867.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.fr.v3.44.1.cbfdc31e2a7b.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.fr.v3.44.1.977101a8462d.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.fr.v3.44.1.8a6e1f13a98e.pdf',
  't13-context7-sequential': 't13-context7-sequential.fr.v3.44.1.1d32ed54dcbc.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.fr.v3.44.1.0602826bf933.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.fr.v3.44.1.040197670c9c.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.fr.v3.44.1.84183ff839f7.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.fr.v3.44.1.c1c444028863.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.fr.v3.44.1.120ee60d2273.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.fr.v3.44.1.5bd5b4b29457.pdf',
  't20-token-optimization': 't20-token-optimization.fr.v3.44.1.d39d84d655ce.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.fr.v3.44.1.441eda7b2aad.pdf',
  't22-third-party-tools': 't22-third-party-tools.fr.v3.44.1.e0aedb8ef3ea.pdf',
}

/** Backward-compat alias: prefer CARD_HASHES_FR */
export const CARD_HASHES = CARD_HASHES_FR

/** Map: card ID (slug) → hashed EN PDF filename on Vercel */
export const CARD_HASHES_EN: Record<string, string> = {
  // ── Design (C) ──────────────────────────────────────────────────────────────
  'c01-trust-calibration': 'c01-trust-calibration.en.v3.44.1.2d4ce7736fa7.pdf',
  'c02-prompting-basics': 'c02-prompting-basics.en.v3.44.1.96f16e1d2f57.pdf',
  'c03-xml-prompting-anchors': 'c03-xml-prompting-anchors.en.v3.44.1.df6f007eb886.pdf',
  'c04-commands-skills-plugins-agents': 'c04-commands-skills-plugins-agents.en.v3.44.1.ba7734096e4f.pdf',
  'c05-memory-stack': 'c05-memory-stack.en.v3.44.1.06eb4ed7c6e8.pdf',
  'c06-configuration-decision-guide': 'c06-configuration-decision-guide.en.v3.44.1.80f9a08193e6.pdf',
  'c07-conventions-equipe-scale': 'c07-conventions-equipe-scale.en.v3.44.1.6218287bdd4e.pdf',
  'c08-surface-attaque-menaces': 'c08-surface-attaque-menaces.en.v3.44.1.934fa9a67da2.pdf',
  'c09-prompt-injection-defenses': 'c09-prompt-injection-defenses.en.v3.44.1.b69b6340f8ab.pdf',
  'c10-ai-traceability': 'c10-ai-traceability.en.v3.44.1.0f12998c8cd9.pdf',
  'c11-subscription-vs-api-patterns': 'c11-subscription-vs-api-patterns.en.v3.44.1.cd162121192b.pdf',
  'c12-agent-sdk-integrations-ide': 'c12-agent-sdk-integrations-ide.en.v3.44.1.020e027e23a6.pdf',
  'c13-erreurs-courantes': 'c13-erreurs-courantes.en.v3.44.1.6a97e81d8dca.pdf',
  'c14-agent-harness-map': 'c14-agent-harness-map.en.v3.44.1.6f5f40a8fa41.pdf',
  // ── Methodology (M) ─────────────────────────────────────────────────────────
  'm01-workflow-quotidien': 'm01-workflow-quotidien.en.v3.44.1.19bfec6b7af2.pdf',
  'm02-context-management': 'm02-context-management.en.v3.44.1.9bca2b0e01a9.pdf',
  'm03-sessions-continuite': 'm03-sessions-continuite.en.v3.44.1.23140a3f0a3a.pdf',
  'm04-compact-vs-clear': 'm04-compact-vs-clear.en.v3.44.1.c3246224019c.pdf',
  'm05-plan-mode': 'm05-plan-mode.en.v3.44.1.fb01f885642f.pdf',
  'm06-task-management-system': 'm06-task-management-system.en.v3.44.1.d0c11f4ddb8e.pdf',
  'm07-todowrite-vs-tasks-api': 'm07-todowrite-vs-tasks-api.en.v3.44.1.5fbae2c73f41.pdf',
  'm08-agents-custom': 'm08-agents-custom.en.v3.44.1.fdfbc4658757.pdf',
  'm09-slash-commands': 'm09-slash-commands.en.v3.44.1.43dc6c0f8ef5.pdf',
  'm10-skills': 'm10-skills.en.v3.44.1.b2295cdd2f7e.pdf',
  'm11-hooks-evenements-systeme': 'm11-hooks-evenements-systeme.en.v3.44.1.cf67ab4933b6.pdf',
  'm12-hooks-patterns-concrets': 'm12-hooks-patterns-concrets.en.v3.44.1.ae92b0f190bc.pdf',
  'm13-worktrees': 'm13-worktrees.en.v3.44.1.4b684a36277f.pdf',
  'm14-plan-validate-execute': 'm14-plan-validate-execute.en.v3.44.1.5a6a15a23b8d.pdf',
  'm15-tdd-bdd-sdd': 'm15-tdd-bdd-sdd.en.v3.44.1.24a81ae43e45.pdf',
  'm16-multi-agent-topologie': 'm16-multi-agent-topologie.en.v3.44.1.fce8a1f0cece.pdf',
  'm17-multi-agent-communication-trust': 'm17-multi-agent-communication-trust.en.v3.44.1.13b0ecc48ef0.pdf',
  'm18-event-driven-agents': 'm18-event-driven-agents.en.v3.44.1.2cbcc4cf2d0d.pdf',
  'm19-github-actions': 'm19-github-actions.en.v3.44.1.1d5524f1ef37.pdf',
  'm20-cicd-production': 'm20-cicd-production.en.v3.44.1.e0ff2976dd7c.pdf',
  'm21-debug-methodique': 'm21-debug-methodique.en.v3.44.1.b6230ebca470.pdf',
  'm22-observabilite-jsonl': 'm22-observabilite-jsonl.en.v3.44.1.ccee29f1566b.pdf',
  // ── Technical (T) ───────────────────────────────────────────────────────────
  't01-commandes-essentielles': 't01-commandes-essentielles.en.v3.44.1.04c74400ce56.pdf',
  't02-mode-non-interactif': 't02-mode-non-interactif.en.v3.44.1.ea6fa55ba481.pdf',
  't03-permission-modes': 't03-permission-modes.en.v3.44.1.f2e819a6653d.pdf',
  't04-permissions-glob-patterns': 't04-permissions-glob-patterns.en.v3.44.1.141488ba6b20.pdf',
  't05-hierarchie-configuration': 't05-hierarchie-configuration.en.v3.44.1.bef98e23c0bd.pdf',
  't06-settings-json': 't06-settings-json.en.v3.44.1.58a33ab853d4.pdf',
  't07-claudemd-best-practices': 't07-claudemd-best-practices.en.v3.44.1.ad4b0d946883.pdf',
  't08-auto-memories': 't08-auto-memories.en.v3.44.1.31d4e325ae6d.pdf',
  't09-workspace-hygiene': 't09-workspace-hygiene.en.v3.44.1.0d089a4e9cde.pdf',
  't10-config-multi-machine': 't10-config-multi-machine.en.v3.44.1.f24e39bd63e8.pdf',
  't11-search-tools-decision': 't11-search-tools-decision.en.v3.44.1.fda1990741e4.pdf',
  't12-mcp-servers-overview': 't12-mcp-servers-overview.en.v3.44.1.ad1203d794d4.pdf',
  't13-context7-sequential': 't13-context7-sequential.en.v3.44.1.4d874882d98b.pdf',
  't14-grepai-semantic-search': 't14-grepai-semantic-search.en.v3.44.1.ed7491fb2bb7.pdf',
  't15-mcp-secrets-management': 't15-mcp-secrets-management.en.v3.44.1.25bfbd7d297d.pdf',
  't16-sandbox-natif-architecture': 't16-sandbox-natif-architecture.en.v3.44.1.5a22f6cf851f.pdf',
  't17-sandbox-natif-vs-docker': 't17-sandbox-natif-vs-docker.en.v3.44.1.f2e89a4306bd.pdf',
  't18-modeles-thinking-modes': 't18-modeles-thinking-modes.en.v3.44.1.0c116a4e9718.pdf',
  't19-context-window-200k-1m': 't19-context-window-200k-1m.en.v3.44.1.b60d278dd237.pdf',
  't20-token-optimization': 't20-token-optimization.en.v3.44.1.32f090290f50.pdf',
  't21-fast-mode-api': 't21-fast-mode-api.en.v3.44.1.39be5b9a86c8.pdf',
  't22-third-party-tools': 't22-third-party-tools.en.v3.44.1.7c51a1b0dd39.pdf',
}

/** localStorage key for shared subscriber flag */
export const LS_SUBSCRIBER = 'cc-subscriber'

/** localStorage key for a given series unlock, e.g. cc-unlocked-T */
export const lsUnlockKey = (seriesId: 'T' | 'M' | 'C') => `cc-unlocked-${seriesId}`
