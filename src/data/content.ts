import type { Category } from './products'

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export interface HeroSlide {
  image: string
  alt: string
  title: string
}

export const heroSlides: HeroSlide[] = [
  {
    image: u('1555041469-a586c61ea9bc', 2000),
    alt: 'Светлая гостиная с бежевым модульным диваном и панорамными окнами',
    title: 'УТРЕННИЙ СВЕТ',
  },
  {
    image: u('1618221195710-dd6b41faaea6', 2000),
    alt: 'Премиальная гостиная в тёплых натуральных тонах',
    title: 'МЯГКИЕ ФОРМЫ',
  },
  {
    image: u('1600607687939-ce8a6c25118c', 2000),
    alt: 'Уютная гостиная с камином и деревянными деталями',
    title: 'ТИХИЙ ВЕЧЕР',
  },
]

export interface Room {
  id: string
  label: string
  image: string
  preset: Category | null
}

export const rooms: Room[] = [
  {
    id: 'living-room',
    label: 'ГОСТИНАЯ',
    image: u('1600210492486-724fe5c67fb0', 900),
    preset: 'Sofas',
  },
  {
    id: 'bedroom',
    label: 'СПАЛЬНЯ',
    image: u('1505693416388-ac5ce068fe85', 900),
    preset: 'Beds',
  },
  {
    id: 'dining-room',
    label: 'СТОЛОВАЯ',
    image: u('1519710164239-da123dc03ef4', 900),
    preset: 'Tables',
  },
  {
    id: 'office',
    label: 'КАБИНЕТ',
    image: u('1497366216548-37526070297c', 900),
    preset: null,
  },
  {
    id: 'outdoor',
    label: 'ТЕРРАСА',
    image: u('1601925260368-ae2f83cf8b7f', 900),
    preset: 'Outdoor',
  },
]

export interface Benefit {
  icon: 'leaf' | 'hand' | 'shield' | 'globe'
  title: string
  text: string
}

export const benefits: Benefit[] = [
  {
    icon: 'leaf',
    title: 'НАТУРАЛЬНЫЕ МАТЕРИАЛЫ',
    text: 'Мы используем только лучшие натуральные материалы, выбранные с ответственностью.',
  },
  {
    icon: 'hand',
    title: 'РУЧНАЯ РАБОТА',
    text: 'Каждый предмет создаётся опытными мастерами вручную.',
  },
  {
    icon: 'shield',
    title: 'СДЕЛАНО НАДОЛГО',
    text: 'Вневременной дизайн и безупречное качество на долгие годы.',
  },
  {
    icon: 'globe',
    title: 'ДОСТАВКА ПО МИРУ',
    text: 'Бережно доставляем нашу мебель в любую точку мира.',
  },
]

export const inspiration = {
  image: u('1583847268964-b28dc8f51f92', 1800),
  alt: 'Широкая гостиная с угловым диваном и теплым освещением',
}

export interface FooterLink {
  label: string
  action: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'МАГАЗИН',
    links: [
      { label: 'Все товары', action: 'shop' },
      { label: 'Новинки', action: 'shop-new' },
      { label: 'Бестселлеры', action: 'shop-pop' },
      { label: 'Распродажа', action: 'shop-sale' },
    ],
  },
  {
    title: 'КОЛЛЕКЦИИ',
    links: [
      { label: 'Гостиная', action: 'cat:Sofas' },
      { label: 'Спальня', action: 'cat:Beds' },
      { label: 'Столовая', action: 'cat:Tables' },
      { label: 'Кабинет', action: 'shop-office' },
      { label: 'Терраса', action: 'cat:Outdoor' },
    ],
  },
  {
    title: 'О КОМПАНИИ',
    links: [
      { label: 'О нас', action: '#about' },
      { label: 'Мастерство', action: 'toast' },
      { label: 'Экологичность', action: 'toast' },
      { label: 'Журнал', action: 'toast' },
      { label: 'Контакты', action: '#contact' },
    ],
  },
  {
    title: 'ПОМОЩЬ',
    links: [
      { label: 'Доставка', action: 'toast' },
      { label: 'Возврат и обмен', action: 'toast' },
      { label: 'Гарантия', action: 'toast' },
      { label: 'Частые вопросы', action: 'toast' },
    ],
  },
]

export const navLinks = [
  { label: 'МАГАЗИН', target: 'shop' },
  { label: 'КОЛЛЕКЦИИ', target: 'collections' },
  { label: 'КОМНАТЫ', target: 'rooms' },
  { label: 'ВДОХНОВЕНИЕ', target: 'inspiration' },
  { label: 'О НАС', target: 'about' },
  { label: 'КОНТАКТЫ', target: 'contact' },
]
