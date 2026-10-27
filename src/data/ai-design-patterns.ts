// View model for /ai-design-patterns/.
// Source of truth: machine-readable/ai-design-patterns.json in the guide repo,
// copied to ./ai-design-patterns.json by scripts/prepare-guide-content.mjs.
import raw from './ai-design-patterns.json' with { type: 'json' }

export type Consensus = 'consensus' | 'single-source' | 'divergent'
export type Provenance = 'third-party' | 'own-synthesis'
export type Mechanism = { name: string; doc: string }
export type SourceRef = { id: string; title: string; author: string; url: string; kind: string }
export type Family = { id: string; label: string }

export type PatternRow = {
  id: string
  classic: string
  family: string
  familyLabel: string
  classicIntent: string
  agentAnalogue: { label: string; sources: SourceRef[] }[]
  claudeCode: Mechanism[]
  consensus: Consensus
  provenance: Provenance
  failureMode: string
  verify: string
  guideAnchor: string
  sources: SourceRef[]
}

export type NativePattern = {
  id: string
  name: string
  summary: string
  whyNew: string
  claudeCode: Mechanism[]
  guideAnchor: string
  sources: SourceRef[]
}

export type AntiPattern = {
  id: string
  name: string
  symptom: string
  fix: string
  category: string
  patterns: { id: string; name: string }[]
  sources: SourceRef[]
}

export const GUIDE_PAGE = '/guide/ai-design-patterns/'

export function guideHref(anchor?: string): string {
  return anchor ? `${GUIDE_PAGE}#${anchor}` : GUIDE_PAGE
}

export const CONSENSUS_LABELS: Record<Consensus, string> = {
  consensus: 'Consensus',
  'single-source': 'Single source',
  divergent: 'Divergent',
}

export const PROVENANCE_LABELS: Record<Provenance, string> = {
  'third-party': 'Named by a source',
  'own-synthesis': 'Our mapping',
}

export const LAST_VERIFIED: string = raw.last_verified

const sourcesById = new Map<string, SourceRef>(raw.sources.map(source => [source.id, source]))

function resolveSources(ids: string[]): SourceRef[] {
  return ids.map(id => {
    const source = sourcesById.get(id)
    if (!source) throw new Error(`ai-design-patterns: unknown source ${id}`)
    return source
  })
}

export const FAMILIES: Family[] = raw.families
const familyLabels = new Map(FAMILIES.map(family => [family.id, family.label]))

export const PATTERN_ROWS: PatternRow[] = raw.crosswalk.map(row => ({
  id: row.id,
  classic: row.classic,
  family: row.family,
  familyLabel: familyLabels.get(row.family) ?? row.family,
  classicIntent: row.classic_intent,
  agentAnalogue: row.agent_analogue.map(analogue => ({ label: analogue.label, sources: resolveSources(analogue.sources) })),
  claudeCode: row.claude_code,
  consensus: row.consensus as Consensus,
  provenance: row.provenance as Provenance,
  failureMode: row.failure_mode,
  verify: row.verify,
  guideAnchor: row.id,
  sources: resolveSources(row.sources),
}))

export const NATIVE_PATTERNS: NativePattern[] = raw.native.map(row => ({
  id: row.id,
  name: row.name,
  summary: row.summary,
  whyNew: row.why_new,
  claudeCode: row.claude_code,
  guideAnchor: row.id,
  sources: resolveSources(row.sources),
}))

const patternNames = new Map<string, string>([
  ...PATTERN_ROWS.map(row => [row.id, row.classic] as [string, string]),
  ...NATIVE_PATTERNS.map(row => [row.id, row.name] as [string, string]),
])

export const ANTI_PATTERN_CATEGORIES: { id: string; label: string }[] = raw.anti_pattern_categories.map(category => ({
  id: category.id,
  label: category.label,
}))

export const ANTI_PATTERNS: AntiPattern[] = raw.anti_patterns.map(row => ({
  id: row.id,
  name: row.name,
  symptom: row.symptom,
  fix: row.fix,
  category: row.category,
  patterns: row.patterns.map(id => ({ id, name: patternNames.get(id) ?? id })),
  sources: resolveSources(row.sources),
}))

export const PATTERN_COUNTS = {
  crosswalk: PATTERN_ROWS.length,
  native: NATIVE_PATTERNS.length,
  antiPatterns: ANTI_PATTERNS.length,
  divergent: PATTERN_ROWS.filter(row => row.consensus === 'divergent').length,
  ownMapping: PATTERN_ROWS.filter(row => row.provenance === 'own-synthesis').length,
}
