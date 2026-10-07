import { motion, useReducedMotion } from 'framer-motion';

// Shared header for interior pages. `eyebrow` is optional and should
// only be used when it adds information the title doesn't (e.g. a
// breadcrumb back to a parent page).
export default function PageHeader({ eyebrow, title, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <header className="page-header">
      <div className="container">
        <motion.div
          className="page-header__inner"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && <div className="page-header__eyebrow">{eyebrow}</div>}
          <h1>{title}</h1>
          {children && <p>{children}</p>}
        </motion.div>
      </div>
    </header>
  );
}
