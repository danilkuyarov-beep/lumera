import { inspiration } from '../data/content'
import { FALLBACK_IMG } from '../lib/utils'
import Reveal from './Reveal'

export default function RoomInspiration() {
  return (
    <section className="inspiration" id="inspiration" aria-label="Вдохновение для интерьера">
      <div className="container">
        <div className="inspiration__split">
          <Reveal className="inspiration__panel">
            <span className="label">ВДОХНОВЕНИЕ ДЛЯ ИНТЕРЬЕРА</span>
            <h2 className="serif inspiration__title">
              Настоящие пространства. Настоящее вдохновение.
            </h2>
            <p className="inspiration__desc">
              Каждый предмет LUMERA рождается из света, фактуры и пропорций реальных
              пространств. Посмотрите, как коллекция оживает в интерьере.
            </p>
          </Reveal>

          <Reveal className="inspiration__visual" delay={120}>
            <img
              src={inspiration.image}
              alt={inspiration.alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = FALLBACK_IMG
              }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
