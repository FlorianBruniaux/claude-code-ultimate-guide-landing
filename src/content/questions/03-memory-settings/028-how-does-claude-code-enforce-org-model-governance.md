---
id: 03-028
category_id: 3
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: Only through a separate admin-only CLI that regular developers never see
  b: Admins set org or role default models shown in /model, and org-configured restrictions
    are enforced across the model picker, --model, /model, and the ANTHROPIC_MODEL
    env var
  c: Through a ".claude/model-policy.json" file that each repository must commit
  d: Model restrictions apply only to direct API calls, not to the CLI or IDE extensions
doc_reference:
  file: guide/core/claude-code-releases.md
  section: v2.1.196 and v2.1.187
---

How does Claude Code enforce organization-level model governance, per the v2.1.196 and v2.1.187 releases?

---

v2.1.196 added organization default models, set by admins in the org console, shown as "Org default" or "Role default" in /model when a member hasn't picked one. v2.1.187 added enforcement of org-configured model restrictions across every selection surface: the model picker, --model, /model, and the ANTHROPIC_MODEL env var. There is no separate admin-only CLI and no ".claude/model-policy.json" file documented in the guide.
