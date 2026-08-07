import { useEffect, useState } from 'react'
import { categoryLabel, colorLabel, materialLabel } from '../data/i18n'
import { useEscape, useFocusReturn, useLockBody } from '../lib/hooks'
import { useStore } from '../lib/store'
import { cx, formatPrice } from '../lib/utils'
import { IconClose, IconHeart, IconHeartFilled, IconMinus, IconPlus } from './Icons'
import ProductImage from './ProductImage'

export default function QuickViewModal() {
  const { quickView, closeQuickView, addToCart, toggleWishlist, isWishlisted, toast } =
    useStore()
  const [qty, setQty] = useState(1)
  const open = Boolean(quickView)

  useLockBody(open)
  useEscape(open, closeQuickView)
  useFocusReturn(open)

  useEffect(() => {
    if (open) setQty(1)
  }, [open])

  if (!quickView) return null

  const wishlisted = isWishlisted(quickView.id)

  const onAdd = () => {
    addToCart(quickView.id, qty)
    toast('Товар добавлен в корзину')
    closeQuickView()
  }

  return (
    <div
      className={cx('modal', open && 'is-open')}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeQuickView()
      }}
    >
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={quickView.name}
      >
        <button
          type="button"
          className="modal__close"
          onClick={closeQuickView}
          aria-label="Закрыть"
        >
          <IconClose size={17} />
        </button>

        <div className="modal__media">
          <ProductImage
            src={quickView.image}
            alt={quickView.name}
            eager
            className="modal__img"
          />
        </div>

        <div className="modal__info">
          <span className="label">
            {categoryLabel(quickView.category)} {quickView.isNew && '· Новинка'}
          </span>
          <h3 className="serif modal__name">{quickView.name}</h3>
          <p className="modal__price">{formatPrice(quickView.price)}</p>
          <p className="modal__desc">{quickView.description}</p>

          <div className="modal__meta">
            <span>
              ЦВЕТ<strong>{colorLabel(quickView.color)}</strong>
            </span>
            <span>
              МАТЕРИАЛ<strong>{materialLabel(quickView.material)}</strong>
            </span>
            <span>
              ДОСТАВКА<strong>2–4 недели</strong>
            </span>
          </div>

          <div className="modal__buy">
            <div className="qty" aria-label="Количество">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Уменьшить количество"
              >
                <IconMinus size={13} />
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Увеличить количество"
              >
                <IconPlus size={13} />
              </button>
            </div>
            <button type="button" className="btn btn--solid" onClick={onAdd}>
              В КОРЗИНУ — {formatPrice(quickView.price * qty)}
            </button>
          </div>

          <button
            type="button"
            className={cx('modal__wish', wishlisted && 'is-active')}
            onClick={() => {
              toggleWishlist(quickView.id)
              toast(wishlisted ? 'Товар убран из избранного' : 'Товар сохранён в избранном')
            }}
          >
            {wishlisted ? <IconHeartFilled size={15} /> : <IconHeart size={15} />}
            {wishlisted ? 'В ИЗБРАННОМ' : 'В ИЗБРАННОЕ'}
          </button>
        </div>
      </div>
    </div>
  )
}
