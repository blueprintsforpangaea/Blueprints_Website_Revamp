import { motion } from 'framer-motion';

// Shared dark hero band for interior pages.
export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="page-header">
      <div className="page-header__grid" />
      <div className="page-header__glow" />
      <div className="container">
        <motion.div
          className="page-header__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {children && <p>{children}</p>}
        </motion.div>
      </div>
    </header>
  );
}
