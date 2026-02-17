# Claude Code Guide — Landing Site

Landing site for the [Claude Code Ultimate Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide). Built with Astro 5.

## Live Site

**URL**: [cc.bruniaux.com](https://cc.bruniaux.com)

## Stack

- **Framework**: Astro 5 (static output, GitHub Pages)
- **Styling**: Tailwind CSS + custom CSS (dark/light theme)
- **Search**: Custom fuzzy engine, no runtime dependencies
- **CI/CD**: GitHub Actions → GitHub Pages

## Features

- **Global Search** (`Cmd+K` / `Ctrl+K`) — 229+ entries across pages, examples, cheatsheet sections, and guide
- **Interactive Quiz** — 274 questions across 15 categories
- **Template Browser** — 88 production-ready templates
- **Cheat Sheet** — Full Claude Code reference
- **Security Dashboard** — CVEs, attack campaigns, threat intel
- **Releases Timeline** — Claude Code changelog
- **Learning Path** — Onboarding by profile (junior → power user)
- **Tool Comparison** — Claude Code vs Cursor vs Copilot vs Windsurf

## Project Structure

```
├── scripts/
│   └── build-guide-index.mjs   # Generates search index from reference.yaml
├── src/
│   ├── components/
│   │   ├── global/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── SearchModal.astro   # Cmd+K modal
│   │   └── landing/                # Page sections
│   ├── data/
│   │   ├── examples-data.ts        # 88 template definitions
│   │   ├── releases.ts             # Claude Code changelog
│   │   ├── security-data.ts        # CVEs & threats
│   │   ├── guide-search-entries.ts # AUTO-GENERATED (run pnpm build:search)
│   │   └── search-index.ts         # Full search index (landing + guide)
│   ├── scripts/
│   │   └── search.ts               # Client-side fuzzy search engine
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── cheatsheet/
│       ├── examples/
│       ├── quiz/
│       ├── security/
│       ├── faq/
│       ├── learning/
│       ├── compare/
│       └── releases/
├── .claude/
│   └── commands/
│       └── sync-search.md    # /sync-search slash command
└── CLAUDE.md                 # Project instructions for Claude Code
```

## Development

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Build

```bash
pnpm build        # builds search index + Astro static site
pnpm build:search # rebuild search index only (after guide updates)
pnpm preview      # preview static build
```

## Search Index — Update Workflow

The search index is split into two parts:

| Source | File | How to update |
|--------|------|---------------|
| **Landing** (pages, examples, cheatsheet, releases…) | `src/data/search-index.ts` | Edit directly |
| **Guide** (reference.yaml entries) | `src/data/guide-search-entries.ts` | Run `pnpm build:search` |

### When to rebuild the guide index

- After pulling the latest guide repo (`claude-code-ultimate-guide`)
- When `machine-readable/reference.yaml` changes (new entries added)
- When guide file paths change (the script re-derives URLs)

### How to rebuild

```bash
# Option 1: just the search index
pnpm build:search

# Option 2: full build (runs build:search first automatically)
pnpm build

# Option 3: via slash command in Claude Code
/sync-search
```

### What the build script does

1. Reads `/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide/machine-readable/reference.yaml`
2. Parses the `deep_dive` section (key → file path mappings)
3. Filters: keeps string values with paths (excludes external URLs, numbers, arrays)
4. Humanizes keys: `mcp_secrets_management` → "MCP Secrets Management"
5. Derives category from path: `guide/workflows/` → "Guide > Workflows"
6. Builds GitHub URL: `https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/{path}`
7. Writes `src/data/guide-search-entries.ts` (do not edit manually)

If the guide repo is unavailable, the script outputs a warning and generates an empty array (CI/CD safe).

### Adding landing entries manually

Edit `src/data/search-index.ts`. Each entry follows this shape:

```typescript
{
  id: 'unique-id',
  title: 'Human-readable title',
  keywords: 'lowercase space-separated keywords for fuzzy matching',
  category: 'Section Name',
  url: '/page/#anchor',
  source: 'landing',  // or 'guide'
}
```

## Data Synchronization

This site is **secondary**. The source of truth is the guide:
`/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide/`

| Metric | Value | Source |
|--------|-------|--------|
| Version | `3.15.0` | VERSION file |
| Templates | `88` | examples/ directory |
| Quiz Questions | `274` | questions.json |
| Guide Lines | `15,200+` | ultimate-guide.md |

## Related Repositories

- [Claude Code Ultimate Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide) — Source of truth
- [Claude Cowork Guide](https://github.com/FlorianBruniaux/claude-cowork-guide) — For knowledge workers

## License

CC BY-SA 4.0 — Same as the main guide.
