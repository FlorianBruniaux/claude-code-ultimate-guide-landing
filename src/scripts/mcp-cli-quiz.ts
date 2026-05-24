import { MCQ_QUESTIONS, MCQ_RESULTS, computeMCQMaxPossible } from '../data/mcp-cli-quiz'

export interface MCQResult {
  resultId: string
  title: string
  icon: string
  rawScore: number
  maxPossible: number
  percentage: number
  matchLevel: 'strong' | 'good' | 'moderate'
  description: string
  tips: string[]
  guideLink: string
}

export function calculateResults(answers: number[]): MCQResult[] {
  const rawScores: Record<string, number> = {}
  const maxPossible = computeMCQMaxPossible()

  for (let qi = 0; qi < MCQ_QUESTIONS.length; qi++) {
    const question = MCQ_QUESTIONS[qi]
    const selectedIdx = answers[qi]
    if (selectedIdx === -1) continue
    const option = question.options[selectedIdx]
    for (const [resultId, pts] of Object.entries(option.scores)) {
      if (pts === undefined) continue
      rawScores[resultId] = (rawScores[resultId] ?? 0) + pts
    }
  }

  const results: MCQResult[] = []

  for (const result of MCQ_RESULTS) {
    const raw = rawScores[result.resultId] ?? 0
    const max = maxPossible[result.resultId] ?? 1
    const pct = Math.round((raw / max) * 100)
    results.push({
      resultId: result.resultId,
      title: result.title,
      icon: result.icon,
      rawScore: raw,
      maxPossible: max,
      percentage: pct,
      matchLevel: getMatchLevel(pct),
      description: result.description,
      tips: result.tips,
      guideLink: result.guideLink,
    })
  }

  return results.sort((a, b) => b.percentage - a.percentage)
}

export function getMatchLevel(pct: number): 'strong' | 'good' | 'moderate' {
  if (pct >= 70) return 'strong'
  if (pct >= 45) return 'good'
  return 'moderate'
}

function $(id: string): HTMLElement | null {
  return document.getElementById(id)
}

function showScreen(name: 'intro' | 'question' | 'results') {
  const screens = ['mcq-intro', 'mcq-question', 'mcq-results']
  for (const id of screens) {
    const el = $(id)
    if (el) el.classList.toggle('mcq-active', id === `mcq-${name}`)
  }
}

let currentQuestion = 0
let answers: number[] = new Array(MCQ_QUESTIONS.length).fill(-1)

function renderQuestion() {
  const q = MCQ_QUESTIONS[currentQuestion]
  const total = MCQ_QUESTIONS.length
  const progressEl = $('mcq-progress-fill')
  const numEl = $('mcq-question-num')
  const dimEl = $('mcq-dimension')
  const textEl = $('mcq-question-text')
  const optionsEl = $('mcq-options')
  const backBtn = $('mcq-back') as HTMLButtonElement | null
  const nextBtn = $('mcq-next') as HTMLButtonElement | null
  if (progressEl) progressEl.style.width = `${((currentQuestion + 1) / total) * 100}%`
  if (numEl) numEl.textContent = `${currentQuestion + 1} / ${total}`
  if (dimEl) dimEl.textContent = q.dimension.replace(/-/g, ' ')
  if (textEl) textEl.textContent = q.question
  if (optionsEl) {
    optionsEl.innerHTML = ''
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button')
      btn.className = 'mcq-option'
      if (answers[currentQuestion] === idx) btn.classList.add('mcq-option--selected')
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
  const optionsEl = $('mcq-options')
  if (!optionsEl) return
  optionsEl.querySelectorAll('.mcq-option').forEach((btn, i) => {
    btn.classList.toggle('mcq-option--selected', i === idx)
    btn.setAttribute('aria-pressed', String(i === idx))
  })
  const nextBtn = $('mcq-next') as HTMLButtonElement | null
  if (nextBtn) nextBtn.disabled = false
}

function goNext() {
  if (answers[currentQuestion] === -1) return
  if (currentQuestion === MCQ_QUESTIONS.length - 1) {
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
  showScreen('results')
  renderResults(results)
}

function renderResults(results: MCQResult[]) {
  const primaryEl = $('mcq-primary')
  const barsEl = $('mcq-all-bars')
  const winner = results[0]
  if (primaryEl && winner) {
    const tipsHtml = winner.tips.map((tip) => `<li class="mcq-tip-item">${tip}</li>`).join('')
    primaryEl.innerHTML = `
      <div class="mcq-result-header">
        <span class="mcq-result-icon">${winner.icon}</span>
        <span class="mcq-match-badge mcq-match-badge--${winner.matchLevel}">${winner.matchLevel} match</span>
      </div>
      <h3 class="mcq-result-title">${winner.title}</h3>
      <div class="mcq-bar-wrap">
        <div class="mcq-bar" style="--pct: ${winner.percentage}%">
          <span class="mcq-bar-label">${winner.percentage}%</span>
        </div>
      </div>
      <p class="mcq-result-description">${winner.description}</p>
      <div class="mcq-tips">
        <p class="mcq-tips-label">What to do next</p>
        <ul class="mcq-tips-list">${tipsHtml}</ul>
      </div>
      <a href="${winner.guideLink}" class="mcq-result-link">Read the guide section &rarr;</a>
    `
  }
  if (barsEl) {
    barsEl.innerHTML = ''
    for (const r of results) {
      const row = document.createElement('div')
      row.className = 'mcq-bar-row'
      row.innerHTML = `
        <div class="mcq-bar-row-meta">
          <span class="mcq-bar-row-icon">${r.icon}</span>
          <span class="mcq-bar-row-title">${r.title}</span>
          <span class="mcq-bar-row-pct">${r.percentage}%</span>
        </div>
        <div class="mcq-bar-wrap">
          <div class="mcq-bar ${r.resultId === winner.resultId ? '' : 'mcq-bar--secondary'}" style="--pct: ${r.percentage}%"></div>
        </div>
      `
      barsEl.appendChild(row)
    }
  }
}

function resetQuiz() {
  currentQuestion = 0
  answers = new Array(MCQ_QUESTIONS.length).fill(-1)
  showScreen('intro')
}

function init() {
  $('mcq-start')?.addEventListener('click', () => {
    currentQuestion = 0
    answers = new Array(MCQ_QUESTIONS.length).fill(-1)
    showScreen('question')
    renderQuestion()
  })
  $('mcq-back')?.addEventListener('click', goBack)
  $('mcq-next')?.addEventListener('click', goNext)
  $('mcq-retake')?.addEventListener('click', resetQuiz)
  $('mcq-explore')?.addEventListener('click', () => {
    window.location.href = '/guide/mcp-vs-cli/'
  })
}

document.addEventListener('DOMContentLoaded', init)
