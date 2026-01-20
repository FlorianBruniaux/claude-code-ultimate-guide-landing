# Changelog

All notable changes to the Claude Code Guide Landing Site.

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
