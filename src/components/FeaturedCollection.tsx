import { featuredIds, byId } from '../data/products'
import { useStore } from '../lib/store'
import { IconArrowRight } from './Icons'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function FeaturedCollection() {
  const { openShop } = useStore()
  const items = featuredIds
    .map((id) => byId(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <section className="featured" id="collections" aria-label="Избранная коллекция">
      <div className="container">
        <div className="featured__grid">
          <Reveal className="featured__aside">
            <span className="label">ИЗБРАННАЯ КОЛЛЕКЦИЯ</span>
            <h2 className="serif featured__title">
              Простота — высшая форма совершенства.
            </h2>
            <button
              type="button"
              className="link-arrow"
              onClick={() => openShop(null)}
            >
              СМОТРЕТЬ ВСЕ ТОВАРЫ <IconArrowRight size={14} />
            </button>
          </Reveal>

          <div className="featured__items">
            {items.map((product, i) => (
              <Reveal key={product.id} delay={i * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
