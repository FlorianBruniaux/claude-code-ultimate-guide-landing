export interface Release {
  version: string
  date: string
  highlights: string[]
  breaking?: string[]
  latest?: boolean
  initiallyVisible?: boolean
  featured?: boolean
  featuredLabel?: string
}

export interface BreakingChange {
  badge: string
  description: string
}

export const releases: Release[] = [
  {
    version: 'v2.1.87',
    date: 'Mar 30, 2026',
    highlights: [
      'Fixed messages in Cowork Dispatch not getting delivered',
    ],
    latest: true,
    initiallyVisible: true,
  },
  {
    version: 'v2.1.86',
    date: 'Mar 28, 2026',
    highlights: [
      '<code>X-Claude-Code-Session-Id</code> header on API requests — proxies aggregate by session without parsing the body',
      'Reduced <code>@</code> file mention token overhead — raw string content no longer JSON-escaped; Read tool uses compact line-number format with dedup',
      'Improved prompt cache hit rate for Bedrock, Vertex, Foundry by removing dynamic content from tool descriptions',
      'Fixed marketplace plugin scripts failing with "Permission denied" on macOS/Linux (regression since v2.1.83); many other bugfixes',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.85',
    date: 'Mar 27, 2026',
    highlights: [
      'Conditional <code>if</code> field for hooks — filter when they run using permission rule syntax (e.g. <code>Bash(git *)</code>) to reduce process spawning overhead',
      '<code>CLAUDE_CODE_MCP_SERVER_NAME</code>/<code>_URL</code> env vars for <code>headersHelper</code> scripts — one helper serves multiple MCP servers',
      'PreToolUse hooks can now satisfy AskUserQuestion headlessly (return <code>updatedInput + permissionDecision: allow</code>)',
      'Fixed <code>/compact</code> failing with "context exceeded" on very large conversations; improved scroll performance (yoga-layout → TypeScript)',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.84',
    date: 'Mar 26, 2026',
    highlights: [
      'PowerShell tool for Windows (opt-in preview) — direct PowerShell access alongside Bash tool',
      '<code>TaskCreated</code> hook; <code>WorktreeCreate</code> hook supports <code>type: "http"</code>; <code>allowedChannelPlugins</code> managed setting',
      'Global system-prompt caching now works when ToolSearch is enabled (better cache hit rates for MCP users)',
      'Deep links open in preferred terminal; MCP tool descriptions capped at 2KB; idle-return prompt after 75+ min',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: 'PowerShell tool + TaskCreated hook + global cache with ToolSearch',
  },
  {
    version: 'v2.1.83',
    date: 'Mar 25, 2026',
    highlights: [
      '<code>managed-settings.d/</code> drop-in directory — teams deploy independent policy fragments that merge alphabetically',
      '<code>CwdChanged</code> and <code>FileChanged</code> hook events for reactive environment management (direnv, auto-toolchain)',
      'Transcript search — press <code>/</code> in transcript mode (Ctrl+O); <code>CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1</code> strips credentials from subprocesses',
      'Security: fixed <code>--mcp-config</code> bypassing managed <code>allowedMcpServers</code>/<code>deniedMcpServers</code> policy; fixed macOS exit hang',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.81',
    date: 'Mar 22, 2026',
    highlights: [
      '<code>--bare</code> flag for scripted <code>-p</code> calls — skips hooks, LSP, plugin sync, skill walks (requires API key; no OAuth)',
      '<code>--channels</code> permission relay — channel servers can forward tool approval prompts to your phone',
      'MCP read/search tool calls collapse into "Queried {server}" line; plan mode hides "clear context" by default',
      'Fixed worktree session resume switching back to worktree; fixed concurrent sessions repeatedly re-authenticating on OAuth refresh',
    ],
    initiallyVisible: true,
    featured: false,
  },
  {
    version: 'v2.1.80',
    date: 'Mar 20, 2026',
    highlights: [
      '<code>rate_limits</code> field in statusline scripts for Claude.ai usage (5h + 7d windows with <code>used_percentage</code> and <code>resets_at</code>)',
      '<code>effort</code> frontmatter for skills/slash commands to override effort level; <code>source: \'settings\'</code> plugin marketplace (inline in settings.json)',
      '<code>--channels</code> research preview — MCP servers can push messages into your session',
      'Fixed <code>--resume</code> dropping parallel tool results; ~80MB memory reduction on startup for large repos',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.79',
    date: 'Mar 19, 2026',
    highlights: [
      '<code>--console</code> flag for <code>claude auth login</code> (Anthropic Console / API billing auth); "Show turn duration" toggle in <code>/config</code>',
      'VSCode: <code>/remote-control</code> to bridge session to claude.ai/code; session tabs get AI-generated titles from first message',
      'Fixed <code>claude -p</code> hanging without explicit stdin; fixed enterprise users unable to retry on rate limit (429) errors',
      'Fixed <code>SessionEnd</code> hooks not firing on interactive <code>/resume</code> switch; ~18MB startup memory improvement',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.78',
    date: 'Mar 18, 2026',
    highlights: [
      '<code>StopFailure</code> hook event fires when turn ends due to API error (rate limit, auth failure); <code>${CLAUDE_PLUGIN_DATA}</code> for persistent plugin state',
      '<code>effort</code>, <code>maxTurns</code>, <code>disallowedTools</code> frontmatter for plugin-shipped agents; response text now streams line-by-line',
      '⚠️ <strong>3 security fixes</strong>: silent sandbox disable, MCP deny rules bypassed, protected dirs writable in bypassPermissions mode',
      'Fixed infinite loop when API errors triggered stop hooks re-feeding blocking errors; fixed <code>--resume</code> truncating history on large sessions with subagents',
    ],
    latest: false,
    initiallyVisible: true,
  },
  {
    version: 'v2.1.77',
    date: 'Mar 17, 2026',
    highlights: [
      '⭐ <strong>Opus 4.6 output limits raised</strong> — default max output to 64k tokens; upper bound for Opus 4.6 and Sonnet 4.6 to 128k tokens',
      '<code>allowRead</code> sandbox setting to re-allow reads within <code>denyRead</code> regions; <code>/copy N</code> for Nth-latest response; <code>/branch</code> replaces <code>/fork</code>',
      '<strong>Security fix</strong>: <code>PreToolUse</code> hooks returning <code>"allow"</code> could bypass enterprise <code>deny</code> permission rules',
      'Fixed auto-updater accumulating GBs of memory from overlapping downloads; fixed <code>--resume</code> silently truncating recent history',
      'Breaking: <code>Agent</code> tool no longer accepts <code>resume</code> parameter — use <code>SendMessage({to: agentId})</code> instead',
    ],
    breaking: ['Agent tool: <code>resume</code> parameter removed — use <code>SendMessage({to: agentId})</code>'],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.76',
    date: 'Mar 14, 2026',
    highlights: [
      '⭐ <strong>MCP elicitation</strong> — servers request structured input mid-task via interactive dialog; new <code>Elicitation</code>, <code>ElicitationResult</code>, <code>PostCompact</code> hooks',
      '<code>-n</code>/<code>--name</code> CLI flag for session display name; <code>worktree.sparsePaths</code> for monorepo sparse checkout; <code>/effort</code> slash command',
      'Fixed deferred tools (<code>ToolSearch</code>) losing input schemas after compaction; auto-compact circuit breaker (stops after 3 failures)',
      'Fixed <code>Bash(cmd:*)</code> rules not matching when argument contains <code>#</code>; plan mode re-approval after already accepted',
      'Improved: background agent partial results preserved on kill; model fallback notifications always visible',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ MCP elicitation + PostCompact hook',
  },
  {
    version: 'v2.1.75',
    date: 'Mar 13, 2026',
    highlights: [
      '⭐ <strong>1M context for Opus 4.6 — default</strong> for Max, Team, and Enterprise plans (no extra usage required)',
      'Session name display on prompt bar with <code>/rename</code>; hook source displayed in permission prompts',
      'Fixed token estimation over-counting for thinking/<code>tool_use</code> blocks (was causing premature compaction)',
      'Fixed Bash tool mangling <code>!</code> in piped commands (e.g. <code>jq \'select(.x != .y)\'</code> now works)',
      'Improved startup performance on macOS non-MDM machines',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ 1M context Opus 4.6 default + token fix',
  },
  {
    version: 'v2.1.74',
    date: 'Mar 12, 2026',
    highlights: [
      '⭐ <strong>/context actionable suggestions</strong> — identifies context-heavy tools, memory bloat, capacity warnings with optimization tips',
      '⭐ <strong>Memory leak fixed</strong> — streaming API buffers unbounded RSS growth on npm path resolved',
      '<code>autoMemoryDirectory</code> setting to configure custom directory for auto-memory storage',
      'Fixed managed policy <code>ask</code> rules being bypassed by user <code>allow</code> rules or skill <code>allowed-tools</code>',
      'Fixed <code>SessionEnd</code> hooks killed after 1.5s regardless of <code>hook.timeout</code> (now configurable)',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ /context suggestions + memory leak fix',
  },
  {
    version: 'v2.1.73',
    date: 'Mar 11, 2026',
    highlights: [
      '⭐ <strong>modelOverrides setting</strong> — map model picker entries to custom provider model IDs (Bedrock ARNs, etc.)',
      'Fixed deadlock when many skill files change at once (e.g. <code>git pull</code> in large <code>.claude/skills/</code> repo)',
      'Fixed subagents with <code>model: opus/sonnet/haiku</code> being silently downgraded on Bedrock/Vertex/Foundry',
      'Fixed <code>SessionStart</code> hooks firing twice when resuming via <code>--resume</code> or <code>--continue</code>',
      'Changed default Opus on Bedrock/Vertex/Foundry → Opus 4.6; deprecated <code>/output-style</code> in favor of <code>/config</code>',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ modelOverrides + Opus 4.6 default on Bedrock/Vertex',
  },
  {
    version: 'v2.1.72',
    date: 'Mar 9, 2026',
    highlights: [
      '⭐ <strong>Agent model override restored</strong> — <code>model</code> parameter back on Agent tool for per-invocation overrides',
      '⭐ <strong>SDK 12x token savings</strong> — fixed <code>query()</code> prompt cache invalidation (up to 12× input token cost reduction)',
      'CLAUDE.md HTML comments now hidden from Claude when auto-injected; <code>/plan</code> accepts optional description',
      'Simplified effort levels: low/medium/high (removed max), new symbols ○ ◐ ●; <code>ExitWorktree</code> tool added',
      '<code>CLAUDE_CODE_DISABLE_CRON</code> env var; <code>lsof</code>, <code>fd</code>, <code>pgrep</code> added to bash auto-approval allowlist',
    ],
    initiallyVisible: true,
    featured: false,
  },
  {
    version: 'v2.1.71',
    date: 'Mar 6, 2026',
    highlights: [
      '⭐ <strong>/loop command</strong> — run a prompt or slash command on a recurring interval (e.g. <code>/loop 5m check the deploy</code>)',
      '⭐ <strong>Cron scheduling tools</strong> for recurring prompts within a session',
      '<code>voice:pushToTalk</code> keybinding now rebindable in <code>keybindings.json</code> (default: space)',
      'Fixed stdin freeze in long sessions; 5–8s startup freeze with voice mode; forked sessions sharing plan files',
      'Improved plugin MCP server deduplication; <code>/plugin uninstall</code> now writes to <code>settings.local.json</code>',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ /loop + Cron scheduling',
  },
  {
    version: 'v2.1.70',
    date: 'Mar 6, 2026',
    highlights: [
      '⭐ <strong>VSCode</strong>: spark icon listing all sessions in activity bar, plan markdown view, native <code>/mcp</code> management dialog',
      'Fixed API 400 errors with third-party gateways (<code>ANTHROPIC_BASE_URL</code>) and Bedrock custom inference profiles',
      'Fixed empty responses after <code>ToolSearch</code> + prompt-cache bust when MCP server with instructions connects',
      'Fixed voice on Windows native binary; clipboard CJK/emoji corruption on Windows/WSL',
      'Reduced prompt input re-renders by ~74%; startup memory −426KB; Remote Control poll rate 300× lower',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ VSCode session list + MCP dialog',
  },
  {
    version: 'v2.1.69',
    date: 'Mar 4, 2026',
    highlights: [
      '🔒 <strong>4 security fixes</strong>: nested skills from node_modules, symlink bypass outside workdir, trust dialog silently enabling servers, sandbox not blocking domains',
      '⭐ <strong>InstructionsLoaded hook</strong> event fires when CLAUDE.md/.rules files load + <code>agent_id</code>, <code>agent_type</code>, <code>worktree</code> added to all hook events',
      '<code>${CLAUDE_SKILL_DIR}</code> variable for skills + <code>/reload-plugins</code> command (no restart needed)',
      'Voice STT expanded to <strong>20 languages</strong> (+10: Russian, Polish, Turkish, Dutch, Ukrainian, Greek, Czech, Danish, Swedish, Norwegian)',
      '15+ memory leak fixes; ~16MB baseline reduction; faster startup; MCP binary content (PDFs/audio) now saved to disk',
      'Sonnet 4.5 users on Pro/Max/Team auto-migrated to Sonnet 4.6',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '🔒 4 Security Fixes + Hooks',
  },
  {
    version: 'v2.1.68',
    date: 'Mar 4, 2026',
    highlights: [
      'Opus 4.6 now defaults to <strong>medium effort</strong> for Max and Team subscribers',
      'Re-introduced <code>ultrathink</code> keyword to enable high effort for the next turn',
      '<strong>Breaking</strong>: Opus 4 and Opus 4.1 removed from Claude Code first-party API — auto-migrated to Opus 4.6',
    ],
    initiallyVisible: true,
    breaking: ['Opus 4 and Opus 4.1 removed from Claude Code first-party API'],
  },
  {
    version: 'v2.1.66',
    date: 'Mar 4, 2026',
    highlights: [
      'Reduced spurious error logging',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.63',
    date: 'Feb 27, 2026',
    highlights: [
      '⭐ <strong>HTTP hooks</strong> — hooks can now POST JSON to a URL and receive JSON back, instead of running a shell command',
      '⭐ Project configs & auto-memory now shared across all git worktrees of the same repository',
      '<code>/simplify</code> and <code>/batch</code> bundled slash commands added',
      '<code>ENABLE_CLAUDEAI_MCP_SERVERS=false</code> env var to opt out of claude.ai MCP servers',
      '<code>/model</code> command shows currently active model in the picker',
      'Major memory leak fixes: WebSocket, MCP caches, git root detection, JSON parsing, bash prefix, subagent state',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ HTTP hooks',
  },
  {
    version: 'v2.1.62',
    date: 'Feb 27, 2026',
    highlights: [
      'Fixed prompt suggestion cache regression that reduced cache hit rates',
    ],
    initiallyVisible: false,
  },
  {
    version: 'v2.1.61',
    date: 'Feb 27, 2026',
    highlights: [
      'Fixed concurrent writes corrupting config file on Windows',
    ],
    initiallyVisible: false,
  },
  {
    version: 'v2.1.59',
    date: 'Feb 26, 2026',
    highlights: [
      '&#129504; <strong>Auto-memory</strong> — Claude automatically saves useful context to memory. Manage with <code>/memory</code>',
      '<code>/copy</code> command — interactive picker to select individual code blocks or full response',
      'Smarter "always allow" prefix suggestions for compound bash commands (per-subcommand prefixes)',
      'Fixed MCP OAuth token refresh race condition with multiple simultaneous Claude Code instances',
      'Fixed config file corruption wiping authentication when multiple instances ran simultaneously',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '⭐ Auto-memory',
  },
  {
    version: 'v2.1.58',
    date: 'Feb 26, 2026',
    highlights: [
      'Remote Control expanded to more users',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.56',
    date: 'Feb 25, 2026',
    highlights: [
      'VSCode: Fixed another cause of extension crash on Windows',
    ],
    initiallyVisible: false,
  },
  {
    version: 'v2.1.55',
    date: 'Feb 25, 2026',
    highlights: [
      'Fixed BashTool failing on Windows with EINVAL error',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.53',
    date: 'Feb 25, 2026',
    highlights: [
      'Stability fixes: Windows panics/crashes, WebAssembly crashes on Linux x64 & Windows x64/ARM64',
      'Fixed graceful shutdown leaving stale sessions with Remote Control',
      'Fixed <code>--worktree</code> flag sometimes ignored on first launch',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.52',
    date: 'Feb 24, 2026',
    highlights: [
      'VSCode: Fixed extension crash on Windows',
    ],
    initiallyVisible: false,
  },
  {
    version: 'v2.1.51',
    date: 'Feb 24, 2026',
    highlights: [
      '&#128241; <strong>Remote Control</strong> — control your local Claude Code session from any phone, tablet, or browser via <code>/rc</code> or <code>claude remote-control</code>. Execution stays 100% local. Pro/Max only (Research Preview)',
      'BashTool skips login shell by default when snapshot available — performance improvement',
      '<code>CLAUDE_CODE_ACCOUNT_UUID</code> / <code>CLAUDE_CODE_USER_EMAIL</code> env vars for SDK account metadata',
      '<code>/model</code> picker shows human-readable labels; custom npm registries for plugins',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: '🔥 Major Feature',
  },
  {
    version: 'v2.1.49',
    date: 'Feb 20, 2026',
    highlights: [
      '<code>--worktree</code> / <code>-w</code> flag + subagent <code>isolation: "worktree"</code> for isolated git worktrees',
      'Agent definitions support <code>background: true</code> to always run as background task',
      '<code>ConfigChange</code> hook event for enterprise security auditing of config changes',
      'Simple mode includes file edit tool; Sonnet 4.6 now has 1M context on Max plan',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.47',
    date: 'Feb 19, 2026',
    highlights: [
      'VS Code plan preview auto-updates as Claude iterates',
      '<code>ctrl+f</code> kills all background agents; ESC cancels main thread only',
      '<code>last_assistant_message</code> field in Stop/SubagentStop hook inputs',
      '70+ bug fixes: PDF compaction, Unicode quotes, parallel file edits, OSC 8 hyperlinks',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.46',
    date: 'Feb 19, 2026',
    highlights: [
      'Fixed orphaned Claude Code processes after terminal disconnect on macOS',
      'Support for using claude.ai MCP connectors in Claude Code',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.45',
    date: 'Feb 17, 2026',
    highlights: [
      'Claude Sonnet 4.6 model support',
      '<code>spinnerTipsOverride</code> setting for customizable spinner tips',
      'SDK: <code>SDKRateLimitInfo</code> / <code>SDKRateLimitEvent</code> for rate limit tracking',
      'Fixed Agent Teams on Bedrock/Vertex/Foundry; memory improvements',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.44',
    date: 'Feb 17, 2026',
    highlights: [
      'Fixed auth refresh errors',
      'Fixed AWS auth refresh hanging (3-minute timeout)',
      'Fixed structured-outputs beta header on Vertex/Bedrock',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.42',
    date: 'Feb 14, 2026',
    highlights: [
      'Startup performance: deferred Zod schema construction',
      'Improved prompt cache hit rates (date moved out of system prompt)',
      'Opus 4.6 effort callout for eligible users',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.41',
    date: 'Feb 13, 2026',
    highlights: [
      '<code>claude auth login/status/logout</code> CLI subcommands',
      'Windows ARM64 native binary support',
      '<code>/rename</code> auto-generates session name from context',
      'Multiple stability fixes (FIFOs, background tasks, permissions)',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.39',
    date: 'Feb 11, 2026',
    highlights: [
      'Guard against recursive Claude Code launches',
      'Fixed Agent Teams model for Bedrock/Vertex/Foundry',
      'OTel <code>speed</code> attribute for fast mode',
      'Stability fixes (rendering, session close, fatal errors)',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.38',
    date: 'Feb 10, 2026',
    highlights: [
      'Fixed Tab key queueing slash commands',
      'Security: Heredoc delimiter command smuggling fix',
      'Security: Blocked writes to <code>.claude/skills</code> in sandbox',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.37',
    date: 'Feb 8, 2026',
    highlights: [
      'Fixed <code>/fast</code> not available after enabling <code>/extra-usage</code>',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.36',
    date: 'Feb 8, 2026',
    highlights: [
      '&#11088; Fast mode now available for Opus 4.6',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.34',
    date: 'Feb 7, 2026',
    highlights: [
      'Fixed crash with agent teams setting changes',
      'Security fix: sandbox-excluded commands bypass',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.33',
    date: 'Feb 6, 2026',
    highlights: [
      'Agent teams fixes (tmux sessions, availability warnings)',
      '<code>TeammateIdle</code> and <code>TaskCompleted</code> hook events',
      'Agent frontmatter: <code>memory</code> field, <code>Task(agent_type)</code> syntax',
      'VSCode: Remote sessions, branch/message count in picker',
    ],
  },
  {
    version: 'v2.1.32',
    date: 'Feb 5, 2026',
    highlights: [
      '&#11088; Opus 4.6 available',
      'Agent teams preview (experimental)',
      'Automatic memory recording',
    ],
  },
  {
    version: 'v2.1.30',
    date: 'Feb 2, 2026',
    highlights: [
      '&#11088; PDF page range support (<code>pages: &quot;1-5&quot;</code>)',
      '&#11088; Pre-configured OAuth for MCP servers (Slack)',
      '&#11088; New <code>/debug</code> command for troubleshooting',
      'Task tool metrics (tokens, duration, tool uses)',
    ],
  },
  {
    version: 'v2.1.29',
    date: 'Jan 31, 2026',
    highlights: [
      'Fixed startup performance with saved hook context',
      'Improved session recovery speed for long-duration sessions',
    ],
  },
  {
    version: 'v2.1.27',
    date: 'Jan 29, 2026',
    highlights: [
      '<code>--from-pr</code> flag to resume sessions linked to GitHub PRs',
      'Sessions auto-linked to PRs via <code>gh pr create</code>',
      'Windows/VSCode stability fixes',
    ],
  },
  {
    version: 'v2.1.21',
    date: 'Jan 28, 2026',
    highlights: [
      'Skills/commands can specify required/recommended Claude Code version',
      'New TaskCreate fields: category, checklist, parentId',
      'Automatic Claude Code update checking at session start',
      'Tasks appear in /context with \'Disable tasks\' shortcut',
    ],
  },
  {
    version: 'v2.1.20',
    date: 'Jan 27, 2026',
    highlights: [
      'TaskUpdate: <code>status=\'deleted\'</code> for task removal',
      'PR review status indicator (colored dot + link)',
    ],
  },
  {
    version: 'v2.1.19',
    date: 'Jan 25, 2026',
    highlights: [
      'New: CLAUDE_CODE_ENABLE_TASKS env var (toggle task systems)',
      'New: Argument shorthand $0, $1 in custom commands',
      '[VSCode] Session forking/rewind for all users',
      'Fixed: Multiple session resuming issues with git worktrees',
    ],
  },
  {
    version: 'v2.1.18',
    date: 'Jan 24, 2026',
    highlights: [
      '&#11088; Customizable keyboard shortcuts with /keybindings',
      'Per-context keybindings, chord sequences',
    ],
  },
  {
    version: 'v2.1.17',
    date: 'Jan 23, 2026',
    highlights: [
      'Fix: Crashes on processors without AVX instruction support',
    ],
  },
  {
    version: 'v2.1.16',
    date: 'Jan 22, 2026',
    highlights: [
      '&#11088; New task management system with dependency tracking',
      '[VSCode] Native plugin management support',
      '[VSCode] OAuth users can browse/resume remote sessions',
      'Fixed: OOM crashes with heavy subagent usage',
    ],
  },
  {
    version: 'v2.1.15',
    date: 'Jan 22, 2026',
    highlights: [
      '&#9888;&#65039; Deprecation notice for npm installations',
      'UI rendering performance improved with React Compiler',
      'Fixed: MCP stdio server timeout causing UI freezes',
    ],
  },
  {
    version: 'v2.1.14',
    date: 'Jan 21, 2026',
    highlights: [
      'History-based autocomplete in bash mode (! + Tab)',
      'Search in installed plugins list',
      'Git commit SHA pinning for plugins',
      'Multiple fixes: context window, memory, autocomplete',
    ],
  },
  {
    version: 'v2.1.12',
    date: 'Jan 18, 2026',
    highlights: [
      'Bug fix: Message rendering',
    ],
  },
  {
    version: 'v2.1.11',
    date: 'Jan 17, 2026',
    highlights: [
      'Fix: Excessive MCP connection requests for HTTP/SSE transports',
    ],
  },
  {
    version: 'v2.1.10',
    date: 'Jan 17, 2026',
    highlights: [
      'New <code>Setup</code> hook event (--init, --maintenance flags)',
      'Keyboard shortcut \'c\' to copy OAuth URL',
      'File suggestions show as removable attachments',
    ],
  },
  {
    version: 'v2.1.9',
    date: 'Jan 16, 2026',
    highlights: [
      '<code>auto:N</code> syntax for MCP tool search threshold',
      '<code>plansDirectory</code> setting for custom plan locations',
      'Session URL attribution to commits/PRs',
    ],
  },
  {
    version: 'v2.1.7',
    date: 'Jan 15, 2026',
    highlights: [
      '<code>showTurnDuration</code> setting',
      'MCP tool search auto mode enabled by default',
      'Inline agent response in task notifications',
    ],
    breaking: [
      'Security fix: Wildcard permission rules now properly handle compound commands (cd &amp;&amp; rm) requiring multiple rules',
      'OAuth/API Console: console.anthropic.com &rarr; platform.claude.com (credential migration required)',
    ],
  },
  {
    version: 'v2.1.6',
    date: 'Jan 14, 2026',
    highlights: [
      'Search in <code>/config</code> command',
      'Date range filtering in <code>/stats</code>',
      'Auto-discovery of nested <code>.claude/skills</code>',
    ],
    breaking: [
      'Security fix: Prevented shell line continuation from bypassing permission checks',
    ],
  },
  {
    version: 'v2.1.5',
    date: 'Jan 13, 2026',
    highlights: [
      'URL validation for remote sessions',
      'Fixed: Agent tools with binary outputs now handle properly',
    ],
  },
  {
    version: 'v2.1.4',
    date: 'Jan 13, 2026',
    highlights: [
      'Agent tool output encoding improvements',
      'Fixed: Remote sessions error handling',
    ],
  },
  {
    version: 'v2.1.3',
    date: 'Jan 10, 2026',
    highlights: [
      '<code>/info</code> command displays MCP server list',
      'MCP tool discovery improvements',
    ],
  },
  {
    version: 'v2.1.2',
    date: 'Jan 9, 2026',
    highlights: [
      'Enhanced error messages for MCP server failures',
      'Fixed: Bash tool permission edge cases',
    ],
    breaking: [
      'Security fix: Command injection vulnerability in bash processing',
    ],
  },
  {
    version: 'v2.1.1',
    date: 'Jan 9, 2026',
    highlights: [
      'Improved agent task output formatting',
      'Fixed: Permission prompt edge cases',
    ],
  },
  {
    version: 'v2.1.0',
    date: 'Jan 8, 2026',
    highlights: [
      'Skill hot-reload without restart',
      'Vim motions support in editor',
      '<code>/plan</code> command for structured planning',
    ],
    breaking: [
      'OAuth/API Console URL changed: console.anthropic.com &rarr; platform.claude.com',
    ],
  },
  {
    version: 'v2.0.70',
    date: 'Jan 7, 2026',
    highlights: [
      'Agent task UI improvements',
      'Fixed: Skill command parsing',
    ],
    breaking: [
      'Removed # shortcut for quick memory (use /memory command instead)',
    ],
  },
  {
    version: 'v2.0.69',
    date: 'Jan 6, 2026',
    highlights: [
      'MCP server status indicators',
      'Enhanced bash command history',
    ],
  },
  {
    version: 'v2.0.68',
    date: 'Jan 5, 2026',
    highlights: [
      'Agent tool output formatting',
      'Fixed: Skill discovery edge cases',
    ],
  },
  {
    version: 'v2.0.67',
    date: 'Jan 4, 2026',
    highlights: [
      'Improved error messages for permission denials',
      'Fixed: MCP tool schema validation',
    ],
  },
  {
    version: 'v2.0.66',
    date: 'Jan 3, 2026',
    highlights: [
      'Enhanced agent task progress indicators',
      'Fixed: Bash tool timeout handling',
    ],
  },
  {
    version: 'v2.0.65',
    date: 'Jan 2, 2026',
    highlights: [
      'MCP server health checks',
      'Fixed: Skill argument parsing',
    ],
  },
  {
    version: 'v2.0.64',
    date: 'Jan 1, 2026',
    highlights: [
      'Improved agent task error recovery',
      'Fixed: Permission prompt display',
    ],
  },
  {
    version: 'v2.0.63',
    date: 'Dec 31, 2025',
    highlights: [
      'Enhanced bash autocomplete suggestions',
      'Fixed: MCP tool discovery',
    ],
  },
  {
    version: 'v2.0.62',
    date: 'Dec 30, 2025',
    highlights: [
      'Agent tool output formatting improvements',
      'Fixed: Skill hot-reload edge cases',
    ],
  },
  {
    version: 'v2.0.61',
    date: 'Dec 29, 2025',
    highlights: [
      'Improved error messages for MCP server failures',
      'Fixed: Permission prompt edge cases',
    ],
  },
  {
    version: 'v2.0.60',
    date: 'Dec 28, 2025',
    highlights: [
      'Enhanced agent task progress indicators',
      'Fixed: Bash tool timeout handling',
    ],
  },
  {
    version: 'v2.0.59',
    date: 'Dec 27, 2025',
    highlights: [
      'MCP server health checks',
      'Fixed: Skill argument parsing',
    ],
  },
  {
    version: 'v2.0.58',
    date: 'Dec 26, 2025',
    highlights: [
      'Improved agent task error recovery',
      'Fixed: Permission prompt display',
    ],
  },
  {
    version: 'v2.0.57',
    date: 'Dec 25, 2025',
    highlights: [
      'Enhanced bash autocomplete suggestions',
      'Fixed: MCP tool discovery',
    ],
  },
  {
    version: 'v2.0.56',
    date: 'Dec 24, 2025',
    highlights: [
      'Agent tool output formatting improvements',
      'Fixed: Skill hot-reload edge cases',
    ],
  },
  {
    version: 'v2.0.55',
    date: 'Dec 23, 2025',
    highlights: [
      'Improved error messages for MCP server failures',
      'Fixed: Permission prompt edge cases',
    ],
  },
  {
    version: 'v2.0.54',
    date: 'Dec 22, 2025',
    highlights: [
      'Enhanced agent task progress indicators',
      'Fixed: Bash tool timeout handling',
    ],
  },
  {
    version: 'v2.0.53',
    date: 'Dec 21, 2025',
    highlights: [
      'MCP server health checks',
      'Fixed: Skill argument parsing',
    ],
  },
  {
    version: 'v2.0.52',
    date: 'Dec 20, 2025',
    highlights: [
      'Improved agent task error recovery',
      'Fixed: Permission prompt display',
    ],
  },
  {
    version: 'v2.0.51',
    date: 'Dec 19, 2025',
    highlights: [
      'Enhanced bash autocomplete suggestions',
      'Fixed: MCP tool discovery',
    ],
  },
  {
    version: 'v2.0.50',
    date: 'Dec 18, 2025',
    highlights: [
      'Agent tool output formatting improvements',
      'Fixed: Skill hot-reload edge cases',
    ],
  },
  {
    version: 'v2.0.49',
    date: 'Dec 17, 2025',
    highlights: [
      'Improved error messages for MCP server failures',
      'Fixed: Permission prompt edge cases',
    ],
  },
  {
    version: 'v2.0.48',
    date: 'Dec 16, 2025',
    highlights: [
      'Enhanced agent task progress indicators',
      'Fixed: Bash tool timeout handling',
    ],
  },
  {
    version: 'v2.0.47',
    date: 'Dec 15, 2025',
    highlights: [
      'MCP server health checks',
      'Fixed: Skill argument parsing',
    ],
  },
]

export const breakingChanges: BreakingChange[] = [
  { badge: 'Syntax', description: 'Indexed argument syntax changed: $ARGUMENTS.0 &rarr; $ARGUMENTS[0] (v2.1.19)' },
  { badge: 'Install', description: 'npm installations deprecated - use native installer (v2.1.15)' },
  { badge: 'Security', description: 'Command injection fix in bash processing (v2.1.2)' },
  { badge: 'Security', description: 'Wildcard permission rules compound commands fix (v2.1.7)' },
  { badge: 'Security', description: 'Shell line continuation permission bypass fix (v2.1.6)' },
  { badge: 'Security', description: 'Heredoc delimiter command smuggling prevention (v2.1.38)' },
  { badge: 'OAuth', description: 'OAuth/API Console: console.anthropic.com &rarr; platform.claude.com (v2.1.0, v2.1.7)' },
  { badge: 'Removed', description: 'Removed # shortcut for quick memory (v2.0.70)' },
]
