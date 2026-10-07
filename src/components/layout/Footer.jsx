import { Link } from 'react-router-dom';
import { ORG, SOCIALS, DOCUMENTS } from '../../data/site.js';
import logo from '../../assets/logos/blueprints-logo-1.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <img className="footer__logo" src={logo} alt="Blueprints for Pangaea" />
            <p className="footer__about">
              {ORG.name} is a student-led {ORG.taxStatus} based in {ORG.hq}. Founded in{' '}
              {ORG.founded} at the {ORG.foundedAt}.
            </p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>Organization</h4>
              <Link to="/mission">What we do</Link>
              <Link to="/impact">Impact</Link>
              <Link to="/about">About</Link>
              <Link to="/chapters">Chapters</Link>
              <Link to="/press">Press</Link>
            </div>

            <div className="footer__col">
              <h4>Get involved</h4>
              <Link to="/donate">Donate</Link>
              <Link to="/get-involved#supplies">Donate supplies</Link>
              <Link to="/get-involved#recruitment">Join at headquarters</Link>
              <Link to="/get-involved#chapter">Start a chapter</Link>
              <Link to="/gala">Gala</Link>
            </div>

            <div className="footer__col">
              <h4>Contact</h4>
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
              <span>{ORG.hq}</span>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {ORG.name}</span>
          <span className="footer__docs">
            {DOCUMENTS.map((d) => (
              <a key={d.label} href={d.url} target="_blank" rel="noreferrer">{d.label}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
