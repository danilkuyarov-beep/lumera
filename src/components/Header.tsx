import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'
import { useStore } from '../lib/store'
import { scrollToId } from '../lib/utils'
import { cx } from '../lib/utils'
import { IconBag, IconHeart, IconMenu, IconSearch } from './Icons'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const {
    cartCount,
    wishlistCount,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setMenuOpen,
  } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cx('header', scrolled && 'is-scrolled')}>
      <button
        type="button"
        className="header__logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="LUMERA — наверх"
      >
        LUMERA
      </button>

      <nav className="header__nav" aria-label="Основная навигация">
        {navLinks.map((link) => (
          <a
            key={link.label}
            className="header__link"
            href={`#${link.target}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToId(link.target)
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <button
          type="button"
          className="header__action header__action--search"
          onClick={() => setSearchOpen(true)}
        >
          <IconSearch size={15} />
          <span className="header__action--label">ПОИСК</span>
        </button>

        <button
          type="button"
          className="header__action"
          onClick={() => setWishlistOpen(true)}
          aria-label={`Избранное, ${wishlistCount} предметов`}
        >
          <IconHeart size={15} />
          <span className="header__action--label">ИЗБРАННОЕ</span>
          {wishlistCount > 0 && (
            <span className="header__action-count">({wishlistCount})</span>
          )}
        </button>

        <button
          type="button"
          className="header__action"
          onClick={() => setCartOpen(true)}
          aria-label={`Корзина, ${cartCount} предметов`}
        >
          <IconBag size={15} />
          <span className="header__action--label">КОРЗИНА</span>
          <span className="header__action-count">({cartCount})</span>
        </button>

        <button
          type="button"
          className="header__burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <IconMenu size={20} />
        </button>
      </div>
    </header>
  )
}
