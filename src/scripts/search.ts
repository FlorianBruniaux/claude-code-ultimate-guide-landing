/**
 * Client-side search engine for the Cmd+K search modal
 * No external dependencies — pure TypeScript
 */

export interface SearchEntry {
  id: string
  title: string
  keywords: string
  category: string
  url: string
  source: 'landing' | 'guide'
}

/**
 * Score an entry against the query. Returns 0 if no match.
 * Higher = more relevant.
 */
function score(entry: SearchEntry, query: string): number {
  const q = query.toLowerCase().trim()
  if (!q) return 0

  const title = entry.title.toLowerCase()
  const keywords = entry.keywords.toLowerCase()
  const category = entry.category.toLowerCase()

  // Exact title match
  if (title === q) return 100

  // Title starts with query
  if (title.startsWith(q)) return 90

  // Word boundary in title (regex, escaped)
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  try {
    const wordBoundary = new RegExp(`\\b${escaped}`)
    if (wordBoundary.test(title)) return 80
  } catch (_) {}

  // Title contains query
  if (title.includes(q)) return 70

  // Multi-word: all words present in title
  const words = q.split(/\s+/).filter(Boolean)
  if (words.length > 1) {
    if (words.every(w => title.includes(w))) return 65
    if (words.every(w => keywords.includes(w))) return 55
  }

  // Query in keywords
  if (keywords.includes(q)) return 50

  // Query in category
  if (category.includes(q)) return 40

  // Any single word hits
  if (words.some(w => w.length > 2 && title.includes(w))) return 30
  if (words.some(w => w.length > 2 && keywords.includes(w))) return 20

  return 0
}

function search(entries: SearchEntry[], query: string): SearchEntry[] {
  if (!query.trim()) return []

  return entries
    .map(entry => ({ entry, s: score(entry, query) }))
    .filter(r => r.s > 0)
    .sort((a, b) => b.s - a.s || a.entry.title.localeCompare(b.entry.title))
    .slice(0, 15)
    .map(r => r.entry)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EXTERNAL_ICON = `<svg class="search-external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true" style="flex-shrink:0;margin-left:4px;vertical-align:middle;opacity:0.6"><path stroke-linecap="round" stroke-linejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline stroke-linecap="round" stroke-linejoin="round" points="15 3 21 3 21 9"/><line stroke-linecap="round" stroke-linejoin="round" x1="10" y1="14" x2="21" y2="3"/></svg>`

function renderEmpty(results: HTMLElement): void {
  results.innerHTML = '<li class="search-no-results">Start typing to search…</li>'
}

function renderNoResults(results: HTMLElement, query: string): void {
  results.innerHTML = `<li class="search-no-results">No results for "<strong>${escapeHtml(query)}</strong>"</li>`
}

function renderResults(results: HTMLElement, entries: SearchEntry[]): void {
  results.innerHTML = entries
    .map((entry, i) => {
      const isGuide = entry.source === 'guide'
      const badge = isGuide ? 'GUIDE' : 'SITE'
      const badgeStyle = isGuide
        ? 'background:var(--bg-tertiary);color:var(--text-muted);'
        : 'background:var(--accent);color:#fff;'
      const external = isGuide ? EXTERNAL_ICON : ''

      return `<li class="search-result-item"
          role="option"
          aria-selected="false"
          data-index="${i}"
          data-url="${escapeHtml(entry.url)}"
          data-source="${entry.source}"
          tabindex="-1">
        <span class="search-result-type">
          <span style="font-size:0.65rem;font-weight:700;padding:0.15rem 0.4rem;border-radius:4px;letter-spacing:0.05em;${badgeStyle}">${badge}</span>
        </span>
        <span class="search-result-title">${escapeHtml(entry.title)}${external}</span>
        <span class="search-result-category">${escapeHtml(entry.category)}</span>
      </li>`
    })
    .join('')
}

export function initSearch(entries: SearchEntry[]): void {
  const modal = document.getElementById('search-modal')
  const input = document.getElementById('search-input') as HTMLInputElement | null
  const resultsList = document.getElementById('search-results')
  const trigger = document.getElementById('search-trigger')
  const backdrop = document.getElementById('search-backdrop')

  if (!modal || !input || !resultsList) return

  let activeIndex = -1
  let debounceTimer: ReturnType<typeof setTimeout>
  let currentResults: SearchEntry[] = []

  // ── Modal lifecycle ─────────────────────────────────────────────────────────
  function openModal(): void {
    modal.removeAttribute('hidden')
    modal.setAttribute('aria-hidden', 'false')
    input.value = ''
    input.focus()
    activeIndex = -1
    currentResults = []
    renderEmpty(resultsList!)
    document.body.style.overflow = 'hidden'
  }

  function closeModal(): void {
    modal.setAttribute('hidden', '')
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    activeIndex = -1
  }

  // ── Active item management ──────────────────────────────────────────────────
  function setActive(index: number): void {
    const items = resultsList!.querySelectorAll<HTMLLIElement>('.search-result-item')
    if (items.length === 0) return

    const clampedIndex = Math.max(-1, Math.min(index, items.length - 1))

    items.forEach((item, i) => {
      const isActive = i === clampedIndex
      item.setAttribute('aria-selected', String(isActive))
      if (isActive) {
        item.scrollIntoView({ block: 'nearest' })
      }
    })

    activeIndex = clampedIndex
  }

  // ── Navigation ──────────────────────────────────────────────────────────────
  function navigate(item: HTMLElement): void {
    const url = item.dataset.url
    const source = item.dataset.source
    if (!url) return

    closeModal()

    if (source === 'guide') {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = url
    }
  }

  // ── Attach result click handlers ────────────────────────────────────────────
  function attachResultHandlers(): void {
    resultsList!.querySelectorAll<HTMLLIElement>('.search-result-item').forEach(item => {
      item.addEventListener('click', () => navigate(item))
      item.addEventListener('mouseenter', () => {
        const index = parseInt(item.dataset.index ?? '-1', 10)
        if (index >= 0) setActive(index)
      })
    })
  }

  // ── Search & render ─────────────────────────────────────────────────────────
  function runSearch(query: string): void {
    activeIndex = -1
    currentResults = []

    if (!query.trim()) {
      renderEmpty(resultsList!)
      return
    }

    const found = search(entries, query)
    if (found.length === 0) {
      renderNoResults(resultsList!, query)
    } else {
      currentResults = found
      renderResults(resultsList!, found)
      attachResultHandlers()
    }
  }

  // ── Input handler (debounced) ───────────────────────────────────────────────
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => runSearch(input.value.trim()), 50)
  })

  // ── Keyboard navigation ─────────────────────────────────────────────────────
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    const items = resultsList!.querySelectorAll<HTMLLIElement>('.search-result-item')

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive(activeIndex + 1)
        break

      case 'ArrowUp':
        e.preventDefault()
        if (activeIndex <= 0) {
          // Move focus back to input
          items.forEach(item => item.setAttribute('aria-selected', 'false'))
          activeIndex = -1
        } else {
          setActive(activeIndex - 1)
        }
        break

      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && items[activeIndex]) {
          navigate(items[activeIndex])
        } else if (items.length > 0) {
          navigate(items[0])
        }
        break

      case 'Escape':
        e.preventDefault()
        closeModal()
        break
    }
  })

  // ── Close on backdrop click ─────────────────────────────────────────────────
  backdrop?.addEventListener('click', closeModal)

  // ── Global keyboard shortcut ────────────────────────────────────────────────
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      modal.hasAttribute('hidden') ? openModal() : closeModal()
    }
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal()
    }
  })

  // ── Trigger button ──────────────────────────────────────────────────────────
  trigger?.addEventListener('click', () => openModal())

  // ── Initial state ───────────────────────────────────────────────────────────
  renderEmpty(resultsList!)
}
