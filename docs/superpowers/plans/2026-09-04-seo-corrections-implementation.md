# SEO Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct and test the repository-owned SEO defects from the 2026-09-04 audit while preserving explicit boundaries around hosting, GA4, GSC, and API-key work.

**Architecture:** Put guide-specific metadata and content transformations in one pure module consumed by the existing generator. Keep hand-authored landing metadata and contextual links in their owning pages. Add a post-build verifier for rendered HTML and sitemap behavior, then document the external controls that GitHub Pages and the repository cannot apply.

**Tech Stack:** Astro 5, Starlight, Node.js test runner, TypeScript, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-04-seo-corrections.md`

## Global Constraints

- Do not edit the sibling guide repository.
- Do not hand-edit `src/content/docs/guide/**`; the generator owns it.
- Preserve source claims, dates, and uncertainty. Metadata may summarize but may not strengthen claims.
- Do not add dependencies.
- Do not deploy, push, change DNS, change GA4, submit GSC URLs, create API keys, or modify the AI Overviews MCP implementation.
- Keep `UNKNOWN` for the Singapore traffic cause, Core Web Vitals, AI Overviews, and post-recrawl indexation.
- Use `https://cc.bruniaux.com` for all canonical internal absolute URLs.
- Do not use the em dash character in prose.

---

### Task 1: Normalize generated guide SEO

**Files:**
- Create: `src/data/guide-seo-overrides.mjs`
- Create: `src/data/guide-seo-overrides.test.ts`
- Modify: `scripts/prepare-guide-content.mjs`
- Modify: `scripts/build-guide-content-index.mjs`
- Test: `src/data/guide-seo-overrides.test.ts`

**Interfaces:**
- Consumes: source paths such as `guide/core/architecture.md` and complete Markdown strings.
- Produces: `transformGuideMarkdown(content, sourcePath)`, `canonicalGuidePageUrl(relPath)`, and `GUIDE_SEO_OVERRIDES`.

- [ ] **Step 1: Write failing transform tests**

Create fixture-driven tests that prove four observable behaviors:

```ts
test('removes only the leading document H1 after frontmatter', () => {
  const result = transformGuideMarkdown('---\ntitle: Old\n---\n\n# Old\n\nIntro\n\n## Keep', 'guide/core/architecture.md')
  assert.doesNotMatch(result, /^# Old$/m)
  assert.match(result, /^## Keep$/m)
})

test('applies bounded metadata for audited guide pages', () => {
  for (const override of Object.values(GUIDE_SEO_OVERRIDES)) {
    assert.ok(override.title.length >= 30 && override.title.length <= 60)
    assert.ok(override.description.length >= 50 && override.description.length <= 160)
  }
})

test('canonicalizes the legacy release document', () => {
  assert.equal(canonicalGuidePageUrl('claude-code-releases.md'), '/releases/')
})

test('keeps headings inside code fences and later H1 examples intact', () => {
  const fixture = '---\ntitle: Page\n---\n\n# Page\n\n```md\n# Example\n```\n\n# Later example'
  const result = transformGuideMarkdown(fixture, 'guide/core/architecture.md')
  assert.match(result, /```md\n# Example\n```/)
  assert.match(result, /# Later example/)
})
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
node --test src/data/guide-seo-overrides.test.ts
```

Expected: fail because the module and exported behaviors do not exist.

- [ ] **Step 3: Implement the pure transformation module**

Define these exact metadata values:

```js
export const GUIDE_SEO_OVERRIDES = {
  'guide/core/architecture.md': {
    title: 'Claude Code Architecture & Agent Loop',
    description: 'How Claude Code runs its model-tool loop, manages context, executes tools, and isolates subagents, with sourced architecture notes.',
  },
  'guide/core/agent-harness.md': {
    title: 'Claude Code Agent Harness Engineering',
    description: 'Design and evaluate the context, policy, tool, verification, observability, and recovery layers around Claude Code agents.',
  },
  'guide/security/data-privacy.md': {
    title: 'Claude Code Privacy & Data Retention',
    description: 'What Claude Code sends to Anthropic, retention by plan, training controls, MCP exposure, and safeguards for sensitive data.',
  },
  'guide/core/hooks-events-reference.md': {
    title: 'Claude Code Hooks: 30 Event Reference',
    description: 'Reference for 30 Claude Code hook events, matcher fields, input schemas, decision control, timeouts, and copyable JSON examples.',
  },
  'guide/ecosystem/third-party-tools.md': {
    title: 'Claude Code Tools: RTK, ccusage & GUIs',
    description: 'Compare Claude Code GUIs, TUIs, configuration managers, token trackers, RTK, lean-ctx, ccusage, and other community tools.',
  },
}
```

Rendered-title decision: Starlight appends ` | Claude Code Guide` to each generated guide title. The five source titles above are therefore intentionally 36 to 38 characters so the rendered `<title>` values remain 56 to 58 characters and satisfy the 30 to 60 character contract.

`transformGuideMarkdown` must replace only the leading frontmatter `title` and `description` for listed paths, then remove only the first document H1 immediately after frontmatter. It must leave all later headings and fenced examples unchanged.

`canonicalGuidePageUrl` must map `claude-code-releases.md` to `/releases/` and retain the existing `/guide/<path>/` behavior for every other file.

- [ ] **Step 4: Integrate the transform into both generators**

In `prepare-guide-content.mjs`, compute `sourcePath` before adding Starlight metadata, then run the pure transform once for regular guides and workflows. Preserve `lastUpdated`, `datePublished`, sidebar order, link rewriting, images, and Mermaid rendering.

In `build-guide-content-index.mjs`, call `canonicalGuidePageUrl(relPath)` so sections from `claude-code-releases.md` point to `/releases/`. Drop the source document fragment for that mapped landing because the hand-authored releases page does not expose the guide headings.

- [ ] **Step 5: Verify GREEN and regenerate owned artifacts**

Run:

```bash
node --test src/data/guide-seo-overrides.test.ts
GUIDE_REPO_PATH=/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide node scripts/prepare-guide-content.mjs
node scripts/build-guide-content-index.mjs
```

Expected: focused tests pass; generated files contain one document H1 source at most; generated content search entries use `/releases/` for the legacy release source.

- [ ] **Step 6: Run the full suite and commit**

```bash
GUIDE_REPO_PATH=/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide pnpm test
git add src/data/guide-seo-overrides.mjs src/data/guide-seo-overrides.test.ts scripts/prepare-guide-content.mjs scripts/build-guide-content-index.mjs src/data/guide-content-entries.ts
git commit -m "fix(seo): normalize generated guide metadata"
```

### Task 2: Improve landing snippets and contextual links

**Files:**
- Modify: `src/pages/releases/index.astro`
- Modify: `src/pages/glossary/index.astro`
- Modify: `src/pages/context-engineering/index.astro`
- Modify: `src/pages/compare/index.astro`
- Modify: `src/pages/claude-md-best-practices/index.astro`
- Modify: `src/pages/security/hardening/index.astro`
- Modify: `src/data/guide-navigation.mjs`
- Create: `src/data/seo-editorial-contract.test.ts`
- Test: `src/data/seo-editorial-contract.test.ts`

**Interfaces:**
- Consumes: existing Astro pages, `COMPARISON_TOOLS`, security routes, and curated guide navigation.
- Produces: bounded metadata plus descriptive body links to each target in the first internal-link experiment.

- [ ] **Step 1: Write failing editorial contract tests**

The test must derive exported or rendered values, not assert arbitrary source lines. Extract shared metadata constants into small exported `.ts` or `.mjs` modules only if Astro imports prevent direct testing. Verify:

```ts
const targetLinks = new Set([
  '/guide/workflows/code-review/',
  '/compare/claude-code-vs-windsurf/',
  '/compare/claude-code-vs-aider/',
  '/cheatsheets/t04-permissions-glob-patterns/',
  '/cheatsheets/t06-settings-json/',
  '/cheatsheets/m11-hooks-evenements-systeme/',
])
```

Each target must have a descriptive contextual-link record with a non-empty source route and anchor of at least three words. No target may use a footer or global-header source.

Verify the landing titles are 30 to 60 characters and descriptions are 50 to 160 characters.

- [ ] **Step 2: Run the focused test and verify RED**

```bash
node --test src/data/seo-editorial-contract.test.ts
```

Expected: fail because the shared editorial contract does not yet exist.

- [ ] **Step 3: Apply exact landing metadata**

Use these exact values:

```ts
export const landingSeo = {
  releases: {
    title: 'Claude Code Version History & Latest Release',
    description: 'Current Claude Code version, release date, version history, changelog, breaking changes, environment variables, and config flags.',
  },
  glossary: {
    title: 'Claude Code Glossary: Terms & Definitions',
    description: 'Definitions for Claude Code commands, agents, hooks, MCP, context, permissions, workflows, and related terminology.',
  },
  contextEngineering: {
    title: 'Context Engineering Tools for Claude Code',
    description: 'Compare RTK, lean-ctx, LLMLingua, gateways, RAG, caching, and observability tools for reducing and managing LLM context.',
  },
}
```

Keep the releases H1, current `releases[0].version`, and `releases[0].date` in the initial HTML. Set the releases JSON-LD `dateModified` from a stable ISO field derived in data, not from the build clock.

- [ ] **Step 4: Add six contextual links across related pages**

Use these source and anchor contracts:

| Source | Target | Anchor intent |
| --- | --- | --- |
| `/guide/` workflow section | `/guide/workflows/code-review/` | Review code with a repeatable multi-provider workflow |
| `/compare/` direct comparison intro | `/compare/claude-code-vs-windsurf/` | Compare Claude Code with Windsurf |
| `/compare/` direct comparison intro | `/compare/claude-code-vs-aider/` | Compare Claude Code with Aider |
| `/security/hardening/` permissions section | `/cheatsheets/t04-permissions-glob-patterns/` | Check permission glob patterns |
| `/claude-md-best-practices/` hierarchy or next-steps section | `/cheatsheets/t06-settings-json/` | Review the settings.json reference card |
| generated Hooks Events Reference related material | `/cheatsheets/m11-hooks-evenements-systeme/` | Use the hooks and events recap card |

The hooks link belongs in `guide-seo-overrides.mjs` as a generated-page appendix. The other links belong in the listed hand-authored source pages or curated guide data. Do not put all six links in one generic block.

- [ ] **Step 5: Verify GREEN and commit**

```bash
node --test src/data/seo-editorial-contract.test.ts src/data/guide-seo-overrides.test.ts
GUIDE_REPO_PATH=/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide pnpm test
git add src/pages/releases/index.astro src/pages/glossary/index.astro src/pages/context-engineering/index.astro src/pages/compare/index.astro src/pages/claude-md-best-practices/index.astro src/pages/security/hardening/index.astro src/data/guide-navigation.mjs src/data/seo-editorial-contract.test.ts src/data/guide-seo-overrides.mjs src/data/guide-seo-overrides.test.ts
git commit -m "fix(seo): align snippets and internal links"
```

### Task 3: Enforce rendered SEO contracts

**Files:**
- Create: `scripts/lib/seo-contracts.mjs`
- Create: `scripts/check-built-seo.mjs`
- Create: `src/data/seo-contracts.test.ts`
- Modify: `package.json`
- Modify: `.github/workflows/deploy.yml`
- Test: `src/data/seo-contracts.test.ts`

**Interfaces:**
- Consumes: a built `dist/` directory and a list of audited routes.
- Produces: exit code `0` only when every local rendered contract passes; otherwise prints each failing route and exits non-zero.

- [ ] **Step 1: Write failing behavior tests with temporary HTML fixtures**

Cover these mutations with hand-written fixtures:

```ts
test('rejects two rendered H1 elements', () => { /* expect one failure */ })
test('rejects an HTTP canonical', () => { /* expect one failure */ })
test('rejects metadata outside the configured bounds', () => { /* expect failures */ })
test('rejects the legacy release URL in sitemap XML', () => { /* expect one failure */ })
test('accepts a valid audited page and sitemap', () => { /* expect zero failures */ })
```

Tests must call the real checker functions against temporary files. Do not grep the checker source.

- [ ] **Step 2: Run the focused tests and verify RED**

```bash
node --test src/data/seo-contracts.test.ts
```

Expected: fail because the checker does not exist.

- [ ] **Step 3: Implement the post-build checker**

The checker must inspect these routes:

```js
export const AUDITED_ROUTES = [
  '/guide/agent-harness/',
  '/guide/architecture/',
  '/guide/data-privacy/',
  '/guide/hooks-events-reference/',
  '/guide/third-party-tools/',
  '/releases/',
  '/glossary/',
  '/context-engineering/',
]
```

For each route, require one H1, an HTTPS self-canonical, title length from 30 to 60, and description length from 50 to 160. Require exactly one `/releases/` entry and zero legacy release entries across sitemap index and shards. Scan built text artifacts for `http://cc.bruniaux.com` and report every file containing it.

Do not claim the static redirect page proves an HTTP 301 or 308. The checker must print that the production redirect status and response headers remain an external verification.

- [ ] **Step 4: Wire the checker after the Astro build**

Add `check:built-seo` to `package.json`. Run it in `.github/workflows/deploy.yml` after `pnpm astro build` and before upload. The workflow must fail on local HTML, canonical, metadata, or sitemap regressions.

- [ ] **Step 5: Run RED, GREEN, full build, and commit**

```bash
node --test src/data/seo-contracts.test.ts
GUIDE_REPO_PATH=/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide pnpm build
pnpm check:built-seo
GUIDE_REPO_PATH=/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide pnpm test
git add scripts/lib/seo-contracts.mjs scripts/check-built-seo.mjs src/data/seo-contracts.test.ts package.json .github/workflows/deploy.yml
git commit -m "test(seo): enforce rendered page contracts"
```

### Task 4: Package external operations without false completion claims

**Files:**
- Create: `docs/operations/seo-post-deploy.md`
- Create: `docs/analytics/ga4-measurement-plan.md`
- Create: `scripts/check-public-seo.mjs`
- Create: `src/data/public-seo-check.test.ts`
- Modify: `package.json`
- Test: `src/data/public-seo-check.test.ts`

**Interfaces:**
- Consumes: a base URL, HTTP responses, the audit baseline, and human-entered external evidence.
- Produces: a read-only public smoke check plus two operational records that keep `PROUVÉ`, `PARTIEL`, and `UNKNOWN` separate.

- [ ] **Step 1: Write failing public-check tests**

Use a local Node HTTP server in the test. Verify that the checker:

```ts
test('accepts a direct permanent release redirect and required headers', async () => {})
test('rejects an HTML 200 redirect stub', async () => {})
test('rejects a redirect chain longer than one hop', async () => {})
test('rejects missing nosniff, referrer, or framing policy', async () => {})
```

The accepted framing policy is either `Content-Security-Policy` containing `frame-ancestors` or `X-Frame-Options` with `DENY` or `SAMEORIGIN`.

- [ ] **Step 2: Run the focused test and verify RED**

```bash
node --test src/data/public-seo-check.test.ts
```

Expected: fail because the public checker does not exist.

- [ ] **Step 3: Implement the read-only public smoke checker**

Add `pnpm check:public-seo -- https://cc.bruniaux.com`. It must use `redirect: 'manual'`, require a 301 or 308 for `/guide/claude-code-releases/`, require a direct `/releases/` destination, and verify security headers on `/`, `/releases/`, and one static asset. It must never mutate GSC, GA4, DNS, or hosting.

- [ ] **Step 4: Write the hosting and validation runbook**

`docs/operations/seo-post-deploy.md` must include:

- proof that current GitHub Pages static output cannot supply response status rules or global response headers;
- the 2026-09-04 DNS evidence;
- two supported decisions: add an edge proxy in front of GitHub Pages, or migrate to a host with redirect/header rules;
- exact required values: permanent direct redirect, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and either CSP `frame-ancestors 'none'` or `X-Frame-Options: DENY`;
- compatibility checks for analytics, PDF downloads, external links, and authorized embeds;
- the read-only smoke command, rollback condition, GSC inspection sequence, five HTTP canonical URLs, CrUX/PageSpeed environment names, and AI Overviews remaining `UNKNOWN`.

- [ ] **Step 5: Write the GA4 measurement plan**

`docs/analytics/ga4-measurement-plan.md` must record the current event names without renaming historical data:

| Objective candidate | Existing event | External decision |
| --- | --- | --- |
| Complete the quiz | `quiz_complete` | Decide whether to mark as a key event |
| Subscribe for recap cards | `recap_card_subscribe` | Decide whether to mark as a key event |
| Subscribe for an ebook | `ebook_subscribe` | Decide whether to mark as a key event |
| Download a file | `file_download` | Decide which files qualify as outcomes |

State that zero recorded conversions is proven for the audited windows, while the configuration cause is unknown. Include DebugView validation fields, no-PII rules, hostname preservation, and the Singapore investigation dimensions: source, medium, landing page, campaign, hour, user agent, server logs, and bot-control signals. Forbid filtering until the cause is proven and a rollback record exists.

- [ ] **Step 6: Verify and commit**

```bash
node --test src/data/public-seo-check.test.ts
GUIDE_REPO_PATH=/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide pnpm test
git diff --check
git add docs/operations/seo-post-deploy.md docs/analytics/ga4-measurement-plan.md scripts/check-public-seo.mjs src/data/public-seo-check.test.ts package.json
git commit -m "docs(seo): define external verification gates"
```

The production command is expected to fail until the hosting decision is implemented. That failure is evidence of the remaining external blocker, not a local test failure.
