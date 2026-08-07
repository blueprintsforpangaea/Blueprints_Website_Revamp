import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import heroBg from '../../assets/images/hero-bg.jpg';
import { TOTALS } from '../../data/stats.js';

const ease = [0.22, 1, 0.36, 1];
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero">
      <div className="hero__media" aria-hidden="true">
        <img
          className="hero__img"
          src={heroBg}
          alt=""
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero__scrim" />
      </div>

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.span className="hero__eyebrow" variants={item}>
            Est. {TOTALS.founded} — University of Michigan
          </motion.span>

          <motion.h1 className="hero__title" variants={item}>
            Saving lives,<br />one box at a time.
          </motion.h1>

          <motion.p className="hero__subtitle" variants={item}>
            We recover sealed, in-date medical supplies that hospitals are about to throw away, and
            get them to clinics that have run out.
          </motion.p>

          <motion.div className="hero__ctas" variants={item}>
            <Link to="/donate" className="btn btn--white btn--lg">
              Donate <span className="arrow">→</span>
            </Link>
            <Link to="/impact" className="btn btn--ghost btn--lg">See our impact</Link>
          </motion.div>

          <motion.p className="hero__proof" variants={item}>
            <strong>{TOTALS.suppliesValueExact}</strong> in supplies redistributed to date, across{' '}
            {TOTALS.countries}+ countries.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
