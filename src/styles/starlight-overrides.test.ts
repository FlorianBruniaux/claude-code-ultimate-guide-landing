import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { Window } from 'happy-dom'

const styles = readFileSync(new URL('./starlight-overrides.css', import.meta.url), 'utf8')

test('guide splash content keeps the Starlight reading-width constraint', () => {
  const window = new Window()
  const { document } = window

  document.head.innerHTML = `
    <style>${styles}</style>
    <style>html:not([data-has-sidebar]) { --sl-content-width: 67.5rem; }</style>
  `
  document.body.innerHTML = `
    <main>
      <div class="main-pane">
        <div class="content-panel">
          <div class="sl-container">
            <div class="sl-markdown-content">Guide portal</div>
          </div>
        </div>
      </div>
    </main>
  `

  const container = document.querySelector('.sl-container')
  assert.ok(container)

  assert.equal(window.getComputedStyle(container).maxWidth, '1080px')
})
