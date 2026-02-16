---
id: 13-005
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: Base64 encoding
  b: RTL override
  c: Zero-width characters (invisible to humans)
  d: Homoglyphs
doc_reference:
  file: guide/security-hardening.md
  section: Evasion Techniques
  anchor: '#evasion-techniques'
---

Which prompt injection evasion technique uses U+200B, U+200C, U+200D?

---

Zero-width characters (U+200B, U+200C, U+200D) make instructions invisible to humans while still being interpreted. Detection: Unicode regex pattern [\x{200B}-\x{200D}\x{FEFF}\x{202A}-\x{202E}]. Added to prompt-injection-detector.sh in v3.6.0.
