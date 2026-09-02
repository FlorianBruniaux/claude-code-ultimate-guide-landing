// This file is generated from the FlorianBruniaux profile manifest.
// Source: https://github.com/FlorianBruniaux/FlorianBruniaux/blob/main/ecosystem/projects.json
// Run scripts/ecosystem.mjs from the profile repository to update it.

export const PERSONAL_PROJECT_ROUTES = [
  {
    "id": "build-run",
    "title": "Build & Run",
    "description": "Build, connect, and operate agentic workflows."
  },
  {
    "id": "observe-improve",
    "title": "Observe & Improve",
    "description": "Understand sessions and improve real usage."
  },
  {
    "id": "secure-validate",
    "title": "Secure & Validate",
    "description": "Reduce risk and verify code or configuration quality."
  },
  {
    "id": "learn-adopt",
    "title": "Learn & Adopt",
    "description": "Choose a learning route for developers or knowledge workers."
  },
  {
    "id": "research-discover-grow",
    "title": "Research, Discover & Grow",
    "description": "Turn source material into knowledge, visibility, or discovery."
  }
] as const

export const PERSONAL_PROJECTS = [
  {
    "id": "cc-copilot-bridge",
    "icon": "🌉",
    "title": "CC-Copilot Bridge",
    "description": "Route Claude Code between Anthropic, GitHub Copilot, and local Ollama models.",
    "useWhen": "You need to change the model provider behind a Claude Code workflow.",
    "format": "CLI router",
    "tags": [
      "Provider Routing",
      "Local AI",
      "Context Engineering"
    ],
    "href": "https://ccbridge.bruniaux.com/",
    "github": "https://github.com/FlorianBruniaux/cc-copilot-bridge",
    "website": "https://ccbridge.bruniaux.com/",
    "route": "build-run",
    "featured": true
  },
  {
    "id": "claude-code-plugins",
    "icon": "📦",
    "title": "claude-code-plugins",
    "description": "Install focused Claude Code plugins built from reusable guide templates.",
    "useWhen": "You want packaged skills, hooks, agents, and workflows instead of copying files manually.",
    "format": "Plugin collection",
    "tags": [
      "Agent Extensions",
      "Workflow Automation",
      "Harness"
    ],
    "href": "https://github.com/FlorianBruniaux/claude-code-plugins",
    "github": "https://github.com/FlorianBruniaux/claude-code-plugins",
    "website": null,
    "route": "build-run",
    "featured": false
  },
  {
    "id": "ctxharness",
    "icon": "🧭",
    "title": "ctxharness",
    "description": "Detect drift between code, instructions, and assembled agent context.",
    "useWhen": "You need evidence that CLAUDE.md, AGENTS.md, and related context still match the repository.",
    "format": "CLI",
    "tags": [
      "Context Engineering",
      "Harness",
      "Validation"
    ],
    "href": "https://github.com/FlorianBruniaux/ctxharness",
    "github": "https://github.com/FlorianBruniaux/ctxharness",
    "website": null,
    "route": "build-run",
    "featured": false
  },
  {
    "id": "flow-lean",
    "icon": "✂️",
    "title": "flow-lean",
    "description": "Apply one lean-output rule to Claude Code responses.",
    "useWhen": "You want shorter action-first responses without stacking several overlapping skills.",
    "format": "Claude Code skill",
    "tags": [
      "Context Engineering",
      "Prompting",
      "Token Efficiency"
    ],
    "href": "https://github.com/FlorianBruniaux/flow-lean",
    "github": "https://github.com/FlorianBruniaux/flow-lean",
    "website": null,
    "route": "build-run",
    "featured": false
  },
  {
    "id": "rtk",
    "icon": "⚡",
    "title": "RTK",
    "description": "Compress development-command output before it enters an agent's context.",
    "useWhen": "Verbose Git, test, build, or infrastructure output consumes too much context.",
    "format": "CLI proxy",
    "tags": [
      "Context Engineering",
      "Token Efficiency",
      "Output Control"
    ],
    "href": "https://www.rtk-ai.app/",
    "github": "https://github.com/rtk-ai/rtk",
    "website": "https://www.rtk-ai.app/",
    "route": "build-run",
    "featured": true
  },
  {
    "id": "ccboard",
    "icon": "📊",
    "title": "CCBoard",
    "description": "Monitor Claude Code sessions through a local TUI and web dashboard.",
    "useWhen": "You need a complete visual overview of sessions, activity, and analytics.",
    "format": "TUI + Web",
    "tags": [
      "Observability",
      "Session Analytics",
      "Monitoring"
    ],
    "href": "https://ccboard.bruniaux.com/",
    "github": "https://github.com/FlorianBruniaux/ccboard",
    "website": "https://ccboard.bruniaux.com/",
    "route": "observe-improve",
    "featured": true
  },
  {
    "id": "cc-sessions",
    "icon": "📋",
    "title": "CC-Sessions",
    "description": "Index and search local Claude Code session history.",
    "useWhen": "You need a fast zero-dependency CLI for finding prior decisions or commands.",
    "format": "CLI",
    "tags": [
      "Session Search",
      "Local-first",
      "Knowledge Retrieval"
    ],
    "href": "https://github.com/FlorianBruniaux/cc-sessions",
    "github": "https://github.com/FlorianBruniaux/cc-sessions",
    "website": null,
    "route": "observe-improve",
    "featured": false
  },
  {
    "id": "cc-skill-usage",
    "icon": "📈",
    "title": "cc-skill-usage",
    "description": "Measure actual Claude Code skill invocations from local transcripts.",
    "useWhen": "You need to distinguish real Skill tool calls from prose mentions.",
    "format": "CLI",
    "tags": [
      "Skill Analytics",
      "Local-first",
      "Observability"
    ],
    "href": "https://github.com/FlorianBruniaux/cc-skill-usage",
    "github": "https://github.com/FlorianBruniaux/cc-skill-usage",
    "website": null,
    "route": "observe-improve",
    "featured": true
  },
  {
    "id": "agentsec-triage",
    "icon": "🛡️",
    "title": "agentsec-triage",
    "description": "Triage documented attacks against developers, dependencies, and coding-agent configuration.",
    "useWhen": "You need a deterministic read-only scanner for a documented campaign or compromise signal.",
    "format": "Security CLI",
    "tags": [
      "Security",
      "Supply Chain",
      "Validation"
    ],
    "href": "https://cc.bruniaux.com/security/",
    "github": "https://github.com/FlorianBruniaux/agentsec-triage",
    "website": "https://cc.bruniaux.com/security/",
    "route": "secure-validate",
    "featured": false
  },
  {
    "id": "dep-scope",
    "icon": "🔎",
    "title": "dep-scope",
    "description": "Analyze symbol-level dependency usage in JavaScript and TypeScript projects.",
    "useWhen": "You need to find unused package surface, duplicates, or native alternatives.",
    "format": "CLI + MCP",
    "tags": [
      "Dependency Analysis",
      "Code Quality",
      "Validation"
    ],
    "href": "https://www.npmjs.com/package/@florianbruniaux/dep-scope",
    "github": "https://github.com/FlorianBruniaux/node-dep-scope",
    "website": "https://www.npmjs.com/package/@florianbruniaux/dep-scope",
    "route": "secure-validate",
    "featured": false
  },
  {
    "id": "claude-code-guide",
    "icon": "📚",
    "title": "Claude Code Ultimate Guide",
    "description": "Learn Claude Code, build reliable agents, and scale their use safely.",
    "useWhen": "You need a maintained reference for architecture, workflows, security, and adoption.",
    "format": "Documentation",
    "tags": [
      "AI Adoption",
      "Context Engineering",
      "Security"
    ],
    "href": "https://cc.bruniaux.com/",
    "github": "https://github.com/FlorianBruniaux/claude-code-ultimate-guide",
    "website": "https://cc.bruniaux.com/",
    "route": "learn-adopt",
    "featured": false
  },
  {
    "id": "claude-cowork-guide",
    "icon": "💼",
    "title": "Claude Cowork Guide",
    "description": "Apply Claude to workflows for knowledge workers and non-technical users.",
    "useWhen": "Your work centers on documents, research, analysis, or cross-app tasks rather than software delivery.",
    "format": "Documentation",
    "tags": [
      "AI Adoption",
      "Knowledge Work",
      "Workflows"
    ],
    "href": "https://cowork.bruniaux.com/",
    "github": "https://github.com/FlorianBruniaux/claude-cowork-guide",
    "website": "https://cowork.bruniaux.com/",
    "route": "learn-adopt",
    "featured": false
  },
  {
    "id": "yt-insights",
    "icon": "🎬",
    "title": "yt-insights",
    "description": "Turn YouTube channels into a local searchable research corpus.",
    "useWhen": "You need transcripts, structured insights, local search, and repeatable reports from video sources.",
    "format": "CLI",
    "tags": [
      "Research",
      "Local Corpus",
      "Knowledge Extraction"
    ],
    "href": "https://pypi.org/project/yt-insights/",
    "github": "https://github.com/FlorianBruniaux/youtube-video-insights",
    "website": "https://pypi.org/project/yt-insights/",
    "route": "research-discover-grow",
    "featured": false
  },
  {
    "id": "google-search-console-mcp",
    "icon": "📈",
    "title": "Google Search Console MCP",
    "description": "Query Search Console, GA4, and technical search-visibility signals through MCP.",
    "useWhen": "You need an agent-accessible interface for SEO analysis, indexing, and site diagnostics.",
    "format": "MCP server",
    "tags": [
      "SEO",
      "Analytics",
      "Growth"
    ],
    "href": "https://pypi.org/project/gsc-mcp/",
    "github": "https://github.com/FlorianBruniaux/google-search-console-mcp",
    "website": "https://pypi.org/project/gsc-mcp/",
    "route": "research-discover-grow",
    "featured": false
  },
  {
    "id": "starmapper",
    "icon": "🗺️",
    "title": "StarMapper",
    "description": "Map the geography of a GitHub repository's stargazers.",
    "useWhen": "You want an interactive view of repository audience and geographic reach.",
    "format": "Web app",
    "tags": [
      "GitHub Discovery",
      "Audience",
      "Visualization"
    ],
    "href": "https://starmapper.bruniaux.com/",
    "github": "https://github.com/FlorianBruniaux/starmapper",
    "website": "https://starmapper.bruniaux.com/",
    "route": "research-discover-grow",
    "featured": false
  },
  {
    "id": "github-roast-tpc",
    "icon": "🔥",
    "title": "github-roast-tpc",
    "description": "Audit a GitHub profile through the intent of its author.",
    "useWhen": "You want README, recruiter-signal, AI-marker, and profile-visibility feedback from a Claude Code plugin.",
    "format": "Claude Code plugin",
    "tags": [
      "Profile Audit",
      "GitHub",
      "SEO"
    ],
    "href": "https://github.com/FlorianBruniaux/github-roast-tpc",
    "github": "https://github.com/FlorianBruniaux/github-roast-tpc",
    "website": null,
    "route": "research-discover-grow",
    "featured": false
  }
] as const
