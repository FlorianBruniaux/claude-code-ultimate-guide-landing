function bindCatalog(catalog: HTMLElement) {
  const search = catalog.querySelector<HTMLInputElement>('[data-security-search]')
  const filters = [...catalog.querySelectorAll<HTMLButtonElement>('[data-security-filter]')]
  const records = [...catalog.querySelectorAll<HTMLElement>('[data-security-record]')]
  const empty = catalog.querySelector<HTMLElement>('[data-security-empty]')
  const count = catalog.querySelector<HTMLElement>('[data-security-count]')
  const showAll = catalog.querySelector<HTMLButtonElement>('[data-security-show-all]')
  const initialLimit = Number(catalog.dataset.initialLimit ?? 0)
  let activeType = ''
  let expanded = initialLimit === 0

  const render = () => {
    const query = search?.value.trim().toLowerCase() ?? ''
    let matches = 0
    let visible = 0
    for (const record of records) {
      const matchesText = query.length === 0 || (record.dataset.searchText ?? '').includes(query)
      const matchesType = activeType.length === 0 || record.dataset.recordType === activeType
      const matchesFilters = matchesText && matchesType
      if (matchesFilters) matches += 1
      const withinLimit = expanded || query.length > 0 || activeType.length > 0 || visible < initialLimit
      record.hidden = !(matchesFilters && withinLimit)
      if (!record.hidden) visible += 1
    }
    if (empty) empty.hidden = visible !== 0
    if (count) count.textContent = visible === matches
      ? `${visible} ${visible === 1 ? 'result' : 'results'}`
      : `${visible} of ${matches} results`
    if (showAll) showAll.hidden = visible === matches
  }

  search?.addEventListener('input', render)
  for (const filter of filters) {
    filter.addEventListener('click', () => {
      const requested = filter.dataset.securityFilter ?? ''
      activeType = activeType === requested ? '' : requested
      for (const item of filters) item.setAttribute('aria-pressed', String(item === filter && activeType !== ''))
      render()
    })
  }
  catalog.querySelector<HTMLButtonElement>('[data-security-reset]')?.addEventListener('click', () => {
    if (search) search.value = ''
    activeType = ''
    expanded = initialLimit === 0
    for (const filter of filters) filter.setAttribute('aria-pressed', 'false')
    render()
    search?.focus()
  })
  showAll?.addEventListener('click', () => {
    expanded = true
    render()
  })
  render()
}

export function initSecurityCatalogs(root: ParentNode = document) {
  for (const catalog of root.querySelectorAll<HTMLElement>('[data-security-catalog]')) {
    if (catalog.dataset.ready === 'true') continue
    catalog.dataset.ready = 'true'
    bindCatalog(catalog)
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initSecurityCatalogs())
  document.addEventListener('astro:page-load', () => initSecurityCatalogs())
}
