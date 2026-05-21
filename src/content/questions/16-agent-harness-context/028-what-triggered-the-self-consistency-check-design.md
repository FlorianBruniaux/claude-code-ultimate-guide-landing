---
id: 16-028
category_id: 16
difficulty: power
profiles:
- senior
- power
correct: c
options:
  a: CI build failures caused by outdated rule references
  b: A model update that silently changed tool call behavior
  c: Documentation claiming 100% skills versioning when the actual state was 17%
  d: A security audit revealing stale credentials in config files
doc_reference:
  file: guide/core/context-engineering.md
  section: 13. Constitutional and Self-consistency Audits
  anchor: '#self-consistency-check'
---

What real incident motivated the self-consistency check pattern in ACE-v2?

---

On a production ACE installation, the file `ace-improvement-loop.md` claimed "skills versioning 100% complete as of 2026-03-04". The measured state six weeks later was 20 out of 114 skills versioned, which is 17%. The gap persisted because nobody audited the claims the system made about itself. The self-consistency check runs weekly and verifies documentation claims against measured state, flagging divergences above 10% in the next Curator report.
