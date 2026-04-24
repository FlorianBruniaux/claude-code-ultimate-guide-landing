---
id: 13-038
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: d
options:
  a: It completely disables network access for all sandboxed commands regardless of other settings
  b: It restricts all network access to a specific IP CIDR range
  c: It logs all network requests to a local audit file for compliance review
  d: It blocks specific domains even when a parent wildcard allows them — enabling *.example.com while blocking evil.example.com
doc_reference:
  file: guide/security/sandbox-native.md
  section: Network Controls
  anchor: '#network-controls'
---

What does `sandbox.network.deniedDomains` allow that a wildcard allow rule cannot?

---

`sandbox.network.deniedDomains` provides **exception carve-outs within wildcard rules**. Example: you allow `*.internal.com` for broad internal service access, but want to block `logging.internal.com` (privacy) or `billing.internal.com` (security). Without `deniedDomains`, a wildcard allow has no sub-domain exceptions. With it:

```json
{
  "sandbox": {
    "network": {
      "allowedDomains": ["*.internal.com"],
      "deniedDomains": ["logging.internal.com", "billing.internal.com"]
    }
  }
}
```

Deny rules are evaluated **after** allow rules — a domain in `deniedDomains` is blocked even if it matches an `allowedDomains` pattern.
