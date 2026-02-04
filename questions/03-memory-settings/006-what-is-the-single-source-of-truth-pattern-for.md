---
id: 03-006
category_id: 3
difficulty: power
profiles:
- power
correct: b
options:
  a: Use only one AI tool per project
  b: Store conventions in docs/conventions/ and reference them from all AI tool configs
  c: Copy the same rules to each AI tool's config
  d: Let each AI tool define its own rules
doc_reference:
  file: guide/ultimate-guide.md
  section: 3.1 Memory Files (CLAUDE.md)
  anchor: '#single-source-of-truth-pattern'
---

What is the 'Single Source of Truth Pattern' for multi-tool AI setups?

---

The Single Source of Truth Pattern stores conventions in `/docs/conventions/` (coding-standards.md, architecture.md, testing.md, etc.) and references them from CLAUDE.md, CodeRabbit, and other tools. This prevents conflicts where one tool approves code that another flags. All tools enforce the same standards from one source.
