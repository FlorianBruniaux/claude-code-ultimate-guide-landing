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

1. Reads `machine-readable/reference.yaml` from the guide repo (hardcoded local path in dev, cloned via CI)
2. Parses **only the `deep_dive` section** — ignores all other sections (stats, decision tree, etc.)
3. Filters: keeps string values that are file paths (contains `/` or `.md`/`.yaml`) — excludes external URLs (`https://`), numbers, arrays, objects
4. Humanizes keys: `mcp_secrets_management` → "MCP Secrets Management"
5. Derives category from path: `guide/workflows/` → "Guide > Workflows"
6. Resolves URL: local `/guide/slug/` if file is served on the site, else GitHub link
7. Writes `src/data/guide-search-entries.ts` (do not edit manually)

If the guide repo is unavailable, the script outputs a warning and generates an empty array (CI/CD safe).

### Important limitations

**This is an explicit index, not a full-text search.**

| What IS indexed | What is NOT indexed |
|-----------------|---------------------|
| Entries explicitly listed in `deep_dive` of `reference.yaml` | Content/text inside `.md` files |
| 160 key → file path mappings | Headings or sections within files |
| `examples/`, `guide/`, `machine-readable/` paths | The main `ultimate-guide.md` body |

**Keywords are mechanical** — derived from the key name and path segments, not from the actual file content. Example: `security_gate_hook` → keywords `"security gate hook examples hooks bash"`.

**Adding a new guide section does NOT auto-index it.** You must explicitly add an entry to the `deep_dive` section of `reference.yaml` in the guide repo, then run `pnpm build:search`.

### Common pitfall: duplicate YAML keys

If `reference.yaml` has a duplicate key in `deep_dive`, the YAML parser fails silently and generates an **empty index** (0 entries). The build exits with a warning but no error code.

```
[build-guide-index] ERROR: Failed to parse YAML: duplicated mapping key
[build-guide-index] Generating empty guide-search-entries.ts  ← CMD+K search broken
```

**To diagnose**: run `pnpm build:search` and check for `ERROR: Failed to parse YAML` in the output. Fix: rename the duplicate key in `reference.yaml` (e.g. `security_gate_hook` → `security_gate_hook_line` for a line-number reference).

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
