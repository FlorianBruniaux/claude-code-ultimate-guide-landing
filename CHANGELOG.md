# Changelog

All notable changes to the Claude Code Guide Landing Site.

## [2.4.0] - 2026-01-20

### Added
- **DevOps/SRE Integration**
  - New DevOps/SRE learning path card in "Choose Your Path" section
  - 5 new guide-data.js entries for DevOps content search (FIRE Framework, K8s Troubleshooting, Incident Response, IaC, Security Guardrails)
  - DevOps persona now searchable via Cmd+K with keywords: devops, sre, kubernetes, terraform, incident, fire

### Changed
- **Stats Synchronization from Main Guide**
  - Template count corrected: 63/66 → **61** (aligned with actual count in main repo)
  - Guide lines updated: 11,100+ → **17,600+** (reflects guide growth including devops-sre.md)
  - Agents category: 5 → 6 templates (added DevOps/SRE agent)
  - Scripts category: 7 → 8 templates
  - Search index total: 175 → 184 items (61 templates + 14 FAQ + 6 rules + 78 guide + 25 workflows)

### Fixed
- **Consistency Issues in examples/index.html**
  - Removed stale template counts (49, obsolete value)
  - Unified all template references to 61 across meta tags, schema.org, and body content
  - Schema.org `numberOfItems` now accurate

## [2.3.0] - 2026-01-20

### Added
- **Cowork Workflows Integration**
  - 25 professional workflows now searchable via Cmd+K
  - New `cowork-data.js` index file with bilingual workflow entries
  - Categories: Administrative (6), Commercial (5), Production (5), Communication (5), Organization (4)
  - Target professions: Contractors, Merchants, Small business owners, Freelancers
- **Workflow Search Index**
  - 21 new English workflow translations (.en.md files)
  - `workflows/README.en.md` comprehensive English documentation
  - All workflows include: invoice generation, project planning, social media, customer reviews, knowledge transfer
- **Enhanced Global Search**
  - Cowork workflows integrated into existing Cmd+K search
  - Search now covers: Templates (52) + FAQ (14) + Rules (6) + Guide (78) + Workflows (25) = 175+ entries

### Changed
- Updated `workflows/README.md` with bilingual links (French ↔ English)
- Enhanced `search.js` to include `SEARCH_COWORK` data source
- Improved search coverage for small business automation use cases

## [2.2.0] - 2026-01-20

### Changed
- **Navigation redesign**
  - Reordered navigation links (Cheat Sheet, Quiz, Examples, Learning, FAQ)
  - Added prominent "Read Guide" CTA button in navigation
  - Improved visual separation with `.nav-actions` section
  - Updated search keyboard shortcut display from "⌘K" to "Cmd+K"
- **Color palette update**
  - Primary button colors changed from green to indigo theme
  - Updated accent-secondary from #238636 to #4f46e5
  - Adjusted button drop-shadows to match new color scheme

## [2.1.0] - 2025-01-19

### Added
- **Guide Search Index enrichment** (`guide-data.js`)
  - 22 new entries from reference.yaml analysis
  - Now 78 total searchable guide sections (was 56)
  - New categories: Images & Design, Context Advanced, Workflows, Debug & Troubleshooting

## [2.0.0] - 2025-01-17

### Added
- **Global Search** (Cmd+K / Ctrl+K)
  - MiniSearch fuzzy search engine (lazy-loaded from CDN)
  - Searches templates, FAQ, Golden Rules, and guide sections
  - Keyboard navigation (arrows, Enter, Escape)
  - WCAG 2.1 AA accessible modal
- **Learning Page** (`/learning/`)
  - Personalized onboarding flow
  - Profile-based content recommendations
- **Guide Search Index** (`guide-data.js`)
  - 56 major guide sections indexed
  - Sync script for verification (`scripts/sync-guide-data.sh`)
- **Mobile Hamburger Menu**
  - Responsive navigation for screens < 768px
  - Full-screen overlay with solid background

### Changed
- Quiz questions updated to 217 (from 159)
- Template count synced to 52
- Mobile breakpoint moved from 480px to 768px

### Fixed
- Mobile menu background not displaying (height calculation issue)
- Horizontal scroll on mobile devices

## [1.1.0] - 2025-01-16

### Added
- Interactive Quiz page (`/quiz/`)
- Examples/Templates browser (`/examples/`)
- Cheat Sheet page (`/cheatsheet/`)

### Changed
- UI typography and accessibility improvements
- CTA button styling

## [1.0.0] - 2025-01-16

### Added
- Initial landing page
- Hero section with stats badges
- Features overview
- Golden Rules section
- FAQ with structured data
- GitHub Pages deployment workflow
