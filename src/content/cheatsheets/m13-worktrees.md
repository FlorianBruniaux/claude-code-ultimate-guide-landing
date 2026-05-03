---
title: "Worktrees"
subtitle: "Work in parallel on multiple branches without switching directories"
cardNumber: M13
category: Methodology
difficulty: advanced
guideVersion: 3.32.1
order: 113
---

## Principle

A git worktree creates a second (or third) working directory from the same repository, each checked out on a distinct branch. No `git stash`, no branch switching — two terminals, two contexts, zero friction between them.

Available since Git 2.5.0 (2015), natively compatible with Claude Code.

## Essential commands

```bash
# Create a worktree on an existing or new branch
git worktree add ../myproject-feature feature/auth
git worktree add ../myproject-hotfix -b hotfix/login-bug

# List all active worktrees
git worktree list

# Clean up after merge
git worktree remove ../myproject-hotfix
git worktree prune   # Remove stale references
```

## Parallel Claude Code pattern

```bash
# Terminal 1: main feature
cd ../myproject-feature
claude
> "Implement JWT authentication"

# Terminal 2: urgent hotfix (simultaneous)
cd ../myproject-hotfix
claude
> "Fix the timeout bug on Safari"
```

Each Claude instance indexes its own worktree and maintains an independent context. Both sessions run in parallel without interference.

## Claude Code context in worktrees

| File | Scope |
|------|-------|
| `~/.claude/CLAUDE.md` | Global, shared by all worktrees |
| `CLAUDE.md` (repo root) | Project, committed, shared |
| `.claude/CLAUDE.md` (inside the worktree) | Local to the worktree only |

A worktree can have its own `.claude/` configuration for branch-specific conventions.

## Dependency management

The main limitation: `node_modules` or `vendor/` are not shared automatically. Each worktree needs its own dependencies, which can take disk space and time.

**Recommended solution** — symlink `node_modules` from the main worktree:

```bash
cd ../myproject-feature
ln -s ../myproject/node_modules node_modules
```

The `/git-worktree` custom command does this automatically. Use `--isolated` when dependencies must differ.

## When to use worktrees

Suited for: multiple features in parallel, comparing approaches, code review during development, long CI builds while continuing to code.

Not suited for: simple and quick branch switches, teams unfamiliar with the tool (adds operational complexity), limited disk space.

## Shell aliases for quick navigation

```bash
# In ~/.zshrc
alias wa="cd ../myproject-feature-a"
alias wb="cd ../myproject-feature-b"
alias wm="cd ../myproject"   # Main worktree
```

Pattern used by the Claude Code team internally to navigate instantly between active worktrees.

## EnterWorktree hook: `path` parameter

The `EnterWorktree` hook fires when Claude Code switches into a worktree. Since approximately v2.1.118, the hook receives a `path` field on stdin identifying the target worktree directory. Use this to run worktree-specific setup (install dependencies, load a branch-scoped CLAUDE.md).

```bash
# .claude/hooks/enter-worktree.sh
INPUT=$(cat)
WORKTREE_PATH=$(echo "$INPUT" | jq -r '.path')
echo "Entering worktree: $WORKTREE_PATH"
# e.g. ln -sf ../main/node_modules "$WORKTREE_PATH/node_modules"
exit 0
```

## Cleanup after merge

After merging the branch, remove the worktree to free up space. `git worktree prune` cleans references to worktrees that were manually deleted (folder removed without going through `git worktree remove`).
