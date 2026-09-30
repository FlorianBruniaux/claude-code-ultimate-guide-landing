import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { initSwitchyard } from './finops-switchyard.ts'

const fire = (target: EventTarget, event: unknown) => target.dispatchEvent(event as Event)

function createSwitchyard() {
  const window = new Window({ url: 'https://cc.bruniaux.com/finops/', width: 1440, height: 1000 })
  const document = window.document
  document.body.innerHTML = `
    <div data-switchyard>
      <svg data-switchyard-svg aria-hidden="true"></svg>
      <ol>
        <li data-lever-item="a"><details data-lever="a" data-regimes="api subscription" data-partial="capacity"><summary>A</summary><p>x</p></details></li>
        <li data-lever-item="b"><details data-lever="b" data-regimes="api"><summary>B</summary><p>x</p></details></li>
        <li data-lever-item="c"><details data-lever="c" data-regimes="capacity"><summary>C</summary><p>x</p></details></li>
      </ol>
      <div>
        <button type="button" data-regime="subscription" aria-pressed="false" disabled>S</button>
        <button type="button" data-regime="api" aria-pressed="false" disabled>A</button>
        <button type="button" data-regime="capacity" aria-pressed="false" disabled>C</button>
      </div>
    </div>`
  const root = document.querySelector('[data-switchyard]') as unknown as HTMLElement
  return { window, document, root }
}

test('initSwitchyard draws one path per edge, one of them dashed', () => {
  const { root } = createSwitchyard()
  initSwitchyard(root)
  const paths = root.querySelectorAll('svg path')
  assert.equal(paths.length, 5)
  assert.equal(root.querySelectorAll('svg path[data-partial="true"]').length, 1)
})

test('initSwitchyard enables the destination buttons', () => {
  const { root } = createSwitchyard()
  initSwitchyard(root)
  assert.equal(root.querySelectorAll('button[disabled]').length, 0)
})

test('opening a lever selects it and closes the others', () => {
  const { window, root } = createSwitchyard()
  initSwitchyard(root)
  const a = root.querySelector('[data-lever="a"]') as HTMLDetailsElement
  const b = root.querySelector('[data-lever="b"]') as HTMLDetailsElement
  a.open = true
  fire(a, new window.Event('toggle'))
  assert.equal(root.dataset.selectedLever, 'a')
  const dimmed = [...root.querySelectorAll('svg path')].filter((p) => p.getAttribute('data-state') === 'dim')
  assert.equal(dimmed.length, 2)
  b.open = true
  fire(b, new window.Event('toggle'))
  assert.equal(root.dataset.selectedLever, 'b')
  assert.equal(a.open, false)
})

test('Escape closes the open lever', () => {
  const { window, root } = createSwitchyard()
  initSwitchyard(root)
  const a = root.querySelector('[data-lever="a"]') as HTMLDetailsElement
  a.open = true
  fire(a, new window.Event('toggle'))
  fire(root, new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  assert.equal(a.open, false)
  assert.equal(root.dataset.selectedLever, undefined)
})

test('clicking a destination filters levers and toggles aria-pressed', () => {
  const { root } = createSwitchyard()
  initSwitchyard(root)
  const api = root.querySelector('[data-regime="api"]') as HTMLButtonElement
  api.click()
  assert.equal(api.getAttribute('aria-pressed'), 'true')
  assert.equal(root.dataset.filter, 'api')
  const dimmedItems = [...root.querySelectorAll('[data-lever-item]')].filter((li) => li.hasAttribute('data-dimmed'))
  assert.deepEqual(dimmedItems.map((li) => li.getAttribute('data-lever-item')), ['c'])
  api.click()
  assert.equal(api.getAttribute('aria-pressed'), 'false')
  assert.equal(root.dataset.filter, undefined)
  assert.equal(root.querySelectorAll('[data-lever-item][data-dimmed]').length, 0)
})

test('below 900px no path is drawn', () => {
  const { window, root } = createSwitchyard()
  window.happyDOM.setViewport({ width: 390, height: 844 })
  initSwitchyard(root)
  assert.equal(root.querySelectorAll('svg path').length, 0)
})
