export interface Release {
  version: string
  date: string
  highlights: string[]
  breaking?: string[]
  latest?: boolean
  initiallyVisible?: boolean
}

export interface BreakingChange {
  badge: string
  description: string
}

export const releases: Release[] = [
  {
    version: 'v2.1.56',
    date: 'Feb 25, 2026',
    highlights: [
      'VSCode: Fixed another cause of extension crash on Windows',
    ],
    latest: true,
    initiallyVisible: true,
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
      '<code>claude remote-control</code> subcommand for external builds (local environment serving)',
      'BashTool skips login shell by default when snapshot available — performance improvement',
      '<code>CLAUDE_CODE_ACCOUNT_UUID</code> / <code>CLAUDE_CODE_USER_EMAIL</code> env vars for SDK account metadata',
      '<code>/model</code> picker shows human-readable labels; custom npm registries for plugins',
    ],
    initiallyVisible: true,
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
