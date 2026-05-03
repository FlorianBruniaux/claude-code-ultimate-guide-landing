---
title: "Native Sandbox — Architecture"
subtitle: "How Claude Code isolates its operations at the OS level"
cardNumber: T16
category: Technical
difficulty: advanced
guideVersion: 3.32.1
order: 16
---

## Principle: the OS as security perimeter

Since v2.1.0, Claude Code includes a native sandbox that isolates bash command execution at the kernel level. The core idea is to invert the usual logic: rather than validating each command with a user confirmation, Claude operates freely inside OS-enforced boundaries. The sandbox becomes the guardian, not the permissions system.

**Activation**: `/sandbox` in Claude Code (interactive menu).

## OS primitives by platform

**macOS: Seatbelt**. Built into the system, no installation required. Uses the TrustedBSD Mandatory Access Control framework to filter system calls at the kernel level. Minimal overhead (~1-2% CPU).

**Linux / WSL2: bubblewrap**. Requires installing two packages.

```bash
sudo apt-get install bubblewrap socat   # Ubuntu/Debian
sudo dnf install bubblewrap socat       # Fedora
```

Creates an isolated namespace (mount, network, PID, IPC) for each executed command. Comparable overhead (~2-3% CPU, less than 10ms startup per command).

**WSL1**: not supported. **Native Windows**: planned, not yet available.

## Filesystem isolation

The default policy is asymmetric and intentional: read access across the entire system, write access restricted to the current working directory (CWD) and its subdirectories.

| Access | Scope |
|--------|-------|
| Read | Entire computer (except deny rules) |
| Write | CWD and subdirectories only |
| Execute | Commands within the sandboxed environment |

To restrict reading of sensitive directories (SSH, cloud credentials), use `permissions.deny` in `settings.json`:

```json
{
  "permissions": {
    "deny": ["Read(~/.ssh/**)", "Read(~/.aws/**)", "Edit(~/.ssh/**)", "Edit(~/.aws/**)" ]
  }
}
```

## Network isolation

All network connections from sandboxed commands go through a SOCKS5 proxy running outside the sandbox. The proxy applies domain-based filtering without inspecting traffic content (no deep packet inspection).

Configuration: `deny` mode (block everything except allowlist) or `allow` mode (allow everything except blocklist).

```json
{
  "sandbox": {
    "network": {
      "policy": "deny",
      "allowedDomains": ["api.anthropic.com", "*.npmjs.org", "github.com"],
      "deniedDomains": ["evil.com", "*.untrusted.io"]
    }
  }
}
```

`deniedDomains` (v2.1.116) is useful in `allow` mode to block specific domains without locking down all traffic. Both `allowedDomains` and `deniedDomains` can be combined.

## Native binary spawning per platform (v2.1.114)

The sandbox now launches real OS-native processes rather than wrapping commands in container runtimes. On macOS, this means actual Seatbelt-sandboxed processes; on Linux, real bubblewrap namespaces. The overhead is at the OS primitive level only, not container startup. This matters for short-lived commands (lint, format) where cold-start cost previously dominated.

## Two operating modes

**Auto-allow**: bash commands inside the sandbox are automatically approved. Commands incompatible with the sandbox (e.g., `docker`) trigger a fallback to the normal permissions flow. Recommended for day-to-day development.

**Regular permissions**: even inside the sandbox, each command requires explicit approval. Useful for high-security environments or untrusted codebases.

## The escape hatch: `dangerouslyDisableSandbox`

Some tools are incompatible with sandboxing because they require access to specific system resources (`docker` via `/var/run/docker.sock`, `watchman` via filesystem watch APIs). Claude detects the failure, relaunches the command with this parameter, and asks the user for confirmation.

To completely disable the escape hatch in critical environments:

```json
{
  "sandbox": { "allowUnsandboxedCommands": false }
}
```
