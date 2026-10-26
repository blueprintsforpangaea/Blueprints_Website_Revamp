import { useEffect, useRef, useState } from 'react';
import ShipmentMap from '../pangaea/ShipmentMap.jsx';
import ShipmentCard from '../ui/ShipmentCard.jsx';
import { SHIPMENTS, FEATURED_SHIPMENTS } from '../../data/shipments.js';

const FEATURED_IDS = new Set(FEATURED_SHIPMENTS.map((s) => s.id));
const OTHERS = SHIPMENTS.filter((s) => !FEATURED_IDS.has(s.id));

// The full shipment map, six featured shipments, then the rest of
// the record on request.
export default function ShipmentMapSection() {
  const [all, setAll] = useState(false);
  const scrollRef = useRef(null);

  // On phones the map is wider than the screen and pans sideways;
  // start it on the Americas, where most of the lines begin.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth * 0.12;
  }, []);
  const shown = all ? [...FEATURED_SHIPMENTS, ...OTHERS] : FEATURED_SHIPMENTS;

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
          {shown.map((s, i) => (
            <ShipmentCard shipment={s} key={s.id} delay={(i % 3) * 0.06} />
          ))}
        </div>

        {OTHERS.length > 0 && (
          <button type="button" className="btn btn--outline tour__more" onClick={() => setAll((a) => !a)} aria-expanded={all}>
            {all ? 'Show fewer' : `Show all ${SHIPMENTS.length} shipments`}
          </button>
        )}
      </div>
    </section>
  );
}
