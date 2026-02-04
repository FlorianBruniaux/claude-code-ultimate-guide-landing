---
id: 11-017
category_id: 11
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Memory leaks, slow startup, API rate limits
  b: Big-bang context dumps, 5K+ line prompts, performance degradation
  c: Lost files, broken imports, missing tests
  d: Excessive commits, merge conflicts, branch proliferation
doc_reference:
  file: guide/ultimate-guide.md
  section: Vibe Coding Anti-Patterns
  anchor: '#vibe-coding-anti-patterns'
---

What are the 3 symptoms of vibe coding 'context overload'?

---

Context overload symptoms in vibe coding:

1. **Big-bang context dumps** - Pasting entire codebases into prompts
2. **5K+ line prompts** - Exceeding effective context window usage
3. **Performance degradation** - Claude's quality drops as context grows

The fix: progressive disclosure (feed context incrementally), use CLAUDE.md for persistent context, and start fresh sessions between phases.
