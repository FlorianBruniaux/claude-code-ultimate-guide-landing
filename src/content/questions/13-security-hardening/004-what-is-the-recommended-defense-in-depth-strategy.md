---
id: 13-004
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: Only use permissions.deny
  b: Store secrets outside project + external vault + PreToolUse hooks + never commit
  c: Encrypt all files in the project
  d: Use a VPN when running Claude Code
doc_reference:
  file: guide/security-hardening.md
  section: Defense-in-Depth Strategy
  anchor: '#defense-in-depth-strategy'
---

What is the recommended defense-in-depth strategy for secrets protection?

---

Defense-in-depth: (1) Store secrets outside project directories (~/.secrets/ or vault), (2) Use external secrets management (AWS Secrets Manager, 1Password), (3) Add PreToolUse hooks as secondary blocking, (4) Never commit secrets, (5) Manually review bash commands.
