import { useEffect, useRef } from 'react';
import ShipmentMap from '../pangaea/ShipmentMap.jsx';
import ShipmentCard from '../ui/ShipmentCard.jsx';
import { FEATURED_SHIPMENTS } from '../../data/shipments.js';

// The full shipment map, then the featured shipments.
export default function ShipmentMapSection() {
  const scrollRef = useRef(null);

  // On phones the map is wider than the screen and pans sideways;
  // start it on the Americas, where most of the lines begin.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth * 0.12;
  }, []);

  return (
    <section className="tour">
      <div className="container">
        <div className="shipmap-scroll" ref={scrollRef}>
          <ShipmentMap />
        </div>
        <p className="shipmap-hint">Swipe the map sideways, and tap a dot to see what we sent there.</p>
      </div>

      <div className="container tour__list">
        <h2 className="section-title section-title--sm tour__heading">Past shipments</h2>
        <div className="ships">
          {FEATURED_SHIPMENTS.map((s, i) => (
            <ShipmentCard shipment={s} key={s.id} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
