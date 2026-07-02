import Hero from '../components/sections/Hero.jsx';
import ProblemScene from '../components/sections/ProblemScene.jsx';
import MissionStatement from '../components/sections/MissionStatement.jsx';
import ProcessScroll from '../components/sections/ProcessScroll.jsx';
import GlobalImpact from '../components/sections/GlobalImpact.jsx';
import ImpactCounters from '../components/sections/ImpactCounters.jsx';
import Testimonial from '../components/sections/Testimonial.jsx';
import DonateScene from '../components/sections/DonateScene.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Home() {
  usePageMeta(
    null,
    'We rescue surplus medical supplies before they reach the landfill and deliver them free of charge to clinics in 15+ countries.',
  );
  return (
    <>
      <Hero />
      <ProblemScene />
      <MissionStatement />
      <ProcessScroll />
      <GlobalImpact />
      <ImpactCounters />
      <Testimonial />
      <DonateScene />
    </>
  );
}
