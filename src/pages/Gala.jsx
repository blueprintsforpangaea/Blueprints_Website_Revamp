import { useScrollAnimation } from '../hooks/useScrollAnimation.js';

export default function Gala() {
  const headingAnim  = useScrollAnimation({ threshold: 0.2 });
  const detailsAnim  = useScrollAnimation({ threshold: 0.15 });
  const ticketsAnim  = useScrollAnimation({ threshold: 0.15 });

  // TODO: event date, venue, tickets, sponsorships, RSVP form.
  return (
    <article className="page page--gala">
      <h1
        ref={headingAnim.ref}
        className={`fade-up${headingAnim.isVisible ? ' is-visible' : ''}`}
      >
        Annual Gala
      </h1>

      <p>{/* TODO: event description */}</p>

      <section
        ref={detailsAnim.ref}
        className={`fade-up${detailsAnim.isVisible ? ' is-visible' : ''}`}
        style={{ transitionDelay: '0.1s' }}
      >
        <h2>Details</h2>
        {/* TODO: date, time, location */}
      </section>

      <section
        ref={ticketsAnim.ref}
        className={`fade-up${ticketsAnim.isVisible ? ' is-visible' : ''}`}
        style={{ transitionDelay: '0.2s' }}
      >
        <h2>Tickets & Sponsorships</h2>
        {/* TODO: ticket tiers + checkout link */}
      </section>
    </article>
  );
}
