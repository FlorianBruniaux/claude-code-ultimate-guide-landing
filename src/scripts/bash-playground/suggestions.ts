export interface Suggestion {
  label: string
  command: string
}

/**
 * Pinned commands shown above the prompt. Without these, a visitor who
 * lands on an empty shell doesn't know what to type, the single biggest
 * risk identified during design. Each one demonstrates the cross-file
 * search the static template cards can't do.
 */
export const EXAMPLES_SUGGESTIONS: Suggestion[] = [
  { label: 'Explore hooks', command: 'ls examples/hooks/' },
  { label: 'Find every PreToolUse hook', command: 'grep -rl "PreToolUse" .' },
  { label: 'List all config templates', command: 'find . -name "*.json"' },
  { label: 'Read a real agent', command: 'cat examples/agents/code-reviewer.md' },
  { label: 'Rank hooks by Bash usage', command: 'grep -rc "Bash(" examples/hooks/ | sort -t: -k2 -rn | head -5' },
  { label: 'Total markdown volume', command: "wc -l $(find . -name '*.md') | tail -1" },
]

/**
 * threat-db.json is a single JSON file (converted from the guide repo's
 * threat-db.yaml at build time), so jq is the star here rather than
 * grep/find, running a real live query against the CVE/campaign/technique
 * database instead of a static HTML table.
 */
export const SECURITY_SUGGESTIONS: Suggestion[] = [
  { label: 'Critical CVEs only', command: "jq '.cve_database[] | select(.severity==\"critical\")' threat-db.json" },
  { label: 'Count tracked CVEs', command: "jq '.cve_database | length' threat-db.json" },
  { label: 'List campaign names', command: "jq -r '.campaigns[].name' threat-db.json" },
  { label: 'Attack technique by ID', command: "jq '.attack_techniques[] | select(.id==\"T001\")' threat-db.json" },
  { label: 'Minimum safe version lookup', command: "jq '.minimum_safe_versions[\"claude-code\"]' threat-db.json" },
  { label: 'Every mitigation mentioning MCP', command: 'grep -c "mitigation" threat-db.json' },
]

/**
 * The reference corpus splits cheatsheet.md, settings-reference.md,
 * hooks-events-reference.md and tools-reference.md by H2 heading, so a
 * cross-doc grep can answer "where is X documented" across ~1600+ lines
 * of reference material a visitor would otherwise have to search by hand.
 */
export const REFERENCE_SUGGESTIONS: Suggestion[] = [
  { label: 'Find every mention of sandbox', command: 'grep -rl "sandbox" .' },
  { label: 'List all hook event sections', command: 'ls hooks-events-reference/' },
  { label: 'Read the CLI flags cheatsheet', command: 'cat cheatsheet/cli-flags-quick-reference.md' },
  { label: 'Count reference sections', command: 'find . -name "*.md" | wc -l' },
  { label: 'Search settings for "permission"', command: 'grep -rl "permission" settings-reference/' },
]
