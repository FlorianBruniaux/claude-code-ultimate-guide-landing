/**
 * Shared filter behaviour for the /token-savings/ page.
 *
 * The pure functions (matching, sorting, limiting, labels) carry no DOM and are unit tested.
 * The init functions wire them to markup that declares its data in `data-*` attributes.
 * Without JS the markup stays fully readable: controls are hidden until `data-ready` is set.
 */

export type SortKey = 'name' | 'stars' | 'results'

export interface FilterItem {
  name: string
  search: string
  mech: string
  measured: boolean
  stars: number
  results: number
}

export interface FilterState {
  query: string
  mech: string
  measuredOnly: boolean
  sort: SortKey
  showAll: boolean
}

export const PAGE_SIZE = 15

export const DEFAULT_STATE: FilterState = { query: '', mech: 'all', measuredOnly: false, sort: 'name', showAll: false }

export function matches(item: FilterItem, state: FilterState): boolean {
  const q = state.query.trim().toLowerCase()
  if (q && !item.search.includes(q)) return false
  if (state.mech !== 'all' && item.mech !== state.mech) return false
  if (state.measuredOnly && !item.measured) return false
  return true
}

/** Stable comparators. Ties fall back to the name so the order never depends on input order. */
export function compareItems(sort: SortKey): (a: FilterItem, b: FilterItem) => number {
  const byName = (a: FilterItem, b: FilterItem) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
  if (sort === 'stars') return (a, b) => b.stars - a.stars || byName(a, b)
  if (sort === 'results') return (a, b) => b.results - a.results || byName(a, b)
  return byName
}

export interface FilterResult {
  /** Indexes into the input array, in display order, for every matching item. */
  order: number[]
  /** Indexes of the items to show (the first PAGE_SIZE unless showAll). */
  visible: Set<number>
  matched: number
}

export function applyFilter(items: FilterItem[], state: FilterState, pageSize = PAGE_SIZE): FilterResult {
  const cmp = compareItems(state.sort)
  const order = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => matches(item, state))
    .sort((a, b) => cmp(a.item, b.item))
    .map(({ index }) => index)
  const shown = state.showAll ? order : order.slice(0, pageSize)
  return { order, visible: new Set(shown), matched: order.length }
}

export function countLabel(shown: number, matched: number, total: number, noun = 'tools'): string {
  if (matched === 0) return `No ${noun} match. Reset the filters.`
  const filtered = matched === total ? '' : `, filtered from ${total}`
  return `Showing ${shown} of ${matched} ${noun}${filtered}.`
}

export function readItem(el: HTMLElement): FilterItem {
  const d = el.dataset
  return {
    name: d.name ?? '',
    search: (d.search ?? '').toLowerCase(),
    mech: d.mech ?? '',
    measured: d.measured === 'yes',
    stars: Number(d.stars ?? -1),
    results: Number(d.results ?? 0),
  }
}

/** Catalogue filter: search, mechanism, measured toggle, sort, page limit, hash deep link. */
export function initCatalogFilter(root: HTMLElement): void {
  const list = root.querySelector<HTMLElement>('[data-list]')
  const search = root.querySelector<HTMLInputElement>('[data-ctl-search]')
  const mech = root.querySelector<HTMLSelectElement>('[data-ctl-mech]')
  const measured = root.querySelector<HTMLInputElement>('[data-measured-only]')
  const sort = root.querySelector<HTMLSelectElement>('[data-ctl-sort]')
  const count = root.querySelector<HTMLElement>('[data-count]')
  const empty = root.querySelector<HTMLElement>('[data-empty]')
  const more = root.querySelector<HTMLButtonElement>('[data-more]')
  const reset = root.querySelector<HTMLButtonElement>('[data-reset]')
  if (!list || !search || !mech || !measured || !sort || !count || !empty || !more || !reset) return

  const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-item]'))
  const items = rows.map(readItem)
  const state: FilterState = { ...DEFAULT_STATE }

  const render = () => {
    const result = applyFilter(items, state)
    result.order.forEach((index) => list.appendChild(rows[index]))
    rows.forEach((row, index) => {
      row.hidden = !result.visible.has(index)
    })
    const shown = result.visible.size
    count.textContent = countLabel(shown, result.matched, items.length)
    empty.hidden = result.matched !== 0
    const remaining = result.matched - shown
    more.hidden = remaining <= 0
    more.textContent = `Show all ${result.matched}`
    reset.hidden = JSON.stringify({ ...state, showAll: false }) === JSON.stringify(DEFAULT_STATE)
  }

  search.addEventListener('input', () => { state.query = search.value; state.showAll = false; render() })
  mech.addEventListener('change', () => { state.mech = mech.value; state.showAll = false; render() })
  measured.addEventListener('change', () => { state.measuredOnly = measured.checked; state.showAll = false; render() })
  sort.addEventListener('change', () => { state.sort = sort.value as SortKey; render() })
  more.addEventListener('click', () => { state.showAll = true; render() })
  reset.addEventListener('click', () => {
    Object.assign(state, DEFAULT_STATE)
    search.value = ''
    mech.value = 'all'
    measured.checked = false
    sort.value = DEFAULT_STATE.sort
    render()
    search.focus()
  })

  const openFromHash = () => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id.startsWith('tool-')) return
    const target = rows.find((row) => row.id === id)
    if (!target) return
    // A deep link must always land on a visible row, whatever the filters were.
    if (target.hidden) {
      Object.assign(state, DEFAULT_STATE, { showAll: true })
      search.value = ''
      mech.value = 'all'
      measured.checked = false
      sort.value = DEFAULT_STATE.sort
      render()
    }
    const details = target.querySelector('details')
    if (details) details.open = true
    target.scrollIntoView({ block: 'start' })
  }

  root.setAttribute('data-ready', '')
  render()
  openFromHash()
  window.addEventListener('hashchange', openFromHash)
}

/**
 * Study filter for the results chart: chips highlight the dots of one study and dim the rest.
 * Rows are never hidden, so the axis and every tool stay in place.
 */
export function initHighlight(root: HTMLElement): void {
  const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-bench-chip]'))
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-bench]'))
  const status = root.querySelector<HTMLElement>('[data-highlight-status]')
  if (chips.length === 0) return
  // A result can draw two dots (two runs or settings): count results, not dots.
  const total = new Set(dots.map((d) => d.dataset.m)).size
  const apply = (bench: string) => {
    const on = new Set<string | undefined>()
    for (const dot of dots) {
      const match = !bench || dot.dataset.bench === bench
      dot.toggleAttribute('data-dim', !match)
      if (match) on.add(dot.dataset.m)
    }
    root.toggleAttribute('data-highlighting', Boolean(bench))
    for (const chip of chips) chip.setAttribute('aria-pressed', String((chip.dataset.benchChip ?? '') === bench))
    if (status) status.textContent = bench ? `Highlighting ${on.size} of ${total} results.` : `Showing all ${total} results.`
  }
  for (const chip of chips) chip.addEventListener('click', () => apply(chip.dataset.benchChip ?? ''))
  root.setAttribute('data-ready', '')
}
