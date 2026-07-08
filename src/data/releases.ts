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
    version: 'v2.1.204',
    date: 'Jul 8, 2026',
    highlights: [
      'Fixed hook events not streaming during SessionStart hooks in headless sessions, which could cause remote workers to be idle-reaped mid-hook',
    ],
    latest: true,
    initiallyVisible: true,
  },
  {
    version: 'v2.1.203',
    date: 'Jul 7, 2026',
    highlights: [
      'Added a warning when your login is about to expire, plus a grey pause badge in the footer for manual permission mode',
      'Fixed background-agent stability: macOS 15-20s stall on open/switch, sessions going permanently unresponsive on stale daemon tokens, crash-looping on deleted working directories, a silent auto-upgrade failure that killed every running session',
      'Fixed worktree-isolated subagents sometimes running shell commands in the parent checkout instead of their own worktree',
      'Reduced binary size by ~7 MB and startup memory by ~7 MB by loading a large bundled dependency lazily',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.202',
    date: 'Jul 6, 2026',
    highlights: [
      'Added a Dynamic workflow size setting in /config for controlling how large Claude generally makes dynamic workflows',
      'Added workflow.run_id and workflow.name OpenTelemetry attributes so a workflow run can be reconstructed from OTel data',
      'Fixed images and files sent from the Remote Control mobile/web app without a caption being silently dropped',
      'Changed /review <pr> back to a fast single-pass review; use /code-review <level> <pr#> for the multi-agent review',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.201',
    date: 'Jul 3, 2026',
    highlights: [
      'Claude Sonnet 5 sessions no longer use the mid-conversation system role for harness reminders',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.200',
    date: 'Jul 3, 2026',
    highlights: [
      '⭐ AskUserQuestion dialogs no longer auto-continue by default; opt into an idle timeout via /config',
      'Changed the "default" permission mode to "Manual" across CLI, VS Code, and JetBrains; --permission-mode manual accepted alongside default',
      'Fixed background sessions silently stopping mid-turn after sleep/wake, and never restarting after a crash left a stale daemon.lock',
      'Fixed project-scoped plugins not loading correctly from git worktrees of the same repository',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: 'Manual permission mode',
  },
  {
    version: 'v2.1.199',
    date: 'Jul 2, 2026',
    highlights: [
      'Stacked slash-skill invocations like /skill-a /skill-b now load all leading skills (up to 5), not just the first',
      'Transient server rate-limit errors (429s unrelated to usage limit) now retried automatically with backoff for subscribers; CLAUDE_CODE_RETRY_WATCHDOG raises default retries to 300 and lifts the CLAUDE_CODE_MAX_RETRIES cap',
      'Fixed streaming responses discarded on mid-stream server errors (partial output now kept); subagents cut off by rate limits now return partial work to the parent; API errors in subagents reported instead of shown as success',
      'Fixed the Linux background-agent daemon killing itself and all agents every ~50s after an unclean shutdown; SSL certificate errors now fail immediately with actionable guidance',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.198',
    date: 'Jul 1, 2026',
    highlights: [
      '⭐ Subagents now run in the background by default: Claude keeps working while they run and is notified when they finish',
      '⭐ Claude in Chrome is now generally available',
      'Background agents launched from claude agents now commit, push, and open a draft PR when finishing code work; new Notification hook events agent_needs_input / agent_completed',
      'Explore agent now inherits the session model (capped at Opus) instead of Haiku; subagents and compaction inherit extended thinking config; removed the /agents wizard',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: 'Background subagents + Chrome GA',
  },
  {
    version: 'v2.1.197',
    date: 'Jun 30, 2026',
    highlights: [
      '⭐ Introducing Claude Sonnet 5: now the default model in Claude Code, with a native 1M-token context window and promotional pricing of $2/$10 per Mtok through August 31',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: 'Claude Sonnet 5',
  },
  {
    version: 'v2.1.196',
    date: 'Jun 29, 2026',
    highlights: [
      'Added organization default models (shows as "Org default" or "Role default" in /model); readable default session names; clickable file attachments in chat (Cmd/Ctrl-click reveals in Finder/Explorer)',
      'Security: claude mcp list/get no longer spawn .mcp.json servers self-approved by a committed .claude/settings.json; untrusted workspaces show pending approval',
      'Fixed waking a background job permanently deleting its conversation on a transcript misread; rate-limit warning flicker/over-counting; duplicate recap lines after StructuredOutput retry',
      'Improved background session reliability across process stop/restart/update; /code-review merged five cleanup finders (~25% token reduction); streaming idle watchdog on by default',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.195',
    date: 'Jun 26, 2026',
    highlights: [
      'Fixed hook matchers with hyphenated identifiers (e.g. code-reviewer, mcp__brave-search) accidentally substring-matching; use mcp__brave-search__.* to match all tools from a server',
      'Fixed voice dictation on macOS (silence after input device change) and auto-submit for languages without spaces (Japanese, Chinese, Thai)',
      'Fixed background agent daemon socket failures, blank screen on crash restart, jobs disappearing when written by newer version',
      'Added CLAUDE_CODE_DISABLE_MOUSE_CLICKS; Remote session startup shows provisioning checklist',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.193',
    date: 'Jun 25, 2026',
    highlights: [
      '⭐ claude_code.assistant_response OpenTelemetry event logs model responses; set OTEL_LOG_ASSISTANT_RESPONSES=0 if you log prompts and want to exclude responses',
      'autoMode.classifyAllShell routes all Bash/PowerShell through auto-mode classifier; denial reasons shown in transcript, toast, and /permissions',
      'Live file path autocomplete in bash mode (!); startup notice when MCP servers need auth',
      'Automatic memory-pressure reaping for idle background shell commands (disable: CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1)',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.191',
    date: 'Jun 24, 2026',
    highlights: [
      '⭐ /rewind now works after /clear to resume a conversation from before the clear',
      'Reduced CPU usage during streaming by ~37% by coalescing text updates to 100ms intervals',
      'MCP server reliability: capability discovery retries transient errors; OAuth headless paste-URL fallback; HTTP 404 errors show URL',
      'Fixed background agents resurrecting after stop; 20+ bug fixes including scroll jump and welcome splash overflow',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.190',
    date: 'Jun 24, 2026',
    highlights: [
      'Bug fixes and reliability improvements',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.187',
    date: 'Jun 23, 2026',
    highlights: [
      '⭐ sandbox.credentials setting blocks sandboxed commands from reading credential files and secret environment variables',
      '⭐ Org-configured model restrictions enforced in model picker, --model, /model, and ANTHROPIC_MODEL with explanatory message',
      'Fixed remote MCP tool calls hanging indefinitely; now abort after 5 min with error (override: CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT)',
      'Fixed --resume failing after no-model -p runs; fixed structured output looping; 15+ bug fixes',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.186',
    date: 'Jun 23, 2026',
    highlights: [
      '⭐ `claude mcp login/logout <name>` authenticates MCP servers from the CLI without the interactive /mcp menu; --no-browser flag for SSH sessions',
      '`!` bash commands now auto-trigger Claude to respond to output; opt-out via "respondToBashCommands": false in settings.json',
      'Background subagents surface permission prompts in main session instead of auto-denying; dialog shows which agent is asking',
      'Fixed Agent(type) deny rules and Agent(x,y) allowed-types restrictions not enforced for named subagent spawns; 25+ bug fixes',
    ],
  },
  {
    version: 'v2.1.185',
    date: 'Jun 22, 2026',
    highlights: [
      'Improved stream-stall hint: reads "Waiting for API response · will retry in …" (was "No response from API · Retrying in …"), triggers after 20s instead of 10s',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.183',
    date: 'Jun 19, 2026',
    highlights: [
      '⭐ Auto mode safety: destructive git ops (reset --hard, checkout -- ., clean -fd) and git commit --amend and terraform/pulumi/cdk destroy are blocked unless explicitly requested',
      'Model deprecation warnings on stderr in print mode (-p) and for models set in agent frontmatter',
      '`attribution.sessionUrl` setting omits the claude.ai session link from commits and PRs in web/Remote Control sessions',
      '10+ bug fixes: thinking 400 errors on subagent spawns, WebSearch empty in subagents, tmux pane launch failures',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.181',
    date: 'Jun 18, 2026',
    highlights: [
      '⭐ `/config key=value` syntax sets any setting inline from the prompt (e.g. `/config thinking=false`) — works in interactive, -p, and Remote Control',
      '`sandbox.allowAppleEvents` opt-in for macOS sandboxed commands',
      'Improved streaming: long paragraphs appear line-by-line instead of waiting for the first line break',
      'Improved subagent panel: idle agents auto-hide after 30s, list caps at 5 rows with scroll hints; 30+ bug fixes',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.179',
    date: 'Jun 17, 2026',
    highlights: [
      'Fixed mid-stream connection drops: partial responses preserved, spinner no longer stuck at "running tool"',
      'Fixed mouse-wheel scrolling in WSL2 under Windows Terminal and VS Code (regression in 2.1.172)',
      '6+ bug fixes: sandbox denyRead/allowRead glob performance, feedback survey rating, welcome banner stacking, Ctrl+O subagent transcript, prompt focus',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.178',
    date: 'Jun 17, 2026',
    highlights: [
      '⭐ Tool(param:value) syntax for permission rules to match tool input parameters, e.g. Agent(model:opus) to block Opus subagents',
      'Nested .claude/skills directories load when working on files there; directory-qualified names on clash prevent conflicts',
      'Improved auto mode: subagent spawns evaluated by classifier before launch',
      '10+ bug fixes: subagent transcript, compaction fallback model, stale auth credentials, MCP disallowedTools server specs, vim undo',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.176',
    date: 'Jun 15, 2026',
    highlights: [
      '⭐ Session titles generated in the language of your conversation; `language` setting pins a specific language',
      '`footerLinksRegexes` setting: regex-matched link badges in the footer row',
      'Improved Bedrock credential caching: cached until Expiration instead of fixed 1 hour',
      '15+ bug fixes: availableModels alias enforcement, Fable 5 auto mode fallback, hook if path conditions, Linux sandbox symlink, tmux clipboard, Remote Control model switch',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.175',
    date: 'Jun 15, 2026',
    highlights: [
      '⭐ `enforceAvailableModels` managed setting: constrains Default model to allowlist; blocks user/project settings from widening a managed list',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.174',
    date: 'Jun 15, 2026',
    highlights: [
      '`wheelScrollAccelerationEnabled` setting to disable mouse-wheel scroll acceleration in fullscreen mode',
      'Fixed /model picker hiding the model family that Default resolves to (Opus/Sonnet row visible per plan type)',
      '[VSCode] Usage attribution in /usage dialog: cache misses, long context, subagents, per-skill/agent/plugin/MCP breakdowns',
      '8+ bug fixes: Fable 5 billing banner, Bedrock GovCloud prefix, background session env inheritance, exit pause on macOS/Linux',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.173',
    date: 'Jun 11, 2026',
    highlights: [
      'Fixed Fable 5 model names with [1m] suffix not normalized (1M context included by default)',
      'Fixed spurious "sandbox dependencies missing" startup warning on Windows',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.172',
    date: 'Jun 11, 2026',
    highlights: [
      '⭐ Sub-agents can now spawn their own sub-agents (up to 5 levels deep)',
      'Amazon Bedrock reads AWS region from ~/.aws config files when AWS_REGION not set',
      'Search bar added when browsing marketplace plugins in /plugin',
      '20+ bug fixes: 1M context stuck, model picker availableModels issues, permission rule wildcards, VS Code PowerShell rendering',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.170',
    date: 'Jun 9, 2026',
    highlights: [
      '⭐ Claude Fable 5 (Mythos-class model) now available',
      'Fixed transcript saving from VS Code integrated terminal sessions',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: 'Fable 5',
  },
  {
    version: 'v2.1.169',
    date: 'Jun 9, 2026',
    highlights: [
      '⭐ --safe-mode flag: start with all customizations disabled for troubleshooting',
      '⭐ /cd command: change working directory mid-session without breaking prompt cache',
      'disableBundledSkills setting to hide built-in skills, workflows, and slash commands',
      '15+ bug fixes: enterprise MCP policy enforcement, macOS UI stall, Windows Git popup, agents --json',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.168',
    date: 'Jun 6, 2026',
    highlights: ['Bug fixes and reliability improvements'],
  },
  {
    version: 'v2.1.167',
    date: 'Jun 6, 2026',
    highlights: ['Bug fixes and reliability improvements'],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.166',
    date: 'Jun 6, 2026',
    highlights: [
      '`fallbackModel` setting: up to 3 fallback models tried in order when primary is overloaded or unavailable; `--fallback-model` works in interactive sessions too',
      'Glob patterns in deny rule tool-name position (`"*"` denies all tools); hardened `SendMessage`: relayed messages no longer carry user authority',
      '`MAX_THINKING_TOKENS=0`, `--thinking disabled`, and per-model toggle now disable thinking on models that think by default via Claude API',
      '15+ bug fixes: JetBrains 2026.1+ flickering, Kitty protocol Shift+non-ASCII input, PowerShell hang, orphaned `--bg-pty-host` CPU spin',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.165',
    date: 'Jun 5, 2026',
    highlights: ['Bug fixes and reliability improvements'],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.163',
    date: 'Jun 4, 2026',
    highlights: [
      '`requiredMinimumVersion`/`requiredMaximumVersion` managed settings: Claude Code refuses to start outside the allowed version range',
      '`/plugin list` with `--enabled`/`--disabled` filters; Stop/SubagentStop hooks can return `additionalContext` to continue the turn',
      'Skills: `\\$` escape for literal `$` in command bodies; stdio MCPs receive `CLAUDE_CODE_SESSION_ID` on `--resume`',
      '10+ bug fixes: `claude -p` background hang, bazel/EDR bash regression, Windows EEXIST fix, managed settings on fresh config',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.162',
    date: 'Jun 3, 2026',
    highlights: [
      '`claude agents --json` now includes `waitingFor` showing what a waiting session is blocked on (e.g. permission prompt)',
      'Clicking a slash command fills it into the prompt instead of running immediately; press Enter to run',
      'Remote Control shows as a persistent footer pill; Windsurf renamed to Devin Desktop in `/ide`, `/terminal-setup`, `/scroll-speed`',
      'Quieter startup: notices group by severity, session info and announcements share a single line; 25+ bug fixes',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.161',
    date: 'Jun 2, 2026',
    highlights: [
      '`OTEL_RESOURCE_ATTRIBUTES` values included as labels on metric datapoints for custom dimensions (team, repo)',
      '`claude agents` rows show `done/total` for fanned-out work; `/mcp` collapses unused claude.ai connectors',
      'Parallel tool calls: failed Bash no longer cancels other calls in the same batch',
      '20+ bug fixes: managed-settings policies fix for third-party providers, MCP secrets no longer printed to terminal, `isolation: worktree` in background sessions fixed',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.160',
    date: 'Jun 1, 2026',
    highlights: [
      '⭐ Renamed dynamic-workflow trigger keyword from `workflow` to `ultracode` (violet shimmer in prompt); asking in your own words still works',
      'Security: added prompt before writing to shell startup files (`.zshenv`, `.zlogin`) and `~/.config/git/`; `acceptEdits` mode prompts before build-tool config files',
      'Edit no longer requires separate Read after single-file `grep`/`egrep`/`fgrep`',
      'Removed `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` (deprecated in 2.1.154, now no-op); JetBrains plugin suggestion removed from startup; 20+ bug fixes',
    ],
    breaking: ['`workflow` keyword no longer triggers dynamic workflows; use `ultracode` instead'],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.159',
    date: 'May 31, 2026',
    highlights: [
      'Internal infrastructure improvements (no user-facing changes)',
    ],
  },
  {
    version: 'v2.1.158',
    date: 'May 30, 2026',
    highlights: [
      '⭐ Auto mode now available on Bedrock, Vertex, and Foundry for Opus 4.7 and Opus 4.8; opt in with `CLAUDE_CODE_ENABLE_AUTO_MODE=1`',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.157',
    date: 'May 29, 2026',
    highlights: [
      '⭐ Plugins in `.claude/skills` directories auto-load without marketplace required; `claude plugin init <name>` scaffolds new plugins',
      'Autocomplete for `/plugin` arguments; `agent` field in `settings.json` honored for dispatched sessions with `--agent <name>` override; `EnterWorktree` switches between worktrees mid-session',
      '20+ bug fixes: corrupted images no longer crash requests, sandbox network prompts fixed in desktop/IDE/SDK auto mode, `--resume` improvements, WSL image paste fixes, right-click paste duplicate, long conversation performance improved',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.156',
    date: 'May 28, 2026',
    highlights: [
      'Fixed Opus 4.8 thinking blocks being modified, which was causing API errors',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.154',
    date: 'May 28, 2026',
    highlights: [
      '⭐ Opus 4.8 with high effort default; `/effort xhigh` for hardest tasks; fast mode at 2x rate / 2.5x speed',
      '⭐ Dynamic workflows: Claude orchestrates tens to hundreds of background agents in one session; run `/workflows` to monitor',
      'Lean system prompt default for all models except Haiku/Sonnet/Opus 4.7+; `/simplify` reworked to cleanup-only (reuse/simplification/efficiency/altitude); `! <command>` in claude agents runs background shell sessions',
      'Streaming tool execution always-on including Bedrock/Vertex/Foundry; plugin `defaultEnabled: false` option; 30+ bug fixes',
    ],
    breaking: [
      '`CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` deprecated (removed 2026-06-01); use `/model claude-opus-4-6[1m]` then `/fast on`',
      '`/simplify` now runs cleanup-only review instead of full code-review fix',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.153',
    date: 'May 28, 2026',
    highlights: [
      '`/model` now saves as default for new sessions (IDE parity); press `s` in the picker to switch current session only',
      '`skipLfs` for plugin marketplace git sources; status line commands get `COLUMNS`/`LINES` env vars; `claude agents` autocomplete includes built-in skills + slash commands; PR column shows `PR #N` / `N PRs`',
      '25+ bug fixes: stateful MCP reconnect loop (regression 2.1.147), API gateway credential leak, subagent MCP ignoring enterprise policies, Agent tool worktree silently discarding outputs, Windows installer false success',
    ],
    breaking: ['`modelPicker:setAsDefault` keybinding renamed to `modelPicker:thisSessionOnly` in keybindings.json'],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.152',
    date: 'May 27, 2026',
    highlights: [
      '`/code-review --fix` applies review findings to working tree after review; `/simplify` now invokes `/code-review --fix`',
      'Skills/commands can set `disallowed-tools` frontmatter to remove tools while the skill is active; `/reload-skills` re-scans directories without restart',
      'New `MessageDisplay` hook event to transform or hide assistant message text',
      'Auto mode no longer requires opt-in; `--fallback-model` for session-level fallback; `SessionStart` can set session title + trigger skill reload; 35+ bug fixes',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.150',
    date: 'May 23, 2026',
    highlights: [
      'Internal infrastructure improvements (no user-facing changes)',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.149',
    date: 'May 23, 2026',
    highlights: [
      '/usage per-category breakdown: skills, subagents, plugins, and per-MCP-server cost',
      'Markdown GFM task list checkboxes (- [ ]/- [x]) now render natively',
      'Security: PowerShell cd permission bypass fixed + sandbox worktree write allowlist corrected',
      'Enterprise: allowAllClaudeAiMcps managed setting for claude.ai cloud MCP connectors',
      '20+ bug fixes: /diff keyboard scrolling, transcript view freeze, slash-command arg hints, /insights crash',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.148',
    date: 'May 22, 2026',
    highlights: [
      'Hotfix: Bash tool returning exit code 127 on every command (regression from 2.1.147)',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.147',
    date: 'May 22, 2026',
    highlights: [
      '⭐ Pinned background sessions (<code>Ctrl+T</code> in <code>claude agents</code>): stay alive when idle, auto-restart on CC updates, shed under memory pressure only after non-pinned sessions',
      '<code>/code-review --comment</code>: post findings as inline GitHub PR comments',
      'Improved auto-updater: retries transient network failures, reports specific error categories and OS error codes, shows current version on failure',
      'Bug fixes: prompt history no consecutive duplicates, PowerShell hook <code>if</code> conditions matching, pasted text <code>[Pasted text #N]</code> placeholder, plugin component counts doubled, slash commands + tab/newline treated as unknown, 25+ additional fixes',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.146',
    date: 'May 21, 2026',
    highlights: [
      '⭐ <code>/simplify</code> renamed to <code>/code-review</code> with optional effort level (e.g. <code>/code-review high</code>)',
      'Auto mode no longer suppresses <code>AskUserQuestion</code> when the user or a skill explicitly relies on it',
      'Bug fixes: Windows PowerShell "command line is invalid" regression (2.1.124), MCP paginated resources/prompts, <code>/background</code> refusing skill-only commands, backgrounded sessions re-prompting for already-granted permissions, 15+ total',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.145',
    date: 'May 20, 2026',
    highlights: [
      '⭐ <code>claude agents --json</code>: list live sessions as JSON for scripting (tmux-resurrect, status bars, session pickers)',
      '⭐ <code>/plugin</code> Discover/Browse now previews commands, agents, skills, hooks, MCP/LSP before installation; tab title shows awaiting-input count',
      'Security fix: permission-prompt bypass for bare variable assignments to non-allowlisted env vars in Bash now requires explicit approval',
      'Bug fixes: MCP paginated resources/templates/prompts, Read tool truncates instead of hard error, <code>/review</code> GraphQL fix, task list ordering, agent team non-ASCII names',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.144',
    date: 'May 19, 2026',
    highlights: [
      '⭐ <code>/resume</code> now lists background sessions (started via <code>--bg</code> or agent view) alongside interactive ones, marked with <code>bg</code>',
      '⭐ <code>/model</code> is now session-only by default: press <code>d</code> in the picker to set a default model for new sessions',
      '"extra usage" renamed to "usage credits" across CLI; <code>/extra-usage</code> → <code>/usage-credits</code> (old name still works)',
      'Bug fixes: 75s startup hang on unreachable API (now 15s timeout), terminal rendering corruption, macOS Full Disk Access crash, MCP paginated <code>tools/list</code>, 40+ total',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.143',
    date: 'May 16, 2026',
    highlights: [
      '⭐ Plugin dependency enforcement: <code>claude plugin disable</code> refuses when another enabled plugin depends on the target (with disable-chain hint); <code>enable</code> force-enables transitive deps',
      '⭐ Projected context cost (per-turn and per-invocation token estimates) added to the <code>/plugin</code> marketplace browse pane',
      '<code>worktree.bgIsolation: "none"</code>: background sessions edit working copy directly without <code>EnterWorktree</code>',
      'Bug fixes: stop hook block loop (warns after 8 blocks), Esc/Ctrl+C cancels <code>/loop</code> wakeup, background sessions preserve model+effort after idle wake',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.142',
    date: 'May 15, 2026',
    highlights: [
      '⭐ Fast mode now uses Opus 4.7 by default (was Opus 4.6): set <code>CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1</code> to pin to 4.6',
      '⭐ New <code>claude agents</code> dispatch flags: <code>--add-dir</code>, <code>--settings</code>, <code>--mcp-config</code>, <code>--model</code>, <code>--effort</code>, <code>--permission-mode</code> and more',
      'Plugins with root-level <code>SKILL.md</code> and no <code>skills/</code> subdirectory now surface as a skill; <code>/plugin</code> shows LSP servers',
      'Bug fixes: <code>MCP_TOOL_TIMEOUT</code> now raises per-request fetch timeout, daemon exits cleanly after <code>brew upgrade</code>, background worktree recognition',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: 'Fast Mode Opus 4.7',
  },
  {
    version: 'v2.1.141',
    date: 'May 14, 2026',
    highlights: [
      '⭐ Hook <code>terminalSequence</code> output field: emit desktop notifications, window titles, and bells from hooks without a controlling terminal',
      '⭐ <code>claude agents --cwd &lt;path&gt;</code> scopes session list to a directory; agents with lingering shells move to Completed',
      'Rewind "Summarize up to here": compress earlier context; <code>/bg</code> preserves permission mode; spinner warms amber after 10s',
      '50+ bug fixes: Bedrock cross-account auth, MCP 403 needs-auth hint, Remote Control token rotation race, vim Ctrl+C, markdown table regression',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.140',
    date: 'May 13, 2026',
    highlights: [
      'Agent tool <code>subagent_type</code> matching now case- and separator-insensitive (<code>"Code Reviewer"</code> resolves to <code>code-reviewer</code>)',
      'Plugins warn when a default component folder is silently ignored due to <code>plugin.json</code> key conflict',
      'Bug fixes: <code>/goal</code> hang with <code>disableAllHooks</code>, symlinked settings hot-reload regression, <code>claude --bg</code> connection drop',
    ],
  },
  {
    version: 'v2.1.139',
    date: 'May 12, 2026',
    highlights: [
      '⭐ Agent view (Research Preview): <code>claude agents</code> lists all sessions: running, blocked on you, or done',
      '⭐ <code>/goal</code> command: set a completion condition; Claude works across turns with live elapsed/turns/tokens overlay',
      'Hook <code>args: string[]</code> exec form (no shell spawning) + <code>continueOnBlock</code> for PostToolUse',
      '40+ bug fixes: auth deadlock, <code>autoAllowBashIfSandboxed</code> shell expansion, MCP SSE 16MB cap, Skill wildcard prefix match',
    ],
    initiallyVisible: true,
    featured: true,
    featuredLabel: 'Agent View',
  },
  {
    version: 'v2.1.138',
    date: 'May 11, 2026',
    highlights: [
      'Internal fixes',
    ],
  },
  {
    version: 'v2.1.137',
    date: 'May 11, 2026',
    highlights: [
      '[VSCode] Fixed extension failing to activate on Windows',
    ],
  },
  {
    version: 'v2.1.136',
    date: 'May 11, 2026',
    highlights: [
      '⭐ <code>settings.autoMode.hard_deny</code>: auto mode classifier rules that block unconditionally regardless of user intent or allow exceptions',
      '<code>CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL</code> to re-enable session quality survey for enterprises capturing responses via OpenTelemetry',
      'Fixed MCP servers disappearing after <code>/clear</code> in VS Code/JetBrains/Agent SDK; MCP OAuth concurrent refresh token race fixed (no more daily re-auth for multi-server users)',
      '40+ UI/terminal fixes: plan mode write blocking, extended thinking redacted-block API 400 fix, <code>--resume</code> with underscores in project path, WSL2 image paste via PowerShell fallback',
    ],
  },
  {
    version: 'v2.1.133',
    date: 'May 8, 2026',
    highlights: [
      '⭐ <code>worktree.baseRef</code> setting (<code>fresh</code> | <code>head</code>): <code>fresh</code> (default) branches from <code>origin/&lt;default&gt;</code>; set <code>head</code> to keep local HEAD with unpushed commits. <strong>Note:</strong> reverts 2.1.128 behavior: set <code>worktree.baseRef: "head"</code> to restore it',
      'Hooks receive active effort level via <code>effort.level</code> JSON field and <code>$CLAUDE_EFFORT</code> env var in Bash subcommands',
      'Fixed subagents not discovering project/user/plugin skills via Skill tool',
      'Fixed parallel sessions dead-ending at 401 after refresh-token race; <code>HTTP(S)_PROXY</code>/<code>NO_PROXY</code>/mTLS now respected for full MCP OAuth flow',
    ],
    breaking: ['<code>worktree.baseRef</code> defaults to <code>fresh</code> (branches from <code>origin/&lt;default&gt;</code>), reverting 2.1.128: set <code>worktree.baseRef: "head"</code> to keep local HEAD'],
  },
  {
    version: 'v2.1.132',
    date: 'May 8, 2026',
    highlights: [
      '<code>CLAUDE_CODE_SESSION_ID</code> env var now passed to Bash tool subprocess environment (matches <code>session_id</code> in hook JSON input)',
      '<code>CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1</code> to opt out of the fullscreen alternate-screen renderer and keep output in native scrollback',
      'Fixed unbounded memory growth (10GB+ RSS) when a stdio MCP server writes non-protocol data to stdout',
      '20+ terminal/TUI/MCP fixes: SIGINT graceful shutdown, <code>--resume</code> emoji crash, fullscreen blank after sleep, JetBrains scroll runaway, mouse wheel speed in Cursor/VS Code, pasting <code>/</code> swallow, statusline context token counts, Alt+T on macOS, MCP <code>tools/list</code> failure silent 0-tools',
    ],
  },
  {
    version: 'v2.1.131',
    date: 'May 6, 2026',
    highlights: [
      'Fixed VS Code extension failing to activate on Windows (hardcoded <code>createRequire</code> build path in bundled SDK)',
      'Fixed Mantle endpoint authentication failing with missing <code>x-api-key</code> header',
    ],
  },
  {
    version: 'v2.1.129',
    date: 'May 6, 2026',
    highlights: [
      '<code>--plugin-url &lt;url&gt;</code> flag to fetch a plugin <code>.zip</code> archive from URL for the current session; <code>CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE</code> for Homebrew/WinGet auto-upgrade with restart prompt',
      'Ctrl+R history picker restored to all-projects default (pre-2.1.124 behavior): press Ctrl+S to narrow to current project or session; <code>skillOverrides</code> setting now works',
      'Gateway <code>/v1/models</code> discovery now opt-in via <code>CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1</code>; third-party deployments no longer see first-party spinner tips',
      '20+ bug fixes: 1h prompt cache TTL downgrade, OAuth refresh race after sleep, <code>Bash(mkdir *)</code> allow rules, <code>/context</code> wasting ~1.6k tokens, <code>/clear</code> tab title reset, agent panel hidden regression, <code>Bash(touch *)</code> allow rules',
    ],
  },
  {
    version: 'v2.1.128',
    date: 'May 5, 2026',
    highlights: [
      '<code>EnterWorktree</code> now creates branch from local HEAD: unpushed commits no longer dropped; <code>--plugin-dir</code> accepts <code>.zip</code> plugin archives',
      '<code>--channels</code> works with console (API key) auth; <code>/mcp</code> shows tool count per server and flags 0-tool servers',
      'Parallel bash tool call fix: a failing read-only command no longer cancels sibling calls; sub-agent summaries now include prompt cache (~3x <code>cache_creation</code> reduction)',
      '35+ bug fixes: 1M-context false "Prompt is too long", MCP stdio corrupted args with spaces, MCP images dropped on structured+content blocks, clipboard whitespace in code blocks',
    ],
  },
  {
    version: 'v2.1.126',
    date: 'May 1, 2026',
    highlights: [
      '⭐ <code>/model</code> picker lists models from your gateway\'s <code>/v1/models</code> endpoint when <code>ANTHROPIC_BASE_URL</code> points at a compatible gateway',
      '⭐ <code>claude project purge [path]</code>: delete all Claude Code state for a project (transcripts, tasks, history, config entry); supports <code>--dry-run</code>, <code>-y</code>, <code>-i</code>, <code>--all</code>',
      '<code>claude auth login</code> accepts pasted OAuth code when browser callback can\'t reach localhost (WSL2, SSH, containers); Windows PowerShell 7 now detected + primary shell',
      'Security: Fixed <code>allowManagedDomainsOnly</code>/<code>allowManagedReadPathsOnly</code> ignored when higher-priority settings lacked sandbox block; 40+ bug fixes (image paste crash >2000px, Stream idle timeout after sleep, CJK text on Windows, OAuth timeout, Agent SDK hang)',
    ],
  },
  {
    version: 'v2.1.123',
    date: 'Apr 29, 2026',
    highlights: [
      'Fixed OAuth authentication failing with 401 retry loop when <code>CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1</code> is set',
    ],
  },
  {
    version: 'v2.1.122',
    date: 'Apr 28, 2026',
    highlights: [
      '⭐ <code>ANTHROPIC_BEDROCK_SERVICE_TIER</code> env var to select Bedrock service tier (<code>default</code>/<code>flex</code>/<code>priority</code>) via <code>X-Amzn-Bedrock-Service-Tier</code> header',
      'Pasting a PR URL into <code>/resume</code> search finds the session that created it (GitHub, GitLab, Bitbucket, GitHub Enterprise)',
      'Fixes: Vertex AI/Bedrock <code>output_config</code> errors, image resize corrected (2576→2000px max), remote control idle redraw flood, <code>!exit</code>/<code>!quit</code> bash mode crash, <code>ToolSearch</code> missing late-connecting MCP tools',
    ],
  },
  {
    version: 'v2.1.121',
    date: 'Apr 27, 2026',
    highlights: [
      '⭐ <code>alwaysLoad</code> MCP server config option: tools skip tool-search deferral and are always available',
      '⭐ <code>claude plugin prune</code> removes orphaned auto-installed plugin deps; <code>PostToolUse</code> hooks can now replace output for all tools (previously MCP-only)',
      'Type-to-filter search in <code>/skills</code>; MCP servers auto-retry 3x on startup; <code>--dangerously-skip-permissions</code> skips <code>.claude/</code> dirs',
      'Critical fixes: unbounded memory growth (multi-GB RSS) with images; <code>/usage</code> memory leak (~2GB); Bash tool unusable when start dir deleted; <code>--resume</code> crash on corrupted sessions',
    ],
  },
  {
    version: 'v2.1.120',
    date: 'Apr 24, 2026',
    highlights: [
      '⭐ Windows: Git for Windows (Git Bash) no longer required: PowerShell used as shell tool when absent',
      '⭐ <code>claude ultrareview [target]</code> subcommand for non-interactive CI/script use (<code>--json</code> for raw output)',
      'Skills can reference effort level with <code>${CLAUDE_EFFORT}</code>; <code>AI_AGENT</code> env var for <code>gh</code> traffic attribution',
      'Fixes: Esc during stdio MCP call closing server (regression 2.1.105), <code>/rewind</code> keyboard input after <code>--resume</code>, scrollback duplication, false-positive <code>rm</code> permission prompts in auto mode',
    ],
  },
  {
    version: 'v2.1.119',
    date: 'Apr 24, 2026',
    highlights: [
      '⭐ <code>/config</code> settings (theme, editor mode, verbose) now persist to <code>~/.claude/settings.json</code> and participate in project/local/policy override precedence',
      '⭐ <code>--from-pr</code> now accepts GitLab merge-request, Bitbucket pull-request, and GitHub Enterprise PR URLs',
      '<code>--print</code> honors agent <code>tools:</code>/<code>disallowedTools:</code> frontmatter; <code>--agent</code> honors <code>permissionMode</code>; PowerShell auto-approve; <code>PostToolUse</code> hooks include <code>duration_ms</code>',
      'Security: <code>blockedMarketplaces</code> enforces <code>hostPattern</code>/<code>pathPattern</code>; <code>prUrlTemplate</code> setting; 30+ bug fixes including CRLF paste, Glob/Grep on macOS, <code>/plan</code> mode fix, <code>TaskList</code> ordering, stale worktree reuse',
    ],
  },
  {
    version: 'v2.1.118',
    date: 'Apr 23, 2026',
    highlights: [
      '⭐ Vim visual mode (<code>v</code>) and visual-line mode (<code>V</code>) with selection, operators, and visual feedback',
      '⭐ <code>/cost</code> and <code>/stats</code> merged into <code>/usage</code>: both remain as typing shortcuts that open the relevant tab',
      '⭐ Custom named themes from <code>/theme</code> or hand-edit JSON in <code>~/.claude/themes/</code>; plugins can ship themes via <code>themes/</code> directory',
      'Hooks can invoke MCP tools directly via <code>type: "mcp_tool"</code>; <code>DISABLE_UPDATES</code> env var; <code>wslInheritsWindowsSettings</code> policy; 15+ bug fixes',
    ],
  },
  {
    version: 'v2.1.117',
    date: 'Apr 22, 2026',
    highlights: [
      '⭐ Default effort changed to <code>high</code> for Pro/Max subscribers on Opus 4.6 and Sonnet 4.6 (was <code>medium</code>)',
      '⭐ Fixed Opus 4.7 sessions showing inflated <code>/context</code> percentages and autocompacting too early: was computing against 200K instead of native 1M context window',
      'Native macOS/Linux builds: Glob and Grep tools replaced by embedded <code>bfs</code> and <code>ugrep</code>: faster searches without extra tool round-trip (Windows/npm unchanged)',
      '<code>/model</code> selections persist across restarts; startup header shows model source pin; plugin dependency fixes; 15+ bug fixes',
    ],
  },
  {
    version: 'v2.1.116',
    date: 'Apr 21, 2026',
    highlights: [
      '⭐ <code>/resume</code> up to 67% faster on large sessions (40MB+); handles sessions with many dead-fork entries more efficiently',
      'Thinking spinner shows inline progress: "still thinking", "thinking more", "almost done thinking": replaces the separate hint row',
      'Security: sandbox auto-allow no longer bypasses the dangerous-path check for <code>rm</code>/<code>rmdir</code> targeting <code>/</code>, <code>$HOME</code>, or critical system directories',
      'Agent frontmatter <code>hooks:</code> now fire when running as main-thread agent via <code>--agent</code>; <code>/config</code> search matches option values; many terminal, scrolling, and UI bug fixes',
    ],
  },
  {
    version: 'v2.1.114',
    date: 'Apr 18, 2026',
    highlights: [
      'Fixed crash in permission dialog when an agent teams teammate requested tool permission',
    ],
  },
  {
    version: 'v2.1.113',
    date: 'Apr 18, 2026',
    highlights: [
      '⭐ CLI now spawns a native Claude Code binary via per-platform optional dependency instead of bundled JavaScript',
      '⭐ <code>sandbox.network.deniedDomains</code> setting: block specific domains even when a wildcard <code>allowedDomains</code> would permit them',
      'Security hardening: macOS <code>/private/{etc,var,tmp,home}</code> paths flagged for <code>Bash(rm:*)</code> rules; deny rules match <code>env</code>/<code>sudo</code>/<code>watch</code>/<code>ionice</code>/<code>setsid</code> wrappers; <code>Bash(find:*)</code> no longer auto-approves <code>-exec</code>/<code>-delete</code>',
      'Keyboard improvements (<code>Ctrl+A</code>/<code>E</code> logical line, <code>Ctrl+Backspace</code> on Windows); <code>/loop</code> Esc cancels wakeups; subagents fail with clear error after 10 min; many bug fixes',
    ],
  },
  {
    version: 'v2.1.111',
    date: 'Apr 16, 2026',
    highlights: [
      '⭐ Claude Opus 4.7 <code>xhigh</code> effort level (between <code>high</code> and <code>max</code>); Auto mode for Max subscribers no longer requires <code>--enable-auto-mode</code>',
      '⭐ <code>/ultrareview</code> skill: cloud-based parallel multi-agent code review; invoke without args for current branch or <code>/ultrareview &lt;PR#&gt;</code>',
      '⭐ <code>/less-permission-prompts</code> skill: scans transcripts and proposes a prioritized read-only allowlist for <code>settings.json</code>',
      'Plan files named after prompts; read-only bash with glob patterns and <code>cd &lt;dir&gt; &amp;&amp;</code> no longer trigger prompts; interactive <code>/effort</code> slider; many bug fixes',
    ],
  },
  {
    version: 'v2.1.110',
    date: 'Apr 16, 2026',
    highlights: [
      '⭐ <code>/tui</code> command and <code>tui</code> setting: run <code>/tui fullscreen</code> for flicker-free rendering in the same conversation',
      '⭐ Push notification tool: Claude can send mobile push notifications when Remote Control and "Push when Claude decides" config are enabled',
      '⭐ <code>--resume</code>/<code>--continue</code> now resurrects unexpired scheduled tasks',
      '<code>/focus</code> command for focus view; <code>Ctrl+O</code> reverts to verbose transcript toggle; <code>autoScrollEnabled</code> config; session recap for telemetry-disabled users; 30+ bug fixes',
    ],
  },
  {
    version: 'v2.1.109',
    date: 'Apr 15, 2026',
    highlights: [
      'Improved extended-thinking indicator with a rotating progress hint for better visibility during long thinking phases',
    ],
  },
  {
    version: 'v2.1.108',
    date: 'Apr 15, 2026',
    highlights: [
      '⭐ <code>ENABLE_PROMPT_CACHING_1H</code> env var: opt into 1-hour prompt cache TTL on API key, Bedrock, Vertex, and Foundry; <code>FORCE_PROMPT_CACHING_5M</code> to force 5-minute TTL',
      '⭐ <code>/recap</code> command: provides context when returning to a session after a break; configurable in <code>/config</code>',
      'Built-in slash commands (<code>/init</code>, <code>/review</code>, <code>/security-review</code>) now discoverable and invokable via the Skill tool; <code>/undo</code> alias for <code>/rewind</code>',
      '<code>/resume</code> picker defaults to current directory sessions (Ctrl+A for all); improved model-switch warning mid-conversation; reduced memory footprint for file reads and syntax highlighting',
    ],
  },
  {
    version: 'v2.1.107',
    date: 'Apr 14, 2026',
    highlights: [
      'Show thinking hints sooner during long operations for better real-time feedback',
    ],
  },
  {
    version: 'v2.1.105',
    date: 'Apr 13, 2026',
    highlights: [
      '⭐ PreCompact hook support: hooks can block compaction by exiting with code 2 or returning <code>{"decision":"block"}</code>',
      '<code>EnterWorktree</code> tool gains <code>path</code> parameter to switch into an existing worktree; <code>/proactive</code> alias for <code>/loop</code>; background monitor support for plugins',
      '<code>WebFetch</code> strips <code>&lt;style&gt;</code>/<code>&lt;script&gt;</code> contents; stalled API streams abort after 5 min then retry non-streaming; <code>/doctor</code> status icons with <code>f</code>-to-fix',
      'Multiple bug fixes: queued image drops, screen blank on wrapped prompts, MCP tools missing on headless first turn, 429 raw JSON error display',
    ],
  },
  {
    version: 'v2.1.101',
    date: 'Apr 10, 2026',
    highlights: [
      '⭐ <code>/team-onboarding</code> command: generates a teammate ramp-up guide from your local Claude Code usage',
      'OS CA certificate store trusted by default: enterprise TLS proxies work without extra config (<code>CLAUDE_CODE_CERT_STORE=bundled</code> to revert)',
      '<code>/ultraplan</code> and remote-session features auto-create a default cloud environment (no web setup required first)',
      '40+ bug fixes: <code>--resume</code> context loss, Bedrock SigV4 auth 403, sub-agents in worktrees denied file access, <code>RemoteTrigger</code> run action, Grep ENOENT self-heal, hardcoded 5-min timeout removed, LSP command injection fix',
    ],
  },
  {
    version: 'v2.1.97',
    date: 'Apr 9, 2026',
    highlights: [
      '⭐ Focus view toggle (<code>Ctrl+O</code>) in NO_FLICKER mode: shows prompt, tool summary with edit diffstats, and final response',
      '<code>refreshInterval</code> status line setting + <code>workspace.git_worktree</code> JSON input field',
      '30+ bug fixes: NO_FLICKER (15 fixes), /resume (6 fixes), MCP 50 MB/hr buffer leak, permissions hardening, 429 exponential backoff',
    ],
  },
  {
    version: 'v2.1.96',
    date: 'Apr 8, 2026',
    highlights: [
      'Fixed Bedrock auth regression: <code>AWS_BEARER_TOKEN_BEDROCK</code> and <code>CLAUDE_CODE_SKIP_BEDROCK_AUTH</code> no longer fail with 403',
    ],
  },
  {
    version: 'v2.1.94',
    date: 'Apr 7, 2026',
    highlights: [
      '⭐ Amazon Bedrock powered by Mantle support: set <code>CLAUDE_CODE_USE_MANTLE=1</code>',
      'Default effort changed from medium to <strong>high</strong> for API-key, Bedrock/Vertex/Foundry, Team, and Enterprise users',
      'Plugin skills now use frontmatter <code>name</code> for stable invocation naming across install methods',
      'Compact <code>Slacked #channel</code> header with clickable link for Slack MCP tool calls',
    ],
  },
  {
    version: 'v2.1.92',
    date: 'Apr 4, 2026',
    highlights: [
      'Interactive Bedrock setup wizard from login screen: step-by-step AWS auth, region config, credential verification, and model pinning',
      '<code>forceRemoteSettingsRefresh</code> policy setting: fail-closed managed settings enforcement (blocks startup until fresh fetch)',
      'Per-model and cache-hit cost breakdown in <code>/cost</code> for subscription users',
      '<code>/release-notes</code> is now an interactive version picker',
      'Linux sandbox: <code>apply-seccomp</code> helper now in npm + native builds: restores unix-socket blocking',
    ],
  },
  {
    version: 'v2.1.91',
    date: 'Apr 3, 2026',
    highlights: [
      'MCP tool result size override via <code>_meta["anthropic/maxResultSizeChars"]</code> (up to 500K): large DB schemas pass through without truncation',
      '<code>disableSkillShellExecution</code> setting: disable inline shell execution in skills and plugin commands',
      'Plugins can ship <code>bin/</code> executables for direct Bash tool invocation',
      'Edit tool uses shorter <code>old_string</code> anchors: reduces output tokens',
    ],
  },
  {
    version: 'v2.1.90',
    date: 'Apr 2, 2026',
    highlights: [
      '<code>/powerup</code>: interactive animated lessons teaching Claude Code features with live demos',
      'Fixed infinite loop crashing sessions when rate-limit dialog repeatedly auto-opened',
      'Fixed <code>--resume</code> causing full prompt-cache miss for users with deferred tools (regression since v2.1.69)',
      'PowerShell tool hardened: trailing & bypass, debugger hang, TOCTOU fixed; SSE transport now linear-time',
    ],
  },
  {
    version: 'v2.1.89',
    date: 'Apr 1, 2026',
    highlights: [
      '<code>"defer"</code> permission decision for PreToolUse hooks: headless sessions pause at tool call and resume with <code>-p --resume</code>',
      'PermissionDenied hook: fires after auto mode classifier denials; return {retry: true} to let the model retry',
      'Named subagents now appear in @ mention typeahead; <code>CLAUDE_CODE_NO_FLICKER=1</code> for flicker-free rendering',
      'Massive bugfix batch: CRLF on Windows, StructuredOutput cache (50% failure rate), autocompact thrash circuit breaker, memory leaks',
    ],
    breaking: [
      'Thinking summaries disabled by default: add showThinkingSummaries: true to settings.json to restore',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.87',
    date: 'Mar 30, 2026',
    highlights: [
      'Fixed messages in Cowork Dispatch not getting delivered',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.86',
    date: 'Mar 28, 2026',
    highlights: [
      '<code>X-Claude-Code-Session-Id</code> header on API requests: proxies aggregate by session without parsing the body',
      'Reduced <code>@</code> file mention token overhead: raw string content no longer JSON-escaped; Read tool uses compact line-number format with dedup',
      'Improved prompt cache hit rate for Bedrock, Vertex, Foundry by removing dynamic content from tool descriptions',
      'Fixed marketplace plugin scripts failing with "Permission denied" on macOS/Linux (regression since v2.1.83); many other bugfixes',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.85',
    date: 'Mar 27, 2026',
    highlights: [
      'Conditional <code>if</code> field for hooks: filter when they run using permission rule syntax (e.g. <code>Bash(git *)</code>) to reduce process spawning overhead',
      '<code>CLAUDE_CODE_MCP_SERVER_NAME</code>/<code>_URL</code> env vars for <code>headersHelper</code> scripts: one helper serves multiple MCP servers',
      'PreToolUse hooks can now satisfy AskUserQuestion headlessly (return <code>updatedInput + permissionDecision: allow</code>)',
      'Fixed <code>/compact</code> failing with "context exceeded" on very large conversations; improved scroll performance (yoga-layout → TypeScript)',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.84',
    date: 'Mar 26, 2026',
    highlights: [
      'PowerShell tool for Windows (opt-in preview): direct PowerShell access alongside Bash tool',
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
      '<code>managed-settings.d/</code> drop-in directory: teams deploy independent policy fragments that merge alphabetically',
      '<code>CwdChanged</code> and <code>FileChanged</code> hook events for reactive environment management (direnv, auto-toolchain)',
      'Transcript search: press <code>/</code> in transcript mode (Ctrl+O); <code>CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1</code> strips credentials from subprocesses',
      'Security: fixed <code>--mcp-config</code> bypassing managed <code>allowedMcpServers</code>/<code>deniedMcpServers</code> policy; fixed macOS exit hang',
    ],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.81',
    date: 'Mar 22, 2026',
    highlights: [
      '<code>--bare</code> flag for scripted <code>-p</code> calls: skips hooks, LSP, plugin sync, skill walks (requires API key; no OAuth)',
      '<code>--channels</code> permission relay: channel servers can forward tool approval prompts to your phone',
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
      '<code>--channels</code> research preview: MCP servers can push messages into your session',
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
      '⭐ <strong>Opus 4.6 output limits raised</strong>: default max output to 64k tokens; upper bound for Opus 4.6 and Sonnet 4.6 to 128k tokens',
      '<code>allowRead</code> sandbox setting to re-allow reads within <code>denyRead</code> regions; <code>/copy N</code> for Nth-latest response; <code>/branch</code> replaces <code>/fork</code>',
      '<strong>Security fix</strong>: <code>PreToolUse</code> hooks returning <code>"allow"</code> could bypass enterprise <code>deny</code> permission rules',
      'Fixed auto-updater accumulating GBs of memory from overlapping downloads; fixed <code>--resume</code> silently truncating recent history',
      'Breaking: <code>Agent</code> tool no longer accepts <code>resume</code> parameter: use <code>SendMessage({to: agentId})</code> instead',
    ],
    breaking: ['Agent tool: <code>resume</code> parameter removed: use <code>SendMessage({to: agentId})</code>'],
    initiallyVisible: true,
  },
  {
    version: 'v2.1.76',
    date: 'Mar 14, 2026',
    highlights: [
      '⭐ <strong>MCP elicitation</strong>: servers request structured input mid-task via interactive dialog; new <code>Elicitation</code>, <code>ElicitationResult</code>, <code>PostCompact</code> hooks',
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
      '⭐ <strong>1M context for Opus 4.6: default</strong> for Max, Team, and Enterprise plans (no extra usage required)',
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
      '⭐ <strong>/context actionable suggestions</strong>: identifies context-heavy tools, memory bloat, capacity warnings with optimization tips',
      '⭐ <strong>Memory leak fixed</strong>: streaming API buffers unbounded RSS growth on npm path resolved',
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
      '⭐ <strong>modelOverrides setting</strong>: map model picker entries to custom provider model IDs (Bedrock ARNs, etc.)',
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
      '⭐ <strong>Agent model override restored</strong>: <code>model</code> parameter back on Agent tool for per-invocation overrides',
      '⭐ <strong>SDK 12x token savings</strong>: fixed <code>query()</code> prompt cache invalidation (up to 12× input token cost reduction)',
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
      '⭐ <strong>/loop command</strong>: run a prompt or slash command on a recurring interval (e.g. <code>/loop 5m check the deploy</code>)',
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
      '<strong>Breaking</strong>: Opus 4 and Opus 4.1 removed from Claude Code first-party API: auto-migrated to Opus 4.6',
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
      '⭐ <strong>HTTP hooks</strong>: hooks can now POST JSON to a URL and receive JSON back, instead of running a shell command',
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
      '&#129504; <strong>Auto-memory</strong>: Claude automatically saves useful context to memory. Manage with <code>/memory</code>',
      '<code>/copy</code> command: interactive picker to select individual code blocks or full response',
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
      '&#128241; <strong>Remote Control</strong>: control your local Claude Code session from any phone, tablet, or browser via <code>/rc</code> or <code>claude remote-control</code>. Execution stays 100% local. Pro/Max only (Research Preview)',
      'BashTool skips login shell by default when snapshot available: performance improvement',
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
