import { Link } from 'react-router-dom';

export default function Footer() {
  // TODO: pull contact + social links from data/contact.js
  return (
    <footer className="footer">
      <div className="footer__col">
        <h4>Blueprints for Pangaea</h4>
        <p>Established 2013</p>
        <p>contact@blueprintsforpangaea.org</p>
      </div>
      <div className="footer__col">
        <h4>Explore</h4>
        <Link to="/mission">Mission</Link>
        <Link to="/impact">Impact</Link>
        <Link to="/chapters">Chapters</Link>
        <Link to="/press">Press</Link>
      </div>
      <div className="footer__col">
        <h4>Executive Documents</h4>
        {/* TODO: link to bylaws, 990s, annual report */}
      </div>
      <div className="footer__col">
        <h4>Follow</h4>
        {/* TODO: socials (Instagram, LinkedIn, Facebook) */}
      </div>
    </footer>
  );
}
