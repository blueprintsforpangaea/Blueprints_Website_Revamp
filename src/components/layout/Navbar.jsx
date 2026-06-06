import { NavLink, Link } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/mission', label: 'Mission' },
  { to: '/impact', label: 'Impact' },
  { to: '/about', label: 'About Us' },
  { to: '/press', label: 'Press' },
  { to: '/chapters', label: 'Chapters' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/gala', label: 'Gala' },
];

export default function Navbar() {
  // TODO: mobile menu toggle state + scroll-aware styling
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">Blueprints for Pangaea</Link>
      <nav className="navbar__links">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className="navbar__link">
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link to="/donate" className="navbar__cta">Donate</Link>
    </header>
  );
}
