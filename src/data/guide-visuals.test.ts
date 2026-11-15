import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { GUIDE_VISUALS, harnessFigureHtml, injectGuideVisuals, relayFigureHtml } from '../../scripts/lib/guide-visuals.mjs'
import { RELAY_DURATION, relayBeat, relayPose } from '../scripts/crew-relay-pose.mjs'

// Portfolio visuals inside two generated guide pages (14/11/2026):
// "Pass the brick" in chapter 04 Agents, the V9 pencil workshop in Agent Harness Engineering.

const root = (path: string) => new URL(`../../${path}`, import.meta.url)

const chapter04 = '## 4.1 What are agents\n\nAgents are specialized sub-processes.\n\n### Why use agents?\n\n| A | B |'
const harnessPage = '## The core claim\n\nText.\n\n*Caption.*\n\n### Choose the right entry point\n\n| Q | A |'

test('the relay scene lands before "Why use agents?" in chapter 04, once', () => {
  const out = injectGuideVisuals('ultimate-guide/04-agents', chapter04)
  assert.match(out, /Agents are specialized sub-processes\.\n\n<figure class="guide-visual crew-relay not-content"[\s\S]*<\/figure>\n\n### Why use agents\?/)
  assert.equal(injectGuideVisuals('ultimate-guide/04-agents', out), out, 'idempotent')
})

test('the workshop sketch lands before "Choose the right entry point" in Agent Harness Engineering', () => {
  const out = injectGuideVisuals('agent-harness', harnessPage)
  assert.match(out, /\*Caption\.\*\n\n<figure class="guide-visual harness-sketch not-content"[\s\S]*<\/figure>\n\n### Choose the right entry point/)
})

test('a missing anchor leaves the page unchanged, and other pages are untouched', () => {
  assert.equal(injectGuideVisuals('agent-harness', '## Other'), '## Other')
  assert.equal(injectGuideVisuals('glossary', chapter04), chapter04)
  assert.deepEqual(Object.keys(GUIDE_VISUALS).sort(), ['agent-harness', 'ultimate-guide/04-agents'])
})

test('both figures are one Markdown HTML block, with no blank line inside', () => {
  for (const html of [relayFigureHtml(), harnessFigureHtml()]) assert.doesNotMatch(html, /\n\s*\n/)
})

test('the relay names both characters and keeps the four steps in the caption', () => {
  const html = relayFigureHtml()
  for (const label of ['CREW', 'MAIN AGENT', 'MINI CREW', 'SUBAGENT']) assert.match(html, new RegExp(`>${label}<`))
  assert.equal(html.match(/data-relay-step="\d"/g)?.length, 4)
  assert.match(html, /data-relay-play/)
  assert.match(html, /data-relay-replay/)
  assert.match(html, /\/images\/crew\/leader-640\.webp/)
  assert.match(html, /\/images\/crew\/subagents-512\.webp/)
})

test('the workshop shows the still sketch and explains the loop before any animation loads', () => {
  const html = harnessFigureHtml()
  assert.match(html, /\/design\/harness-sketch\/assets\/workshop-1400\.webp/)
  for (const step of ['Context', 'Model', 'Action', 'Observation', 'Verification']) assert.match(html, new RegExp(`<li><span>0\\d</span> ${step}</li>`))
  assert.match(html, /data-harness-open hidden/)
  assert.doesNotMatch(html, /<iframe/, 'the animated workshop loads on click only')
})

test('the relay pose follows the brick: handed over, worked on, returned, checked, added to the plan', () => {
  const start = relayPose(0)
  assert.deepEqual([start.task.x, start.task.y], [345, 280])
  assert.equal(start.check, 0)
  const work = relayPose(5)
  assert.deepEqual([work.task.x, work.task.y], [465, 319])
  assert.ok(work.result > 0 && work.result < 1, 'the result is being drawn')
  const checked = relayPose(9)
  assert.equal(checked.result, 1)
  assert.equal(checked.check, 1)
  const end = relayPose(RELAY_DURATION)
  assert.ok(end.task.scale < 0.5 && end.task.x < 300 && end.task.y < 120, 'the brick sits in the plan')
  assert.deepEqual([0.5, 4.5, 7, 9].map(relayBeat), [0, 1, 2, 3])
})

test('the guide serves the retained portfolio files, with WOFF2 fonts', () => {
  for (const file of [
    'public/design/harness-sketch/index.html',
    'public/design/harness-sketch/sketch.css',
    'public/design/harness-sketch/sketch.js',
    'public/design/harness-sketch/l10n.js',
    'public/design/harness-sketch/embed.js',
    'public/design/harness-sketch/assets/workshop.webp',
    'public/design/harness-sketch/assets/workshop-1400.webp',
    'public/fonts/brandbook/ibm-plex-sans-400.woff2',
    'public/fonts/brandbook/LICENSES.txt',
    'public/images/crew/leader-640.webp',
    'public/images/crew/subagents-512.webp',
  ]) assert.ok(existsSync(root(file)), file)
  assert.doesNotMatch(readFileSync(root('public/design/harness-sketch/sketch.css'), 'utf8'), /\.ttf/)
  assert.doesNotMatch(readFileSync(root('public/design/harness-sketch/index.html'), 'utf8'), /href="\/harness\/"/)
})

test('the generation step injects the visuals into chapters and standalone pages, and the CSS is loaded', () => {
  const prepare = readFileSync(root('scripts/prepare-guide-content.mjs'), 'utf8')
  assert.equal(prepare.match(/injectGuideVisuals\(/g)?.length, 2)
  assert.match(readFileSync(root('astro.config.mjs'), 'utf8'), /'\.\/src\/styles\/guide-visuals\.css'/)
})
