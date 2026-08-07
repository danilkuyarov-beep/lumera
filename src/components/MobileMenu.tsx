import { navLinks } from '../data/content'
import { useEscape, useLockBody } from '../lib/hooks'
import { useStore } from '../lib/store'
import { cx, scrollToId } from '../lib/utils'
import { IconBag, IconClose, IconHeart, IconSearch } from './Icons'

export default function MobileMenu() {
  const { menuOpen, setMenuOpen, setSearchOpen, setCartOpen, setWishlistOpen } =
    useStore()

  useLockBody(menuOpen)
  useEscape(menuOpen, () => setMenuOpen(false))

  const go = (target: string) => {
    setMenuOpen(false)
    // wait for the overlay to release the body lock before scrolling
    window.setTimeout(() => scrollToId(target), 60)
  }

  return (
    <div
      className={cx('mobile-menu', menuOpen && 'is-open')}
      aria-hidden={!menuOpen}
      inert={!menuOpen}
    >
      <nav aria-label="Мобильная навигация">
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            className="mobile-menu__link"
            href={`#${link.target}`}
            style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
            onClick={(e) => {
              e.preventDefault()
              go(link.target)
            }}
          >
            {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
          </a>
        ))}
      </nav>

      <div className="mobile-menu__footer">
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false)
            setSearchOpen(true)
          }}
        >
          <IconSearch size={14} /> ПОИСК
        </button>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false)
            setWishlistOpen(true)
          }}
        >
          <IconHeart size={14} /> ИЗБРАННОЕ
        </button>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false)
            setCartOpen(true)
          }}
        >
          <IconBag size={14} /> КОРЗИНА
        </button>
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">
          <IconClose size={14} /> ЗАКРЫТЬ
        </button>
      </div>
    </div>
  )
}
