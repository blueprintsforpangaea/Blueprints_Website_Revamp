import { motion, useReducedMotion } from 'framer-motion';
import LogoGlobe from '../pangaea/LogoGlobe.jsx';

// Shared header for interior pages: a title and an optional intro line.
export default function PageHeader({ title, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <header className="page-header">
      <LogoGlobe className="page-header__globe" />
      <div className="container">
        <motion.div
          className="page-header__inner"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>{title}</h1>
          {children && <p>{children}</p>}
        </motion.div>
      </div>
    </header>
  );
}
