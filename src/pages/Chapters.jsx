import { useParams } from 'react-router-dom';
import ChaptersList from '../components/sections/ChaptersList.jsx';
import { CHAPTERS } from '../data/chapters.js';

export default function Chapters() {
  const { chapterSlug } = useParams();

  if (chapterSlug) {
    const chapter = CHAPTERS.find((c) => c.slug === chapterSlug);
    if (!chapter) return <p>Chapter not found.</p>;
    return <ChapterDetail chapter={chapter} />;
  }

  return (
    <article className="page page--chapters page--full-width">
      <h1>Our Chapters</h1>
      <ChaptersList />
    </article>
  );
}

function ChapterDetail({ chapter }) {
  // TODO: leadership, contact, events, application link per chapter.
  return (
    <article className="page page--chapter-detail">
      <h1>{chapter.name}</h1>
      <p>{chapter.location}</p>
      {/* TODO: chapter leadership, contact form, upcoming events */}
    </article>
  );
}
