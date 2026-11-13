import assert from 'node:assert/strict'
import test from 'node:test'

import { rehypeTaskListLabels } from '../../plugins/rehype-task-list-labels.mjs'

// UX-18: Markdown task lists render unlabelled disabled checkboxes.
const checkbox = (checked: boolean) => ({ type: 'element', tagName: 'input', properties: { type: 'checkbox', disabled: true, checked }, children: [] })
const text = (value: string) => ({ type: 'text', value })

test('a task-list checkbox is labelled with its item text', () => {
  const box = checkbox(false)
  const nested = { type: 'element', tagName: 'ul', properties: {}, children: [{ type: 'element', tagName: 'li', properties: {}, children: [text('child step')] }] }
  const tree = {
    type: 'root',
    children: [{ type: 'element', tagName: 'li', properties: { className: ['task-list-item'] }, children: [box, text(' Install '), { type: 'element', tagName: 'code', properties: {}, children: [text('claude')] }, nested] }],
  }
  rehypeTaskListLabels()(tree)
  assert.equal((box.properties as Record<string, unknown>).ariaLabel, 'Install claude')
  assert.equal(box.properties.checked, false)
})

test('a checkbox that already has a label keeps it', () => {
  const box = checkbox(true)
  ;(box.properties as Record<string, unknown>).ariaLabel = 'Done'
  const tree = { type: 'root', children: [{ type: 'element', tagName: 'li', properties: {}, children: [box, text(' Other text')] }] }
  rehypeTaskListLabels()(tree)
  assert.equal((box.properties as Record<string, unknown>).ariaLabel, 'Done')
})
