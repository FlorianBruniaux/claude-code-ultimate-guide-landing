# Claude Code Guide - Landing Site

Landing site for the [Claude Code Ultimate Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide).

## Live Site

**URL**: [cc.bruniaux.com](https://cc.bruniaux.com)

## Features

- **Global Search** (Cmd+K / Ctrl+K) - Fuzzy search across templates, FAQ, rules, guide sections, and Cowork workflows
- **Cowork Workflows** - 25 professional automation workflows for small businesses (bilingual FR/EN)
- **Interactive Quiz** - 227 questions across 14 categories with progress tracking
- **Template Browser** - 61 production-ready templates with copy functionality
- **AI Ecosystem Workflows** - 4 workflow variants (Standard, Design-first, Data-driven, Documentation)
- **Cheat Sheet** - Quick reference PDF download
- **Learning Path** - Personalized onboarding flow
- **Mobile Responsive** - Hamburger menu for tablet/mobile (< 768px)

## Structure

```
claude-code-ultimate-guide-landing/
├── index.html           # Main landing page
├── quiz/index.html      # Interactive quiz
├── examples/index.html  # Template browser
├── cheatsheet/index.html # Quick reference
├── learning/index.html  # Learning path
├── styles.css           # Shared styles
├── search.js            # Search engine (MiniSearch)
├── search-data.js       # FAQ + Golden Rules data
├── guide-data.js        # Guide sections index (78 entries)
├── cowork-data.js       # Cowork workflows index (25 entries)
├── examples-data.js     # Templates data
└── scripts/
    └── sync-guide-data.sh  # Sync verification script
```

## Data Synchronization

This site is **secondary** to the main guide. Stats must be synced manually.

### Current Values (from main guide)

| Metric | Value | Source |
|--------|-------|--------|
| Version | 3.9.7 | VERSION file |
| Templates | 61 | examples/ directory |
| Quiz Questions | 227 | quiz/questions/*.yaml |
| Guide Lines | 17,600+ | guide/*.md (all guide files) |

### Sync Verification

```bash
./scripts/sync-guide-data.sh
```

### Files to Update on Sync

1. **index.html** - Version, template count, quiz count in meta tags and badges
2. **examples-data.js** - Template definitions
3. **guide-data.js** - Guide section index
4. **search-data.js** - FAQ and Golden Rules

## Development

```bash
# Python
python -m http.server 8080

# Node
npx serve
```

## Search Architecture

- **Library**: MiniSearch (CDN, lazy-loaded on first Cmd+K)
- **Index**: ~184 items (61 templates + 14 FAQ + 6 rules + 78 guide sections + 25 workflows)
- **Sources**: `examples-data.js`, `search-data.js`, `guide-data.js`, `cowork-data.js`
- **Features**: Fuzzy matching, prefix search, category filtering

## Related Repositories

- [Claude Code Ultimate Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide) - Source of truth
- [Claude Cowork Guide](https://github.com/FlorianBruniaux/claude-cowork-guide) - For knowledge workers
- [Claude Cowork Landing](https://github.com/FlorianBruniaux/claude-cowork-guide-landing) - Cowork guide landing

## License

CC BY-SA 4.0 - Same as the main guide.
