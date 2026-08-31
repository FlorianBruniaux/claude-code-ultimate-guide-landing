# Homepage Progressive Disclosure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shorten the homepage, preserve every resource through dedicated routes, and make the primary path clear on desktop and mobile.

**Architecture:** A canonical content module feeds focused Astro components and three resource hubs. The homepage composes only the acquisition-facing components; existing detailed components remain available for dedicated routes.

**Tech Stack:** Astro 5, TypeScript, Node test runner, project CSS tokens.

**Spec:** `docs/superpowers/specs/2026-08-31-homepage-progressive-disclosure-design.md`

## Global Constraints

- Preserve all unrelated dirty-worktree changes.
- Do not create a commit in this implementation session.
- Keep the live GitHub star count and all four offline guide downloads.
- Do not remove a homepage resource without a destination route.
- Use no new runtime dependency.

---

### Task 1: Canonical homepage content

**Files:**
- Create: `src/data/homepage-content.test.ts`
- Create: `src/data/homepage-content.ts`

**Interfaces:**
- Produces: `HOMEPAGE_METRICS`, `GUIDE_DOWNLOADS`, `START_PATHS`, `FLAGSHIP_RESOURCES`, `DEEP_TOPICS`, `RELATED_PROJECTS`
- Consumers: homepage components and the three catalogue routes

- [ ] **Step 1: Write the failing data-model tests**

Assert the literal expected counts `13`, `58`, and `48`; four unique downloads; three start paths; four flagship resources; four deep topics; and twelve unique projects.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test src/data/homepage-content.test.ts`

Expected: module-not-found for `homepage-content.ts`.

- [ ] **Step 3: Implement the content module**

Derive counts directly from the existing whitepaper, recap-card, and diagram datasets. Export typed readonly arrays with complete titles, descriptions, destinations, and metadata.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test src/data/homepage-content.test.ts`

Expected: all homepage-content tests pass.

### Task 2: Acquisition-facing homepage components

**Files:**
- Modify: `src/components/landing/HeroBanner.astro`
- Create: `src/components/landing/StartHere.astro`
- Create: `src/components/landing/FlagshipResources.astro`
- Create: `src/components/landing/ExploreDeeper.astro`
- Create: `src/components/landing/LatestContent.astro`
- Modify: `src/components/landing/AuthorProfile.astro`

**Interfaces:**
- Consumes: exports from `src/data/homepage-content.ts`
- Produces: compact, server-rendered homepage sections without client-side state

- [ ] **Step 1: Replace the hero inventory with two CTAs, three proof points, live stars, a downloads route, and the author signature**
- [ ] **Step 2: Implement three intent-based start paths**
- [ ] **Step 3: Implement four flagship resources**
- [ ] **Step 4: Implement four deep-topic teasers**
- [ ] **Step 5: Move existing blog and quick-guide feeds into a compact latest-content section**

### Task 3: Preserve the complete resource inventory

**Files:**
- Create: `src/pages/resources/index.astro`
- Create: `src/pages/downloads/index.astro`
- Create: `src/pages/projects/index.astro`
- Modify: `src/components/landing/RelatedProjects.astro`

**Interfaces:**
- Consumes: canonical content arrays
- Produces: public routes for every item removed from the homepage

- [ ] **Step 1: Render all resources at `/resources/`**
- [ ] **Step 2: Render all four download formats at `/downloads/`**
- [ ] **Step 3: Render all twelve projects at `/projects/`**
- [ ] **Step 4: Limit homepage projects to three and link to the full route**

### Task 4: Recompose the homepage

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/landing/McpDemo.astro`
- Modify: `src/components/landing/Community.astro`

**Interfaces:**
- Consumes: the new focused components
- Produces: Hero, Start Here, Flagship Resources, compact MCP proof, Explore Deeper, Latest Content, Community, Projects, Consulting CTA

- [ ] **Step 1: Remove the detailed catalogue components from the homepage composition**
- [ ] **Step 2: Compact MCP output to one default proof with optional details**
- [ ] **Step 3: Compact community actions**
- [ ] **Step 4: Keep detailed legacy components available through their dedicated routes**

### Task 5: Theme and mobile accessibility

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/components.css`
- Modify: `src/components/global/AnnouncementBanner.astro`
- Modify: `src/components/global/FeedbackFab.astro`

**Interfaces:**
- Produces: AA text contrast for primary actions, readable metadata, compact mobile announcement, and non-obstructive feedback control

- [ ] **Step 1: Apply mode-specific accent and button-text tokens**
- [ ] **Step 2: Increase compact actionable text and interaction height**
- [ ] **Step 3: Show one announcement item plus changelog on mobile**
- [ ] **Step 4: Delay the mobile feedback control until the visitor scrolls past the hero**

### Task 6: Verification

**Files:**
- Modify if required: `src/data/landing-sync.test.ts`

- [ ] **Step 1: Run `pnpm test`**
- [ ] **Step 2: Run `pnpm exec astro build`**
- [ ] **Step 3: Run `git diff --check`**
- [ ] **Step 4: Measure desktop and mobile layouts in both themes**
- [ ] **Step 5: Confirm no horizontal overflow or console errors**
