// Players for the portfolio visuals inserted into guide pages
// (markup: scripts/lib/guide-visuals.mjs). Both start still; motion only on request.
import { relayAttributes, relayPose } from './crew-relay-pose.mjs'

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

const RELAY_STEPS = [
  'The Crew hands over a precise task',
  'The Mini Crew does the work',
  'The result comes back to the Crew',
  'The Crew checks it and adds it to the plan',
]

const TRANSFORM_PARTS = new Set(['task', 'lead-elbow', 'mini-elbow', 'tool-elbow', 'lead-hand', 'mini-hand', 'tool-hand', 'pencil', 'lead-head', 'mini-head'])
const PATH_PARTS = new Set(['lead-arm', 'mini-arm', 'tool-arm'])

function initRelay(figure: HTMLElement) {
  const duration = Number(figure.dataset.duration) || 11
  const still = Number(figure.dataset.still) || duration
  const play = figure.querySelector<HTMLButtonElement>('[data-relay-play]')
  const replay = figure.querySelector<HTMLButtonElement>('[data-relay-replay]')
  const status = figure.querySelector<HTMLElement>('[data-relay-status]')
  const note = figure.querySelector<HTMLElement>('[data-relay-motion-note]')
  const steps = [...figure.querySelectorAll<HTMLButtonElement>('[data-relay-step]')]
  const parts = new Map<string, Element[]>()
  figure.querySelectorAll('[data-part]').forEach((el) => {
    const name = el.getAttribute('data-part')!
    parts.set(name, [...(parts.get(name) ?? []), el])
  })
  if (!play || !replay || !status) return

  let time = still
  let started = false
  let playing = false
  let visible = false
  let raf = 0
  let last = 0
  let beat = -1

  function render() {
    const pose = relayPose(time)
    const attrs = relayAttributes(pose) as Record<string, string>
    for (const [name, elements] of parts) {
      const value = attrs[name]
      if (value === undefined) continue
      const attribute = TRANSFORM_PARTS.has(name) ? 'transform' : PATH_PARTS.has(name) ? 'd' : name === 'result' ? 'stroke-dashoffset' : 'opacity'
      elements.forEach((el) => el.setAttribute(attribute, value))
    }
    if (pose.beat !== beat) {
      beat = pose.beat
      status!.textContent = `0${beat + 1} / ${RELAY_STEPS[beat]}`
      steps.forEach((step, i) => (i === beat ? step.setAttribute('aria-current', 'step') : step.removeAttribute('aria-current')))
    }
    const label = playing ? 'Pause' : time >= duration ? 'Play again' : started ? 'Resume' : 'Play the scene'
    if (play!.textContent !== label) play!.textContent = label
    figure.dataset.time = time.toFixed(2)
    figure.dataset.playing = String(playing)
  }

  function stopClock() {
    cancelAnimationFrame(raf)
    raf = 0
    last = 0
  }

  function schedule() {
    if (!raf && playing && visible && !document.hidden && !reduced.matches) raf = requestAnimationFrame(tick)
  }

  function tick(now: number) {
    raf = 0
    if (!playing || !visible || document.hidden || reduced.matches) {
      last = 0
      return
    }
    if (last) time = Math.min(duration, time + Math.min((now - last) / 1000, 0.05))
    last = now
    if (time >= duration) playing = false
    render()
    schedule()
  }

  function start(fromStart: boolean) {
    if (reduced.matches) return
    stopClock()
    if (fromStart || !started || time >= duration) time = 0
    started = true
    playing = true
    render()
    schedule()
  }

  play.addEventListener('click', () => {
    if (playing) {
      playing = false
      stopClock()
      render()
    } else start(false)
  })
  replay.addEventListener('click', () => start(true))
  steps.forEach((step) => {
    step.disabled = false
    step.addEventListener('click', () => {
      playing = false
      stopClock()
      started = true
      time = Number(step.dataset.time) || 0
      render()
    })
  })

  function motionPreference() {
    play!.hidden = replay!.hidden = reduced.matches
    if (note) note.hidden = !reduced.matches
    if (reduced.matches) {
      playing = false
      stopClock()
    }
    render()
  }

  reduced.addEventListener('change', motionPreference)
  document.addEventListener('visibilitychange', () => {
    stopClock()
    schedule()
  })
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    stopClock()
    schedule()
  }, { threshold: 0.2 }).observe(figure)
  motionPreference()
}

function initHarness(figure: HTMLElement) {
  const open = figure.querySelector<HTMLButtonElement>('[data-harness-open]')
  const close = figure.querySelector<HTMLButtonElement>('[data-harness-close]')
  const poster = figure.querySelector<HTMLElement>('[data-harness-poster]')
  const mount = figure.querySelector<HTMLElement>('[data-harness-frame]')
  if (!open || !close || !poster || !mount) return
  const french = document.documentElement.lang.startsWith('fr')
  let frame: HTMLIFrameElement | null = null

  open.hidden = false
  open.addEventListener('click', () => {
    if (frame) return
    frame = document.createElement('iframe')
    frame.title = french ? 'Au cœur du harness : atelier interactif de 49 secondes' : 'Inside the agent harness: interactive 49-second workshop'
    frame.src = `/design/harness-sketch/index.html?embed${french ? '&lang=fr' : ''}`
    mount.append(frame)
    poster.hidden = true
    open.hidden = true
    open.setAttribute('aria-expanded', 'true')
    close.hidden = false
    close.focus({ preventScroll: true })
  })
  close.addEventListener('click', () => {
    frame?.remove()
    frame = null
    poster.hidden = false
    close.hidden = true
    open.hidden = false
    open.setAttribute('aria-expanded', 'false')
    open.focus({ preventScroll: true })
  })
  window.addEventListener('message', (event) => {
    if (!frame || event.origin !== location.origin || event.source !== frame.contentWindow || event.data?.type !== 'harness-sketch-size') return
    const height = Number(event.data.height)
    if (Number.isFinite(height) && height >= 200 && height <= 5000) frame.style.height = `${Math.ceil(height)}px`
  })
}

export function initGuideVisuals(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-crew-relay]').forEach(initRelay)
  root.querySelectorAll<HTMLElement>('[data-harness-sketch]').forEach(initHarness)
}
