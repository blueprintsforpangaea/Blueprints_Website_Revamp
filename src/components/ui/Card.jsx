export default function Card({ title, subtitle, body, image, footer }) {
  return (
    <article className="card">
      {image && <img className="card__image" src={image} alt="" />}
      <div className="card__content">
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        <h3 className="card__title">{title}</h3>
        <p>Hello world</p>
        <p className="card__body">{body}</p>
        {footer && <div className="card__footer">{footer}</div>}
      </div>
    </article>
  );
}
