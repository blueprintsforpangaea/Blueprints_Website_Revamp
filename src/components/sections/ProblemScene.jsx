import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ProblemScene() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Spring-smoothed progress so wheel-scroll steps don't make the scene jump.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Scale + opacity only — animating filter: blur() on this huge
  // gradient-clipped number forces a full repaint every scroll frame.
  const numScale = useTransform(progress, [0, 0.55], [0.82, 1.05]);
  const numOpacity = useTransform(progress, [0, 0.12, 0.8, 1], [0, 1, 1, 0.25]);

  const beat1 = useTransform(progress, [0.04, 0.16, 0.42, 0.52], [0, 1, 1, 0]);
  const beat2 = useTransform(progress, [0.5, 0.62, 0.92, 1], [0, 1, 1, 1]);
  const lineW = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <section className="scene scene--problem" ref={ref}>
      <div className="scene__sticky">
        <div className="container scene__inner">
          <span className="scene__kicker">The problem</span>

          <motion.div className="scene__bignum" style={{ scale: numScale, opacity: numOpacity }}>
            5,000,000
          </motion.div>
          <span className="scene__unit">tons of medical supplies wasted every year</span>

          <div className="scene__beats">
            <motion.p className="scene__beat" style={{ opacity: beat1 }}>
              Sealed. In&#8209;date. Perfectly usable. Thrown out because of hospital
              inventory rules.
            </motion.p>
            <motion.p className="scene__beat" style={{ opacity: beat2 }}>
              Meanwhile, clinics here and around the world run out of the basics they
              need to keep people alive.
            </motion.p>
          </div>

          <div className="scene__progress" aria-hidden="true">
            <motion.span style={{ width: lineW }} />
          </div>
        </div>
      </div>
    </section>
  );
}
