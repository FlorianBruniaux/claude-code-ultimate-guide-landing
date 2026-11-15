/* Timing interpolation adapted from design-to-motion, Elaya, commit 5e57840.
MIT License

Copyright (c) 2026 Elaya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * "Pass the brick" for two characters: the Crew (main agent) hands a brick
 * to the Mini Crew (subagent), who works on it and hands it back; the Crew
 * checks it and adds it to the plan on the board. Geometry from the
 * brandbook crew-relay study (viewBox 720 x 430). Pure: no DOM, so the build
 * renders the still frame and the browser plays the same poses.
 */
export const RELAY_DURATION = 11
/** Still frame: the result is back with the Crew and checked. */
export const RELAY_STILL = 8.95
/** Seek points for the four steps. */
export const RELAY_STEP_TIMES = [1.6, 4.9, 7, RELAY_DURATION]

const clamp = (x) => Math.max(0, Math.min(1, x))
const smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x) }
const lerp = (a, b, p) => a + (b - a) * p

function track(keys, t) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [a, x] = keys[i - 1]
    const [b, y] = keys[i]
    if (t <= b) return lerp(x, y, smooth((t - a) / (b - a)))
  }
  return keys.at(-1)[1]
}

/** The result drawn on the brick face, in brick coordinates. */
export const RESULT_POINTS = [[-22, 8], [-22, 0], [-10, 0], [-10, 8], [2, 8], [2, -7], [14, -7], [14, 8], [23, 8]]

function pointAlong(points, p) {
  const lengths = points.slice(1).map((pt, i) => Math.hypot(pt[0] - points[i][0], pt[1] - points[i][1]))
  let left = clamp(p) * lengths.reduce((a, b) => a + b, 0)
  for (let i = 0; i < lengths.length; i++) {
    if (left <= lengths[i] || i === lengths.length - 1) {
      const k = lengths[i] ? Math.min(1, left / lengths[i]) : 0
      return [lerp(points[i][0], points[i + 1][0], k), lerp(points[i][1], points[i + 1][1], k)]
    }
    left -= lengths[i]
  }
  return points.at(-1)
}

const PLAN_SLOT = [249, 81]
const FLIGHT = [9.3, 10.5]

export function relayBeat(t) {
  return t < 3 ? 0 : t < 6 ? 1 : t < 8 ? 2 : 3
}

export function relayPose(time) {
  const t = Math.max(0, Math.min(RELAY_DURATION, time))
  const flight = smooth((t - FLIGHT[0]) / (FLIGHT[1] - FLIGHT[0]))
  const taskX = track([[0, 345], [1, 345], [2.4, 390], [2.9, 390], [3.8, 465], [5.9, 465], [7.2, 390], [7.6, 390], [8.4, 345], [FLIGHT[0], 345], [FLIGHT[1], PLAN_SLOT[0]]], t)
  const taskY = track([[0, 280], [1, 280], [2.4, 277], [2.9, 277], [3.8, 319], [5.9, 319], [7.2, 277], [7.6, 277], [8.4, 280], [FLIGHT[0], 280], [FLIGHT[1], PLAN_SLOT[1]]], t)
  const lift = Math.sin(flight * Math.PI) * 60
  const scale = lerp(1, 0.34, flight)

  const leadHand = [
    track([[0, 313], [1, 313], [2.4, 358], [2.9, 358], [3.8, 322], [5.9, 322], [7.2, 358], [7.6, 358], [8.4, 313]], t),
    track([[0, 289], [1, 289], [2.4, 286], [2.9, 286], [3.8, 300], [5.9, 300], [7.2, 286], [7.6, 286], [8.4, 289]], t),
  ]
  const leadShoulder = [311, 261]
  const leadElbow = [(leadShoulder[0] + leadHand[0]) / 2 + 4, (leadShoulder[1] + leadHand[1]) / 2 + 6]

  const miniHand = [
    track([[0, 421], [1.4, 421], [2.4, 422], [2.9, 422], [3.8, 433], [5.9, 433], [7.2, 422], [7.6, 422], [8.4, 421]], t),
    track([[0, 327], [1.4, 327], [2.4, 286], [2.9, 286], [3.8, 328], [5.9, 328], [7.2, 286], [7.6, 286], [8.4, 327]], t),
  ]
  const miniShoulder = [415, 302]
  const miniElbow = [408, (miniShoulder[1] + miniHand[1]) / 2 + 7]

  const work = smooth((t - 3.9) / 0.3) * (1 - smooth((t - 5.7) / 0.3))
  const result = clamp((t - 4.1) / 1.5)
  const [px, py] = pointAlong(RESULT_POINTS, result)
  const nib = [lerp(524, 465 + px, work), lerp(285, 319 + py, work)]
  const toolHand = [nib[0] - 4, nib[1] - 18]

  return {
    beat: relayBeat(t),
    task: { x: taskX, y: taskY - lift, scale },
    lead: { shoulder: leadShoulder, elbow: leadElbow, hand: leadHand },
    mini: { shoulder: miniShoulder, elbow: miniElbow, hand: miniHand },
    tool: { shoulder: [504, 301], elbow: [522, 318], hand: toolHand },
    pencil: { x: nib[0], y: nib[1] - 7, angle: -8 * (1 - work) },
    leadHead: track([[0, 0], [0.8, 3], [1.8, 1], [3.5, 0], [7.6, 0], [8.4, 4], [9.1, 0], [9.6, -5], [10.6, -5], [11, -2]], t),
    miniHead: track([[0, 0], [1, -4], [2.4, 0], [3.8, 5], [5.9, 5], [6.6, -3], [8.4, 0]], t),
    result,
    check: smooth((t - 8.6) / 0.35) * (1 - smooth((t - FLIGHT[0]) / 0.3)),
    attention: smooth((t - 1) / 0.2) * (1 - smooth((t - 1.8) / 0.2)),
  }
}

const r = (n) => Math.round(n * 100) / 100

/** SVG attribute values for a pose, shared by the build and the browser. */
export function relayAttributes(pose) {
  const arm = ({ shoulder, elbow, hand }) => `M${r(shoulder[0])} ${r(shoulder[1])} L${r(elbow[0])} ${r(elbow[1])} L${r(hand[0])} ${r(hand[1])}`
  const at = ([x, y], angle = 0) => `translate(${r(x)} ${r(y)}) rotate(${r(angle)})`
  return {
    task: `translate(${r(pose.task.x)} ${r(pose.task.y)}) scale(${r(pose.task.scale)})`,
    'lead-arm': arm(pose.lead),
    'lead-elbow': at(pose.lead.elbow),
    'lead-hand': at(pose.lead.hand),
    'mini-arm': arm(pose.mini),
    'mini-elbow': at(pose.mini.elbow),
    'mini-hand': at(pose.mini.hand),
    'tool-arm': arm(pose.tool),
    'tool-elbow': at(pose.tool.elbow),
    'tool-hand': at(pose.tool.hand),
    pencil: at([pose.pencil.x, pose.pencil.y], pose.pencil.angle),
    'lead-head': `rotate(${r(pose.leadHead)} 52 42)`,
    'mini-head': `rotate(${r(pose.miniHead)} 50 56)`,
    result: String(r(1 - pose.result)),
    fill: String(r(pose.result)),
    check: String(r(pose.check)),
    attention: String(r(pose.attention)),
  }
}
