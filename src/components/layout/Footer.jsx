import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div className="footer__col">
          <div className="footer__brand">
            <span className="navbar__logo">B</span>
            <span className="footer__brand-name">Blueprints for Pangaea</span>
          </div>
          <p className="footer__about">
            A student-powered nonprofit rescuing surplus medical supplies and
            redistributing them to clinics and communities worldwide. Saving
            lives, one box at a time.
          </p>
          <div className="footer__socials">
            <a className="footer__social" href="#" aria-label="Instagram">IG</a>
            <a className="footer__social" href="#" aria-label="LinkedIn">in</a>
            <a className="footer__social" href="#" aria-label="Facebook">f</a>
            <a className="footer__social" href="#" aria-label="Email">@</a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <Link to="/mission">Our Mission</Link>
          <Link to="/impact">Global Impact</Link>
          <Link to="/about">About Us</Link>
          <Link to="/chapters">Chapters</Link>
          <Link to="/press">Press</Link>
        </div>

        <div className="footer__col">
          <h4>Get Involved</h4>
          <Link to="/get-involved">Join a Chapter</Link>
          <Link to="/get-involved">Partner With Us</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/gala">Annual Gala</Link>
        </div>

        <div className="footer__col">
          <h4>Stay in the loop</h4>
          <p>Impact updates from the warehouse to the field.</p>
          <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@email.com" aria-label="Email address" />
            <button type="submit">Join</button>
          </form>
          <p style={{ marginTop: '1rem' }}>contact@blueprintsforpangaea.org</p>
        </div>
      </footer>
      <div className="footer__bottom">
        © {new Date().getFullYear()} Blueprints for Pangaea · A 501(c)(3) nonprofit · Headquartered at the University of Michigan
      </div>
    </div>
  );
}
