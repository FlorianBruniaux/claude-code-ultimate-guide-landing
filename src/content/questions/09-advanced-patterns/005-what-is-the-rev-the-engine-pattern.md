---
id: 09-005
category_id: 9
difficulty: power
profiles:
- power
correct: c
options:
  a: Running tests in parallel
  b: Multiple rounds of write-critique-improve cycles
  c: Multiple rounds of planning and deep thinking before executing
  d: Using higher compute models
doc_reference:
  file: guide/ultimate-guide.md
  section: 2.3 Rev the Engine
  line: 2337-2375
---

What is the 'Rev the Engine' pattern?

---

The "Rev the Engine" pattern runs multiple rounds of **planning and deep thinking** before executing, like warming up an engine before driving.

**Standard workflow**: think → plan → execute
**Rev the Engine**: think → plan → think harder → refine plan → think hardest → finalize → execute

**When to use**:
- Critical architectural decisions (irreversible, high-impact)
- Complex migrations affecting 10+ files
- Unfamiliar domains where first instincts are often wrong

**Why it works**: Each round forces Claude to reconsider assumptions. Round 2 typically catches 30-40% of issues that round 1 missed.

**Note**: The guide also describes a variant pattern using write-critique-improve cycles (line 9761), but the primary definition focuses on planning iterations.
