---
id: 13-007
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: Only PostToolUse hooks for logging
  b: PreToolUse (dangerous blocker, injection detector) + PostToolUse (output scanner)
    + SessionStart (MCP integrity)
  c: No hooks - rely only on permissions.deny
  d: Only UserPromptSubmit hooks
doc_reference:
  file: guide/security-hardening.md
  section: Hook Stack Setup
  anchor: '#23-hook-stack-setup'
---

What is the recommended hook stack for security in settings.json?

---

Recommended security hook stack: PreToolUse → dangerous-actions-blocker.sh (Bash), prompt-injection-detector.sh + unicode-injection-scanner.sh (Edit/Write). PostToolUse → output-secrets-scanner.sh (Bash). SessionStart → mcp-config-integrity.sh. Multiple layers for defense-in-depth.
