---
id: 13-010
category_id: 13
difficulty: junior
profiles:
- junior
- senior
- power
- pm
correct: b
options:
  a: Low, Medium, High
  b: Basic (5 min), Standard (30 min), Hardened (2 hours)
  c: Development, Staging, Production
  d: Free, Pro, Enterprise
doc_reference:
  file: guide/security-hardening.md
  section: Security Posture Levels
  anchor: '#security-posture-levels'
---

What are the three security posture levels in the guide?

---

Security posture levels: Basic (5 min) = output scanner + dangerous blocker - for solo dev/experiments. Standard (30 min) = + injection hooks + MCP vetting - for teams/sensitive code. Hardened (2 hours) = + integrity verification + ZDR - for enterprise/production.
