import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';

export default function NotFound() {
  return (
    <article>
      <PageHeader title="Page not found">
        We couldn’t find that page.
      </PageHeader>
      <section className="section section--tight">
        <div className="container btn-row">
          <Link to="/" className="btn btn--dark">Go to the home page</Link>
          <Link to="/impact" className="link-arrow">See our impact <span className="arrow">→</span></Link>
        </div>
      </section>
    </article>
  );
}
