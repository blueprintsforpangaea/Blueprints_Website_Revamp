import Hero from '../components/sections/Hero.jsx';
import Stats from '../components/sections/Stats.jsx';
import ProblemStatement from '../components/sections/ProblemStatement.jsx';
import HowWeWork from '../components/sections/HowWeWork.jsx';
import RecentShipments from '../components/sections/RecentShipments.jsx';
import PressCoverage from '../components/sections/PressCoverage.jsx';
import GetInvolvedCTA from '../components/sections/GetInvolvedCTA.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ProblemStatement />
      <HowWeWork />
      <RecentShipments />
      <PressCoverage />
      <GetInvolvedCTA />
    </>
  );
}
