# Context Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/context/` as a compact, accessible configurator journey with a visual system flow and maturity ladder while preserving every generated output.

**Architecture:** Keep `src/data/context-data.ts` as the generation and maturity source. Move browser state into one tested script, render the configurator and explanatory sections as focused Astro components, and compose them from a short route file with page-specific CSS.

**Tech Stack:** Astro 5, TypeScript 5.9, native DOM APIs, Node test runner, happy-dom, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-08-31-context-security-redesign-design.md`

## Global Constraints

- `/context/` remains the only Context route.
- Preserve personalized `CLAUDE.md`, maturity level, next steps, and optional team profile output.
- `src/data/context-data.ts` owns options, generators, and maturity rules.
- Essential explanations and maturity levels remain readable without JavaScript.
- Copy failure leaves generated text selectable and produces visible feedback.
- One H1, logical heading order, keyboard access, visible focus, 44px mobile targets, and no overflow at 390px.
- Light mode, dark mode, and reduced-motion preferences must work.
- Use the compact footer.
- Preserve unrelated worktree changes and stage explicit pathspecs only.

---

## File map

- Modify `src/data/context-data.ts`: export shared answer types used by generators and the client controller.
- Create `src/data/context-page.ts`: own the local navigation and four-step context-system presentation model.
- Create `src/data/context-page.test.ts`: protect unique anchors, guide destinations, and maturity ordering.
- Create `src/scripts/context-configurator.ts`: own step state, validation, result generation, maturity highlighting, and clipboard feedback.
- Create `src/scripts/context-configurator.test.ts`: exercise the controller in happy-dom.
- Create `src/components/context/ContextHero.astro`: render hero copy and configurator card.
- Create `src/components/context/ContextConfigurator.astro`: render all questions and result containers from canonical data.
- Create `src/components/context/ContextSubnav.astro`: render the local anchor navigation.
- Create `src/components/context/ContextSystemFlow.astro`: render the four connected context stages.
- Create `src/components/context/ContextMaturityLadder.astro`: render all five levels and highlight the calculated level.
- Create `src/components/context/ContextNextStep.astro`: render the two terminal actions.
- Create `src/styles/context-page.css`: own Context layout, state, theme, responsive, and focus rules.
- Replace `src/pages/context/index.astro`: compose components, metadata, JSON-LD, and the compact footer.

---

### Task 1: Canonical Context presentation model

**Files:**
- Modify: `src/data/context-data.ts`
- Create: `src/data/context-page.ts`
- Test: `src/data/context-page.test.ts`

**Interfaces:**
- Produces: `ContextAnswers`, `PartialContextAnswers`, `CONTEXT_NAV_ITEMS`, and `CONTEXT_SYSTEM_STAGES`.
- Consumes: the existing `MATURITY_LEVELS` array and generator functions.

- [ ] **Step 1: Write the failing model tests**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { MATURITY_LEVELS } from './context-data.ts'
import { CONTEXT_NAV_ITEMS, CONTEXT_SYSTEM_STAGES } from './context-page.ts'

test('context navigation targets each major page section once', () => {
  assert.deepEqual(CONTEXT_NAV_ITEMS.map((item) => item.href), [
    '#configure', '#understand', '#maturity', '#full-guide',
  ])
  assert.equal(new Set(CONTEXT_NAV_ITEMS.map((item) => item.href)).size, 4)
})

test('context system stages form the approved four-step flow', () => {
  assert.deepEqual(CONTEXT_SYSTEM_STAGES.map((item) => item.id), [
    'claude-md', 'modular-rules', 'role-profiles', 'ci-feedback',
  ])
  assert.ok(CONTEXT_SYSTEM_STAGES.every((item) => item.guideHref.startsWith('/')))
})

test('maturity levels remain ordered from L1 through L5', () => {
  assert.deepEqual(MATURITY_LEVELS.map((item) => item.level), [1, 2, 3, 4, 5])
})
```

- [ ] **Step 2: Run the tests and confirm the missing module failure**

Run: `rtk pnpm test -- src/data/context-page.test.ts`

Expected: FAIL because `context-page.ts` does not exist.

- [ ] **Step 3: Export the shared answer types and create the page model**

```ts
export interface ContextAnswers {
  teamSize: string
  aiTools: string[]
  claudeMdStatus: string
  rulesFiles: string
  stack: string
  frontend: string
}

export type PartialContextAnswers = Partial<ContextAnswers>
```

```ts
export const CONTEXT_NAV_ITEMS = [
  { href: '#configure', label: 'Configure' },
  { href: '#understand', label: 'Understand' },
  { href: '#maturity', label: 'Maturity' },
  { href: '#full-guide', label: 'Full guide' },
] as const

export const CONTEXT_SYSTEM_STAGES = [
  { id: 'claude-md', title: 'CLAUDE.md', guideHref: '/claude-md-best-practices/' },
  { id: 'modular-rules', title: 'Modular rules', guideHref: '/guide/context-engineering/' },
  { id: 'role-profiles', title: 'Role profiles', guideHref: '/roles/' },
  { id: 'ci-feedback', title: 'CI feedback', guideHref: '/guide/context-engineering/#10-signal-taxonomy-and-causal-attribution' },
] as const
```

Add the approved short descriptions to each stage in the same model. Change the generator signatures to use `Pick<ContextAnswers, ...>` instead of repeating inline object types.

- [ ] **Step 4: Run the model tests**

Run: `rtk pnpm test -- src/data/context-page.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the data boundary**

```bash
git add src/data/context-data.ts src/data/context-page.ts src/data/context-page.test.ts
git commit -m "refactor: define context page model"
```

### Task 2: Tested configurator controller

**Files:**
- Create: `src/scripts/context-configurator.ts`
- Test: `src/scripts/context-configurator.test.ts`

**Interfaces:**
- Consumes: `ContextAnswers`, `generateClaudeMd`, `generateProfileYaml`, `calculateMaturityLevel`.
- Produces: `initContextConfigurator(root?: ParentNode): void`.

- [ ] **Step 1: Write failing controller tests**

Create a happy-dom fixture with one `[data-context-configurator]`, three `[data-context-step]` panels, required radio inputs, result outputs, maturity items, and copy controls.

```ts
test('advances only when the current required answers exist', () => {
  const document = createConfigurator()
  initContextConfigurator(document)
  document.querySelector<HTMLButtonElement>('[data-context-next]')?.click()
  assert.equal(document.querySelector('[data-context-error]')?.textContent, 'Choose a team size to continue.')
  assert.equal(activeStep(document), 'profile')
})

test('renders generated files and highlights the calculated maturity level', () => {
  const document = createCompletedConfigurator()
  initContextConfigurator(document)
  submitAllSteps(document)
  assert.match(document.querySelector('[data-context-claude-md]')?.textContent ?? '', /# CLAUDE\.md/)
  assert.equal(document.querySelector('[data-context-maturity="3"]')?.getAttribute('data-current'), 'true')
})

test('shows clipboard failure while keeping generated output visible', async () => {
  const document = createCompletedConfigurator({ clipboardRejects: true })
  initContextConfigurator(document)
  submitAllSteps(document)
  document.querySelector<HTMLButtonElement>('[data-copy-target="claude-md"]')?.click()
  await Promise.resolve()
  assert.equal(document.querySelector('[data-copy-status="claude-md"]')?.textContent, 'Copy failed. Select the text manually.')
  assert.ok(document.querySelector('[data-context-claude-md]')?.textContent)
})
```

- [ ] **Step 2: Run the controller tests and confirm failure**

Run: `rtk pnpm test -- src/scripts/context-configurator.test.ts`

Expected: FAIL because `initContextConfigurator` does not exist.

- [ ] **Step 3: Implement the controller**

```ts
export function initContextConfigurator(root: ParentNode = document) {
  for (const form of root.querySelectorAll<HTMLElement>('[data-context-configurator]')) {
    if (form.dataset.ready === 'true') continue
    form.dataset.ready = 'true'
    const state = createState(form)
    bindStepControls(form, state)
    bindCopyControls(form)
    renderStep(form, state)
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initContextConfigurator())
}
```

Implement `createState`, current-step validation, answer collection, generated output rendering, maturity highlighting, restart, and clipboard status as private functions. Move no presentation strings into the controller except validation and live-status messages.

- [ ] **Step 4: Run the controller and existing Context data tests**

Run: `rtk pnpm test -- src/scripts/context-configurator.test.ts src/data/context-page.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the controller**

```bash
git add src/scripts/context-configurator.ts src/scripts/context-configurator.test.ts
git commit -m "feat: add tested context configurator"
```

### Task 3: Context Astro components and page styles

**Files:**
- Create: `src/components/context/ContextHero.astro`
- Create: `src/components/context/ContextConfigurator.astro`
- Create: `src/components/context/ContextSubnav.astro`
- Create: `src/components/context/ContextSystemFlow.astro`
- Create: `src/components/context/ContextMaturityLadder.astro`
- Create: `src/components/context/ContextNextStep.astro`
- Create: `src/styles/context-page.css`

**Interfaces:**
- Consumes: canonical Context arrays and the data attributes required by `initContextConfigurator`.
- Produces: server-rendered content with stable `configure`, `understand`, `maturity`, and `full-guide` anchors.

- [ ] **Step 1: Add a structural source test**

Add `src/data/context-route.test.ts` that reads the planned component and route files.

```ts
test('context sections expose stable navigation targets', () => {
  const sources = readContextSources()
  for (const id of ['configure', 'understand', 'maturity', 'full-guide']) {
    assert.match(sources, new RegExp(`id=["']${id}["']`))
  }
})

test('the configurator renders options from canonical arrays', () => {
  const source = readFileSync(resolve(ROOT, 'src/components/context/ContextConfigurator.astro'), 'utf8')
  for (const exportName of ['TEAM_SIZE_OPTIONS', 'AI_TOOLS_OPTIONS', 'CLAUDE_MD_STATUS_OPTIONS', 'RULES_FILES_OPTIONS', 'STACK_OPTIONS', 'FRONTEND_OPTIONS']) {
    assert.match(source, new RegExp(exportName))
  }
})
```

- [ ] **Step 2: Run the source tests and confirm missing components**

Run: `rtk pnpm test -- src/data/context-route.test.ts`

Expected: FAIL because the component files do not exist.

- [ ] **Step 3: Render the components with progressive enhancement**

`ContextConfigurator.astro` renders every option from the imported arrays, native form controls, hidden step panels, result `<pre>` elements, live status regions, and a non-script fallback link to the guide.

```astro
<div class="context-configurator" data-context-configurator>
  <form data-context-form novalidate>
    {STEPS.slice(0, 3).map((step, index) => (
      <fieldset data-context-step={step.id} hidden={index !== 0}>
        <legend>{step.title}</legend>
        {step.id === 'profile' && TEAM_SIZE_OPTIONS.map((option) => (
          <label><input type="radio" name="teamSize" value={option.value} /> {option.label}</label>
        ))}
        {step.id === 'current' && CLAUDE_MD_STATUS_OPTIONS.map((option) => (
          <label><input type="radio" name="claudeMdStatus" value={option.value} /> {option.label}</label>
        ))}
        {step.id === 'stack' && STACK_OPTIONS.map((option) => (
          <label><input type="radio" name="stack" value={option.value} /> {option.label}</label>
        ))}
      </fieldset>
    ))}
    <p class="context-error" data-context-error role="alert"></p>
  </form>
  <section data-context-results hidden aria-live="polite">
    <pre tabindex="0" data-context-claude-md></pre>
    <pre tabindex="0" data-context-profile></pre>
  </section>
</div>
<script>
  import '../../scripts/context-configurator.ts'
</script>
```

Use visible labels for all inputs and copy buttons. `ContextMaturityLadder.astro` renders `data-context-maturity={level.level}` on each level so the controller can set `data-current="true"`.

- [ ] **Step 4: Add responsive and theme-aware CSS**

Use a two-column hero above 900px and one column below it. Set `min-height: 44px` on mobile controls, `overflow-x: auto` on local navigation, `scroll-margin-top` on anchored sections, explicit focus-visible outlines, and reduced-motion overrides. Use only existing CSS variables for theme colors.

- [ ] **Step 5: Run Context source and controller tests**

Run: `rtk pnpm test -- src/data/context-route.test.ts src/scripts/context-configurator.test.ts src/data/context-page.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the component layer**

```bash
git add src/components/context src/styles/context-page.css src/data/context-route.test.ts
git commit -m "feat: build context journey components"
```

### Task 4: Compose and verify `/context/`

**Files:**
- Replace: `src/pages/context/index.astro`
- Modify: `astro.config.mjs`
- Modify: `src/pages/sitemap/index.astro`
- Modify: `src/data/sitemap-page.test.ts`

**Interfaces:**
- Consumes: all Context components and `CONTEXT_NAV_ITEMS`.
- Produces: the final `/context/` route with canonical metadata, JSON-LD, and compact footer.

- [ ] **Step 1: Extend sitemap tests for Context**

```ts
test('keeps a stable lastmod date for the Context configurator', () => {
  assert.match(sitemapConfig, /'https:\/\/cc\.bruniaux\.com\/context\/': '2026-08-31'/)
})
```

Keep `/context/` in the HTML sitemap and change its description to the configurator outcome.

- [ ] **Step 2: Run the sitemap test and confirm failure**

Run: `rtk pnpm test -- src/data/sitemap-page.test.ts`

Expected: FAIL because `PAGE_DATES` has no `/context/` entry.

- [ ] **Step 3: Replace the monolithic route with composition**

```astro
---
import Layout from '../../layouts/Layout.astro'
import ContextHero from '../../components/context/ContextHero.astro'
import ContextSubnav from '../../components/context/ContextSubnav.astro'
import ContextSystemFlow from '../../components/context/ContextSystemFlow.astro'
import ContextMaturityLadder from '../../components/context/ContextMaturityLadder.astro'
import ContextNextStep from '../../components/context/ContextNextStep.astro'
import '../../styles/context-page.css'
---

<Layout title={title} description={description} ogType="article" jsonLd={jsonLd} compactFooter>
  <ContextHero />
  <ContextSubnav />
  <main>
    <ContextSystemFlow />
    <ContextMaturityLadder />
    <ContextNextStep />
  </main>
</Layout>
```

Use `Context Engineering for Claude Code | Claude Code Guide` as the unique title subject and a description that states the generated outputs. Add the stable `/context/` date to `PAGE_DATES`.

- [ ] **Step 4: Run all automated Context checks**

Run: `rtk pnpm test -- src/data/context-page.test.ts src/data/context-route.test.ts src/scripts/context-configurator.test.ts src/data/sitemap-page.test.ts`

Expected: PASS.

Run: `rtk pnpm check`

Expected: exit 0 with no new Context diagnostics.

Run: `rtk pnpm build`

Expected: exit 0 and `/context/index.html` generated.

- [ ] **Step 5: Verify in the browser**

At desktop and 390px mobile widths, test light and dark modes. Complete the configurator for solo and team answers. Verify generated `CLAUDE.md`, optional profile visibility, maturity highlighting, restart, copy success, keyboard order, focus visibility, local anchors, compact footer, and no horizontal overflow. Record console errors and warnings.

- [ ] **Step 6: Commit the route**

```bash
git add src/pages/context/index.astro astro.config.mjs src/pages/sitemap/index.astro src/data/sitemap-page.test.ts
git commit -m "feat: redesign context page"
```
