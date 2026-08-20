export const siteBase = import.meta.env.BASE_URL.replace(/\/?$/, '/')

export function resolvePublicUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path
  return `${siteBase}${path.replace(/^\//, '')}`
}