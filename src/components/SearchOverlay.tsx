import { useEffect, useMemo, useRef, useState } from 'react'
import { products } from '../data/products'
import { categoryLabel, colorLabel, materialLabel } from '../data/i18n'
import { useEscape, useFocusReturn, useLockBody } from '../lib/hooks'
import { useStore } from '../lib/store'
import { FALLBACK_IMG, cx, formatPrice } from '../lib/utils'
import { IconArrowRight, IconClose, IconSearch } from './Icons'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, openQuickView, openShop } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useLockBody(searchOpen)
  useEscape(searchOpen, () => {
    setSearchOpen(false)
    setQuery('')
  })
  useFocusReturn(searchOpen)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      window.setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [searchOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter((p) =>
        `${p.name} ${p.category} ${categoryLabel(p.category)} ${p.material} ${materialLabel(p.material)} ${p.color} ${colorLabel(p.color)}`.toLowerCase().includes(q),
      )
      .slice(0, 8)
  }, [query])

  const close = () => setSearchOpen(false)

  const viewAll = () => {
    close()
    openShop(null, query.trim())
  }

  return (
    <div
      className={cx('search-overlay', searchOpen && 'is-open')}
      aria-hidden={!searchOpen}
      inert={!searchOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Поиск">
        <div className="search-panel__input-wrap">
          <IconSearch size={18} />
          <input
            ref={inputRef}
            className="search-panel__input"
            type="search"
            placeholder="Поиск по товарам, категориям и материалам…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Поиск по магазину"
          />
          <button
            type="button"
            className="search-panel__close"
            onClick={close}
            aria-label="Закрыть поиск"
          >
            <IconClose size={18} />
          </button>
        </div>

        <div className="search-panel__results">
          {query.trim() === '' ? (
            <div className="search-panel__empty">
              <strong>Что вы ищете?</strong>
              Диваны, кресла, столы, свет — или просто нужное настроение.
            </div>
          ) : results.length === 0 ? (
            <div className="search-panel__empty">
              <strong>По запросу «{query.trim()}» ничего не найдено</strong>
              Попробуйте другое название или категорию.
            </div>
          ) : (
            results.map((p) => (
              <button
                key={p.id}
                type="button"
                className="search-result"
                onClick={() => {
                  close()
                  openQuickView(p)
                }}
              >
                <span className="search-result__thumb">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = FALLBACK_IMG
                    }}
                  />
                </span>
                <span>
                  <span className="search-result__name">{p.name}</span>
                  <span className="search-result__meta">
                    {categoryLabel(p.category)} · {materialLabel(p.material)}
                  </span>
                </span>
                <span className="search-result__price">{formatPrice(p.price)}</span>
              </button>
            ))
          )}
        </div>

        {query.trim() !== '' && results.length > 0 && (
          <div className="search-panel__footer">
            <button type="button" className="link-arrow" onClick={viewAll}>
              ПОКАЗАТЬ ВСЕ РЕЗУЛЬТАТЫ <IconArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
