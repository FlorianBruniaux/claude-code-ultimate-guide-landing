import assert from 'node:assert/strict'
import test from 'node:test'
import { stripMarkdown } from '../../scripts/lib/strip-markdown.mjs'

// Search keywords come from this text: rendered Mermaid diagrams must not leak
// their SVG markup or CSS into the index.

const renderedDiagram = [
  'Memory layers overview.',
  '<div class="mermaid-diagram">',
  '<div class="mermaid-light"><svg class="diagram-svg" id="m-0" viewBox="0 0 10 10"><style>#m-0{font-family:"trebuchet ms";fill:#000000;}</style><g><text>Session</text></g></svg></div>',
  '</div>',
  'Pick the smallest layer.',
].join('\n')

test('stripMarkdown drops rendered SVG diagrams and their styles', () => {
  const text = stripMarkdown(renderedDiagram)
  assert.doesNotMatch(text, /svg|viewBox|trebuchet|fill:|<\/?div/)
  assert.match(text, /^Memory layers overview\. Pick the smallest layer\.$/)
})

test('stripMarkdown removes HTML tags but keeps placeholders such as <required arg>', () => {
  assert.equal(
    stripMarkdown('<details><summary><b>Catalog</b></summary> argument-hint: "<required arg>"</details>'),
    'Catalog argument-hint: "<required arg "',
  )
})

test('stripMarkdown keeps link text and removes code', () => {
  assert.equal(stripMarkdown('Read [the guide](/guide/) and run `pnpm test`.'), 'Read the guide and run .')
})
