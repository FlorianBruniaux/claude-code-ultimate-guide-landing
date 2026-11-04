import assert from 'node:assert/strict'
import test from 'node:test'
import { remarkHeadingIds } from './remark-heading-ids.mjs'

function heading(text: string) {
  return { type: 'heading', depth: 3, children: [{ type: 'text', value: text }] } as {
    type: string
    depth: number
    children: Array<{ type: string; value: string }>
    data?: { hProperties?: { id?: string } }
  }
}

test('a {#id} suffix becomes the heading id and leaves the visible text', () => {
  const node = heading('Session Pattern Discovery (cc-sessions discover) {#session-pattern-discovery}')
  remarkHeadingIds()({ type: 'root', children: [node] })

  assert.equal(node.children[0].value, 'Session Pattern Discovery (cc-sessions discover)')
  assert.equal(node.data?.hProperties?.id, 'session-pattern-discovery')
})

test('headings without the suffix and braces inside the text stay untouched', () => {
  const plain = heading('Step 1: Describe the problem')
  const inline = heading('Use {#id} syntax in the middle')
  remarkHeadingIds()({ type: 'root', children: [plain, inline] })

  assert.equal(plain.children[0].value, 'Step 1: Describe the problem')
  assert.equal(plain.data, undefined)
  assert.equal(inline.children[0].value, 'Use {#id} syntax in the middle')
  assert.equal(inline.data, undefined)
})
