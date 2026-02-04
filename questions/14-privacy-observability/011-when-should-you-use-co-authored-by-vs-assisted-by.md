---
id: 14-011
category_id: 14
difficulty: intermediate
profiles:
- junior
- senior
- power
correct: b
options:
  a: Always use Co-Authored-By for any AI involvement
  b: Co-Authored-By when AI generated significant code, Assisted-By when AI only advised
    or reviewed
  c: Never attribute AI in commits
  d: Use both on every commit
doc_reference:
  file: guide/ultimate-guide.md
  section: AI Traceability
  anchor: '#ai-traceability'
---

When should you use 'Co-Authored-By' vs 'Assisted-By' in git commits?

---

AI traceability in git commits follows different standards based on **ownership and accountability**:

| Aspect | Co-Authored-By | Assisted-by |
|--------|---------------|-------------|
| **Implication** | AI as co-author | Human author, AI assisted |
| **Credit** | Shared authorship | Human primary author |
| **Responsibility** | Ambiguous | Human accountable |

**When to use:**
- **Co-Authored-By**: Claude's default. When AI generated significant code (implementation, refactoring). Shared authorship model.
- **Assisted-by**: LLVM standard (Jan 2026). When you're the primary author and AI helped. Clear human ownership and accountability.

This distinction matters for OSS contributions, compliance contexts, and understanding code authorship/accountability.
