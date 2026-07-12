import Reveal from '../ui/Reveal.jsx';
import clinicPhoto from '../../assets/images/12dd519c-c348-407b-b191-8031453d39c2-1-105-c.jpg';

export default function Testimonial() {
  return (
    <section className="section section--tint">
      <div className="container testimonial-split">
        <Reveal className="testimonial-split__media">
          <img
            src={clinicPhoto}
            alt="A Blueprints volunteer hand-delivering a box of medical supplies at Hope Clinic"
            loading="lazy"
          />
          <span className="testimonial-split__caption">
            Delivery day at Hope Clinic — Ypsilanti, Michigan
          </span>
        </Reveal>

        <Reveal className="testimonial-split__body" delay={0.12}>
          <div className="testimonial__mark" aria-hidden="true">&ldquo;</div>
          <blockquote className="testimonial__quote">
            The supplies Blueprints for Pangaea delivered let us keep our doors
            open — and our care free — for the families who count on us.
          </blockquote>
          <div className="testimonial__author">
            <div className="testimonial__avatar" aria-hidden="true">HC</div>
            <div>
              <div className="testimonial__name">Clinic Partner</div>
              <div className="testimonial__role">Hope Clinic · Ypsilanti, MI</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
