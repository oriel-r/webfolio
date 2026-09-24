import { ui, defaultLang } from './ui'

export type Lang = keyof typeof ui

export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const relativePath = url.pathname.startsWith(base)
    ? url.pathname.slice(base.length).replace(/^\/+/, '')
    : url.pathname.replace(/^\/+/, '')
  const [firstSegment] = relativePath.split('/')
  if (firstSegment && firstSegment in ui) return firstSegment as Lang
  return defaultLang
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const p = l === defaultLang ? normalizedPath : `/${l}${normalizedPath}`
    return `${base}${p}`
  }
}
