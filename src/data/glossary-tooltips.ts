import { glossaryTerms } from './glossary-data.ts'
import { resolveTooltipTerms } from '../scripts/glossary-tooltips.ts'

// This is intentionally a small, explicit vocabulary. The client receives only
// these validated definitions, never the full glossary dataset.
export const tooltipGlossaryTerms = resolveTooltipTerms(glossaryTerms)
