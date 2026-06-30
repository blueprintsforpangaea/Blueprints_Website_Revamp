import { useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import { PARTNERSHIPS } from '../../data/partnerships.js';

export default function FeaturedPartnerships() {
  const [index, setIndex] = useState(0);
  const count = PARTNERSHIPS.length;
  const partner = PARTNERSHIPS[index];
  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">Our Partners</span>
          <h2 className="section-title">Featured partnerships</h2>
          <p>The clinics and relief organizations turning our shipments into care on the ground.</p>
        </Reveal>

        <Reveal className="partner-carousel" delay={0.1}>
          <div className="partner-carousel__media" aria-hidden="true">
            <span className="partner-carousel__est-badge">Est. {partner.est}</span>
            <span className="name-art">{partner.name}</span>
          </div>
          <div className="partner-carousel__body">
            <h3 className="partner-carousel__name">{partner.name}</h3>
            <p className="partner-carousel__desc">{partner.description}</p>
            <span className="partner-carousel__tag">{partner.stat}</span>
          </div>
        </Reveal>

        <div className="carousel-controls">
          <button className="carousel-arrow" onClick={() => go(-1)} aria-label="Previous partnership">‹</button>
          <div className="carousel-dots">
            {PARTNERSHIPS.map((p, i) => (
              <button
                key={p.id}
                className={`carousel-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show ${p.name}`}
              />
            ))}
          </div>
          <button className="carousel-arrow" onClick={() => go(1)} aria-label="Next partnership">›</button>
        </div>
      </div>
    </section>
  );
}
