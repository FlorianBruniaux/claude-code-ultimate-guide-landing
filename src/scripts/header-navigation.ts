type NavigationRoot = Document | HTMLElement

function getDocument(root: NavigationRoot) {
  return root.nodeType === 9 ? root as Document : root.ownerDocument
}

export function initHeaderNavigation(root: NavigationRoot = document) {
  const candidateDocument = getDocument(root)
  const candidateHeader = root.querySelector<HTMLElement>('[data-site-header]')
  if (!candidateDocument || !candidateHeader || candidateHeader.dataset.navigationReady === 'true') return
  const documentRef: Document = candidateDocument
  const header: HTMLElement = candidateHeader
  header.dataset.navigationReady = 'true'

  const triggers = Array.from(header.querySelectorAll<HTMLElement>('[data-nav-trigger]'))
  const sections = Array.from(header.querySelectorAll<HTMLDetailsElement>('[data-nav-section]'))
  const panels = Array.from(header.querySelectorAll<HTMLElement>('[data-nav-panel]'))
  let activeTrigger: HTMLElement | null = null

  function panelFor(trigger: HTMLElement) {
    const panelId = trigger.getAttribute('aria-controls')
    return panelId ? header.querySelector<HTMLElement>(`#${panelId}`) : null
  }

  function sectionFor(trigger: HTMLElement) {
    return trigger.closest<HTMLDetailsElement>('[data-nav-section]')
  }

  function closeDesktopNavigation(restoreFocus = false) {
    const triggerToFocus = activeTrigger
    for (const trigger of triggers) {
      trigger.setAttribute('aria-expanded', 'false')
      trigger.removeAttribute('data-open')
    }
    for (const section of sections) section.open = false
    activeTrigger = null
    if (restoreFocus) triggerToFocus?.focus()
  }

  function openDesktopNavigation(trigger: HTMLElement, focusFirstLink = false) {
    const panel = panelFor(trigger)
    const section = sectionFor(trigger)
    if (!panel || !section) return

    closeDesktopNavigation()
    trigger.setAttribute('aria-expanded', 'true')
    trigger.setAttribute('data-open', '')
    section.open = true
    activeTrigger = trigger

    if (focusFirstLink) panel.querySelector<HTMLAnchorElement>('a[href]')?.focus()
  }

  for (const trigger of triggers) {
    trigger.addEventListener('click', (event) => {
      event.preventDefault()
      const wasOpen = sectionFor(trigger)?.open === true
      wasOpen ? closeDesktopNavigation() : openDesktopNavigation(trigger)
    })

    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown') return
      event.preventDefault()
      openDesktopNavigation(trigger, true)
    })
  }

  for (const panel of panels) {
    panel.addEventListener('keydown', (event) => {
      const links = Array.from(panel.querySelectorAll<HTMLAnchorElement>('a[href]'))
      if (!links.length) return
      const currentIndex = links.indexOf(documentRef.activeElement as HTMLAnchorElement)

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        links[(currentIndex + 1 + links.length) % links.length].focus()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        links[(currentIndex - 1 + links.length) % links.length].focus()
      } else if (event.key === 'Home') {
        event.preventDefault()
        links[0].focus()
      } else if (event.key === 'End') {
        event.preventDefault()
        links[links.length - 1].focus()
      } else if (event.key === 'Tab' && !documentRef.body.hasAttribute('data-global-menu-expanded')) {
        closeDesktopNavigation()
      }
    })
  }

  const mobileToggle = header.querySelector<HTMLButtonElement>('#mobile-menu-toggle')
  const mobileMenu = header.querySelector<HTMLElement>('#primary-navigation')
  const menuIcon = header.querySelector<HTMLElement>('#menu-icon')
  const closeIcon = header.querySelector<HTMLElement>('#close-icon')

  function closeMobileNavigation(restoreFocus = false) {
    if (!mobileToggle || !mobileMenu) return
    mobileMenu.classList.add('hidden')
    menuIcon?.classList.remove('hidden')
    closeIcon?.classList.add('hidden')
    mobileToggle.setAttribute('aria-expanded', 'false')
    documentRef.body.removeAttribute('data-global-menu-expanded')
    if (restoreFocus) mobileToggle.focus()
  }

  function openMobileNavigation() {
    if (!mobileToggle || !mobileMenu) return
    closeDesktopNavigation()

    const guideMenuButton = documentRef.querySelector<HTMLButtonElement>(
      'starlight-menu-button[aria-expanded="true"] button',
    )
    guideMenuButton?.click()

    mobileMenu.classList.remove('hidden')
    menuIcon?.classList.add('hidden')
    closeIcon?.classList.remove('hidden')
    mobileToggle.setAttribute('aria-expanded', 'true')
    documentRef.body.setAttribute('data-global-menu-expanded', '')
    mobileMenu.querySelector<HTMLElement>('a[href], summary, button:not([disabled])')?.focus()
  }

  mobileToggle?.addEventListener('click', () => {
    if (!mobileMenu) return
    mobileMenu.classList.contains('hidden') ? openMobileNavigation() : closeMobileNavigation()
  })

  mobileMenu?.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !mobileToggle) return
    const focusable = Array.from(
      mobileMenu.querySelectorAll<HTMLElement>('a[href], summary, button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && documentRef.activeElement === first) {
      event.preventDefault()
      mobileToggle.focus()
    } else if (!event.shiftKey && documentRef.activeElement === last) {
      event.preventDefault()
      mobileToggle.focus()
    }
  })

  documentRef.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (activeTrigger) closeDesktopNavigation(true)
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) closeMobileNavigation(true)
  })

  documentRef.addEventListener('click', (event) => {
    const target = event.target as Node | null
    if (!target || header.contains(target)) return
    closeDesktopNavigation()
    closeMobileNavigation()
  })
}
