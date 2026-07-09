---
id: 03-029
category_id: 3
difficulty: intermediate
profiles:
- senior
- pm
correct: a
options:
  a: A shared settings.json committed to the team repo, a shared CLAUDE.md for behavior
    rules, and Anthropic Team/Enterprise admin console controls
  b: A single environment variable exported on every developer's machine at login
  c: A nightly script that overwrites each developer's local settings.json from a
    central server
  d: A browser extension that intercepts and rewrites Claude Code API requests
doc_reference:
  file: guide/security/enterprise-governance.md
  section: 2.3 Propagating Settings to the Team
  anchor: '#23-propagating-settings-to-the-team'
---

According to the guide's enterprise governance section, which three mechanisms do most organizations combine to make sure developers actually run with org-approved configuration?

---

Section 2.3 names three mechanisms: a shared settings.json committed at the repo root, picked up automatically by anyone who clones the repo with drift visible in git history; a shared CLAUDE.md for behavior rules and data classification; and the Anthropic Team/Enterprise admin console for org-wide usage policies and API key management. The guide is explicit that repo-level settings.json gives the most granular control and works on all plans, while the admin console is an additional layer for Enterprise customers, not a replacement. None of the other options appear in the guide.
