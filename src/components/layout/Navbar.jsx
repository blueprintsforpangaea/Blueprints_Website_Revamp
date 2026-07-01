import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logoFull from '../../assets/logos/blueprints-logo-1.png';

const NAV_ITEMS = [
  { to: '/mission', label: 'Mission' },
  { to: '/impact', label: 'Impact' },
  { to: '/about', label: 'About' },
  { to: '/chapters', label: 'Chapters' },
  { to: '/press', label: 'Press' },
  { to: '/get-involved', label: 'Get Involved' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Blueprints for Pangaea — home">
          <img className="navbar__logo-img" src={logoFull} alt="Blueprints for Pangaea" />
        </Link>

        <nav className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="navbar__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link to="/get-involved" className="btn btn--dark btn--sm">Partner With Us</Link>
          <Link to="/donate" className="btn btn--primary btn--sm">Donate</Link>
          <button
            className={`navbar__toggle ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
          <Link to="/donate" className="btn btn--primary">Donate Now</Link>
        </div>
      )}
    </header>
  );
}
