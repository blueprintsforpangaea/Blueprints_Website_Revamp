import StatCounter from '../ui/StatCounter.jsx';
import { HEADLINE_STATS } from '../../data/stats.js';

export default function Stats() {
  // Renders headline impact numbers (e.g., $9.07M+, 15+ countries, 10+ chapters)
  return (
    <section className="stats">
      {HEADLINE_STATS.map((stat) => (
        <StatCounter
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
          label={stat.label}
        />
      ))}
    </section>
  );
}
