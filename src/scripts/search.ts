/**
 * Cmd+K search modal: results grouped by site section, one row per page with
 * its matching sections, a preview of the selected page, and category chips.
 * The scoring and grouping live in search-model.ts; this file only renders.
 */

import {
  buildSearchView,
  cycleFilters,
  groupLabel,
  highlightParts,
  isOffSite,
  normalizePayload,
  suggestQueries,
} from './search-model.ts'
import type { SearchEntry, SearchFilter, SearchPageHit, SearchPayload, SearchView } from './search-model.ts'

export { searchEntries } from './search-model.ts'
export type { SearchEntry, SearchPayload } from './search-model.ts'

const SVG_NS = 'http://www.w3.org/2000/svg'
const PREVIEW_SECTIONS = 6
const PREVIEW_RELATED = 3
const ROW_SECTIONS = 3

function externalIcon(doc: Document): SVGSVGElement {
  const svg = doc.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('class', 'search-external-icon')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '2')
  svg.setAttribute('width', '12')
  svg.setAttribute('height', '12')
  svg.setAttribute('aria-hidden', 'true')
  for (const d of ['M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6', 'M15 3h6v6', 'M10 14L21 3']) {
    const path = doc.createElementNS(SVG_NS, 'path')
    path.setAttribute('d', d)
    path.setAttribute('stroke-linecap', 'round')
    path.setAttribute('stroke-linejoin', 'round')
    svg.append(path)
  }
  return svg
}

const pages = (n: number) => `${n} ${n === 1 ? 'page' : 'pages'}`
const matches = (n: number) => `${n} ${n === 1 ? 'match' : 'matches'}`

function displayPath(url: string): string {
  if (!isOffSite(url)) return url
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/^github\.com\/FlorianBruniaux\/claude-code-ultimate-guide\/blob\/main\//, 'GitHub: ')
}

// The index is fetched on the first sign of search intent (open, hover or
// focus of the trigger), not on every page load. A failed fetch is retried
// on the next open, not on every keystroke.
export function initSearch(
  loadIndex: () => Promise<SearchPayload | SearchEntry[]>,
  doc: Document = document,
): void {
  const modal = doc.getElementById('search-modal')
  const input = doc.getElementById('search-input') as HTMLInputElement | null
  const resultsList = doc.getElementById('search-results')
  const trigger = doc.getElementById('search-trigger')
  const backdrop = doc.getElementById('search-backdrop')

  if (!modal || !input || !resultsList) return

  const searchModal = modal
  const searchInput = input
  const searchResults = resultsList
  const content = searchModal.querySelector<HTMLElement>('.search-modal-content')
  const chips = doc.getElementById('search-chips')
  const preview = doc.getElementById('search-preview')
  const totals = doc.getElementById('search-totals')
  const map = doc.getElementById('search-map')
  const clear = doc.getElementById('search-clear')

  let debounceTimer: ReturnType<typeof setTimeout>
  let payload: SearchPayload | null = null
  let pending: Promise<SearchPayload | null> | null = null
  let loadFailed = false
  let filter: SearchFilter = 'all'
  let view: SearchView | null = null
  let selected = -1

  function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
    const node = doc.createElement(tag)
    if (className) node.className = className
    if (text !== undefined) node.textContent = text
    return node
  }

  function highlighted(text: string, tokens: string[]): DocumentFragment {
    const fragment = doc.createDocumentFragment()
    for (const part of highlightParts(text, tokens)) {
      fragment.append(part.match ? el('mark', undefined, part.text) : doc.createTextNode(part.text))
    }
    return fragment
  }

  function link(url: string, className: string): HTMLAnchorElement {
    const anchor = el('a', className)
    anchor.href = url
    if (isOffSite(url)) {
      anchor.target = '_blank'
      anchor.rel = 'noopener noreferrer'
    }
    return anchor
  }

  function ensurePayload(): Promise<SearchPayload | null> {
    if (payload) return Promise.resolve(payload)
    if (loadFailed) return Promise.resolve(null)
    if (!pending) {
      pending = loadIndex()
        .then((loaded) => {
          payload = normalizePayload(loaded)
          return payload
        })
        .catch((error) => {
          console.error('[search] Failed to load search index:', error)
          loadFailed = true
          return null
        })
        .finally(() => { pending = null })
    }
    return pending
  }

  // ── Layout state ──────────────────────────────────────────────────────────
  function setState(state: 'map' | 'results' | 'message'): void {
    content?.setAttribute('data-state', state)
    if (map) map.hidden = state !== 'map'
    if (chips) chips.hidden = state !== 'results'
    if (preview) preview.hidden = state !== 'results'
    if (clear) clear.hidden = !searchInput.value
    if (state !== 'results') {
      view = null
      selected = -1
      searchInput.removeAttribute('aria-activedescendant')
      if (totals) totals.textContent = ''
      chips?.replaceChildren()
      preview?.replaceChildren()
    }
  }

  function message(...parts: Array<string | Node>): void {
    setState('message')
    const box = el('div', 'search-no-results')
    box.append(...parts)
    searchResults.replaceChildren(box)
  }

  function sitemapLink(): HTMLAnchorElement {
    const anchor = link('/sitemap/', 'search-inline-link')
    anchor.textContent = 'Browse all pages →'
    return anchor
  }

  // A failed index load is recoverable in place: retry, or browse the full page list.
  function retryButton(): HTMLButtonElement {
    const button = el('button', 'search-inline-link search-retry', 'Retry')
    button.type = 'button'
    button.addEventListener('click', () => {
      loadFailed = false
      message('Loading the search index…')
      void ensurePayload().then((loaded) => {
        if (loaded) render()
        else showLoadFailure()
      })
    })
    return button
  }

  function showLoadFailure(): void {
    message('Search is unavailable right now. ', retryButton(), ' ', sitemapLink())
  }

  function renderEmpty(): void {
    if (map) {
      setState('map')
      searchResults.replaceChildren()
    } else {
      message('Start typing to search…')
    }
  }

  // ── Results ───────────────────────────────────────────────────────────────
  function renderChips(current: SearchView): void {
    if (!chips) return
    chips.replaceChildren()
    for (const id of cycleFilters(current.counts)) {
      const chip = el('button', 'search-chip')
      chip.type = 'button'
      chip.setAttribute('aria-pressed', String(id === filter))
      chip.append(el('span', undefined, groupLabel(id)), el('span', 'search-chip-count', String(current.counts[id])))
      chip.addEventListener('click', () => {
        filter = id
        render()
        searchInput.focus()
      })
      chips.append(chip)
    }
  }

  function renderRow(hit: SearchPageHit, index: number, tokens: string[]): HTMLElement {
    const row = el('div', 'search-result-item')
    row.id = `search-option-${index}`
    row.setAttribute('role', 'option')
    row.setAttribute('aria-selected', 'false')
    row.dataset.index = String(index)
    row.dataset.url = hit.url
    row.dataset.source = hit.offSite ? 'github' : 'site'

    const main = el('div', 'search-result-main')
    const text = el('span', 'search-result-text')
    const title = el('span', 'search-result-title')
    title.append(highlighted(hit.title, tokens))
    if (hit.offSite) title.append(externalIcon(doc))
    text.append(title)
    if (hit.description) text.append(el('span', 'search-result-desc', hit.description))
    main.append(el('span', 'search-result-badge', hit.badge), text, el('span', 'search-result-category', hit.category))
    row.append(main)

    if (hit.sections.length) {
      const list = el('div', 'search-result-sections')
      for (const section of hit.sections.slice(0, ROW_SECTIONS)) {
        const item = el('span', 'search-result-section')
        item.dataset.url = section.url
        item.append(highlighted(section.title, tokens))
        item.addEventListener('click', (event) => {
          event.stopPropagation()
          if (wantsNewTab(event)) openInNewTab(section.url)
          else navigate(section.url)
        })
        item.addEventListener('auxclick', (event) => {
          event.stopPropagation()
          if (event.button === 1) openInNewTab(section.url)
        })
        list.append(item)
      }
      const extra = hit.sections.length - ROW_SECTIONS
      if (extra > 0) list.append(el('span', 'search-result-more', `+${extra} ${extra === 1 ? 'section' : 'sections'}`))
      row.append(list)
    }

    row.addEventListener('click', (event) => (wantsNewTab(event) ? openInNewTab(hit.url) : navigate(hit.url)))
    row.addEventListener('auxclick', (event) => {
      if (event.button === 1) openInNewTab(hit.url)
    })
    row.addEventListener('mousemove', () => {
      if (selected !== index) select(index, false)
    })
    return row
  }

  function renderResults(current: SearchView): void {
    setState('results')
    view = current
    if (totals) totals.textContent = `${pages(current.totalPages)} · ${matches(current.totalMatches)}`
    renderChips(current)

    if (!current.groups.length) {
      const box = el('div', 'search-no-results')
      box.append(`No match for “${current.query}” in ${groupLabel(filter)}. `)
      const back = el('button', 'search-inline-link', 'Back to All')
      back.type = 'button'
      back.addEventListener('click', () => {
        filter = 'all'
        render()
        searchInput.focus()
      })
      box.append(back)
      searchResults.replaceChildren(box)
      preview?.replaceChildren()
      return
    }

    const fragment = doc.createDocumentFragment()
    let index = 0
    for (const group of current.groups) {
      const box = el('section', 'search-group')
      box.dataset.group = group.id
      box.setAttribute('role', 'group')
      const head = el('div', 'search-group-head')
      const label = el('span', 'search-group-label', group.label)
      label.id = `search-group-${group.id}`
      box.setAttribute('aria-labelledby', label.id)
      head.append(label, el('span', 'search-group-sum', `${pages(group.pageCount)} · ${matches(group.matchCount)}`))
      const rows = el('div', 'search-group-rows')
      for (const hit of group.pages) rows.append(renderRow(hit, index++, current.tokens))
      box.append(head, rows)
      if (group.hidden > 0 && group.id !== 'best') {
        const more = el('button', 'search-see-all', `See all ${group.pageCount} results in ${group.label} →`)
        more.type = 'button'
        const target = group.id
        more.addEventListener('click', () => {
          filter = target
          render()
          searchInput.focus()
        })
        box.append(more)
      }
      fragment.append(box)
    }
    searchResults.replaceChildren(fragment)
    searchResults.scrollTop = 0
    select(0, false)
  }

  function renderPreview(hit: SearchPageHit | undefined): void {
    if (!preview) return
    preview.replaceChildren()
    if (!hit || !view) return

    const head = el('div', 'search-preview-head')
    head.append(
      el('span', 'search-preview-kicker', `${groupLabel(hit.group)} · ${hit.category}`),
      el('h2', 'search-preview-title', hit.title),
      el('span', 'search-preview-path', displayPath(hit.key)),
    )
    preview.append(head)

    if (hit.description) {
      const recap = el('div', 'search-preview-block')
      recap.append(el('span', 'search-preview-label', 'In short'), el('p', 'search-preview-recap', hit.description))
      preview.append(recap)
    }

    const facts = el('div', 'search-preview-facts')
    facts.append(el('span', 'search-preview-fact', matches(hit.matches)))
    if (hit.sections.length) facts.append(el('span', 'search-preview-fact', `${hit.sections.length} ${hit.sections.length === 1 ? 'section' : 'sections'}`))
    facts.append(el('span', 'search-preview-fact', hit.offSite ? 'Opens on GitHub' : 'On this site'))
    preview.append(facts)

    if (hit.sections.length) {
      const block = el('div', 'search-preview-block')
      block.append(el('span', 'search-preview-label', 'Matching sections'))
      for (const section of hit.sections.slice(0, PREVIEW_SECTIONS)) {
        const anchor = link(section.url, 'search-preview-section')
        anchor.append(highlighted(section.title, view.tokens))
        block.append(anchor)
      }
      const extra = hit.sections.length - PREVIEW_SECTIONS
      if (extra > 0) block.append(el('span', 'search-result-more', `+${extra} more`))
      preview.append(block)
    }

    const related = view.rows.filter((row) => row.group === hit.group && row.key !== hit.key).slice(0, PREVIEW_RELATED)
    if (related.length) {
      const block = el('div', 'search-preview-block')
      block.append(el('span', 'search-preview-label', `Also in ${groupLabel(hit.group)}`))
      for (const row of related) {
        const anchor = link(row.url, 'search-preview-related')
        anchor.textContent = row.title
        block.append(anchor)
      }
      preview.append(block)
    }

    const open = link(hit.url, 'search-preview-open')
    open.textContent = hit.offSite ? 'Open on GitHub ↵' : 'Open page ↵'
    preview.append(open)
  }

  function rowElements(): HTMLElement[] {
    return [...searchResults.querySelectorAll<HTMLElement>('.search-result-item')]
  }

  function select(index: number, scroll = true): void {
    const rows = rowElements()
    if (!rows.length || !view) return
    selected = Math.max(0, Math.min(index, rows.length - 1))
    rows.forEach((row, i) => {
      const active = i === selected
      row.setAttribute('aria-selected', String(active))
      if (active && scroll) row.scrollIntoView?.({ block: 'nearest' })
    })
    searchInput.setAttribute('aria-activedescendant', rows[selected].id)
    renderPreview(view.rows[selected])
  }

  // ── Search & render ───────────────────────────────────────────────────────
  function render(): void {
    const query = searchInput.value.trim()
    if (!query) {
      renderEmpty()
      return
    }

    if (!payload) {
      if (loadFailed) {
        showLoadFailure()
        return
      }
      message('Loading the search index…')
      void ensurePayload().then((loaded) => {
        if (loaded) render()
        else showLoadFailure()
      })
      return
    }

    const current = buildSearchView(payload, query, filter)
    if (current.totalPages === 0) {
      const parts: Array<string | Node> = [`No results for “${query}”. `, sitemapLink()]
      const suggestions = suggestQueries(payload.entries, query)
      if (suggestions.length) {
        parts.push(' Did you mean ')
        suggestions.forEach((suggestion, i) => {
          const button = el('button', 'search-inline-link', suggestion)
          button.type = 'button'
          button.addEventListener('click', () => {
            searchInput.value = suggestion
            filter = 'all'
            render()
            searchInput.focus()
          })
          parts.push(...(i ? [', ', button] : [button]))
        })
        parts.push('?')
      }
      message(...parts)
      return
    }
    renderResults(current)
  }

  // ── Modal lifecycle ───────────────────────────────────────────────────────
  // The control that opened the dialog gets the focus back when it closes.
  let opener: HTMLElement | null = null

  function openModal(): void {
    // Duck-typed: the document may come from another realm (tests run on happy-dom).
    const active = doc.activeElement as HTMLElement | null
    opener = active && active !== doc.body && typeof active.focus === 'function' ? active : null
    loadFailed = false
    void ensurePayload().then(() => {
      if (!searchModal.hasAttribute('hidden') && searchInput.value.trim()) render()
    })
    searchModal.removeAttribute('hidden')
    searchModal.setAttribute('aria-hidden', 'false')
    searchInput.value = ''
    filter = 'all'
    renderEmpty()
    searchInput.focus()
    doc.body.style.overflow = 'hidden'
  }

  function closeModal(): void {
    searchModal.setAttribute('hidden', '')
    searchModal.setAttribute('aria-hidden', 'true')
    doc.body.style.overflow = ''
    if (opener?.isConnected) opener.focus()
    opener = null
  }

  // CX-08: results are listbox options, not links; a modified or middle click
  // still opens them in a new tab, as a link would, and keeps the dialog open.
  function wantsNewTab(event: MouseEvent): boolean {
    return event.metaKey || event.ctrlKey || event.shiftKey
  }

  function openInNewTab(url: string | undefined): void {
    if (url) doc.defaultView?.open(url, '_blank', 'noopener,noreferrer')
  }

  function navigate(url: string | undefined): void {
    if (!url) return
    closeModal()
    const win = doc.defaultView
    if (!win) return
    if (isOffSite(url)) win.open(url, '_blank', 'noopener,noreferrer')
    else win.location.href = url
  }

  // ── Input & keyboard ──────────────────────────────────────────────────────
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    filter = 'all'
    if (clear) clear.hidden = !searchInput.value
    debounceTimer = setTimeout(render, 50)
  })

  searchInput.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        select(selected + 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        select(selected - 1)
        break
      case 'Enter': {
        e.preventDefault()
        const hit = view?.rows[Math.max(selected, 0)]
        if (hit) navigate(hit.url)
        break
      }
      case 'Tab': {
        if (!view) break
        const filters = cycleFilters(view.counts)
        if (filters.length < 2) break
        e.preventDefault()
        const step = e.shiftKey ? -1 : 1
        const at = Math.max(0, filters.indexOf(filter))
        filter = filters[(at + step + filters.length) % filters.length]
        render()
        break
      }
      case 'Escape':
        e.preventDefault()
        closeModal()
        break
    }
  })

  clear?.addEventListener('click', () => {
    searchInput.value = ''
    filter = 'all'
    renderEmpty()
    searchInput.focus()
  })

  // A preview or map link may point at the current page: close either way.
  preview?.addEventListener('click', (e) => {
    if ((e.target as Element | null)?.closest?.('a')) closeModal()
  })
  map?.addEventListener('click', (e) => {
    if ((e.target as Element | null)?.closest?.('a')) closeModal()
  })

  backdrop?.addEventListener('click', closeModal)
  // Visible close control in the modal header (portfolio search layout).
  doc.getElementById('search-close')?.addEventListener('click', closeModal)

  doc.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchModal.hasAttribute('hidden') ? openModal() : closeModal()
    }
    if (e.key === 'Escape' && !searchModal.hasAttribute('hidden')) closeModal()
  })

  trigger?.addEventListener('click', () => openModal())
  trigger?.addEventListener('pointerenter', () => { void ensurePayload() }, { once: true })
  trigger?.addEventListener('focus', () => { void ensurePayload() }, { once: true })

  renderEmpty()
}
