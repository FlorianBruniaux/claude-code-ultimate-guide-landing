---
id: 07-007
category_id: 7
difficulty: senior
profiles:
- senior
- power
correct: b
options:
  a: git status, npm test
  b: rm -rf /, sudo rm, git push --force origin main
  c: cd, ls, pwd
  d: npm install, pip install
doc_reference:
  file: guide/ultimate-guide.md
  section: 7.4 Security Hooks
  anchor: '#recommended-security-rules'
---

Which commands should a security hook typically block?

---

Security hooks should block dangerous operations like:

- `rm -rf /` or `rm -rf ~` - Filesystem destruction
- `sudo rm` - Privileged deletion
- `git push --force origin main` - Force push to protected branches
- `npm publish` - Accidental package publishing
- `> /dev/sda` or `dd if=` - Direct disk operations

Safe commands like `git status`, `npm test`, `ls` should be allowed.
