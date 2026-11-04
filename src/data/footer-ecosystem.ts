import { PERSONAL_PROJECTS } from './personal-projects.generated.ts'

const CURRENT_SITE_ID = 'claude-code-guide'

export interface FooterEcosystemProject {
  id: string
  label: string
  title: string
  href: string
  soon: boolean
}

// The manifest id is the repository-style name (cc-copilot-bridge, wt-sweep),
// already lowercase, so every footer entry reads the same way.
export function getFooterEcosystemProjects(): FooterEcosystemProject[] {
  return PERSONAL_PROJECTS.filter((project) => project.id !== CURRENT_SITE_ID).map((project) => ({
    id: project.id,
    label: project.id,
    title: project.title,
    href: project.href,
    soon: 'status' in project && project.status === 'soon',
  }))
}
