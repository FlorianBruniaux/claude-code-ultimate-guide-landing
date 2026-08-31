export const guideHighlights = [
  {
    title: 'Loop & Graph Engineering',
    href: '/guide/loop-graph-engineering/',
    desc: 'Design bounded feedback loops, executable graphs, checkpoints, recovery, and explicit judgment allocation.',
  },
  {
    title: 'Agent Harness Engineering',
    href: '/guide/agent-harness/',
    desc: 'Build the reliability layer around a model: context, policy, tools, verification, observability, and recovery.',
  },
  {
    title: 'Agent Harness Landscape',
    href: '/guide/agent-harness-landscape/',
    desc: 'Compare 192 projects while separating strict runtimes, control planes, repository harnesses, and adjacent infrastructure.',
  },
  {
    title: 'Subscription Strategy at Team Scale',
    href: '/guide/subscription-strategy/',
    desc: 'Choose between seats, usage billing, API gateways, multi-vendor setups, and scenario-bound self-hosting.',
  },
  {
    title: 'Monitor & Safe Event Delegation',
    href: '/guide/workflows/monitor-event-delegation/',
    desc: 'Turn external events into verified, deduplicated, gated, and isolated agent work.',
  },
  {
    title: 'Agentic Software Factories',
    href: '/guide/workflows/agentic-software-factories/',
    desc: 'Move from one coding session to governed multi-run production without adding a control plane too early.',
  },
  {
    title: 'Team AI Instructions',
    href: '/guide/workflows/team-ai-instructions/',
    desc: 'Scale shared AI instructions across a team while preserving ownership, review, and local autonomy.',
  },
  {
    title: 'Practitioner Insights',
    href: '/guide/practitioner-insights/',
    desc: 'Trace field reports and academic evidence back to named speakers, videos, papers, and explicit limits.',
  },
]

export const guidePaths = [
  {
    title: 'Learn Claude Code',
    href: '/guide/ultimate-guide/01-quick-start/',
    desc: 'Install the CLI, complete a first task, then progress through memory, agents, skills, hooks, and MCP.',
  },
  {
    title: 'Engineer reliable agents',
    href: '/guide/agent-harness/',
    desc: 'Start with the runtime loop, then add graph structure, evaluation, observability, and orchestration only when needed.',
  },
  {
    title: 'Secure and govern',
    href: '/guide/security-hardening/',
    desc: 'Control permissions, sandboxes, MCP supply-chain risk, production gates, data handling, and organizational policy.',
  },
  {
    title: 'Scale a team',
    href: '/guide/subscription-strategy/',
    desc: 'Connect adoption, team instructions, knowledge infrastructure, metrics, gateways, and unit economics.',
  },
]

export const guideSections = [
  {
    title: 'Core Reference',
    icon: '📚',
    desc: 'Claude Code fundamentals and complete references.',
    links: [
      { title: 'Ultimate Guide', href: '/guide/ultimate-guide/', desc: 'The complete chapter-by-chapter reference.', time: '~3 hours' },
      { title: 'Translations', href: '/guide/translations/', desc: 'Verified status for English, French, Chinese, Ukrainian, and Latin American Spanish.', time: '8 min' },
      { title: 'Cheatsheet', href: '/guide/cheatsheet/', desc: 'Essential commands and configuration on one page.', time: '5 min' },
      { title: 'Architecture', href: '/guide/architecture/', desc: 'Master loop, tool execution, context, and internal boundaries.', time: '25 min' },
      { title: 'Tools Reference', href: '/guide/tools-reference/', desc: 'Built-in tools, permissions, timeouts, and behaviors.', time: '20 min' },
      { title: 'Hooks & Events Reference', href: '/guide/hooks-events-reference/', desc: 'Hook events, matchers, schemas, decisions, and timeouts.', time: '15 min' },
      { title: 'Settings Reference', href: '/guide/settings-reference/', desc: 'Confirmed settings and environment variables.', time: '15 min' },
      { title: 'Methodologies', href: '/guide/methodologies/', desc: 'Development methodologies and combination patterns.', time: '20 min' },
      { title: 'Visual Reference', href: '/guide/visual-reference/', desc: 'Compact diagrams for core concepts.', time: '5 min' },
      { title: 'Known Issues', href: '/guide/known-issues/', desc: 'Critical bugs and verified operational limits.', time: '15 min' },
      { title: 'Glossary', href: '/guide/glossary/', desc: 'Claude Code and agent-engineering terminology.', time: '5 min' },
      { title: 'Community Patterns', href: '/guide/community-patterns/', desc: 'Community-coined workflows and engineering patterns.', time: '10 min' },
      { title: 'Skill Design Patterns', href: '/guide/skill-design-patterns/', desc: 'Architectural patterns for robust, efficient skills.', time: '20 min' },
    ],
  },
  {
    title: 'Agent Engineering',
    icon: '🧭',
    desc: 'Loops, graphs, harnesses, evaluation, and orchestration.',
    links: [
      { title: 'Agent Harness Engineering', href: '/guide/agent-harness/', desc: 'Runtime reliability architecture around the model.', time: '35 min' },
      { title: 'Loop & Graph Engineering', href: '/guide/loop-graph-engineering/', desc: 'Bounded loops, executable graphs, durable state, and judgment.', time: '25 min' },
      { title: 'Agent Harness Landscape', href: '/guide/agent-harness-landscape/', desc: 'Evidence-backed map of runtimes and adjacent systems.', time: '20 min' },
      { title: 'Agentic Tools', href: '/guide/agentic-tools/', desc: 'Detailed tool profiles and comparison matrix.', time: '20 min' },
      { title: 'Agent Evaluation', href: '/guide/agent-evaluation/', desc: 'Measure model-harness quality across repeated runs.', time: '20 min' },
      { title: 'Agentic Software Factories', href: '/guide/workflows/agentic-software-factories/', desc: 'Operating model from one session to a governed factory.', time: '20 min' },
    ],
  },
  {
    title: 'Context, Memory & Economics',
    icon: '🧠',
    desc: 'Control what agents know, retain, spend, and share.',
    links: [
      { title: 'Context Engineering', href: '/guide/context-engineering/', desc: 'Token budgets, modular context, ACE, and quality measurement.', time: '25 min' },
      { title: 'Memory Systems', href: '/guide/memory-systems/', desc: 'Native, cross-session, and team-shared memory.', time: '30 min' },
      { title: 'Team Knowledge Infrastructure', href: '/guide/team-knowledge-base/', desc: 'Markdown, live connectors, and RAG at team scale.', time: '18 min' },
      { title: 'Local vs Cloud Inference', href: '/guide/local-vs-cloud-inference/', desc: 'Hardware, rental, API, throughput, and TCO boundaries.', time: '20 min' },
      { title: 'AI Unit Economics', href: '/guide/ai-unit-economics/', desc: 'Per-task cost, routing, context injection, and break-even reasoning.', time: '15 min' },
      { title: 'Subscription Strategy', href: '/guide/subscription-strategy/', desc: 'Seats, Enterprise usage, gateways, and self-hosting scenarios.', time: '20 min' },
    ],
  },
  {
    title: 'Security & Governance',
    icon: '🔒',
    desc: 'Permission, isolation, supply-chain, data, and production controls.',
    links: [
      { title: 'Security Hardening', href: '/guide/security-hardening/', desc: 'Threat model, MCP vetting, and prompt-injection defenses.', time: '25 min' },
      { title: 'Sandbox Isolation', href: '/guide/sandbox-isolation/', desc: 'Local and cloud isolation trade-offs.', time: '15 min' },
      { title: 'Native Sandbox', href: '/guide/sandbox-native/', desc: 'Claude Code sandbox configuration and limits.', time: '10 min' },
      { title: 'Production Safety', href: '/guide/production-safety/', desc: 'Guardrails, review gates, rollback, and recovery.', time: '15 min' },
      { title: 'Data Privacy', href: '/guide/data-privacy/', desc: 'Data flows, retention, and privacy controls.', time: '10 min' },
      { title: 'Enterprise Governance', href: '/guide/enterprise-governance/', desc: 'Usage charters, approval workflows, and risk tiers.', time: '25 min' },
    ],
  },
  {
    title: 'Operations & Team Adoption',
    icon: '📈',
    desc: 'Operate, observe, finance, and govern AI-assisted delivery.',
    links: [
      { title: 'DevOps & SRE', href: '/guide/devops-sre/', desc: 'Infrastructure diagnosis and incident response.', time: '30 min' },
      { title: 'Observability', href: '/guide/observability/', desc: 'Traces, reliability signals, cost, and recovery metrics.', time: '20 min' },
      { title: 'API Gateway', href: '/guide/api-gateway/', desc: 'Centralized routing, budgets, allowlists, and attribution.', time: '15 min' },
      { title: 'AI Traceability', href: '/guide/ai-traceability/', desc: 'Attribution, disclosure, audit trails, and compliance.', time: '20 min' },
      { title: 'Team Metrics', href: '/guide/team-metrics/', desc: 'DORA, SPACE, Core 4, and agent-specific signals.', time: '20 min' },
      { title: 'Adoption Approaches', href: '/guide/adoption-approaches/', desc: 'Rollout strategies, trust calibration, and evidence.', time: '15 min' },
    ],
  },
  {
    title: 'Ecosystem & Tools',
    icon: '🧰',
    desc: 'Complementary tools, MCP servers, research, and field evidence.',
    links: [
      { title: 'AI Ecosystem', href: '/ecosystem/', desc: 'Complementary AI tools and multi-provider workflows.', time: '30 min' },
      { title: 'MCP Servers Ecosystem', href: '/guide/mcp-servers-ecosystem/', desc: 'Validated MCP servers and production configuration.', time: '25 min' },
      { title: 'MCP vs CLI', href: '/guide/mcp-vs-cli/', desc: 'Choose the smallest tool interface for the job.', time: '15 min' },
      { title: 'Third-Party Tools', href: '/guide/third-party-tools/', desc: 'GUIs, TUIs, config managers, and token trackers.', time: '15 min' },
      { title: 'Context Engineering Tools', href: '/guide/context-engineering-tools/', desc: 'Compression, RAG, gateways, and LLMOps tooling.', time: '20 min' },
      { title: 'Remarkable AI', href: '/guide/remarkable-ai/', desc: 'Power-user patterns and noteworthy projects.', time: '10 min' },
      { title: 'Practitioner Insights', href: '/guide/practitioner-insights/', desc: 'Attributed video, conference, and academic evidence.', time: '20 min' },
      { title: 'AI Executive Agents', href: '/guide/ai-executive-agents/', desc: 'Virtual C-suites, board simulators, and governance limits.', time: '12 min' },
    ],
  },
  {
    title: 'Roles & Learning',
    icon: '🎓',
    desc: 'Role-specific entry points and responsible learning paths.',
    links: [
      { title: 'AI Roles', href: '/roles/', desc: 'Role definitions, routing, and the interactive quiz.', time: '10 min' },
      { title: 'Learning with AI', href: '/guide/learning-with-ai/', desc: 'Build skills without outsourcing understanding.', time: '15 min' },
      { title: 'For Product Managers', href: '/guide/for-product-managers/', desc: 'Specs, review, and prototyping for PMs.', time: '5 min' },
      { title: 'For Tech Leads', href: '/guide/for-tech-leads/', desc: 'Shared config, rollout, and safety for leads.', time: '5 min' },
      { title: 'For CTOs', href: '/guide/for-cto/', desc: 'Business case, governance, and adoption metrics.', time: '5 min' },
      { title: 'For CIOs & CEOs', href: '/guide/for-cio-ceo/', desc: 'Executive brief and decision boundaries.', time: '3 min' },
    ],
  },
  {
    title: 'Workflows',
    icon: '⚙️',
    desc: 'Runnable patterns for planning, implementation, review, and delegation.',
    links: [
      { title: 'All Workflows', href: '/guide/workflows/', desc: 'Browse the complete workflow index.', time: 'Index' },
      { title: 'TDD with Claude', href: '/guide/workflows/tdd-with-claude/', desc: 'Test-driven development with an agent.', time: '15 min' },
      { title: 'Spec-First', href: '/guide/workflows/spec-first/', desc: 'Intent, specification, plan, and implementation gates.', time: '20 min' },
      { title: 'Plan-Driven', href: '/guide/workflows/plan-driven/', desc: 'Use planning as an explicit control boundary.', time: '15 min' },
      { title: 'Agent Teams', href: '/guide/workflows/agent-teams/', desc: 'Multi-agent coordination and worktree isolation.', time: '25 min' },
      { title: 'Dynamic Workflows', href: '/guide/workflows/dynamic-workflows/', desc: 'Deterministic orchestration, fan-out, and resume.', time: '20 min' },
      { title: 'Monitor & Safe Delegation', href: '/guide/workflows/monitor-event-delegation/', desc: 'Event ingestion, verification, and gated handoff.', time: '20 min' },
      { title: 'Team AI Instructions', href: '/guide/workflows/team-ai-instructions/', desc: 'Scale shared instructions across developers and tools.', time: '20 min' },
      { title: 'Production Reliability', href: '/guide/workflows/production-reliability/', desc: 'Escalation, circuit breakers, and graceful degradation.', time: '20 min' },
      { title: 'Multi-Provider Code Review', href: '/guide/workflows/multi-provider-code-review/', desc: 'Independent review across providers and evidence sources.', time: '20 min' },
      { title: 'Cross-Session Messaging', href: '/guide/workflows/cross-session-messaging/', desc: 'Discover and communicate between independent sessions.', time: '15 min' },
      { title: 'Search Tools Mastery', href: '/guide/workflows/search-tools-mastery/', desc: 'Combine lexical, semantic, and structural search.', time: '20 min' },
    ],
  },
]

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function tableCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function renderCards(links) {
  return links
    .map((link) => `<LinkCard title="${escapeAttribute(link.title)}" href="${link.href}" description="${escapeAttribute(link.desc)}" />`)
    .join('\n')
}

export function renderGuideIndex({ guideLineCount, workflowCount }) {
  const sections = guideSections
    .map((section) => `## ${section.title}\n\n${section.desc}\n\n| Guide | What it covers | Time |\n| --- | --- | --- |\n${section.links.map((link) => `| [${tableCell(link.title)}](${link.href}) | ${tableCell(link.desc)} | ${tableCell(link.time)} |`).join('\n')}`)
    .join('\n\n')

  return `---
title: "Claude Code Guide"
description: "The complete Claude Code and agent-engineering documentation portal: learning paths, reference, security, context, operations, tools, and workflows."
sidebar:
  order: -1
template: splash
hero:
  tagline: Learn Claude Code, engineer reliable agents, and operate them safely.
  actions:
    - text: Start with Quick Start
      link: /guide/ultimate-guide/01-quick-start/
      icon: right-arrow
      variant: primary
    - text: See what changed
      link: /changelog/
      icon: open-book
---

import { CardGrid, LinkCard } from '@astrojs/starlight/components';

This portal indexes **${guideLineCount.toLocaleString('en-US')} lines of reference documentation** and **${workflowCount} workflow guides**. Use the paths below when you know your goal, or browse by topic for the complete curated map.

## New and noteworthy

<CardGrid>
${renderCards(guideHighlights)}
</CardGrid>

[Follow every guide update in the public changelog →](/changelog/)

## Choose your path

<CardGrid>
${renderCards(guidePaths)}
</CardGrid>

## Browse by topic

${sections}
`
}
