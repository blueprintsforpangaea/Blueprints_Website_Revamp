import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div className="footer__col">
          <h4 className="footer__brand-name">Blueprints for Pangaea</h4>
          <p>Saving lives one box at a time.</p>
          <p>Established 2013</p>
          <p>contact@blueprintsforpangaea.org</p>
          <div className="footer__socials">
            <a className="footer__social" href="#" aria-label="Instagram">IG</a>
            <a className="footer__social" href="#" aria-label="LinkedIn">in</a>
            <a className="footer__social" href="#" aria-label="Facebook">f</a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Explore</h4>
          <Link to="/mission">Mission</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/chapters">Chapters</Link>
          <Link to="/press">Press</Link>
        </div>
        <div className="footer__col">
          <h4>Get Involved</h4>
          <Link to="/get-involved">Volunteer</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/gala">Annual Gala</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="footer__col">
          <h4>Documents</h4>
          <a href="#">Annual Report</a>
          <a href="#">Bylaws</a>
          <a href="#">Form 990</a>
        </div>
      </footer>
      <div className="footer__bottom">
        © {new Date().getFullYear()} Blueprints for Pangaea. A 501(c)(3) nonprofit organization.
      </div>
    </div>
  );
}
