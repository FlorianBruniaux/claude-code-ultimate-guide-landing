---
id: 10-014
category_id: 10
difficulty: power
profiles:
- power
correct: b
options:
  a: Ignore all .claude/ contents
  b: Ignore settings.local.json and CLAUDE.local.md, keep agents/commands/hooks
  c: Don't ignore anything
  d: Ignore only agents/
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.11 Common Pitfalls & Best Practices
  anchor: '#recommended-gitignore'
official_doc: https://code.claude.com/docs/en/memory
---

What is the recommended .gitignore pattern for Claude Code files?

---

Recommended .gitignore:

```gitignore
# Claude Code - Personal (ignore)
.claude/settings.local.json
CLAUDE.local.md
.claude/.serena/

# Claude Code - Team (keep/commit)
# .claude/CLAUDE.md (project memory)
# .claude/agents/
# .claude/commands/
# .claude/hooks/
# .claude/settings.json
```

This keeps team workflows shared while personal settings stay private.
