import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PUBLIC_RUNTIME_PATH = 'machine-readable/mcp-public-runtime.json'
const NPM_STATS_PATH = 'machine-readable/mcp-stats.json'
const EXPECTED_PACKAGE_NAME = 'claude-code-ultimate-guide-mcp'
const NPM_METHODOLOGY =
  'npm downloads are package download events, not users, active installations, sessions, or tool executions.'
const SEMVER_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/

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

function requireSemver(value: unknown, label: string, scope: string): string {
  const version = requireString(value, label, scope)
  if (!SEMVER_PATTERN.test(version)) {
    throw new Error(`Invalid ${scope}: ${label} must be a SemVer version`)
  }
  return version
}

function requireTimestamp(value: unknown, label: string, scope: string): string {
  const timestamp = requireString(value, label, scope)
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/.exec(
    timestamp,
  )
  const parsed = new Date(timestamp)
  if (
    !match ||
    Number.isNaN(parsed.valueOf()) ||
    parsed.getUTCFullYear() !== Number(match[1]) ||
    parsed.getUTCMonth() + 1 !== Number(match[2]) ||
    parsed.getUTCDate() !== Number(match[3]) ||
    parsed.getUTCHours() !== Number(match[4]) ||
    parsed.getUTCMinutes() !== Number(match[5]) ||
    parsed.getUTCSeconds() !== Number(match[6])
  ) {
    throw new Error(`Invalid ${scope}: ${label} must be an ISO 8601 UTC timestamp`)
  }
  return timestamp
}

function requireStringList(value: unknown, label: string, scope: string): string[] {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string' || entry.trim() === '')) {
    throw new Error(`Invalid ${scope}: ${label} must be an array of non-empty strings`)
  }
  if (new Set(value).size !== value.length) {
    throw new Error(`Invalid ${scope}: ${label} must not contain duplicate entries`)
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

function inclusiveUtcDays(period: DownloadPeriod): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  return (Date.parse(`${period.end}T00:00:00Z`) - Date.parse(`${period.start}T00:00:00Z`)) /
    millisecondsPerDay + 1
}

function validateDownloadWindows(downloads: McpProductData['downloads']): void {
  const scope = 'MCP npm statistics'
  if (inclusiveUtcDays(downloads.last30Days) !== 30) {
    throw new Error(
      `Invalid ${scope}: downloads.last_30_days must cover exactly 30 complete UTC days`,
    )
  }
  if (inclusiveUtcDays(downloads.last7Days) !== 7) {
    throw new Error(
      `Invalid ${scope}: downloads.last_7_days must cover exactly 7 complete UTC days`,
    )
  }
  if (
    downloads.sinceLaunch.end !== downloads.last30Days.end ||
    downloads.sinceLaunch.end !== downloads.last7Days.end
  ) {
    throw new Error(`Contradictory MCP evidence: download periods must share the same end date`)
  }
  if (
    downloads.sinceLaunch.count < downloads.last30Days.count ||
    downloads.last30Days.count < downloads.last7Days.count
  ) {
    throw new Error(
      `Contradictory MCP evidence: download counts must satisfy since_launch >= last_30_days >= last_7_days`,
    )
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
  if (packageName !== EXPECTED_PACKAGE_NAME) {
    throw new Error(
      `Invalid ${runtimeScope}: package.name must be ${EXPECTED_PACKAGE_NAME}`,
    )
  }
  const publicVersion = requireSemver(packageInfo.npm_version, 'package.npm_version', runtimeScope)
  const serverInfo = requireObject(runtime.server_info, 'server_info', runtimeScope)
  const serverVersion = requireSemver(serverInfo.version, 'server_info.version', runtimeScope)
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
  if (statsPackage !== EXPECTED_PACKAGE_NAME) {
    throw new Error(`Invalid ${statsScope}: package must be ${EXPECTED_PACKAGE_NAME}`)
  }
  const statsVersion = requireSemver(stats.public_version, 'public_version', statsScope)
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

  const downloads = {
    sinceLaunch: requireDownloadPeriod(downloadsValue.since_launch, 'downloads.since_launch'),
    last30Days: requireDownloadPeriod(downloadsValue.last_30_days, 'downloads.last_30_days'),
    last7Days: requireDownloadPeriod(downloadsValue.last_7_days, 'downloads.last_7_days'),
  }
  validateDownloadWindows(downloads)

  return {
    packageName,
    publicVersion,
    installCommand: `npx -y ${packageName}@${publicVersion}`,
    snapshotAt: requireTimestamp(runtime.snapshot_at, 'snapshot_at', runtimeScope),
    serverName: requireString(serverInfo.name, 'server_info.name', runtimeScope),
    serverVersion,
    capabilities,
    counts,
    downloads,
    npmSnapshotAt: requireTimestamp(stats.snapshot_at, 'snapshot_at', statsScope),
    npmSource: 'npm downloads API',
    methodology: NPM_METHODOLOGY,
  }
}
