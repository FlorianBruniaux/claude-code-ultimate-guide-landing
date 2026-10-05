export interface McpAnalyticsWindow {
  gtag?: (...args: unknown[]) => void
}

export function trackMcpEvent(eventName: string, element: HTMLElement, analytics: McpAnalyticsWindow = window as unknown as McpAnalyticsWindow) {
  const { mcpClient: client, mcpVersion: package_version, mcpPosition: cta_position } = element.dataset
  if (!client || !package_version || !cta_position) return
  try {
    analytics.gtag?.('event', eventName, { client, package_version, cta_position })
  } catch {
    // Tracking must not prevent copying or opening a source.
  }
}

const initialized = new WeakSet<ParentNode>()

export function initMcpPageActions(
  root: ParentNode = document,
  clipboard: Pick<Clipboard, 'writeText'> | undefined = globalThis.navigator?.clipboard,
  analytics: McpAnalyticsWindow = window as unknown as McpAnalyticsWindow,
) {
  if (initialized.has(root)) return
  initialized.add(root)
  const card = root.querySelector<HTMLElement>('[data-mcp-query]')
  const button = card?.querySelector<HTMLButtonElement>('[data-copy-query]')
  const status = card?.querySelector<HTMLElement>('[data-query-status]')
  const source = card?.querySelector<HTMLElement>('blockquote')
  if (card && button && status && source) {
    button.hidden = false
    button.addEventListener('click', async () => {
      try {
        if (!clipboard) throw new Error('Clipboard unavailable')
        await clipboard.writeText(source.textContent?.trim() ?? '')
        status.textContent = 'Query copied.'
        trackMcpEvent('mcp_first_query_copy', card, analytics)
      } catch {
        status.textContent = 'Copy failed. Select the query and copy it manually.'
      }
    })
  }
  root.addEventListener('click', event => {
    const target = event.target as Element | null
    const link = target?.closest<HTMLElement>('a[data-mcp-link-event]')
    if (!link) return
    const name = link.dataset.mcpLinkEvent
    if (name === 'mcp_npm_click' || name === 'mcp_source_open') trackMcpEvent(name, link, analytics)
  })
}
