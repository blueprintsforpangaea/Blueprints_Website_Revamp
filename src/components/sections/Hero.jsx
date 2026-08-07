import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../../assets/images/hero-bg.jpg';
import { TOTALS } from '../../data/stats.js';

const ease = [0.22, 1, 0.36, 1];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <div className="hero__media" aria-hidden="true">
        <motion.img
          className="hero__img"
          src={heroBg}
          alt=""
          loading="eager"
          // React 18 forwards this only in lowercase form.
          fetchpriority="high"
          style={{ y: imgY, scale: imgScale }}
        />
        <div className="hero__scrim" />
      </div>

      <motion.div className="container hero__container" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
          <motion.span className="hero__eyebrow" variants={item}>
            Est. {TOTALS.founded} — University of Michigan
          </motion.span>

          <motion.h1 className="hero__title" variants={item}>
            Saving lives,<br />one box<br />at a time.
          </motion.h1>

          <motion.p className="hero__subtitle" variants={item}>
            Every year, mountains of sealed, in-date medical supplies are thrown
            out. We rescue them — and get them to clinics that have run out, across{' '}
            {TOTALS.countries}+ countries.
          </motion.p>

          <motion.div className="hero__ctas" variants={item}>
            <Link to="/donate" className="btn btn--white btn--lg">
              Donate <span className="arrow">→</span>
            </Link>
            <Link to="/impact" className="btn btn--ghost btn--lg">See our impact</Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease }}
        >
          <span className="hero__scroll">Scroll to explore</span>
          <div className="hero__proof">
            <strong>{TOTALS.suppliesValueExact}</strong>
            <span>in medical supplies redistributed to date</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
