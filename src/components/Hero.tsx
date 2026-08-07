import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { heroSlides } from '../data/content'
import { FALLBACK_IMG, cx, scrollToId } from '../lib/utils'

const SLIDE_MS = 6000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)
  const paused = useRef(false)
  const pointerStart = useRef<number | null>(null)
  const reduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const next = useCallback(
    () => setIndex((i) => (i + 1) % heroSlides.length),
    [],
  )
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length),
    [],
  )

  const schedule = useCallback(() => {
    if (reduced.current) return
    if (timer.current) window.clearTimeout(timer.current)
    if (paused.current) return
    timer.current = window.setTimeout(next, SLIDE_MS)
  }, [next])

  useEffect(() => {
    schedule()
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [index, schedule])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const anyOverlayOpen = document.querySelector(
        '.overlay.is-open, .modal.is-open, .mobile-menu.is-open, .search-overlay.is-open',
      )
      if (anyOverlayOpen) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerStart.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(distance) < 48) return
    if (distance < 0) next()
    else prev()
  }

  return (
    <section
      className="hero"
      aria-label="Презентация коллекции LUMERA"
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
        schedule()
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStart.current = null
      }}
    >
      <div className="hero__slides">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.image}
            className={cx('hero__slide', i === index && 'is-active')}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt={i === index ? slide.alt : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = FALLBACK_IMG
              }}
            />
          </div>
        ))}
      </div>

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <span className="label label--light">КОЛЛЕКЦИЯ LUMERA</span>
        <h1 className="hero__title">Создано для жизни, которую вы создаёте.</h1>
        <p className="hero__sub">
          Вневременная мебель, созданная с точностью, вниманием и страстью.
        </p>
        <button
          type="button"
          className="btn btn--light hero__cta"
          onClick={() => scrollToId('collections')}
        >
          СМОТРЕТЬ КОЛЛЕКЦИЮ
        </button>
      </div>

      <div className="hero__film" aria-label="Навигация по сценам">
        <div className="hero__film-track" role="tablist" aria-label="Сцены hero">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              className={cx('hero__film-segment', i === index && 'is-active')}
              role="tab"
              aria-selected={i === index}
              aria-label={`Сцена ${i + 1}: ${slide.title}`}
              onClick={() => setIndex(i)}
            >
              <span className="hero__film-segment-number">0{i + 1}</span>
              <span className="hero__film-segment-fill" />
            </button>
          ))}
        </div>
      </div>

    </section>
  )
}
