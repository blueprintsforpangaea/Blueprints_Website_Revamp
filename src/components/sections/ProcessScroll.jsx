import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const STEPS = [
  { n: '01', t: 'Partner', b: 'We build relationships with hospitals and suppliers sitting on surplus, in-date medical inventory they can no longer use.' },
  { n: '02', t: 'Rescue', b: 'Student volunteers recover the supplies by hand — before a single sealed box ever reaches the waste stream.' },
  { n: '03', t: 'Verify', b: 'Every item is sorted, inspected, and cataloged against safe-redistribution standards. Nothing ships unchecked.' },
  { n: '04', t: 'Deliver', b: 'Supplies reach vetted clinics and relief partners — free of charge — at home and across 15+ countries.' },
];

export default function ProcessScroll() {
  return (
    <section className="process">
      <div className="container process__grid">
        <header className="process__head">
          <span className="eyebrow">How we work</span>
          <h2 className="process__title">From surplus<br />to saved lives.</h2>
          <p className="process__lede">
            Four steps stand between a hospital&rsquo;s surplus shelf and a clinic
            that has run out.
          </p>
        </header>

        <ol className="process__steps">
          {STEPS.map((s, i) => (
            <motion.li
              className="process-step"
              key={s.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease, delay: 0.06 * i }}
            >
              <span className="process-step__num" aria-hidden="true">{s.n}</span>
              <div>
                <h3 className="process-step__title">{s.t}</h3>
                <p className="process-step__body">{s.b}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
