const CAREER_START = {
  year: 2013,
  month: 8,
  day: 1,
} as const

export function getYearsOfExperience(asOf: Date = new Date()): number {
  const currentYear = asOf.getUTCFullYear()
  const currentMonth = asOf.getUTCMonth() + 1
  const currentDay = asOf.getUTCDate()
  const anniversaryReached =
    currentMonth > CAREER_START.month ||
    (currentMonth === CAREER_START.month && currentDay >= CAREER_START.day)

  return currentYear - CAREER_START.year - (anniversaryReached ? 0 : 1)
}

export const authorProfile = {
  name: 'Florian BRUNIAUX',
  role: 'AI Founding Engineer',
  organization: 'Méthode Aristote',
  organizationUrl: 'https://methode-aristote.fr/',
  aboutUrl: 'https://www.florian.bruniaux.com/about/',
  blogUrl: 'https://www.florian.bruniaux.com/blog/',
  projectsUrl: 'https://www.florian.bruniaux.com/projects/',
  githubUrl: 'https://github.com/FlorianBruniaux',
  linkedinUrl: 'https://www.linkedin.com/in/florian-bruniaux-43408b83/',
  imageUrl: '/author.png',
  experienceYears: getYearsOfExperience(),
} as const
