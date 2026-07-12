import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import imgService from '../../assets/images/14209cff-a633-4135-949b-5fa16397c38c.jpg';
import imgThumbs from '../../assets/images/img-2440-2.jpg';
import imgBlankets from '../../assets/images/eae28d10-7a69-40e0-af54-3d146010a570-1-105-c.jpg';
import imgBooth from '../../assets/images/dsc06350.jpg';

const PHOTOS = [
  { src: imgService, alt: 'The full Blueprints team gathered at our annual Day of Service' },
  { src: imgThumbs, alt: 'Two members in Blueprints shirts giving a thumbs up at a campus event' },
  { src: imgBlankets, alt: 'Volunteers smiling while making blankets at a service event' },
  { src: imgBooth, alt: 'Chapter members tabling at a community street fair' },
];

export default function CommunityStories() {
  return (
    <section className="section community">
      <div className="container community__grid">
        <div className="community__copy">
          <Reveal>
            <span className="eyebrow">Join in</span>
            <h2 className="section-title">There&rsquo;s a place<br />for you here.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="community__lead">
              Everything we do runs on people who show up — students sorting
              boxes between classes, hospitals donating a pallet, neighbors
              chipping in what they can. However you&rsquo;d like to help,
              we&rsquo;ll find you a spot.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="community__ways">
              <li>Volunteer at a warehouse day — no experience needed</li>
              <li>Start or join a chapter at your school</li>
              <li>Partner with us to donate surplus supplies</li>
            </ul>
          </Reveal>
          <Reveal delay={0.22} className="community__ctas">
            <Link to="/get-involved" className="btn btn--primary">
              Get involved <span className="arrow">→</span>
            </Link>
            <Link to="/chapters" className="btn btn--outline">Explore chapters</Link>
          </Reveal>
        </div>

        <div className="community__collage">
          {PHOTOS.map((p, i) => (
            <Reveal
              key={p.src}
              delay={0.08 * i}
              y={34}
              className={`community__photo community__photo--${i + 1}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
