import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { initSecurityChecklists } from './security-checklist.ts'

function fixture() {
  const window = new Window()
  window.document.body.innerHTML = `
    <section data-security-checklist data-storage-key="security-v1">
      <input type="checkbox" data-checklist-item value="one">
      <input type="checkbox" data-checklist-item value="two">
      <p data-checklist-progress></p>
      <button type="button" data-checklist-reset>Reset</button>
    </section>`
  return window.document as unknown as Document
}

test('checklist remains interactive when storage throws', () => {
  const document = fixture()
  const storage = {
    getItem() { throw new Error('blocked') },
    setItem() { throw new Error('blocked') },
    removeItem() { throw new Error('blocked') },
    clear() {},
    key() { return null },
    length: 0,
  } satisfies Storage
  initSecurityChecklists(document, storage)
  document.querySelector<HTMLInputElement>('[data-checklist-item]')?.click()
  assert.equal(document.querySelector('[data-checklist-progress]')?.textContent, '1 of 2 complete')
})

test('restores persisted checklist values', () => {
  const document = fixture()
  const data = new Map([['security-v1', '["two"]']])
  const storage = {
    getItem(key: string) { return data.get(key) ?? null },
    setItem(key: string, value: string) { data.set(key, value) },
    removeItem(key: string) { data.delete(key) },
    clear() { data.clear() },
    key() { return null },
    length: data.size,
  } satisfies Storage
  initSecurityChecklists(document, storage)
  assert.equal(document.querySelector<HTMLInputElement>('[value="two"]')?.checked, true)
  assert.equal(document.querySelector('[data-checklist-progress]')?.textContent, '1 of 2 complete')
})
