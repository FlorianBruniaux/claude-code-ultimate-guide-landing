import {
  MATURITY_LEVELS,
  calculateMaturityLevel,
  generateClaudeMd,
  generateProfileYaml,
  type ContextAnswers,
  type PartialContextAnswers,
} from '../data/context-data.ts'

const STEP_IDS = ['profile', 'current', 'stack'] as const
type StepId = (typeof STEP_IDS)[number]

interface ConfiguratorState {
  stepIndex: number
  answers: PartialContextAnswers
}

function getDocument(root: ParentNode): Document | null {
  if ('defaultView' in root) return root as Document
  return (root as Node).ownerDocument
}

function selectedValue(form: HTMLElement, name: string): string {
  return form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? ''
}

function selectedValues(form: HTMLElement, name: string): string[] {
  return [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)]
    .map((input) => input.value)
}

function collectAnswers(form: HTMLElement): PartialContextAnswers {
  return {
    teamSize: selectedValue(form, 'teamSize'),
    aiTools: selectedValues(form, 'aiTools'),
    claudeMdStatus: selectedValue(form, 'claudeMdStatus'),
    rulesFiles: selectedValue(form, 'rulesFiles'),
    stack: selectedValue(form, 'stack'),
    frontend: selectedValue(form, 'frontend'),
  }
}

function validationMessage(step: StepId, answers: PartialContextAnswers): string {
  if (step === 'profile' && !answers.teamSize) return 'Choose a team size to continue.'
  if (step === 'current' && !answers.claudeMdStatus) return 'Choose your CLAUDE.md status to continue.'
  if (step === 'current' && !answers.rulesFiles) return 'Choose how many rules files you use.'
  if (step === 'stack' && !answers.stack) return 'Choose a primary language to continue.'
  if (step === 'stack' && !answers.frontend) return 'Choose a frontend option to continue.'
  return ''
}

function renderStep(root: HTMLElement, state: ConfiguratorState) {
  const activeId = STEP_IDS[state.stepIndex]
  for (const panel of root.querySelectorAll<HTMLElement>('[data-context-step]')) {
    panel.hidden = panel.dataset.contextStep !== activeId
  }
  for (const indicator of root.querySelectorAll<HTMLElement>('[data-context-step-indicator]')) {
    const indicatorIndex = STEP_IDS.indexOf(indicator.dataset.contextStepIndicator as StepId)
    const isCurrent = indicatorIndex === state.stepIndex
    indicator.dataset.complete = String(indicatorIndex < state.stepIndex)
    if (isCurrent) indicator.setAttribute('aria-current', 'step')
    else indicator.removeAttribute('aria-current')
  }
  const error = root.querySelector<HTMLElement>('[data-context-error]')
  if (error) error.textContent = ''
}

function completeAnswers(answers: PartialContextAnswers): ContextAnswers | null {
  if (!answers.teamSize || !answers.claudeMdStatus || !answers.rulesFiles || !answers.stack || !answers.frontend) {
    return null
  }
  return {
    teamSize: answers.teamSize,
    aiTools: answers.aiTools ?? [],
    claudeMdStatus: answers.claudeMdStatus,
    rulesFiles: answers.rulesFiles,
    stack: answers.stack,
    frontend: answers.frontend,
  }
}

function renderResults(root: HTMLElement, form: HTMLFormElement, answers: ContextAnswers) {
  const maturityLevel = calculateMaturityLevel(answers)
  const maturity = MATURITY_LEVELS.find((item) => item.level === maturityLevel) ?? MATURITY_LEVELS[0]
  const claudeMd = generateClaudeMd(answers)
  const profile = generateProfileYaml(answers)

  const claudeMdOutput = root.querySelector<HTMLElement>('[data-context-claude-md]')
  const profileOutput = root.querySelector<HTMLElement>('[data-context-profile]')
  const profilePanel = root.querySelector<HTMLElement>('[data-context-profile-panel]')
  const maturityLabel = root.querySelector<HTMLElement>('[data-context-maturity-label]')
  const nextSteps = root.querySelector<HTMLElement>('[data-context-next-steps]')
  const results = root.querySelector<HTMLElement>('[data-context-results]')

  if (claudeMdOutput) claudeMdOutput.textContent = claudeMd
  if (profileOutput) profileOutput.textContent = profile ?? ''
  if (profilePanel) profilePanel.hidden = profile === null
  if (maturityLabel) maturityLabel.textContent = `Level ${maturity.level}: ${maturity.name}`
  if (nextSteps) {
    nextSteps.replaceChildren(...maturity.nextSteps.map((step) => {
      const item = getDocument(root)?.createElement('li')
      if (!item) return null
      item.textContent = step
      return item
    }).filter((item): item is HTMLLIElement => item !== null))
  }

  for (const item of root.querySelectorAll<HTMLElement>('[data-context-maturity]')) {
    const isCurrent = Number(item.dataset.contextMaturity) === maturity.level
    if (isCurrent) {
      item.dataset.current = 'true'
      item.setAttribute('aria-current', 'true')
    } else {
      delete item.dataset.current
      item.removeAttribute('aria-current')
    }
  }

  form.hidden = true
  if (results) {
    results.hidden = false
    results.focus({ preventScroll: true })
  }
}

function bindCopyControls(root: HTMLElement) {
  const document = getDocument(root)
  const clipboard = document?.defaultView?.navigator.clipboard

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-copy-target]')) {
    button.addEventListener('click', async () => {
      const targetName = button.dataset.copyTarget
      const source = targetName === 'profile'
        ? root.querySelector<HTMLElement>('[data-context-profile]')
        : root.querySelector<HTMLElement>('[data-context-claude-md]')
      const status = root.querySelector<HTMLElement>(`[data-copy-status="${targetName}"]`)
      if (!source || !status) return

      try {
        if (!clipboard) throw new Error('Clipboard unavailable')
        await clipboard.writeText(source.textContent ?? '')
        status.textContent = 'Copied.'
      } catch {
        status.textContent = 'Copy failed. Select the text manually.'
      }
    })
  }
}

function initOneConfigurator(root: HTMLElement) {
  if (root.dataset.ready === 'true') return
  root.dataset.ready = 'true'

  const form = root.querySelector<HTMLFormElement>('[data-context-form]')
  if (!form) return
  const state: ConfiguratorState = { stepIndex: 0, answers: {} }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-context-next]')) {
    button.addEventListener('click', () => {
      state.answers = collectAnswers(form)
      const currentStep = STEP_IDS[state.stepIndex]
      const message = validationMessage(currentStep, state.answers)
      const error = root.querySelector<HTMLElement>('[data-context-error]')
      if (message) {
        if (error) error.textContent = message
        return
      }
      state.stepIndex = Math.min(state.stepIndex + 1, STEP_IDS.length - 1)
      renderStep(root, state)
    })
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-context-back]')) {
    button.addEventListener('click', () => {
      state.stepIndex = Math.max(0, state.stepIndex - 1)
      renderStep(root, state)
    })
  }

  root.querySelector<HTMLButtonElement>('[data-context-generate]')?.addEventListener('click', () => {
    state.answers = collectAnswers(form)
    const message = validationMessage('stack', state.answers)
    const error = root.querySelector<HTMLElement>('[data-context-error]')
    if (message) {
      if (error) error.textContent = message
      return
    }
    const answers = completeAnswers(state.answers)
    if (answers) renderResults(root, form, answers)
  })

  root.querySelector<HTMLButtonElement>('[data-context-restart]')?.addEventListener('click', () => {
    form.reset()
    state.stepIndex = 0
    state.answers = {}
    form.hidden = false
    const results = root.querySelector<HTMLElement>('[data-context-results]')
    if (results) results.hidden = true
    renderStep(root, state)
  })

  bindCopyControls(root)
  renderStep(root, state)
}

export function initContextConfigurator(root: ParentNode = document) {
  for (const configurator of root.querySelectorAll<HTMLElement>('[data-context-configurator]')) {
    initOneConfigurator(configurator)
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initContextConfigurator())
}
