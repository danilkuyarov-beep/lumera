import { useEffect, useMemo, useState } from 'react'
import type { Category, ColorName, Product } from '../data/products'
import { MAX_PRICE, MIN_PRICE, categories, colors, materials, products } from '../data/products'
import { categoryLabel, colorLabel, materialLabel, PRESET_LABELS } from '../data/i18n'
import { useStore } from '../lib/store'
import type { ShopPreset, SortKey } from '../lib/store'
import { cx, formatPrice } from '../lib/utils'
import { IconChevronDown, IconClose, IconSearch, IconSlider } from './Icons'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'Рекомендуемые' },
  { value: 'newest', label: 'Сначала новые' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
]

const COLOR_HEX: Record<ColorName, string> = {
  Ivory: '#f4f2ed', Sand: '#d7d0c6', Taupe: '#a79c90', Walnut: '#6b4f3a', Charcoal: '#242321',
}

function PriceRange({ value, onChange }: { value: [number, number]; onChange: (v: [number, number]) => void }) {
  const loPct = ((value[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  const hiPct = ((value[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  return (
    <div>
      <div className="prange">
        <div className="prange__track" aria-hidden="true" />
        <div className="prange__fill" aria-hidden="true" style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }} />
        <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={50} value={value[0]} aria-label="Минимальная цена" onChange={(e) => onChange([Math.min(+e.target.value, value[1] - 50), value[1]])} />
        <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={50} value={value[1]} aria-label="Максимальная цена" onChange={(e) => onChange([value[0], Math.max(+e.target.value, value[0] + 50)])} />
      </div>
      <div className="prange__labels"><span>{formatPrice(value[0])}</span><span>{formatPrice(value[1])}</span></div>
    </div>
  )
}

export default function Shop() {
  const { shopIntent } = useStore()
  const [preset, setPreset] = useState<ShopPreset | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [price, setPrice] = useState<[number, number]>([MIN_PRICE, MAX_PRICE])
  const [selColors, setSelColors] = useState<ColorName[]>([])
  const [selMats, setSelMats] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    if (!shopIntent) return
    setPreset(shopIntent.preset); setCategory(shopIntent.category); setSearch(shopIntent.search)
    if (shopIntent.sort) setSort(shopIntent.sort)
  }, [shopIntent])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = products.filter((p: Product) => {
      if (category && p.category !== category) return false
      if (preset === 'sale' && !p.isSale) return false
      if (preset === 'office' && !p.isOffice) return false
      if (p.price < price[0] || p.price > price[1]) return false
      if (selColors.length && !selColors.includes(p.color)) return false
      if (selMats.length && !selMats.includes(p.material)) return false
      const searchable = `${p.name} ${p.category} ${categoryLabel(p.category)} ${p.material} ${materialLabel(p.material)} ${p.color} ${colorLabel(p.color)}`.toLowerCase()
      if (q && !searchable.includes(q)) return false
      return true
    })
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'newest': return [...list].sort((a, b) => b.added - a.added)
      default: return [...list].sort((a, b) => b.popularity - a.popularity)
    }
  }, [category, preset, price, selColors, selMats, search, sort])

  const reset = () => { setPreset(null); setCategory(null); setPrice([MIN_PRICE, MAX_PRICE]); setSelColors([]); setSelMats([]); setSearch(''); setSort('popular') }
  const toggleColor = (c: ColorName) => setSelColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])
  const toggleMat = (m: string) => setSelMats((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m])
  const priceActive = price[0] > MIN_PRICE || price[1] < MAX_PRICE
  const activeCount = (preset ? 1 : 0) + (category ? 1 : 0) + selColors.length + selMats.length + (priceActive ? 1 : 0) + (search ? 1 : 0)
  const catCount = (c: Category | null) => products.filter((p) => (c ? p.category === c : true)).length

  return (
    <section className="shop" id="shop" aria-label="Каталог">
      <div className="container">
        <Reveal>
          <div className="shop__head">
            <div><span className="label">КАТАЛОГ</span><h2 className="serif shop__title">Коллекция</h2></div>
            <div className="shop__head-right"><span className="shop__count">{filtered.length} из {products.length}</span><div className="shop__sort"><select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Сортировка">{SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select><IconChevronDown size={14} /></div></div>
          </div>
        </Reveal>

        <button type="button" className="shop__toggle" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen}><IconSlider size={15} /> ФИЛЬТРЫ {activeCount > 0 && `(${activeCount})`}</button>

        <div className="shop__layout">
          <aside className={cx('shop__filters', filtersOpen && 'is-open')}>
            <div className="filter-group"><h3 className="filter-group__title">КАТЕГОРИЯ</h3><div className="filter-cats"><button type="button" className={cx('filter-cats__item', !category && 'is-active')} onClick={() => setCategory(null)}>Все <span className="filter-cats__count">{catCount(null)}</span></button>{categories.map((c) => <button key={c} type="button" className={cx('filter-cats__item', category === c && 'is-active')} onClick={() => setCategory(category === c ? null : c)}>{categoryLabel(c)} <span className="filter-cats__count">{catCount(c)}</span></button>)}</div></div>
            <div className="filter-group"><h3 className="filter-group__title">ЦЕНА</h3><PriceRange value={price} onChange={setPrice} /></div>
            <div className="filter-group"><h3 className="filter-group__title">ЦВЕТ</h3><div className="filter-colors">{colors.map((c) => <button key={c.name} type="button" className={cx('filter-colors__item', selColors.includes(c.name) && 'is-active')} onClick={() => toggleColor(c.name)} aria-pressed={selColors.includes(c.name)}><span className="filter-colors__dot" style={{ background: COLOR_HEX[c.name] }} aria-hidden="true" />{colorLabel(c.name)}</button>)}</div></div>
            <div className="filter-group"><h3 className="filter-group__title">МАТЕРИАЛ</h3><div className="filter-mats">{materials.map((m) => <button key={m} type="button" className={cx('filter-mats__item', selMats.includes(m) && 'is-active')} onClick={() => toggleMat(m)} aria-pressed={selMats.includes(m)}><span className="filter-mats__box" aria-hidden="true">{selMats.includes(m) && '✓'}</span>{materialLabel(m)}</button>)}</div></div>
            {activeCount > 0 && <button type="button" className="filter-clear" onClick={reset}>ОЧИСТИТЬ ВСЕ</button>}
          </aside>

          <div>
            <div className="shop__search"><div className="shop__search-box"><IconSearch size={15} /><input type="search" placeholder="Поиск по названию, категории или материалу…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Поиск по каталогу" />{search && <button type="button" onClick={() => setSearch('')} aria-label="Очистить поиск"><IconClose size={14} /></button>}</div></div>
            {(activeCount > 0 || search) && <div className="shop__chips">
              {preset && <button className="shop__chip" onClick={() => setPreset(null)}>{PRESET_LABELS[preset]} <IconClose size={11} /></button>}
              {category && <button className="shop__chip" onClick={() => setCategory(null)}>{categoryLabel(category)} <IconClose size={11} /></button>}
              {priceActive && <button className="shop__chip" onClick={() => setPrice([MIN_PRICE, MAX_PRICE])}>{formatPrice(price[0])} – {formatPrice(price[1])} <IconClose size={11} /></button>}
              {selColors.map((c) => <button key={c} className="shop__chip" onClick={() => toggleColor(c)}>{colorLabel(c)} <IconClose size={11} /></button>)}
              {selMats.map((m) => <button key={m} className="shop__chip" onClick={() => toggleMat(m)}>{materialLabel(m)} <IconClose size={11} /></button>)}
              {search && <button className="shop__chip" onClick={() => setSearch('')}>«{search}» <IconClose size={11} /></button>}
            </div>}

            {filtered.length > 0 ? <div className="shop__grid">{filtered.map((p, i) => <Reveal key={p.id} delay={Math.min(i, 6) * 24}><ProductCard product={p} /></Reveal>)}</div> : <div className="shop__empty"><h3 className="serif shop__empty-title">Ничего не найдено</h3><p className="shop__empty-text">По выбранным фильтрам ничего не найдено. Попробуйте расширить диапазон цены или убрать часть параметров.</p><button type="button" className="btn" onClick={reset}>СБРОСИТЬ ФИЛЬТРЫ</button></div>}
          </div>
        </div>
      </div>
    </section>
  )
}
