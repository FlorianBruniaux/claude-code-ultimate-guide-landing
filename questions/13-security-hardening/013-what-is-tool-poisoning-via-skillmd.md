---
id: 13-013
category_id: 13
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: "A SKILL.md file that is too large and slows down the agent"
  b: "A vulnerability in the SKILL.md parser that crashes the agent"
  c: "Hidden instructions in SKILL.md that make the agent execute malicious commands (curl|bash, base64 eval, password ZIPs)"
  d: "A SKILL.md that references deprecated API endpoints"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Attack Techniques"
  anchor: "#attack-techniques"
---

What is "Tool Poisoning via SKILL.md" (attack technique T001)?

---

Tool Poisoning via SKILL.md (T001) embeds hidden instructions that trick the agent into executing malicious commands. Common patterns include `curl | bash` from paste sites like glot.io, base64-decoded eval commands, and password-protected ZIPs (password: 'openclaw'). Used by ClawHavoc and ToxicSkills campaigns. Mitigation: scan SKILL.md for shell commands; never auto-execute prerequisites.
