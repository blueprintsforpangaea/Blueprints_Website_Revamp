import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const SENTENCE = [
  { text: 'We move medicine from where it is ' },
  { text: 'wasted', accent: true },
  { text: ' to where it is ' },
  { text: 'needed.', accent: true },
];

// One plain sentence that states the mission — revealed word by word
// as the visitor scrolls out of the problem scene.
export default function MissionStatement() {
  let wordIndex = 0;
  return (
    <section className="mission-stmt">
      <div className="container">
        <span className="eyebrow">Our mission</span>
        <h2 className="mission-stmt__title" aria-label="We move medicine from where it is wasted to where it is needed.">
          {SENTENCE.map((part, i) =>
            part.text.split(' ').map((word, j) => {
              if (!word) return null;
              const delay = 0.04 * wordIndex++;
              return (
                // Space lives OUTSIDE the inline-block span or it collapses.
                <Fragment key={`${i}-${j}`}>
                  <motion.span
                    className={part.accent ? 'text-accent' : undefined}
                    initial={{ opacity: 0, y: '0.5em' }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.6, ease, delay }}
                    aria-hidden="true"
                  >
                    {word}
                  </motion.span>{' '}
                </Fragment>
              );
            }),
          )}
        </h2>
        <motion.p
          className="mission-stmt__sub"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
        >
          Blueprints for Pangaea is a student-run 501(c)(3) nonprofit. We rescue
          surplus medical supplies before they reach the landfill and deliver them —
          free of charge — to clinics that have run out.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
        >
          <Link to="/mission" className="link-arrow">
            Read our full mission <span className="arrow">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
