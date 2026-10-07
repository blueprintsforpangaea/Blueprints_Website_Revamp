import ShipmentMap from '../pangaea/ShipmentMap.jsx';
import ShipmentCard from '../ui/ShipmentCard.jsx';
import { FEATURED_SHIPMENTS } from '../../data/shipments.js';
import { DESTINATIONS } from '../../data/destinations.js';

const COUNTRIES = [
  ...new Set(DESTINATIONS.filter((d) => d.region !== 'United States').map((d) => d.country)),
];

// The full shipment map, then six featured past shipments in a grid.
export default function ShipmentMapSection() {
  return (
    <section className="tour">
      <div className="container">
        <ShipmentMap />
      </div>

      <div className="container tour__list">
        <h2 className="section-title section-title--sm tour__heading">Some of our past shipments</h2>
        <div className="ships">
          {FEATURED_SHIPMENTS.map((s, i) => (
            <ShipmentCard shipment={s} key={s.id} delay={(i % 3) * 0.06} />
          ))}
        </div>

        <p className="tour__countries">
          Outside the U.S., our shipments have included {COUNTRIES.join(', ')}.
        </p>
      </div>
    </section>
  );
}
