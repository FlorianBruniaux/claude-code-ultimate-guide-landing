---
id: 05-013
category_id: 5
difficulty: junior
profiles:
- junior
- senior
- power
correct: c
options:
  a: md5(password)
  b: sha1(password)
  c: argon2 or bcrypt
  d: Base64 encoding
doc_reference:
  file: guide/ultimate-guide.md
  section: 5.4 Skill Examples
  anchor: '#authentication-patterns'
---

In the Security Guardian skill, what is an example of GOOD password hashing?

---

The Security Guardian skill shows argon2 or bcrypt as secure password hashing. BAD examples explicitly listed: md5(password) and sha1(password) - these are cryptographically broken for password storage. Good pattern: `const hashedPassword = await hash(password)` using argon2 library. Always verify password with `await verify(hashedPassword, inputPassword)`.
