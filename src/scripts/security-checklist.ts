function safeRead(storage: Storage | undefined, key: string): string[] {
  try {
    const parsed = JSON.parse(storage?.getItem(key) ?? '[]')
    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : []
  } catch {
    return []
  }
}

function safeWrite(storage: Storage | undefined, key: string, values: string[]) {
  try {
    storage?.setItem(key, JSON.stringify(values))
  } catch {
    // Storage is an enhancement. The checklist remains usable in memory.
  }
}

function bindChecklist(checklist: HTMLElement, storage: Storage | undefined) {
  const key = checklist.dataset.storageKey ?? 'security-checklist-v1'
  const items = [...checklist.querySelectorAll<HTMLInputElement>('[data-checklist-item]')]
  const progress = checklist.querySelector<HTMLElement>('[data-checklist-progress]')
  const saved = new Set(safeRead(storage, key))
  for (const item of items) item.checked = saved.has(item.value)

  const render = () => {
    const selected = items.filter((item) => item.checked).map((item) => item.value)
    if (progress) progress.textContent = `${selected.length} of ${items.length} complete`
    safeWrite(storage, key, selected)
  }
  for (const item of items) item.addEventListener('change', render)
  checklist.querySelector<HTMLButtonElement>('[data-checklist-reset]')?.addEventListener('click', () => {
    for (const item of items) item.checked = false
    render()
  })
  render()
}

export function initSecurityChecklists(root: ParentNode = document, storage?: Storage) {
  let resolvedStorage = storage
  if (!resolvedStorage && typeof window !== 'undefined') {
    try { resolvedStorage = window.localStorage } catch { resolvedStorage = undefined }
  }
  for (const checklist of root.querySelectorAll<HTMLElement>('[data-security-checklist]')) {
    if (checklist.dataset.ready === 'true') continue
    checklist.dataset.ready = 'true'
    bindChecklist(checklist, resolvedStorage)
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initSecurityChecklists())
  document.addEventListener('astro:page-load', () => initSecurityChecklists())
}
