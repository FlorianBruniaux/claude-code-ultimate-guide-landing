---
id: 13-028
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: "echo, printf, and tee commands for logging"
  b: "git, npm, and docker commands for CI/CD integration"
  c: "curl/wget + base64 + /dev/tcp + eval — network calls, encoding, reverse shell, and dynamic execution"
  d: "date, hostname, and whoami for audit logging"
doc_reference:
  file: "guide/security-hardening.md"
  section: "Suspicious Patterns"
  anchor: "#suspicious-patterns"
---

Which combination of patterns in a .claude/hooks/ script indicates a likely malicious hook?

---

Malicious hooks typically combine: curl/wget (data exfiltration), base64 (payload obfuscation used by ClawHavoc via glot.io), /dev/tcp or /dev/udp (bash reverse shells — no legitimate hook use case), and eval/exec (dynamic code execution). Additional red flags: access to .env/credentials/ssh keys, references to paste sites (glot.io, pastebin.com), and nc/ncat/netcat (netcat reverse shells — remove immediately).
