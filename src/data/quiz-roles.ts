/**
 * Quiz role personas.
 *
 * A second, orthogonal filter axis for the knowledge quiz, sitting next to the
 * difficulty filter. It groups the 15 fine-grained AI roles from role-quiz.ts
 * into 5 usage personas, then maps each of the 16+1 quiz categories to the
 * personas it is relevant to.
 *
 * The `roles` field on a question is DERIVED, not hand-stored in 400 Markdown
 * files: a question inherits every persona whose category set includes its
 * category_id, unless ROLE_OVERRIDES names it explicitly. Editing one category
 * mapping re-tags every question in that category at build time.
 *
 * profiles (junior/senior/power/pm) stays the seniority axis and drives the
 * difficulty filter. roles is a separate axis so the two AND together cleanly.
 */

export interface QuizRole {
  /** stable id, used as the served `roles[]` value and the filter key */
  id: string
  /** short label shown on the filter button */
  label: string
  /** one sentence on who this persona is */
  description: string
  /** the 15 role-quiz.ts roles this persona absorbs (documentation, not runtime) */
  absorbs: string[]
  /** quiz category ids (see src/utils/categories.ts) in scope for this persona */
  categoryIds: number[]
}

export const QUIZ_ROLES: QuizRole[] = [
  {
    id: 'developer',
    label: 'Developer',
    description: 'Ships with Claude Code day to day, from install to agents and MCP.',
    absorbs: ['ai-engineer', 'ai-agent-engineer', 'founding-ai-engineer', 'ai-orchestration-engineer'],
    categoryIds: [1, 2, 3, 4, 5, 6, 8, 9, 10],
  },
  {
    id: 'power-user',
    label: 'Power User',
    description: 'Automates Claude Code with hooks, custom commands, and harness tuning.',
    absorbs: ['harness-engineer', 'context-engineer', 'prompt-engineer'],
    categoryIds: [4, 5, 6, 7, 8, 9, 16],
  },
  {
    id: 'platform-architect',
    label: 'Platform / Architect',
    description: 'Sets Claude Code up for a team: governance, internals, metrics.',
    absorbs: ['ai-architect', 'platform-engineer', 'mlops-engineer'],
    categoryIds: [3, 12, 13, 14, 16, 17],
  },
  {
    id: 'security-safety',
    label: 'Security / Safety',
    description: 'Hardens Claude Code: threat models, permissions, observability.',
    absorbs: ['ai-safety-eval-engineer'],
    categoryIds: [8, 13, 14, 16],
  },
  {
    id: 'pm',
    label: 'Non-technical / PM',
    description: 'Evaluates and adopts Claude Code without writing the code.',
    absorbs: ['ai-product-manager', 'ai-developer-advocate'],
    categoryIds: [1, 2, 11, 14, 15, 17],
  },
]

/**
 * Per-question overrides, for the cases where the category default is wrong.
 * Key is the question id (e.g. "13-004"), value is the exact roles it should
 * carry. Keep this small: only add an entry when the category mapping mis-tags
 * a specific question. An empty array hides a question from every role filter.
 */
export const ROLE_OVERRIDES: Record<string, string[]> = {}

/** category_id -> role ids, computed once from QUIZ_ROLES. */
const CATEGORY_TO_ROLES: Map<number, string[]> = (() => {
  const map = new Map<number, string[]>()
  for (const role of QUIZ_ROLES) {
    for (const cid of role.categoryIds) {
      const list = map.get(cid) ?? []
      list.push(role.id)
      map.set(cid, list)
    }
  }
  return map
})()

/**
 * Resolve the roles for one question. Overrides win; otherwise every persona
 * whose category set includes this category_id.
 */
export function getRolesForQuestion(categoryId: number, questionId: string): string[] {
  if (Object.prototype.hasOwnProperty.call(ROLE_OVERRIDES, questionId)) {
    return ROLE_OVERRIDES[questionId]
  }
  return CATEGORY_TO_ROLES.get(categoryId) ?? []
}
