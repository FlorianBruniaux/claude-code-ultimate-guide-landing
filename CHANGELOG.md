# Changelog

All notable changes to the Claude Code Guide Landing Site.

## [Unreleased]

### Agent Harness Map

- **Evidence and optimizer research published** (`src/data/guide-search-entries.ts`, `src/data/guide-content-entries.ts`, `src/data/rss-entries.ts`): rebuilt the guide reader and both search indexes from guide commit `46f347f`. The public pages now expose the model-harness pair, scaffold-effect evidence, repeated-run evaluation, security and observability controls, and the separate research layer for ADAS, AFlow, ACE, GEPA, Meta-Harness, Agentic Harness Engineering, and HarnessOpt-Bench. The RSS description now names the optimizer and meta-harness layer.

- **Evidence-backed landscape synchronized from the guide** (`src/content/docs/`, `src/data/guide-content-entries.ts`, `src/data/rss-entries.ts`, `src/components/global/AnnouncementBanner.astro`, `src/content/cheatsheets/`, `src/data/recap-cards-data.ts`): rebuilt the guide reader around a pinned 160-project source directory plus 31 guide supplements, a strict 42-runtime map, 14 adjacent control planes, verified project links including Devin, dated GitHub stars, three explanatory visuals, and the new C14 recap card. The RSS entry and dismissible banner now describe the published scope instead of the former 33-runtime snapshot. C14 now has bilingual one-page A4 downloads and correct publication metadata; the refreshed C12, M16, and T22 cards also use the locally published bilingual PDFs.

- **Final Agent Harness Map visuals and search entries published** (`src/data/guide-search-entries.ts`): rebuilt the guide reader with the three selected Gemini infographics, corrected the selection visual to the canonical pilot size of 8 to 12 real tickets, and regenerated the search entries against the expanded landscape headings.

### Documentation

- **"6 months of daily practice/use" updated to "over a year"** (`src/pages/faq/index.astro` x3, `src/pages/compare/index.astro`, `src/pages/compare/[slug].astro`): the wording dated back to the guide's first release and had not been revisited since. Same fix applied in the guide repo's `README.md`.
- **AgentSec CoSnitch intelligence synchronized** (`src/data/agentsec-security-feed.v1.json`): updated the public security view with the 2026-08-24 AgentSec feed, two reviewed sources, and one `CVE-2026-24301` event. CoSnitch affects a hosted Microsoft Copilot endpoint and remains `not_applicable` to repository scanning; detector and runtime database counts stay unchanged.
- **GitHub star counts resynced from the guide's live API refresh (2026-07-27)** (`src/data/ecosystem-data.ts`, `src/data/glossary-data.ts`, `src/pages/memory-systems/index.astro`, `src/pages/ecosystem/mcp-vs-cli.astro`, `src/pages/context-engineering/index.astro`, `src/components/landing/MemorySystems.astro`, `src/components/landing/TokenOptimization.astro`): every hardcoded star count on the landing (RTK, ccusage, claude-mem, agentmemory, ruflo, and others) was updated to match the guide repo's live `gh api` refresh, following the mandatory guide-first sync order. Added a visible "star counts verified" note on the memory-systems page and its `MemorySystems.astro` card.

### Added

- **Monitor and safe event delegation synchronized from the guide** (`src/data/guide-search-entries.ts`, `src/data/guide-content-entries.ts`, `src/data/rss-entries.ts`, `src/components/global/AnnouncementBanner.astro`, `src/pages/sitemap/index.astro`): indexed the new Monitor/WebSocket workflow in Cmd+K and full-content search, added its guide-reader route to the sitemap and RSS feed, and surfaced it in the dismissible announcement banner. The landing summary preserves the guide's security boundary: inbound events are data, Codex starts read-only, and write access requires an explicit gate plus an isolated worktree.
- **Supply-chain triage example indexed** (`src/data/examples-data.ts`): synchronized the landing catalogue with the guide's published `supply-chain-triage.py` example and replaced the raw Python docstring delimiter with a concise public description.
- **AgentSec security feed integration** (`src/data/agentsec-security-feed.v1.json`, `src/data/agentsec-security-feed.ts`, `src/pages/security/index.astro`): the security page now reads AgentSec and threat-database versions, dates, six headline metrics, detector coverage, and reviewed incident fiches from one versioned public artifact. Added the **Verify Your Repository with AgentSec** block, source links, fail-closed feed parsing, and CI checks that reject drift from the guide mirror.
- **Quiz "View in documentation" links resolve to cc.bruniaux.com** (`src/utils/resolve-doc-link.ts`, `src/pages/api/questions.json.ts`, `src/pages/quiz/index.astro`): The quiz "View in documentation" button now points at the published guide on `cc.bruniaux.com/guide/` when the referenced file has a page there with a matching heading anchor, instead of always sending users to the raw GitHub source. The `/api/questions.json` endpoint computes a `doc_url` per question at build time via a shared resolver that mirrors `prepare-guide-content.mjs` (chapter-split lookup for `ultimate-guide.md`, flattened `core/security/ecosystem/roles/ops` subdirs, `workflows/`), recomputing the site anchor with the rehype-slug slugger rather than reusing the stored GitHub-style anchor. Anything not published (or with an anchor that matches no real heading) still falls back to the GitHub blob URL.
- **Step by Token in /learning page** (`src/pages/learning/index.astro`): New "Go Deeper: Understand the Model" section with a card linking to stepbytoken.com. 21-chapter free interactive guide by Dimitri Mérault covering LLM mechanics (tokenization, attention, agents/MCP, prompt engineering, KV cache). Positioned between "Ready-to-Use Templates" and Methodologies.

### Fixed

- **Every relative image link in a guide subdirectory file (`guide/ecosystem/`, `guide/core/`, etc.) 404'd on the rendered site** (`scripts/prepare-guide-content.mjs`, `plugins/remark-guide-links.mjs`): user-reported browser console errors and a broken-image icon on the newly-illustrated `local-vs-cloud-inference` page. Root cause: source markdown references images as `../images/x.webp` (correct relative path on GitHub, one directory up from `guide/ecosystem/` to `guide/images/`), but the rendered page's `src` attribute came out as literal `/guide/../images/x.webp`, which the browser normalizes to `/images/x.webp`, a URL that does not exist (the real path is `/guide/images/x.webp`). This affected every image referenced from a guide subdirectory, not just the 3 new ones: `guide/core/architecture.md`'s pre-existing `mcp-architecture-diagram.svg` had been silently broken in production the same way, unnoticed until now. Two fixes attempted before finding the real cause: first patched `resolveGuideLink()` in `remark-guide-links.mjs` to strip leading `../` segments before an `images/` path, but that plugin's own header comment already documented why it wouldn't help (Astro 5's Content Layer API doesn't reliably invoke custom remark plugins on cached content collection files), confirmed by a full rebuild still showing the unfixed `/guide/../images/` output. The actual fix lives at the layer that already handles `.md` cross-links reliably: a new `rewriteRelativeImageLinks()` raw-string replace in `prepare-guide-content.mjs`, called alongside the existing `rewriteRelativeGuideLinks()` at both write sites, rewriting any `![alt](../images/x)`-shaped path (any depth of `../`) to the absolute `/guide/images/x` the file is actually served at. Verified in the built HTML: all 4 previously-broken image `src` attributes (the 3 new local-vs-cloud-inference images plus the pre-existing architecture.md one) now resolve correctly. The `remark-guide-links.mjs` change was kept (harmless, more correct in principle) even though it isn't the operative fix for this content path.
- **`/execute` removed from the site: it is not a Claude Code command** (`src/pages/cheatsheet/index.astro`, `src/content/cheatsheets/m05-plan-mode.md`, `src/data/diagrams-data.ts`, `src/content/questions/06-commands/006-*.md`, `src/content/questions/10-reference/028-*.md`): the command appears nowhere in the official reference at `code.claude.com/docs/en/commands` nor anywhere in the 5,248-line upstream CHANGELOG, yet the site taught it as the way to leave Plan Mode in five places. The quiz contradicted itself: `02-009` correctly stated "there is no /execute slash command in Claude Code" while `06-006` told readers to use it. Plan Mode is exited by approving the plan Claude presents or with `Shift+Tab`. Question `10-028` also described a nonexistent "Execute Mode"; its explanation now walks the real `Shift+Tab` mode cycle.
- **7 quiz questions pointed `official_doc` at a URL that now serves a different page** (`src/content/questions/01-quick-start/003-*.md`, `src/content/questions/06-commands/00{1,2,3,4,5,6}-*.md`): `code.claude.com/docs/en/slash-commands` returns the "Extend Claude with skills" page today, not the commands reference. The three questions about built-in commands now point at `/docs/en/commands`, the four about custom commands at `/docs/en/skills`.
- **`/less-permission-prompts` renamed `/fewer-permission-prompts`** (`src/data/glossary-data.ts`, `src/content/cheatsheets/m09-slash-commands.md`, `src/content/cheatsheets/t03-permission-modes.md`): the old name is what shipped in v2.1.111 and stays correct in `releases.ts` and `rss-entries.ts`, which are historical records. Everywhere the site presents the command as currently usable it now uses the official name. The glossary definition also said "reduce the frequency of permission prompts while maintaining security boundaries", which describes auto mode rather than a skill that writes an allowlist.
- **Cheat card `t03-permission-modes` was two mode-model revisions behind** (`src/content/cheatsheets/t03-permission-modes.md`): its table listed "Auto-accept all" on `Shift+Tab x2` (that cycles to Plan mode), had no `plan`, `auto` or `dontAsk` rows, and presented `/less-permission-prompts` as the way to enter an "Auto (Max users)" mode, conflating a skill that writes an allowlist with a classifier-driven permission mode. The recap-card source in the guide repo had already been corrected in the July 3 pass; this copy had never been regenerated. Now carries the six canonical mode names with their real activation paths.
- **Cheat cards `t01-commandes-essentielles` and `m09-slash-commands` corrected against the official reference** (`src/content/cheatsheets/`): T01 listed a `/sessions` command that does not exist, gave `#file` as "add file to context" when the `#` quick-memory shortcut was removed upstream (the file-reference syntax is `@file`), told readers to add `{"vim": true}` to settings when the key is `editorMode: "vim"`, and mapped `Ctrl+J` / `Cmd+J` to "open Claude Code". M09 described `/undo` as "revert last action" (it is an alias of `/rewind`), `/tui` as "toggle terminal UI mode" (it picks the renderer), `/focus` as "set focus area for current session" (it is a fullscreen-only view toggle), `/proactive` as "toggle proactive suggestions" (alias of `/loop`), and dated `/ultrareview` to v2.1.120 (v2.1.114; v2.1.120 added the CI subcommand). M09 gained `/code-review` and `/doctor` rows plus a link to the official reference.
- **Landing build was failing on invalid JavaScript in `examples-data.ts`** (`src/data/examples-data.ts`, guide repo `scripts/generate-examples-data.py`): the generator emitted category keys unquoted, so the eight keys containing a hyphen (`hooks-bash`, `hooks-powershell`, `claude-md`, `team-config`, `github-actions`, `mcp-configs`, `context-engineering`, `semantic-anchors`) were not valid bare identifiers and esbuild aborted the build with `Expected "}" but found "-"`. The generator now quotes any key that is not a valid identifier, and the file was regenerated. `pnpm build` passes again: 428 pages.
- **Quiz `doc_reference` anchors** (`src/content/questions/**/*.md`, 97 files): Fixed 15 `anchorAlgoMismatch` entries (GitHub-style anchors that keep consecutive hyphens, e.g. `tier-2-specification--architecture`, now collapsed to the site's rehype-slug format `tier-2-specification-architecture`) and 82 of 90 `staleAnchor` entries (anchors pointing at headings renamed, renumbered, or moved since the question was written, verified against the actual heading text in each guide source file). 6 questions were redirected to a different guide file where the exact content they reference now actually lives (`guide/core/memory-systems.md`, `guide/ecosystem/ai-ecosystem.md` ×3, `guide/ops/ai-traceability.md`, `guide/workflows/skeleton-projects.md`). 3 questions (`12-006`, `12-008`, `12-011`) had `doc_reference.file` normalized from `guide/architecture.md` to the real current path `guide/core/architecture.md`. 8 entries (`03-018`, `13-016`, `13-018`, `13-020`, `13-021`, `13-026`, `13-029`, `13-030`) remain flagged: their referenced content (the verification-loops 8-domain checklist, DNS rebinding, the ClawHavoc campaign, the zaycv author, safedep vet, Bitsight stats, the SAFE-MCP framework) was fully removed from `security-hardening.md` in a later rewrite, with no surviving equivalent heading anywhere in the guide.

## [2.9.1] - 2026-03-25

### Fixed

- **Mermaid diagrams in guide pages** (`scripts/prepare-guide-content.mjs`): Mermaid code blocks in guide content pages (`/guide/ai-ecosystem/`, `/guide/sandbox-native/`, `/guide/sandbox-isolation/`, `/guide/workflows/event-driven-agents/`, `/guide/ultimate-guide/09-advanced-patterns/`) were rendering as syntax-highlighted code instead of diagrams. Blocks are now pre-rendered to SVG at build time using `mmdc` (same approach as the `/diagrams/` page). Two SVGs per block (neutral + dark themes) toggle via `[data-theme]` CSS attribute.
- **Shared mermaid helper** (`scripts/lib/render-mermaid.mjs`): Extracted `renderSVG` function from `build-diagrams-data.mjs` into a shared module reused by both scripts.
- **Dark/light theme CSS** (`src/styles/starlight-overrides.css`): Added `.mermaid-diagram` CSS rules that toggle light/dark SVG variants based on Starlight's `data-theme` attribute.

## [2.9.0] - 2026-03-17

### Added

- **3 new AI role profiles** (`/roles/`): MLOps Engineer, AI Developer Advocate, AI Orchestration Engineer added to role cards, salary benchmarks, and career decision matrix. Role count: 13 → 16.
- **Role quiz scoring** (`src/data/role-quiz.ts`): 3 new roles now surface in quiz results. Scores added across 11 existing question options (MLOps: Q1/Q6/Q9/Q11, DevAdvocate: Q2/Q5/Q10, Orchestration: Q7/Q8/Q9). Explanations added for each.

### Changed

- **`/roles/` — "What's Not a Role" section**: Removed "Orchestration Engineer" card — confirmed real job postings at Vista Equity, Zapier, Heidi Health, Adobe (March 2026).
- **`/roles/` — axis tags**: Production-facing axis now includes MLOps Engineer, AI Developer Advocate, Orchestration Engineer.
- **SEO**: Meta description, JSON-LD keywords, `dateModified` updated for roles page.

## [2.8.0] - 2026-03-13

### Added
- **Ecosystem page (`/ecosystem/`)** — interactive browser for 25 community-built tools extending Claude Code
  - Filterable by category (8), status (stable/beta/alpha/watch), and text search
  - Cards with install command, language badge, expandable features/limitations/links
  - URL hash navigation (`#rtk` scrolls to and expands that tool's card)
  - Count-up animation on stats strip (25 tools, 8 categories, 6 languages, 4 stable)
  - "Recommendations by Persona" table (6 personas)
  - "Known Gaps" section (6 missing pieces in the community ecosystem)
  - Source: `src/data/ecosystem-data.ts` (25 tools manually extracted from `guide/ecosystem/third-party-tools.md`)
- **Header "More" dropdown** — added "Ecosystem" link between "AI Roles" and "Context"

## [2.7.0] - 2026-03-10

### Added
- **Section Cheat Sheets (`/cheatsheets/`)** — 57 fiches recap A4 lisibles en ligne
  - Script de conversion `scripts/convert-recap-cards.mjs` : QMD → MD content collection + copie PDFs
  - Collection Astro `cheatsheets` avec schema Zod (`cardNumber`, `category`, `difficulty`, `order`)
  - Page index `/cheatsheets/` : stats, tabs de filtrage (All / Technique / Méthodologie / Conception), grille responsive, badges colorés par série (T=orange, M=bleu, C=vert), pills de difficulté, download PDF inline
  - 57 routes dynamiques `/cheatsheets/[slug]/` : rendu Markdown, navigation prev/next dans la série, bouton download PDF, breadcrumb
  - Navigation header "Cheat Sheet" → "Cheat Sheets" pointant vers `/cheatsheets/` (ancienne page `/cheatsheet/` conservée et liée depuis l'index)
  - Footer mis à jour en cohérence
  - Entrée `page-cheatsheets` ajoutée au search index global (Cmd+K)
  - Script câblé dans `pnpm build:cheatsheets` et dans le build principal

## [2.6.1] - 2026-02-21

### Fixed
- **Broken anchor links in guide chapter pages** — Quick jump links and table of contents in `00-introduction.md` now correctly navigate to the target chapter instead of staying on the same page
  - Root cause: bare anchors (`#11-installation`) were not rewritten because Astro 5 Content Layer API caches rendered content, bypassing the remark plugin entirely
  - Fix: `scripts/prepare-guide-content.mjs` now rewrites cross-chapter bare anchors at content preparation time (before Astro's cache), using the already-built `anchorMap`
  - Same-page anchors (`#before-you-start`, `#tldr-the-5-minute-summary`) are preserved unchanged
  - Applies to all guide files, workflow files, and ultimate-guide chapters

## [2.6.0] - 2026-02-19

### Added
- **Starlight Guide Reader** — Full in-site guide reader at `/guide/`
  - `@astrojs/starlight` integration (replaces `@astrojs/mdx`)
  - `scripts/prepare-guide-content.mjs` — copies guide `.md`, splits `ultimate-guide.md` by chapter, copies images
  - `plugins/remark-guide-links.mjs` — rewrites relative links (`.md` → `/guide/…`, images → `/guide/images/`)
  - Custom Starlight `Header.astro` + `Footer.astro` in `src/components/starlight/`
  - `src/styles/starlight-overrides.css` — matches site design tokens
  - CI pipeline updated: clones guide repo then runs prepare script before build
  - Sitemap: `/guide/` pages at priority 0.85, changefreq weekly

### Changed
- **Navigation**
  - "Guide" added as first main nav link
  - "Learning" promoted from secondary to main nav
  - "Compare" moved to secondary "More" dropdown
  - "Read Guide" CTA now links to `/guide/` (was GitHub repo)
- **Compare page** — major redesign: new Workflow Patterns section with tab navigation
- **Learning page** — section reorder ("Choose Your Path" promoted to top), component extraction (`Onboarding.astro`, `Methodologies.astro`), tagline updated
- **Community section** — removed French community callout (devw.ai)

### Security
- New CVE: `CVE-2026-23744` MCPJam — **Critical**, remediation: audit servers
- New threat campaign: `hightower6eu` Publisher — 314+ malicious skills, credential theft via fake API workflows (Feb 2026)
- Threat DB bumped to **v2.1.0**

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
