// Shared press renderer. Items without a `url` render as plain
// rows rather than dead links — the live site publishes some
// coverage as screenshots with no linkable source.
export default function PressList({ items }) {
  return (
    <div className="press-list">
      {items.map((item) => {
        const inner = (
          <>
            <span className="press-item__top">
              {item.outlet && <span className="press-item__outlet">{item.outlet}</span>}
              {item.date && <span className="press-item__date">{item.date}</span>}
            </span>
            <span className="press-item__headline">{item.headline}</span>
            {item.byline && <span className="press-item__byline">{item.byline}</span>}
            {item.excerpt && <span className="press-item__excerpt">{item.excerpt}</span>}
            {item.url && <span className="press-item__cue">Read the story</span>}
          </>
        );

        return (
          <article
            key={item.id}
            className={`press-item ${item.url ? '' : 'press-item--static'}`}
          >
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer">{inner}</a>
            ) : (
              <div>{inner}</div>
            )}
          </article>
        );
      })}
    </div>
  );
}
