import Reveal from '../ui/Reveal.jsx';
import clinicPhoto from '../../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';
import { PRESS_ITEMS } from '../../data/press.js';

// A real, sourced quote — not a composed one. Attribution and link
// come from the press record so they stay verifiable.
const SOURCE = PRESS_ITEMS.find((p) => p.id === 'msu-today-sandler');

export default function Testimonial() {
  return (
    <section className="section section--tint">
      <div className="container testimonial-split">
        <Reveal className="testimonial-split__media">
          <img
            src={clinicPhoto}
            alt="Blueprints volunteers handling boxes of recovered medical supplies"
            loading="lazy"
          />
          <span className="testimonial-split__caption">
            Supplies staged for delivery to a partner clinic
          </span>
        </Reveal>

        <Reveal className="testimonial-split__body" delay={0.12}>
          <div className="testimonial__mark" aria-hidden="true">&ldquo;</div>
          <blockquote className="testimonial__quote">
            Originally, I wanted to join a student organization because I felt it was a simple way
            to make a difference.
          </blockquote>
          <div className="testimonial__author">
            <div className="testimonial__avatar" aria-hidden="true">MS</div>
            <div>
              <div className="testimonial__name">Max Sandler</div>
              <div className="testimonial__role">
                Michigan State chapter · via{' '}
                <a href={SOURCE.url} target="_blank" rel="noreferrer">MSUToday</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
