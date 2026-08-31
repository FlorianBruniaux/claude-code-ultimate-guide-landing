import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PUBLIC_RUNTIME_PATH = 'machine-readable/mcp-public-runtime.json'
const NPM_STATS_PATH = 'machine-readable/mcp-stats.json'
const NPM_METHODOLOGY =
  'npm downloads are package download events, not users, active installations, sessions, or tool executions.'

export type DownloadPeriod = {
  start: string
  end: string
  count: number
}

export type McpProductData = {
  packageName: string
  publicVersion: string
  installCommand: string
  snapshotAt: string
  serverName: string
  serverVersion: string
  capabilities: {
    tools: string[]
    resources: string[]
    prompts: string[]
  }
  counts: {
    tools: number
    resources: number
    prompts: number
  }
  downloads: {
    sinceLaunch: DownloadPeriod
    last30Days: DownloadPeriod
    last7Days: DownloadPeriod
  }
  npmSnapshotAt: string
  npmSource: 'npm downloads API'
  methodology: string
}

type JsonObject = Record<string, unknown>

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requireObject(value: unknown, label: string, scope: string): JsonObject {
  if (!isObject(value)) {
    throw new Error(`Invalid ${scope}: ${label} must be an object`)
  }
  return value
}

function requireString(value: unknown, label: string, scope: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Invalid ${scope}: ${label} must be a non-empty string`)
  }
  return value
}

function requireTimestamp(value: unknown, label: string, scope: string): string {
  const timestamp = requireString(value, label, scope)
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(timestamp)) {
    throw new Error(`Invalid ${scope}: ${label} must be an ISO 8601 UTC timestamp`)
  }
  return timestamp
}

function requireStringList(value: unknown, label: string, scope: string): string[] {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string' || entry.trim() === '')) {
    throw new Error(`Invalid ${scope}: ${label} must be an array of non-empty strings`)
  }
  return [...value]
}

function requireCount(value: unknown, label: string, scope: string): number {
  if (!Number.isInteger(value) || (value as number) < 0) {
    throw new Error(`Invalid ${scope}: ${label} must be a non-negative integer`)
  }
  return value as number
}

function requireDate(value: unknown, label: string, scope: string): string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid ${scope}: ${label} must be a YYYY-MM-DD date`)
  }

  const parsed = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`Invalid ${scope}: ${label} must be a YYYY-MM-DD date`)
  }
  return value
}

function requireDownloadPeriod(value: unknown, label: string): DownloadPeriod {
  const scope = 'MCP npm statistics'
  const period = requireObject(value, label, scope)
  const start = requireDate(period.start, `${label}.start`, scope)
  const end = requireDate(period.end, `${label}.end`, scope)
  if (start > end) {
    throw new Error(`Invalid ${scope}: ${label}.start must not be after ${label}.end`)
  }

  return {
    start,
    end,
    count: requireCount(period.count, `${label}.count`, scope),
  }
}

function readJsonEvidence(guideRoot: string, relativePath: string): unknown {
  const path = resolve(guideRoot, relativePath)
  let raw: string
  try {
    raw = readFileSync(path, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`Missing MCP public evidence: ${path}`)
    }
    throw error
  }

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error(`Invalid JSON in MCP public evidence: ${path}`)
  }
}

function resolveGuideRoot(): string {
  const configuredRoot = process.env.GUIDE_REPO_PATH?.trim()
  return configuredRoot || resolve(process.cwd(), '../claude-code-ultimate-guide')
}

export function loadMcpProductData(guideRoot = resolveGuideRoot()): McpProductData {
  const runtimeScope = 'MCP public runtime'
  const runtime = requireObject(
    readJsonEvidence(guideRoot, PUBLIC_RUNTIME_PATH),
    'root',
    runtimeScope,
  )
  if (runtime.schema_version !== 1) {
    throw new Error(`Invalid ${runtimeScope}: schema_version must be 1`)
  }

  const packageInfo = requireObject(runtime.package, 'package', runtimeScope)
  const packageName = requireString(packageInfo.name, 'package.name', runtimeScope)
  const publicVersion = requireString(packageInfo.npm_version, 'package.npm_version', runtimeScope)
  const serverInfo = requireObject(runtime.server_info, 'server_info', runtimeScope)
  const capabilitiesValue = requireObject(runtime.capabilities, 'capabilities', runtimeScope)
  const countsValue = requireObject(runtime.counts, 'counts', runtimeScope)
  const capabilities = {
    tools: requireStringList(capabilitiesValue.tools, 'capabilities.tools', runtimeScope),
    resources: requireStringList(capabilitiesValue.resources, 'capabilities.resources', runtimeScope),
    prompts: requireStringList(capabilitiesValue.prompts, 'capabilities.prompts', runtimeScope),
  }
  const counts = {
    tools: requireCount(countsValue.tools, 'counts.tools', runtimeScope),
    resources: requireCount(countsValue.resources, 'counts.resources', runtimeScope),
    prompts: requireCount(countsValue.prompts, 'counts.prompts', runtimeScope),
  }

  for (const capability of ['tools', 'resources', 'prompts'] as const) {
    if (counts[capability] !== capabilities[capability].length) {
      throw new Error(
        `Invalid ${runtimeScope}: counts.${capability} is ${counts[capability]} but capabilities.${capability} has ${capabilities[capability].length} entries`,
      )
    }
  }

  const statsScope = 'MCP npm statistics'
  const stats = requireObject(readJsonEvidence(guideRoot, NPM_STATS_PATH), 'root', statsScope)
  if (stats.schema_version !== 1) {
    throw new Error(`Invalid ${statsScope}: schema_version must be 1`)
  }
  const statsPackage = requireString(stats.package, 'package', statsScope)
  const statsVersion = requireString(stats.public_version, 'public_version', statsScope)
  const downloadsValue = requireObject(stats.downloads, 'downloads', statsScope)

  if (statsPackage !== packageName) {
    throw new Error(
      `Contradictory MCP evidence: runtime package ${packageName} differs from statistics package ${statsPackage}`,
    )
  }
  if (statsVersion !== publicVersion) {
    throw new Error(
      `Contradictory MCP evidence: runtime npm version ${publicVersion} differs from statistics public version ${statsVersion}`,
    )
  }

  return {
    packageName,
    publicVersion,
    installCommand: `npx -y ${packageName}@${publicVersion}`,
    snapshotAt: requireTimestamp(runtime.snapshot_at, 'snapshot_at', runtimeScope),
    serverName: requireString(serverInfo.name, 'server_info.name', runtimeScope),
    serverVersion: requireString(serverInfo.version, 'server_info.version', runtimeScope),
    capabilities,
    counts,
    downloads: {
      sinceLaunch: requireDownloadPeriod(downloadsValue.since_launch, 'downloads.since_launch'),
      last30Days: requireDownloadPeriod(downloadsValue.last_30_days, 'downloads.last_30_days'),
      last7Days: requireDownloadPeriod(downloadsValue.last_7_days, 'downloads.last_7_days'),
    },
    npmSnapshotAt: requireTimestamp(stats.snapshot_at, 'snapshot_at', statsScope),
    npmSource: 'npm downloads API',
    methodology: NPM_METHODOLOGY,
  }
}
