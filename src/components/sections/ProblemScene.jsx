import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function ProblemScene() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const numScale = useTransform(scrollYProgress, [0, 0.55], [0.82, 1.05]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.12, 0.8, 1], [0, 1, 1, 0.25]);
  const numBlur = useTransform(scrollYProgress, [0, 0.12], ['14px', '0px']);
  const filter = useTransform(numBlur, (b) => `blur(${b})`);

  const beat1 = useTransform(scrollYProgress, [0.04, 0.16, 0.42, 0.52], [0, 1, 1, 0]);
  const beat2 = useTransform(scrollYProgress, [0.5, 0.62, 0.92, 1], [0, 1, 1, 1]);
  const lineW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      className={`scene scene--problem curve-top${reduceMotion ? ' scene--static' : ''}`}
      ref={ref}
    >
      <div className="scene__sticky">
        <div className="container scene__inner">
          <span className="scene__kicker">A problem we can actually fix</span>

          <motion.div
            className="scene__bignum"
            style={reduceMotion ? undefined : { scale: numScale, opacity: numOpacity, filter }}
          >
            5,000,000
          </motion.div>
          <span className="scene__unit">
            tons of perfectly good medical supplies are discarded every year
          </span>

          <div className={`scene__beats${reduceMotion ? ' scene__beats--static' : ''}`}>
            <motion.p className="scene__beat" style={reduceMotion ? undefined : { opacity: beat1 }}>
              Sealed. In&#8209;date. Never used. Thrown out only because hospital
              inventory rules say they must be.
            </motion.p>
            <motion.p className="scene__beat" style={reduceMotion ? undefined : { opacity: beat2 }}>
              Meanwhile, clinics nearby and around the world run short of the
              basics. That&rsquo;s the gap we close — together.
            </motion.p>
          </div>

          {!reduceMotion && (
            <div className="scene__progress" aria-hidden="true">
              <motion.span style={{ width: lineW }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
