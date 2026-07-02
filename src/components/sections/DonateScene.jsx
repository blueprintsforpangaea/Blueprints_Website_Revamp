import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { TOTALS } from '../../data/stats.js';

export default function DonateScene() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const imgY = useTransform(progress, [0, 1], ['-12%', '12%']);

  return (
    <section className="donate-scene" ref={ref}>
      <div className="donate-scene__media" aria-hidden="true">
        <motion.img src="/boxes.jpg" alt="" className="donate-scene__img" style={{ y: imgY }} />
        <div className="donate-scene__scrim" />
      </div>

      <div className="container donate-scene__inner">
        <motion.span
          className="donate-scene__kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Your part in this
        </motion.span>

        <motion.h2
          className="donate-scene__title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          ${TOTALS.boxCost} sends a box.<br />A box can save a life.
        </motion.h2>

        <motion.p
          className="donate-scene__body"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          We&rsquo;re student-run, which means almost every dollar goes straight to
          recovering and shipping supplies. Fund the next delivery to a clinic that
          has run out.
        </motion.p>

        <motion.div
          className="donate-scene__ctas"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
        >
          <Link to="/donate" className="btn btn--white btn--lg">
            Donate now <span className="arrow">→</span>
          </Link>
          <Link to="/get-involved" className="btn btn--ghost btn--lg">Other ways to help</Link>
        </motion.div>
      </div>
    </section>
  );
}
