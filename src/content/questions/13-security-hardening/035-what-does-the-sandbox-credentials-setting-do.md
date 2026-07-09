---
id: 13-035
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: It encrypts all environment variables before they reach the sandbox
  b: It requires a password prompt before any sandboxed command runs
  c: It restricts sandboxed commands to a single allowed AWS region
  d: It blocks sandboxed commands from reading credential files like .aws/credentials
    and .ssh/, plus secret environment variables
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.187
---

What does the sandbox.credentials setting do when enabled in Claude Code, introduced in v2.1.187?

---

sandbox.credentials, added in v2.1.187, blocks sandboxed commands from reading credential files such as .aws/credentials and .ssh/, along with secret environment variables. This closes a gap where a sandboxed process could otherwise still read and exfiltrate stored secrets even while filesystem and network access were restricted. The other options describe capabilities the setting doesn't have: it doesn't encrypt variables, add an interactive password gate, or restrict AWS regions.
