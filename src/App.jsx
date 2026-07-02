import { MotionConfig } from 'framer-motion';
import Layout from './components/layout/Layout.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    // reducedMotion="user" makes every framer-motion animation no-op
    // when the visitor has prefers-reduced-motion set.
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Layout>
        <AppRoutes />
      </Layout>
    </MotionConfig>
  );
}
