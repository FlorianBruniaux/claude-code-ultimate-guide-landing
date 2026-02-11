---
id: 13-027
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: a
options:
  a: ".claude/hooks/ — scripts run with full user privileges on every agent event"
  b: ".claude/agents/ — agent definitions can override system prompts"
  c: ".claude/commands/ — custom commands can execute arbitrary code"
  d: ".claude/settings.json — contains all API keys and tokens"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Suspicious Patterns"
  anchor: "#suspicious-patterns"
---

Which directory in the .claude/ folder is considered most security-sensitive?

---

The .claude/hooks/ directory is the most security-sensitive because hook scripts execute automatically on agent events (SessionStart, PostToolUse, etc.) with the full privileges of the user running Claude Code. Unlike agents or commands which require explicit invocation, hooks fire automatically. Red flag patterns in hooks include: curl/wget (network calls), base64 (payload obfuscation), /dev/tcp (reverse shells), and eval/exec (dynamic code execution).
