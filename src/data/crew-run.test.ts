import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { RUN_DURATION, RUN_STILL, runPositions, whipSwing } from '../scripts/crew-run.mjs'

// "Run for it!" from the portfolio Crew engine, at the end of the homepage (15/11/2026).

const root = (path: string) => new URL(`../../${path}`, import.meta.url)

test('the Mini Crews wait, then scatter out of the frame while the Crew stays put', () => {
  const start = runPositions(0)
  assert.equal(start.length, 4)
  assert.deepEqual(start.slice(0, 3), [0.4, 0.56, 0.72])
  const end = runPositions(RUN_DURATION)
  for (const x of end.slice(0, 3)) assert.ok(x > 1, `a Mini Crew left the frame (${x})`)
  assert.ok(end[3] < 0.1, 'the Crew stays on the left')
})

test('the key frame catches the whip crack, before anyone runs', () => {
  assert.deepEqual(runPositions(RUN_STILL).slice(0, 3), [0.4, 0.56, 0.72])
  assert.equal(whipSwing(RUN_STILL).flash, true)
  assert.equal(whipSwing(0).flash, false)
  assert.equal(whipSwing(RUN_DURATION).angle, 0)
})

test('the homepage ends with the scene, after the consulting call to action', () => {
  const page = readFileSync(root('src/pages/index.astro'), 'utf8')
  assert.match(page, /<ConsultingCta placement="homepage" \/>\s*<CrewRunForIt \/>/)
})

test('the scene waits for a click, reuses the guide sprites and keeps its controls', () => {
  const html = readFileSync(root('src/components/landing/CrewRunForIt.astro'), 'utf8')
  assert.match(html, /Wake the agents/)
  assert.match(html, /\/images\/crew\/leader-640\.webp/)
  assert.match(html, /\/images\/crew\/subagents-512\.webp/)
  for (const control of ['data-run-toggle', 'data-run-pause', 'data-run-replay', 'data-run-motion-note']) assert.match(html, new RegExp(control))
  assert.doesNotMatch(html, /<image[^>]+href=/, 'no sprite is requested before the visitor wakes the agents')
})
