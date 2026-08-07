import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { TOTALS } from '../../data/stats.js';

export default function AudienceSplit() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow eyebrow--center">Get Involved</span>
          <h2 className="section-title">Two ways to move with us</h2>
          <p>Whether you run an organization or you're a student ready to lead — there's a place for you.</p>
        </Reveal>

        <div className="audience">
          <Reveal as="div" className="audience-card audience-card--orgs">
            <span className="audience-card__tag">For Nonprofits & Healthcare Orgs</span>
            <h3>Partner With Us</h3>
            <ul className="audience-card__list">
              <li>Receive vetted, in-date medical supplies at no cost</li>
              <li>Donate your facility's surplus inventory</li>
              <li>Co-deliver relief to the communities you serve</li>
            </ul>
            <Link to="/get-involved" className="btn btn--white">
              Start a Partnership <span className="arrow">→</span>
            </Link>
          </Reveal>

          <Reveal as="div" className="audience-card audience-card--students" delay={0.12}>
            <span className="audience-card__tag">For Students</span>
            <h3>Join the Global Team</h3>
            <ul className="audience-card__list">
              <li>Join one of {TOTALS.chapters} university chapters</li>
              <li>Start a new chapter on your campus</li>
              <li>Lead real logistics with global impact</li>
            </ul>
            <Link to="/get-involved" className="btn btn--white">
              Find Your Chapter <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
