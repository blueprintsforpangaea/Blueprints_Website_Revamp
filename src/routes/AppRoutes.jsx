import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Mission from '../pages/Mission.jsx';
import Impact from '../pages/Impact.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import Press from '../pages/Press.jsx';
import GetInvolved from '../pages/GetInvolved.jsx';
import Gala from '../pages/Gala.jsx';
import Donate from '../pages/Donate.jsx';
import Chapters from '../pages/Chapters.jsx';
import NotFound from '../pages/NotFound.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/press" element={<Press />} />
      <Route path="/get-involved" element={<GetInvolved />} />
      <Route path="/gala" element={<Gala />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/chapters" element={<Chapters />} />
      <Route path="/chapters/:chapterSlug" element={<Chapters />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
