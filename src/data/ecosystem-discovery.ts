import { PERSONAL_PROJECTS } from './personal-projects.generated.ts'

export const ecosystemMenuIds = ['build', 'scale', 'resources'] as const

export type EcosystemMenuId = typeof ecosystemMenuIds[number]
export type EcosystemMenuProject = typeof PERSONAL_PROJECTS[number]

const routeForMenu: Record<Exclude<EcosystemMenuId, 'resources'>, EcosystemMenuProject['route']> = {
  build: 'build-run',
  scale: 'observe-improve',
}

const featuredRoutes = Object.values(routeForMenu)

// The guide itself is the site the visitor is on, so it never appears as a project link.
const SELF_PROJECT_ID = 'claude-code-guide'

export function getEcosystemMenuProjects(menu: EcosystemMenuId): EcosystemMenuProject[] {
  if (menu === 'resources') {
    // Every project not already featured in the Build or Scale menu.
    return PERSONAL_PROJECTS.filter(
      (project) =>
        project.id !== SELF_PROJECT_ID
        && !(project.featured && featuredRoutes.includes(project.route)),
    )
  }
  return PERSONAL_PROJECTS.filter(
    (project) => project.featured && project.route === routeForMenu[menu],
  )
}

export function isComingSoon(project: EcosystemMenuProject) {
  return 'status' in project && project.status === 'soon'
}

export function getEcosystemProjectAccessibleLabel(project: EcosystemMenuProject) {
  const soon = isComingSoon(project) ? ', coming soon' : ''
  return `${project.title}${soon}, ${project.format}. Opens in a new tab.`
}

function validateEcosystemMenuProjects(menu: EcosystemMenuId, projects: EcosystemMenuProject[]) {
  if (menu === 'resources') {
    if (projects.length < 1) throw new RangeError('Ecosystem resources menu must include at least one project')
    return
  }
  if (projects.length < 1 || projects.length > 3) {
    throw new RangeError(`Ecosystem ${menu} menu must include between one and three projects`)
  }
}

export const ecosystemMenuProjects = {
  build: getEcosystemMenuProjects('build'),
  scale: getEcosystemMenuProjects('scale'),
  resources: getEcosystemMenuProjects('resources'),
} satisfies Record<EcosystemMenuId, EcosystemMenuProject[]>

for (const menu of ecosystemMenuIds) {
  validateEcosystemMenuProjects(menu, ecosystemMenuProjects[menu])
}
