import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
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
      </motion.div>
    </AnimatePresence>
  );
}
