import { useEffect, useRef } from 'react'

/** Locks body scroll while `active` is true. */
export function useLockBody(active: boolean): void {
  useEffect(() => {
    if (!active) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [active])
}

/** Calls `onEscape` when the Escape key is pressed while `active`. */
export function useEscape(active: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, onEscape])
}

/** Saves the currently focused element on mount and restores focus when `active` becomes false. */
export function useFocusReturn(active: boolean): void {
  const saved = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (active) {
      saved.current = document.activeElement as HTMLElement | null
    } else if (saved.current) {
      saved.current.focus?.()
      saved.current = null
    }
  }, [active])
}
