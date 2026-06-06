import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <article className="page page--404">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </article>
  );
}
