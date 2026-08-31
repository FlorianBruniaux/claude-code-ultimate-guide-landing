import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { Window } from 'happy-dom'

const styles = [
  ':root { --bg-tertiary: #f4ede7; }',
  readFileSync(new URL('./components.css', import.meta.url), 'utf8'),
  readFileSync(new URL('./security-page.css', import.meta.url), 'utf8'),
].join('\n')

test('security terminal code keeps a transparent surface in light mode', () => {
  const window = new Window()
  const { document } = window

  document.head.innerHTML = `<style>${styles}</style>`
  document.body.innerHTML = `
    <div class="security-code">
      <pre><code>agentsec scan /path/to/repository</code></pre>
    </div>
  `

  const code = document.querySelector('code')
  assert.ok(code)

  const computed = window.getComputedStyle(code)
  assert.equal(computed.backgroundColor, 'transparent')
  assert.equal(computed.padding, '0px')
})
