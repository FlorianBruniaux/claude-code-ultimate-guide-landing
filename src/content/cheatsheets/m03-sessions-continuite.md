---
title: "Sessions & Continuity"
subtitle: "Resuming a session right where you left off"
cardNumber: M03
category: Methodology
difficulty: intermediate
guideVersion: 3.32.1
order: 103
---

## Resuming a Session

```bash
# Continue the most recent session
claude --continue        # or: claude -c

# Choose a specific session (interactive picker)
claude --resume          # or: claude -r — now 67% faster (v2.1.116)

# Resume by ID
claude --resume abc123def

# Resume from a PR — supports GitHub, GitLab, Bitbucket, GitHub Enterprise (v2.1.119)
claude --from-pr 123
```

Sessions are stored in `~/.claude/projects/<encoded-path>/` as JSONL files.

**PR URL auto-populated (v2.1.122):** when working inside a git repo, Claude Code automatically reads the `prUrlTemplate` from `settings.json` (or falls back to the remote URL) to pre-fill the PR link. No manual copy-paste needed for GitHub Enterprise or custom forges.

## Searching Sessions

The `session-search.sh` script (provided in `examples/scripts/`) is the fastest method: zero dependencies, 15ms to list, 400ms to search.

```bash
cs                        # 10 recent sessions
cs "authentication"       # Full-text search
cs "Prisma migration"     # AND multi-word
cs --since 7d             # Last 7 days
cs -p my-project "auth"   # Filter by project
```

Each result displays the `claude --resume <id>` command ready to copy-paste.

## Critical Limitation: Directory Scope

Claude Code stores sessions by encoding the **absolute path** of the project. A session in `/home/user/myapp` will not be found if you move the project to `/home/user/projects/myapp`.

**Solution if you move a project:**

```bash
cd ~/.claude/projects/
mv -- -old-location-myapp- -new-location-myapp-
```

Manual migration of the session folder works in the vast majority of cases.

## What Resuming Does NOT Do

Resuming a session does not restore:
- Implicit decisions made during the session
- Context of files that changed in the meantime
- Modified environment variables or configs

For important decisions (architecture choices, conventions), note them explicitly in CLAUDE.md rather than relying on session memory. It is more reliable and benefits future sessions.

## Sessions and Sub-Agents

Sub-agent sessions (delegated tasks) are stored in a `subagents/` subfolder. They do not appear in the normal `--resume` list. If you migrate sessions manually, copy this subfolder too.

## Complementary Tools

| Tool | Usage | Install |
|------|-------|---------|
| `session-search.sh` | Fast bash search | Copy from `examples/scripts/` |
| `cc-sessions.py` | Incremental index, advanced filters | Python, same folder |
| `claude-code-viewer` | Read-only web browser | `npx @kimuson/claude-code-viewer` |

## In-session continuity: `/recap`

`/recap` (v2.1.108) generates a concise summary of everything done in the current session. Use it before closing to capture decisions worth noting in CLAUDE.md, or to draft a commit message.

## Recommended Pattern

Do not rely on `--resume` as the primary continuity mechanism for long projects. Prefer a well-maintained CLAUDE.md with key decisions, regular commits, and short targeted sessions. Session resumption is a safety net, not a replacement workflow.
