import { byId } from '../data/products'
import { useEscape, useFocusReturn, useLockBody } from '../lib/hooks'
import { useStore } from '../lib/store'
import { FALLBACK_IMG, cx, formatPrice } from '../lib/utils'
import { IconClose, IconMinus, IconPlus, IconTrash } from './Icons'

const FREE_SHIPPING_AT = 250
const SHIPPING = 49

export default function CartDrawer() {
  const {
    cart,
    setCartOpen,
    cartOpen,
    setQty,
    removeFromCart,
    toast,
    openShop,
  } = useStore()

  useLockBody(cartOpen)
  useEscape(cartOpen, () => setCartOpen(false))
  useFocusReturn(cartOpen)

  const items = cart
    .map((i) => ({ ...i, product: byId(i.id) }))
    .filter((i) => i.product)

  const subtotal = items.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.qty, 0)
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING
  const total = subtotal + shipping
  const remaining = FREE_SHIPPING_AT - subtotal

  return (
    <>
      <div
        className={cx('overlay', cartOpen && 'is-open')}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={cx('drawer', cartOpen && 'is-open')}
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
      >
        <div className="drawer__head">
          <div>
            <h2 className="drawer__title">КОРЗИНА</h2>
            <span className="drawer__count">
              {items.length} {items.length === 1 ? 'товар' : 'товаров'}
            </span>
          </div>
          <button
            type="button"
            className="drawer__close"
            onClick={() => setCartOpen(false)}
            aria-label="Закрыть корзину"
          >
            <IconClose size={18} />
          </button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="drawer__empty">
              <h3 className="drawer__empty-title">Ваша корзина пуста</h3>
              <p className="drawer__empty-text">
                Откройте предметы, созданные на долгие годы и для вашей жизни.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setCartOpen(false)
                  openShop(null)
                }}
              >
                СМОТРЕТЬ КОЛЛЕКЦИЮ
              </button>
            </div>
          ) : (
            items.map(({ product, qty, id }) => (
              <div className="cart-item" key={id}>
                <div className="cart-item__media">
                  <img
                    src={product!.image}
                    alt={product!.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = FALLBACK_IMG
                    }}
                  />
                </div>
                <div>
                  <p className="cart-item__name">{product!.name}</p>
                  <p className="cart-item__price">{formatPrice(product!.price)}</p>
                </div>
                <div className="cart-item__controls">
                  <div className="qty" aria-label={`Количество: ${product!.name}`}>
                    <button
                      type="button"
                      onClick={() => setQty(id, qty - 1)}
                      aria-label="Уменьшить количество"
                    >
                      <IconMinus size={13} />
                    </button>
                    <span aria-live="polite">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(id, qty + 1)}
                      aria-label="Увеличить количество"
                    >
                      <IconPlus size={13} />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => {
                      removeFromCart(id)
                      toast('Товар удалён из корзины')
                    }}
                    aria-label={`Удалить: ${product!.name}`}
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="cart-sum">
              <span>Подытог</span>
              <span className="cart-sum__value">{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-sum">
              <span>Доставка</span>
              <span className="cart-sum__value">
                {shipping === 0 ? 'Бесплатно' : formatPrice(shipping)}
              </span>
            </div>
            <div className="cart-sum cart-sum--total">
              <span>Итого</span>
              <span className="cart-sum__value">{formatPrice(total)}</span>
            </div>
            <p className="cart-note">
              {shipping === 0
                ? 'Бесплатная доставка применена.'
                : `Бесплатная доставка при заказе от ${formatPrice(FREE_SHIPPING_AT)} — осталось ${formatPrice(remaining)}.`}
            </p>
            <div className="drawer__actions">
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => toast('Оформление заказа недоступно в демо — корзина сохранена локально')}
              >
                ОФОРМИТЬ ЗАКАЗ
              </button>
              <button
                type="button"
                className="drawer__secondary"
                onClick={() => setCartOpen(false)}
              >
                ПРОДОЛЖИТЬ ПОКУПКИ
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
