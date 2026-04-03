/**
 * Guide RSS entries — maintained manually alongside guide releases.
 *
 * Updated via:
 * - /release command (auto-drafts an entry from CHANGELOG)
 * - Post-push hook reminder (for new pages, cards, whitepapers outside releases)
 *
 * Date format: "Mar 19, 2026" (same as releases.ts)
 * Link: absolute URL on cc.bruniaux.com
 */

export type RssEntryType =
  | 'guide_release'   // new guide version (e.g. v3.38.0)
  | 'new_page'        // new page added to the site
  | 'new_cheatcard'   // new recap card(s)
  | 'new_whitepaper'  // new whitepaper / ebook
  | 'new_section'     // major new section in the guide

export interface RssEntry {
  type: RssEntryType
  title: string
  date: string         // "Mar 19, 2026"
  description: string  // 1-3 sentences, no HTML
  link: string         // absolute URL on cc.bruniaux.com
}

export const rssEntries: RssEntry[] = [
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.38.3',
    date: 'Apr 3, 2026',
    description: 'New page: Team Metrics for AI-Augmented Engineering — covers DORA (with 2025 archetype shift), SPACE framework, AI-specific metrics, and recommendations by team size (5 vs 25 people). Also adds a "Team-Level Steering Metrics" section to the Tech Leads guide with Velocity Trap warning and Monday ritual. Landing page at cc.bruniaux.com/team-metrics/.',
    link: 'https://cc.bruniaux.com/team-metrics/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.38.2',
    date: 'Apr 2, 2026',
    description: 'Hook events expanded to complete 27-event list (8 logical groups including SubagentStart/Stop, PreCompact/PostCompact, WorktreeCreate/Remove, and more). Session-scoped hooks documented. bypassPermissions safety invariant table added. MEMORY.md file limits documented (200 lines, 25KB, 200 files). reference.yaml synced.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.90',
    date: 'Apr 2, 2026',
    description: 'Adds /powerup interactive lessons with animated demos, hardens PowerShell tool permissions, and fixes a session-crashing infinite loop in the rate-limit dialog plus a prompt-cache regression in --resume.',
    link: 'https://cc.bruniaux.com/releases/#v2190',
  },
  {
    type: 'new_page',
    title: 'New page: Methodologies — 20 methods mapped, 8 stacks, interactive quiz',
    date: 'Apr 1, 2026',
    description: 'New /methodologies/ page mapping 20 AI-assisted development methodologies on two axes (Spec-First vs Code-First, Lean vs Enterprise). Includes an interactive quiz to find your methodology stack, 8 recommended combos (Solo MVP, Team Greenfield, API Contract, Power User Loop and more), and a full decision matrix.',
    link: 'https://cc.bruniaux.com/methodologies/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.89',
    date: 'Apr 1, 2026',
    description: 'New "defer" permission decision for PreToolUse hooks lets headless sessions pause at a tool call and resume with -p --resume. New PermissionDenied hook fires after auto mode classifier denials with {retry: true} support. CLAUDE_CODE_NO_FLICKER=1 for flicker-free rendering. Breaking: thinking summaries off by default. Autocompact thrash circuit breaker, StructuredOutput cache fix (50% failure rate), CRLF doubling on Windows fixed.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.89',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.38.1',
    date: 'Mar 30, 2026',
    description: 'Threat database updated to v2.11.0: 3 new CVEs (CVE-2026-33010 mcp-memory-service CORS critical, CVE-2026-33946 MCP Ruby SDK session hijacking, CVE-2026-27597 agentfront enclave sandbox escape), T021 IDEsaster attack technique (30+ chained flaws across Cursor, Windsurf, Copilot, Zed.dev — 24 CVEs assigned), and Ferrok scanner mapping to OWASP MCP Top 10 (2026).',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.38.0',
    date: 'Mar 27, 2026',
    description: '4 patterns added from Everything Claude Code audit: §7.6 Hook Profiles (minimal/standard/strict env-var gating for teams), §9.24 Instinct-Based Continuous Learning (Stop hook capture, confidence scoring, skill promotion pipeline), Iterative Retrieval for sub-agents (max 3 cycles, WHY/WHAT pattern), and Heartbeat Dead-Man Switch for autonomous loops (process-group kill, watchdog). 2 new templates: loop-monitor agent and session-save command. 225 templates total.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.85',
    date: 'Mar 27, 2026',
    description: 'Conditional if field for hooks lets you filter when they run using permission rule syntax (e.g. Bash(git *)), reducing process spawning overhead. New CLAUDE_CODE_MCP_SERVER_NAME/_URL env vars allow one headersHelper script to serve multiple MCP servers. PreToolUse hooks can now satisfy AskUserQuestion headlessly. Fixes /compact context-exceeded error on very large sessions.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.85',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.37.6',
    date: 'Mar 26, 2026',
    description: '4 new commands from gstack audit: /investigate (Iron Law root-cause debugging), /qa (diff-aware browser QA, 3 tiers), /canary (post-deploy monitoring with transient tolerance), /land-and-deploy (merge-to-verify pipeline for 6 platforms). /review-pr enhanced with scope drift detection and Fix-First heuristic. Complete settings.json reference added (1,284 lines). 223 templates total.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.84',
    date: 'Mar 26, 2026',
    description: 'PowerShell tool for Windows (opt-in preview), TaskCreated hook, WorktreeCreate hook with HTTP support, and global system-prompt caching now working when ToolSearch is enabled. Deep links open in your preferred terminal, MCP tool descriptions capped at 2KB, and an idle-return prompt appears after 75+ minutes to suggest /clear.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.84',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.83',
    date: 'Mar 25, 2026',
    description: 'managed-settings.d/ drop-in directory for policy fragments, CwdChanged and FileChanged hook events for reactive environment management, transcript search in Ctrl+O mode, and CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1 for credential scrubbing. Security fix: --mcp-config flag was bypassing allowedMcpServers/deniedMcpServers managed policy.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.83',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.37.5',
    date: 'Mar 23, 2026',
    description: 'Five documentation gaps filled from CC releases 2.1.77-2.1.81: StopFailure hook, rate_limits statusline field, ${CLAUDE_PLUGIN_DATA} plugin storage, --bare CI mode, and sandbox.filesystem settings (allowWrite/denyRead/allowRead). Threat database updated to v2.9.0.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.37.4',
    date: 'Mar 23, 2026',
    description: 'Four new resource evaluations: Harman JiTTesting Meta paper (4/5, integrated), Caliber config quality tool (3/5, integrated), Larridin AI-native teams (4/5), Anthropic weekly watch March 16-23. New guide sections on JiTTesting methodology and Configuration Quality tooling. CC releases tracking updated to v2.1.81.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.37.1',
    date: 'Mar 19, 2026',
    description: 'RSS feed added for release tracking. New resource evaluations, skills updates, and threat-db v2.8.0.',
    link: 'https://cc.bruniaux.com/releases/',
  },
]
