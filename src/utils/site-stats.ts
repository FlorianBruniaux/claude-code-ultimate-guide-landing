import { getCollection } from 'astro:content'
import { EXAMPLES } from '../data/examples-data'
import { AGENTSEC_FEED } from '../data/agentsec-security-feed'

/**
 * Single source of truth for the counts shown across the site (hero, meta
 * descriptions, JSON-LD, comparison tables). Computed from the actual data
 * on every build instead of hand-typed per page, so it can't drift the way
 * "275 templates" / "83 CVEs" did (real values were 274 and 42).
 */
export async function getSiteStats() {
  const [cheatsheets, questions] = await Promise.all([
    getCollection('cheatsheets'),
    getCollection('questions'),
  ])

  const templateCount = Object.values(EXAMPLES).reduce((sum, cat) => sum + cat.files.length, 0)

  return {
    templateCount,
    cheatsheetCount: cheatsheets.length,
    quizQuestionCount: questions.length,
    cveCount: AGENTSEC_FEED.database.record_counts.cves,
  }
}
