# Security Hub and Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 12-section Security monolith with an action-oriented hub and four complete routes for threats, CVEs, sandboxing, and hardening.

**Architecture:** Build one tested Security presentation model from the existing AgentSec feed and static security data. Render shared navigation, freshness, metrics, checklist, and related-route components across five server-rendered Astro pages, with small client controllers for filters, copy controls, and checklist persistence.

**Tech Stack:** Astro 5, TypeScript 5.9, native DOM APIs, Node test runner, happy-dom, JSON-LD, Astro sitemap integration, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-08-31-context-security-redesign-design.md`

## Global Constraints

- Canonical routes are `/security/`, `/security/threats/`, `/security/cves/`, `/security/sandbox/`, and `/security/hardening/`.
- The site explains how to run AgentSec locally and never claims to scan a repository in the browser.
- `agentsec-security-feed.ts` owns AgentSec versions, dates, counts, events, detectors, and sources.
- `security-data.ts` owns static security collections not supplied by the feed.
- Unknown safe versions remain unknown. Do not infer them.
- Every time-sensitive block shows its effective source date.
- Essential records, commands, examples, and links remain readable without JavaScript.
- Preserve historical `/security/` fragment targets as meaningful hub teasers.
- Unique titles, descriptions, canonicals, H1s, breadcrumbs, and summaries are required.
- Add all child routes to sitemap dates and the HTML sitemap.
- One H1, logical heading order, keyboard access, visible focus, 44px mobile targets, and no overflow at 390px.
- Light mode, dark mode, and reduced-motion preferences must work.
- Preserve unrelated worktree changes and stage explicit pathspecs only.

---

## File map

- Create `src/data/security-page.ts`: own route metadata, task cards, content selectors, filter functions, checklist groups, source scoping, and historical anchors.
- Create `src/data/security-page.test.ts`: protect data ownership, unique route intent, freshness, counts, filters, unknown values, and content migration.
- Create `src/scripts/security-catalog.ts`: enhance CVE and threat catalogues with filters and zero states.
- Create `src/scripts/security-catalog.test.ts`: exercise catalog filtering in happy-dom.
- Create `src/scripts/security-checklist.ts`: manage checklist progress with an in-memory fallback.
- Create `src/scripts/security-checklist.test.ts`: test persistence and storage failure.
- Create `src/scripts/copy-control.ts`: provide reusable clipboard status behavior for Security code examples.
- Create `src/scripts/copy-control.test.ts`: test copy success and failure.
- Create `src/components/security/SecurityHero.astro`: render route-specific hero content and freshness.
- Create `src/components/security/SecurityBreadcrumbs.astro`: render visible hierarchy links.
- Create `src/components/security/SecuritySubnav.astro`: render route-local anchors.
- Create `src/components/security/SecurityPathCards.astro`: render the four task routes.
- Create `src/components/security/SecurityStats.astro`: render sourced values without hard-coded counts.
- Create `src/components/security/SecurityChecklist.astro`: render quick or full checklist mode.
- Create `src/components/security/SecurityRelatedPages.astro`: render task-aware adjacent routes.
- Create `src/components/security/SecuritySourceList.astro`: render sources scoped to the current content.
- Create `src/components/security/SecurityCveCatalog.astro`: render the CVE search and records.
- Create `src/components/security/SecurityThreatCatalog.astro`: render threat records and filters.
- Create `src/components/security/SecurityCodeExample.astro`: render selectable code with copy feedback.
- Create `src/styles/security-page.css`: own the five-route design system, state, themes, and responsive layouts.
- Replace `src/pages/security/index.astro`: compose the concise hub.
- Create `src/pages/security/threats/index.astro`: compose threat intelligence.
- Create `src/pages/security/cves/index.astro`: compose the CVE database.
- Create `src/pages/security/sandbox/index.astro`: compose sandbox guidance.
- Create `src/pages/security/hardening/index.astro`: compose hardening paths, commands, tools, and full checklist.
- Modify `astro.config.mjs`: add stable lastmod entries for all five routes.
- Modify `src/pages/sitemap/index.astro`: add a curated Security section.
- Modify `src/data/sitemap-page.test.ts`: require Security routes and dates.

---

### Task 1: Security route and selector model

**Files:**
- Create: `src/data/security-page.ts`
- Test: `src/data/security-page.test.ts`

**Interfaces:**
- Consumes: `AGENTSEC_FEED`, `AGENTSEC_SECURITY_VIEW`, and `SECURITY_DATA`.
- Produces: `SECURITY_ROUTES`, `SECURITY_HISTORICAL_ANCHORS`, `SECURITY_CHECKLIST_GROUPS`, `getLatestSecurityEvents(limit: number): readonly AgentSecEventCard[]`, `filterCves(query: string, severities: ReadonlySet<string>): readonly SecurityCveRow[]`, `filterThreatRecords(query: string, types: ReadonlySet<string>): readonly SecurityThreatRow[]`, and `getSecuritySources(sourceNames: readonly string[]): readonly SecuritySource[]`.

- [ ] **Step 1: Write failing route and selector tests**

```ts
test('security routes have unique tasks, metadata, and canonical paths', () => {
  assert.deepEqual(SECURITY_ROUTES.map((route) => route.href), [
    '/security/',
    '/security/threats/',
    '/security/cves/',
    '/security/sandbox/',
    '/security/hardening/',
  ])
  assert.equal(new Set(SECURITY_ROUTES.map((route) => route.title)).size, 5)
  assert.ok(SECURITY_ROUTES.every((route) => route.description.length >= 80))
})

test('latest events use canonical feed dates and descending order', () => {
  const events = getLatestSecurityEvents(3)
  assert.equal(events.length, 3)
  assert.deepEqual(events.map((item) => item.date), [...events.map((item) => item.date)].sort().reverse())
})

test('CVE filters preserve unknown fixed versions', () => {
  const row = filterCves('CVE-2025-6515', new Set()).at(0)
  assert.equal(row?.id, 'CVE-2025-6515')
  assert.equal(row?.fixedInLabel, 'Unknown')
})

test('every monolith section has an approved destination', () => {
  assert.deepEqual(Object.keys(SECURITY_CONTENT_MIGRATION).sort(), [
    'active-campaigns', 'agentsec-intelligence', 'agentsec-triage', 'attack-techniques',
    'built-in-security-commands', 'cve-database', 'defense-tools', 'security-checklist',
    'security-sources', 'security-stats', 'the-sandbox', 'threat-database',
  ])
})
```

- [ ] **Step 2: Run the model test and confirm missing exports**

Run: `rtk pnpm test -- src/data/security-page.test.ts`

Expected: FAIL because `security-page.ts` does not exist.

- [ ] **Step 3: Implement route metadata and pure selectors**

```ts
export type SecurityRouteId = 'hub' | 'threats' | 'cves' | 'sandbox' | 'hardening'

export interface SecurityRoute {
  id: SecurityRouteId
  href: string
  title: string
  description: string
  eyebrow: string
  heading: string
  summary: string
}

export interface SecurityCveRow extends CveEntry {
  fixedInLabel: string
  searchText: string
}

export interface SecurityThreatRow {
  id: string
  type: 'skill' | 'author' | 'campaign' | 'event'
  title: string
  summary: string
  date?: string
  searchText: string
}

export const SECURITY_ROUTES: readonly SecurityRoute[] = [
  {
    id: 'hub',
    href: '/security/',
    title: 'AI Agent Security for Claude Code | Claude Code Guide',
    description: 'Check a repository with AgentSec, review current Claude Code security risks, and choose a focused path for threats, CVEs, sandboxing, or hardening.',
    eyebrow: 'Security hub',
    heading: 'Secure Claude Code and AI Agents',
    summary: 'Start with a local repository check, review current evidence, then follow the security path that matches your task.',
  },
  {
    id: 'threats',
    href: '/security/threats/',
    title: 'AI Agent Threat Intelligence | Claude Code Guide',
    description: 'Review attack techniques, malicious skills, active campaigns, and sourced AgentSec intelligence affecting Claude Code and AI coding agents.',
    eyebrow: 'Threat intelligence',
    heading: 'AI Agent Threat Intelligence',
    summary: 'Understand how current attacks work, which ecosystems they affect, and which evidence supports each record.',
  },
  {
    id: 'cves',
    href: '/security/cves/',
    title: 'Claude Code CVE Database | Claude Code Guide',
    description: 'Search tracked Claude Code and MCP vulnerabilities by CVE, component, severity, mitigation, and known fixed version.',
    eyebrow: 'Vulnerability database',
    heading: 'Claude Code CVE Database',
    summary: 'Check whether a component is affected, inspect the primary source, and find the documented remediation.',
  },
  {
    id: 'sandbox',
    href: '/security/sandbox/',
    title: 'Claude Code Sandbox Security | Claude Code Guide',
    description: 'Compare Claude Code isolation modes, avoid common sandbox failures, and verify a configuration with copyable examples.',
    eyebrow: 'Isolation guide',
    heading: 'Configure the Claude Code Sandbox',
    summary: 'Choose an isolation boundary, understand what it excludes, and verify the controls before running an agent.',
  },
  {
    id: 'hardening',
    href: '/security/hardening/',
    title: 'Claude Code Security Hardening | Claude Code Guide',
    description: 'Apply five-minute, workstation, and team security controls with Claude Code commands, defense tools, permissions, hooks, and checklists.',
    eyebrow: 'Defensive baseline',
    heading: 'Harden Claude Code',
    summary: 'Reduce immediate risk, strengthen a workstation, and establish repeatable controls for a development team.',
  },
]
```

Implement selectors without mutating the imported arrays. `filterCves` maps absent `fixed_in` values to the display label `Unknown` and never derives a version.

- [ ] **Step 4: Run model and canonical feed tests**

Run: `rtk pnpm test -- src/data/security-page.test.ts src/data/agentsec-security-feed.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the Security data boundary**

```bash
git add src/data/security-page.ts src/data/security-page.test.ts
git commit -m "refactor: define security route model"
```

### Task 2: Tested client enhancements

**Files:**
- Create: `src/scripts/security-catalog.ts`
- Create: `src/scripts/security-catalog.test.ts`
- Create: `src/scripts/security-checklist.ts`
- Create: `src/scripts/security-checklist.test.ts`
- Create: `src/scripts/copy-control.ts`
- Create: `src/scripts/copy-control.test.ts`

**Interfaces:**
- Produces: `initSecurityCatalogs(root?: ParentNode): void`, `initSecurityChecklists(root?: ParentNode, storage?: Storage): void`, and `initCopyControls(root?: ParentNode, clipboard?: Pick<Clipboard, 'writeText'>): void`.
- Consumes: server-rendered data attributes and native browser APIs.

- [ ] **Step 1: Write failing catalogue tests**

```ts
test('filters records and exposes a resettable zero state', () => {
  const document = createCatalogFixture()
  initSecurityCatalogs(document)
  const search = document.querySelector<HTMLInputElement>('[data-security-search]')!
  search.value = 'no matching record'
  search.dispatchEvent(new document.defaultView!.Event('input'))
  assert.equal(document.querySelector('[data-security-empty]')?.hasAttribute('hidden'), false)
  document.querySelector<HTMLButtonElement>('[data-security-reset]')?.click()
  assert.equal(visibleRecordCount(document), 2)
})
```

- [ ] **Step 2: Write failing checklist and clipboard tests**

```ts
test('checklist remains interactive when storage throws', () => {
  const document = createChecklistFixture()
  initSecurityChecklists(document, throwingStorage())
  document.querySelector<HTMLInputElement>('[data-checklist-item]')?.click()
  assert.equal(document.querySelector('[data-checklist-progress]')?.textContent, '1 of 2 complete')
})

test('copy failure reports an error and preserves source text', async () => {
  const document = createCopyFixture('claude --permission-mode plan')
  initCopyControls(document, { writeText: async () => { throw new Error('denied') } })
  document.querySelector<HTMLButtonElement>('[data-copy-control]')?.click()
  await Promise.resolve()
  assert.equal(document.querySelector('[data-copy-status]')?.textContent, 'Copy failed. Select the command manually.')
  assert.equal(document.querySelector('[data-copy-source]')?.textContent, 'claude --permission-mode plan')
})
```

- [ ] **Step 3: Run the script tests and confirm missing modules**

Run: `rtk pnpm test -- src/scripts/security-catalog.test.ts src/scripts/security-checklist.test.ts src/scripts/copy-control.test.ts`

Expected: FAIL because the three modules do not exist.

- [ ] **Step 4: Implement idempotent controllers**

Each initializer marks its root with a ready data attribute, binds once, and accepts injected browser dependencies for tests. Catalogue filtering uses the server-rendered `data-search-text` and `data-record-type` values. Checklist storage keys include the checklist version. Clipboard messages use `aria-live="polite"`.

```ts
export function initSecurityCatalogs(root: ParentNode = document) {
  for (const catalog of root.querySelectorAll<HTMLElement>('[data-security-catalog]')) {
    if (catalog.dataset.ready === 'true') continue
    catalog.dataset.ready = 'true'
    bindCatalog(catalog)
  }
}
```

- [ ] **Step 5: Run all script tests**

Run: `rtk pnpm test -- src/scripts/security-catalog.test.ts src/scripts/security-checklist.test.ts src/scripts/copy-control.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the client enhancements**

```bash
git add src/scripts/security-catalog.ts src/scripts/security-catalog.test.ts src/scripts/security-checklist.ts src/scripts/security-checklist.test.ts src/scripts/copy-control.ts src/scripts/copy-control.test.ts
git commit -m "feat: add security page interactions"
```

### Task 3: Shared Security component system

**Files:**
- Create: `src/components/security/SecurityHero.astro`
- Create: `src/components/security/SecurityBreadcrumbs.astro`
- Create: `src/components/security/SecuritySubnav.astro`
- Create: `src/components/security/SecurityPathCards.astro`
- Create: `src/components/security/SecurityStats.astro`
- Create: `src/components/security/SecurityChecklist.astro`
- Create: `src/components/security/SecurityRelatedPages.astro`
- Create: `src/components/security/SecuritySourceList.astro`
- Create: `src/components/security/SecurityCveCatalog.astro`
- Create: `src/components/security/SecurityThreatCatalog.astro`
- Create: `src/components/security/SecurityCodeExample.astro`
- Create: `src/styles/security-page.css`
- Test: `src/data/security-components.test.ts`

**Interfaces:**
- Consumes: `SecurityRoute`, canonical view models, and the data attributes defined in Task 2.
- Produces: server-rendered, accessible blocks shared by the five routes.

- [ ] **Step 1: Write structural component tests**

```ts
test('SecurityHero reports freshness and never claims browser scanning', () => {
  const source = readSecurityComponent('SecurityHero.astro')
  assert.match(source, /databaseUpdatedLabel/)
  assert.doesNotMatch(source, /scan your repository in the browser/i)
})

test('catalogues render records before client enhancement', () => {
  for (const name of ['SecurityCveCatalog.astro', 'SecurityThreatCatalog.astro']) {
    const source = readSecurityComponent(name)
    assert.match(source, /data-security-record/)
    assert.match(source, /data-security-empty/)
  }
})

test('quick and full checklist modes share one component', () => {
  const source = readSecurityComponent('SecurityChecklist.astro')
  assert.match(source, /mode.*quick.*full/s)
  assert.match(source, /data-checklist-item/)
})
```

- [ ] **Step 2: Run the structural tests and confirm missing files**

Run: `rtk pnpm test -- src/data/security-components.test.ts`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Build the shared components**

`SecurityHero.astro` accepts a route model, freshness label, optional stats, and an optional action slot. `SecurityBreadcrumbs.astro` always links Home, Security, and the current route. `SecurityRelatedPages.astro` excludes the current route.

```astro
---
interface Props {
  route: SecurityRoute
  databaseLabel: string
  databaseUpdatedLabel: string
}
const { route, databaseLabel, databaseUpdatedLabel } = Astro.props
---
<header class="security-hero">
  <p class="security-eyebrow">{route.eyebrow}</p>
  <h1>{route.heading}</h1>
  <p class="security-summary">{route.summary}</p>
  <p class="security-freshness">{databaseLabel} · Updated {databaseUpdatedLabel}</p>
  <slot />
</header>
```

Catalogues render all records and then import `security-catalog.ts`. Checklist and code components import only their matching controller.

- [ ] **Step 4: Build the route-family CSS**

Use one constrained content width, a two-column hero where supplied, a horizontal local navigation on small screens, responsive card grids, controlled table scrolling, 44px controls, focus-visible outlines, theme variables, and reduced-motion overrides. Hidden filter records use the native `hidden` attribute.

- [ ] **Step 5: Run component and interaction tests**

Run: `rtk pnpm test -- src/data/security-components.test.ts src/scripts/security-catalog.test.ts src/scripts/security-checklist.test.ts src/scripts/copy-control.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit shared Security components**

```bash
git add src/components/security src/styles/security-page.css src/data/security-components.test.ts
git commit -m "feat: add security route components"
```

### Task 4: Threats and CVE routes

**Files:**
- Create: `src/pages/security/threats/index.astro`
- Create: `src/pages/security/cves/index.astro`
- Test: `src/data/security-routes.test.ts`

**Interfaces:**
- Consumes: route metadata, canonical selectors, shared components, current threat sections, and the CVE collection.
- Produces: complete `/security/threats/` and `/security/cves/` pages.

- [ ] **Step 1: Write route source tests**

```ts
test('threats route owns every approved intelligence section', () => {
  const source = readRoute('threats')
  for (const id of ['attack-techniques', 'agentsec-intelligence', 'active-campaigns', 'threat-database', 'security-sources']) {
    assert.match(source, new RegExp(`id=["']${id}["']`))
  }
})

test('CVE route exposes search, safe-version status, remediation, and sources', () => {
  const source = readRoute('cves')
  assert.match(source, /SecurityCveCatalog/)
  assert.match(source, /fixedInLabel/)
  assert.match(source, /mitigation/)
  assert.match(source, /SecuritySourceList/)
})
```

- [ ] **Step 2: Run the route tests and confirm missing pages**

Run: `rtk pnpm test -- src/data/security-routes.test.ts`

Expected: FAIL because both routes do not exist.

- [ ] **Step 3: Compose the Threats route**

Move Attack Techniques, AgentSec Intelligence, Active Campaigns, and Threat Database Browser from the monolith. Use canonical arrays and `getLatestSecurityEvents`. Preserve current source links and explanatory limits. Add visible breadcrumbs, local anchors, related pages, unique metadata, `BreadcrumbList`, and compact footer.

- [ ] **Step 4: Compose the CVE route**

Move the complete CVE database from the monolith. Render every record through `SecurityCveCatalog`, show `Unknown` when `fixed_in` is absent, retain mitigation and source fields, and add search plus severity filters. Add visible breadcrumbs, local anchors, related pages, unique metadata, `BreadcrumbList`, and compact footer.

- [ ] **Step 5: Run route, model, and interaction tests**

Run: `rtk pnpm test -- src/data/security-routes.test.ts src/data/security-page.test.ts src/scripts/security-catalog.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit Threats and CVE routes**

```bash
git add src/pages/security/threats src/pages/security/cves src/data/security-routes.test.ts
git commit -m "feat: add security threats and CVE routes"
```

### Task 5: Sandbox and Hardening routes

**Files:**
- Create: `src/pages/security/sandbox/index.astro`
- Create: `src/pages/security/hardening/index.astro`
- Modify: `src/data/security-routes.test.ts`

**Interfaces:**
- Consumes: shared components, current Sandbox, Defense Tools, Built-in Security Commands, and checklist sections.
- Produces: complete `/security/sandbox/` and `/security/hardening/` pages.

- [ ] **Step 1: Extend route tests**

```ts
test('sandbox route states the protection boundary and three failure modes', () => {
  const source = readRoute('sandbox')
  assert.match(source, /what.*does not protect/is)
  assert.equal((source.match(/data-sandbox-failure/g) ?? []).length, 3)
  assert.match(source, /SecurityCodeExample/)
})

test('hardening route exposes three paths and the full checklist', () => {
  const source = readRoute('hardening')
  for (const label of ['5 minutes', '30 minutes', 'Team controls']) assert.match(source, new RegExp(label, 'i'))
  assert.match(source, /mode="full"/)
  assert.match(source, /TerminalPlayground/)
})
```

- [ ] **Step 2: Run route tests and confirm missing pages**

Run: `rtk pnpm test -- src/data/security-routes.test.ts`

Expected: FAIL because the Sandbox and Hardening routes do not exist.

- [ ] **Step 3: Compose the Sandbox route**

Move the full Sandbox section from the monolith. Separate protection boundary, exclusions, three failure modes, mode comparison, use-case recommendations, copyable configurations, and verification list. Preserve the evidence and source links attached to each claim.

- [ ] **Step 4: Compose the Hardening route**

Move Defense Tools, Built-in Security Commands, and the complete checklist. Organize them into five-minute, thirty-minute, and team-control paths. Keep the existing terminal playground and commands. Use `SecurityChecklist mode="full"` with a versioned storage key.

- [ ] **Step 5: Run route and interaction tests**

Run: `rtk pnpm test -- src/data/security-routes.test.ts src/scripts/security-checklist.test.ts src/scripts/copy-control.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit Sandbox and Hardening routes**

```bash
git add src/pages/security/sandbox src/pages/security/hardening src/data/security-routes.test.ts
git commit -m "feat: add sandbox and hardening routes"
```

### Task 6: Replace Security monolith with the hub

**Files:**
- Replace: `src/pages/security/index.astro`
- Modify: `src/data/security-routes.test.ts`

**Interfaces:**
- Consumes: shared route model, `getLatestSecurityEvents(3)`, quick checklist mode, path cards, and historical anchors.
- Produces: concise `/security/` hub without duplicated full catalogues.

- [ ] **Step 1: Add hub contract tests**

```ts
test('Security hub keeps every historical fragment as a teaser', () => {
  const source = readRoute('index')
  for (const id of SECURITY_HISTORICAL_ANCHORS) {
    assert.match(source, new RegExp(`id=["']${id}["']`))
  }
})

test('Security hub links to all four task routes without embedding full catalogues', () => {
  const source = readRoute('index')
  for (const href of ['/security/threats/', '/security/cves/', '/security/sandbox/', '/security/hardening/']) {
    assert.match(source, new RegExp(`href=["']${href}["']`))
  }
  assert.doesNotMatch(source, /data-security-cve-record/)
  assert.doesNotMatch(source, /data-security-threat-record/)
})
```

- [ ] **Step 2: Run route tests and confirm the old monolith fails the contract**

Run: `rtk pnpm test -- src/data/security-routes.test.ts`

Expected: FAIL because the hub still contains complete catalogues and lacks route cards.

- [ ] **Step 3: Compose the concise hub**

Render the two-column hero, AgentSec local-run action, sourced stats, four path cards, three latest events, quick checklist, historical anchor teasers, essential sources, and compact footer. Keep `feed.agentsec.installation_url`, `feed.agentsec.repository_url`, `feed.agentsec.scan_command`, database version, and database date sourced from the feed.

- [ ] **Step 4: Run hub and feed tests**

Run: `rtk pnpm test -- src/data/security-routes.test.ts src/data/security-page.test.ts src/data/agentsec-security-feed.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the Security hub**

```bash
git add src/pages/security/index.astro src/data/security-routes.test.ts
git commit -m "feat: replace security monolith with hub"
```

### Task 7: Sitemap, metadata, and full verification

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/pages/sitemap/index.astro`
- Modify: `src/data/sitemap-page.test.ts`
- Modify: `src/data/security-routes.test.ts`

**Interfaces:**
- Consumes: the five canonical Security routes.
- Produces: stable sitemap dates, curated HTML discovery, metadata checks, and final verification evidence.

- [ ] **Step 1: Write sitemap and metadata tests**

```ts
test('HTML sitemap exposes the complete Security route family', () => {
  for (const href of ['/security/', '/security/threats/', '/security/cves/', '/security/sandbox/', '/security/hardening/']) {
    assert.match(source, new RegExp(`href: '${href}'`))
  }
})

test('Security routes have stable lastmod dates', () => {
  for (const path of ['', 'threats/', 'cves/', 'sandbox/', 'hardening/']) {
    assert.match(sitemapConfig, new RegExp(`https:\\/\\/cc\\.bruniaux\\.com\\/security\\/${path.replace('/', '\\/')}.*2026-08-31`))
  }
})

test('Security route metadata remains unique', () => {
  assert.equal(new Set(SECURITY_ROUTES.map((route) => route.title)).size, SECURITY_ROUTES.length)
  assert.equal(new Set(SECURITY_ROUTES.map((route) => route.description)).size, SECURITY_ROUTES.length)
})
```

- [ ] **Step 2: Run sitemap tests and confirm missing entries**

Run: `rtk pnpm test -- src/data/sitemap-page.test.ts src/data/security-routes.test.ts`

Expected: FAIL until all five routes appear in `PAGE_DATES` and the curated sitemap.

- [ ] **Step 3: Add sitemap dates and a Security section**

Add five `PAGE_DATES` entries dated `2026-08-31`. Move the existing Security link from Site resources into a dedicated Security section with all five routes and task-specific descriptions. Astro's sitemap integration will include the new static routes automatically.

- [ ] **Step 4: Run the complete automated suite**

Run: `rtk pnpm test`

Expected: all tests pass.

Run: `rtk pnpm check`

Expected: exit 0 with no new Security diagnostics.

Run: `rtk pnpm build`

Expected: exit 0 with generated HTML for all five Security routes and sitemap entries.

- [ ] **Step 5: Run content-parity inventory**

Compare every heading, interactive control, source link, command, CVE record, threat record, detector, campaign, and checklist item from the pre-refactor `/security/` source against its destination. Record any intentional consolidation in the completion report. Completion requires no unexplained missing item.

- [ ] **Step 6: Verify browser behavior**

At desktop and 390px mobile widths, test all five routes in light and dark mode. Verify filters, reset states, hash targets, breadcrumbs, copy success, checklist persistence, keyboard order, focus visibility, controlled table scrolling, compact footer, and no horizontal overflow. Record page height, interactive count, undersized targets, console errors, and console warnings for each route.

- [ ] **Step 7: Commit discovery and verification changes**

```bash
git add astro.config.mjs src/pages/sitemap/index.astro src/data/sitemap-page.test.ts src/data/security-routes.test.ts
git commit -m "feat: publish security route family"
```
