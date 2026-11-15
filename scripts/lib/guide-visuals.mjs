/**
 * Portfolio visuals inserted into generated guide pages.
 *
 * The guide Markdown lives in the guide repository (CC BY-SA). The Crew art
 * is Florian Bruniaux's brand material and stays in this site's public/
 * folder; prepare-guide-content.mjs inserts the figures at generation time,
 * so they survive every rebuild without touching the guide sources.
 *
 * Each figure is one raw HTML block with no blank line, so Markdown keeps it
 * whole. `not-content` keeps Starlight's prose styles out of it.
 */
import { RELAY_DURATION, RELAY_STEP_TIMES, RELAY_STILL, relayAttributes, relayPose } from '../../src/scripts/crew-relay-pose.mjs'

const RELAY_STEPS = [
  'The Crew hands over a precise task',
  'The Mini Crew does the work',
  'The result comes back to the Crew',
  'The Crew checks it and adds it to the plan',
]

export function relayFigureHtml() {
  const a = relayAttributes(relayPose(RELAY_STILL))
  const still = relayPose(RELAY_STILL)
  const status = `0${still.beat + 1} / ${RELAY_STEPS[still.beat]}`
  const steps = RELAY_STEPS.map((label, i) => `<li><button type="button" class="crew-relay-step" data-relay-step="${i}" data-time="${RELAY_STEP_TIMES[i]}" disabled><span>0${i + 1}</span> ${label}</button></li>`).join('')
  return [
    `<figure class="guide-visual crew-relay not-content" data-crew-relay data-still="${RELAY_STILL}" data-duration="${RELAY_DURATION}">`,
    '<div class="crew-relay-stage">',
    '<svg class="crew-relay-scene" viewBox="0 0 720 430" role="img" aria-labelledby="crew-relay-title crew-relay-desc">',
    '<title id="crew-relay-title">Pass the brick: a main agent delegates a task to a subagent</title>',
    '<desc id="crew-relay-desc">The Crew, labelled main agent, hands a brick to the smaller Mini Crew, labelled subagent. The Mini Crew draws the result on the brick and hands it back. The Crew checks it and adds it to the plan on the board.</desc>',
    '<defs>',
    '<pattern id="crew-relay-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(18)"><path d="M0 0V9" stroke="currentColor" stroke-width=".6" opacity=".16"/></pattern>',
    '<symbol id="crew-relay-lead-art" viewBox="0 443.5 443.5 443.5"><image href="/images/crew/leader-640.webp" width="1774" height="887"/></symbol>',
    '<symbol id="crew-relay-mini-art" viewBox="20 10 500 490"><image href="/images/crew/subagents-512.webp" width="1536" height="1024"/></symbol>',
    '<clipPath id="crew-relay-lead-head-clip"><path d="M0 0H100V43H0Z"/></clipPath>',
    '<clipPath id="crew-relay-lead-body-clip"><path clip-rule="evenodd" d="M0 43H100V100H0Z M78 56H100V81H78Z"/></clipPath>',
    '<clipPath id="crew-relay-mini-head-clip"><path d="M0 0H100V47H82V57H0Z"/></clipPath>',
    '<clipPath id="crew-relay-mini-body-clip"><path clip-rule="evenodd" d="M0 57H100V100H0Z M13 64H38V88H13Z M76 57H100V85H76Z"/></clipPath>',
    '</defs>',
    '<g class="crew-relay-scenery" aria-hidden="true">',
    '<path class="sketch faint" d="M112 109L108 58L273 53L276 102M111 60L269 56"/>',
    '<text x="114" y="48" class="plan-label">THE PLAN</text>',
    '<path class="sketch faint" d="M127 75H157V93H127Z M184 73H214V91H184Z M238 72H260V90H238Z M157 84H184 M214 82H237"/>',
    '<path class="brick-mini" d="M131 79L153 78L154 89L131 90Z M188 77L210 76L211 87L188 88Z"/>',
    '<path class="sketch faint" d="M555 179L650 175L655 238L559 240Z M562 183L647 179 M567 195L593 193 M567 204L628 201 M568 214L615 212"/>',
    '<ellipse cx="236" cy="353" rx="113" ry="10" fill="url(#crew-relay-hatch)"/>',
    '<ellipse cx="458" cy="354" rx="83" ry="8" fill="url(#crew-relay-hatch)"/>',
    '<path class="sketch" opacity=".4" d="M62 359Q341 353 665 358 M68 362Q365 357 651 361"/>',
    '<path class="sketch faint" d="M88 363L84 377 M641 362L645 376"/>',
    '</g>',
    '<g class="crew-relay-labels">',
    '<text x="237" y="394" text-anchor="middle" class="role-name">CREW</text>',
    '<text x="237" y="416" text-anchor="middle" class="role-label">MAIN AGENT</text>',
    '<text x="456" y="394" text-anchor="middle" class="role-name">MINI CREW</text>',
    '<text x="456" y="416" text-anchor="middle" class="role-label">SUBAGENT</text>',
    '</g>',
    '<g transform="translate(120 125) scale(2.35)">',
    '<g clip-path="url(#crew-relay-lead-body-clip)"><use href="#crew-relay-lead-art" width="100" height="100"/></g>',
    `<g data-part="lead-head" transform="${a['lead-head']}"><g clip-path="url(#crew-relay-lead-head-clip)"><use href="#crew-relay-lead-art" width="100" height="100"/></g></g>`,
    '</g>',
    '<g transform="translate(383 208) scale(1.45)">',
    '<g clip-path="url(#crew-relay-mini-body-clip)"><use href="#crew-relay-mini-art" width="100" height="100"/></g>',
    `<g data-part="mini-head" transform="${a['mini-head']}"><g clip-path="url(#crew-relay-mini-head-clip)"><use href="#crew-relay-mini-art" width="100" height="100"/></g></g>`,
    '</g>',
    '<g aria-hidden="true">',
    `<path data-part="lead-arm" class="arm-outline" d="${a['lead-arm']}"/><path data-part="lead-arm" class="arm" d="${a['lead-arm']}"/>`,
    `<path data-part="mini-arm" class="arm-outline mini-arm" d="${a['mini-arm']}"/><path data-part="mini-arm" class="arm mini-arm" d="${a['mini-arm']}"/>`,
    `<path data-part="tool-arm" class="arm-outline mini-arm" d="${a['tool-arm']}"/><path data-part="tool-arm" class="arm mini-arm" d="${a['tool-arm']}"/>`,
    `<g class="elbow" data-part="lead-elbow" transform="${a['lead-elbow']}"><circle r="6"/><circle r="2"/></g>`,
    `<g class="elbow" data-part="mini-elbow" transform="${a['mini-elbow']}"><circle r="4"/><circle r="1.5"/></g>`,
    `<g class="elbow" data-part="tool-elbow" transform="${a['tool-elbow']}"><circle r="4"/><circle r="1.5"/></g>`,
    `<g data-part="task" transform="${a.task}">`,
    '<path class="brick" d="M-32-15L31-17L33 16L-31 18Z"/>',
    `<path class="brick-done" data-part="fill" opacity="${a.fill}" d="M-32-15L31-17L33 16L-31 18Z"/>`,
    '<path class="brick-texture" d="M-27-9L26-10 M-6-15L-5-9"/>',
    `<path class="result-line" data-part="result" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${a.result}" d="M-22 8V0H-10V8H2V-7H14V8H23"/>`,
    `<g class="check" data-part="check" opacity="${a.check}"><circle cx="26" cy="-19" r="11"/><path d="M21-19L25-15L32-24"/></g>`,
    '</g>',
    `<g class="grip" data-part="lead-hand" transform="${a['lead-hand']}"><ellipse rx="10" ry="12"/><path d="M-5-4L4-3M-5 1L4 2"/></g>`,
    `<g class="grip" data-part="mini-hand" transform="${a['mini-hand']}"><ellipse rx="7" ry="9"/><path d="M-4-3L3-2M-4 1L3 2"/></g>`,
    `<g data-part="pencil" transform="${a.pencil}"><path d="M0 0L-16-36L-11-38L5-2Z" fill="#fa781b" stroke="#292724" stroke-width="1.5"/><path d="M0 0L5-2L6 7Z" fill="#292724"/><path d="M-13-31L0-5" stroke="#fff5e8" stroke-width="1"/></g>`,
    `<g class="grip" data-part="tool-hand" transform="${a['tool-hand']}"><ellipse rx="7" ry="9"/><path d="M-4-3L3-2M-4 1L3 2"/></g>`,
    `<path data-part="attention" class="accent-stroke" opacity="${a.attention}" d="M373 225L375 218M381 226L387 221"/>`,
    '</g>',
    '</svg>',
    '</div>',
    '<figcaption class="crew-relay-caption">',
    `<div class="crew-relay-bar"><span class="crew-relay-status" data-relay-status role="status" aria-live="polite">${status}</span><span class="crew-relay-actions" role="group" aria-label="Animation controls"><button type="button" class="btn btn-primary" data-relay-play hidden>Play the scene</button><button type="button" class="btn btn-secondary" data-relay-replay hidden>Replay</button></span></div>`,
    `<ol class="crew-relay-steps">${steps}</ol>`,
    '<p class="guide-visual-note" data-relay-motion-note hidden>Reduced motion is on: the scene stays still. Select a step to see its pose.</p>',
    '<p class="guide-visual-credit">Crew and Mini Crew illustrations © Florian Bruniaux, outside the guide’s CC BY-SA licence.</p>',
    '</figcaption>',
    '</figure>',
  ].join('\n')
}

const HARNESS_LOOP = ['Context', 'Model', 'Action', 'Observation', 'Verification']

export function harnessFigureHtml() {
  return [
    '<figure class="guide-visual harness-sketch not-content" data-harness-sketch>',
    '<div class="harness-sketch-poster" data-harness-poster><img src="/design/harness-sketch/assets/workshop-1400.webp" srcset="/design/harness-sketch/assets/workshop-700.webp 700w, /design/harness-sketch/assets/workshop-900.webp 900w, /design/harness-sketch/assets/workshop-1400.webp 1400w" sizes="(min-width: 72rem) 52rem, calc(100vw - 2rem)" width="1774" height="887" loading="lazy" decoding="async" alt="A human directs the work at his desk while Crew agents and smaller Mini Crew subagents prepare context, operate tools and inspect results in a pencil-drawn workshop."></div>',
    '<div class="harness-sketch-frame" id="harness-sketch-frame" data-harness-frame></div>',
    '<figcaption class="harness-sketch-caption">',
    '<p><strong>Inside the harness, one request at a time.</strong> You set the goal and the checks. The harness loads the context the step needs, the model proposes an action, and the harness runs it within its permissions. The observation goes back to the model, even after a success. Verification decides whether the result is ready for review or goes back for a fix, and you stay in control of the decision.</p>',
    `<ol class="harness-loop" aria-label="The harness loop">${HARNESS_LOOP.map((step, i) => `<li><span>0${i + 1}</span> ${step}</li>`).join('')}</ol>`,
    '<div class="harness-sketch-actions"><button type="button" class="btn btn-primary" data-harness-open hidden aria-expanded="false" aria-controls="harness-sketch-frame">Play the animated workshop</button><button type="button" class="btn btn-secondary" data-harness-close hidden>Back to the still sketch</button><span class="harness-sketch-meta">49 seconds · no sound · pause, replay and step controls</span><a class="btn btn-quiet" href="/design/harness-sketch/index.html">Open the workshop on its own ↗</a></div>',
    '<p class="guide-visual-credit">Pencil workshop © Florian Bruniaux, adapted from workshop study V9, outside the guide’s CC BY-SA licence.</p>',
    '</figcaption>',
    '</figure>',
  ].join('\n')
}

/** Page key (path under guide/, without .md) → where its figure goes. */
export const GUIDE_VISUALS = {
  'ultimate-guide/04-agents': { before: /^### Why use agents\?[ \t]*$/m, marker: 'data-crew-relay', html: relayFigureHtml },
  'agent-harness': { before: /^### Choose the right entry point[ \t]*$/m, marker: 'data-harness-sketch', html: harnessFigureHtml },
}

/**
 * Insert the page's figure before its anchor heading. A missing anchor
 * leaves the page as it is and warns, so a renamed heading never breaks the build.
 * @param {string} page
 * @param {string} markdown
 */
export function injectGuideVisuals(page, markdown) {
  const visual = GUIDE_VISUALS[page]
  if (!visual || markdown.includes(visual.marker)) return markdown
  const match = visual.before.exec(markdown)
  if (!match) {
    console.warn(`[guide-visuals] ${page}: anchor ${visual.before} not found, figure skipped`)
    return markdown
  }
  return `${markdown.slice(0, match.index)}${visual.html()}\n\n${markdown.slice(match.index)}`
}
