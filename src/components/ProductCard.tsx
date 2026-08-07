import type { Product } from '../data/products'
import { useStore } from '../lib/store'
import { categoryLabel, materialLabel } from '../data/i18n'
import { cx, formatPrice } from '../lib/utils'
import { IconArrowRight, IconHeart, IconHeartFilled } from './Icons'
import ProductImage from './ProductImage'

export default function ProductCard({ product }: { product: Product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    openQuickView,
    toast,
  } = useStore()
  const wishlisted = isWishlisted(product.id)

  const onWish = () => {
    toggleWishlist(product.id)
    toast(wishlisted ? 'Товар убран из избранного' : 'Товар сохранён в избранном')
  }

  const onAdd = () => {
    addToCart(product.id)
    toast('Товар добавлен в корзину')
  }

  return (
    <article className="product-card">
      <div className="product-card__media">
        <button
          type="button"
          className="product-card__open"
          onClick={() => openQuickView(product)}
          aria-label={`Быстрый просмотр: ${product.name}`}
        />
        <ProductImage src={product.image} alt={product.name} />
        {product.isNew && <span className="product-card__badge">НОВИНКА</span>}

        <button
          type="button"
          className={cx('product-card__wish', wishlisted && 'is-active')}
          onClick={onWish}
          aria-label={
            wishlisted ? `Убрать из избранного: ${product.name}` : `В избранное: ${product.name}`
          }
          aria-pressed={wishlisted}
        >
          {wishlisted ? <IconHeartFilled size={16} /> : <IconHeart size={16} />}
        </button>

      </div>

      <div className="product-card__info">
        <div className="product-card__details">
          <button
            type="button"
            className="product-card__name"
            onClick={() => openQuickView(product)}
          >
            {product.name}
          </button>
          <span className="product-card__meta">
            {materialLabel(product.material)} · {categoryLabel(product.category)}
          </span>
        </div>
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className="product-card__add"
            onClick={onAdd}
            aria-label={`Добавить в корзину: ${product.name}`}
          >
            В КОРЗИНУ <IconArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  )
}
