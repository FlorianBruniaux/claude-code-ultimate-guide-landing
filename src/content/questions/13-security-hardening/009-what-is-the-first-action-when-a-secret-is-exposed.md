---
id: 13-009
category_id: 13
difficulty: junior
profiles:
- junior
- senior
- power
correct: b
options:
  a: Document the incident for post-mortem
  b: Revoke the credential immediately
  c: Scan the entire repo
  d: Notify the team
doc_reference:
  file: guide/security-hardening.md
  section: Secret Exposed
  anchor: '#31-secret-exposed'
---

What is the first action when a secret is exposed?

---

First 15 minutes (stop the bleeding): (1) Revoke immediately - AWS delete-access-key, GitHub revoke token, Stripe roll key. (2) Confirm exposure scope. Then: audit git history, scan dependencies, check CI/CD logs. First 24 hours: rotate ALL related credentials, notify compliance, document timeline.
