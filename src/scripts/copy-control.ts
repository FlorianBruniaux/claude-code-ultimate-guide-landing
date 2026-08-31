export interface ClipboardWriter {
  writeText(text: string): Promise<void>
}

function bindCopyContainer(container: HTMLElement, clipboard: ClipboardWriter | undefined) {
  const source = container.querySelector<HTMLElement>('[data-copy-source]')
  const button = container.querySelector<HTMLButtonElement>('[data-copy-control]')
  const status = container.querySelector<HTMLElement>('[data-copy-status]')
  if (!source || !button || !status) return
  button.addEventListener('click', async () => {
    try {
      if (!clipboard) throw new Error('Clipboard unavailable')
      await clipboard.writeText(source.textContent ?? '')
      status.textContent = 'Copied.'
    } catch {
      status.textContent = 'Copy failed. Select the command manually.'
    }
  })
}

export function initCopyControls(root: ParentNode = document, clipboard?: ClipboardWriter) {
  let resolvedClipboard = clipboard
  if (!resolvedClipboard && typeof navigator !== 'undefined') resolvedClipboard = navigator.clipboard
  for (const container of root.querySelectorAll<HTMLElement>('[data-copy-container]')) {
    if (container.dataset.copyReady === 'true') continue
    container.dataset.copyReady = 'true'
    bindCopyContainer(container, resolvedClipboard)
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initCopyControls())
  document.addEventListener('astro:page-load', () => initCopyControls())
}
