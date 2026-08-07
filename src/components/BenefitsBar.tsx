import { benefits } from '../data/content'
import {
  IconGlobe,
  IconHand,
  IconLeaf,
  IconShield,
} from './Icons'
import Reveal from './Reveal'

const ICONS = {
  leaf: IconLeaf,
  hand: IconHand,
  shield: IconShield,
  globe: IconGlobe,
}

export default function BenefitsBar() {
  return (
    <section className="benefits" aria-label="Преимущества">
      <div className="container">
        <div className="benefits__grid">
          {benefits.map((b, i) => {
            const Icon = ICONS[b.icon]
            return (
              <Reveal key={b.title} delay={i * 100}>
                <div className="benefit">
                  <span className="benefit__icon">
                    <Icon size={30} />
                  </span>
                  <h3 className="benefit__title">{b.title}</h3>
                  <p className="benefit__text">{b.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
