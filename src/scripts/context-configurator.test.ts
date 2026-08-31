import assert from 'node:assert/strict'
import test from 'node:test'
import { Window } from 'happy-dom'

import { initContextConfigurator } from './context-configurator.ts'

function createConfigurator(options: { clipboardRejects?: boolean } = {}) {
  const window = new Window({ url: 'https://cc.bruniaux.com/context/' })
  const document = window.document

  Object.defineProperty(window.navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: options.clipboardRejects
        ? async () => { throw new Error('denied') }
        : async () => undefined,
    },
  })

  document.body.innerHTML = `
    <section data-context-configurator>
      <form data-context-form>
        <div data-context-step="profile">
          <input type="radio" name="teamSize" value="solo">
          <input type="radio" name="teamSize" value="small">
          <input type="checkbox" name="aiTools" value="claude-code">
          <button type="button" data-context-next>Continue</button>
        </div>
        <div data-context-step="current" hidden>
          <input type="radio" name="claudeMdStatus" value="none">
          <input type="radio" name="claudeMdStatus" value="medium">
          <input type="radio" name="rulesFiles" value="0">
          <input type="radio" name="rulesFiles" value="6-15">
          <button type="button" data-context-back>Back</button>
          <button type="button" data-context-next>Continue</button>
        </div>
        <div data-context-step="stack" hidden>
          <input type="radio" name="stack" value="typescript">
          <input type="radio" name="frontend" value="react">
          <button type="button" data-context-back>Back</button>
          <button type="button" data-context-generate>Generate</button>
        </div>
        <p data-context-error role="alert"></p>
      </form>
      <section data-context-results hidden>
        <p data-context-maturity-label></p>
        <pre data-context-claude-md></pre>
        <div data-context-profile-panel><pre data-context-profile></pre></div>
        <ul data-context-next-steps></ul>
        <button type="button" data-copy-target="claude-md">Copy</button>
        <span data-copy-status="claude-md" aria-live="polite"></span>
        <button type="button" data-context-restart>Restart</button>
      </section>
      <ol>
        <li data-context-maturity="1"></li>
        <li data-context-maturity="2"></li>
        <li data-context-maturity="3"></li>
        <li data-context-maturity="4"></li>
        <li data-context-maturity="5"></li>
      </ol>
    </section>
  `

  return document as unknown as Document
}

function choose(document: Document, name: string, value: string) {
  const input = document.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`)
  assert.ok(input)
  input.click()
}

function activeStep(document: Document) {
  return [...document.querySelectorAll<HTMLElement>('[data-context-step]')]
    .find((step) => !step.hidden)?.dataset.contextStep
}

function completeTeamReadyAnswers(document: Document) {
  choose(document, 'teamSize', 'small')
  document.querySelector<HTMLInputElement>('input[name="aiTools"]')?.click()
  document.querySelector<HTMLButtonElement>('[data-context-step="profile"] [data-context-next]')?.click()
  choose(document, 'claudeMdStatus', 'medium')
  choose(document, 'rulesFiles', '6-15')
  document.querySelector<HTMLButtonElement>('[data-context-step="current"] [data-context-next]')?.click()
  choose(document, 'stack', 'typescript')
  choose(document, 'frontend', 'react')
  document.querySelector<HTMLButtonElement>('[data-context-generate]')?.click()
}

test('blocks step advancement until the required profile answer exists', () => {
  const document = createConfigurator()
  initContextConfigurator(document)

  document.querySelector<HTMLButtonElement>('[data-context-next]')?.click()

  assert.equal(document.querySelector('[data-context-error]')?.textContent, 'Choose a team size to continue.')
  assert.equal(activeStep(document), 'profile')
})

test('renders canonical generated files and highlights the calculated maturity level', () => {
  const document = createConfigurator()
  initContextConfigurator(document)

  completeTeamReadyAnswers(document)

  assert.match(document.querySelector('[data-context-claude-md]')?.textContent ?? '', /# CLAUDE\.md: \[Project Name\]/)
  assert.match(document.querySelector('[data-context-profile]')?.textContent ?? '', /# Team Profile Template/)
  assert.equal(document.querySelector('[data-context-maturity="3"]')?.getAttribute('data-current'), 'true')
  assert.equal(document.querySelector('[data-context-maturity-label]')?.textContent, 'Level 3: Team-Ready')
  assert.equal(document.querySelector<HTMLElement>('[data-context-results]')?.hidden, false)
})

test('reports clipboard failure while keeping generated output visible', async () => {
  const document = createConfigurator({ clipboardRejects: true })
  initContextConfigurator(document)
  completeTeamReadyAnswers(document)

  document.querySelector<HTMLButtonElement>('[data-copy-target="claude-md"]')?.click()
  await new Promise((resolve) => setTimeout(resolve, 0))

  assert.equal(document.querySelector('[data-copy-status="claude-md"]')?.textContent, 'Copy failed. Select the text manually.')
  assert.match(document.querySelector('[data-context-claude-md]')?.textContent ?? '', /# CLAUDE\.md/)
})
