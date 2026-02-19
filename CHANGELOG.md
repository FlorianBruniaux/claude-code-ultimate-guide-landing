# Changelog

All notable changes to the Claude Code Guide Landing Site.

## [Unreleased]

## [2.5.1] - 2026-02-19

### Changed
- Synced guide version badge: 3.27.6 → 3.27.8
- Updated template counts: 113/116 → 161 across HeroBanner, GuideComparison, index
- Updated `dateModified` to 2026-02-19 in JSON-LD structured data

## [2.5.0] - 2026-02-19

### Added
- **Floating Feedback FAB** (`FeedbackFab.astro`)
  - Fixed bottom-right button accessible on every page
  - Two GitHub issue templates: bug report & feature request
  - Smooth open/close animation, keyboard-accessible

### Changed
- **Quiz — Full Width Layout**
  - Removed inner `max-width: 800px` constraint on `.quiz-container`
  - Quiz now spans the full container width (1200px), matching the header
- **Quiz — Markdown Rendering in Explanations**
  - `formatExplanation()` now parses `**bold**`, `*italic*`, and newlines (`\n → <br>`)
  - Code blocks and inline code protected via placeholder pattern before transformation
  - Fixes raw `**WHAT**` / `**WHERE**` text visible in explanation boxes

### Fixed
- **Cheatsheet PDF** — Regenerated to fix context-bar height bug on page 7
- **`robots.txt`** — Corrected sitemap URL to `sitemap-index.xml`
- **Cheatsheet PDF static serving** — Moved to `public/` for correct Astro static asset serving

### Sync
- **Claude Code releases** — Updated timeline to v2.1.47
- **Guide v3.27.6** — Sonnet 4.6 as default model, 200K vs 1M context comparison
- **Guide v3.27.5** — Content & search index sync

## [2.4.2] - 2026-02-10

### Fixed
- **Quiz accuracy stat misleading display**
  - Renamed "📊 X% get this right" → "📊 Your accuracy: X%"
  - Hidden accuracy stat until user has 3+ attempts on a question
  - Prevents misleading 0% or 100% display on first attempt
  - Clarifies that stats are personal, not community-wide

## [2.4.1] - 2026-01-21

### Changed
- **Enhanced Cowork CTA in Hero Section**
  - Replaced simple text crosslink with styled box component
  - Added visual prerequisites: "macOS only" and "Pro $20/mo" tags
  - Added "Get Started with Cowork →" button linking to getting-started guide
  - Gradient purple/pink design matching Cowork branding
  - Responsive layout: horizontal tags on desktop, vertical on mobile (<480px)

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
