function applyFilter(catalog: Element, filter: string) {
  const cards = [...catalog.querySelectorAll<HTMLElement>('[data-role-card]')]
  const buttons = [...catalog.querySelectorAll<HTMLButtonElement>('[data-role-filter]')]
  let visibleCount = 0

  for (const card of cards) {
    const isVisible = filter === 'all' || card.dataset.roleEvidence === filter
    card.hidden = !isVisible
    if (isVisible) visibleCount++
  }

  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.roleFilter === filter))
  }

  const count = catalog.querySelector<HTMLElement>('[data-role-count]')
  if (count) {
    count.textContent = `${visibleCount} ${visibleCount === 1 ? 'profile' : 'profiles'} shown`
  }
}

function revealRoleFromHash(root: ParentNode, hash: string) {
  if (!hash.startsWith('#')) return

  const roleId = decodeURIComponent(hash.slice(1))
  const target = [...root.querySelectorAll<HTMLElement>('[data-role-card]')]
    .find((card) => card.id === roleId)
  const catalog = target?.closest<HTMLElement>('[data-role-catalog]')

  if (target && catalog) {
    applyFilter(catalog, target.dataset.roleEvidence ?? 'all')
  }
}

export function initRoleCatalog(root: ParentNode = document) {
  const catalogs = [...root.querySelectorAll<HTMLElement>('[data-role-catalog]')]
  let initializedCatalog = false

  for (const catalog of catalogs) {
    if (catalog.dataset.roleCatalogReady === 'true') continue
    catalog.dataset.roleCatalogReady = 'true'
    initializedCatalog = true

    const defaultFilter = catalog.dataset.defaultFilter ?? 'all'
    applyFilter(catalog, defaultFilter)

    for (const button of catalog.querySelectorAll<HTMLButtonElement>('[data-role-filter]')) {
      button.addEventListener('click', () => {
        applyFilter(catalog, button.dataset.roleFilter ?? 'all')
      })
    }
  }

  const view = (root as Document).defaultView
  if (initializedCatalog && view) {
    const revealTarget = () => revealRoleFromHash(root, view.location.hash)
    view.addEventListener('hashchange', revealTarget)
    revealTarget()
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initRoleCatalog())
}
