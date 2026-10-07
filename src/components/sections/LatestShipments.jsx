import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import ShipmentCard from '../ui/ShipmentCard.jsx';
import { RECENT_SHIPMENTS } from '../../data/shipments.js';

export default function LatestShipments() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <h2 className="section-title">Recent shipments</h2>
          <Link to="/impact" className="link-arrow">
            More shipments <span className="arrow">→</span>
          </Link>
        </Reveal>

        <div className="ships">
          {RECENT_SHIPMENTS.map((s, i) => (
            <ShipmentCard shipment={s} key={s.id} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
