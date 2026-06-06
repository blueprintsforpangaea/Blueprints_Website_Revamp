import { Link } from 'react-router-dom';

export default function GetInvolvedCTA() {
  return (
    <section className="cta">
      <h2 className="cta__title">Join the Movement</h2>
      <p className="cta__body">
        Students, hospitals, and supporters — there's a way for everyone to help.
      </p>
      <div className="cta__buttons">
        <Link to="/get-involved" className="btn btn--primary">Get Involved</Link>
        <Link to="/donate" className="btn btn--secondary">Donate</Link>
      </div>
    </section>
  );
}
