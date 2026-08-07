import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import donatePhoto from '../../assets/images/efd3cc03-681e-468b-8608-f746800f9dc2dsc-0260.jpg';
import { TOTALS } from '../../data/stats.js';

const ease = [0.22, 1, 0.36, 1];

export default function DonateScene() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section className="donate-scene curve-top" ref={ref}>
      <div className="donate-scene__media" aria-hidden="true">
        <motion.img
          src={donatePhoto}
          alt=""
          className="donate-scene__img"
          loading="lazy"
          style={reduceMotion ? undefined : { y: imgY }}
        />
        <div className="donate-scene__scrim" />
      </div>

      <div className="container donate-scene__inner">
        <motion.span
          className="donate-scene__kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
        >
          Your part in this
        </motion.span>

        <motion.h2
          className="donate-scene__title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
        >
          Supplies are free.<br />Freight is not.
        </motion.h2>

        <motion.p
          className="donate-scene__body"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease, delay: 0.16 }}
        >
          Hospitals give us the surplus. What it costs to store a pallet, verify
          it, and put it on a truck is the part that needs funding — and that
          is where a gift goes. {TOTALS.suppliesValueExact} in supplies has
          reached clinics this way.
        </motion.p>

        <motion.div
          className="donate-scene__ctas"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease, delay: 0.24 }}
        >
          <Link to="/donate" className="btn btn--white btn--lg">
            Donate now <span className="arrow">→</span>
          </Link>
          <Link to="/get-involved" className="btn btn--ghost btn--lg">More ways to help</Link>
        </motion.div>
      </div>
    </section>
  );
}
