import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { initSecurityCatalogs } from './security-catalog.ts'

function fixture() {
  const window = new Window()
  window.document.body.innerHTML = `
    <section data-security-catalog>
      <input data-security-search>
      <button type="button" data-security-filter="critical">Critical</button>
      <button type="button" data-security-reset>Reset</button>
      <p data-security-count></p>
      <article data-security-record data-record-type="critical" data-search-text="critical claude code"></article>
      <article data-security-record data-record-type="high" data-search-text="high mcp server"></article>
      <p data-security-empty hidden>No records</p>
    </section>`
  return window.document as unknown as Document
}

function limitedFixture() {
  const document = fixture()
  const catalog = document.querySelector<HTMLElement>('[data-security-catalog]')!
  catalog.dataset.initialLimit = '1'
  catalog.insertAdjacentHTML('beforeend', '<button type="button" data-security-show-all>Show all</button>')
  return document
}

test('filters records and exposes a resettable zero state', () => {
  const document = fixture()
  initSecurityCatalogs(document)
  const search = document.querySelector<HTMLInputElement>('[data-security-search]')!
  search.value = 'no matching record'
  search.dispatchEvent(new document.defaultView!.Event('input'))
  assert.equal(document.querySelector<HTMLElement>('[data-security-empty]')?.hidden, false)
  document.querySelector<HTMLButtonElement>('[data-security-reset]')?.click()
  assert.equal([...document.querySelectorAll<HTMLElement>('[data-security-record]')].filter((item) => !item.hidden).length, 2)
})

test('combines text and type filters', () => {
  const document = fixture()
  initSecurityCatalogs(document)
  document.querySelector<HTMLButtonElement>('[data-security-filter="critical"]')?.click()
  assert.equal([...document.querySelectorAll<HTMLElement>('[data-security-record]')].filter((item) => !item.hidden).length, 1)
  assert.equal(document.querySelector('[data-security-count]')?.textContent, '1 result')
})

test('limits the initial catalogue but reveals every record on demand', () => {
  const document = limitedFixture()
  initSecurityCatalogs(document)
  assert.equal([...document.querySelectorAll<HTMLElement>('[data-security-record]')].filter((item) => !item.hidden).length, 1)
  document.querySelector<HTMLButtonElement>('[data-security-show-all]')?.click()
  assert.equal([...document.querySelectorAll<HTMLElement>('[data-security-record]')].filter((item) => !item.hidden).length, 2)
})
