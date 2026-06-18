import { Link } from 'react-router-dom';

export default function GetInvolvedCTA() {
  return (
    <section className="section section--navy">
      <div className="container cta">
        <h2 className="cta__title">Join the Movement</h2>
        <p className="cta__body">
          Students, hospitals, and supporters — there's a way for everyone to
          help redirect surplus supplies to the people who need them.
        </p>
        <div className="cta__buttons">
          <Link to="/get-involved" className="btn btn--ghost">Get Involved</Link>
          <Link to="/donate" className="btn btn--primary">Donate Today</Link>
        </div>
      </div>
    </section>
  );
}
