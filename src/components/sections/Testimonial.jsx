export default function Testimonial() {
  return (
    <section className="section section--alt">
      <div className="container testimonial">
        <blockquote className="testimonial__quote">
          “The supplies Blueprints for Pangaea delivered let us keep our doors
          open and our care free for the families who count on us.”
        </blockquote>
        <div className="testimonial__author">
          <div className="testimonial__avatar" aria-hidden="true" />
          <div style={{ textAlign: 'left' }}>
            <div className="testimonial__name">Clinic Partner</div>
            <div className="testimonial__role">Hope Clinic, Ypsilanti</div>
          </div>
        </div>
      </div>
    </section>
  );
}
