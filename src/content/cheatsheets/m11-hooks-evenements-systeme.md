---
title: "Hooks: Events & System"
subtitle: "Automatically react to Claude Code actions"
cardNumber: M11
category: Methodology
difficulty: intermediate
guideVersion: 3.32.1
order: 111
---

## What is a hook

A hook is a shell script (or any command) executed automatically when Claude Code triggers an event. Comparable to git hooks, but for the agent environment. The script receives a JSON via stdin describing the event context.

## Main events

| Event | Moment | Can block |
|-------|--------|-----------|
| `SessionStart` | Startup or resume | No |
| `UserPromptSubmit` | Before prompt processing | Yes |
| `PreToolUse` | Before a tool call | Yes |
| `PostToolUse` | After a tool succeeds | No |
| `Notification` | Claude sends a notification | No |
| `Stop` | Claude finishes responding | Yes |
| `SubagentStop` | A sub-agent ends | Yes |

## Agent Teams events (v2.1.32+)

| Event | Use |
|-------|-----|
| `TeammateIdle` | A team member is about to go idle |
| `TaskCompleted` | A task is about to be marked complete |
| `ConfigChange` | A config file changed during the session |

These events allow implementing quality gates at the agent team level: preventing a task from being marked `completed` if tests fail, for example.

## Configuration in settings.json

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/auto-format.sh",
        "timeout": 10000,
        "async": true
      }]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/security.sh"
      }]
    }]
  }
}
```

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | Success, continue normally |
| `2` | Block the action (stderr message visible to Claude) |
| Other non-0 | Error surfaced to Claude |

For `PreToolUse` hooks, exit 2 prevents the tool from executing. Claude reads the stderr message and can adapt its behavior.

## Synchronous vs Asynchronous

Synchronous hooks (default): Claude waits for the script to finish. Suited for validation and type checking. Asynchronous hooks (`async: true`): Claude continues immediately. Suited for formatting, notifications, and logging, where feedback is not needed for the next step.

## stdin data flow

```bash
# Example JSON received on stdin (PostToolUse, v2.1.119+)
{
  "tool_name": "Edit",
  "tool_input": { "file_path": "src/auth.ts" },
  "tool_response": { "success": true },
  "hook_event_name": "PostToolUse",
  "duration_ms": 142
}
```

`duration_ms` (v2.1.119): the time the tool call took in milliseconds, available in the PostToolUse input. Useful for performance monitoring hooks.

The `Stop` event also includes a `last_assistant_message` field since v2.1.47, giving direct access to Claude's last response without parsing transcripts.

## PostToolUse output replacement (v2.1.121)

PostToolUse hooks can now **replace the tool's output** for any tool, not just Bash. Return a JSON object with `"output"` key from your hook stdout to override what Claude sees as the tool result.

```bash
# Hook stdout replaces the tool response Claude receives
echo '{"output": "sanitized content — secrets redacted"}'
exit 0
```

This enables output filtering, normalization, or secret redaction before Claude processes any tool result.

## MCP tool hooks (v2.1.118)

Hooks can now invoke MCP tools directly using `type: "mcp_tool"` instead of `type: "command"`. This allows hook chains that call external MCP servers without a shell wrapper.

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit",
      "hooks": [{
        "type": "mcp_tool",
        "server": "github",
        "tool": "create_review_comment",
        "input": { "body": "Auto-review triggered" }
      }]
    }]
  }
}
```
