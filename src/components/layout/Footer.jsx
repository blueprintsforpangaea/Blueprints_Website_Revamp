import { Link } from 'react-router-dom';
import logoFull from '../../assets/logos/blueprints-logo-1.png';
import { ORG, SOCIALS, DOCUMENTS, DONATE_URL } from '../../data/site.js';
import { TOTALS } from '../../data/stats.js';

export default function Footer() {
  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div className="footer__col footer__col--brand">
          <img className="footer__logo" src={logoFull} alt={ORG.name} />
          <p className="footer__about">
            A student-led {ORG.taxStatus} recovering surplus medical supplies and redistributing
            them to clinics and communities worldwide. Founded {ORG.founded} at the{' '}
            {ORG.foundedAt}.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="footer__social"
                href={s.url}
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <Link to="/mission">Our mission</Link>
          <Link to="/impact">Global impact</Link>
          <Link to="/about">About us</Link>
          <Link to="/chapters">Chapters</Link>
          <Link to="/press">Press</Link>
        </div>

        <div className="footer__col">
          <h4>Get involved</h4>
          <Link to="/get-involved#recruitment">Join at headquarters</Link>
          <Link to="/get-involved#chapter">Start a chapter</Link>
          <Link to="/get-involved#supplies">Donate supplies</Link>
          <Link to="/gala">Annual gala</Link>
          <a href={DONATE_URL} target="_blank" rel="noreferrer">Donate</a>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
          <span className="footer__quiet">{ORG.hq}</span>
          <h4 style={{ marginTop: '1.75rem' }}>Documents</h4>
          {DOCUMENTS.map((d) => (
            <a key={d.label} href={d.url} target="_blank" rel="noreferrer">{d.label}</a>
          ))}
        </div>
      </footer>

      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()} {ORG.name} · {ORG.taxStatus} · Est. {TOTALS.founded}
        </span>
      </div>
    </div>
  );
}
