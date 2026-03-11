// Context Engineering Configurator Data
// Multi-step form → generates personalized CLAUDE.md starter kit

export interface Step {
  id: string
  title: string
  subtitle: string
}

export interface Option {
  value: string
  label: string
  description?: string
}

export interface MaturityLevel {
  level: number
  name: string
  criteria: string[]
  nextSteps: string[]
}

export const STEPS: Step[] = [
  { id: 'profile', title: 'Your Profile', subtitle: 'Team size and AI tools you use' },
  { id: 'current', title: 'Current Setup', subtitle: 'Your existing context configuration' },
  { id: 'stack', title: 'Tech Stack', subtitle: 'Primary languages and frameworks' },
  { id: 'results', title: 'Your Starter Kit', subtitle: 'Generated files and maturity assessment' },
]

export const TEAM_SIZE_OPTIONS: Option[] = [
  { value: 'solo', label: 'Solo', description: 'Just me' },
  { value: 'small', label: '2-5 people', description: 'Small team' },
  { value: 'medium', label: '6-20 people', description: 'Medium team' },
  { value: 'large', label: '20+', description: 'Large team' },
]

export const AI_TOOLS_OPTIONS: Option[] = [
  { value: 'claude-code', label: 'Claude Code', description: 'CLI tool (CLAUDE.md)' },
  { value: 'cursor', label: 'Cursor', description: '.cursorrules' },
  { value: 'copilot', label: 'GitHub Copilot', description: '.github/copilot-instructions.md' },
  { value: 'windsurf', label: 'Windsurf', description: '.windsurfrules' },
  { value: 'codex', label: 'OpenAI Codex', description: 'AGENTS.md' },
]

export const CLAUDE_MD_STATUS_OPTIONS: Option[] = [
  { value: 'none', label: 'No CLAUDE.md yet', description: 'Starting from scratch' },
  { value: 'small', label: 'Under 100 lines', description: 'Basic setup' },
  { value: 'medium', label: '100-500 lines', description: 'Established setup' },
  { value: 'large', label: '500+ lines', description: 'Comprehensive setup' },
]

export const RULES_FILES_OPTIONS: Option[] = [
  { value: '0', label: 'None', description: 'No separate rules files' },
  { value: '1-5', label: '1-5 files', description: 'Some modularization' },
  { value: '6-15', label: '6-15 files', description: 'Well-modularized' },
  { value: '15+', label: '15+ files', description: 'Fully modular' },
]

export const STACK_OPTIONS: Option[] = [
  { value: 'typescript', label: 'TypeScript / Node', description: 'TS, Node, npm/pnpm' },
  { value: 'python', label: 'Python', description: 'FastAPI, Django, Flask' },
  { value: 'rust', label: 'Rust', description: 'Cargo, async/tokio' },
  { value: 'go', label: 'Go', description: 'Standard library, gin, echo' },
  { value: 'java', label: 'Java / Kotlin', description: 'Spring, JVM' },
  { value: 'other', label: 'Other', description: 'PHP, Ruby, C++, etc.' },
]

export const FRONTEND_OPTIONS: Option[] = [
  { value: 'react', label: 'React', description: 'React / Next.js / Vite' },
  { value: 'vue', label: 'Vue', description: 'Vue / Nuxt' },
  { value: 'angular', label: 'Angular', description: 'Angular / NgRx' },
  { value: 'none', label: 'No frontend', description: 'Backend only, CLI, API' },
  { value: 'other', label: 'Other', description: 'Svelte, Astro, etc.' },
]

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: 1,
    name: 'Starter',
    criteria: ['Single CLAUDE.md', 'No rules files or @imports', 'Basic or no structure'],
    nextSteps: ['Add project overview section', 'Add anti-patterns section', 'Add git conventions'],
  },
  {
    level: 2,
    name: 'Modular',
    criteria: ['Rules extracted to separate files', 'Path-scoping with @imports', 'Organized sections'],
    nextSteps: ['Set up path-scoped rules', 'Add CI drift detection', 'Create rules/ directory'],
  },
  {
    level: 3,
    name: 'Team-Ready',
    criteria: ['Profile-based assembly for team members', 'CI drift detection running', 'Shared module library'],
    nextSteps: ['Add self-evaluation questions', 'Set up canary checks', 'Track adherence metrics'],
  },
  {
    level: 4,
    name: 'Measured',
    criteria: ['Self-evaluation runs quarterly', 'Canary checks in CI', 'Adherence tracked per rule'],
    nextSteps: ['Implement knowledge feeding loop', 'Add session retrospectives', 'Build ACE pipeline'],
  },
  {
    level: 5,
    name: 'Adaptive',
    criteria: ['Knowledge feeding loop active', 'ACE pipeline (Assemble, Check, Execute)', 'Automated context feedback'],
    nextSteps: ['Maintain and evolve', 'Share patterns with team', 'Open-source your context system'],
  },
]

// Template generators — generate CLAUDE.md content from user answers
export function generateClaudeMd(answers: {
  teamSize: string
  stack: string
  frontend: string
  claudeMdStatus: string
}): string {
  const isTeam = answers.teamSize !== 'solo'
  const hasFrontend = answers.frontend !== 'none'

  const stackSections: Record<string, string> = {
    typescript: `## TypeScript Standards
- Strict mode enabled (\`strict: true\` in tsconfig.json)
- Explicit return types on all exported functions
- No \`any\` types except in migration code (must be commented)
- Prefer \`interface\` over \`type\` for object shapes
- Imports: absolute paths only (no \`../../\` chains)`,
    python: `## Python Standards
- Type hints required on all function signatures
- Docstrings for public functions (Google style)
- Use \`ruff\` for linting, \`black\` for formatting
- Prefer \`pathlib\` over \`os.path\`
- f-strings only (no \`%\` or \`.format()\`)`,
    rust: `## Rust Standards
- \`clippy\` must pass with no warnings
- \`unwrap()\` only in tests — use \`?/anyhow\` in production
- Prefer \`thiserror\` for library errors, \`anyhow\` for apps
- All public items must have doc comments
- \`async\`: use \`tokio\` as the async runtime`,
    go: `## Go Standards
- Standard library preferred over third-party when feasible
- Error wrapping: \`fmt.Errorf("context: %w", err)\`
- All exported symbols must have doc comments
- Prefer \`context.Context\` as first parameter
- No global mutable state`,
    java: `## Java/Kotlin Standards
- Prefer Kotlin over Java for new code
- Use constructor injection (not field injection)
- All public APIs must be nullable-annotated
- Sealed classes for result types
- Tests: JUnit 5, Mockito`,
    other: `## Code Standards
- Consistent naming conventions (document your conventions here)
- Error handling: explicit, never swallow exceptions silently
- Comments: explain why, not what`,
  }

  const frontendSection: Record<string, string> = {
    react: `\n## React / Frontend
- Functional components only (no class components)
- Custom hooks for shared stateful logic
- Props: TypeScript interfaces, required unless explicitly optional
- State management: prefer local state, context for shared, zustand/jotai for global
- CSS: [your preferred approach — e.g., Tailwind, CSS Modules]`,
    vue: `\n## Vue / Frontend
- Composition API only (no Options API for new code)
- TypeScript: \`defineProps\` and \`defineEmits\` with explicit types
- Composables for shared logic
- Prefer \`<script setup>\` syntax`,
    angular: `\n## Angular / Frontend
- Standalone components (no NgModule for new code)
- Signals for reactive state
- OnPush change detection for performance-sensitive components
- Inject function over constructor injection`,
    other: `\n## Frontend Standards
- [Document your frontend framework conventions here]`,
  }

  const teamSection = isTeam
    ? `
## Team Conventions
- Branch naming: \`feat/description\`, \`fix/description\`, \`chore/description\`
- PR requirements: description of changes + test coverage
- Code review: at least 1 approval before merge
- Commit style: conventional commits (\`feat:\`, \`fix:\`, \`chore:\`)
`
    : `
## Workflow
- Commit style: conventional commits (\`feat:\`, \`fix:\`, \`chore:\`)
- Branch naming: \`feat/description\`, \`fix/description\`
`

  return `# CLAUDE.md — [Project Name]
<!-- Generated by cc.bruniaux.com/context/ — customize for your project -->

## Project Overview
<!-- Required: 2-3 sentences describing what this project does and who uses it -->
[Describe your project here]

## Architecture
<!-- Document key architectural decisions -->
- Stack: ${answers.stack}${hasFrontend ? ` + ${answers.frontend}` : ''}
- [Add your key architecture decisions here]
- [Database, state management, deployment target]

${stackSections[answers.stack] || stackSections.other}
${hasFrontend && frontendSection[answers.frontend] ? frontendSection[answers.frontend] : ''}
## Testing
- Tests required for: all new features, bug fixes, critical paths
- Test files co-located with source: \`component.test.ts\` next to \`component.ts\`
- Mock strategy: mock at the boundary (external APIs, databases)
${teamSection}
## What NOT to Do
<!-- Anti-patterns specific to your project — add your own -->
- Do not add dependencies without discussing trade-offs first
- Do not use \`console.log\` in production code (use structured logging)
- Do not commit secrets or API keys (use environment variables)
- Do not skip tests for "simple" changes

## Deployment
<!-- Document your deployment process -->
- Environments: [staging → production]
- Deploy command: \`[your deploy command]\`
- Post-deploy: [what to verify after deployment]
`
}

export function generateProfileYaml(answers: {
  teamSize: string
  stack: string
  frontend: string
}): string | null {
  if (answers.teamSize === 'solo') return null

  return `# Team Profile Template
# Save as: .claude/profiles/<team-member-name>.yaml
# Run: ts-node examples/context-engineering/assembler.ts --profile .claude/profiles/<name>.yaml

profile:
  name: "developer-name"
  role: "${answers.stack === 'typescript' && answers.frontend !== 'none' ? 'frontend' : answers.frontend === 'none' ? 'backend' : 'fullstack'}"
  seniority: "mid"  # junior | mid | senior | staff

tools:
  primary_lang: "${answers.stack}"
  frontend: "${answers.frontend}"

modules:
  include:
    - shared/core-rules.md
    - shared/git-conventions.md
    - shared/security-rules.md
    # Add role-specific modules as you create them

overrides:
  custom_rules: []
  # Add personal preferences here
`
}

export function calculateMaturityLevel(answers: {
  claudeMdStatus: string
  rulesFiles: string
  teamSize: string
}): number {
  if (answers.claudeMdStatus === 'none') return 1
  if (answers.claudeMdStatus === 'small' && answers.rulesFiles === '0') return 1
  if (answers.rulesFiles === '0') return answers.claudeMdStatus === 'medium' ? 2 : 1
  if (answers.rulesFiles === '1-5') return 2
  if (answers.rulesFiles === '6-15') return answers.teamSize !== 'solo' ? 3 : 2
  if (answers.rulesFiles === '15+') return answers.teamSize !== 'solo' ? 3 : 2
  return 1
}
