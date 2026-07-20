import { Link } from 'react-router-dom';
import vanLoading from '../../assets/home/van-loading.jpg';

export default function ProblemStatement() {
  return (
    <section className="section section--alt">
      <div className="container problem__grid">
        <div>
          <h2 className="problem__title">
            Every year, over 5 million tons of medical
            supplies, much of it unused, are wasted
          </h2>
          <p className="problem__body">
            At Blueprints for Pangaea, we work to reallocate essential
            supplies from areas of surplus to communities in need.
          </p>
          <Link to="/mission" className="btn btn--primary">Learn How</Link>
        </div>
        <div className="problem__art">
          <img src={vanLoading} alt="Volunteers loading boxes of medical supplies into a delivery van" />
        </div>
      </div>
    </section>
  );
}
