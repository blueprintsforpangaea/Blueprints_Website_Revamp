import Hero from '../components/sections/Hero.jsx';
import ImpactCounters from '../components/sections/ImpactCounters.jsx';
import ProblemStatement from '../components/sections/ProblemStatement.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import LatestShipments from '../components/sections/LatestShipments.jsx';
import WaysToHelp from '../components/sections/WaysToHelp.jsx';
import PressCoverage from '../components/sections/PressCoverage.jsx';
import DonateScene from '../components/sections/DonateScene.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactCounters />
      <ProblemStatement />
      <HowItWorks />
      <LatestShipments />
      <WaysToHelp />
      <PressCoverage />
      <DonateScene />
    </>
  );
}
