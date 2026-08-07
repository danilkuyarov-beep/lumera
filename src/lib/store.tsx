import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Category, Product } from '../data/products'
import { scrollToId } from './utils'

export type SortKey = 'popular' | 'newest' | 'price-asc' | 'price-desc'
export type ShopPreset = 'sale' | 'office'

export interface CartItem {
  id: string
  qty: number
}

export interface Toast {
  id: number
  message: string
}

export interface ShopIntent {
  category: Category | null
  search: string
  sort: SortKey | null
  preset: ShopPreset | null
  ts: number
}

interface StoreValue {
  cart: CartItem[]
  wishlist: string[]
  cartCount: number
  cartQtyOf: (id: string) => number
  addToCart: (id: string, qty?: number) => void
  removeFromCart: (id: string) => void
  setQty: (id: string, qty: number) => void
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  wishlistCount: number
  toasts: Toast[]
  toast: (message: string) => void
  quickView: Product | null
  openQuickView: (p: Product) => void
  closeQuickView: () => void
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  wishlistOpen: boolean
  setWishlistOpen: (v: boolean) => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  shopIntent: ShopIntent | null
  openShop: (
    category?: Category | null,
    search?: string,
    sort?: SortKey | null,
    preset?: ShopPreset | null,
  ) => void
}

const StoreContext = createContext<StoreValue | null>(null)

const CART_KEY = 'lumera-cart'
const WISH_KEY = 'lumera-wishlist'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load<CartItem[]>(CART_KEY, []))
  const [wishlist, setWishlist] = useState<string[]>(() => load<string[]>(WISH_KEY, []))
  const [toasts, setToasts] = useState<Toast[]>([])
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopIntent, setShopIntent] = useState<ShopIntent | null>(null)
  const toastId = useRef(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch {
      /* storage unavailable — keep state in memory */
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
    } catch {
      /* noop */
    }
  }, [wishlist])

  useEffect(() => {
    const activeTimers = timers.current
    return () => activeTimers.forEach((t) => window.clearTimeout(t))
  }, [])

  const toast = useCallback((message: string) => {
    const id = ++toastId.current
    setToasts((prev) => [...prev.slice(-2), { id, message }])
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2600)
    timers.current.push(timer)
  }, [])

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i,
        )
      }
      return [...prev, { id, qty }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i)),
    )
  }, [])

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((prev) => {
        const has = prev.includes(id)
        return has ? prev.filter((w) => w !== id) : [...prev, id]
      })
    },
    [],
  )

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const openQuickView = useCallback((p: Product) => {
    setQuickView(p)
  }, [])

  const closeQuickView = useCallback(() => setQuickView(null), [])

  const openShop = useCallback(
    (
      category: Category | null = null,
      search = '',
      sort: SortKey | null = null,
      preset: ShopPreset | null = null,
    ) => {
      setShopIntent({ category, search, sort, preset, ts: Date.now() })
      scrollToId('shop')
    },
    [],
  )

  const value = useMemo<StoreValue>(() => {
    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
    return {
      cart,
      wishlist,
      cartCount,
      cartQtyOf: (id: string) => cart.find((i) => i.id === id)?.qty ?? 0,
      addToCart,
      removeFromCart,
      setQty,
      toggleWishlist,
      isWishlisted,
      wishlistCount: wishlist.length,
      toasts,
      toast,
      quickView,
      openQuickView,
      closeQuickView,
      cartOpen,
      setCartOpen,
      wishlistOpen,
      setWishlistOpen,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      shopIntent,
      openShop,
    }
  }, [
    cart,
    wishlist,
    toasts,
    quickView,
    cartOpen,
    wishlistOpen,
    searchOpen,
    menuOpen,
    shopIntent,
    addToCart,
    removeFromCart,
    setQty,
    toggleWishlist,
    isWishlisted,
    toast,
    openQuickView,
    closeQuickView,
    openShop,
  ])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
