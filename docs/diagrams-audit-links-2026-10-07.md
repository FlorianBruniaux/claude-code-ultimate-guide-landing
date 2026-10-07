# Diagram links audit, 2026-10-07

Scope: all click directives and Markdown links in the 12 source themes and their README, all 40 landing fallback URLs, and node links extracted from the public SVGs retrieved during this audit.

137 unique URLs: 103 verified, 34 missing files or fragments, 0 unresolved. 34 distinct guide files read from the remote main branch.

A raw file response of HTTP 200 verifies remote file availability. Fragments are checked against Markdown heading slugs and explicit HTML anchors; this does not prove GitHub's visual scroll position or semantic relevance. External page fragments remain unverified. HTTP 403/429, timeouts and other failures remain UNKNOWN. All results and origins are in the adjacent JSON file.

## Broken destinations

| URL | Remote result | Origins |
| --- | --- | --- |
| [guide/core/architecture.md#master-loop](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/architecture.md#master-loop) | MISSING_FRAGMENT | fallback architecture/1, Markdown 04-architecture-internals.md |
| [guide/core/architecture.md#mcp-architecture](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/architecture.md#mcp-architecture) | MISSING_FRAGMENT | fallback mcp/2, Markdown 05-mcp-ecosystem.md |
| [guide/core/architecture.md#sub-agents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/architecture.md#sub-agents) | MISSING_FRAGMENT | fallback architecture/4, Markdown 04-architecture-internals.md |
| [guide/core/architecture.md#system-prompt](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/architecture.md#system-prompt) | MISSING_FRAGMENT | fallback architecture/3, Markdown 04-architecture-internals.md |
| [guide/core/architecture.md#tools](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/architecture.md#tools) | MISSING_FRAGMENT | fallback architecture/2, Markdown 04-architecture-internals.md |
| [guide/core/memory-systems.md#21-claudemd-three-levels](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/memory-systems.md#21-claudemd-three-levels) | MISSING_FRAGMENT | Mermaid 02-context-and-sessions.md, public SVG |
| [guide/core/memory-systems.md#22-auto-memory-v21594](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/core/memory-systems.md#22-auto-memory-v21594) | MISSING_FRAGMENT | Mermaid 02-context-and-sessions.md, public SVG |
| [guide/diagrams/01-foundations.md#quick-decision-tree](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/diagrams/01-foundations.md#quick-decision-tree) | MISSING_FRAGMENT | Markdown README.md |
| [guide/diagrams/04-architecture-internals.md#tool-categories](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/diagrams/04-architecture-internals.md#tool-categories) | MISSING_FRAGMENT | Markdown README.md |
| [guide/diagrams/05-mcp-ecosystem.md#mcp-architecture-client-server](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/diagrams/05-mcp-ecosystem.md#mcp-architecture-client-server) | MISSING_FRAGMENT | Markdown README.md |
| [guide/diagrams/07-multi-agent-patterns.md#agent-teams-topology-3-patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/diagrams/07-multi-agent-patterns.md#agent-teams-topology-3-patterns) | MISSING_FRAGMENT | Markdown README.md |
| [guide/diagrams/08-security-and-production.md#security-3-layer-defense](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/diagrams/08-security-and-production.md#security-3-layer-defense) | MISSING_FRAGMENT | Markdown README.md |
| [guide/diagrams/12-enterprise-governance.md#governance-risk-tiers](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/diagrams/12-enterprise-governance.md#governance-risk-tiers) | MISSING_FRAGMENT | Markdown README.md |
| [guide/security/security-hardening.md#mcp-threats](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/security/security-hardening.md#mcp-threats) | MISSING_FRAGMENT | fallback mcp/3, Markdown 05-mcp-ecosystem.md |
| [guide/ultimate-guide.md#cicd-integration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#cicd-integration) | MISSING_FRAGMENT | fallback security/4, Markdown 08-security-and-production.md |
| [guide/ultimate-guide.md#common-pitfalls--best-practices](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#common-pitfalls--best-practices) | MISSING_FRAGMENT | Mermaid 06-development-workflows.md, Markdown 06-development-workflows.md, public SVG |
| [guide/ultimate-guide.md#configuration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#configuration) | MISSING_FRAGMENT | fallback configuration/1, Markdown 03-configuration-system.md |
| [guide/ultimate-guide.md#context-best-practices](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#context-best-practices) | MISSING_FRAGMENT | fallback context-sessions/4, Markdown 02-context-and-sessions.md |
| [guide/ultimate-guide.md#cost-optimization](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#cost-optimization) | MISSING_FRAGMENT | fallback cost/2, Markdown 09-cost-and-optimization.md |
| [guide/ultimate-guide.md#extensibility](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#extensibility) | MISSING_FRAGMENT | fallback configuration/2, Markdown 03-configuration-system.md |
| [guide/ultimate-guide.md#getting-started](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#getting-started) | MISSING_FRAGMENT | fallback foundations/2, Markdown 01-foundations.md |
| [guide/ultimate-guide.md#git-worktrees](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#git-worktrees) | MISSING_FRAGMENT | fallback multi-agent/2, Markdown 07-multi-agent-patterns.md |
| [guide/ultimate-guide.md#hooks](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#hooks) | MISSING_FRAGMENT | fallback configuration/4 |
| [guide/ultimate-guide.md#horizontal-scaling](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#horizontal-scaling) | MISSING_FRAGMENT | fallback multi-agent/4, Markdown 07-multi-agent-patterns.md |
| [guide/ultimate-guide.md#how-claude-code-works](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#how-claude-code-works) | MISSING_FRAGMENT | fallback foundations/1, Markdown 01-foundations.md |
| [guide/ultimate-guide.md#mcp-configuration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#mcp-configuration) | MISSING_FRAGMENT | fallback mcp/4, Markdown 05-mcp-ecosystem.md |
| [guide/ultimate-guide.md#memory-system](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#memory-system) | MISSING_FRAGMENT | fallback context-sessions/2, Markdown 02-context-and-sessions.md |
| [guide/ultimate-guide.md#multi-instance-patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#multi-instance-patterns) | MISSING_FRAGMENT | fallback multi-agent/5, Markdown 07-multi-agent-patterns.md |
| [guide/ultimate-guide.md#permission-system](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#permission-system) | MISSING_FRAGMENT | fallback foundations/4, Markdown 01-foundations.md |
| [guide/ultimate-guide.md#session-management](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#session-management) | MISSING_FRAGMENT | fallback context-sessions/3, Markdown 02-context-and-sessions.md |
| [guide/ultimate-guide.md#sub-agents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#sub-agents) | MISSING_FRAGMENT | fallback configuration/3, Markdown 03-configuration-system.md |
| [guide/ultimate-guide.md#subscription-tiers](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#subscription-tiers) | MISSING_FRAGMENT | fallback cost/3, Markdown 09-cost-and-optimization.md |
| [guide/ultimate-guide.md#token-optimization](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#token-optimization) | MISSING_FRAGMENT | fallback cost/4, Markdown 09-cost-and-optimization.md |
| [guide/ultimate-guide.md#trust-verification](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/guide/ultimate-guide.md#trust-verification) | MISSING_FRAGMENT | fallback adoption/3, Markdown 10-adoption-and-learning.md |

## Unresolved destinations
