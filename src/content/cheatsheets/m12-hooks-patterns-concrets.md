---
title: "Hooks: Concrete Patterns"
subtitle: "Practical hook examples to automate your workflow"
cardNumber: M12
category: Methodology
difficulty: intermediate
guideVersion: 3.32.1
order: 112
---

## Auto-format after editing

`PostToolUse` hook on `Edit|Write`. Detects the extension of the modified file and applies the appropriate formatter.

```bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path')
EXT="${FILE##*.}"
case "$EXT" in
  ts|tsx) npx prettier --write "$FILE" 2>/dev/null ;;
  py)     black "$FILE" 2>/dev/null ;;
  go)     gofmt -w "$FILE" 2>/dev/null ;;
  rs)     rustfmt "$FILE" 2>/dev/null ;;
esac
exit 0
```

Configure as `async: true` — formatting is cosmetic and should not block Claude.

## macOS notification on completion

`Stop` hook. Triggers a macOS system alert with a contextual sound (success, error, waiting).

```bash
INPUT=$(cat)
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Done"')
osascript -e "display notification \"$MESSAGE\" \
  with title \"Claude Code\""
afplay /System/Library/Sounds/Hero.aiff &
exit 0
```

## Security: block dangerous commands

`PreToolUse` hook on `Bash`. Intercepts destructive patterns before execution.

```bash
COMMAND=$(echo "$TOOL_INPUT" | jq -r '.command')
DANGEROUS=("rm -rf /" "dd if=" "DROP DATABASE"
           "git push --force.*main")
for pattern in "${DANGEROUS[@]}"; do
  if [[ "$COMMAND" == *"$pattern"* ]]; then
    echo "BLOCKED: $pattern" >&2
    exit 2
  fi
done
exit 0
```

Exit code 2 blocks the action and surfaces the stderr message to Claude.

## Git auto-stage after editing

`PostToolUse` hook on `Edit|Write`. Automatically prepares modified files for the next commit.

```bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[[ -z "$FILE" || "$FILE" == "null" ]] && exit 0
git add "$FILE" 2>/dev/null
exit 0
```

## RTK auto-wrapper

`PreToolUse` hook on `Bash`. Detects commands optimizable by RTK and informs Claude of the available alternative.

The logic: if the command starts with `git log`, `cargo test`, `pnpm list` or verbose equivalents, suggest `rtk <command>` via stdout before letting it through.

## Log all executed commands

`PostToolUse` hook on `Bash`. Useful for auditing and debugging long sessions.

```bash
COMMAND=$(cat | jq -r '.tool_input.command // empty')
echo "$(date -u +%FT%T) | $COMMAND" \
  >> ~/.claude/logs/commands.log
exit 0
```

## Dispatcher pattern: a single entry point

Rather than multiplying entries in `settings.json`, a `dispatch.sh` script routes to specialized handlers based on the file or tool. Result: a single `Edit|Write|Bash` matcher in the config, with separately maintainable handlers in `.claude/hooks/handlers/`.

## Installation checklist

```bash
chmod +x .claude/hooks/my-hook.sh   # Required
# Test manually before activating:
echo '{"tool_name":"Edit","tool_input":{"file_path":"test.ts"}}' \
  | .claude/hooks/my-hook.sh
```
