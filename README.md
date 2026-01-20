# Claude Code Guide - Landing Site

Landing site for the [Claude Code Ultimate Guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide).

## Live Site

**URL**: [florianbruniaux.github.io/claude-code-ultimate-guide-landing](https://florianbruniaux.github.io/claude-code-ultimate-guide-landing)

## Features

- **Global Search** (Cmd+K / Ctrl+K) - Fuzzy search across templates, FAQ, rules, and guide sections
- **Interactive Quiz** - 227 questions across 14 categories with progress tracking
- **Template Browser** - 63 production-ready templates with copy functionality
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
├── guide-data.js        # Guide sections index
├── examples-data.js     # Templates data
└── scripts/
    └── sync-guide-data.sh  # Sync verification script
```

## Data Synchronization

This site is **secondary** to the main guide. Stats must be synced manually.

### Current Values (from main guide)

| Metric | Value | Source |
|--------|-------|--------|
| Version | 3.9.6 | VERSION file |
| Templates | 63 | examples/ directory |
| Quiz Questions | 227 | quiz/questions/*.yaml |
| Guide Lines | 11,100+ | guide/ultimate-guide.md |

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
- **Index**: ~130 items (63 templates + 12 FAQ + 6 rules + 47 guide sections)
- **Features**: Fuzzy matching, prefix search, category filtering

## License

CC BY-SA 4.0 - Same as the main guide.
