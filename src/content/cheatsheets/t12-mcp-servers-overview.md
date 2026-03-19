---
title: "MCP Servers Overview"
subtitle: "The extension protocol and essential servers"
cardNumber: T12
category: Technical
difficulty: intermediate
guideVersion: 3.32.1
order: 12
---

## What is MCP?

MCP (Model Context Protocol) is the open standard that allows Claude Code to connect to external tools via a JSON-RPC 2.0 protocol. Each MCP server exposes additional tools, named according to the `mcp__<server>__<tool>` convention. Claude uses them exactly like its native tools, with the same permissions system.

**Basic architecture**: Claude Code (client) communicates with the MCP server via stdio or HTTP. The server starts on first use and remains active for the entire session.

## Most widely used servers

| Server | Primary use |
|--------|-------------|
| **Context7** | Official library documentation |
| **Sequential Thinking** | Structured multi-step reasoning |
| **Grepai** | Semantic search + call graph |
| **Serena** | Symbol navigation, refactoring |
| **Playwright** | Browser automation, E2E tests |
| **GitHub** | Issues, PRs, repositories |

## Configuration in settings.json

MCP servers are declared in `~/.claude/settings.json` (global) or `.claude/settings.json` (project).

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["@github/mcp-server"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Transport: local (stdio) vs remote (HTTP)

**stdio (local)**: the server runs as a child process on the machine. No network exposure, ideal for local tools like grepai (Ollama) or Serena.

**HTTP/SSE (remote)**: the server is accessible via a URL. Used for hosted services like Figma MCP (`https://mcp.figma.com/mcp`) or shared team servers.

```json
{
  "mcpServers": {
    "figma": {
      "transport": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

## MCP Apps (SEP-1865)

Stable extension since January 2026, co-developed by Anthropic and OpenAI. It allows MCP servers to return interactive interfaces (HTML/JS) in addition to classic text responses, rendered in a sandboxed iframe on the client side.

**Use cases**: data dashboards, complex forms, real-time visualizations directly within the conversation.

## Important limitations

An MCP server does not access the conversation history — it only sees the parameters passed at call time. Each call is independent unless the server itself implements a cache. It also cannot modify Claude's system prompt or bypass the permissions system.

**Token cost**: each loaded server adds approximately 2K tokens of overhead per session (tool definitions). Load only what is necessary for the current project.
