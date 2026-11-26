import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import test from 'node:test'
import { remarkHeadingIds } from '../../plugins/remark-heading-ids.mjs'
import { transformGuideMarkdown } from './guide-seo-overrides.mjs'

const require = createRequire(import.meta.url)
const astroRequire = createRequire(require.resolve('astro/package.json'))
const { createMarkdownProcessor } = await import(astroRequire.resolve('@astrojs/markdown-remark'))
const guideRepo = resolve(process.env.GUIDE_REPO_PATH ?? '../claude-code-ultimate-guide')

for (const [source, ids] of [
  ['guide/ops/devops-sre.md', ['pattern-infrastructure-diagnosis', 'kubernetes-troubleshooting']],
  ['guide/workflows/spec-first.md', ['step-by-step-workflow']],
  ['guide/ultimate-guide.md', ['54-skill-examples']],
] as const) {
  test(`${source}: nested examples do not swallow the linked document headings`, { skip: !existsSync(resolve(guideRepo, source)) }, async () => {
    const processor = await createMarkdownProcessor({ syntaxHighlight: false, remarkPlugins: [remarkHeadingIds] })
    const markdown = transformGuideMarkdown(readFileSync(resolve(guideRepo, source), 'utf8'), source)
    const { code } = await processor.render(markdown)
    for (const id of ids) assert.ok(code.includes(`id="${id}"`), `missing rendered heading #${id}`)
  })
}
