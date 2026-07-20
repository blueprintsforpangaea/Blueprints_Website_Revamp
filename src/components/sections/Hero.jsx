import { Link } from 'react-router-dom';
import { HERO_STATS } from '../../data/stats.js';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { useCountUp } from '../../hooks/useCountUp.js';
import heroBoxes from '../../assets/home/hero-boxes.png';

function HeroStat({ format, value, suffix, label }) {
  const { ref, isVisible } = useScrollAnimation();
  const isCurrency = format === 'currency';
  const count = useCountUp(value, {
    decimals: isCurrency ? 2 : 0,
    duration: isCurrency ? 1600 : 1000,
    active: isVisible,
  });

  const display = isCurrency
    ? `$${count.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${Math.round(count)}${suffix ?? ''}`;

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-card__value">{display}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__art">
          <img src={heroBoxes} alt="A shrink-wrapped pallet of medical supplies ready to ship, with a Blueprints for Pangaea flyer attached" />
        </div>
        <div className="hero__content">
          <h1 className="hero__title">Saving Lives One<br />Box at a Time</h1>
          <p className="hero__subtitle">
            We rescue surplus medical supplies from U.S. hospitals and
            redistribute them to clinics and communities that need them most —
            here at home and around the world.
          </p>
          <div className="hero__ctas">
            <Link to="/donate" className="btn btn--primary">Donate Today</Link>
            <Link to="/mission" className="btn btn--secondary">Learn More</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero-stats">
          {HERO_STATS.map((stat) => (
            <HeroStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
