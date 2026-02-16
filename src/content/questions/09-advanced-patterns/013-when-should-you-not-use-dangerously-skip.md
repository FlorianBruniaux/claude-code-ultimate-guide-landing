---
id: 09-013
category_id: 9
difficulty: power
profiles:
- power
correct: b
options:
  a: In CI/CD pipelines
  b: On production systems or sensitive codebases
  c: For automated testing
  d: In Docker containers
doc_reference:
  file: guide/ultimate-guide.md
  section: 9.11 Common Pitfalls & Best Practices
  anchor: '#security-pitfalls'
---

When should you NOT use --dangerously-skip-permissions?

---

Never use `--dangerously-skip-permissions` on production systems or sensitive codebases.

Safe usage:
- CI/CD pipelines with isolated environments
- Automated testing with limited scope
- Development containers

Unsafe usage:
- Production systems
- Codebases with secrets
- Environments with sensitive data

The flag bypasses all permission prompts, creating security risks.
