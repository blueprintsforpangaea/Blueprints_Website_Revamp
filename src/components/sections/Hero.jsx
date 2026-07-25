import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { HERO_STATS } from '../../data/stats.js';

const ease = [0.22, 1, 0.36, 1];
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const STORY_CARDS = [
  {
    label: 'Recover',
    title: 'Sealed, in-date supplies',
    body: 'We rescue surplus items before they are discarded and route them back into care.',
  },
  {
    label: 'Verify',
    title: 'Hands-on student sorting',
    body: 'Every box is checked, sorted, and packed by volunteers who know the workflow.',
  },
  {
    label: 'Deliver',
    title: 'Clinics in 15+ countries',
    body: 'From local partners to global clinics, the supplies keep moving where they are needed.',
  },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero hero--legacy">
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__orb hero__orb--one" />
        <span className="hero__orb hero__orb--two" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.p className="hero__eyebrow" variants={item}>
            Blueprints for Pangaea
          </motion.p>
          <motion.h1 className="hero__title" variants={item}>
            Saving lives,<br />one box<br />at a time.
          </motion.h1>
          <motion.p className="hero__subtitle" variants={item}>
            We rescue surplus medical supplies from hospitals and redistribute
            them to clinics and communities that need them most here at home and
            around the world.
          </motion.p>
          <motion.div className="hero__ctas" variants={item}>
            <Link to="/donate" className="btn btn--primary">
              Donate Today
            </Link>
            <Link to="/get-involved" className="btn btn--ghost">
              Get Involved
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          aria-hidden="true"
        >
          <div className="hero__frame">
            <div className="hero__frame-head">
              <span>Legacy of impact</span>
              <strong>$9M+</strong>
            </div>

            <div className="hero__signal">
              <div className="hero__signal-ring" />
              <div className="hero__signal-ring hero__signal-ring--inner" />
              <div className="hero__signal-core" />
            </div>

            <div className="hero__storyboard">
              {STORY_CARDS.map((card) => (
                <article key={card.label} className="hero__storycard">
                  <span className="hero__storylabel">{card.label}</span>
                  <h2 className="hero__storytitle">{card.title}</h2>
                  <p className="hero__storybody">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container">
        <div className="hero-stats">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <div className="hero-stat__value">{stat.value}</div>
              <span className="hero-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
