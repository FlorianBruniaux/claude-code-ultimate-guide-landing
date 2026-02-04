---
id: 13-011
category_id: 13
difficulty: senior
profiles:
- senior
- power
correct: c
options:
  a: E2B (hosted cloud sandboxes)
  b: Fly.io Sprites (edge compute)
  c: Docker Sandboxes (with custom templates and network policies)
  d: Cloudflare Sandbox SDK
doc_reference:
  file: guide/sandbox-isolation.md
  section: Docker Sandboxes
  anchor: '#docker-sandboxes'
---

Which sandbox isolation approach combines microVM isolation with network policies for agent autonomy?

---

Docker Sandboxes provide microVM-level isolation with customizable network policies. Key features: custom Dockerfile templates for reproducible environments, network policies to control egress/ingress, volume mounts for persistent storage, and CPU/memory limits. This approach suits teams wanting full control over sandbox configuration while maintaining strong isolation.
