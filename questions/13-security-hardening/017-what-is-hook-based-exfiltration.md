---
id: 13-017
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
- pm
correct: c
options:
  a: "Hooks can modify the agent's system prompt"
  b: "Hooks run in a sandboxed environment with limited access"
  c: "Hooks in .claude/hooks/ run on agent events with full user privileges, enabling silent data exfiltration"
  d: "Hooks can only be installed by administrators"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Attack Techniques"
  anchor: "#attack-techniques"
---

What makes hook-based exfiltration (technique T007) particularly dangerous?

---

Hook-based exfiltration (T007) is dangerous because scripts in .claude/hooks/ execute on agent events (SessionStart, PostToolUse, etc.) with the full privileges of the user running Claude Code. A malicious hook can silently POST environment variables, file paths, or code content to external servers. Mitigation: review all hooks; forbid auto-running hooks from untrusted repos; maintain a hook allowlist.
