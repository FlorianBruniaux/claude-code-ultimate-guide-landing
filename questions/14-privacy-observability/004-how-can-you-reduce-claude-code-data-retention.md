---
id: 14-004
category_id: 14
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Delete ~/.claude folder
  b: Disable 'Allow model training' at claude.ai/settings/data-privacy-controls
  c: Use incognito mode
  d: Add --no-retention flag
doc_reference:
  file: guide/data-privacy.md
  section: Opt-Out of Training
  anchor: '#41-opt-out-of-training'
---

How can you reduce Claude Code data retention from 5 years to 30 days?

---

Visit claude.ai/settings/data-privacy-controls and toggle OFF "Allow model training". This immediately reduces retention from 5 years to 30 days (safety monitoring only). Enterprise API (ZDR) provides 0-day retention for HIPAA/GDPR compliance.
