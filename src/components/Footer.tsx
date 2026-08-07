import { useState } from 'react'
import type { FormEvent } from 'react'
import { footerColumns } from '../data/content'
import { useStore } from '../lib/store'
import { isEmail, scrollToId } from '../lib/utils'
import { IconArrowRight, IconInstagram, IconPinterest, IconTelegram } from './Icons'

export default function Footer() {
  const { openShop, toast } = useStore()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleFooterLink = (label: string, action: string) => {
    if (action === 'shop') return openShop(null)
    if (action === 'shop-new') return openShop(null, '', 'newest')
    if (action === 'shop-pop') return openShop(null, '', 'popular')
    if (action === 'shop-sale') return openShop(null, '', 'popular', 'sale')
    if (action === 'shop-office') return openShop(null, '', 'popular', 'office')
    if (action.startsWith('cat:')) {
      const cat = action.slice(4)
      return openShop(cat as Parameters<typeof openShop>[0], '')
    }
    if (action.startsWith('#')) return scrollToId(action.slice(1))
    toast(`${label} — скоро появится`)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!isEmail(email)) {
      setError('Введите корректный email-адрес')
      return
    }
    setError('')
    setDone(true)
    toast('Добро пожаловать в LUMERA — подписка оформлена')
    setEmail('')
    window.setTimeout(() => setDone(false), 4000)
  }

  return (
    <footer className="footer" id="about">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__brand-name">LUMERA</p>
            <p className="footer__brand-text">
              LUMERA создаёт вневременные предметы для современной жизни. Качество, дизайн и
              комфорт — наше обещание вам.
            </p>
            <div className="footer__socials">
              <a
                className="footer__social"
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LUMERA в Instagram"
              >
                <IconInstagram size={17} />
              </a>
              <a
                className="footer__social"
                href="https://www.pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LUMERA в Pinterest"
              >
                <IconPinterest size={17} />
              </a>
              <a
                className="footer__social"
                href="https://t.me/lumera"
                target="_blank"
                rel="noreferrer"
                aria-label="LUMERA в Telegram"
              >
                <IconTelegram size={17} />
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="footer__col-title">{col.title}</h3>
              <ul className="footer__col-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      className="footer__link"
                      onClick={() => handleFooterLink(link.label, link.action)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__newsletter" id="contact">
          <div>
            <h3 className="footer__newsletter-title">ПОДПИШИТЕСЬ</h3>
            <p className="footer__newsletter-text">
              Узнавайте первыми о новых коллекциях и специальных предложениях.
            </p>
          </div>
          <div>
            <form className="footer__form" onSubmit={submit} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Ваш email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                aria-invalid={Boolean(error)}
              />
              <button type="submit" aria-label="Подписаться">
                <IconArrowRight size={18} />
              </button>
            </form>
            {error ? (
              <p className="footer__form-error" role="alert">
                {error}
              </p>
            ) : (
              done && (
                <p className="footer__form-error" role="status">
                  ✓ Вы подписались — проверьте почту
                </p>
              )
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 LUMERA. Все права защищены.</p>
          <div className="footer__legal">
            <button type="button" onClick={() => toast('Политика конфиденциальности — скоро появится')}>
              Политика конфиденциальности
            </button>
            <button
              type="button"
              onClick={() => toast('Условия использования — скоро появятся')}
            >
              Условия использования
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
