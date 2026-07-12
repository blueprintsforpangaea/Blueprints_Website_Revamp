import { Link } from 'react-router-dom';

export default function ProblemStatement() {
  return (
    <section className="section section--alt">
      <div className="container problem__grid">
        <div>
          <h2 className="problem__title">
            Every year, over <strong>5 million tons</strong> of medical
            supplies, much of it unused, are wasted
          </h2>
          <p className="problem__body">
            Meanwhile, clinics across the country and around the world lack the
            basic equipment they need to care for patients. We bridge that gap —
            recovering in-date, usable supplies before they hit the landfill and
            getting them to the people who need them.
          </p>
          <Link to="/mission" className="btn btn--primary">Learn How</Link>
        </div>
        <div className="problem__art" aria-hidden="true" />
      </div>
    </section>
  );
}
