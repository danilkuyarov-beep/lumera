export type Category =
  | 'Sofas'
  | 'Chairs'
  | 'Tables'
  | 'Beds'
  | 'Storage'
  | 'Lighting'
  | 'Accessories'
  | 'Outdoor'

export type ColorName = 'Ivory' | 'Sand' | 'Taupe' | 'Walnut' | 'Charcoal'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  image: string
  description: string
  color: ColorName
  material: string
  popularity: number
  added: number
  isNew?: boolean
  isBestseller?: boolean
  isSale?: boolean
  isOffice?: boolean
}

const u = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const DAY = 86_400_000
const now = Date.now()

export const products: Product[] = [
  {
    id: 'luma-lounge-chair', name: 'LUMA — КРЕСЛО ДЛЯ ОТДЫХА', category: 'Chairs', price: 1890,
    image: u('1567538096630-e0c55bd6374c'),
    description: 'Скульптурное кресло из массива дуба и тёплого букле. Для медленных утр и долгих разговоров.',
    color: 'Sand', material: 'Oak', popularity: 98, added: now - 240 * DAY, isBestseller: true, isSale: true,
  },
  {
    id: 'riva-sofa', name: 'RIVA — ДИВАН', category: 'Sofas', price: 3450,
    image: u('1540574163026-643ea20ade25'),
    description: 'Мягкий округлый диван в натуральном льне. Низкая посадка и пуховые подушки созданы, чтобы задержаться подольше.',
    color: 'Sand', material: 'Linen', popularity: 96, added: now - 210 * DAY, isBestseller: true, isSale: true,
  },
  {
    id: 'terra-dining-table', name: 'TERRA — ОБЕДЕННЫЙ СТОЛ', category: 'Tables', price: 2950,
    image: u('1615066390971-03e4e1c36ddf'),
    description: 'Монументальный обеденный стол из копчёного дуба с резным основанием. Для встреч, которые повторяются из сезона в сезон.',
    color: 'Walnut', material: 'Walnut', popularity: 92, added: now - 180 * DAY, isBestseller: true, isSale: true,
  },
  {
    id: 'nord-sideboard', name: 'NORD — БУФЕТ', category: 'Storage', price: 2250,
    image: u('1595428774223-ef52624120d2'),
    description: 'Сдержанный предмет из тёмного ореха с гладкими фасадами и деталями из матовой латуни.',
    color: 'Walnut', material: 'Walnut', popularity: 88, added: now - 160 * DAY, isBestseller: true, isSale: true,
  },
  {
    id: 'vela-sofa', name: 'VELA — ДИВАН', category: 'Sofas', price: 3980,
    image: u('1616486338812-3dadae4b4ace'),
    description: 'Глубокий модульный диван из фактурной шерсти оттенка тауп на каркасе из выдержанного бука.',
    color: 'Taupe', material: 'Wool', popularity: 74, added: now - 12 * DAY, isNew: true,
  },
  {
    id: 'haven-sofa', name: 'HAVEN — ДИВАН', category: 'Sofas', price: 3150,
    image: u('1598928506311-c55ded91a20c'),
    description: 'Диван из льна цвета слоновой кости с пуховыми подушками и тонким дубовым основанием.',
    color: 'Ivory', material: 'Linen', popularity: 81, added: now - 120 * DAY,
  },
  {
    id: 'soleil-sofa', name: 'SOLEIL — ДИВАН', category: 'Sofas', price: 2690,
    image: u('1586023492125-27b2c045efd7'),
    description: 'Лёгкий и просторный диван из хлопка с эффектом выстиранной ткани и ощущением естественного комфорта.',
    color: 'Ivory', material: 'Cotton', popularity: 66, added: now - 20 * DAY, isNew: true,
  },
  {
    id: 'airo-chair', name: 'AIRO — СТУЛ', category: 'Chairs', price: 640,
    image: u('1598300042247-d088f8ab3a91'),
    description: 'Утончённый стул с гнутой фанерной спинкой и матовыми стальными ножками. Лёгкий и удобный.',
    color: 'Charcoal', material: 'Steel', popularity: 72, added: now - 8 * DAY, isOffice: true, isNew: true,
  },
  {
    id: 'sunny-armchair', name: 'SUNNY — КРЕСЛО', category: 'Chairs', price: 890,
    image: u('1513694203232-719a280e022f'),
    description: 'Компактное кресло для чтения с изогнутым дубовым каркасом и обивкой из хлопка цвета слоновой кости.',
    color: 'Ivory', material: 'Oak', popularity: 78, added: now - 90 * DAY,
  },
  {
    id: 'arco-dining-table', name: 'ARCO — ОБЕДЕННЫЙ СТОЛ', category: 'Tables', price: 2480,
    image: u('1533090481720-856c6e3c1fdc'),
    description: 'Овальный дубовый стол с рифлёным основанием. Честный, тёплый и уверенный предмет для столовой.',
    color: 'Taupe', material: 'Oak', popularity: 70, added: now - 15 * DAY, isNew: true,
  },
  {
    id: 'nomad-desk', name: 'NOMAD — ПИСЬМЕННЫЙ СТОЛ', category: 'Tables', price: 1480,
    image: u('1487017159836-4e23ece2e4cf'),
    description: 'Письменный стол из ореха с двумя скрытыми ящиками и аккуратной системой для кабелей.',
    color: 'Walnut', material: 'Walnut', popularity: 84, added: now - 140 * DAY, isOffice: true,
  },
  {
    id: 'slate-coffee-table', name: 'SLATE — ЖУРНАЛЬНЫЙ СТОЛИК', category: 'Tables', price: 980,
    image: u('1493663284031-b7e3aefcae8e'),
    description: 'Низкий журнальный столик из шлифованного камня с мягкой серой патиной. Основа любой гостиной.',
    color: 'Charcoal', material: 'Stone', popularity: 62, added: now - 10 * DAY, isNew: true,
  },
  {
    id: 'mira-daybed', name: 'MIRA — КУШЕТКА', category: 'Beds', price: 1750,
    image: u('1540518614846-7eded433c457'),
    description: 'Низкая кушетка из льна песочного оттенка с мягкой спинкой — для чтения, отдыха и долгих пауз.',
    color: 'Sand', material: 'Linen', popularity: 76, added: now - 60 * DAY,
  },
  {
    id: 'loft-bed', name: 'LOFT — КРОВАТЬ', category: 'Beds', price: 2890,
    image: u('1567016432779-094069958ea5'),
    description: 'Объёмная кровать с высоким изголовьем в шерсти оттенка тауп, превращающая спальню в тихое убежище.',
    color: 'Taupe', material: 'Wool', popularity: 80, added: now - 100 * DAY,
  },
  {
    id: 'koto-bed', name: 'KOTO — КРОВАТЬ', category: 'Beds', price: 3240,
    image: u('1522771739844-6a9f6d5f14af'),
    description: 'Минималистичная кровать из массива ореха со встроенными прикроватными тумбами. Тепло в каждой детали.',
    color: 'Walnut', material: 'Walnut', popularity: 68, added: now - 6 * DAY, isNew: true,
  },
  {
    id: 'oak-shelf-unit', name: 'OAK — СТЕЛЛАЖ', category: 'Storage', price: 1120,
    image: u('1594620302200-9a762244a156'),
    description: 'Открытый стеллаж из светлого дуба с регулируемыми полками и тонкой латунной перекладиной.',
    color: 'Sand', material: 'Oak', popularity: 64, added: now - 18 * DAY, isOffice: true, isNew: true,
  },
  {
    id: 'halo-pendant', name: 'HALO — ПОДВЕСНОЙ СВЕТИЛЬНИК', category: 'Lighting', price: 390,
    image: u('1507473885765-e6ed057f782c'),
    description: 'Подвесной светильник из глазурованной керамики, который наполняет комнату мягким тёплым светом.',
    color: 'Ivory', material: 'Ceramic', popularity: 86, added: now - 130 * DAY,
  },
  {
    id: 'orbit-floor-lamp', name: 'ORBIT — НАПОЛЬНЫЙ СВЕТИЛЬНИК', category: 'Lighting', price: 520,
    image: u('1513506003901-1e6a229e2d15'),
    description: 'Стройный напольный светильник из матовой стали с льняным абажуром. Мягкий свет и тихое присутствие.',
    color: 'Charcoal', material: 'Steel', popularity: 58, added: now - 9 * DAY, isNew: true,
  },
  {
    id: 'terra-planter', name: 'TERRA — КАШПО', category: 'Accessories', price: 140,
    image: u('1484101403633-562f891dc89a'),
    description: 'Рифлёное керамическое кашпо тёплого песочного оттенка. Наполняет любой угол спокойствием.',
    color: 'Sand', material: 'Ceramic', popularity: 71, added: now - 75 * DAY,
  },
  {
    id: 'breeze-lounge-set', name: 'BREEZE — УЛИЧНЫЙ КОМПЛЕКТ', category: 'Outdoor', price: 1950,
    image: u('1601925260368-ae2f83cf8b7f'),
    description: 'Уличный комплект из натурального ротанга с устойчивыми к погоде и быстро сохнущими подушками.',
    color: 'Ivory', material: 'Rattan', popularity: 60, added: now - 14 * DAY, isNew: true,
  },
]

export const categories: Category[] = ['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Lighting', 'Accessories', 'Outdoor']

export const colors: { name: ColorName; hex: string }[] = [
  { name: 'Ivory', hex: '#f4f2ed' }, { name: 'Sand', hex: '#d7d0c6' },
  { name: 'Taupe', hex: '#a79c90' }, { name: 'Walnut', hex: '#6b4f3a' },
  { name: 'Charcoal', hex: '#242321' },
]

export const materials: string[] = ['Oak', 'Walnut', 'Linen', 'Wool', 'Cotton', 'Steel', 'Stone', 'Ceramic', 'Rattan']

export const featuredIds = ['luma-lounge-chair', 'riva-sofa', 'terra-dining-table', 'nord-sideboard']
export const byId = (id: string): Product | undefined => products.find((p) => p.id === id)
export const MIN_PRICE = Math.min(...products.map((p) => p.price))
export const MAX_PRICE = Math.max(...products.map((p) => p.price))
