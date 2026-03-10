/**
 * Role Quiz — Client-side logic
 * Scoring, screen transitions, scroll to role cards, event listeners
 */

import { ROLE_QUIZ_QUESTIONS, ROLE_EXPLANATIONS, computeMaxPossible } from '../data/role-quiz'
import { ROLES } from '../data/ai-roles'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoleQuizResult {
  roleId: string
  title: string
  rawScore: number
  maxPossible: number
  percentage: number
  matchLevel: 'strong' | 'good' | 'moderate'
  explanation: string
}

// ─── Scoring engine ───────────────────────────────────────────────────────────

export function calculateResults(answers: number[]): RoleQuizResult[] {
  const rawScores: Record<string, number> = {}
  const maxPossible = computeMaxPossible()

  for (let qi = 0; qi < ROLE_QUIZ_QUESTIONS.length; qi++) {
    const question = ROLE_QUIZ_QUESTIONS[qi]
    const selectedIdx = answers[qi]
    if (selectedIdx === -1) continue

    const option = question.options[selectedIdx]
    for (const [roleId, pts] of Object.entries(option.scores)) {
      rawScores[roleId] = (rawScores[roleId] ?? 0) + pts
    }
  }

  const results: RoleQuizResult[] = []

  for (const role of ROLES) {
    const raw = rawScores[role.id] ?? 0
    const max = maxPossible[role.id] ?? 1
    const pct = Math.round((raw / max) * 100)
    const explanation =
      ROLE_EXPLANATIONS.find((e) => e.roleId === role.id)?.explanation ?? ''

    results.push({
      roleId: role.id,
      title: role.title,
      rawScore: raw,
      maxPossible: max,
      percentage: pct,
      matchLevel: getMatchLevel(pct),
      explanation,
    })
  }

  return results.sort((a, b) => b.percentage - a.percentage)
}

export function getMatchLevel(pct: number): 'strong' | 'good' | 'moderate' {
  if (pct >= 75) return 'strong'
  if (pct >= 50) return 'good'
  return 'moderate'
}

export function detectFlatProfile(results: RoleQuizResult[]): boolean {
  if (results.length < 3) return false
  const top3 = results.slice(0, 3).map((r) => r.percentage)
  return Math.max(...top3) - Math.min(...top3) <= 15
}

// ─── DOM helpers ──────────────────────────────────────────────────────────────

function $(id: string): HTMLElement | null {
  return document.getElementById(id)
}

function showScreen(name: 'intro' | 'question' | 'results') {
  const screens = ['rq-intro', 'rq-question', 'rq-results']
  for (const id of screens) {
    const el = $(id)
    if (el) el.classList.toggle('rq-active', id === `rq-${name}`)
  }
}

// ─── Quiz state ───────────────────────────────────────────────────────────────

let currentQuestion = 0
let answers: number[] = new Array(ROLE_QUIZ_QUESTIONS.length).fill(-1)

// ─── Render functions ─────────────────────────────────────────────────────────

function renderQuestion() {
  const q = ROLE_QUIZ_QUESTIONS[currentQuestion]
  const total = ROLE_QUIZ_QUESTIONS.length

  const progressEl = $('rq-progress-fill')
  const numEl = $('rq-question-num')
  const dimEl = $('rq-dimension')
  const textEl = $('rq-question-text')
  const optionsEl = $('rq-options')
  const backBtn = $('rq-back') as HTMLButtonElement | null
  const nextBtn = $('rq-next') as HTMLButtonElement | null

  if (progressEl) {
    progressEl.style.width = `${((currentQuestion + 1) / total) * 100}%`
  }
  if (numEl) numEl.textContent = `${currentQuestion + 1} / ${total}`
  if (dimEl) dimEl.textContent = q.dimension.replace(/-/g, ' ')
  if (textEl) textEl.textContent = q.question

  if (optionsEl) {
    optionsEl.innerHTML = ''
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button')
      btn.className = 'rq-option'
      if (answers[currentQuestion] === idx) btn.classList.add('rq-option--selected')
      btn.textContent = opt.text
      btn.setAttribute('aria-pressed', String(answers[currentQuestion] === idx))
      btn.addEventListener('click', () => selectOption(idx))
      optionsEl.appendChild(btn)
    })
  }

  if (backBtn) backBtn.disabled = currentQuestion === 0
  if (nextBtn) {
    const isLast = currentQuestion === total - 1
    nextBtn.textContent = isLast ? 'See Results' : 'Next'
    nextBtn.disabled = answers[currentQuestion] === -1
  }
}

function selectOption(idx: number) {
  answers[currentQuestion] = idx

  const optionsEl = $('rq-options')
  if (!optionsEl) return

  optionsEl.querySelectorAll('.rq-option').forEach((btn, i) => {
    btn.classList.toggle('rq-option--selected', i === idx)
    btn.setAttribute('aria-pressed', String(i === idx))
  })

  const nextBtn = $('rq-next') as HTMLButtonElement | null
  if (nextBtn) nextBtn.disabled = false
}

function goNext() {
  if (answers[currentQuestion] === -1) return

  const isLast = currentQuestion === ROLE_QUIZ_QUESTIONS.length - 1
  if (isLast) {
    showResults()
  } else {
    currentQuestion++
    renderQuestion()
  }
}

function goBack() {
  if (currentQuestion === 0) return
  currentQuestion--
  renderQuestion()
}

function showResults() {
  const results = calculateResults(answers)
  const top3 = results.slice(0, 3)
  const isFlat = detectFlatProfile(results)

  showScreen('results')
  renderResults(top3, isFlat)
}

function renderResults(top3: RoleQuizResult[], isFlat: boolean) {
  const primaryEl = $('rq-primary')
  const secondaryEl = $('rq-secondary')
  const flatEl = $('rq-flat-notice')

  // Primary match
  if (primaryEl && top3[0]) {
    const r = top3[0]
    primaryEl.innerHTML = `
      <div class="rq-result-header">
        <span class="rq-match-badge rq-match-badge--${r.matchLevel}">${r.matchLevel} match</span>
      </div>
      <h3 class="rq-result-title">${r.title}</h3>
      <div class="rq-bar-wrap">
        <div class="rq-bar" style="--pct: ${r.percentage}%">
          <span class="rq-bar-label">${r.percentage}%</span>
        </div>
      </div>
      <p class="rq-result-explanation">${r.explanation}</p>
      <a href="#${r.roleId}" class="rq-result-link">See full profile below →</a>
    `
  }

  // Secondary matches
  if (secondaryEl && top3.length > 1) {
    secondaryEl.innerHTML = ''
    for (const r of top3.slice(1)) {
      const card = document.createElement('div')
      card.className = 'rq-secondary-card'
      card.innerHTML = `
        <div class="rq-secondary-header">
          <span class="rq-secondary-title">${r.title}</span>
          <span class="rq-secondary-pct">${r.percentage}%</span>
        </div>
        <div class="rq-bar-wrap">
          <div class="rq-bar rq-bar--secondary" style="--pct: ${r.percentage}%"></div>
        </div>
        <a href="#${r.roleId}" class="rq-result-link rq-result-link--sm">View profile →</a>
      `
      secondaryEl.appendChild(card)
    }
  }

  // Flat profile notice
  if (flatEl) {
    flatEl.style.display = isFlat ? 'block' : 'none'
  }
}

function resetQuiz() {
  currentQuestion = 0
  answers = new Array(ROLE_QUIZ_QUESTIONS.length).fill(-1)
  showScreen('intro')
}

function scrollToRoles() {
  const rolesSection = document.getElementById('roles')
  if (rolesSection) {
    rolesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  // Start quiz
  $('rq-start')?.addEventListener('click', () => {
    currentQuestion = 0
    answers = new Array(ROLE_QUIZ_QUESTIONS.length).fill(-1)
    showScreen('question')
    renderQuestion()
  })

  // Navigation
  $('rq-back')?.addEventListener('click', goBack)
  $('rq-next')?.addEventListener('click', goNext)

  // Retake
  $('rq-retake')?.addEventListener('click', resetQuiz)

  // Scroll to role cards
  $('rq-see-roles')?.addEventListener('click', scrollToRoles)
}

document.addEventListener('DOMContentLoaded', init)
