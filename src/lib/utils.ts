// Цены хранятся в базовых условных единицах каталога; для интерфейса показываем рубли.
export const RUB_PER_CATALOG_UNIT = 10

export const formatPrice = (n: number): string =>
  `${(n * RUB_PER_CATALOG_UNIT).toLocaleString('ru-RU')} ₽`

export const scrollToId = (id: string): void => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const cx = (...parts: (string | false | null | undefined)[]): string =>
  parts.filter(Boolean).join(' ')

/** Local warm-toned SVG placeholder used if an external image fails to load. */
export const FALLBACK_IMG: string = (() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
  <rect width="900" height="900" fill="#eae5dc"/>
  <g fill="none" stroke="#a79c90" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M250 520v-80c0-30 24-54 54-54h292c30 0 54 24 54 54v80"/>
    <path d="M195 520h510v36c0 26-21 47-47 47H242c-26 0-47-21-47-47z"/>
    <path d="M348 440v34M452 440v34M556 440v34"/>
    <path d="M352 386h196v40H352z" rx="8"/>
    <circle cx="640" cy="330" r="26"/>
    <path d="M640 316v28M627 330h26"/>
  </g>
  <text x="450" y="660" font-family="Georgia, serif" font-size="26" letter-spacing="10" fill="#a79c90" text-anchor="middle">LUMERA</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})()

export const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
