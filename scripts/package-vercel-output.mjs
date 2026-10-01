import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, lstatSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(process.argv[2] ?? join(root, 'dist'))
const output = resolve(process.argv[3] ?? join(root, '.vercel/output'))
const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'))

if (config.trailingSlash !== true) throw new Error('Expected trailingSlash: true in vercel.json')
if (output === dist || output.startsWith(`${dist}${sep}`) || dist.startsWith(`${output}${sep}`)) {
  throw new Error('Output and dist directories must not overlap')
}

function checkTree(path) {
  for (const entry of readdirSync(path)) {
    const child = join(path, entry)
    const stat = lstatSync(child)
    if (stat.isDirectory()) checkTree(child)
    else if (!stat.isFile()) throw new Error(`Unsupported dist entry: ${child}`)
  }
}

function routePattern(source) {
  const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return `^${escaped}${source.endsWith('/') && source !== '/' ? '?' : ''}$`
}

if (!lstatSync(dist).isDirectory()) throw new Error(`Not a directory: ${dist}`)
checkTree(dist)

const routes = []
for (const redirect of config.redirects ?? []) {
  routes.push({
    src: routePattern(redirect.source),
    status: redirect.statusCode,
    headers: { Location: redirect.destination },
  })
}
for (const rule of config.headers ?? []) {
  const headers = Object.fromEntries(rule.headers.map(({ key, value }) => [key, value]))
  const route = { src: routePattern(rule.source), headers }
  if (rule.source === '/') route.dest = '/index.html'
  else if (rule.source.endsWith('/')) route.dest = `${rule.source}index.html`
  else route.continue = true
  routes.push(route)
}
routes.push({ handle: 'filesystem' })
routes.push({ src: '^/(.+)/$', dest: '/$1/index.html' })

rmSync(output, { recursive: true, force: true })
mkdirSync(output, { recursive: true })
cpSync(dist, join(output, 'static'), { recursive: true, force: false })
writeFileSync(join(output, 'config.json'), `${JSON.stringify({ version: 3, routes }, null, 2)}\n`)
console.log(`Packaged ${dist} for Vercel at ${output}`)
