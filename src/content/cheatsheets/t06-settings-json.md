---
title: "Settings.json — Complete Structure"
subtitle: "All configuration keys and their scope"
cardNumber: T06
category: Technical
difficulty: intermediate
guideVersion: 3.32.1
order: 6
---

## File hierarchy

```
~/.claude/settings.json         (global, all projects)
        ↓ overridden by
.claude/settings.json           (project, shared with team)
        ↓ overridden by
.claude/settings.local.json     (local machine, gitignore)
```

`settings.local.json` always takes precedence. It is the ideal place for personal overrides without creating Git conflicts.

## Complete structure

```json
{
  "model": "claude-sonnet-4-5",
  "permissions": {
    "allow": ["Bash(git *)", "Bash(pnpm *)", "Read"],
    "deny":  ["Bash(rm -rf *)", "Write(file_path:*.env*)"],
    "ask":   ["Bash(npm publish)"]
  },
  "env": {
    "NODE_ENV": "development",
    "LOG_LEVEL": "debug"
  },
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command",
                  "command": ".claude/hooks/format.sh" }]
    }]
  }
}
```

## Available keys

| Key | Role |
|-----|------|
| `model` | Default model |
| `permissions.allow` | Auto-approved tools |
| `permissions.deny` | Blocked tools |
| `permissions.ask` | Tools requiring confirmation |
| `env` | Injected environment variables |
| `hooks` | Scripts triggered on events |
| `spinnerVerbs` | Words in the loading spinner |
| `spinnerTipsOverride` | Tips displayed during processing |
| `enableAllProjectMcpServers` | Enables all project MCP servers |
| `mcpServers.<name>.alwaysLoad` | Load this MCP server automatically every session (v2.1.121) |
| `blockedMarketplaces.hostPattern` | Block MCP marketplace by host pattern (v2.1.119) |
| `blockedMarketplaces.pathPattern` | Block MCP marketplace by path pattern (v2.1.119) |
| `prUrlTemplate` | Custom PR URL template, e.g. for GitHub Enterprise (v2.1.122) |
| `sandbox.network.deniedDomains` | Domains blocked from sandbox network access (v2.1.116) |

**Bedrock users:** set `ANTHROPIC_BEDROCK_SERVICE_TIER` env var to control service tier when routing through AWS Bedrock (v2.1.122).

## Spinner customization

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["Caffeinating…", "Thinking…", "Optimizing…"]
  },
  "spinnerTipsOverride": {
    "tips": ["/compact when context is full"],
    "excludeDefault": true
  }
}
```

`mode: "add"` extends the default list rather than replacing it. These keys have no functional impact, only cosmetic.

## What should stay in .gitignore

```gitignore
.claude/settings.local.json   # Local machine overrides
.claude/CLAUDE.md             # Personal instructions
.env.local                    # Secrets
```

Files to commit (`settings.json`, `agents/`, `commands/`, `hooks/`, `rules/`) represent the shared team configuration. Never include API keys or tokens in these files.
