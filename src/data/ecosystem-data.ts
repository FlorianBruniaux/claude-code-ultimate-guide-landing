/**
 * Third-party ecosystem tools data for Claude Code
 * Source: guide/ecosystem/third-party-tools.md
 * Last synced: 2026-03-13
 */

export interface EcosystemTool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  source_url: string;
  website_url?: string;
  install: string;
  language: string;
  version?: string;
  status: ToolStatus;
  author?: string;
  features: string[];
  limitations: string[];
  when_to_use?: string;
  cross_ref?: string;
}

export type ToolCategory =
  | 'token-tracking'
  | 'session-management'
  | 'config-management'
  | 'hook-utilities'
  | 'alternative-ui'
  | 'multi-agent'
  | 'external-orchestration'
  | 'plugin-ecosystem';

export type ToolStatus = 'stable' | 'beta' | 'alpha' | 'watch';

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  'token-tracking': 'Token & Cost Tracking',
  'session-management': 'Session Management',
  'config-management': 'Configuration Management',
  'hook-utilities': 'Hook Utilities',
  'alternative-ui': 'Alternative UIs',
  'multi-agent': 'Multi-Agent Orchestration',
  'external-orchestration': 'External Orchestration',
  'plugin-ecosystem': 'Plugin Ecosystem',
};

export const STATUS_LABELS: Record<ToolStatus, string> = {
  stable: 'Stable',
  beta: 'Beta',
  alpha: 'Alpha',
  watch: 'Watch',
};

export const ECOSYSTEM_TOOLS: EcosystemTool[] = [
  // ── Token & Cost Tracking ─────────────────────────────────────────────────

  {
    id: 'ccusage',
    name: 'ccusage',
    category: 'token-tracking',
    description:
      'The most mature cost tracking tool for Claude Code. Parses local session data to produce cost reports by day, month, session, or 5-hour billing window.',
    source_url: 'https://www.npmjs.com/package/ccusage',
    website_url: 'https://ccusage.com',
    install: 'bunx ccusage',
    language: 'TypeScript',
    version: '18.x',
    status: 'stable',
    features: [
      'Daily / monthly / session aggregated cost reports',
      'Real-time monitoring against 5-hour billing windows (`--live`)',
      'Per-model cost breakdown (Opus / Sonnet / Haiku)',
      'Date filtering with `--since` / `--until`',
      'JSON output for programmatic access',
      'MCP server integration (`@ccusage/mcp`)',
      'macOS widget + Raycast extension',
    ],
    limitations: [
      'Relies on local JSONL parsing — estimates may differ from official Anthropic billing',
      'No team aggregation without manual log merging',
    ],
    when_to_use:
      'Default choice for cost visibility. Pairs well with RTK (RTK reduces tokens, ccusage monitors them).',
    cross_ref: 'guide/ultimate-guide.md — Section 2.4 (cost monitoring)',
  },

  {
    id: 'ccburn',
    name: 'ccburn',
    category: 'token-tracking',
    description:
      'A Python TUI for visual token burn-rate tracking. Displays charts showing consumption rate relative to billing windows.',
    source_url: 'https://github.com/JuanjoFuchs/ccburn',
    install: 'pip install ccburn',
    language: 'Python',
    status: 'beta',
    author: 'JuanjoFuchs',
    features: [
      'Terminal charts showing token consumption over time',
      'Burn-rate indicators (on-track / slow-down warnings)',
      'Compact display mode',
      'Visual budget tracking against limits',
    ],
    limitations: [
      'Python-only ecosystem',
      'Smaller community than ccusage',
      'No MCP integration',
    ],
    when_to_use:
      'Prefer ccburn over ccusage if you want visual burn-rate charts rather than tabular reports, or if your toolchain is Python-based.',
  },

  {
    id: 'straude',
    name: 'Straude',
    category: 'token-tracking',
    description:
      'A social dashboard for tracking and sharing Claude Code usage stats. Push daily token consumption and costs to a public leaderboard for streak tracking and global ranking.',
    source_url: 'https://www.npmjs.com/package/straude',
    website_url: 'https://straude.com',
    install: 'npx straude@latest',
    language: 'TypeScript',
    version: '0.1.9',
    status: 'alpha',
    features: [
      'Smart sync: authenticate + push usage in one command',
      'Dry-run preview before submitting',
      'Backfill last N days (max 7)',
      'Streak, weekly spend, token totals, global rank',
      'Tracks both Claude Code and OpenAI Codex',
    ],
    limitations: [
      'Uploads stats to an external server (machine hostname, token counts, model names)',
      'No published privacy policy as of March 2026',
      'Very young project (created Feb 2026) — no public security audit',
    ],
    when_to_use:
      'Only tool with social / leaderboard features. If you want local-only cost visibility, ccusage or ccburn carry no data-sharing implications.',
  },

  {
    id: 'rtk',
    name: 'RTK (Rust Token Killer)',
    category: 'token-tracking',
    description:
      'A CLI proxy that filters command outputs before they reach Claude\'s context. 446 stars, 700+ upvotes on r/ClaudeAI. 60-90% token reduction on common dev operations.',
    source_url: 'https://github.com/rtk-ai/rtk',
    website_url: 'https://www.rtk-ai.app/',
    install: 'brew install rtk-ai/tap/rtk',
    language: 'Rust',
    version: 'v0.28.0',
    status: 'stable',
    features: [
      '`rtk git log` (92% reduction), `rtk git diff` (56%), `rtk git status` (76%)',
      '`rtk vitest run`, `rtk prisma`, `rtk pnpm` (70-90% reduction)',
      'Multi-language: Python, Go, Rust toolchain support',
      'TOML Filter DSL for custom output filters without writing Rust',
      '`rtk gain` / `rtk gain -p` — token savings analytics',
      'Hook-first install with `settings.json` auto-patch',
    ],
    limitations: [
      'Not suitable for interactive commands',
      'No benefit on very small outputs (< 100 chars)',
    ],
    when_to_use:
      'Use RTK to reduce token consumption (preprocessing). Use ccusage to monitor it (postprocessing). Use both together.',
    cross_ref: 'guide/ultimate-guide.md — Section 9 (command output optimization)',
  },

  // ── Session Management ─────────────────────────────────────────────────────

  {
    id: 'claude-code-viewer',
    name: 'claude-code-viewer',
    category: 'session-management',
    description:
      'A web-based UI for browsing and reading Claude Code conversation history (JSONL files). Project browser with full session display and real-time updates.',
    source_url: 'https://github.com/d-kimuson/claude-code-viewer',
    install: 'npx @kimuson/claude-code-viewer',
    language: 'TypeScript',
    version: '0.5.x',
    status: 'beta',
    author: 'd-kimuson',
    features: [
      'Project browser with session counts and metadata',
      'Full conversation display with syntax highlighting',
      'Tool usage results displayed inline',
      'Real-time updates via Server-Sent Events',
      'Responsive design (desktop + mobile)',
    ],
    limitations: [
      'Read-only — cannot edit or resume sessions',
      'No cost data',
      'Requires existing `~/.claude/projects/` history',
    ],
    when_to_use:
      'Lightweight history browser. No setup beyond `npx`. Use Entire CLI if you need session replay or governance.',
  },

  {
    id: 'entire-cli',
    name: 'Entire CLI',
    category: 'session-management',
    description:
      'Agent-native platform for Git-integrated session capture with rewindable checkpoints and governance layer. Founded by Thomas Dohmke (ex-GitHub CEO), $60M funding.',
    source_url: 'https://github.com/entireio/cli',
    website_url: 'https://entire.io',
    install: 'See entire.io (early access)',
    language: 'TypeScript',
    status: 'beta',
    author: 'Melty Labs (Thomas Dohmke)',
    features: [
      'Automatic session recording with full context (prompts + reasoning + file changes)',
      'Rewindable checkpoints — restore any session state',
      'Governance layer: permission system, human approval gates, audit trails',
      'Agent handoffs preserving context (Claude → Gemini)',
      'Git-native storage on `entire/checkpoints/v1` branch',
      'Multi-agent support with context sharing',
    ],
    limitations: [
      'Very new (launched Feb 2026) — limited production feedback',
      'Enterprise-focused (may be complex for solo devs)',
      '~5-10% storage overhead per project',
      'macOS/Linux only (Windows via WSL)',
    ],
    when_to_use:
      'SOC2/HIPAA compliance, multi-agent workflows, debugging AI decisions by rewinding. Use claude-code-viewer for simple history browsing.',
    cross_ref: 'guide/ops/ai-traceability.md — Section 5.1 (Entire CLI)',
  },

  // ── Configuration Management ───────────────────────────────────────────────

  {
    id: 'claude-code-config',
    name: 'claude-code-config',
    category: 'config-management',
    description:
      'A Python TUI for managing `~/.claude.json` configuration, focused on MCP server management. Visual add / edit / remove with Textual.',
    source_url: 'https://github.com/joeyism/claude-code-config',
    install: 'pip install claude-code-config',
    language: 'Python',
    status: 'alpha',
    author: 'joeyism',
    features: [
      'Visual MCP server management (add, edit, remove)',
      'Configuration file editing with validation',
      'TUI navigation for `~/.claude.json` structure',
    ],
    limitations: [
      'Limited to `~/.claude.json` scope only',
      'Does not manage `.claude/settings.json`, hooks, or slash commands',
    ],
  },

  {
    id: 'aiblueprint',
    name: 'AIBlueprint',
    category: 'config-management',
    description:
      'A CLI that scaffolds pre-configured Claude Code setups with hooks, commands, statusline, and workflow automation presets.',
    source_url: 'https://github.com/Melvynx/aiblueprint',
    install: 'npx aiblueprint-cli',
    language: 'TypeScript',
    status: 'alpha',
    author: 'Melvynx',
    features: [
      'Pre-built security hooks',
      'Custom command templates',
      'Statusline configuration',
      'Workflow automation presets',
    ],
    limitations: [
      'Opinionated configuration choices',
      'Some features require a premium tier',
      'Does not read existing config — scaffolds from scratch',
    ],
    cross_ref: 'guide/ultimate-guide.md — Section 4 (CLAUDE.md, settings, hooks, commands)',
  },

  // ── Hook Utilities ─────────────────────────────────────────────────────────

  {
    id: 'gitdiff-watcher',
    name: 'gitdiff-watcher',
    category: 'hook-utilities',
    description:
      'A Stop hook utility that enforces quality gates (build, tests, linting) only when relevant files changed. Makes CLAUDE.md quality rules deterministic by running outside the LLM context.',
    source_url: 'https://github.com/fcamblor/gitdiff-watcher',
    install: 'npx @fcamblor/gitdiff-watcher@0.1.0',
    language: 'TypeScript',
    version: '0.1.0',
    status: 'alpha',
    author: 'Florian Camblor',
    features: [
      'Glob-based file change detection via SHA-256 hashing',
      'Conditional execution — only fires when matching files changed',
      'Retry-safe: failed checks preserve snapshot, runs again next turn',
      'Parallel checks via separate hook entries',
      'Silent on no-op (no wasted CI time)',
    ],
    limitations: [
      'v0.1.0 — explicitly WIP, CLI and state format may change',
      'Only detects git-tracked files (`git diff` only)',
      'Misconfigured check always failing causes infinite retry loop',
    ],
    when_to_use:
      'Use when you want file-change conditional logic and state persistence without writing it yourself. Same gate can be written in ~20 lines of bash if you prefer no dependency.',
    cross_ref: 'guide/ultimate-guide.md — Stop hook section',
  },

  // ── Alternative UIs ────────────────────────────────────────────────────────

  {
    id: 'claude-chic',
    name: 'Claude Chic',
    category: 'alternative-ui',
    description:
      'A styled terminal UI for Claude Code built on Anthropic\'s claude-agent-sdk. Replaces the default TUI with color-coded messages, collapsible tool blocks, and git worktree management.',
    source_url: 'https://pypi.org/project/claudechic/',
    install: 'uvx claudechic',
    language: 'Python',
    status: 'alpha',
    author: 'Matthew Rocklin',
    features: [
      'Color-coded messages (orange: user, blue: Claude, grey: tools)',
      'Collapsible tool usage blocks',
      'Git worktree management from within the UI',
      'Multiple agents in a single window',
      'Vim keybindings, shell commands, `/diff` viewer',
      'Proper Markdown rendering with streaming',
    ],
    limitations: [
      'Alpha status — expect breaking changes',
      'Python dependency chain + claude-agent-sdk required',
      'macOS/Linux only',
    ],
  },

  {
    id: 'toad',
    name: 'Toad',
    category: 'alternative-ui',
    description:
      'A universal terminal frontend for AI coding agents by Will McGugan (creator of Rich & Textual). Supports Claude Code, Gemini CLI, OpenHands, Codex, and 12+ agents via Agent Client Protocol (ACP).',
    source_url: 'https://github.com/batrachianai/toad',
    install: 'curl -fsSL batrachian.ai/install | sh',
    language: 'Python',
    status: 'beta',
    author: 'Will McGugan',
    features: [
      'Unified interface across 12+ agent CLIs',
      'Full shell integration with tab completion',
      '`@` file context injection with fuzzy search',
      'Side-by-side diffs with syntax highlighting',
      'Jupyter-inspired block navigation',
      'Flicker-free character-level rendering',
    ],
    limitations: [
      'macOS/Linux only (Windows via WSL)',
      'Agent support varies by ACP compatibility',
      'No built-in session persistence yet (on roadmap)',
    ],
  },

  {
    id: 'conductor',
    name: 'Conductor',
    category: 'alternative-ui',
    description:
      'A macOS desktop app for orchestrating multiple Claude Code instances in parallel using git worktrees, with integrated diff viewing, PR workflow, and GitHub + Linear automation.',
    source_url: 'https://conductor.build',
    website_url: 'https://conductor.build',
    install: 'Download from conductor.build',
    language: 'TypeScript',
    status: 'stable',
    author: 'Melty Labs',
    features: [
      'One workspace per feature, created from GitHub / Linear issues',
      'Integrated diff viewer per agent message',
      'Failing CI checks forwarded automatically to Claude',
      'PR creation, title/description editing, merge from app',
      'Linear issue deeplinks and workspace creation',
      '"Next Workspace" button — jumps to next agent awaiting input',
    ],
    limitations: [
      'macOS only (Windows/Linux planned)',
      'Proprietary — not open source',
      'Overlaps with standalone multi-agent tools',
    ],
    when_to_use:
      'Ideal for spec-driven development with BMAD: one workspace per epic, agents per story. Funded and actively maintained.',
  },

  {
    id: 'claude-code-gui',
    name: 'Claude Code GUI',
    category: 'alternative-ui',
    description:
      'A third-party VS Code extension (not Anthropic\'s official extension) that adds a graphical layer on top of Claude Code.',
    source_url: 'https://marketplace.visualstudio.com/items?itemName=MaheshKok.claude-code-gui',
    install: 'VS Code Marketplace → search "Claude Code GUI"',
    language: 'TypeScript',
    status: 'alpha',
    author: 'MaheshKok',
    features: [
      'Graphical layer over Claude Code inside VS Code',
    ],
    limitations: [
      'NOT the official Anthropic extension — third-party, not Anthropic-maintained',
      'Features may overlap with or lag behind the official extension',
      'Limited community feedback',
    ],
    when_to_use:
      'Consider the official Claude Code for VS Code extension by Anthropic first (`anthropic.claude-code`). This extension is for users who specifically want a third-party alternative.',
  },

  // ── Multi-Agent Orchestration ──────────────────────────────────────────────

  {
    id: 'gastown',
    name: 'Gas Town',
    category: 'multi-agent',
    description:
      'Steve Yegge\'s agent-first workspace manager for running multiple Claude Code instances across git worktrees. The original community multi-agent workflow tool.',
    source_url: 'https://github.com/steveyegge/gastown',
    install: 'See GitHub README',
    language: 'TypeScript',
    status: 'beta',
    author: 'Steve Yegge',
    features: [
      'Agent-first workspace manager',
      'Git worktree-based isolation per task',
      'Multiple simultaneous agents',
      'Pairs with agent-chat for real-time monitoring',
    ],
    limitations: [
      'Requires git worktree familiarity',
      'Less polished UX than Conductor',
    ],
  },

  {
    id: 'multiclaude',
    name: 'multiclaude',
    category: 'multi-agent',
    description:
      'tmux + git worktrees for spawning multiple Claude Code instances in parallel. 383+ stars. Simple, no-frills approach to parallel agents.',
    source_url: 'https://github.com/dlorenc/multiclaude',
    install: 'See GitHub README',
    language: 'Shell',
    status: 'beta',
    author: 'dlorenc',
    features: [
      'tmux integration for multiple terminals',
      'Git worktree isolation per agent',
      '383+ stars — battle-tested community tool',
      'No extra runtime dependency beyond tmux',
    ],
    limitations: [
      'Requires tmux familiarity',
      'Minimal UI — raw terminals only',
      'No built-in monitoring (use agent-chat alongside)',
    ],
  },

  {
    id: 'agent-chat',
    name: 'agent-chat',
    category: 'multi-agent',
    description:
      'A real-time SSE monitoring UI for Gas Town / multiclaude sessions. Watch multiple agents in a web dashboard as they work.',
    source_url: 'https://github.com/justinabrahms/agent-chat',
    install: 'See GitHub README',
    language: 'TypeScript',
    status: 'beta',
    author: 'Justin Abrahms',
    features: [
      'Real-time Server-Sent Events monitoring',
      'Web dashboard for multiple agent sessions',
      'Works alongside Gas Town and multiclaude',
    ],
    limitations: [
      'Companion tool only — not standalone',
      'Requires Gas Town or multiclaude as the agent runner',
    ],
  },

  // ── External Orchestration ─────────────────────────────────────────────────

  {
    id: 'ruflo',
    name: 'Ruflo (formerly claude-flow)',
    category: 'external-orchestration',
    description:
      'The most adopted external orchestration framework for Claude Code. 18.9k stars. Transforms it into a multi-agent platform with hierarchical swarms, 60+ specialized agent pools, and SQLite-backed persistent memory.',
    source_url: 'https://github.com/ruvnet/ruflo',
    install: 'npx ruflo@latest init --wizard',
    language: 'TypeScript',
    status: 'watch',
    features: [
      'Hierarchical swarms (queen + workers)',
      '60+ specialized agent pools (coders, testers, reviewers, architects)',
      'Q-Learning router for intelligent task dispatch',
      '42+ built-in skills, 17 Claude Code hooks',
      'SQLite-backed session persistence with cross-agent memory',
      'Non-interactive CI/CD mode',
    ],
    limitations: [
      'Performance metrics published without methodology — treat as unverified',
      'Rebranded from claude-flow in early 2026 — verify npm package name continuity',
      'Adds significant complexity over native Claude Code orchestration',
    ],
    when_to_use:
      'Use only when native Task tool + sub-agents are insufficient. Typically for complex multi-step pipelines requiring persistent state across many sessions.',
  },

  {
    id: 'athena-flow',
    name: 'Athena Flow',
    category: 'external-orchestration',
    description:
      'Sits at the hooks layer rather than agent layer. Intercepts hook events via Unix Domain Socket, routes through a persistent Node.js runtime with a TUI for real-time observability.',
    source_url: 'https://github.com/lespaceman/athena-flow',
    install: 'See GitHub README',
    language: 'TypeScript',
    status: 'watch',
    features: [
      'Hook-level interception via Unix Domain Socket (NDJSON)',
      'Persistent Node.js runtime for hook event routing',
      'TUI for real-time workflow observability',
      'First shipped workflow: autonomous E2E test builder (Playwright)',
    ],
    limitations: [
      'Published March 2026 — not yet audited',
      'Source audit pending — not recommended for production yet',
      'Revisit in 4-6 weeks',
    ],
  },

  {
    id: 'pipelex',
    name: 'Pipelex + MTHDS',
    category: 'external-orchestration',
    description:
      'A Python runtime for the MTHDS open standard. Provides a declarative DSL (.mthds files) for defining reusable AI methods — typed, git-versionable multi-step workflows chainable across LLMs, OCR, and image generation.',
    source_url: 'https://github.com/Pipelex/pipelex',
    website_url: 'https://mthds.ai',
    install: 'pip install pipelex && npm install -g mthds',
    language: 'Python',
    status: 'watch',
    features: [
      'Declarative DSL for AI methods (.mthds files)',
      'Typed, validated multi-step pipelines',
      'Git-versionable and shareable via mthds.sh hub',
      'Auto-generation by Claude Code via `/mthds-build`',
      'Multi-LLM, OCR, and image generation support',
    ],
    limitations: [
      '8 months old — MTHDS standard not yet validated at scale',
      'Python runtime adds dependency overhead',
      'Community hub (mthds.sh) early-stage',
    ],
    when_to_use:
      'High-volume, repetitive document workflows (scoring, classification, contract analysis). Not suited for open-ended creative exploration where native agents excel.',
  },

  // ── Plugin Ecosystem ───────────────────────────────────────────────────────

  {
    id: 'gstack',
    name: 'gstack',
    category: 'plugin-ecosystem',
    description:
      '6-skill workflow suite covering the full ship cycle, created by Garry Tan (Y Combinator CEO). Strategic gate, architecture review, paranoid code review, automated release, browser QA, and retrospective.',
    source_url: 'https://github.com/garrytan/gstack',
    install: '/plugin install gstack',
    language: 'YAML',
    status: 'beta',
    author: 'Garry Tan (Y Combinator CEO)',
    features: [
      '`/plan-ceo-review` — strategic product gate',
      '`/plan-eng-review` — architecture review',
      '`/review` — paranoid code review',
      '`/ship` — automated release workflow',
      '`/browse` — native browser QA',
      '`/retro` — retrospective generation',
    ],
    limitations: [
      'Opinionated workflow — works best for product-focused teams',
      'Requires Claude Code plugin system',
    ],
    when_to_use: 'Full-cycle shipping workflows. Pairs with Cognitive Mode Switching pattern.',
    cross_ref: 'guide/workflows/gstack-workflow.md — Cognitive Mode Switching',
  },

  {
    id: 'claude-plugins-dev',
    name: 'claude-plugins.dev',
    category: 'plugin-ecosystem',
    description:
      'Plugin discovery directory with 11,989+ plugins and 63,065+ skills indexed. Search, browse, and install community Claude Code plugins.',
    source_url: 'https://claude-plugins.dev',
    website_url: 'https://claude-plugins.dev',
    install: 'Browse at claude-plugins.dev',
    language: 'Web',
    status: 'stable',
    features: [
      '11,989+ plugins indexed',
      '63,065+ skills indexed',
      'Search and browse by category',
      'Install commands provided per plugin',
    ],
    limitations: [
      'No automatic security vetting of listed plugins',
      'Quality varies significantly across listings',
    ],
  },

  {
    id: 'claudemarketplaces',
    name: 'claudemarketplaces.com',
    category: 'plugin-ecosystem',
    description:
      'Auto-scans GitHub for marketplace plugins. Aggregates community skills with automatic discovery rather than manual curation.',
    source_url: 'https://claudemarketplaces.com',
    website_url: 'https://claudemarketplaces.com',
    install: 'Browse at claudemarketplaces.com',
    language: 'Web',
    status: 'beta',
    features: [
      'Auto-scan GitHub for marketplace plugins',
      'Aggregates community skills automatically',
      'No manual submission required for discoverability',
    ],
    limitations: [
      'Auto-scanning means less curation',
      'No security review pipeline',
    ],
  },

  {
    id: 'agentskills-io',
    name: 'agentskills.io',
    category: 'plugin-ecosystem',
    description:
      'Open standard for agent skills across 26+ platforms. Promotes interoperability — skills written once, deployed across Claude Code, Cursor, Cline, and others.',
    source_url: 'https://agentskills.io',
    website_url: 'https://agentskills.io',
    install: 'Browse at agentskills.io',
    language: 'Web',
    status: 'beta',
    features: [
      'Open standard for agent skills (26+ platforms)',
      'Cross-platform skill interoperability',
      'Community hub for sharing skills',
    ],
    limitations: [
      'Standard adoption still early',
      'Not all skills guaranteed Claude Code compatible',
    ],
  },
];

export const ECOSYSTEM_META = {
  total_tools: ECOSYSTEM_TOOLS.length,
  categories: Object.keys(CATEGORY_LABELS).length,
  languages: [...new Set(ECOSYSTEM_TOOLS.map((t) => t.language))].length,
  last_verified: 'March 2026',
};
