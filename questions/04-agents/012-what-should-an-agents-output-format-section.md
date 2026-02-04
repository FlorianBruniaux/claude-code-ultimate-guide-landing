---
id: 04-012
category_id: 4
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Only code examples
  b: Structured deliverables like reports with sections, severity levels, and recommendations
  c: Raw text output
  d: JSON only
doc_reference:
  file: guide/ultimate-guide.md
  section: 4.5 Agent Examples
  anchor: '#example-1-code-reviewer-agent'
---

What should an agent's output format section include?

---

An agent's output format should specify structured deliverables. For example, a code reviewer agent outputs: Summary, Critical Issues (Must Fix) with file:line references, Warnings (Should Fix), Suggestions (Nice to Have), and Positive Notes. Clear output format ensures consistent, actionable results across all invocations.
