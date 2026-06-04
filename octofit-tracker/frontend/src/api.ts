const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME
const DEFAULT_PORT = 8000
const APP_GITHUB_DEV_SUFFIX = '.app.github.dev'

function getCodespaceNameFromHost() {
  if (typeof window === 'undefined') return ''
  const hostname = window.location.hostname
  if (!hostname.endsWith(APP_GITHUB_DEV_SUFFIX)) return ''

  const hostPrefix = hostname.replace(APP_GITHUB_DEV_SUFFIX, '')
  const pieces = hostPrefix.split('-')
  const lastSegment = pieces[pieces.length - 1]

  if (lastSegment === '5173' || lastSegment === '3000' || lastSegment === '4173') {
    return pieces.slice(0, -1).join('-')
  }

  return ''
}

export const CODESPACE_NAME = envCodespaceName || getCodespaceNameFromHost()
export const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${DEFAULT_PORT}`

export const API_BASE_URL = `${API_HOST}/api`

export function normalizeResponse<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[]
  }

  if (value && typeof value === 'object') {
    const payload = value as Record<string, unknown>
    if (Array.isArray(payload.data)) return payload.data as T[]
    if (Array.isArray(payload.items)) return payload.items as T[]
    if (Array.isArray(payload.results)) return payload.results as T[]
  }

  return []
}

export function buildEndpoint(resource: string) {
  return `${API_BASE_URL}/${resource}`
}
