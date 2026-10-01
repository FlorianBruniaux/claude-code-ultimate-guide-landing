/**
 * View-only helpers for the /token-savings/ page. Pure functions over the verified data in
 * token-saving-benchmarks.ts and token-saving-catalog.ts. Nothing here changes a figure.
 */
import { BENCHMARKS, CLAIMS_VS_MEASURED, MEASUREMENTS, type ClaimVsMeasured, type Measurement } from './token-saving-benchmarks.ts'
import { CATALOG, type CatalogEntry } from './token-saving-catalog.ts'

/** A row where the benchmark publisher measured its own tool (THOL for Tokenade, Dasein for Parsec). */
export const isMakerMeasurement = (m: Measurement): boolean =>
  BENCHMARKS.find((b) => b.id === m.benchmark)?.makerOf === m.tool

/** Every measurement except a publisher measuring its own tool. */
export const THIRD_PARTY_MEASUREMENTS: Measurement[] = MEASUREMENTS.filter((m) => !isMakerMeasurement(m))

export interface ToolResults {
  tool: string
  /** Every measurement of this tool, in the order of the source list (study order). */
  rows: Measurement[]
}

/** Rows that are a model change and not a tool. They are drawn as a reference, not a tool row. */
export const REFERENCE_TOOLS: readonly string[] = ['Switch to GPT-5.6 Terra xhigh']

export const isReferenceTool = (tool: string): boolean => REFERENCE_TOOLS.includes(tool)

/**
 * Group measurements by tool. Tool order is alphabetical (neutral, stable); rows inside a
 * tool keep the input order. Every input measurement appears exactly once.
 */
export function groupMeasurementsByTool(measurements: Measurement[] = THIRD_PARTY_MEASUREMENTS): ToolResults[] {
  const byTool = new Map<string, Measurement[]>()
  for (const m of measurements) {
    const rows = byTool.get(m.tool)
    if (rows) rows.push(m)
    else byTool.set(m.tool, [m])
  }
  return [...byTool.entries()]
    .map(([tool, rows]) => ({ tool, rows }))
    .sort((a, b) => a.tool.localeCompare(b.tool, 'en', { sensitivity: 'base' }))
}

export type Sign = 'good' | 'bad' | 'zero'

/** Negative = cheaper or fewer tokens than the tool-free baseline. */
export const signOf = (value: number): Sign => (value < 0 ? 'good' : value > 0 ? 'bad' : 'zero')

export type MarkerShape = 'circle' | 'diamond'

/** Cost is a circle, token counts are a diamond, so color is never the only cue. */
export const shapeOf = (unit: Measurement['unit']): MarkerShape => (unit === 'cost' ? 'circle' : 'diamond')

export interface CatalogRow {
  entry: CatalogEntry
  results: Measurement[]
}

/** Third-party results for a catalog entry, from the tool name recorded in `measuredAs`. */
export function resultsFor(entry: CatalogEntry, measurements: Measurement[] = THIRD_PARTY_MEASUREMENTS): Measurement[] {
  return entry.measuredAs ? measurements.filter((m) => m.tool === entry.measuredAs) : []
}

export function catalogRows(catalog: CatalogEntry[] = CATALOG, measurements: Measurement[] = THIRD_PARTY_MEASUREMENTS): CatalogRow[] {
  return catalog
    .map((entry) => ({ entry, results: resultsFor(entry, measurements) }))
    .sort((a, b) => a.entry.name.localeCompare(b.entry.name, 'en', { sensitivity: 'base' }))
}

export interface ClaimCard {
  claim: ClaimVsMeasured
  results: Measurement[]
  maintainerResponses: CatalogEntry['maintainerResponses']
}

/** One card per tool that has a claim-versus-study entry, with every result for that tool. */
export function claimCards(
  claims: ClaimVsMeasured[] = CLAIMS_VS_MEASURED,
  measurements: Measurement[] = THIRD_PARTY_MEASUREMENTS,
  catalog: CatalogEntry[] = CATALOG,
): ClaimCard[] {
  return claims.map((claim) => ({
    claim,
    results: measurements.filter((m) => m.tool === claim.tool),
    maintainerResponses: catalog.find((c) => c.measuredAs === claim.tool)?.maintainerResponses ?? [],
  }))
}
