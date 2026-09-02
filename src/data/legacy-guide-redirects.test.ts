import assert from 'node:assert/strict'
import test from 'node:test'

import { legacyGuideRedirects } from './legacy-guide-redirects.mjs'

const redirects = legacyGuideRedirects

test('redirects malformed learning-path URLs emitted by the old link rewriter', () => {
  assert.equal(redirects['/guide/01-installation/'], '/guide/learning-path/01-installation/')
  assert.equal(redirects['/guide/03-memory/'], '/guide/learning-path/03-memory/')
  assert.equal(redirects['/guide/05-skills/'], '/guide/learning-path/05-skills/')
})

test('redirects malformed workflow URLs emitted by the old link rewriter', () => {
  assert.equal(redirects['/guide/agent-teams/'], '/guide/workflows/agent-teams/')
  assert.equal(redirects['/guide/dynamic-workflows/'], '/guide/workflows/dynamic-workflows/')
})

test('redirects source-directory URLs retained in published portfolio PDFs', () => {
  assert.equal(redirects['/guide/ecosystem/agentic-tools/'], '/guide/agentic-tools/')
  assert.equal(redirects['/guide/ops/ai-traceability/'], '/guide/ai-traceability/')
  assert.equal(redirects['/guide/ops/api-gateway/'], '/guide/api-gateway/')
  assert.equal(redirects['/guide/ops/observability/'], '/guide/observability/')
  assert.equal(redirects['/guide/roles/team-deployment/'], '/guide/adoption-approaches/')
})

test('redirects the unnormalized French guide filename', () => {
  assert.equal(redirects['/guide/ultimate-guide.fr/'], '/guide/ultimate-guidefr/')
})
