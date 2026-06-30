import Reveal from '../ui/Reveal.jsx';

export default function Testimonial() {
  return (
    <section className="section section--tint">
      <div className="container">
        <Reveal className="testimonial">
          <div className="testimonial__mark">“</div>
          <blockquote className="testimonial__quote">
            The supplies Blueprints for Pangaea delivered let us keep our doors
            open and our care free for the families who count on us.
          </blockquote>
          <div className="testimonial__author">
            <div className="testimonial__avatar" aria-hidden="true">HC</div>
            <div style={{ textAlign: 'left' }}>
              <div className="testimonial__name">Clinic Partner</div>
              <div className="testimonial__role">Hope Clinic · Ypsilanti, MI</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
