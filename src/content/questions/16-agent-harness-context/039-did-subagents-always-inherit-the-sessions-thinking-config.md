---
id: 16-039
category_id: 16
difficulty: senior
profiles:
- power
- senior
correct: c
options:
  a: They always ran with extended thinking fully disabled; now they can enable it
    manually per subagent via frontmatter
  b: They already inherited the session's configuration; v2.1.198 only changed the
    default thinking budget in tokens
  c: They used a fixed default regardless of the session's settings; now they inherit
    the session's own extended-thinking configuration
  d: They used to inherit the session's configuration, but v2.1.198 switched them
    to a fixed default to save cost
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.198
---

Before v2.1.198, how did subagents and context-compaction operations handle extended thinking, and what changed?

---

The v2.1.198 release note says subagents and context compaction now inherit the session's extended-thinking configuration, improving output quality on delegated tasks, implying they previously used a fixed default rather than following whatever the parent session had configured. Option d reverses the direction of the change, and option b claims nothing changed, which contradicts the improvement noted in the release.
