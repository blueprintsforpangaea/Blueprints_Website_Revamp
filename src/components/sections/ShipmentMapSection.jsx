import { useEffect, useRef, useState } from 'react';
import ShipmentMap from '../pangaea/ShipmentMap.jsx';
import ShipmentCard from '../ui/ShipmentCard.jsx';
import { FEATURED_SHIPMENTS, LOCAL_SHIPMENTS } from '../../data/shipments.js';

const TABS = [
  { id: 'world', label: 'Around the world', list: FEATURED_SHIPMENTS },
  { id: 'local', label: 'In Michigan', list: LOCAL_SHIPMENTS },
];

// The full shipment map, then past shipments in two tabs.
export default function ShipmentMapSection() {
  const scrollRef = useRef(null);
  const [tab, setTab] = useState('world');
  const list = TABS.find((t) => t.id === tab).list;

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
        <p className="shipmap-hint">Rings are our chapters and blue dots are where supplies went. Swipe sideways and tap a blue dot for details.</p>
      </div>

      <div className="container tour__list">
        <div className="tour__head">
          <h2 className="section-title section-title--sm">Past shipments</h2>
          <div className="tabs" role="tablist" aria-label="Past shipments">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`ships-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="ships-panel"
                className={`tabs__tab ${tab === t.id ? 'is-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="ships" id="ships-panel" role="tabpanel" aria-labelledby={`ships-tab-${tab}`} key={tab}>
          {list.map((s, i) => (
            <ShipmentCard shipment={s} key={s.id} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
