import { useStore } from '../lib/store'
import { IconCheck } from './Icons'

export default function Toasts() {
  const { toasts } = useStore()

  if (toasts.length === 0) return null

  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <IconCheck size={14} />
          {t.message}
        </div>
      ))}
    </div>
  )
}
