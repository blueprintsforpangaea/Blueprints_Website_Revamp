import Hero from '../components/sections/Hero.jsx';
import ProblemStatement from '../components/sections/ProblemStatement.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import ImpactCounters from '../components/sections/ImpactCounters.jsx';
import PressCoverage from '../components/sections/PressCoverage.jsx';
import DonateScene from '../components/sections/DonateScene.jsx';

// Six sections, each doing one job, in reading order: the claim, the
// problem, the mechanism, the proof, outside verification, the ask.
// No pinned or scroll-driven sections — scrolling moves the page and
// nothing else.
export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <ImpactCounters />
      <PressCoverage />
      <DonateScene />
    </>
  );
}
