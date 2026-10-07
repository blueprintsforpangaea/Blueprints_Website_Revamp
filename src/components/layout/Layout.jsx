import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

// The Pangaea concept page draws its own nav over the globe.
const BARE_NAV = new Set(['/pangaea']);

export default function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="app-shell">
      {!BARE_NAV.has(pathname) && <Navbar />}
      <main className="app-main app-main--full-width">{children}</main>
      <Footer />
    </div>
  );
}
