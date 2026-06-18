import Hero from '../components/sections/Hero.jsx';
import ProblemStatement from '../components/sections/ProblemStatement.jsx';
import GlobalImpact from '../components/sections/GlobalImpact.jsx';
import FeaturedPartnerships from '../components/sections/FeaturedPartnerships.jsx';
import RecentShipments from '../components/sections/RecentShipments.jsx';
import Testimonial from '../components/sections/Testimonial.jsx';
import PressCoverage from '../components/sections/PressCoverage.jsx';
import GetInvolvedCTA from '../components/sections/GetInvolvedCTA.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <GlobalImpact />
      <FeaturedPartnerships />
      <RecentShipments />
      <Testimonial />
      <PressCoverage />
      <GetInvolvedCTA />
    </>
  );
}
