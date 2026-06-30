import Hero from '../components/sections/Hero.jsx';
import ProblemScene from '../components/sections/ProblemScene.jsx';
import ProcessScroll from '../components/sections/ProcessScroll.jsx';
import GlobalImpact from '../components/sections/GlobalImpact.jsx';
import ImpactCounters from '../components/sections/ImpactCounters.jsx';
import Testimonial from '../components/sections/Testimonial.jsx';
import DonateScene from '../components/sections/DonateScene.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemScene />
      <ProcessScroll />
      <GlobalImpact />
      <ImpactCounters />
      <Testimonial />
      <DonateScene />
    </>
  );
}
