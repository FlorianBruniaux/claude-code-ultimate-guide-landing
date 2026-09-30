import type { Measurement } from '../../data/token-saving-benchmarks.ts'

const MINUS = '−'

/** Signed percent with a typographic minus: -39 -> "−39%", 13 -> "+13%". */
export function fmtPct(value: number): string {
  const abs = Math.abs(value)
  const sign = value > 0 ? '+' : value < 0 ? MINUS : ''
  return `${sign}${abs}%`
}

export function unitLabel(unit: Measurement['unit']): string {
  return unit === 'cost' ? 'cost' : unit
}

/** Plain-words reading of one value, so color and position are never the only signal. */
export function describeValue(value: number, unit: Measurement['unit']): string {
  const abs = Math.abs(value)
  if (value === 0) return `no change in ${unit}`
  if (unit === 'cost') return value < 0 ? `${abs}% cheaper` : `${abs}% more expensive`
  return value < 0 ? `${abs}% fewer ${unit}` : `${abs}% more ${unit}`
}

export function chartDomain(values: number[], step = 20): { lo: number; hi: number } {
  const lo = Math.floor(Math.min(0, ...values) / step) * step
  const hi = Math.ceil(Math.max(0, ...values) / step) * step
  return { lo, hi }
}

export function position(value: number, lo: number, hi: number): number {
  return ((value - lo) / (hi - lo)) * 100
}
