import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import heroBg from '../../assets/images/hero-bg.jpg';
import { TOTALS } from '../../data/stats.js';

const ease = [0.22, 1, 0.36, 1];
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero">
      <img
        className="hero__img"
        src={heroBg}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchpriority="high"
      />
      <div className="hero__scrim" aria-hidden="true" />

      <motion.div
        className="container hero__content"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <motion.h1 className="hero__title" variants={item}>
          Saving lives, one box at a time
        </motion.h1>
        <motion.p className="hero__subtitle" variants={item}>
          Students at {TOTALS.chapters} universities collect unused medical supplies from hospitals
          and ship them to clinics in the U.S. and abroad. We started at the University of
          Michigan in {TOTALS.founded}.
        </motion.p>
        <motion.div className="hero__ctas" variants={item}>
          <Link to="/donate" className="btn btn--white">Donate</Link>
          <Link to="/get-involved" className="btn btn--ghost">Get involved</Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
