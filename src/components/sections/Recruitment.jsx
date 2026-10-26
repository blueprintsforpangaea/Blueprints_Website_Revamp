import Reveal from '../ui/Reveal.jsx';
import Photo from '../ui/Photo.jsx';
import { RECRUITMENT } from '../../data/recruitment.js';
import { recruitmentPhoto } from '../../assets/photos.js';

// This semester's headquarters recruitment at U-M. Edit
// src/data/recruitment.js each semester; this renders it as is.
export default function Recruitment() {
  return (
    <Reveal className={`recruit recruit--${RECRUITMENT.theme?.accent || 'navy'}`}>
      <div className="recruit__banner">
        <div className="recruit__head">
          <h3 className="recruit__title">{RECRUITMENT.term} recruitment</h3>
          {RECRUITMENT.theme?.tagline && <p className="recruit__tagline">{RECRUITMENT.theme.tagline}</p>}
          {RECRUITMENT.open && RECRUITMENT.applyUrl ? (
            <a href={RECRUITMENT.applyUrl} target="_blank" rel="noreferrer" className="btn btn--light">
              Apply now
            </a>
          ) : (
            <p className="recruit__status">{RECRUITMENT.closedNote}</p>
          )}
          {RECRUITMENT.eligibility && <p className="recruit__foot">{RECRUITMENT.eligibility}</p>}
        </div>
        <Photo
          src={recruitmentPhoto(RECRUITMENT.theme?.photo)}
          alt=""
          className="recruit__photo"
          label="Recruitment photo coming soon"
        />
      </div>
      <ol className="recruit__events">
        {RECRUITMENT.events.map((e) => (
          <li key={e.name} className={`recruit__event ${e.deadline ? 'recruit__event--due' : ''}`}>
            <span className="recruit__date">{e.date}</span>
            <span className="recruit__name">
              {e.name}
              {e.required && <span className="recruit__tag">Required</span>}
            </span>
            <span className="recruit__when">
              {[e.time, e.place].filter(Boolean).join(' · ')}
              {e.note && <><br />{e.note}</>}
            </span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
