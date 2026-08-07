import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';

export default function GetInvolvedCTA() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-banner">
          <h2>Join the movement</h2>
          <p>
            Every box redirected is a life touched. Fund a shipment, donate surplus
            supplies, or bring a chapter to your campus — and help us reach the next clinic.
          </p>
          <div className="cta-banner__buttons">
            <Link to="/donate" className="btn btn--primary btn--lg">Donate Today</Link>
            <Link to="/get-involved" className="btn btn--ghost btn--lg">Get Involved</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
