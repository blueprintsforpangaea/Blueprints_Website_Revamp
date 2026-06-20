import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { PRESS_ITEMS } from '../../data/press.js';

function PressCard({ item, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12 });

  return (
    <a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className={`card press-card fade-pop${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      aria-label={`${item.headline} — ${item.outlet}`}
    >
      <div className="card__media press-card__media">
        {item.image ? (
          <img src={item.image} alt={item.outlet} />
        ) : (
          <span className="press-card__outlet-initial" aria-hidden="true">
            {item.outlet.charAt(0)}
          </span>
        )}
        <span className="card__badge">{item.outlet}</span>
      </div>

      <div className="card__content">
        <h3 className="card__title press-card__headline">{item.headline}</h3>
        {item.excerpt && (
          <p className="card__subtitle press-card__excerpt">{item.excerpt}</p>
        )}
        <div className="card__date press-card__footer">
          <span>{item.date}</span>
          <span className="press-card__read">Read →</span>
        </div>
      </div>
    </a>
  );
}

export default function PressCoverage() {
  const eyebrowAnim = useScrollAnimation({ threshold: 0.3 });
  const headingAnim = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="section section--alt">
      <div className="container">
        <p
          ref={eyebrowAnim.ref}
          className={`eyebrow fade-left${eyebrowAnim.isVisible ? ' is-visible' : ''}`}
        >
          In the News
        </p>
        <h2
          ref={headingAnim.ref}
          className={`section-title fade-up${headingAnim.isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: '0.08s' }}
        >
          Press Coverage
        </h2>

        <div className="press-grid">
          {PRESS_ITEMS.map((item, index) => (
            <PressCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
