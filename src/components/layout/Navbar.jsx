import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logoFull from '../../assets/logos/blueprints-logo-1.png';

const NAV_ITEMS = [
  { to: '/mission', label: 'What we do' },
  { to: '/impact', label: 'Impact' },
  { to: '/chapters', label: 'Chapters' },
  { to: '/about', label: 'About' },
  { to: '/get-involved', label: 'Get involved' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Blueprints for Pangaea home">
          <img className="navbar__logo" src={logoFull} alt="Blueprints for Pangaea" />
        </Link>

        <nav className="navbar__links" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="navbar__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link to="/donate" className="btn btn--primary btn--sm">Donate</Link>
          <button
            className={`navbar__toggle ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
          <NavLink to="/press">Press</NavLink>
        </nav>
      )}
    </header>
  );
}
