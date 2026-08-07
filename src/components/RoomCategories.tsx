import { rooms } from '../data/content'
import { useStore } from '../lib/store'
import { FALLBACK_IMG } from '../lib/utils'
import { IconArrowRight } from './Icons'
import Reveal from './Reveal'

export default function RoomCategories() {
  const { openShop } = useStore()

  return (
    <section className="rooms" id="rooms" aria-label="Категории комнат">
      <div className="container">
        <Reveal>
          <div className="rooms__grid">
            {rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                className="room-card"
                onClick={() => openShop(room.preset)}
                aria-label={`Открыть каталог: ${room.label}`}
              >
                <span className="room-card__img">
                  <img
                    src={room.image}
                    alt={room.label}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = FALLBACK_IMG
                    }}
                  />
                </span>
                <span className="room-card__veil" aria-hidden="true" />
                <span className="room-card__caption">
                  <span className="room-card__name">{room.label}</span>
                  <span className="room-card__explore">
                    СМОТРЕТЬ <IconArrowRight size={12} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
