import { Link } from 'react-router-dom';

const PATHWAYS = [
  { id: 'students',   title: 'Students',           body: 'Join or start a chapter at your university.' },
  { id: 'hospitals',  title: 'Hospitals',          body: 'Donate surplus medical supplies.' },
  { id: 'volunteer',  title: 'Volunteer',          body: 'Help sort and ship at our warehouse.' },
  { id: 'highschool', title: 'High School Interns',body: 'Apply for our summer internship program.' },
  { id: 'donate',     title: 'Financial Support',  body: 'Fund shipments — $10, $20, $30, or custom.', to: '/donate' },
];

export default function GetInvolved() {
  return (
    <article className="page page--get-involved">
      <h1>Get Involved</h1>
      <div className="pathways">
        {PATHWAYS.map((p) => (
          <div key={p.id} className="pathway">
            <h2>{p.title}</h2>
            <p>{p.body}</p>
            {p.to
              ? <Link to={p.to} className="btn btn--primary">Donate</Link>
              : <button className="btn btn--primary">{/* TODO: open form */}Learn more</button>}
          </div>
        ))}
      </div>
    </article>
  );
}
