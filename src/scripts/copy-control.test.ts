import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { initCopyControls } from './copy-control.ts'

function fixture(text = 'claude --permission-mode plan') {
  const window = new Window()
  window.document.body.innerHTML = `
    <div data-copy-container>
      <code data-copy-source>${text}</code>
      <button type="button" data-copy-control>Copy</button>
      <span data-copy-status></span>
    </div>`
  return window.document as unknown as Document
}

test('copy failure reports an error and preserves source text', async () => {
  const document = fixture()
  initCopyControls(document, { writeText: async () => { throw new Error('denied') } })
  document.querySelector<HTMLButtonElement>('[data-copy-control]')?.click()
  await new Promise((resolve) => setTimeout(resolve, 0))
  assert.equal(document.querySelector('[data-copy-status]')?.textContent, 'Copy failed. Select the command manually.')
  assert.equal(document.querySelector('[data-copy-source]')?.textContent, 'claude --permission-mode plan')
})

test('copy success reports completion', async () => {
  const document = fixture()
  initCopyControls(document, { writeText: async () => undefined })
  document.querySelector<HTMLButtonElement>('[data-copy-control]')?.click()
  await new Promise((resolve) => setTimeout(resolve, 0))
  assert.equal(document.querySelector('[data-copy-status]')?.textContent, 'Copied.')
})
