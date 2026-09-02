export interface EcosystemAnalyticsWindow {
  gtag?: (command: 'event', eventName: string, payload: EcosystemClickPayload) => void
  dataLayer?: { push: (entry: ['event', string, EcosystemClickPayload]) => unknown }
  location: Pick<Location, 'pathname'>
}

export interface EcosystemClickPayload {
  project_id: string
  placement: string
  menu: string
  source_page: string
}

const readyRoots = new WeakSet<ParentNode>()

function metadataFor(anchor: HTMLAnchorElement, sourcePage: string): EcosystemClickPayload | undefined {
  const projectId = anchor.dataset.ecosystemProjectId?.trim()
  const placement = anchor.dataset.ecosystemPlacement?.trim()
  const menu = anchor.dataset.ecosystemMenu?.trim()
  if (!projectId || !placement || !menu) return undefined
  return { project_id: projectId, placement, menu, source_page: sourcePage }
}

function send(window: EcosystemAnalyticsWindow, payload: EcosystemClickPayload) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ecosystem_project_click', payload)
      return
    }
    window.dataLayer?.push(['event', 'ecosystem_project_click', payload])
  } catch {
    // Analytics must never block the destination link.
  }
}

export function initEcosystemAnalytics(
  root: ParentNode = document,
  window: EcosystemAnalyticsWindow = globalThis.window as unknown as EcosystemAnalyticsWindow,
) {
  if (readyRoots.has(root)) return
  readyRoots.add(root)
  root.addEventListener('click', (event) => {
    const target = event.target as Element | null
    const anchor = target?.closest<HTMLAnchorElement>('a[data-ecosystem-project-id]')
    if (!anchor) return
    const payload = metadataFor(anchor, window.location.pathname)
    if (payload) send(window, payload)
  })
}
