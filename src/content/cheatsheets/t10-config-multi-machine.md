---
title: "Multi-Machine Config & Backup"
subtitle: "Syncing your Claude Code configuration across multiple machines"
cardNumber: T10
category: Technical
difficulty: intermediate
guideVersion: 3.32.1
order: 10
---

## What stays local vs what is shareable

| Local only | Shareable |
|------------|-----------|
| `settings.local.json` | `agents/`, `commands/` |
| API keys, tokens | `hooks/`, `rules/`, `skills/` |
| Session history | `settings.template.json` |
| `.env` with secrets | CLAUDE.md (team conventions) |

**Golden rule**: never commit API keys or credentials. Use template files with `${VAR_NAME}` placeholders for sensitive values.

## Git + symlinks strategy (recommended)

Approach inspired by Martin Ratinaud (504 tested sessions) and brianlovin/claude-config.

```bash
# 1. Create a private repo for global config
mkdir ~/claude-config-backup && cd ~/claude-config-backup
git init

# 2. Create symlinks (changes are automatic)
ln -s ~/.claude/agents   ./agents
ln -s ~/.claude/commands ./commands
ln -s ~/.claude/hooks    ./hooks
ln -s ~/.claude/skills   ./skills

# 3. Template without secrets
cp ~/.claude/settings.json ./settings.template.json
# Replace values with ${ANTHROPIC_API_KEY} etc.

# 4. Strict .gitignore
echo "settings.json\nmcp.json\nprojects/" > .gitignore

git remote add origin git@github.com:you/claude-config-private.git
git push -u origin main
```

## Syncing between machines

```bash
# Source machine (after modification)
cd ~/claude-config-backup
git add agents/ commands/ hooks/ skills/
git commit -m "Update hooks: add auto-format"
git push

# Target machine
cd ~/claude-config-backup
git pull
# Symlinks propagate automatically to ~/.claude/
```

## `settings.local.json` for machine-specific overrides

Each machine can have its own preferences without touching the shared configuration. This file takes precedence over `settings.json` and is never committed.

```json
{
  "permissions": {
    "allow": ["Bash(brew *)", "Bash(docker *)"]
  },
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:8080"
  }
}
```

## Alternative: cloud sync via symlink

```bash
# Move ~/.claude to Dropbox/iCloud
mv ~/.claude ~/Dropbox/claude-config
ln -s ~/Dropbox/claude-config ~/.claude
# Automatic sync between machines
```

Advantage: zero maintenance effort. Drawback: no version history, risk of sync conflicts if both machines are active simultaneously.

## Automatic backup with cron

```bash
# Daily backup at 2am
0 2 * * * tar -czf ~/claude-backups/config-$(date +%F).tar.gz \
  ~/.claude/agents ~/.claude/commands \
  ~/.claude/hooks ~/.claude/settings.json
```
