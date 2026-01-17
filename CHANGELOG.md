# Changelog

All notable changes to the Claude Code Guide Landing Site.

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
  - 47 major guide sections indexed
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
