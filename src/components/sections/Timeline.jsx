import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { CHAPTERS } from '../../data/chapters.js';

// How many chapters existed by the end of a given year.
const chaptersBy = (year) => CHAPTERS.filter((c) => c.since <= Number(year)).length;

// Twelve small dots, filled for each chapter open by that year.
function ChapterDots({ year }) {
  const n = chaptersBy(year);
  return (
    <div className="tl-dots">
      <span className="tl-dots__row" aria-hidden="true">
        {CHAPTERS.map((c, i) => <span key={c.slug} className={i < n ? 'is-on' : ''} />)}
      </span>
      <span className="tl-dots__label">
        {n} {n === 1 ? 'chapter' : 'chapters'} by the end of {year}
      </span>
    </div>
  );
}

// Our history. On computers, one line with a stop for every year;
// pick a year to read about it. On phones, a plain list running down
// the page, so nothing has to be swiped or tapped to be read.
export default function Timeline({ items }) {
  const phone = useMediaQuery('(max-width: 760px)');
  const reduce = useReducedMotion();
  const [at, setAt] = useState(0);

  if (phone) {
    return (
      <ol className="tl-list">
        {items.map((t) => (
          <li key={t.year + t.text} className="tl-list__item">
            <span className="tl-list__year">{t.year}</span>
            <p>{t.text}</p>
            <ChapterDots year={t.year} />
          </li>
        ))}
      </ol>
    );
  }

  const cur = items[at];
  const fill = items.length > 1 ? (at / (items.length - 1)) * 100 : 0;

  return (
    <div className="tl">
      <div className="tl-line">
        <span className="tl-line__track" aria-hidden="true">
          <span className="tl-line__fill" style={{ width: `${fill}%` }} />
        </span>
        <ol className="tl-line__stops">
          {items.map((t, i) => (
            <li key={t.year + t.text}>
              <button
                type="button"
                className={`tl-stop ${i === at ? 'is-current' : ''} ${i < at ? 'is-past' : ''}`}
                onClick={() => setAt(i)}
                aria-pressed={i === at}
              >
                <span className="tl-stop__dot" aria-hidden="true" />
                <span className="tl-stop__year">{t.year}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="tl-panel" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={at}
            className="tl-panel__body"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <span className="tl-panel__year">{cur.year}</span>
            <div>
              <p className="tl-panel__text">{cur.text}</p>
              <ChapterDots year={cur.year} />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="tl-panel__nav">
          <button type="button" onClick={() => setAt((i) => i - 1)} disabled={at === 0}>
            ← {at > 0 ? items[at - 1].year : 'Earlier'}
          </button>
          <button type="button" onClick={() => setAt((i) => i + 1)} disabled={at === items.length - 1}>
            {at < items.length - 1 ? items[at + 1].year : 'Later'} →
          </button>
        </div>
      </div>
    </div>
  );
}
