import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { glossaryTerms } from '../data/glossary-data.ts'
import {
  assertUniqueGlossarySlugs,
  computePopoverPosition,
  createTooltipMatcher,
  enhanceGlossaryTooltips,
  normalizeGlossarySlug,
  resolveTooltipTerms,
  shouldEnrichTextNode,
  transitionTooltip,
} from './glossary-tooltips.ts'

function createDocument(markup: string): Document {
  const window = new Window()
  window.document.body.innerHTML = markup
  return window.document as unknown as Document
}

test('resolves the explicit tooltip allowlist from glossary definitions', () => {
  const terms = resolveTooltipTerms(glossaryTerms)

  assert.deepEqual(
    terms.map((term) => term.term),
    ['Agent harness', 'CLAUDE.md', 'Context window', 'Git worktree', 'Graph engineering', 'Harnessability', 'Hook', 'Judgment allocation', 'Loop engineering', 'MCP (Model Context Protocol)', 'Plan Mode', 'Prompt injection', 'Skill', 'Sub-agent'],
  )
  assert.ok(terms.every((term) => term.definition.length > 0))
})

test('normalizes a glossary term into the same route slug everywhere', () => {
  assert.equal(normalizeGlossarySlug('MCP (Model Context Protocol)'), 'mcp-model-context-protocol')
  assert.equal(normalizeGlossarySlug('CLAUDE.md'), 'claudemd')
})

test('fails closed when two glossary terms resolve to the same route slug', () => {
  assert.throws(
    () => assertUniqueGlossarySlugs([
      { term: 'Café' },
      { term: 'Cafe' },
    ]),
    /Duplicate glossary slug "cafe" for "Café" and "Cafe"/,
  )
  assert.throws(
    () => assertUniqueGlossarySlugs([{ term: '!!!' }]),
    /Glossary term "!!!" resolves to an empty slug/,
  )
})

test('matches whole terms only, preferring the longer allowlisted term', () => {
  const matcher = createTooltipMatcher([
    { term: 'Agent', definition: 'short', slug: 'agent' },
    { term: 'Agent harness', definition: 'long', slug: 'agent-harness' },
  ])

  const result = matcher.match('Agent harness helps an Agent, but not Agentic coding.')

  assert.deepEqual(result.matches.map((match) => match.term.term), ['Agent harness', 'Agent'])
  assert.equal(result.text, 'Agent harness helps an Agent, but not Agentic coding.')
})

test('preserves the exact casing found in source prose', () => {
  const matcher = createTooltipMatcher([
    { term: 'Skill', definition: 'A reusable capability.', slug: 'skill' },
  ])

  assert.equal(matcher.match('Use a skill here.').matches[0].matchedText, 'skill')
})

test('never enriches a text node below excluded or pre-existing interactive content', () => {
  assert.equal(shouldEnrichTextNode(['article', 'p']), true)
  assert.equal(shouldEnrichTextNode(['article', 'h2']), false)
  assert.equal(shouldEnrichTextNode(['article', 'a']), false)
  assert.equal(shouldEnrichTextNode(['article', 'pre', 'code']), false)
  assert.equal(shouldEnrichTextNode(['article', 'form', 'input']), false)
  assert.equal(shouldEnrichTextNode(['article', 'div[data-interactive]']), false)
  assert.equal(shouldEnrichTextNode(['article', 'figure.mermaid-diagram']), false)
})

test('enriches only each term first occurrence and stops at the page cap', () => {
  const matcher = createTooltipMatcher(
    Array.from({ length: 10 }, (_, index) => ({
      term: `Term ${index + 1}`,
      definition: String(index + 1),
      slug: `term-${index + 1}`,
    })),
  )

  const result = matcher.match('Term 1. Term 1. Term 2. Term 3. Term 4. Term 5. Term 6. Term 7. Term 8. Term 9. Term 10.')

  assert.deepEqual(result.matches.map((match) => match.term.term), [
    'Term 1', 'Term 2', 'Term 3', 'Term 4', 'Term 5', 'Term 6', 'Term 7', 'Term 8',
  ])
})

test('keeps one accessible tooltip open and closes it on Escape or an outside click', () => {
  let state = { openId: null as string | null }
  state = transitionTooltip(state, { type: 'open', id: 'tooltip-agent' })
  assert.equal(state.openId, 'tooltip-agent')

  state = transitionTooltip(state, { type: 'toggle', id: 'tooltip-hook' })
  assert.equal(state.openId, 'tooltip-hook')

  state = transitionTooltip(state, { type: 'escape' })
  assert.equal(state.openId, null)

  state = transitionTooltip({ openId: 'tooltip-skill' }, { type: 'outside-click' })
  assert.equal(state.openId, null)
})

test('enhances only eligible prose and keeps excluded content untouched', () => {
  const document = createDocument(`
    <main class="sl-markdown-content">
      <p>Agent harness improves a runtime. Agent harness appears twice.</p>
      <h2>Agent harness heading</h2>
      <a href="/elsewhere">Agent harness link</a>
      <code>Agent harness code</code>
      <div data-no-glossary>Agent harness opt-out</div>
      <div class="expressive-code">Agent harness code block</div>
    </main>
  `)

  enhanceGlossaryTooltips(document, [
    { term: 'Agent harness', definition: 'The runtime around a model.', slug: 'agent-harness' },
  ])

  assert.equal(document.querySelectorAll('.glossary-tooltip-trigger').length, 1)
  assert.equal(document.querySelector('h2')?.querySelector('.glossary-tooltip-trigger'), null)
  assert.equal(document.querySelector('a')?.querySelector('.glossary-tooltip-trigger'), null)
  assert.equal(document.querySelector('code')?.querySelector('.glossary-tooltip-trigger'), null)
  assert.equal(document.querySelector('[data-no-glossary]')?.querySelector('.glossary-tooltip-trigger'), null)
  assert.equal(document.querySelector('.expressive-code')?.querySelector('.glossary-tooltip-trigger'), null)
  assert.match(document.querySelector('p')?.textContent ?? '', /Agent harness.*Agent harness/)
})

test('supports focus, Escape focus restoration, taps, and outside-click closing', () => {
  const document = createDocument('<main class="sl-markdown-content"><p>Agent harness</p></main>')
  const view = document.defaultView
  assert.ok(view)

  enhanceGlossaryTooltips(document, [
    { term: 'Agent harness', definition: 'The runtime around a model.', slug: 'agent-harness' },
  ])

  const trigger = document.querySelector<HTMLButtonElement>('.glossary-tooltip-trigger')
  const popover = document.querySelector<HTMLElement>('.glossary-tooltip-popover')
  const link = document.querySelector<HTMLAnchorElement>('.glossary-tooltip-link')
  assert.ok(trigger)
  assert.ok(popover)
  assert.ok(link)

  trigger.focus()
  assert.equal(popover.hidden, false)
  assert.equal(trigger.getAttribute('aria-expanded'), 'true')

  link.focus()
  document.dispatchEvent(new view.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  assert.equal(popover.hidden, true)
  assert.equal(document.activeElement, trigger)

  trigger.dispatchEvent(new view.MouseEvent('click', { bubbles: true }))
  assert.equal(popover.hidden, false)
  document.body.dispatchEvent(new view.MouseEvent('click', { bubbles: true }))
  assert.equal(popover.hidden, true)
})

test('keeps the first pointer click open after the browser focuses the trigger', () => {
  const document = createDocument('<main class="sl-markdown-content"><p>Agent harness</p></main>')
  const view = document.defaultView
  assert.ok(view)
  enhanceGlossaryTooltips(document, [
    { term: 'Agent harness', definition: 'The runtime around a model.', slug: 'agent-harness' },
  ])
  const trigger = document.querySelector<HTMLButtonElement>('.glossary-tooltip-trigger')
  const popover = document.querySelector<HTMLElement>('.glossary-tooltip-popover')
  assert.ok(trigger)
  assert.ok(popover)

  trigger.dispatchEvent(new view.PointerEvent('pointerenter', { bubbles: true, pointerType: 'touch' }))
  trigger.dispatchEvent(new view.PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' }))
  trigger.focus()
  trigger.dispatchEvent(new view.MouseEvent('click', { bubbles: true }))
  assert.equal(popover.hidden, false)

  trigger.dispatchEvent(new view.PointerEvent('pointerdown', { bubbles: true }))
  trigger.dispatchEvent(new view.MouseEvent('click', { bubbles: true }))
  assert.equal(popover.hidden, true)
})

test('an old close timer cannot close a newly focused tooltip', async () => {
  const document = createDocument('<main class="sl-markdown-content"><p>Agent harness then Skill</p></main>')
  enhanceGlossaryTooltips(document, [
    { term: 'Agent harness', definition: 'The runtime around a model.', slug: 'agent-harness' },
    { term: 'Skill', definition: 'A reusable capability.', slug: 'skill' },
  ])
  const triggers = document.querySelectorAll<HTMLButtonElement>('.glossary-tooltip-trigger')
  const popovers = document.querySelectorAll<HTMLElement>('.glossary-tooltip-popover')
  assert.equal(triggers.length, 2)

  triggers[0].focus()
  triggers[0].dispatchEvent(new document.defaultView!.FocusEvent('focusout', { bubbles: true }))
  triggers[1].focus()
  await new Promise((resolve) => setTimeout(resolve, 160))

  assert.equal(popovers[0].hidden, true)
  assert.equal(popovers[1].hidden, false)
})

test('clamps a fixed popover within every viewport edge', () => {
  assert.deepEqual(
    computePopoverPosition(
      { left: 0, top: 20, right: 30, bottom: 40, width: 30 },
      { width: 320, height: 120 },
      { width: 375, height: 667 },
    ),
    { left: 16, top: 48, width: 320 },
  )
  assert.deepEqual(
    computePopoverPosition(
      { left: 360, top: 620, right: 375, bottom: 640, width: 15 },
      { width: 320, height: 120 },
      { width: 375, height: 667 },
    ),
    { left: 39, top: 492, width: 320 },
  )
})
