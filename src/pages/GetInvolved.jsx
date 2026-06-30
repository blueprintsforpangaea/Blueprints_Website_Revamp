import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';

const ORG_PATHS = [
  { icon: '🏥', title: 'Receive Supplies', body: 'Run a clinic, hospital, or relief program? Apply to receive vetted, in-date medical supplies at no cost.' },
  { icon: '📦', title: 'Donate Surplus', body: 'Have unused inventory headed for disposal? Let us recover it and route it to where it’s needed.' },
  { icon: '🤝', title: 'Co-Deliver Relief', body: 'Partner on joint shipments and logistics to reach the communities you already serve.' },
];

const STUDENT_PATHS = [
  { icon: '🎓', title: 'Join a Chapter', body: 'Plug into one of 11 university chapters and start moving supplies this semester.' },
  { icon: '🚀', title: 'Start a Chapter', body: 'Bring Blueprints to your campus. We’ll give you the playbook, network, and support.' },
  { icon: '🧰', title: 'Volunteer & Intern', body: 'Sort, catalog, and ship at the warehouse — or apply for our high-school summer internship.' },
];

export default function GetInvolved() {
  return (
    <article>
      <PageHeader eyebrow="Get Involved" title="Find your way in">
        Two audiences, one mission. Whether you represent an organization or you're a student
        ready to lead, here's how to move with us.
      </PageHeader>

      {/* Audience switch cards */}
      <section className="section">
        <div className="container audience">
          <Reveal as="div" className="audience-card audience-card--orgs">
            <div className="audience-card__glow" />
            <span className="audience-card__tag">Nonprofits & Healthcare Orgs</span>
            <h3>Partner With Us</h3>
            <p>Receive supplies, donate surplus, or co-deliver relief — all at no cost to your community.</p>
            <a href="#organizations" className="btn btn--white">Explore Partnerships <span className="arrow">→</span></a>
          </Reveal>
          <Reveal as="div" className="audience-card audience-card--students" delay={0.12}>
            <div className="audience-card__glow" />
            <span className="audience-card__tag">Students</span>
            <h3>Join the Global Team</h3>
            <p>Lead real logistics with global impact through one of our university chapters.</p>
            <a href="#students" className="btn btn--white">Explore Student Roles <span className="arrow">→</span></a>
          </Reveal>
        </div>
      </section>

      {/* Organizations */}
      <section className="section section--soft" id="organizations">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">For Organizations</span>
            <h2 className="section-title">Partner with Blueprints</h2>
            <p>We make it simple for clinics, hospitals, and nonprofits to give and receive surplus medical supplies.</p>
          </Reveal>
          <div className="grid-3">
            {ORG_PATHS.map((p, i) => (
              <Reveal as="div" className="pathway-card" key={p.title} delay={(i % 3) * 0.08}>
                <div className="pathway-card__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <Link to="/get-involved" className="link-arrow">Get in touch <span className="arrow">→</span></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Students */}
      <section className="section" id="students">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--center">For Students</span>
            <h2 className="section-title">Lead with global impact</h2>
            <p>Hands-on experience in public health, supply-chain logistics, and nonprofit leadership.</p>
          </Reveal>
          <div className="grid-3">
            {STUDENT_PATHS.map((p, i) => (
              <Reveal as="div" className="pathway-card" key={p.title} delay={(i % 3) * 0.08}>
                <div className="pathway-card__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <Link to="/chapters" className="link-arrow">See chapters <span className="arrow">→</span></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Financial support CTA */}
      <section className="section">
        <div className="container">
          <Reveal className="cta-banner">
            <div className="cta-banner__glow" />
            <h2>Prefer to give?</h2>
            <p>$10 ships a box. $30 stocks a clinic shelf. Every dollar funds the logistics that turn surplus into care.</p>
            <div className="cta-banner__buttons">
              <Link to="/donate" className="btn btn--primary btn--lg">Donate Now</Link>
              <Link to="/gala" className="btn btn--ghost btn--lg">Attend the Gala</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
