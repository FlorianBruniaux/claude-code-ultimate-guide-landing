---
id: 05-024
category_id: 5
difficulty: senior
profiles:
- senior
- power
correct: a
options:
  a: Static analysis of a skill file or repository, checked against 64 patterns across
    16 categories, before it's installed
  b: Runtime monitoring of a skill's network calls while it executes
  c: A live vulnerability scan of your entire Claude Code configuration and installed
    MCP servers
  d: An automated fixer that patches vulnerable skills in place
doc_reference:
  file: guide/ecosystem/third-party-tools.md
  section: SkillSpector
---

What does NVIDIA's open-source SkillSpector tool check before you install a Claude Code skill?

---

SkillSpector performs static analysis, regex and AST inspection, on a skill file or repository, checking it against 64 known malicious or risky patterns across 16 categories such as prompt injection, data exfiltration, and MCP tool poisoning, before the skill touches your machine. It does not monitor runtime network calls, does not scan your live configuration, and does not auto-patch anything, it only scores and reports.
