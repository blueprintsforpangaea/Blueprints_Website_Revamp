import { useState } from 'react';
import { PARTNERSHIPS } from '../../data/partnerships.js';

export default function FeaturedPartnerships() {
  const [index, setIndex] = useState(0);
  const count = PARTNERSHIPS.length;
  const partner = PARTNERSHIPS[index];

  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="section section--alt">
      <div className="container">
        <p className="eyebrow">Our Partners</p>
        <h2 className="section-title">Featured Partnerships</h2>

        <div className="partner-carousel">
          <div className="partner-carousel__media" aria-hidden="true">
            {partner.name}
          </div>
          <div className="partner-carousel__body">
            <p className="partner-carousel__est">Est. {partner.est}</p>
            <h3 className="partner-carousel__name">{partner.name}</h3>
            <p className="partner-carousel__desc">{partner.description}</p>
            <span className="partner-carousel__tag">{partner.stat}</span>
          </div>

          <button
            className="carousel-arrow carousel-arrow--prev"
            onClick={() => go(-1)}
            aria-label="Previous partnership"
          >
            ‹
          </button>
          <button
            className="carousel-arrow carousel-arrow--next"
            onClick={() => go(1)}
            aria-label="Next partnership"
          >
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {PARTNERSHIPS.map((p, i) => (
            <button
              key={p.id}
              className={`carousel-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to ${p.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
