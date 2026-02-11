---
id: 13-014
category_id: 13
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: "An attack that corrupts the agent's RAM causing crashes"
  b: "Injection of persistent malicious instructions into agent memory files (CLAUDE.md, SOUL.md, MEMORY.md)"
  c: "A denial-of-service attack that fills the agent's context window"
  d: "An attack that erases the agent's conversation history"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Attack Techniques"
  anchor: "#attack-techniques"
---

What is "Memory Poisoning" in the context of AI agent security (technique T002)?

---

Memory Poisoning (T002) injects persistent backdoor instructions into configuration files like SOUL.md, MEMORY.md, CLAUDE.md, or AGENTS.md. These instructions survive across sessions, creating cognitive worms that replicate across agent memory files. Identified in the ToxicSkills campaign. Mitigation: treat memory files as config; require code review for changes; monitor diffs.
