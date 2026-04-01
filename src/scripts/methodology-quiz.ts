/**
 * Methodology Quiz — Client-side logic
 * Scoring, screen transitions, scroll to stacks, event listeners
 */

import { MQ_QUESTIONS, STACK_EXPLANATIONS, computeStackMaxPossible } from '../data/methodology-quiz'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MQResult {
  stackId: string
  title: string
  icon: string
  methodologies: string[]
  rawScore: number
  maxPossible: number
  percentage: number
  matchLevel: 'strong' | 'good' | 'moderate'
  description: string
  quickStart: string
  guideLink: string
}

// ─── Scoring engine ───────────────────────────────────────────────────────────

export function calculateResults(answers: number[]): MQResult[] {
  const rawScores: Record<string, number> = {}
  const maxPossible = computeStackMaxPossible()

  for (let qi = 0; qi < MQ_QUESTIONS.length; qi++) {
    const question = MQ_QUESTIONS[qi]
    const selectedIdx = answers[qi]
    if (selectedIdx === -1) continue

    const option = question.options[selectedIdx]
    for (const [stackId, pts] of Object.entries(option.scores)) {
      if (pts === undefined) continue
      rawScores[stackId] = (rawScores[stackId] ?? 0) + pts
    }
  }

  const results: MQResult[] = []

  for (const stack of STACK_EXPLANATIONS) {
    const raw = rawScores[stack.stackId] ?? 0
    const max = maxPossible[stack.stackId] ?? 1
    const pct = Math.round((raw / max) * 100)

    results.push({
      stackId: stack.stackId,
      title: stack.title,
      icon: stack.icon,
      methodologies: stack.methodologies,
      rawScore: raw,
      maxPossible: max,
      percentage: pct,
      matchLevel: getMatchLevel(pct),
      description: stack.description,
      quickStart: stack.quickStart,
      guideLink: stack.guideLink,
    })
  }

  return results.sort((a, b) => b.percentage - a.percentage)
}

export function getMatchLevel(pct: number): 'strong' | 'good' | 'moderate' {
  if (pct >= 75) return 'strong'
  if (pct >= 50) return 'good'
  return 'moderate'
}

export function detectFlatProfile(results: MQResult[]): boolean {
  if (results.length < 3) return false
  const top3 = results.slice(0, 3).map((r) => r.percentage)
  return Math.max(...top3) - Math.min(...top3) <= 15
}

// ─── DOM helpers ──────────────────────────────────────────────────────────────

function $(id: string): HTMLElement | null {
  return document.getElementById(id)
}

function showScreen(name: 'intro' | 'question' | 'results') {
  const screens = ['mq-intro', 'mq-question', 'mq-results']
  for (const id of screens) {
    const el = $(id)
    if (el) el.classList.toggle('mq-active', id === `mq-${name}`)
  }
}

// ─── Quiz state ───────────────────────────────────────────────────────────────

let currentQuestion = 0
let answers: number[] = new Array(MQ_QUESTIONS.length).fill(-1)

// ─── Render functions ─────────────────────────────────────────────────────────

function renderQuestion() {
  const q = MQ_QUESTIONS[currentQuestion]
  const total = MQ_QUESTIONS.length

  const progressEl = $('mq-progress-fill')
  const numEl = $('mq-question-num')
  const dimEl = $('mq-dimension')
  const textEl = $('mq-question-text')
  const optionsEl = $('mq-options')
  const backBtn = $('mq-back') as HTMLButtonElement | null
  const nextBtn = $('mq-next') as HTMLButtonElement | null

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
      btn.className = 'mq-option'
      if (answers[currentQuestion] === idx) btn.classList.add('mq-option--selected')
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

  const optionsEl = $('mq-options')
  if (!optionsEl) return

  optionsEl.querySelectorAll('.mq-option').forEach((btn, i) => {
    btn.classList.toggle('mq-option--selected', i === idx)
    btn.setAttribute('aria-pressed', String(i === idx))
  })

  const nextBtn = $('mq-next') as HTMLButtonElement | null
  if (nextBtn) nextBtn.disabled = false
}

function goNext() {
  if (answers[currentQuestion] === -1) return

  const isLast = currentQuestion === MQ_QUESTIONS.length - 1
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

function renderResults(top3: MQResult[], isFlat: boolean) {
  const primaryEl = $('mq-primary')
  const secondaryEl = $('mq-secondary')
  const flatEl = $('mq-flat-notice')

  // Primary match
  if (primaryEl && top3[0]) {
    const r = top3[0]
    const pillsHtml = r.methodologies
      .map((m) => `<span class="mq-pill">${m}</span>`)
      .join('')

    primaryEl.innerHTML = `
      <div class="mq-result-header">
        <span class="mq-result-icon">${r.icon}</span>
        <span class="mq-match-badge mq-match-badge--${r.matchLevel}">${r.matchLevel} match</span>
      </div>
      <h3 class="mq-result-title">${r.title}</h3>
      <div class="mq-methodology-pills">${pillsHtml}</div>
      <div class="mq-bar-wrap">
        <div class="mq-bar" style="--pct: ${r.percentage}%">
          <span class="mq-bar-label">${r.percentage}%</span>
        </div>
      </div>
      <p class="mq-result-description">${r.description}</p>
      <div class="mq-quickstart">
        <p class="mq-quickstart-label">Quick start</p>
        <p class="mq-quickstart-text">${r.quickStart}</p>
      </div>
      <a href="${r.guideLink}" class="mq-result-link">Read the guide section →</a>
    `
  }

  // Secondary matches
  if (secondaryEl && top3.length > 1) {
    secondaryEl.innerHTML = ''
    for (const r of top3.slice(1)) {
      const pillsHtml = r.methodologies
        .map((m) => `<span class="mq-pill mq-pill--sm">${m}</span>`)
        .join('')

      const card = document.createElement('div')
      card.className = 'mq-secondary-card'
      card.innerHTML = `
        <div class="mq-secondary-header">
          <span class="mq-secondary-icon">${r.icon}</span>
          <span class="mq-secondary-title">${r.title}</span>
          <span class="mq-secondary-pct">${r.percentage}%</span>
        </div>
        <div class="mq-bar-wrap">
          <div class="mq-bar mq-bar--secondary" style="--pct: ${r.percentage}%"></div>
        </div>
        <div class="mq-methodology-pills mq-methodology-pills--sm">${pillsHtml}</div>
        <a href="${r.guideLink}" class="mq-result-link mq-result-link--sm">View methodology →</a>
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
  answers = new Array(MQ_QUESTIONS.length).fill(-1)
  showScreen('intro')
}

function scrollToMethodologies() {
  const section = document.getElementById('methodology-stacks')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  $('mq-start')?.addEventListener('click', () => {
    currentQuestion = 0
    answers = new Array(MQ_QUESTIONS.length).fill(-1)
    showScreen('question')
    renderQuestion()
  })

  $('mq-back')?.addEventListener('click', goBack)
  $('mq-next')?.addEventListener('click', goNext)
  $('mq-retake')?.addEventListener('click', resetQuiz)
  $('mq-explore')?.addEventListener('click', scrollToMethodologies)
}

document.addEventListener('DOMContentLoaded', init)
