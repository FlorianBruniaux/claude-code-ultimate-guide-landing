---
id: 13-023
category_id: 13
difficulty: power
profiles:
- power
correct: c
options:
  a: "A memory leak in Claude Code's language model integration"
  b: "An authentication bypass in Claude Code's API key handling"
  c: "8 command execution bypasses via blocklist flaws (man --html, sed e modifier, git arg ambiguity, bash variable expansion)"
  d: "A denial-of-service via excessive file watching"
doc_reference:
  file: "guide/security-hardening.md"
  section: "CVE Database"
  anchor: "#cve-database"
---

What does CVE-2025-66032 expose in Claude Code?

---

CVE-2025-66032 (discovered by Flatt Security) reveals 8 different ways to bypass Claude Code's command blocklist and execute arbitrary commands. Techniques include: man --html (opens browser with arbitrary URL), sed e modifier (executes commands), git argument ambiguity, and bash variable expansion. Fixed in Claude Code >= 1.0.93. This demonstrates why defense-in-depth matters beyond simple blocklists.
