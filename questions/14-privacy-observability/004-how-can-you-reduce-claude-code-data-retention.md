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

**Note — prompt cache TTL is a separate concern:** `ENABLE_PROMPT_CACHING_1H` extends prompt cache TTL from 5 minutes to 1 hour for cost savings on long sessions. This is not data retention — prompt cache is temporary API-level storage unrelated to Anthropic's long-term data retention policy. Don't confuse the two when assessing data exposure.
