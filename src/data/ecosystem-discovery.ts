import { PERSONAL_PROJECTS } from './personal-projects.generated.ts'

export const ecosystemMenuIds = ['build', 'scale'] as const

export type EcosystemMenuId = typeof ecosystemMenuIds[number]
export type EcosystemMenuProject = typeof PERSONAL_PROJECTS[number]

const routeForMenu: Record<EcosystemMenuId, EcosystemMenuProject['route']> = {
  build: 'build-run',
  scale: 'observe-improve',
}

export function getEcosystemMenuProjects(menu: EcosystemMenuId): EcosystemMenuProject[] {
  return PERSONAL_PROJECTS.filter(
    (project) => project.featured && project.route === routeForMenu[menu],
  )
}

export function getEcosystemProjectAccessibleLabel(project: EcosystemMenuProject) {
  return `${project.title}, ${project.format}. Opens in a new tab.`
}

function validateEcosystemMenuProjects(menu: EcosystemMenuId, projects: EcosystemMenuProject[]) {
  if (projects.length < 1 || projects.length > 3) {
    throw new RangeError(`Ecosystem ${menu} menu must include between one and three projects`)
  }
}

export const ecosystemMenuProjects = {
  build: getEcosystemMenuProjects('build'),
  scale: getEcosystemMenuProjects('scale'),
} satisfies Record<EcosystemMenuId, EcosystemMenuProject[]>

for (const menu of ecosystemMenuIds) {
  validateEcosystemMenuProjects(menu, ecosystemMenuProjects[menu])
}
