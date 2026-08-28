import type { GlossaryTerm } from '../data/glossary-data.ts'

export interface TooltipTerm {
  term: string
  definition: string
  slug: string
}

const TOOLTIP_ALLOWLIST = [
  'Agent harness',
  'CLAUDE.md',
  'Context window',
  'Git worktree',
  'Hook',
  'MCP (Model Context Protocol)',
  'Plan Mode',
  'Prompt injection',
  'Skill',
  'Sub-agent',
] as const

const MAX_TOOLTIPS_PER_PAGE = 8

export function normalizeGlossarySlug(term: string): string {
  return term
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function resolveTooltipTerms(terms: GlossaryTerm[]): TooltipTerm[] {
  const definitions = new Map(terms.map((term) => [term.term, term]))

  return TOOLTIP_ALLOWLIST.map((term) => {
    const definition = definitions.get(term)
    if (!definition?.definition.trim()) {
      throw new Error(`Tooltip allowlist term is missing a glossary definition: ${term}`)
    }

    return {
      term: definition.term,
      definition: definition.definition,
      slug: normalizeGlossarySlug(definition.term),
    }
  })
}

export interface TooltipMatch {
  start: number
  end: number
  term: TooltipTerm
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function createTooltipMatcher(terms: TooltipTerm[], cap = MAX_TOOLTIPS_PER_PAGE) {
  const termsByText = new Map(terms.map((term) => [term.term.toLocaleLowerCase(), term]))
  const alternatives = [...termsByText.keys()]
    .sort((left, right) => right.length - left.length)
    .map(escapeRegExp)
    .join('|')
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_-])(${alternatives})(?![\\p{L}\\p{N}_-])`, 'giu')
  const matchedTerms = new Set<string>()
  let matchedCount = 0

  return {
    match(text: string): { text: string; matches: TooltipMatch[] } {
      const matches: TooltipMatch[] = []
      pattern.lastIndex = 0

      for (let found = pattern.exec(text); found; found = pattern.exec(text)) {
        const term = termsByText.get(found[1].toLocaleLowerCase())
        if (!term || matchedCount >= cap || matchedTerms.has(term.term)) continue

        matchedTerms.add(term.term)
        matchedCount += 1
        matches.push({ start: found.index, end: found.index + found[0].length, term })
      }

      return { text, matches }
    },
  }
}

const EXCLUDED_ANCESTORS = new Set([
  'a', 'button', 'code', 'details', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'input',
  'kbd', 'label', 'option', 'pre', 'samp', 'select', 'summary', 'textarea', 'svg',
])

export function shouldEnrichTextNode(ancestors: string[]): boolean {
  return !ancestors.some((ancestor) =>
    EXCLUDED_ANCESTORS.has(ancestor) ||
    ancestor.includes('[data-interactive]') ||
    ancestor.includes('[role=') ||
    ancestor.includes('[tabindex]') ||
    ancestor.includes('[contenteditable]') ||
    ancestor.includes('.mermaid-diagram'),
  )
}

function isEligibleTextNode(node: Text): boolean {
  if (!node.nodeValue?.trim()) return false

  const ancestor = node.parentElement
  if (!ancestor) return false

  const excluded = ancestor.closest(
    'a, button, code, details, form, h1, h2, h3, h4, h5, h6, input, kbd, label, option, pre, samp, select, summary, textarea, svg, [data-interactive], [role], [tabindex], [contenteditable], .mermaid-diagram',
  )
  if (!excluded) return true

  if (excluded.classList.contains('mermaid-diagram')) return shouldEnrichTextNode(['figure.mermaid-diagram'])
  if (excluded.hasAttribute('data-interactive')) return shouldEnrichTextNode(['div[data-interactive]'])
  if (excluded.hasAttribute('role')) return shouldEnrichTextNode(['div[role=button]'])
  if (excluded.hasAttribute('tabindex')) return shouldEnrichTextNode(['div[tabindex]'])
  if (excluded.hasAttribute('contenteditable')) return shouldEnrichTextNode(['div[contenteditable]'])
  return shouldEnrichTextNode([excluded.tagName.toLocaleLowerCase()])
}

export type TooltipEvent =
  | { type: 'open'; id: string }
  | { type: 'toggle'; id: string }
  | { type: 'close' | 'escape' | 'outside-click' }

export function transitionTooltip(
  state: { openId: string | null },
  event: TooltipEvent,
): { openId: string | null } {
  if (event.type === 'open') return { openId: event.id }
  if (event.type === 'toggle') return { openId: state.openId === event.id ? null : event.id }
  return { openId: null }
}

function createTooltip(document: Document, match: TooltipMatch, index: number): HTMLElement {
  const id = `glossary-tooltip-${index}`
  const wrapper = document.createElement('span')
  wrapper.className = 'glossary-tooltip'

  const trigger = document.createElement('button')
  trigger.type = 'button'
  trigger.className = 'glossary-tooltip-trigger'
  trigger.textContent = match.term.term
  trigger.setAttribute('aria-expanded', 'false')
  trigger.setAttribute('aria-controls', id)
  trigger.setAttribute('aria-label', `Read glossary definition for ${match.term.term}`)

  const popover = document.createElement('span')
  popover.className = 'glossary-tooltip-popover'
  popover.id = id
  popover.setAttribute('role', 'dialog')
  popover.setAttribute('aria-label', `Definition of ${match.term.term}`)
  popover.hidden = true

  const definition = document.createElement('span')
  definition.className = 'glossary-tooltip-definition'
  definition.textContent = match.term.definition
  const link = document.createElement('a')
  link.href = `/glossary/${match.term.slug}/`
  link.textContent = 'Open glossary'
  link.className = 'glossary-tooltip-link'

  popover.append(definition, link)
  wrapper.append(trigger, popover)
  return wrapper
}

function replaceTextNode(document: Document, node: Text, matches: TooltipMatch[], offset: number): number {
  const fragment = document.createDocumentFragment()
  let cursor = 0
  let nextOffset = offset

  for (const match of matches) {
    fragment.append(document.createTextNode(node.data.slice(cursor, match.start)))
    fragment.append(createTooltip(document, match, nextOffset))
    nextOffset += 1
    cursor = match.end
  }
  fragment.append(document.createTextNode(node.data.slice(cursor)))
  node.replaceWith(fragment)
  return nextOffset
}

function bindTooltipInteractions(document: Document) {
  let state = { openId: null as string | null }
  const applyState = (event: TooltipEvent) => {
    state = transitionTooltip(state, event)
    document.querySelectorAll<HTMLElement>('.glossary-tooltip-popover').forEach((popover) => {
      const isOpen = popover.id === state.openId
      popover.hidden = !isOpen
      popover.previousElementSibling?.setAttribute('aria-expanded', String(isOpen))
    })
  }

  document.querySelectorAll<HTMLElement>('.glossary-tooltip').forEach((tooltip) => {
    const trigger = tooltip.querySelector<HTMLButtonElement>('.glossary-tooltip-trigger')
    const popover = tooltip.querySelector<HTMLElement>('.glossary-tooltip-popover')
    if (!trigger || !popover) return

    let closeTimer: number | undefined
    const open = () => {
      if (closeTimer !== undefined) window.clearTimeout(closeTimer)
      applyState({ type: 'open', id: popover.id })
    }
    const close = () => applyState({ type: 'close' })
    const scheduleClose = () => {
      closeTimer = window.setTimeout(close, 120)
    }
    trigger.addEventListener('pointerenter', open)
    trigger.addEventListener('focus', open)
    trigger.addEventListener('pointerleave', scheduleClose)
    trigger.addEventListener('focusout', scheduleClose)
    popover.addEventListener('pointerenter', open)
    popover.addEventListener('pointerleave', scheduleClose)
    popover.addEventListener('focusin', open)
    popover.addEventListener('focusout', scheduleClose)
    trigger.addEventListener('click', () => applyState({ type: 'toggle', id: popover.id }))
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        applyState({ type: 'toggle', id: popover.id })
      }
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') applyState({ type: 'escape' })
  })
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('.glossary-tooltip')) {
      applyState({ type: 'outside-click' })
    }
  })
}

export function enhanceGlossaryTooltips(document: Document, terms: TooltipTerm[]): void {
  const matcher = createTooltipMatcher(terms)
  let tooltipIndex = 1

  document.querySelectorAll<HTMLElement>('.sl-markdown-content').forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (isEligibleTextNode(node as Text)) nodes.push(node as Text)
    }

    for (const node of nodes) {
      const { matches } = matcher.match(node.data)
      if (matches.length > 0) tooltipIndex = replaceTextNode(document, node, matches, tooltipIndex)
    }
  })

  bindTooltipInteractions(document)
}

export function initGlossaryTooltips(document: Document, terms: TooltipTerm[]): void {
  const enhance = () => enhanceGlossaryTooltips(document, terms)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance, { once: true })
  else enhance()
}
