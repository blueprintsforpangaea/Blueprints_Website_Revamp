import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';

export default function NotFound() {
  return (
    <article>
      <PageHeader eyebrow="404" title="This page took a wrong turn">
        The page you're looking for doesn't exist — but plenty of good work does.
      </PageHeader>
      <section className="section">
        <div className="container narrow" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--dark btn--lg">Back Home</Link>
          <Link to="/impact" className="btn btn--outline btn--lg">See Our Impact</Link>
        </div>
      </section>
    </article>
  );
}
