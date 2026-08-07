import { byId } from '../data/products'
import { useEscape, useFocusReturn, useLockBody } from '../lib/hooks'
import { useStore } from '../lib/store'
import { FALLBACK_IMG, cx, formatPrice } from '../lib/utils'
import { IconClose, IconHeart } from './Icons'

export default function WishlistDrawer() {
  const {
    wishlistOpen,
    setWishlistOpen,
    wishlist,
    toggleWishlist,
    openQuickView,
    openShop,
  } = useStore()

  useLockBody(wishlistOpen)
  useEscape(wishlistOpen, () => setWishlistOpen(false))
  useFocusReturn(wishlistOpen)

  const items = wishlist
    .map((id) => byId(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <>
      <div
        className={cx('overlay', wishlistOpen && 'is-open')}
        onClick={() => setWishlistOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={cx('drawer', wishlistOpen && 'is-open')}
        role="dialog"
        aria-modal="true"
        aria-label="Избранное"
        aria-hidden={!wishlistOpen}
        inert={!wishlistOpen}
      >
        <div className="drawer__head">
          <div>
            <h2 className="drawer__title">ИЗБРАННОЕ</h2>
            <span className="drawer__count">
              {items.length} {items.length === 1 ? 'товар' : 'товаров'}
            </span>
          </div>
          <button
            type="button"
            className="drawer__close"
            onClick={() => setWishlistOpen(false)}
            aria-label="Закрыть избранное"
          >
            <IconClose size={18} />
          </button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="drawer__empty">
              <IconHeart size={34} />
              <h3 className="drawer__empty-title">В избранном пока пусто</h3>
              <p className="drawer__empty-text">
                Нажмите на сердце у любого предмета, чтобы сохранить его здесь.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setWishlistOpen(false)
                  openShop(null)
                }}
              >
                СМОТРЕТЬ КОЛЛЕКЦИЮ
              </button>
            </div>
          ) : (
            items.map((p) => (
              <div className="wish-item" key={p.id}>
                <div className="wish-item__media">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = FALLBACK_IMG
                    }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="wish-item__name"
                    onClick={() => openQuickView(p)}
                  >
                    {p.name}
                  </button>
                  <p className="wish-item__price">{formatPrice(p.price)}</p>
                </div>
                <div className="wish-item__actions">
                  <button
                    type="button"
                    className="wish-item__view"
                    onClick={() => openQuickView(p)}
                  >
                    СМОТРЕТЬ
                  </button>
                  <button
                    type="button"
                    className="wish-item__remove"
                    onClick={() => toggleWishlist(p.id)}
                    aria-label={`Убрать из избранного: ${p.name}`}
                  >
                    <IconClose size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
