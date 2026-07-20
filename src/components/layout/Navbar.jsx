import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/home/logo.png';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/mission', label: 'Mission Impact' },
  { to: '/about', label: 'About Us' },
  { to: '/chapters', label: 'Chapters' },
  { to: '/get-involved', label: 'Get Involved' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar navbar--full-width ${isScrolled ? 'is-scrolled' : ''}`}>
      <Link to="/" className="navbar__brand" onClick={() => setIsOpen(false)}>
        <img src={logo} alt="Blueprints for Pangaea" className="navbar__logo" />
      </Link>

      <nav className="navbar__links">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="navbar__link">
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/donate" className="navbar__cta btn btn--primary">Donate Now</Link>

      <button
        type="button"
        className={`navbar__toggle ${isOpen ? 'is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <nav className="navbar__dropdown">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="navbar__dropdown-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/donate"
            className="navbar__dropdown-link navbar__dropdown-link--cta"
            onClick={() => setIsOpen(false)}
          >
            Donate Now
          </Link>
        </nav>
      )}
    </header>
  );
}
