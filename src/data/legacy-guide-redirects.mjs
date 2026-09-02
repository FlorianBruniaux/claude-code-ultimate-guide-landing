import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const guideRepo = resolve(
  process.env.GUIDE_REPO_PATH ?? resolve(import.meta.dirname, '../../..', 'claude-code-ultimate-guide'),
)
const workflowsDir = resolve(guideRepo, 'guide/workflows')
const flatGuideSourceDirs = ['core', 'security', 'ecosystem', 'roles', 'ops']

const flatGuideSourceRedirects = Object.fromEntries(
  flatGuideSourceDirs.flatMap((directory) => {
    const sourceDir = resolve(guideRepo, `guide/${directory}`)
    if (!existsSync(sourceDir)) return []

    return readdirSync(sourceDir)
      .filter((file) => file.endsWith('.md') && file !== 'README.md')
      .map((file) => {
        const slug = file.replace(/\.md$/, '')
        return [`/guide/${directory}/${slug}/`, `/guide/${slug}/`]
      })
  }),
)

const workflowRedirects = existsSync(workflowsDir)
  ? Object.fromEntries(
      readdirSync(workflowsDir)
        .filter((file) => file.endsWith('.md') && file !== 'README.md')
        .map((file) => {
          const slug = file.replace(/\.md$/, '')
          return [`/guide/${slug}/`, `/guide/workflows/${slug}/`]
        }),
    )
  : {}

export const legacyGuideRedirects = {
  ...flatGuideSourceRedirects,
  ...workflowRedirects,
  '/guide/01-installation/': '/guide/learning-path/01-installation/',
  '/guide/03-memory/': '/guide/learning-path/03-memory/',
  '/guide/05-skills/': '/guide/learning-path/05-skills/',
  '/guide/roles/team-deployment/': '/guide/adoption-approaches/',
  '/guide/ultimate-guide.fr/': '/guide/ultimate-guidefr/',
}
