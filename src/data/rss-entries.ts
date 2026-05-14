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
    title: 'Claude Code v2.1.141',
    date: 'May 14, 2026',
    description: 'Hook terminalSequence output field lets hooks emit desktop notifications, window titles, and bells without a controlling terminal. claude agents --cwd scopes the session list to a directory, and agents with lingering background shells now move to Completed. Rewind gets a "Summarize up to here" option to compress earlier context. 50+ bug fixes including Bedrock cross-account auth, MCP 403 auth hints, and Remote Control token rotation.',
    link: 'https://cc.bruniaux.com/guide/core/claude-code-releases#v21141-2026-05-14',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.139',
    date: 'May 12, 2026',
    description: 'Agent view (Research Preview) lands: run claude agents to see every session — running, blocked on you, or done — in one list. New /goal command lets you set a completion condition and Claude keeps working across turns with a live elapsed/turns/tokens overlay. Hook args exec form now spawns commands without a shell, and continueOnBlock for PostToolUse feeds rejection reasons back to Claude. 40+ bug fixes including an auth deadlock, autoAllowBashIfSandboxed shell expansion, MCP SSE memory cap, and Skill wildcard prefix match.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.139',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.136',
    date: 'May 11, 2026',
    description: 'New settings.autoMode.hard_deny enables unconditional auto mode classifier rules that block regardless of user intent. Fixed MCP servers silently disappearing after /clear in VS Code, JetBrains, and Agent SDK, and MCP OAuth concurrent refresh token loss (no more daily re-authentication for multi-server setups). 40+ UI and terminal fixes including plan mode write blocking, extended thinking 400 fix, and WSL2 image paste via PowerShell fallback.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.136',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.133',
    date: 'May 8, 2026',
    description: 'New worktree.baseRef setting (fresh | head) lets you control whether EnterWorktree and agent-isolation worktrees branch from origin/<default> or local HEAD — note the default fresh reverts the 2.1.128 behavior. Hooks now receive the active effort level via effort.level JSON and $CLAUDE_EFFORT env var. Fixed subagents not discovering project/user/plugin skills, parallel sessions dead-ending at 401 after token refresh race, and MCP OAuth flow ignoring proxy settings.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.133',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.132',
    date: 'May 8, 2026',
    description: 'CLAUDE_CODE_SESSION_ID is now passed to Bash tool subprocess environments, matching the session_id in hook JSON. New CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1 opt-out for the fullscreen renderer. Fixed unbounded memory growth (10GB+ RSS) when a stdio MCP server writes non-protocol output. 20+ terminal and TUI fixes: SIGINT graceful shutdown, --resume emoji crash, fullscreen blank after sleep, JetBrains scroll runaway, mouse wheel speed in VS Code/Cursor, pasting / swallowing input, MCP silent 0-tool failures.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.132',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.129',
    date: 'May 6, 2026',
    description: 'New --plugin-url flag lets you fetch a plugin .zip from any URL for the current session, and CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE enables background auto-upgrades with a restart prompt on Homebrew and WinGet. Ctrl+R history search is back to all-projects default (pre-2.1.124), the skillOverrides setting now works correctly, and gateway /v1/models discovery is now opt-in. 20+ bug fixes including the 1-hour prompt cache TTL downgrade, OAuth refresh race after sleep, and Bash(mkdir *) allow rules not being honored.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.129',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.126',
    date: 'May 1, 2026',
    description: 'The /model picker now lists models from your gateway\'s /v1/models endpoint when ANTHROPIC_BASE_URL points at a compatible gateway. New claude project purge command deletes all Claude Code state for a project (transcripts, tasks, history, config entry). Security fix for allowManagedDomainsOnly/allowManagedReadPathsOnly being ignored, plus 40+ bug fixes covering image paste crashes, Stream idle timeout after sleep, and CJK text rendering on Windows.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.126',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.121',
    date: 'Apr 27, 2026',
    description: 'New alwaysLoad MCP config option lets all tools from a server bypass tool-search deferral. claude plugin prune removes orphaned plugin dependencies. PostToolUse hooks can now replace output for all tools, not just MCP. Critical memory leak fixes: multi-GB RSS growth with images and a ~2GB /usage leak on large transcript histories.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.121',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.120',
    date: 'Apr 24, 2026',
    description: 'Windows no longer requires Git for Windows — PowerShell is used as the shell tool when Git Bash is absent. New claude ultrareview [target] subcommand runs /ultrareview non-interactively from CI or scripts. Skills can now reference the current effort level with ${CLAUDE_EFFORT}.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.120',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.119',
    date: 'Apr 24, 2026',
    description: '/config settings now persist to ~/.claude/settings.json with project/local/policy override precedence. --from-pr accepts GitLab MR, Bitbucket PR, and GitHub Enterprise URLs. --print mode honors agent tools: frontmatter; --agent honors permissionMode. Security fix: blockedMarketplaces now enforces hostPattern/pathPattern. 30+ bug fixes including CRLF paste, Glob/Grep on macOS, /plan mode, TaskList ordering, and stale worktree reuse.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.119',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.118',
    date: 'Apr 23, 2026',
    description: 'Vim visual mode (v/V) with selection and operators. /cost and /stats merged into /usage. Custom named themes via /theme or ~/.claude/themes/; plugins can ship themes. Hooks can now invoke MCP tools directly via type: "mcp_tool". 15+ bug fixes including MCP OAuth, credential save crash, Alt+K freeze, and /fork memory usage.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.118',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.117',
    date: 'Apr 22, 2026',
    description: 'Default effort raised to high for Pro/Max on Opus 4.6 and Sonnet 4.6 (was medium). Fixed Opus 4.7 context window bug — was computing /context against 200K instead of 1M. Native macOS/Linux builds now use embedded bfs/ugrep replacing Glob/Grep tools for faster searches.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.117',
  },
  {
    type: 'new_section',
    title: '7-Module Learning Path — beginner to advanced',
    date: 'Apr 22, 2026',
    description: 'New structured learning path covering Installation, Core Loop, Memory & Config, Agents, Skills, Hooks, and Advanced Patterns. 8-11 hours total with hands-on exercises and validation steps per module. Designed for first-time users who want a guided route through Claude Code instead of reading the 25K-line reference cold.',
    link: 'https://cc.bruniaux.com/guide/learning-path/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.113',
    date: 'Apr 18, 2026',
    description: 'The CLI now spawns a native Claude Code binary via a per-platform optional dependency instead of bundled JavaScript. New sandbox.network.deniedDomains setting blocks specific domains even when a wildcard allowedDomains rule would otherwise permit them. Security hardening across the board: macOS /private/{etc,var,tmp,home} paths flagged as dangerous for rm rules, Bash deny rules now match commands wrapped in env/sudo/watch/ionice/setsid, and Bash(find:*) allow rules no longer auto-approve -exec/-delete.',
    link: 'https://cc.bruniaux.com/releases/#v2113',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.111',
    date: 'Apr 16, 2026',
    description: 'Claude Opus 4.7 gains a new xhigh effort level (between high and max). Two new built-in skills: /ultrareview runs cloud-based parallel multi-agent code review on your current branch or any GitHub PR, and /less-permission-prompts auto-generates a read-only allowlist for settings.json from your transcript history. Auto mode for Max subscribers no longer requires --enable-auto-mode. Plan files are now named after your prompt instead of random words.',
    link: 'https://cc.bruniaux.com/releases/#v2111',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.39.1',
    date: 'Apr 16, 2026',
    description: 'context-evaluator (Packmind, MIT) added to the Configuration Quality section: 17 AI evaluators for CLAUDE.md/AGENTS.md, zero-install at context-evaluator.ai, automated remediation via patch file. Two new skill design patterns from its source: Runtime Prompt Logging (blocking write before AI call) and Adaptive Unified/Parallel Mode (token-threshold switching between 1-agent and N-agent execution).',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.39.0',
    date: 'Apr 16, 2026',
    description: 'Six new architectural patterns from Packmind (Apache 2.0): Skeptical Reviewer sub-agent for filtering false positives, MCP Reference File pattern with a fork-ready Sentry template, Shared Ground Truth Injection, Pre-filtered Rules via frontmatter paths, Handoff Triad with per-section merge rules, and Context Validation Checkpoints for command recipes. Also adds Plans+Specs as committed artifacts and a statusline.py example with the 32K output buffer calculation.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.38.17',
    date: 'Apr 16, 2026',
    description: 'New "Structural Metadata Files" pattern in the context-engineering section: separate rules context (CLAUDE.md) from structural context (code-map.yaml). Includes a ready-to-use template and a benchmark script (context-bench.sh) to measure token cost and structural coverage across three loading strategies.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.110',
    date: 'Apr 16, 2026',
    description: 'New /tui command and tui setting enable flicker-free fullscreen rendering within the same conversation. Claude can now send mobile push notifications via the push notification tool when Remote Control is active. --resume and --continue now resurrect unexpired scheduled tasks, and a new /focus command separates the focus view from Ctrl+O (which reverts to verbose transcript toggle).',
    link: 'https://cc.bruniaux.com/releases/#v2.1.110',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.108',
    date: 'Apr 15, 2026',
    description: 'New ENABLE_PROMPT_CACHING_1H env var lets you opt into 1-hour prompt cache TTL on API key, Bedrock, Vertex, and Foundry. New /recap command provides context when returning to a session after a break. Built-in slash commands like /init, /review, and /security-review are now discoverable and invokable via the Skill tool.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.108',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.105',
    date: 'Apr 13, 2026',
    description: 'PreCompact hook support lets hooks block compaction. EnterWorktree gains a path parameter for switching into existing worktrees. Plugin background monitors auto-arm at session start. WebFetch strips CSS/JS content from pages, and /doctor adds status icons with an f-to-fix action.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.105',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.101',
    date: 'Apr 10, 2026',
    description: 'New /team-onboarding command generates a teammate ramp-up guide from your local Claude Code usage. OS CA certificate store is now trusted by default, making enterprise TLS proxies work without extra config. 40+ bug fixes including --resume context loss, Bedrock SigV4 auth, and Grep ENOENT self-heal.',
    link: 'https://cc.bruniaux.com/releases/#v2.1.101',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.38.12',
    date: 'Apr 9, 2026',
    description: 'Full documentation of the built-in Output Styles feature (Default, Explanatory, Learning) — previously undocumented as a first-class product. Covers /config activation, outputStyle in settings.json, custom styles via .claude/styles/, and debunks the keep-coding-instructions myth.',
    link: 'https://cc.bruniaux.com/releases/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.97',
    date: 'Apr 9, 2026',
    description: 'Focus view toggle (Ctrl+O) in NO_FLICKER mode shows prompt, one-line tool summary with edit diffstats, and final response. New refreshInterval status line setting and workspace.git_worktree JSON field. Massive bug-fix release: 30+ fixes across NO_FLICKER (15 fixes including crash and memory leak), /resume (6 fixes), MCP 50 MB/hr buffer leak, permissions hardening, and 429 exponential backoff.',
    link: 'https://cc.bruniaux.com/releases/#v2197',
  },
  {
    type: 'guide_release',
    title: 'Claude Code Ultimate Guide v3.38.8',
    date: 'Apr 8, 2026',
    description: 'Full documentation of Ultraplan (research preview, v2.1.91+): cloud planning via multi-agent Opus 4.6, browser-based review with inline comments and emoji reactions, dual execution paths (cloud PR or teleport back to terminal). Includes comparison table vs Plan Mode vs OpusPlan, requirements, and when to use it.',
    link: 'https://cc.bruniaux.com/guide/ultimate-guide/02-core-workflow/',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.94',
    date: 'Apr 7, 2026',
    description: 'Amazon Bedrock powered by Mantle is now supported (CLAUDE_CODE_USE_MANTLE=1). Default effort level raised from medium to high for API-key, Bedrock/Vertex/Foundry, Team, and Enterprise users. Plugin skills now use frontmatter name for stable invocation across install methods.',
    link: 'https://cc.bruniaux.com/releases/#v2194',
  },
  {
    type: 'guide_release',
    title: 'Claude Code v2.1.92',
    date: 'Apr 4, 2026',
    description: 'New interactive Bedrock setup wizard from the login screen guides through AWS auth, region config, credential verification, and model pinning. forceRemoteSettingsRefresh policy setting adds fail-closed managed settings enforcement. /cost now shows per-model and cache-hit breakdown for subscription users. Linux sandbox apply-seccomp fix restores unix-socket blocking in both npm and native builds.',
    link: 'https://cc.bruniaux.com/releases/#v2192',
  },
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
