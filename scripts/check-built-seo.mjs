import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { checkBuiltSeo } from './lib/seo-contracts.mjs'
import { readGuideLastmods } from '../src/data/guide-lastmod.mjs'
import { contextualLinks } from '../src/data/seo-editorial-contract.mjs'

const distDir = resolve(process.cwd(), 'dist')
const guideDates = readGuideLastmods(resolve(process.cwd(), 'src/content/docs'))
const failures = checkBuiltSeo({ distDir, guideDates, contextualLinks })

const hooksRoute = 'guide/ultimate-guide/07-hooks/'
const hooksAnchor = '7-hooks'
const hooksPage = readFileSync(resolve(distDir, hooksRoute, 'index.html'), 'utf8')
if ([...hooksPage.matchAll(/\bid="7-hooks"/g)].length !== 1) {
  failures.push(`/${hooksRoute}: expected one #${hooksAnchor} chapter anchor`)
}

const hooksLink = `href="/${hooksRoute}#${hooksAnchor}"`
for (const source of [
  'guide/agent-evaluation/',
  'guide/architecture/',
  'guide/glossary/',
  'guide/ultimate-guide/00-introduction/',
  'guide/ultimate-guide/02-core-workflow/',
  'guide/ultimate-guide/09-advanced-patterns/',
]) {
  const page = readFileSync(resolve(distDir, source, 'index.html'), 'utf8')
  if (!page.includes(hooksLink) || page.includes('href="/guide/ultimate-guide/06-commands/#7-hooks"')) {
    failures.push(`/${source}: expected the Hooks link to resolve to /${hooksRoute}#${hooksAnchor}`)
  }
}

const frenchGuide = readFileSync(resolve(distDir, 'guide/ultimate-guidefr/index.html'), 'utf8')
if (!frenchGuide.includes('id="7-hooks"') || !frenchGuide.includes('href="/guide/ultimate-guidefr/#7-hooks"') || frenchGuide.includes(hooksLink)) {
  failures.push('/guide/ultimate-guidefr/: expected the Hooks links to stay within the French guide')
}

if (failures.length > 0) {
  console.error('Built SEO contract failures:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
}
else {
  console.log('Built SEO contracts passed.')
}

console.log('External verification remains required: production redirect status and response headers are not proven by this static build check.')
