const SVG_NS = 'http://www.w3.org/2000/svg'
const WIDE_QUERY = '(min-width: 900px)'

interface Edge {
  lever: string
  regime: string
  partial: boolean
  path: SVGPathElement
}

function tokens(value: string | undefined | null): string[] {
  return (value ?? '').split(/\s+/).filter(Boolean)
}

export function initSwitchyard(root: HTMLElement): () => void {
  const svg = root.querySelector<SVGSVGElement>('[data-switchyard-svg]')
  const levers = [...root.querySelectorAll<HTMLDetailsElement>('details[data-lever]')]
  const items = [...root.querySelectorAll<HTMLElement>('[data-lever-item]')]
  const destinations = [...root.querySelectorAll<HTMLButtonElement>('button[data-regime]')]
  const win = root.ownerDocument.defaultView as (Window & typeof globalThis) | null
  if (!svg || !win) return () => {}

  const mql = typeof win.matchMedia === 'function' ? win.matchMedia(WIDE_QUERY) : null
  const isWide = () => (mql ? mql.matches : true)

  let hoverLever: string | null = null
  let hoverRegime: string | null = null
  let selectedLever: string | null = null
  let filter: string | null = null
  let edges: Edge[] = []
  let frame = 0

  const leverEdges = new Map<string, { regimes: string[]; partial: string[] }>()
  for (const lever of levers) {
    leverEdges.set(lever.dataset.lever ?? '', {
      regimes: tokens(lever.dataset.regimes),
      partial: tokens(lever.dataset.partial),
    })
  }

  // The buttons ship disabled in the SSR markup so they are inert without JS.
  for (const button of destinations) button.disabled = false

  function clearPaths() {
    while (svg!.firstChild) svg!.removeChild(svg!.firstChild)
    edges = []
  }

  function applyState() {
    const focusLever = hoverLever ?? selectedLever
    const focusRegime = hoverRegime ?? filter

    if (selectedLever) root.dataset.selectedLever = selectedLever
    else delete root.dataset.selectedLever
    if (filter) root.dataset.filter = filter
    else delete root.dataset.filter

    for (const edge of edges) {
      let state = 'idle'
      if (focusLever || focusRegime) {
        const active = (focusLever !== null && edge.lever === focusLever) || (focusRegime !== null && edge.regime === focusRegime)
        state = active ? 'active' : 'dim'
      }
      edge.path.setAttribute('data-state', state)
    }

    for (const item of items) {
      const id = item.dataset.leverItem ?? ''
      const links = leverEdges.get(id)
      const linked = !filter || !!links && (links.regimes.includes(filter) || links.partial.includes(filter))
      if (linked) item.removeAttribute('data-dimmed')
      else item.setAttribute('data-dimmed', 'true')
    }

    for (const button of destinations) {
      button.setAttribute('aria-pressed', button.dataset.regime === filter ? 'true' : 'false')
    }
  }

  function draw() {
    frame = 0
    clearPaths()
    if (!isWide()) {
      svg!.removeAttribute('viewBox')
      applyState()
      return
    }

    const box = root.getBoundingClientRect()
    svg!.setAttribute('viewBox', `0 0 ${Math.round(box.width)} ${Math.round(box.height)}`)
    svg!.setAttribute('width', String(Math.round(box.width)))
    svg!.setAttribute('height', String(Math.round(box.height)))

    const targets = new Map<string, DOMRect>()
    for (const button of destinations) targets.set(button.dataset.regime ?? '', button.getBoundingClientRect())

    for (const lever of levers) {
      const id = lever.dataset.lever ?? ''
      const summary = lever.querySelector('summary')
      const links = leverEdges.get(id)
      if (!summary || !links) continue
      const from = summary.getBoundingClientRect()
      const list: Array<[string, boolean]> = [
        ...links.regimes.map((regime): [string, boolean] => [regime, false]),
        ...links.partial.map((regime): [string, boolean] => [regime, true]),
      ]
      for (const [regime, partial] of list) {
        const to = targets.get(regime)
        if (!to) continue
        const x1 = from.right - box.left
        const y1 = from.top + from.height / 2 - box.top
        const x2 = to.left - box.left
        const y2 = to.top + to.height / 2 - box.top
        const xm = (x1 + x2) / 2
        const path = root.ownerDocument.createElementNS(SVG_NS, 'path') as SVGPathElement
        path.setAttribute('d', `M ${x1.toFixed(1)},${y1.toFixed(1)} C ${xm.toFixed(1)},${y1.toFixed(1)} ${xm.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`)
        path.setAttribute('class', 'switchyard__path')
        path.setAttribute('fill', 'none')
        path.setAttribute('data-from', id)
        path.setAttribute('data-to', regime)
        if (partial) path.setAttribute('data-partial', 'true')
        svg!.appendChild(path)
        edges.push({ lever: id, regime, partial, path })
      }
    }
    applyState()
  }

  function schedule() {
    if (frame) return
    if (typeof win!.requestAnimationFrame === 'function') frame = win!.requestAnimationFrame(draw)
    else draw()
  }

  function onToggle(lever: HTMLDetailsElement) {
    const id = lever.dataset.lever ?? ''
    if (lever.open) {
      selectedLever = id
      for (const other of levers) {
        if (other !== lever && other.open) other.open = false
      }
    } else if (selectedLever === id) {
      selectedLever = null
    }
    applyState()
    schedule()
  }

  const cleanups: Array<() => void> = []
  const on = (target: EventTarget, type: string, handler: (event: Event) => void) => {
    target.addEventListener(type, handler)
    cleanups.push(() => target.removeEventListener(type, handler))
  }

  for (const lever of levers) {
    const id = lever.dataset.lever ?? ''
    const summary = lever.querySelector('summary')
    on(lever, 'toggle', () => onToggle(lever))
    if (summary) {
      const enter = () => { hoverLever = id; applyState() }
      const leave = () => { hoverLever = null; applyState() }
      on(summary, 'mouseenter', enter)
      on(summary, 'mouseleave', leave)
      on(summary, 'focus', enter)
      on(summary, 'blur', leave)
    }
  }

  for (const button of destinations) {
    const regime = button.dataset.regime ?? ''
    const enter = () => { hoverRegime = regime; applyState() }
    const leave = () => { hoverRegime = null; applyState() }
    on(button, 'mouseenter', enter)
    on(button, 'mouseleave', leave)
    on(button, 'focus', enter)
    on(button, 'blur', leave)
    on(button, 'click', () => {
      filter = filter === regime ? null : regime
      applyState()
    })
  }

  on(root, 'keydown', (event) => {
    if ((event as KeyboardEvent).key !== 'Escape') return
    const open = levers.find((lever) => lever.open)
    if (open) {
      open.open = false
      selectedLever = null
      open.querySelector<HTMLElement>('summary')?.focus()
    } else if (filter) {
      filter = null
    } else {
      return
    }
    applyState()
    schedule()
  })

  if (mql) {
    const onChange = () => schedule()
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      cleanups.push(() => mql.removeEventListener('change', onChange))
    }
  }

  let observer: ResizeObserver | null = null
  if (typeof win.ResizeObserver === 'function') {
    observer = new win.ResizeObserver(() => schedule())
    observer.observe(root)
    for (const item of items) observer.observe(item)
  }
  win.document.fonts?.ready?.then(() => schedule())

  draw()

  return () => {
    for (const cleanup of cleanups) cleanup()
    observer?.disconnect()
    clearPaths()
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    for (const root of document.querySelectorAll<HTMLElement>('[data-switchyard]')) initSwitchyard(root)
  })
}
