import { resolve } from 'node:path'

import { checkBuiltSeo } from './lib/seo-contracts.mjs'
import { readGuideLastmods } from '../src/data/guide-lastmod.mjs'

const distDir = resolve(process.cwd(), 'dist')
const guideDates = readGuideLastmods(resolve(process.cwd(), 'src/content/docs'))
const failures = checkBuiltSeo({ distDir, guideDates })

if (failures.length > 0) {
  console.error('Built SEO contract failures:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
}
else {
  console.log('Built SEO contracts passed.')
}

console.log('External verification remains required: production redirect status and response headers are not proven by this static build check.')
