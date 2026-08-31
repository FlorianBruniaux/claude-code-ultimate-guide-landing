import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { initRoleCatalog } from './role-catalog.ts'

function createCatalog(): Document {
  const window = new Window()
  const document = window.document

  document.body.innerHTML = `
    <section data-role-catalog data-default-filter="Role family">
      <button type="button" data-role-filter="Role family" aria-pressed="false">Role families</button>
      <button type="button" data-role-filter="Capability" aria-pressed="false">Capabilities</button>
      <button type="button" data-role-filter="all" aria-pressed="false">All profiles</button>
      <p data-role-count></p>
      <article id="ai-engineer" data-role-card data-role-evidence="Role family">AI Engineer</article>
      <article id="ai-architect" data-role-card data-role-evidence="Role family">AI Architect</article>
      <article id="prompt-engineer" data-role-card data-role-evidence="Capability">Prompt Engineer</article>
    </section>
  `

  return document as unknown as Document
}

test('initializes the catalog with only the default evidence category visible', () => {
  const document = createCatalog()

  initRoleCatalog(document)

  const cards = [...document.querySelectorAll<HTMLElement>('[data-role-card]')]
  assert.deepEqual(cards.map((card) => card.hidden), [false, false, true])
  assert.equal(document.querySelector('[data-role-filter="Role family"]')?.getAttribute('aria-pressed'), 'true')
  assert.equal(document.querySelector('[data-role-count]')?.textContent, '2 profiles shown')
})

test('updates cards, pressed state, and count when a filter is selected', () => {
  const document = createCatalog()
  initRoleCatalog(document)

  const capabilityButton = document.querySelector<HTMLButtonElement>('[data-role-filter="Capability"]')
  capabilityButton?.click()

  const cards = [...document.querySelectorAll<HTMLElement>('[data-role-card]')]
  assert.deepEqual(cards.map((card) => card.hidden), [true, true, false])
  assert.equal(capabilityButton?.getAttribute('aria-pressed'), 'true')
  assert.equal(document.querySelector('[data-role-filter="Role family"]')?.getAttribute('aria-pressed'), 'false')
  assert.equal(document.querySelector('[data-role-count]')?.textContent, '1 profile shown')

  document.querySelector<HTMLButtonElement>('[data-role-filter="all"]')?.click()
  assert.deepEqual(cards.map((card) => card.hidden), [false, false, false])
  assert.equal(document.querySelector('[data-role-count]')?.textContent, '3 profiles shown')
})

test('reveals a filtered profile when navigation targets its hash', () => {
  const document = createCatalog()
  initRoleCatalog(document)

  const view = document.defaultView
  assert.ok(view)
  view.location.hash = '#prompt-engineer'
  view.dispatchEvent(new view.HashChangeEvent('hashchange'))

  const target = document.getElementById('prompt-engineer')
  assert.equal(target?.hidden, false)
  assert.equal(document.querySelector('[data-role-filter="Capability"]')?.getAttribute('aria-pressed'), 'true')
  assert.equal(document.querySelector('[data-role-count]')?.textContent, '1 profile shown')
})
