// "Run for it!": the whip scene of the portfolio Crew engine
// (florian-portfolio, src/scripts/crew-animation.js), kept to this one scene.
// The pure part (tracks, whip swing) is tested; createCrewRun draws one frame per call.

export const RUN_DURATION = 9 // the last Mini Crew is out of the frame at 8.5 s
export const RUN_STILL = 3.35 // the whip cracks, nobody has moved yet

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x))
const ease = (x) => {
  x = clamp(x)
  return x * x * (3 - 2 * x)
}
const mix = (a, b, p) => a + (b - a) * p

// Position in stage-width units: three Mini Crews, then the Crew. Flat intervals are rests.
const TRACKS = [
  [[0, 0.4], [3.35, 0.4], [6.8, 1.6], [24, 1.6]],
  [[0, 0.56], [3.65, 0.56], [7.5, 1.8], [24, 1.8]],
  [[0, 0.72], [4, 0.72], [8.5, 2], [24, 2]],
  [[0, 0.02], [1, 0.02], [2, 0.06], [24, 0.06]],
]

function sample(keys, t) {
  for (let i = 1; i < keys.length; i++) {
    const [a, x] = keys[i - 1]
    const [b, y] = keys[i]
    if (t <= b) return mix(x, y, ease((t - a) / (b - a)))
  }
  return keys.at(-1)[1]
}

export const runPositions = (t) => TRACKS.map((keys) => sample(keys, t))

export function whipSwing(t) {
  const wind = ease((t - 1.8) / 0.95)
  const strike = ease((t - 2.85) / 0.4)
  const settle = ease((t - 3.4) / 1.1)
  return { wind, strike, settle, angle: (-45 * wind + 70 * strike) * (1 - settle), flash: t >= 3.2 && t <= 3.4 }
}

// Same transparent atlases and frame coordinates as the portfolio (downscaled files, same units).
const FRAMES = [
  { role: 'frontend', x: 530, y: 10, w: 470, h: 490 },
  { role: 'ui', x: 20, y: 10, w: 500, h: 490 },
  { role: 'debugger', x: 560, y: 500, w: 440, h: 490 },
  { role: 'leader', x: 0, y: 443.5, w: 443.5, h: 443.5 },
]
// Distinct gaits: trot, sprint, hops, steady leader.
const GAITS = [
  { stride: 14, lift: 5, tilt: 1.5, bob: 2, lean: 2 },
  { stride: 20, lift: 8, tilt: 4, bob: 3, lean: 7 },
  { stride: 29, lift: 3, tilt: 3, bob: 10, lean: 0 },
  { stride: 38, lift: 3, tilt: 0.7, bob: 1, lean: 0 },
]

let serial = 0

export function createCrewRun(host) {
  const uid = `crew-run-${++serial}`
  const stage = host.querySelector('.crew-run-viewport')
  const ns = 'http://www.w3.org/2000/svg'
  let width = 1
  let stageHeight = 1
  let size = 1
  let time = 0

  function makeCrew(i) {
    const f = FRAMES[i]
    const el = document.createElement('div')
    el.className = 'crew'
    el.dataset.role = f.role
    const art = `<svg viewBox="${f.x} ${f.y} ${f.w} ${f.h}" width="100" height="100" preserveAspectRatio="none"><image href="${i === 3 ? host.dataset.leaderSrc : host.dataset.subagentSrc}" width="${i === 3 ? 1774 : 1536}" height="${i === 3 ? 887 : 1024}"/></svg>`
    el.innerHTML = `<span class="shadow"></span><svg viewBox="0 0 100 104"><defs><clipPath id="${uid}-body-${i}"><rect width="100" height="86"/></clipPath><clipPath id="${uid}-left-${i}"><rect y="86" width="50" height="18"/></clipPath><clipPath id="${uid}-right-${i}"><rect x="50" y="86" width="50" height="18"/></clipPath></defs><g class="torso"><g clip-path="url(#${uid}-body-${i})">${art}</g></g><g class="foot-left"><g clip-path="url(#${uid}-left-${i})">${art}</g></g><g class="foot-right"><g clip-path="url(#${uid}-right-${i})">${art}</g></g></svg>`
    stage.append(el)
    return { el, body: el.querySelector('.torso'), shadow: el.querySelector('.shadow'), feet: [el.querySelector('.foot-left'), el.querySelector('.foot-right')], x: 0, width: 1, height: 1, bodyMatrix: new DOMMatrix() }
  }

  const crews = [0, 1, 2, 3].map(makeCrew)

  // The forearm, grip and cord share the leader's local SVG coordinates.
  const leader = crews[3]
  const bodyArt = leader.body.firstElementChild
  leader.el.querySelector('defs').insertAdjacentHTML('beforeend', `<clipPath id="${uid}-leader-without-arm"><path clip-rule="evenodd" d="M0 0H100V86H0Z M79 48L91 51L98 60L96 75L85 78L79 70Z"/></clipPath><clipPath id="${uid}-leader-arm"><path d="M79 48L91 51L98 60L96 75L85 78L79 70Z"/></clipPath>`)
  bodyArt.setAttribute('clip-path', `url(#${uid}-leader-without-arm)`)
  const arm = document.createElementNS(ns, 'g')
  const whip = document.createElementNS(ns, 'g')
  whip.innerHTML = '<path class="whip-cord" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M82 71L99 54" stroke="#8b431c" stroke-width="6" stroke-linecap="round"/><path d="M94 59L99 54" stroke="#f97316" stroke-width="4" stroke-linecap="round"/><path class="whip-flash" fill="none" stroke="#f97316" stroke-width="2"/>'
  arm.append(whip)
  const hand = bodyArt.cloneNode(true)
  hand.setAttribute('clip-path', `url(#${uid}-leader-arm)`)
  arm.append(hand)
  leader.body.append(arm)
  const cord = whip.querySelector('.whip-cord')
  const flash = whip.querySelector('.whip-flash')

  function spline(points) {
    let d = `M${points[0][0]} ${points[0][1]}`
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[Math.max(0, i - 1)], b = points[i], c = points[i + 1], e = points[Math.min(points.length - 1, i + 2)]
      d += `C${b[0] + (c[0] - a[0]) / 6} ${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6} ${c[1] - (e[1] - b[1]) / 6} ${c[0]} ${c[1]}`
    }
    return d
  }

  function drawWhip(span) {
    const { wind, strike, settle, angle, flash: cracking } = whipSwing(time)
    arm.setAttribute('transform', `rotate(${angle} 76 48)`)
    const scale = Math.min(leader.width / 100, leader.height / 104)
    if (!scale) return
    // Compose the known SVG transforms without a layout read per frame.
    const matrix = new DOMMatrix()
      .translate(leader.x + (leader.width - 100 * scale) / 2, stageHeight - 5 - leader.height + (leader.height - 104 * scale) / 2)
      .scale(scale).multiply(leader.bodyMatrix).translate(76, 48).rotate(angle).translate(-76, -48)
    const target = new DOMPoint(sample(TRACKS[0], 3.25) * span + crews[0].width * 0.35, stageHeight - 5 - 18).matrixTransform(matrix.inverse())
    const extension = strike * (1 - settle)
    const points = []
    for (let n = 0; n <= 18; n++) {
      const u = n / 18
      const restX = 99 + 30 * Math.sin(u * Math.PI * 0.75), restY = 54 + 46 * u
      const endX = mix(restX, 99 + (target.x - 99) * u, extension), endY = mix(restY, 54 + (target.y - 54) * u, extension)
      const travel = clamp((time - 2.85) / 0.5)
      const wave = Math.sin((u - travel) * Math.PI * 2) * Math.sin(u * Math.PI) * 26 * Math.sin(Math.PI * clamp((time - 2.8) / 0.8))
      points.push([endX + Math.sin(u * Math.PI) * wind * (1 - strike) * 25, endY + wave - Math.sin(u * Math.PI) * wind * (1 - strike) * 45])
    }
    cord.setAttribute('d', spline(points))
    const [tx, ty] = points.at(-1)
    flash.style.opacity = cracking ? '1' : '0'
    flash.setAttribute('d', `M${tx - 5} ${ty - 7}l-4-7M${tx + 4} ${ty - 8}l3-8M${tx + 8} ${ty - 1}l8-2`)
  }

  function pose(c, i, x, velocity) {
    const moving = Math.abs(velocity) > 0.01
    const g = GAITS[i]
    const localUnit = c.width / 100
    const phase = x / Math.max(localUnit, 0.01) / g.stride + i * 0.37
    const swing = Math.sin(phase * Math.PI * 2)
    const hop = i === 2 && moving ? Math.max(0, swing) * g.bob : 0
    const bounce = moving ? (i === 2 ? -hop : -Math.abs(swing) * g.bob) : 0
    const startled = i < 3 ? Math.sin(clamp((time - (3.2 + i * 0.2)) / 0.4) * Math.PI) * 12 : 0
    c.x = x
    c.el.style.transform = `translate(${x.toFixed(3)}px,${-hop * localUnit - startled}px)`
    const tilt = moving ? swing * g.tilt + g.lean : 0
    if (i === 3) c.bodyMatrix = new DOMMatrix().translate(0, bounce).translate(50, 86).rotate(tilt).translate(-50, -86)
    c.body.setAttribute('transform', `translate(0 ${i === 2 ? 0 : bounce}) rotate(${tilt} 50 86)`)
    c.feet.forEach((foot, n) => {
      const step = moving ? Math.sin(phase * Math.PI * 2 + (i === 2 ? n * 0.35 : n * Math.PI)) : 0
      foot.setAttribute('transform', `translate(${step * (i === 1 ? 4 : 2)} ${-Math.max(0, step) * g.lift}) rotate(${step * (i === 1 ? 9 : 4)} ${n ? 70 : 30} 87)`)
    })
    c.shadow.style.transform = `translateY(${hop * localUnit}px) scaleX(${1 - hop * 0.035})`
    c.shadow.style.opacity = String(0.15 - hop * 0.006)
  }

  function render(t = time) {
    time = t
    const span = Math.max(1, width - size)
    TRACKS.forEach((keys, i) => {
      const x = sample(keys, time) * span
      const velocity = ((sample(keys, Math.min(24, time + 0.015)) - sample(keys, Math.max(0, time - 0.015))) * span) / 0.03
      pose(crews[i], i, x, velocity)
    })
    drawWhip(span)
  }

  function measure() {
    width = stage.clientWidth
    stageHeight = stage.clientHeight
    crews.forEach((c) => {
      const bounds = c.el.getBoundingClientRect()
      c.width = bounds.width
      c.height = bounds.height
    })
    size = Math.max(...crews.map((c) => c.width), 1)
    render()
  }

  const resize = new ResizeObserver(measure)
  resize.observe(stage)
  measure()

  return {
    render,
    dispose() {
      resize.disconnect()
      crews.forEach((c) => c.el.remove())
    },
  }
}
