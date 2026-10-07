import { DIAGRAM_THEMES } from './diagrams-data'

// Compatibility view derived from each entry's Source link, never a positional mapping.
export const DIAGRAM_GUIDE_URLS: Record<string, string[]> = Object.fromEntries(
  DIAGRAM_THEMES.map(theme => [theme.id, theme.diagrams.map(diagram => diagram.guideUrl)]),
)
