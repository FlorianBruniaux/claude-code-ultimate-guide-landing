---
id: 03-026
category_id: 3
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: '"manual" replaces "default" outright, and the old value now throws a validation
    error'
  b: '"manual" is accepted as an alias for "default" in permissions.defaultMode, selecting
    the same conservative approval-per-action mode'
  c: '"manual" is a brand-new mode that behaves differently from the old "default"
    mode'
  d: permissions.defaultMode was removed entirely in favor of a new top-level permissionMode
    key
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.200
---

As of Claude Code v2.1.200, what changed for the permissions.defaultMode setting in settings.json?

---

v2.1.200 made "defaultMode": "manual" an accepted alias alongside the existing "default" value, matching the CLI's renamed "Manual" permission mode. Both values select the same behavior, the old value still works, nothing throws an error, and no key was removed or replaced.
