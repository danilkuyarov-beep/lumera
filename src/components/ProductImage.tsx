import { useState } from 'react'
import { FALLBACK_IMG, cx } from '../lib/utils'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

export default function ProductImage({
  src,
  alt,
  className,
  eager,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cx('product-image', loaded && 'is-loaded', className)}>
      {!loaded && <span className="product-image__skeleton" aria-hidden="true" />}
      <img
        src={failed ? FALLBACK_IMG : src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        onError={() => setFailed(true)}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
