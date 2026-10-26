import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Each page is its own download, so the first visit only loads the
// page it lands on. Once the browser is idle the rest load in the
// background, so clicking around afterwards is instant.
const pages = {
  Home: () => import('../pages/Home.jsx'),
  Mission: () => import('../pages/Mission.jsx'),
  Impact: () => import('../pages/Impact.jsx'),
  AboutUs: () => import('../pages/AboutUs.jsx'),
  Press: () => import('../pages/Press.jsx'),
  GetInvolved: () => import('../pages/GetInvolved.jsx'),
  Gala: () => import('../pages/Gala.jsx'),
  Donate: () => import('../pages/Donate.jsx'),
  Chapters: () => import('../pages/Chapters.jsx'),
  NotFound: () => import('../pages/NotFound.jsx'),
  Pangaea: () => import('../pages/Pangaea.jsx'),
};
const Home = lazy(pages.Home);
const Mission = lazy(pages.Mission);
const Impact = lazy(pages.Impact);
const AboutUs = lazy(pages.AboutUs);
const Press = lazy(pages.Press);
const GetInvolved = lazy(pages.GetInvolved);
const Gala = lazy(pages.Gala);
const Donate = lazy(pages.Donate);
const Chapters = lazy(pages.Chapters);
const NotFound = lazy(pages.NotFound);
const Pangaea = lazy(pages.Pangaea);

function usePrefetchPages() {
  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => Object.values(pages).forEach((load) => load()));
    return () => cancel(id);
  }, []);
}

export default function AppRoutes() {
  usePrefetchPages();
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Routes>
        {/* The Pangaea globe page is the home page on this branch. */}
        <Route path="/" element={<Pangaea />} />
        <Route path="/classic" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/press" element={<Press />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/gala" element={<Gala />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/chapters/:chapterSlug" element={<Chapters />} />
        <Route path="/pangaea" element={<Pangaea />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
